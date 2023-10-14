import { TopixCard } from "@/app/_components/card";
import { ShuffleIcon } from "lucide-react";
import Xbox from "@/app/assets/xbox.png";
import Playstation from "@/app/assets/playstation.png";
import Nintendo from "@/app/assets/nintendo.png";
import VideoGame from "@/app/assets/videogame.png";
import Youtube from "@/app/assets/youtube.webp";
import TopixForm from "@/app/_components/form";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/utils";

export default async function Gaming() {
  const games = await prisma.games.findMany({ include: { img: true } });
  const data = [
    {
      description: "Pika, pika ⚡️",
      title: "Best Nintendo Game Series",
      img: Nintendo,
      url: "",
    },
    {
      description: "Xbox gamers where y'all at?",
      title: "Best Xbox Game Series",
      img: Xbox,
      url: "",
    },
    {
      description: "Playstation gamers where y'all at?",
      title: "Best Playstation Game Series",
      img: Playstation,
      url: "",
    },
    {
      description: "Play now!",
      title: "Best Video Game Soundtracks",
      img: VideoGame,
      url: "",
    },
    {
      description: "This is TOUGH",
      title: "Best Youtube Era",
      img: Youtube,
      url: "",
    },
    {
      description: "Talk to me nicely",
      title: "Best Current Youtubers",
      img: Youtube,
      url: "",
    },
  ];
  return (
    <div className="max-w-[85vw] my-0 mx-auto">
      <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 from-10% to-70% to-rose-500 my-4">
        Gaming
      </div>
      <p className="text-gray-600">
        Pick a Topix from your favorite Television series
      </p>
      <button className="btn btn-outline btn-ghost btn-success">
        Random
        <ShuffleIcon />
      </button>
      <TopixForm database="game" sheetTitle="Create your own Gaming Topix!" />
      <div className="grid sm:grid-cols-3 grid-cols-2 gap-3">
        {games.map((game) => (
          <div key={game.title} className="basis-1/3">
            <TopixCard
              description={game.description}
              title={game.title}
              img={game.img.link}
              url={game.path}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
