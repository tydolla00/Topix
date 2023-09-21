import { QuizCard } from "../../components/card";
import Harry_Potter from "@/app/assets/harry-potter.webp";
import _Madden from "@/app/assets/madden24.webp";
import _Math from "@/app/assets/math.jpeg";
import _RDC from "@/app/assets/rdcworld.png";
import _NBA from "@/app/assets/nba.webp";
import Video_Game from "@/app/assets/videogame.png";
import { prisma } from "@/lib/utils";

const fetchQuizzes = async () => {
  const quizzes = await prisma.quizzes.findMany();
  return quizzes;
};

export default async function Quizzes() {
  // const data = await fetch("http://localhost:3000/api/quizzes");
  // const response: quizzes[] = await data.json();
  const quizzes = await fetchQuizzes();

  const map = {
    HarryPotter: Harry_Potter,
    Madden: _Madden,
    Math: _Math,
    RDC: _RDC,
    NBA: _NBA,
    VideoGame: Video_Game,
  };
  const maps = new Map(Object.entries(map));

  return (
    <div className="max-w-[80vw] my-0 mx-auto">
      <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 from-10% to-70% to-rose-500 my-4">
        Test your knowledge on user submitted quizzes
      </div>
      <button className="ml-auto btn btn-outline btn-success p-2 block">
        Add Quiz +
      </button>
      <div className="mt-4 flex flex-wrap gap-10">
        {quizzes.map((quizcard) => (
          <QuizCard
            key={quizcard.name}
            title={quizcard.name}
            description={quizcard.description}
            img={maps.get(quizcard.path || "harrypotter") || ""}
            url={quizcard.url}
          />
        ))}
      </div>
    </div>
  );
}
