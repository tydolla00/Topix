import { useRef } from "react";
import {
  AiOutlineArrowLeft as LeftArrow,
  AiOutlineArrowRight as RightArrow,
} from "react-icons/ai";

export default function Slider() {
  const ref = useRef<any>(null);
  const scroll = (offset: number) => {
    if (ref) ref.current.scrollLeft += offset;
  };
  return (
    <>
      <div className="flex items-center">
        <LeftArrow
          onClick={() => scroll(-300)}
          className="text-white relative left-0 text-4xl"
        />
        <div className="flex gap-4">
          <Slide />
          <Slide />
          <Slide />
          <Slide />
        </div>
        <RightArrow
          onClick={() => scroll(300)}
          className="text-white relative right-0 text-4xl"
        />
      </div>
    </>
  );
}

const SlideContainer = () => <></>;

const Slide = () => (
  <>
    <div className="flex justify-center items-center h-36 w-24 bg-white cursor-pointer">
      <div className="bg-pink-400 h-32 w-20"></div>
    </div>
  </>
);

type SlideProps = {
  title: string;
};
