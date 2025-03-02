import { describe, it, expect } from "vitest";
import { prismaBasic, prismaPostgres, pgConnection, pool, prismaPg } from "../prisma.fixture";

describe("Normal Test", () => {
  it("should be true", async () => {
    const row = await prismaBasic.test.findFirst();
    expect(row).toBeDefined();
  });
});

describe("Postgres Test", () => {
  it("should be true", async () => {
    const row = await prismaPostgres.test.findFirst();
    expect(row).toBeDefined();
  });
});

describe("PG Test", () => {
  it("should be true", async () => {
    const row = await prismaPg.test.findFirst();
    const rowRaw = await pool.query({
      text: `SELECT * FROM "Test" limit 1`
    });

    const rowRaw2 = await pgConnection`SELECT * FROM "Test" limit 1`;

    expect(row).toBeDefined();
  });
});
