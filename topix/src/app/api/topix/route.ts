import { prisma } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
  } = response;
  console.log({ response });
  console.log(request);
  const update = await prisma.game.create({
    data: {
      createdBy: createdBy,
      title: title,
      topixId: topixId,
      description: description,
      img: {
        create: {
          fileKey: fileKey,
          link: link,
        },
      },
    },
  });
  console.log(update);
  return new NextResponse("Wow");
}
