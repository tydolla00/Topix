export default function Topics() {
  const data = [
    "Best Nickelodeon Show",
    "Best Disney Show",
    "Best Anime",
    "Best TV Shows",
    "Best Video Game Soundtracks",
    "Best Movie Soundtracks",
    "Best Youtube Eras",
    "Best Sci-Fi Movie",
    "Best Cartoon",
    "Best Villain",
    "Best Hero",
    "Best Disney Channel Show",
  ];
  return (
    <>
      <div className="max-w-[80vw] my-0 mx-auto">
        <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-rose-500 my-4">
          Topics
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
          {data.map((item) => (
            <Topic text={item} />
          ))}
        </div>
      </div>
    </>
  );
}

const Topic = ({ text }: { text: string }) => {
  return (
    <div className="dark:bg-white dark:text-black bg-black text-white cursor-pointer text-md rounded-full w-48 h-14 p-.5 text-center flex items-center justify-center">
      {text}
    </div>
  );
};
