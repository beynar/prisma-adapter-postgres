import type postgres from "postgres";

export type Deferred<T> = {
  resolve(value: T | PromiseLike<T>): void;
  reject(reason: unknown): void;
};

export function createDeferred<T>(): [Deferred<T>, Promise<T>] {
  const deferred = {} as Deferred<T>;
  return [
    deferred,
    new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    })
  ];
}

type PostgresJs = postgres.Sql<{}>;
type PostgresJsTransaction = postgres.TransactionSql<{}>;
export const createDeferredTransaction = async (sql: PostgresJs) => {
  let [deferred, promise] = createDeferred<PostgresJsTransaction>();

  sql.begin(async (tx) => {
    deferred.resolve(tx);
    try {
      return await promise;
    } catch (e) {
      throw e;
    }
  });

  return {
    txPromise: promise,
    commit: () => deferred.resolve(undefined as any),
    rollback: (reason: unknown = new Error("Transaction rolled back")) => deferred.reject(reason)
  };
};
