import QuizCard from "../components/card";

export default function Quizzes() {
  const data = [
    {
      title: "Random Quiz",
      message: "Take a random quiz",
    },
    {
      title: "NFL Quiz",
      message: "Test your knowledge out with this NFL Quiz.",
    },
    {
      title: "RDC Quiz",
      message:
        "Test your knowledge of the RDC members in this action packed RDC Quiz.",
    },
    {
      title: "Youtuber Quiz",
      message:
        "Do you think do you know all about Youtube? Check this quiz out for more details!",
    },
    {
      title: "NBA Quiz",
      message: "Test your knowledge out with this NBA Quiz.",
    },
  ];
  return (
    <div className="max-w-[80vw] my-0 mx-auto">
      <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 from-10% to-70% to-rose-500 my-4">
        Test your knowledge on user submitted quizzes
      </div>
      <button className="ml-auto btn btn-outline btn-success p-2 block">
        Add Quiz +
      </button>
      <div className="mt-4 flex flex-wrap gap-10">
        {/* {data.map((item) => (
          <Quiz key={item.message} title={item.title} message={item.message} />
        ))} */}
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </div>
    </div>
  );
}

const Quiz = ({ title, message }: { title: string; message: string }) => {
  return (
    <div className="rounded-xl bg-black text-white dark:text-black dark:bg-white p-3 w-full mb-4 cursor-pointer">
      <div>{title}</div>
      <div className="h-0.5 bg-black" />
      <div className="">{message}</div>
    </div>
  );
};
