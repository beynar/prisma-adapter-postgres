import { Queryable, Query, Result, ResultSet, DriverAdapter, ConnectionInfo, Transaction } from '@prisma/driver-adapter-utils';
import postgres from 'postgres';

type PostgresJs = postgres.Sql<{}>;
type TransactionPostgresJs = postgres.TransactionSql<{}>;
declare class PostgresJsQueryable<ClientT extends PostgresJs | TransactionPostgresJs> implements Queryable {
    protected readonly client: ClientT;
    readonly provider = "postgres";
    readonly adapterName = "adapter-postgres";
    constructor(client: ClientT);
    /**
     * Execute a query and process the results
     */
    private performIO;
    /**
     * Execute a query and return a result set with column metadata
     */
    queryRaw(query: Query): Promise<Result<ResultSet>>;
    /**
     * Execute a query and return the number of affected rows
     */
    executeRaw(query: Query): Promise<Result<number>>;
}
declare class PostgresJsTransactionContext extends PostgresJsQueryable<PostgresJs> {
    readonly sql: PostgresJs;
    constructor(sql: PostgresJs);
    startTransaction(): Promise<Result<Transaction>>;
}
declare class PrismaPostgres extends PostgresJsQueryable<PostgresJs> implements DriverAdapter {
    private schemaName;
    constructor(client: PostgresJs, schemaName?: string);
    executeScript(script: string): Promise<Result<void>>;
    getConnectionInfo(): Result<ConnectionInfo>;
    transactionContext(): Promise<Result<PostgresJsTransactionContext>>;
    dispose(): Promise<Result<void>>;
}

export { PrismaPostgres };
