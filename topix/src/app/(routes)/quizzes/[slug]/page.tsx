import { prisma } from "@/lib/utils";
import Image from "next/image";

export default async function Quiz({ params }: { params: { slug: string } }) {
  const quiz = await prisma.quizzes.findUniqueOrThrow({
    where: { url: params.slug },
  });
  console.log(quiz);
  return (
    <div>
      <Image
        className="w-full h-40 object-cover"
        alt="Header Image"
        src={`/${quiz.path}`}
        width={500}
        height={0}
      />
      <h1 className="text-3xl">{quiz.name}</h1>
    </div>
  );
}
