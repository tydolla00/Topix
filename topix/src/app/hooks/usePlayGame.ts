"use client";

import { topix } from "@prisma/client";
import { useEffect, useState } from "react";

export const usePlayGame = (topix: topix[]) => {
  const [players, setPlayers] = useState<Players>();
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(topix.length - 1);
  const [contestants, setContestants] = useState<topix[]>([]);
  const [winners, setWinners] = useState<topix[]>([]);

  useEffect(() => {
    const array = randomizeOrder(topix);
    setContestants([...array]);
    setPlayers([array[front], array[back]]);
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(winners, null, 2));
  }, [winners]);

  function randomizeOrder(array: topix[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function advanceRound(winner: topix) {
    console.log("got here");
    const nextRound = [...winners, winner];
    setContestants(nextRound);
    setPlayers([nextRound[0], nextRound[nextRound.length - 1]]);
    setFront(0);
    setBack(nextRound.length - 1);
    setWinners([]);
  }

  function endGame(winner: topix) {
    console.log(`${winner.title} has won! Congratulations.`);
    setContestants([]);
    setWinners([]);
  }

  function chooseWinner(winner: topix) {
    if (contestants.length === 2) return endGame(winner);
    setWinners((prevState) => [...prevState, winner]);
    if (front + 1 >= back - 1) return advanceRound(winner);
    setPlayers([contestants[front + 1], contestants[back - 1]]);
    setFront(front + 1);
    setBack(back - 1);
  }

  console.log({ winners, players, contestants, front, back });
  return { chooseWinner, players };
};

export type Players = [x: topix, y: topix];
