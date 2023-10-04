import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export const QuizCard = ({
  title,
  img,
  description,
  url,
}: {
  title: string;
  img: string | StaticImageData;
  description: string;
  url: string;
}) => {
  return (
    <div className="card w-5/12 bg-base-300 shadow-xl max-w-[175px] max-h-[377px] cursor-pointer hover:scale-105 transition">
      <Link href={`quizzes/${url}`}>
        <figure>
          <Image alt="Quiz Card Image" src={img} />
        </figure>
        <div className="card-body p-5">
          <h2 className="card-title text-md text-center">
            {title}
            {/* <div className="badge badge-secondary text-xs">NEW</div> */}
          </h2>
          <p className="italic text-sm">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export const TopixCard = ({ title, description, url, img }: TopixCard) => {
  return (
    <Card className="md:w-64 md:h-72 w-52 h-[270px] relative hover:scale-105 transition">
      <div className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl text-center">
            {title}
          </CardTitle>
          <Image
            alt="Quiz Card Image"
            className="max-h-[50px] object-cover w-full"
            src={img}
          />
        </CardHeader>
        <CardContent>
          <CardDescription className="">{description}</CardDescription>
        </CardContent>
        <div className="flex-grow" />
        <CardFooter className="relative">
          <Link
            className="btn btn-ghost btn-primary btn-outline w-full"
            href={url}
          >
            Play now
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

type TopixCard = {
  title: string;
  description: string;
  url: string;
  img: StaticImageData;
};
