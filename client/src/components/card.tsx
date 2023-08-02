import HarryPotter from "../assets/harry-potter.png";
const QuizCard = () => {
  return (
    <div className="card w-5/12 bg-base-300 shadow-xl max-w-[175px] max-h-[377px]">
      <figure>
        <img alt="Harry Potter" src={HarryPotter} />
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title text-md text-center">
          Harry Potter Quiz
          {/* <div className="badge badge-secondary text-xs">NEW</div> */}
        </h2>
        <p className="italic text-sm">
          Test your knowledge on this very difficult Harry Potter quiz.
        </p>
      </div>
    </div>
  );
};
export default QuizCard;
