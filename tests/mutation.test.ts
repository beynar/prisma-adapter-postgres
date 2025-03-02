import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { prismaBasic, prismaPostgres, prismaPg } from "../prisma.fixture";
import { Enum } from "@prisma/client";

const idToUpsert = "upsert-test-id";

describe("Upsert Mutation Tests", () => {
  // Clean up test data after each test
  afterEach(async () => {
    await prismaBasic.test.deleteMany({
      where: { id: idToUpsert }
    });
  });

  describe("Basic Upsert - Create", () => {
    it("should create a new record when it doesn't exist", async () => {
      // First ensure the record doesn't exist
      const existingRecord = await prismaBasic.test.findUnique({
        where: { id: idToUpsert }
      });
      expect(existingRecord).toBeNull();

      // Perform upsert operation
      const upserted = await prismaBasic.test.upsert({
        where: { id: idToUpsert },
        create: {
          id: idToUpsert,
          string: "upsert test",
          stringArray: ["upsert", "test"],
          boolean: true,
          booleanArray: [true, false],
          date: new Date(),
          dateArray: [new Date(), new Date(Date.now() - 86400000)],
          time: new Date(),
          timeArray: [new Date(), new Date(Date.now() - 86400000)],
          timestamp: new Date(),
          timestampArray: [new Date(), new Date(Date.now() - 86400000)],
          timestampz: new Date(),
          timetz: new Date(),
          number: 42,
          numberArray: [1, 2, 3],
          bigInt: BigInt(9007199254740991),
          bigIntArray: [BigInt(1), BigInt(2)],
          smallInt: 100,
          smallIntArray: [10, 20],
          decimal: 123.45,
          decimalArray: [1.1, 2.2],
          money: 99.99,
          moneyArray: [10.0, 20.0],
          float: 3.14159,
          floatArray: [1.1, 2.2],
          real: 2.71828,
          realArray: [1.1, 2.2],
          double: 1.41421,
          doubleArray: [1.1, 2.2],
          json: { test: "json" },
          jsonArray: [{ key: "value1" }, { key: "value2" }],
          enum: Enum.ONE,
          enumArray: [Enum.ONE, Enum.TWO],
          bytes: Buffer.from("test"),
          bytesArray: [Buffer.from("test1"), Buffer.from("test2")]
        },
        update: {
          string: "updated value"
        }
      });

      expect(upserted).toBeDefined();
      expect(upserted.id).toBe(idToUpsert);
      expect(upserted.string).toBe("upsert test");

      // Verify the record was created in the database
      const createdRecord = await prismaBasic.test.findUnique({
        where: { id: idToUpsert }
      });
      expect(createdRecord).toBeDefined();
      expect(createdRecord?.id).toBe(idToUpsert);
    });
  });

  describe("Basic Upsert - Update", () => {
    // Create a record before testing the update
    beforeEach(async () => {
      await prismaBasic.test.create({
        data: {
          id: idToUpsert,
          string: "original string",
          stringArray: ["original"],
          boolean: false,
          booleanArray: [false, false],
          date: new Date(),
          dateArray: [new Date()],
          time: new Date(),
          timeArray: [new Date()],
          timestamp: new Date(),
          timestampArray: [new Date()],
          timestampz: new Date(),
          timetz: new Date(),
          number: 100,
          numberArray: [100, 200],
          bigInt: BigInt(100),
          bigIntArray: [BigInt(100)],
          smallInt: 50,
          smallIntArray: [50],
          decimal: 100.0,
          decimalArray: [100.0],
          money: 100.0,
          moneyArray: [100.0],
          float: 100.0,
          floatArray: [100.0],
          real: 100.0,
          realArray: [100.0],
          double: 100.0,
          doubleArray: [100.0],
          json: { original: true },
          jsonArray: [{ original: true }],
          enum: Enum.ONE,
          enumArray: [Enum.ONE],
          bytes: Buffer.from("original"),
          bytesArray: [Buffer.from("original")]
        }
      });
    });

    it("should update an existing record", async () => {
      // Verify the record exists
      const existingRecord = await prismaBasic.test.findUnique({
        where: { id: idToUpsert }
      });
      expect(existingRecord).toBeDefined();
      expect(existingRecord?.string).toBe("original string");

      // Perform upsert operation to update
      const upserted = await prismaBasic.test.upsert({
        where: { id: idToUpsert },
        create: {
          id: idToUpsert,
          string: "should not be used",
          stringArray: ["should", "not", "be", "used"],
          boolean: true,
          booleanArray: [true],
          date: new Date(),
          dateArray: [new Date()],
          time: new Date(),
          timeArray: [new Date()],
          timestamp: new Date(),
          timestampArray: [new Date()],
          timestampz: new Date(),
          timetz: new Date(),
          number: 999,
          numberArray: [999],
          bigInt: BigInt(999),
          bigIntArray: [BigInt(999)],
          smallInt: 999,
          smallIntArray: [999],
          decimal: 999.99,
          decimalArray: [999.99],
          money: 999.99,
          moneyArray: [999.99],
          float: 999.99,
          floatArray: [999.99],
          real: 999.99,
          realArray: [999.99],
          double: 999.99,
          doubleArray: [999.99],
          json: { new: true },
          jsonArray: [{ new: true }],
          enum: Enum.TWO,
          enumArray: [Enum.TWO],
          bytes: Buffer.from("new"),
          bytesArray: [Buffer.from("new")]
        },
        update: {
          string: "updated string",
          number: 200,
          boolean: true
        }
      });

      expect(upserted).toBeDefined();
      expect(upserted.id).toBe(idToUpsert);
      expect(upserted.string).toBe("updated string");
      expect(upserted.number).toBe(200);
      expect(upserted.boolean).toBe(true);

      // Verify the original fields weren't changed if not in the update
      expect(upserted.stringArray).toEqual(["original"]);

      const upsertedPostgres = await prismaPostgres.test.update({
        where: { id: idToUpsert },
        data: {
          dateArray: [new Date()],
          timeArray: [new Date()],
          timestampArray: [new Date()],
          timestampzArray: [new Date()],
          timetzArray: [new Date()],
          numberArray: [1, 2, 3],
          booleanArray: [false, false],
          stringArray: ["original"],
          jsonArray: [{ original: true }],
          enumArray: [Enum.ONE],
          bytesArray: [Buffer.from("original")]
        }
      });

      console.log("upserted", upserted);
      console.log("upsertedPostgres", upsertedPostgres);
    });
  });

  describe("Postgres Adapter Upsert Tests", () => {
    it("should create a new record with the postgres adapter", async () => {
      // First ensure the record doesn't exist
      await prismaPostgres.test.deleteMany({
        where: { id: idToUpsert }
      });

      //   Perform upsert operation with postgres adapter
      const upserted = await prismaPostgres.test.upsert({
        where: { id: idToUpsert },
        create: {
          id: idToUpsert,
          string: "postgres adapter",
          stringArray: ["postgres", "adapter"],
          boolean: true,
          booleanArray: [false, false],
          date: new Date(),
          dateArray: [new Date()],
          time: new Date(),
          timeArray: [new Date()],
          timestamp: new Date(),
          timestampArray: [new Date()],
          timestampz: new Date(),
          timetz: new Date(),
          number: 42,
          numberArray: [1, 2, 3],
          bigInt: BigInt(9007199254740991),
          bigIntArray: [BigInt(1), BigInt(2)],
          smallInt: 100,
          smallIntArray: [10, 20],
          decimal: 123.45,
          decimalArray: [1.1, 2.2],
          money: 99.99,
          moneyArray: [10.0, 20.0],
          float: 3.14159,
          floatArray: [1.1, 2.2],
          real: 2.71828,
          realArray: [1.1, 2.2],
          double: 1.41421,
          doubleArray: [1.1, 2.2],
          json: { test: "json" },
          jsonArray: [{ key: "value1" }, { key: "value2" }],
          enum: Enum.ONE,
          enumArray: [Enum.ONE, Enum.TWO],
          bytes: Buffer.from("test"),
          bytesArray: [Buffer.from("test1"), Buffer.from("test2")]
        },
        update: {
          string: "updated value"
        }
      });

      expect(upserted).toBeDefined();
      expect(upserted.id).toBe(idToUpsert);
      expect(upserted.string).toBe("postgres adapter");

      // Verify with standard client
      const createdRecord = await prismaBasic.test.findUnique({
        where: { id: idToUpsert }
      });
      expect(createdRecord).toBeDefined();
      expect(createdRecord?.string).toBe("postgres adapter");
    });
  });

  describe("Comparison Upsert Tests", () => {
    it("should behave the same in basic and postgres adapter", async () => {
      // Clean up
      await prismaBasic.test.deleteMany({
        where: { id: idToUpsert }
      });

      // Data to use in both upsert operations
      const createData = {
        id: idToUpsert,
        string: "comparison test",
        stringArray: ["comparison", "test"],
        boolean: true,
        booleanArray: [false, false],
        date: new Date(),
        dateArray: [new Date()],
        time: new Date(),
        timeArray: [new Date()],
        timestamp: new Date(),
        timestampArray: [new Date()],
        timestampz: new Date(),
        timetz: new Date(),
        number: 42,
        numberArray: [1, 2, 3],
        bigInt: BigInt(9007199254740991),
        bigIntArray: [BigInt(1), BigInt(2)],
        smallInt: 100,
        smallIntArray: [10, 20],
        decimal: 123.45,
        decimalArray: [1.1, 2.2],
        money: 99.99,
        moneyArray: [10.0, 20.0],
        float: 3.14159,
        floatArray: [1.1, 2.2],
        real: 2.71828,
        realArray: [1.1, 2.2],
        double: 1.41421,
        doubleArray: [1.1, 2.2],
        json: { test: "json" },
        jsonArray: [{ key: "value1" }, { key: "value2" }],
        enum: Enum.ONE,
        enumArray: [Enum.ONE, Enum.TWO],
        bytes: Buffer.from("test"),
        bytesArray: [Buffer.from("test1"), Buffer.from("test2")]
      };

      // Perform upsert with basic client
      const basicResult = await prismaBasic.test.upsert({
        where: { id: idToUpsert },
        create: createData,
        update: {
          string: "updated value"
        }
      });

      // Delete for clean comparison
      await prismaBasic.test.delete({
        where: { id: idToUpsert }
      });

      // Perform the same upsert with postgres adapter
      const postgresResult = await prismaPostgres.test.upsert({
        where: { id: idToUpsert },
        create: createData,
        update: {
          string: "updated value"
        }
      });

      // Compare properties (need to compare date-like fields separately)
      expect(postgresResult.id).toEqual(basicResult.id);
      expect(postgresResult.string).toEqual(basicResult.string);
      expect(postgresResult.number).toEqual(basicResult.number);
      // Various other field comparisons would go here
    });
  });
});
