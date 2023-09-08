"use client";
// ! import Slider from "../components/slider";
import { Stack } from "./components/stack";
import { Carousel } from "./components/carousel";
import { Accordion } from "./components/accordion";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const userSubmittedData: Stack = [
    {
      text: "Best Harry Potter Films",
      id: "card1",
      avi: "T",
      submitter: "Ty",
      url: "/movies/harrypotterfilms",
    },
    {
      text: "Best Roblox Games",
      id: "card2",
      avi: "J",
      submitter: "Josh",
      url: "/games/roblox",
    },
    {
      text: "Best Nickelodeon Shows",
      id: "card3",
      avi: "Z",
      submitter: "Zach",
      url: "/tv/nickelodeon",
    },
    {
      text: "Top Marvel Movies",
      id: "card4",
      avi: "J",
      submitter: "Josh",
      url: "/movies/marvel",
    },
    {
      text: "Best Disney Show",
      id: "card5",
      avi: "T",
      submitter: "Ty",
      url: "/tv/disney",
    },
    {
      text: "The True Sports GOAT",
      id: "card6",
      avi: "D",
      submitter: "Devin",
      url: "/sports/thegoat",
    },
  ];

  const hotTopixData: Stack = [
    {
      text: "Best NBA Player 2023",
      id: "card7",
      avi: "T",
      submitter: "Ty",
      url: "/sports/bestnba2023",
    },
    {
      text: "Best NFL Player 2023",
      id: "card8",
      avi: "T",
      submitter: "Ty",
      url: "/sports/bestnfl2023",
    },
    {
      text: "Best MLB Player 2023",
      id: "card9",
      avi: "T",
      submitter: "Ty",
      url: "/sports/bestmlb2023",
    },
  ];

  // useEffect(() => {
  //   return () => {
  //     const arr = document.getElementsByClassName("fly");
  //     let i = 0;
  //     while (i < arr.length) {
  //       arr[i].classList.remove("fly");
  //       i++;
  //     }
  //   };
  // }, []);

  return (
    <div className="sm:max-w-[80vw] my-0 mx-auto">
      {/* <Slider /> */}
      <Carousel />
      {session && (
        <>
          <h2>{session.user?.email}</h2>
          <h2>{session.user?.name}</h2>
        </>
      )}
      <p className="capitalize text-2xl p-3">User Submitted Topix</p>
      <div className="flex sm:flex-row flex-col gap-10 justify-between p-2">
        <Stack data={userSubmittedData.slice(0, 3)} />
        <Stack data={userSubmittedData.slice(3)} />
      </div>
      <p className="capitalize text-2xl p-3">Hot Topix 🔥</p>
      <Stack data={hotTopixData} />

      <Accordion />
    </div>
  );
}
