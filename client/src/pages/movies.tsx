// * Associated with old Movies function.
// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import { useAuth } from "../hooks/useAuth";
// import { FileInput } from "@/components/input";
import { TopixCard } from "@/components/card";
import { ShuffleIcon } from "lucide-react";
import Nickelodeon from "../assets/nickelodeon.png";
import Disney from "../assets/disney.png";

export default function Movies() {
  return (
    <>
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
        <div className="basis-1/3">
          <TopixCard
            description="So many good choices..."
            title="Best Nickelodeon Movie"
            img={Nickelodeon}
            url=""
          />
        </div>
        <div className="basis-1/3">
          <TopixCard
            description="Ok this is hard..."
            title="Best Disney Movie"
            img={Disney}
            url=""
          />
        </div>
      </div>
    </>
  );
}
