import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prismaBasic, prismaPostgres, prismaPg } from "../prisma.fixture";
import { Enum } from "@prisma/client";

describe("Benchmarks", () => {
  // Generate test data
  const testRecords = Array.from({ length: 100 }).map((_, i) => ({
    string: `Test ${i}`,
    boolean: i % 2 === 0,
    number: i,
    bigInt: BigInt(i),
    decimal: i * 1.5,
    float: i * 2.5,
    date: new Date(),
    time: new Date(),
    timestamp: new Date(),
    timestampz: new Date(),
    timetz: new Date(),
    json: { test: i },
    enum: i % 3 === 0 ? Enum.ONE : i % 3 === 1 ? Enum.TWO : Enum.THREE,
    bytes: Buffer.from(`test-${i}`),
    smallInt: i % 100,
    money: i * 0.5,
    real: i * 1.25,
    double: i * 3.5
  }));

  //   beforeAll(async () => {
  //     // Clean up existing data
  //     await prismaBasic.oneToMany.deleteMany();
  //     await prismaBasic.manyToMany.deleteMany();
  //     await prismaBasic.oneToOne.deleteMany();
  //     await prismaBasic.test.deleteMany();
  //   });

  afterAll(async () => {
    // Clean up
    await prismaBasic.$disconnect();
    await prismaPostgres.$disconnect();
    await prismaPg.$disconnect();
  });

  describe("Single Record Operations", () => {
    const benchmarkSingleOperation = async (name: string, operation: () => Promise<any>) => {
      console.time(name);
      await operation();
      console.timeEnd(name);
    };

    it("should benchmark create", async () => {
      const testData = {
        string: "Benchmark Test",
        boolean: true,
        number: 42,
        bigInt: BigInt(42),
        decimal: 42.5,
        float: 42.5,
        date: new Date(),
        time: new Date(),
        timestamp: new Date(),
        timestampz: new Date(),
        timetz: new Date(),
        json: { test: "benchmark" },
        enum: Enum.ONE,
        bytes: Buffer.from("benchmark"),
        smallInt: 42,
        money: 42.5,
        real: 42.5,
        double: 42.5
      };

      await benchmarkSingleOperation("Standard Prisma - Create", async () => {
        await prismaBasic.test.create({
          data: testData
        });
      });

      await benchmarkSingleOperation("Custom Postgres Adapter - Create", async () => {
        await prismaPostgres.test.create({
          data: testData
        });
      });

      await benchmarkSingleOperation("PG Adapter - Create", async () => {
        await prismaPg.test.create({
          data: testData
        });
      });
    });

    it("should benchmark findFirst", async () => {
      await benchmarkSingleOperation("Standard Prisma - FindFirst", async () => {
        await prismaBasic.test.findFirst();
      });

      await benchmarkSingleOperation("Custom Postgres Adapter - FindFirst", async () => {
        await prismaPostgres.test.findFirst();
      });

      await benchmarkSingleOperation("PG Adapter - FindFirst", async () => {
        await prismaPg.test.findFirst();
      });
    });

    it("should benchmark update", async () => {
      // Get a record to update
      const record = await prismaBasic.test.findFirst();
      expect(record).toBeDefined();

      if (record) {
        await benchmarkSingleOperation("Standard Prisma - Update", async () => {
          await prismaBasic.test.update({
            where: { id: record.id },
            data: { string: `Updated ${Date.now()}` }
          });
        });

        await benchmarkSingleOperation("Custom Postgres Adapter - Update", async () => {
          await prismaPostgres.test.update({
            where: { id: record.id },
            data: { string: `Updated ${Date.now()}` }
          });
        });

        await benchmarkSingleOperation("PG Adapter - Update", async () => {
          await prismaPg.test.update({
            where: { id: record.id },
            data: { string: `Updated ${Date.now()}` }
          });
        });
      }
    });
  });

  describe("Bulk Operations", () => {
    it("should benchmark createMany", async () => {
      // First clean up
      await prismaBasic.test.deleteMany();

      console.time("Standard Prisma - CreateMany");
      await prismaBasic.test.createMany({
        data: testRecords
      });
      console.timeEnd("Standard Prisma - CreateMany");

      // Clean up again
      await prismaBasic.test.deleteMany();

      console.time("Custom Postgres Adapter - CreateMany");
      await prismaPostgres.test.createMany({
        data: testRecords
      });
      console.timeEnd("Custom Postgres Adapter - CreateMany");

      // Clean up again
      await prismaBasic.test.deleteMany();

      console.time("PG Adapter - CreateMany");
      await prismaPg.test.createMany({
        data: testRecords
      });
      console.timeEnd("PG Adapter - CreateMany");
    });

    it("should benchmark findMany", async () => {
      console.time("Standard Prisma - FindMany");
      await prismaBasic.test.findMany({
        take: 50
      });
      console.timeEnd("Standard Prisma - FindMany");

      console.time("Custom Postgres Adapter - FindMany");
      await prismaPostgres.test.findMany({
        take: 50
      });
      console.timeEnd("Custom Postgres Adapter - FindMany");

      console.time("PG Adapter - FindMany");
      await prismaPg.test.findMany({
        take: 50
      });
      console.timeEnd("PG Adapter - FindMany");
    });

    it("should benchmark complex query", async () => {
      console.time("Standard Prisma - Complex Query");
      await prismaBasic.test.findMany({
        where: {
          OR: [{ string: { contains: "Test" } }, { number: { gt: 50 } }]
        },
        orderBy: { number: "desc" },
        take: 20
      });
      console.timeEnd("Standard Prisma - Complex Query");

      console.time("Custom Postgres Adapter - Complex Query");
      await prismaPostgres.test.findMany({
        where: {
          OR: [{ string: { contains: "Test" } }, { number: { gt: 50 } }]
        },
        orderBy: { number: "desc" },
        take: 20
      });
      console.timeEnd("Custom Postgres Adapter - Complex Query");

      console.time("PG Adapter - Complex Query");
      await prismaPg.test.findMany({
        where: {
          OR: [{ string: { contains: "Test" } }, { number: { gt: 50 } }]
        },
        orderBy: { number: "desc" },
        take: 20
      });
      console.timeEnd("PG Adapter - Complex Query");
    });
  });

  describe("Transaction Benchmarks", () => {
    it("should benchmark transactions", async () => {
      console.time("Standard Prisma - Transaction");
      await prismaBasic.$transaction(async (tx) => {
        await tx.test.create({
          data: {
            string: `Transaction Test ${Date.now()}`,
            boolean: true,
            number: 100,
            bigInt: BigInt(100),
            decimal: 100.5,
            float: 100.5,
            date: new Date(),
            time: new Date(),
            timestamp: new Date(),
            timestampz: new Date(),
            timetz: new Date(),
            json: { transaction: true },
            enum: Enum.ONE,
            bytes: Buffer.from("transaction test"),
            smallInt: 100,
            money: 100.5,
            real: 100.5,
            double: 100.5
          }
        });

        await tx.test.findMany({
          take: 10
        });
      });
      console.timeEnd("Standard Prisma - Transaction");

      console.time("Custom Postgres Adapter - Transaction");
      await prismaPostgres.$transaction(async (tx) => {
        await tx.test.create({
          data: {
            string: `Transaction Test ${Date.now()}`,
            boolean: true,
            number: 100,
            bigInt: BigInt(100),
            decimal: 100.5,
            float: 100.5,
            date: new Date(),
            time: new Date(),
            timestamp: new Date(),
            timestampz: new Date(),
            timetz: new Date(),
            json: { transaction: true },
            enum: Enum.ONE,
            bytes: Buffer.from("transaction test"),
            smallInt: 100,
            money: 100.5,
            real: 100.5,
            double: 100.5
          }
        });

        await tx.test.findMany({
          take: 10
        });
      });
      console.timeEnd("Custom Postgres Adapter - Transaction");

      console.time("PG Adapter - Transaction");
      await prismaPg.$transaction(async (tx) => {
        await tx.test.create({
          data: {
            string: `Transaction Test ${Date.now()}`,
            boolean: true,
            number: 100,
            bigInt: BigInt(100),
            decimal: 100.5,
            float: 100.5,
            date: new Date(),
            time: new Date(),
            timestamp: new Date(),
            timestampz: new Date(),
            timetz: new Date(),
            json: { transaction: true },
            enum: Enum.ONE,
            bytes: Buffer.from("transaction test"),
            smallInt: 100,
            money: 100.5,
            real: 100.5,
            double: 100.5
          }
        });

        await tx.test.findMany({
          take: 10
        });
      });
      console.timeEnd("PG Adapter - Transaction");
    });
  });
});
