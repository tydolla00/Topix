// * Associated with old Movies function.
// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import { useAuth } from "../hooks/useAuth";
// import { FileInput } from "@/components/input";
import { TopixCard } from "@/app/components/card";
import { ShuffleIcon } from "lucide-react";
import Nickelodeon from "../assets/nickelodeon.png";
import Disney from "@/app/assets/disney.png";
import Marvel from "@/app/assets/marvel.webp";
import Movie from "@/app/assets/movie.png";

export default function Movies() {
  const data = [
    {
      description: "So many good choices...",
      title: "Best Nickelodeon Movie",
      img: Nickelodeon,
      url: "",
    },
    {
      description: "Ok this is hard...",
      title: "Best Disney Movie",
      img: Disney,
      url: "",
    },
    {
      description: "Thanos was right...",
      title: "Best Marvel Movie",
      img: Marvel,
      url: "",
    },
    {
      description: "It's Spiderman right?",
      title: "Best Marvel Superhero",
      img: Marvel,
      url: "",
    },
    {
      description: "Thanos was right",
      title: "Best Marvel Villains",
      img: Marvel,
      url: "",
    },
    {
      description: "It's Harry Potter for me but im biased",
      title: "Greatest Sci-Fi Film",
      img: Movie,
      url: "",
    },
  ];
  return (
    <div className="max-w-[85vw] my-0 mx-auto">
      <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 from-10% to-70% to-rose-500 my-4">
        Movies
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
