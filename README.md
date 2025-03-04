# prisma-adapter-postgres

[Prisma driver adapter](https://www.prisma.io/docs/orm/overview/databases/database-drivers) for [postgres](https://github.com/porsager/postgres).

## Install

You will need to install the `prisma-adapter-postgres` driver adapter and the `postgres` client.

```
npm install prisma-adapter-postgres postgres
```

```
pnpm add prisma-adapter-postgres postgres
```

```
bun add prisma-adapter-postgres postgres
```

## Setup

```ts
import postgres from "postgres";
import { PrismaPostgres } from "prisma-adapter-postgres";
import { PrismaClient } from "@prisma/client";

// init postgres client
const sql = postgres(process.env.DATABASE_URL!);

// init prisma with the adapter
const adapter = new PrismaPostgres(sql);
const prisma = new PrismaClient({ adapter });

const user = await prisma.user.create({
  data: {
    email: "test@prisma.io",
    name: "test"
  }
});
```

## Credits

Based on other projects:

- [pglite-prisma-adapter](https://github.com/lucasthevenet/pglite-utils/tree/main/packages/prisma-adapter)
- [@prisma/adapter-pg](https://github.com/prisma/prisma/tree/main/packages/adapter-pg)
