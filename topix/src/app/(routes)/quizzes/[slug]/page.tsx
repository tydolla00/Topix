import { prisma } from "@/lib/utils";
import Image from "next/image";
import Madden from "../../../assets/madden24.webp";
import { TabCard } from "./client";

export default async function Quiz({ params }: { params: { slug: string } }) {
  const quiz = await prisma.quizzes.findUniqueOrThrow({
    where: { url: params.slug },
  });
  console.log(quiz);
  return (
    <div className="sm:m-10">
      <div className="flex mb-3">
        <Image
          className="w-60 h-72 object-cover mr-4"
          alt="Header Image"
          src={Madden}
          width={500}
          height={500}
        />
        <div className="">
          <h1 className="text-3xl font-bold">{quiz.name}</h1>
          <p>Submitted by Ty</p>
          <p className="py-3">
            Football has been around for over a century. This quiz includes a
            range of topics starting from the 2000s with some pre 2000s
            questions sprinkled about. If you&apos;re a fan of the game this is
            the perfect game to test your knowledge!
          </p>
          <button className="btn btn-primary ml-auto block">Play</button>
        </div>
      </div>
      <section id="leaderboards" className="x">
        <p className="text-3xl font-bold">Leaderboards</p>
        <TabCard />
      </section>
    </div>
  );
}
