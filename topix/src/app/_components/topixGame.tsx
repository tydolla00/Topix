"use client";
import Image from "next/image";

import { useState } from "react";
import { TopixProps } from "./topixLayout";
import Scores from "./scores";
import { usePlayGame } from "../hooks/usePlayGame";
import { topix } from "@prisma/client";

export const TopixGame = ({ data }: { data: TopixProps }) => {
  const [playGame, setPlayGame] = useState(false);
  const { chooseWinner, players } = usePlayGame(data.topix);

  return (
    <>
      {!playGame ? (
        <div className="sm:m-10">
          <div className="flex mb-3">
            <Image
              src={
                data.img?.link ||
                "https://utfs.io/f/ed843baa-b3b2-42f1-8145-6c5e68973f2d-8ha0tr.jpeg"
              }
              width={50}
              height={50}
              alt="Topix Image"
              className="w-60 h-72 object-cover mr-4"
            />
            <section>
              <h1 className="text-3xl font-bold">{data.title}</h1>
              <p className="py-3">{data.description}</p>
              <button
                onClick={() => {
                  //   startGame();
                  //   setTimeout(() => {}, 2000);
                  setPlayGame(true);
                }}
                className="btn btn-primary ml-auto block"
              >
                Play
              </button>
            </section>
          </div>
          <section id="leaderboards">
            <p className="text-3xl font-bold">Leaderboards</p>
            <Scores topix={data.topix} scores={data.scores} />
          </section>
        </div>
      ) : (
        <>
          {players && (
            <>
              <button
                className="btn btn-primary btn-outline"
                onClick={() => {
                  if (players) chooseWinner(players[0]);
                }}
              >
                {(players && players[0]?.title) || ""}
              </button>
              <button
                className="btn btn-primary btn-outline"
                onClick={() => {
                  if (players) chooseWinner(players[1]);
                }}
              >
                {(players && players[1]?.title) || ""}
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};
