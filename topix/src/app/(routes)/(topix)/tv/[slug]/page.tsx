import TopixLayout from "@/app/_components/topixLayout";
import { prisma } from "@/lib/utils";

export default async function TV({ params }: { params: { slug: string } }) {
  const tv = await prisma.tv.findUnique({
    where: { topixId: params.slug },
    include: { scores: true, topix: true, img: true },
  });
  console.log(tv);
  return <TopixLayout slug={params.slug} url="tv" />;
}
