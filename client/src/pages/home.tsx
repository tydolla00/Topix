import Cartoons from "../assets/cartoons.jpg";
import Spongebob from "../assets/spongebob.png";
import HarryPotter from "../assets/harry-potter.png";
import Slider from "../components/slider";
import { RxAvatar as Avatar } from "react-icons/rx";

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <img
          className="h-28 w-4/5 object-cover my-5 grayscale hover:grayscale-0 transition"
          src={Cartoons}
        />
      </div>
      <Slider />
      <div className="flex my-5 justify-between">
        <Square
          css="bg-[#6E2FF2] text-white"
          text="Best Cartoon Shows"
          img={Avatar}
        >
          <div className="flex justify-center">
            <button className="bg-white text-black rounded-full mx-auto px-6 py-1 absolute bottom-2">
              Click here
            </button>
          </div>
        </Square>
        <Square
          css="dark:bg-white bg-black text-white dark:text-black"
          text="Best Movies"
          img={Avatar}
        >
          <div className="flex justify-center">
            <button className="bg-black text-white rounded-full px-6 py-1 absolute bottom-2">
              Click here
            </button>
          </div>
        </Square>
      </div>
      <div className="flex justify-center">
        <div className="h-20 w-4/5  bg-[#90D2F8] rounded-xl p-1">
          <h2 className="text-black font-black uppercase text-xl mx-2">
            Create your own quizzes
          </h2>
          <p className="mx-2">Design quizzes for you and your friends</p>
        </div>
      </div>
    </>
  );
}

const Square = ({
  css,
  text,
  img,
  children,
}: {
  css: string;
  text: string;
  img: string;
  children: any;
}) => {
  return (
    <div className={`h-52 w-52 mx-5 rounded-xl relative ${css}`}>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-700 m-2 overflow-hidden">
          <Avatar className="text-5xl" />
          {/* <img className="rounded-full mb-4" src={img} /> */}
        </div>
        <div className="flex flex-col">
          <div className="">Ty</div>
          <div className="text-gray-400">Submissions: 2</div>
        </div>
      </div>
      <div className="w-1 text-lg ml-3 uppercase">{text}</div>
      {children}
    </div>
  );
};
