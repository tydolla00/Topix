import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import HarryPotter from "../assets/harry-potter.png";
import { useNavigate } from "react-router-dom";
export const QuizCard = () => {
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

export const TopixCard = ({ title, description, url, img }: TopixCard) => {
  let navigate = useNavigate();
  return (
    <Card className="w-64 h-72 relative hover:scale-105 transition">
      <div className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <img className="max-h-[50px] object-cover w-full" src={img} />
        </CardHeader>
        <CardContent>
          <CardDescription className="">{description}</CardDescription>
        </CardContent>
        <div className="flex-grow" />
        <CardFooter className="relative">
          <button
            className="btn btn-ghost btn-primary btn-outline w-full"
            onClick={() => navigate(url)}
          >
            Play now
          </button>
        </CardFooter>
      </div>
    </Card>
  );
};

type TopixCard = {
  title: string;
  description: string;
  url: string;
  img: string;
};
