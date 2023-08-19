import { TopixCard } from "@/components/card";
import { ShuffleIcon } from "lucide-react";
import Nickelodeon from "../assets/nickelodeon.png";
import Disney from "../assets/disney.png";
export default function Television() {
  return (
    <>
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
        <div className="basis-1/3">
          <TopixCard
            description="Avatar, Spongebob, Drake & Josh? Which is the BEST!!"
            title="Best Nickelodeon Show"
            img={Nickelodeon}
            url=""
          />
        </div>
        <div className="basis-1/3">
          <TopixCard
            description="Does anything get better than Mickey Mouse?"
            title="Best Disney Show"
            img={Disney}
            url=""
          />
        </div>
      </div>
    </>
  );
}
