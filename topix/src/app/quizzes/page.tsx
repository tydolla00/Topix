import { QuizCard } from "../components/card";
import HarryPotter from "@/app/assets/harry-potter.webp";
import Madden from "@/app/assets/madden24.webp";
import Math from "@/app/assets/math.jpeg";
import RDC from "@/app/assets/rdcworld.png";
import NBA from "@/app/assets/nba.webp";
import VideoGame from "@/app/assets/videogame.png";

export default function Quizzes() {
  const data = [
    {
      description: "Test your knowledge on this magical quiz.",
      title: "Harry Potter Quiz",
      img: HarryPotter,
    },
    {
      description: "How well do you know football?",
      title: "Football Quiz",
      img: Madden,
    },
    {
      description:
        "Challege your friends and have fun with this Math Quiz, updated every week!",
      title: "Math Quiz",
      img: Math,
    },
    {
      description: "How well do you know basketball?",
      title: "Basketball Quiz",
      img: NBA,
    },
    { description: "Do you think you know RDC?", title: "RDC Quiz", img: RDC },
    {
      description:
        "Can you correctly guess all of these nostalgic theme songs?",
      title: "Guess the Video Game Theme Songs",
      img: VideoGame,
    },
  ];
  return (
    <div className="max-w-[80vw] my-0 mx-auto">
      <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 from-10% to-70% to-rose-500 my-4">
        Test your knowledge on user submitted quizzes
      </div>
      <button className="ml-auto btn btn-outline btn-success p-2 block">
        Add Quiz +
      </button>
      <div className="mt-4 flex flex-wrap gap-10">
        {data.map((quizcard) => (
          <QuizCard
            title={quizcard.title}
            description={quizcard.description}
            img={quizcard.img}
          />
        ))}
      </div>
    </div>
  );
}
