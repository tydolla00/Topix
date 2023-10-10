import TopixLayout from "@/app/_components/topixLayout";
import { prisma } from "@/lib/utils";

export default async function Movie({ params }: { params: { slug: string } }) {
  const movie = await prisma.movie.findUniqueOrThrow({
    where: { topixId: params.slug },
    include: { scores: true, topix: true, img: true },
  });
  console.log(movie);
  return <TopixLayout slug={params.slug} url="movie" />;
}
