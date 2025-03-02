import { PrismaClient, Prisma, Enum } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  // Use executeRaw to avoid model name resolution issues
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "ManyToMany" CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "OneToMany" CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "OneToOne" CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Test" CASCADE`
  ]);

  // Create test entries
  for (let i = 0; i < 10; i++) {
    // Using prisma client with explicit typing for the model
    const test = await (prisma as any).test.create({
      data: {
        string: faker.lorem.sentence(),
        stringArray: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        boolean: faker.datatype.boolean(),
        booleanArray: [faker.datatype.boolean(), faker.datatype.boolean()],
        date: faker.date.past(),
        dateArray: [faker.date.past(), faker.date.recent()],
        // Time data type
        time: new Date(),
        timeArray: [new Date(), new Date()],
        // Timestamp data type
        timestamp: new Date(),
        timestampArray: [new Date(), new Date()],
        // Timestamptz data type
        timestampz: new Date(),
        timestampzArray: [new Date(), new Date()],
        // Timetz data type
        timetz: new Date(),
        timetzArray: [new Date(), new Date()],
        number: faker.number.int({ min: 1, max: 1000 }),
        numberArray: [faker.number.int({ min: 1, max: 100 }), faker.number.int({ min: 1, max: 100 })],
        bigInt: BigInt(faker.number.int({ min: 1000000, max: 9999999 })),
        bigIntArray: [
          BigInt(faker.number.int({ min: 1000000, max: 9999999 })),
          BigInt(faker.number.int({ min: 1000000, max: 9999999 }))
        ],
        // SmallInt data type
        smallInt: faker.number.int({ min: 1, max: 32767 }),
        smallIntArray: [faker.number.int({ min: 1, max: 32767 }), faker.number.int({ min: 1, max: 32767 })],
        decimal: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
        decimalArray: [
          faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
          faker.number.float({ min: 0, max: 100, fractionDigits: 2 })
        ],
        // Money data type
        money: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
        moneyArray: [
          faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
          faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })
        ],
        float: faker.number.float({ min: 0, max: 1000 }),
        floatArray: [faker.number.float({ min: 0, max: 1000 }), faker.number.float({ min: 0, max: 1000 })],
        // Real data type
        real: faker.number.float({ min: 0, max: 1000 }),
        realArray: [faker.number.float({ min: 0, max: 1000 }), faker.number.float({ min: 0, max: 1000 })],
        // Double precision data type
        double: faker.number.float({ min: 0, max: 1000 }),
        doubleArray: [faker.number.float({ min: 0, max: 1000 }), faker.number.float({ min: 0, max: 1000 })],
        json: { data: faker.lorem.sentence() },
        jsonArray: [{ data: faker.lorem.sentence() }, { data: faker.lorem.sentence() }],
        enum: [Enum.ONE, Enum.TWO, Enum.THREE][Math.floor(Math.random() * 3)],
        enumArray: (() => {
          const values = [];
          if (Math.random() > 0.5) values.push(Enum.ONE);
          if (Math.random() > 0.5) values.push(Enum.TWO);
          if (Math.random() > 0.5) values.push(Enum.THREE);
          return values.length ? values : [Enum.ONE]; // Ensure at least one value
        })(),
        bytes: Buffer.from(faker.lorem.sentence()),
        bytesArray: [Buffer.from(faker.lorem.sentence()), Buffer.from(faker.lorem.sentence())]
      }
    });

    // Create OneToOne relation for some test entries
    if (i < 5) {
      await (prisma as any).oneToOne.create({
        data: {
          testId: test.id
        }
      });
    }

    // Create OneToMany relations
    const oneToManyCount = faker.number.int({ min: 1, max: 3 });
    for (let j = 0; j < oneToManyCount; j++) {
      await (prisma as any).oneToMany.create({
        data: {
          testId: test.id
        }
      });
    }
  }

  // Create ManyToMany relations
  const manyToManyEntries = 5;
  for (let i = 0; i < manyToManyEntries; i++) {
    const testIds = await (prisma as any).test.findMany({
      select: { id: true },
      take: faker.number.int({ min: 1, max: 5 })
    });

    await (prisma as any).manyToMany.create({
      data: {
        test: {
          connect: testIds.map((t: { id: string }) => ({ id: t.id }))
        }
      }
    });
  }

  console.log("Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
