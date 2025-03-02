import { describe, it, expect } from "vitest";
import { prismaBasic, prismaPostgres } from "../prisma.fixture";
const id = "0e43802a-afd6-4963-b251-139e3c84a294";

describe("Comparison Test", () => {
  it("should handle string the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { string: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { string: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle string array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { stringArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { stringArray: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle boolean the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { boolean: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { boolean: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle boolean array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { booleanArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { booleanArray: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle date the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { date: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { date: true } });
    expect(basic?.date.toISOString()).toEqual(postgres?.date.toISOString());
  });

  it("should handle date array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { dateArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { dateArray: true } });
    expect(basic?.dateArray.map((d) => d.toISOString())).toEqual(postgres?.dateArray.map((d) => d.toISOString()));
  });

  it("should handle number the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { number: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { number: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle number array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { numberArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { numberArray: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle bigInt the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { bigInt: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { bigInt: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle bigInt array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { bigIntArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { bigIntArray: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle decimal the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { decimal: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { decimal: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle decimal array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { decimalArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { decimalArray: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle float the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { float: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { float: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle float array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { floatArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { floatArray: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle json the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { json: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { json: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle json array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { jsonArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { jsonArray: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle enum the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { enum: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { enum: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle enum array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { enumArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { enumArray: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle bytes the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { bytes: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { bytes: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle bytes array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { bytesArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { bytesArray: true } });
    expect(basic).toEqual(postgres);
  });

  // Time data type tests
  it("should handle time the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { time: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { time: true } });
    expect(basic?.time.toISOString()).toEqual(postgres?.time.toISOString());
  });

  it("should handle time array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { timeArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { timeArray: true } });
    expect(basic?.timeArray.map((t) => t.toISOString())).toEqual(postgres?.timeArray.map((t) => t.toISOString()));
  });

  // Timestamp data type tests
  it("should handle timestamp the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { timestamp: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { timestamp: true } });
    expect(basic?.timestamp.toISOString()).toEqual(postgres?.timestamp.toISOString());
  });

  it("should handle timestamp array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { timestampArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { timestampArray: true } });
    expect(basic?.timestampArray.map((t) => t.toISOString())).toEqual(
      postgres?.timestampArray.map((t) => t.toISOString())
    );
  });

  // Timestamptz data type tests
  it("should handle timestampz the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { timestampz: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { timestampz: true } });
    expect(basic?.timestampz.toISOString()).toEqual(postgres?.timestampz.toISOString());

    console.log({ basic, postgres });
  });

  // it("should handle timestampz array the same way", async () => {
  //   const basic = await prismaBasic.test.findUnique({ where: { id }, select: { timestampzArray: true } });
  //   console.log(basic?.timestampzArray);
  //   const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { timestampzArray: true } });
  //   console.log(postgres?.timestampzArray);
  //   expect(basic?.timestampzArray.map((t) => t.toISOString())).toEqual(
  //     postgres?.timestampzArray.map((t) => t.toISOString())
  //   );
  // });

  // Timetz data type tests
  it("should handle timetz the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { timetz: true } });
    console.log(basic?.timetz);
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { timetz: true } });
    console.log(postgres?.timetz);
    expect(basic?.timetz.toISOString()).toEqual(postgres?.timetz.toISOString());
  });

  // it("should handle timetz array the same way", async () => {
  //   const basic = await prismaBasic.test.findUnique({ where: { id }, select: { timetzArray: true } });
  //   console.log(basic?.timetzArray);
  //   const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { timetzArray: true } });
  //   console.log(postgres?.timetzArray);
  //   expect(basic?.timetzArray.map((t) => t.toISOString())).toEqual(postgres?.timetzArray.map((t) => t.toISOString()));
  // });

  // SmallInt data type tests
  it("should handle smallInt the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { smallInt: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { smallInt: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle smallInt array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { smallIntArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { smallIntArray: true } });
    expect(basic).toEqual(postgres);
  });

  // Money data type tests
  it("should handle money the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { money: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { money: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle money array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { moneyArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { moneyArray: true } });
    expect(basic).toEqual(postgres);
  });

  // Real data type tests
  it("should handle real the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { real: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { real: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle real array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { realArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { realArray: true } });
    expect(basic).toEqual(postgres);
  });

  // Double precision data type tests
  it("should handle double the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { double: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { double: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle double array the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { doubleArray: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { doubleArray: true } });
    expect(basic).toEqual(postgres);
  });
});

describe("Relation comparison Test", () => {
  it("should handle OneToOne relation the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { OneToOne: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { OneToOne: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle oneToMany relation the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { oneToMany: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { oneToMany: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle manyToMany relation the same way", async () => {
    const basic = await prismaBasic.test.findUnique({ where: { id }, select: { manyToMany: true } });
    const postgres = await prismaPostgres.test.findUnique({ where: { id }, select: { manyToMany: true } });
    expect(basic).toEqual(postgres);
  });

  it("should handle OneToOne relation from the inverse side", async () => {
    const basicOneToOne = await prismaBasic.oneToOne.findUnique({
      where: { testId: id }
    });
    const postgresOneToOne = await prismaPostgres.oneToOne.findUnique({
      where: { testId: id }
    });

    expect(basicOneToOne).toEqual(postgresOneToOne);
  });

  it("should handle OneToMany relation from the inverse side", async () => {
    const basicOneToMany = await prismaBasic.oneToMany.findMany({
      where: { testId: id }
    });
    const postgresOneToMany = await prismaPostgres.oneToMany.findMany({
      where: { testId: id }
    });

    expect(basicOneToMany).toEqual(postgresOneToMany);
  });

  it("should handle ManyToMany relation from the inverse side", async () => {
    const basicManyToMany = await prismaBasic.manyToMany.findMany({
      include: { test: true }
    });
    const postgresManyToMany = await prismaPostgres.manyToMany.findMany({
      include: { test: true }
    });

    expect(basicManyToMany).toEqual(postgresManyToMany);
  });

  // Advanced relation operations tests
  it("should handle relation filtering the same way", async () => {
    // Test filtering by relation existence
    const basicWithOneToOne = await prismaBasic.test.findMany({
      where: {
        OneToOne: { isNot: null }
      }
    });
    const postgresWithOneToOne = await prismaPostgres.test.findMany({
      where: {
        OneToOne: { isNot: null }
      }
    });

    expect(basicWithOneToOne).toEqual(postgresWithOneToOne);
  });

  it("should handle relation nested filtering the same way", async () => {
    // Test nested filtering on relations
    const basicNested = await prismaBasic.test.findMany({
      where: {
        oneToMany: {
          some: {
            id: { not: "" }
          }
        }
      }
    });
    const postgresNested = await prismaPostgres.test.findMany({
      where: {
        oneToMany: {
          some: {
            id: { not: "" }
          }
        }
      }
    });

    expect(basicNested).toEqual(postgresNested);
  });

  it("should handle relation ordering the same way", async () => {
    // Test ordering by related records count
    const basicOrdered = await prismaBasic.test.findMany({
      orderBy: {
        oneToMany: {
          _count: "desc"
        }
      },
      take: 5
    });
    const postgresOrdered = await prismaPostgres.test.findMany({
      orderBy: {
        oneToMany: {
          _count: "desc"
        }
      },
      take: 5
    });

    expect(basicOrdered).toEqual(postgresOrdered);
  });

  it("should handle nested includes the same way", async () => {
    // Test deep nested includes
    const basicNested = await prismaBasic.test.findUnique({
      where: { id },
      include: {
        OneToOne: true,
        oneToMany: {
          include: {
            test: {
              include: {
                manyToMany: true
              }
            }
          }
        }
      }
    });
    const postgresNested = await prismaPostgres.test.findUnique({
      where: { id },
      include: {
        OneToOne: true,
        oneToMany: {
          include: {
            test: {
              include: {
                manyToMany: true
              }
            }
          }
        }
      }
    });

    console.dir({ basicNested }, { depth: null });
    expect(basicNested).toEqual(postgresNested);
  });
});
