# Prisma Adapter for Porsager Postgres

This document outlines the implementation details and key differences between this adapter and other PostgreSQL adapters in the Prisma ecosystem.

## Overview

The `@prisma/adapter-postgres-js` is a driver adapter for Prisma that allows it to work with the Porsager Postgres library (https://github.com/porsager/postgres). This lightweight PostgreSQL client offers several advantages that this adapter leverages:

- No dependencies
- Tiny codebase (< 1000 LOC)
- Simple API with tagged template literals
- Automatic connection pooling
- Transaction support
- Prepared statements
- Support for both native and ESM modules
- TypeScript typings

## Key Differences from `@prisma/adapter-pg`

The existing `@prisma/adapter-pg` adapter works with the [node-postgres](https://github.com/brianc/node-postgres) (`pg`) library. The main differences in our implementation are:

### 1. Connection Handling

- **Porsager Postgres**: Uses a single function call that returns a connection pool and query interface
- **node-postgres**: Requires explicit creation of a Pool object

```typescript
// Porsager postgres
const sql = postgres("postgres://username:password@host:port/database");

// node-postgres
const pool = new Pool({
  connectionString: "postgres://username:password@host:port/database"
});
```

### 2. Query Execution Style

- **Porsager Postgres**: Uses tagged template literals for queries
- **node-postgres**: Uses object-based query method

```typescript
// Porsager postgres
const result = await sql`SELECT * FROM users WHERE id = ${userId}`;

// node-postgres
const result = await client.query("SELECT * FROM users WHERE id = $1", [userId]);
```

### 3. Transaction Management

- **Porsager Postgres**: Provides a transaction function that handles begin/commit/rollback
- **node-postgres**: Requires manually obtaining a client and executing transaction statements

```typescript
// Porsager postgres
await sql.begin(async (sql) => {
  await sql`INSERT INTO users (name) VALUES ('John')`;
});

// node-postgres
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query("INSERT INTO users (name) VALUES ($1)", ["John"]);
  await client.query("COMMIT");
} catch (e) {
  await client.query("ROLLBACK");
  throw e;
} finally {
  client.release();
}
```

### 4. Result Format

- **Porsager Postgres**: Returns arrays for rows by default, with optional transformation
- **node-postgres**: Returns objects by default

```typescript
// Porsager postgres (array results)
const result = await sql`SELECT * FROM users`;
// result = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

// node-postgres (object results)
const result = await client.query("SELECT * FROM users");
// result = { rows: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }], ... }
```

### 5. Type Handling

- **Porsager Postgres**: Has built-in parsers for most PostgreSQL types
- **node-postgres**: Provides a type parser registry that needs to be configured

## Implementation Approach

Our adapter implementation focuses on:

1. Mapping the Porsager Postgres API to Prisma's expected driver interface
2. Handling data type conversion between PostgreSQL and JavaScript
3. Ensuring proper transaction management
4. Providing appropriate error handling and context

## Connection and Query Classes

The adapter follows a similar structure to `adapter-pg` but adapts the implementation to work with Porsager Postgres:

1. `PostgresJsQueryable`: Base class handling query execution
2. `PostgresJsTransaction`: Handles transaction operations
3. `PostgresJsTransactionContext`: Manages transaction context and creation
4. `PrismaPostgres`: Main connection class implementing the `SqlConnection` interface
5. `PrismaPostgresWithMigration`: Migration-aware connection for Prisma Migrate

## Data Type Conversion

Special attention is given to data type conversion, as Porsager Postgres and the Prisma engine have different expectations for data representation. Our adapter includes:

- Custom type parsers for complex types
- Array and binary data handling
- Date, time, and timestamp normalization

## Error Handling

The adapter provides specific error handling for PostgreSQL errors, mapping them to Prisma's error format with appropriate details including:

- Error code
- Severity
- Message
- Detail
- Column
- Hint

## Future Enhancements

Potential areas for future improvement include:

- Performance optimizations specific to Porsager Postgres
- Enhanced type mappings for custom PostgreSQL types
- Support for PostgreSQL-specific features like LISTEN/NOTIFY
- Better integration with Porsager Postgres TypeScript typings
