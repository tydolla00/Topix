import { TopixCard } from "@/components/card";
import { ShuffleIcon } from "lucide-react";
import Xbox from "@/assets/xbox.png";
import Playstation from "@/assets/playstation.png";
import Nintendo from "@/assets/nintendo.png";
import VideoGame from "@/assets/videogame.png";
import Youtube from "@/assets/youtube.webp";

export default function Gaming() {
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
      <div className="flex flex-wrap gap-2">
        {data.map((cardItem) => (
          <div className="basis-1/3">
            <TopixCard
              description={cardItem.description}
              title={cardItem.title}
              img={cardItem.img}
              url={cardItem.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
