import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { prismaBasic, prismaPostgres } from "../prisma.fixture";

// Test data constants
const TEST_ID_1 = "tx-test-1";
const TEST_ID_2 = "tx-test-2";

// Helper function to create test data with all required fields
function createTestData(id: string, stringValue: string) {
  return {
    id,
    string: stringValue
  };
}

describe.sequential(
  "Transaction Tests for Postgres Adapter",
  () => {
    //   Clean up test data before and after each test
    beforeEach(async () => {
      await prismaPostgres.test2.deleteMany({
        where: {
          id: {
            in: [TEST_ID_1, TEST_ID_2]
          }
        }
      });
    });

    afterEach(async () => {
      await prismaPostgres.test2.deleteMany({
        where: {
          id: {
            in: [TEST_ID_1, TEST_ID_2]
          }
        }
      });
    });

    describe("Basic Transaction Functionality with normal prisma", () => {
      it("should successfully commit a transaction", async () => {
        const result = await prismaBasic.$transaction(async (tx) => {
          await tx.test2.create({
            data: createTestData(TEST_ID_1, "Transaction Test 1")
          });
          return { success: true };
        });
        expect(result).toEqual({ success: true });
      });
    });

    describe("Basic Transaction Functionality", () => {
      it("should successfully commit a transaction", async () => {
        // Start a transaction
        const result = await prismaPostgres.$transaction(async (tx) => {
          // Create first record

          await tx.test2.create({
            data: createTestData(TEST_ID_1, "Transaction Test 1")
          });

          // Create second record
          await tx.test2.create({
            data: createTestData(TEST_ID_2, "Transaction Test 2")
          });

          // Return something from the transaction
          return { success: true };
        });

        expect(result).toEqual({ success: true });

        // Verify both records were created
        const record1 = await prismaPostgres.test2.findUnique({
          where: { id: TEST_ID_1 }
        });
        const record2 = await prismaPostgres.test2.findUnique({
          where: { id: TEST_ID_2 }
        });

        expect(record1).not.toBeNull();
        expect(record1?.string).toBe("Transaction Test 1");
        expect(record2).not.toBeNull();
        expect(record2?.string).toBe("Transaction Test 2");
      });

      it("should roll back the transaction when an error occurs", async () => {
        // Attempt a transaction that will fail
        try {
          await prismaPostgres.$transaction(async (tx) => {
            // Create first record
            await tx.test2.create({
              data: createTestData(TEST_ID_1, "Should be rolled back")
            });
            // Throw an error to cause rollback
            throw new Error("Intentional error to trigger rollback");
          });
          // Should not reach here
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as Error).message).toBe("Intentional error to trigger rollback");
        }
        // Verify the first record was NOT created (rollback worked)
        const record1 = await prismaPostgres.test2.findUnique({
          where: { id: TEST_ID_1 }
        });
        expect(record1).toBeNull();
      });
    });

    it("should handle multiple query types in a transaction", async () => {
      await prismaPostgres.test2.deleteMany({
        where: {
          id: {
            in: [TEST_ID_1, TEST_ID_2]
          }
        }
      });

      await prismaPostgres.$transaction(async (tx) => {
        // Create
        await tx.test2.create({
          data: createTestData(TEST_ID_1, "Complex Transaction")
        });

        // Read
        const created = await tx.test2.findUnique({ where: { id: TEST_ID_1 } });
        expect(created).not.toBeNull();
        expect(created?.string).toBe("Complex Transaction");

        // Update
        await tx.test2.update({
          where: { id: TEST_ID_1 },
          data: { string: "Updated Value" }
        });

        // Read again to confirm update
        const updated = await tx.test2.findUnique({ where: { id: TEST_ID_1 } });
        expect(updated?.string).toBe("Updated Value");

        // Upsert (update case)
        await tx.test2.upsert({
          where: { id: TEST_ID_1 },
          update: { string: "Upserted Value" },
          create: createTestData(TEST_ID_1, "Should not be used")
        });

        // Upsert (create case)
        await tx.test2.upsert({
          where: { id: TEST_ID_2 },
          update: { string: "Should not be used" },
          create: createTestData(TEST_ID_2, "Created via upsert")
        });
      });

      // Verify final state after transaction
      const record1 = await prismaPostgres.test2.findUnique({ where: { id: TEST_ID_1 } });
      const record2 = await prismaPostgres.test2.findUnique({ where: { id: TEST_ID_2 } });
      expect(record1?.string).toBe("Upserted Value");
      expect(record2?.string).toBe("Created via upsert");
    });
  },
  {
    concurrent: 1,
    sequential: true
  }
);
