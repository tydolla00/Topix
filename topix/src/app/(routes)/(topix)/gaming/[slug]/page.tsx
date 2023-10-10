import TopixLayout from "@/app/_components/topixLayout";
import { prisma } from "@/lib/utils";

export default async function Game({ params }: { params: { slug: string } }) {
  const game = await prisma.game.findUnique({
    where: { topixId: params.slug },
    include: { scores: true, topix: true, img: true },
  });
  console.log(game);
  return <TopixLayout slug={params.slug} url="game" />;
}
