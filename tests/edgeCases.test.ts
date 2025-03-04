import { describe, it, expect } from "vitest";
import { prismaPg, prismaPostgres } from "../prisma.fixture";
describe("Edge Cases", () => {
  it("should be set the number value", async () => {
    const row = await prismaPg.test.findFirst({
      select: {
        id: true
      }
    });
    await prismaPg.test.update({
      where: { id: row?.id },
      data: { number: 1740996876934 }
    });
  });
  it("money array", async () => {
    const row1 = await prismaPostgres.test.findFirst({
      select: {
        moneyArray: true
      }
    });
    console.log(row1);
    const row = await prismaPostgres.oneToOne.findFirst({
      select: {
        test: {
          select: {
            moneyArray: true
          }
        }
      }
    });
    console.log(row);
  });
});
