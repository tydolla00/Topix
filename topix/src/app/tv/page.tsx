import { TopixCard } from "@/app/components/card";
import { ShuffleIcon } from "lucide-react";
import Disney from "@/app/assets/disney.png";
import Anime from "@/app/assets/anime.png";
import Movie from "@/app/assets/movie.png";
import Music from "@/app/assets/music.png";
import Sitcom from "@/app/assets/sitcom.gif";
export default function Television() {
  const data = [
    {
      description: "This one is gonna get heated..",
      title: "Best Anime Show",
      img: Anime,
      url: "",
    },
    {
      description: "Play Now!",
      title: "Best TV Series 2000s",
      img: Movie,
      url: "",
    },
    {
      description: "Play Now!",
      title: "Best TV Series 2010s",
      img: Disney,
      url: "",
    },
    {
      description: "This one is fun!",
      title: "Best Disney Show",
      img: Disney,
      url: "",
    },
    {
      description: "This is a fan favorite.",
      title: "Best TV Theme Song",
      img: Music,
      url: "",
    },
    {
      description:
        "No need for a decade, they don't make them how they used to",
      title: "Best Sit-Coms",
      img: Sitcom,
      url: "",
    },
  ];
  return (
    <div className="max-w-[85vw] my-0 mx-auto">
      <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 from-10% to-70% to-rose-500 my-4">
        Television
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
