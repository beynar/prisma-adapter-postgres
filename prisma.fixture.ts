import { PrismaClient } from "@prisma/client";
import { PrismaPostgres } from "./src";
import postgres from "postgres";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Standard Prisma client
export const prismaBasic = new PrismaClient({
  omit: {
    test: {
      timetzArray: true,
      moneyArray: true,
      timestampzArray: true
    }
  }
});

// Postgres Prisma client using the postgres adapter
export const prismaPostgres = new PrismaClient({
  adapter: new PrismaPostgres(postgres(process.env.DATABASE_URL!)),
  omit: {
    test: {
      timetzArray: true,
      moneyArray: true,
      timestampzArray: true
    }
  }
});

// PG Prisma client using the pg adapter
export const prismaPg = new PrismaClient({
  adapter: new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL! })),
  omit: {
    test: {
      timetzArray: true,
      timestampzArray: true
    }
  }
});
