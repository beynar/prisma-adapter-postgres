/* eslint-disable @typescript-eslint/require-await */

import type {
  ColumnType,
  ConnectionInfo,
  DriverAdapter,
  Queryable,
  Query,
  ResultSet,
  Transaction as TransactionInterface,
  TransactionOptions,
  Result,
  Error as PrismaError
} from "@prisma/driver-adapter-utils";
import { Debug, ok, err } from "@prisma/driver-adapter-utils";
import type postgres from "postgres";
import { fieldToColumnType, fixArrayBufferValues, UnsupportedNativeDataType, customParsers } from "./conversion";
import { type Deferred, createDeferred } from "./deferred";

const debug = Debug("prisma:driver-adapter:postgres-js");
const packageName = "adapter-postgres";

// Type definitions for postgres.js library
type PostgresJs = postgres.Sql<{}>;
type TransactionPostgresJs = postgres.TransactionSql<{}>;

class PostgresJsQueryable<ClientT extends PostgresJs | TransactionPostgresJs> implements Queryable {
  readonly provider = "postgres";
  readonly adapterName = packageName;

  constructor(protected readonly client: ClientT) {}

  /**
   * Execute a query and process the results
   */
  private async performIO(query: Query): Promise<{ rows: any[]; columns?: any[] }> {
    let { sql, args, argTypes } = query;
    const transformedArgs = fixArrayBufferValues(args || []).map((arg, index) => {
      const argType = argTypes?.[index];
      if (argType === "Array") {
        // Check if argument is already a string in PostgreSQL array format
        if (typeof arg === "string" && arg.startsWith("{") && arg.endsWith("}")) {
          return arg; // Already in PostgreSQL array format
        }

        // Transform JavaScript array to PostgreSQL array format
        if (Array.isArray(arg)) {
          return `{${arg
            .map((item) => {
              // Check if item is a JSON string (starts with { and ends with })
              if (typeof item === "string" && item.startsWith("{") && item.endsWith("}")) {
                // If it's a JSON string, we need to escape any quotes and wrap it correctly
                return `"${item.replace(/"/g, '\\"')}"`;
              }
              // Regular string or primitive value
              return `"${item}"`;
            })
            .join(",")}}`;
        }

        // If it's neither a proper array nor already formatted string,
        // return as is
        return arg;
      }
      return arg;
    });

    try {
      const result = await this.client.unsafe(sql, transformedArgs as postgres.ParameterOrJSON<any>[]);

      return {
        rows: result,
        columns: result.columns
      };
    } catch (e) {
      debug("Error in performIO: %O", e);

      if (e && typeof e.code === "string" && typeof e.message === "string") {
        throw {
          kind: "postgres",
          code: e.code,
          severity: e.severity || "ERROR",
          message: e.message,
          detail: e.detail,
          column: e.column,
          hint: e.hint
        };
      }

      throw e;
    }
  }

  /**
   * Execute a query and return a result set with column metadata
   */
  async queryRaw(query: Query): Promise<Result<ResultSet>> {
    const tag = "[js::query_raw]";
    debug(`${tag} %O`, query);

    try {
      const { rows, columns } = await this.performIO(query);

      const columnNames = columns ? columns.map((c) => c.name) : rows.length > 0 ? Object.keys(rows[0]) : [];
      let columnTypes: ColumnType[] = [];

      try {
        columnTypes = (columns || []).map((col) => fieldToColumnType(col.type));
        console.log(columnTypes);
      } catch (e) {
        if (e instanceof UnsupportedNativeDataType) {
          return err({
            kind: "UnsupportedNativeDataType",
            type: e.type
          });
        }
        throw e;
      }

      // Format rows as arrays in the order of columnNames
      const formattedRows = rows.map((row) =>
        columnNames.map((name) => {
          const val = row[name];

          // Skip functions and undefined values
          if (typeof val === "function" || val === undefined) {
            return null;
          }

          // Basic normalization for dates
          if (val instanceof Date) {
            return val.toISOString();
          }

          // Handle Buffer values
          if (Buffer.isBuffer(val)) {
            return val.toString("base64");
          }

          return val;
        })
      );
      console.dir(
        {
          columnNames,
          columnTypes,
          rows: formattedRows
        },
        { depth: null }
      );
      return ok({
        columnNames,
        columnTypes,
        rows: formattedRows
      });
    } catch (e) {
      return err(e instanceof Error ? { kind: "GenericJs", id: Date.now() } : (e as PrismaError));
    }
  }

  /**
   * Execute a query and return the number of affected rows
   */
  async executeRaw(query: Query): Promise<Result<number>> {
    const tag = "[js::execute_raw]";
    debug(`${tag} %O`, query);

    try {
      const { rows } = await this.performIO(query);
      return ok(rows && rows.length > 0 && "count" in rows[0] ? rows[0].count : rows.length);
    } catch (e) {
      return err(e instanceof Error ? { kind: "GenericJs", id: Date.now() } : (e as PrismaError));
    }
  }
}

class PostgresJsTransaction extends PostgresJsQueryable<TransactionPostgresJs> implements TransactionInterface {
  constructor(
    client: TransactionPostgresJs,
    readonly options: TransactionOptions,
    private txDeferred: Deferred<void>,
    private txResultPromise: Promise<any>
  ) {
    super(client);
  }

  async commit(): Promise<Result<undefined>> {
    debug(`[js::commit]`);
    this.txDeferred.resolve();
    await this.txResultPromise;
    return ok(undefined);
  }

  async rollback(): Promise<Result<undefined>> {
    debug("[js::rollback]");
    await this.client`ROLLBACK AND CANCEL;`;
    this.txDeferred.resolve();
    await this.txResultPromise;
    return ok(undefined);
  }
}

class PostgresJsTransactionContext extends PostgresJsQueryable<PostgresJs> {
  constructor(readonly sql: PostgresJs) {
    super(sql);
  }

  async startTransaction(): Promise<Result<TransactionInterface>> {
    const options: TransactionOptions = {
      usePhantomQuery: true
    };

    const tag = "[js::startTransaction]";
    debug("%s options: %O", tag, options);

    return new Promise<Result<TransactionInterface>>((resolve, reject) => {
      const txResultPromise = this.client
        .begin(async (tx) => {
          const [txDeferred, deferredPromise] = createDeferred<void>();
          resolve(ok(new PostgresJsTransaction(tx, options, txDeferred, txResultPromise)));
          await deferredPromise;

          return "ok";
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export class PrismaPostgres extends PostgresJsQueryable<PostgresJs> implements DriverAdapter {
  constructor(
    client: PostgresJs,
    private schemaName: string = "public"
  ) {
    super(client);
    Object.assign(client.options.parsers, customParsers);
  }

  async executeScript(script: string): Promise<Result<void>> {
    debug(`[js::execute_script]`);

    try {
      await this.client.unsafe(script);
      return ok(undefined);
    } catch (e) {
      return err(e instanceof Error ? { kind: "GenericJs", id: Date.now() } : (e as PrismaError));
    }
  }

  getConnectionInfo(): Result<ConnectionInfo> {
    return ok({
      schemaName: this.schemaName
    });
  }

  async transactionContext(): Promise<Result<PostgresJsTransactionContext>> {
    return ok(new PostgresJsTransactionContext(this.client));
  }

  async dispose(): Promise<Result<void>> {
    debug(`[js::dispose]`);
    try {
      if (this.client && typeof this.client.end === "function") {
        await this.client.end();
      }
      return ok(undefined);
    } catch (e) {
      debug(`Error disposing client: ${e}`);
      return ok(undefined);
    }
  }
}

// Export the main adapter class
export default PrismaPostgres;
