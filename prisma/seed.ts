import { PrismaClient, Enum } from "@prisma/client";

const faker = {
  lorem: {
    sentence: () => {
      const sentences = [
        "A random sentence for testing purposes.",
        "This is some sample text data.",
        "Database seeding is an important practice.",
        "Custom faker implementation for testing.",
        "No external dependencies needed here."
      ];
      return sentences[Math.floor(Math.random() * sentences.length)];
    },
    word: () => {
      const words = ["sample", "test", "random", "data", "word", "seed", "custom", "prisma"];
      return words[Math.floor(Math.random() * words.length)];
    }
  },
  datatype: {
    boolean: () => Math.random() > 0.5
  },
  date: {
    past: () => {
      const now = new Date();
      const daysAgo = Math.floor(Math.random() * 365);
      const past = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      return past;
    },
    recent: () => {
      const now = new Date();
      const hoursAgo = Math.floor(Math.random() * 24);
      const recent = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
      return recent;
    }
  },
  number: {
    int: ({ min, max }: { min: number; max: number }) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    float: ({ min, max, fractionDigits }: { min: number; max: number; fractionDigits?: number }) => {
      const value = Math.random() * (max - min) + min;
      if (fractionDigits !== undefined) {
        return parseFloat(value.toFixed(fractionDigits));
      }
      return value;
    }
  }
};

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
          const values: Enum[] = [];
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
