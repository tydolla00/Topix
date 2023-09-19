import { prisma } from "../src/lib/utils";

// Seed db
const seed = async () => {
  await prisma.quizzes.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Harry Potter Quiz",
      description: "Test your knowledge on this magical quiz.",
      path: "HarryPotter",
      url: "harrypotter",
    },
  });
  await prisma.quizzes.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Football Quiz",
      description: "How well do you know football?",
      path: "Madden",
      url: "madden",
    },
  });
  await prisma.quizzes.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Math Quiz",
      description:
        "Challege your friends and have fun with this Math Quiz, updated every week!",
      path: "Math",
      url: "math",
    },
  });
  await prisma.quizzes.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Basketball Quiz",
      description: "How well do you know basketball?",
      path: "NBA",
      url: "nba",
    },
  });
  await prisma.quizzes.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "RDC Quiz",
      description: "Do you think you know RDC?",
      path: "RDC",
      url: "rdc",
    },
  });
  await prisma.quizzes.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Guess the Video Game Theme Songs",
      description:
        "Can you correctly guess all of these nostalgic theme songs?",
      path: "VideoGame",
      url: "videogamethemesongs",
    },
  });
};
seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
