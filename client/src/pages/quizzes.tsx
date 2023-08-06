import QuizCard from "../components/card";

export default function Quizzes() {
  return (
    <div className="max-w-[80vw] my-0 mx-auto">
      <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 from-10% to-70% to-rose-500 my-4">
        Test your knowledge on user submitted quizzes
      </div>
      <button className="ml-auto btn btn-outline btn-success p-2 block">
        Add Quiz +
      </button>
      <div className="mt-4 flex flex-wrap gap-10">
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </div>
    </div>
  );
}
