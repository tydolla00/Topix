import { prisma } from "@/lib/utils";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import Scores from "./scores";
import { TopixGame } from "./topixGame";
// This function will contain the layout for the slug pages of gaming, movies, and tv.
export default async function TopixLayout({
  slug,
  url,
}: {
  slug: string;
  url: "tv" | "game" | "movie";
}) {
  let data: TopixProps;
  switch (url) {
    case "game":
      data = await prisma.game.findUniqueOrThrow({
        where: { topixId: slug },
        include: { scores: true, topix: true, img: true },
      });
      break;
    case "movie":
      data = await prisma.movie.findUniqueOrThrow({
        where: { topixId: slug },
        include: { scores: true, topix: true, img: true },
      });
      break;
    case "tv":
      data = await prisma.tv.findUniqueOrThrow({
        where: { topixId: slug },
        include: { scores: true, topix: true, img: true },
      });
      break;
    default:
      throw new Error("Topix not found.");
  }
  return (
    <>
      <TopixGame data={data} />
    </>
  );
}

const topix = Prisma.validator<Prisma.gameDefaultArgs>()({
  include: { img: true, scores: true, topix: true },
});

export type TopixProps = Prisma.gameGetPayload<typeof topix>;

// type DataProps =
//   | (game & image & topix[] & Scores[])
//   | (tv & image & topix[] & Scores[])
//   | (movie & image & topix[] & Scores[]);
