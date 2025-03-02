import { PrismaClient } from "@prisma/client";
import { PrismaPostgres } from "./postgres-adapter";

// Standard Prisma client using the default adapter
export const prismaBasic = new PrismaClient({
  omit: {
    test: {
      timetzArray: true,
      timestampzArray: true
    }
  }
});

// Create a postgres connection for our adapter
import postgres from "postgres";

// Create the postgres client
export const pgConnection = postgres(process.env.DATABASE_URL!, {
  // types: {
  //   1000: {
  //     to: 1000,
  //     from: [1000],
  //     serialize: (value) => {
  //       console.log("serialize", value);
  //       return value.join(",");
  //     },
  //     parse: (value) => {
  //       console.log("parse", value);
  //       return value.split(",").map((bool) => bool === "t");
  //     }
  //   }
  // }
});

// Create the PostgreSQL adapter
const pgAdapter = new PrismaPostgres(process.env.DATABASE_URL!);

// Create Prisma client using our adapter
export const prismaPostgres = new PrismaClient({
  adapter: pgAdapter,
  omit: {
    test: {
      timetzArray: true,
      timestampzArray: true
    }
  }
});

import { Pool } from "pg";

import { PrismaPg } from "@prisma/adapter-pg";
export const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

const nodePgAdapter = new PrismaPg(pool);

export const prismaPg = new PrismaClient({
  adapter: nodePgAdapter,
  omit: {
    test: {
      timetzArray: true,
      timestampzArray: true
    }
  }
});
