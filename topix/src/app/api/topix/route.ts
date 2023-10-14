import { prisma } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const {
      crud,
      database,
      createdBy,
      title,
      topixId,
      description,
      fileKey,
      link,
      topix,
    }: TopixForm = response;
    console.log({ response });

    const topixData = {
      createdBy: createdBy,
      title: title,
      topixId: topixId,
      description: description,
      img: { create: { fileKey: fileKey, link: link } },
      topix: {
        create: topix.map((topixItem) => ({
          title: topixItem.name,
          link: topixItem.type,
        })),
      },
    };

    switch (database) {
      case "game":
        await prisma.game.create({ data: topixData });
        break;
      case "tv":
        await prisma.tv.create({ data: topixData });
        break;
      case "movie":
        await prisma.movie.create({ data: topixData });
        break;
      case "games":
        // await prisma.games.create({})
        break;
      case "movies":
        // await prisma.movies.create({})
        break;
      case "tvs":
        // await prisma.tvs.create({})
        break;
      default:
        throw new Error();
    }
    return new NextResponse(
      "Submission successful. You're topix is currently under review."
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("Unique constraint failed: ", error.message, error.code);
        return NextResponse.json(
          "The topixId you have chosen is taken, please choose a different topixId.",
          { status: 404 }
        );
      }
    }
    return new NextResponse("Unknown error ocurred", { status: 400 });
  }
}

type TopixForm = {
  crud: "CREATE" | "UPDATE" | "DELETE";
  database: "game" | "movie" | "tv" | "user" | "games" | "movies" | "tvs";
  createdBy: string;
  title: string;
  topixId: string;
  description: string;
  fileKey: string;
  link: string;
  topix: { name: string; type: string }[];
};
