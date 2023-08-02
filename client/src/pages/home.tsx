import Cartoons from "../assets/cartoons.jpg";
import Spongebob from "../assets/spongebob.png";
import HarryPotter from "../assets/harry-potter.png";
import StarWars from "../assets/4k-star-wars-battlefront-helmet-btxw0mp8avfl87n5.jpg";
import Slider from "../components/slider";
import { RxAvatar as Avatar } from "react-icons/rx";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    return () => {
      const arr = document.getElementsByClassName("fly");
      let i = 0;
      while (i < arr.length) {
        arr[i].classList.remove("fly");
        i++;
      }
    };
  }, []);

  return (
    <div className="sm:max-w-[80vw] my-0 mx-auto">
      {/* <Slider /> */}
      <Carousel />
      <p className="capitalize text-2xl p-3">User Submitted Topix</p>
      <div className="flex justify-between p-2">
        <Stack />
        <Stack />
      </div>
      {/* <div className="flex my-5 justify-between p-3">
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
      </div> */}
      <Accordion />
    </div>
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
    <div className={`h-52 w-52 rounded-xl relative ${css}`}>
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

const Stack = () => {
  const data = [
    { text: "here", id: "card1" },
    { text: "Hello", id: "card2" },
    { text: "Hi", id: "card3" },
  ];
  const [stacks, setStacks] = useState(data);
  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById(stacks[stacks.length - 1].id)
        ?.classList.remove("fly");
    }, 1000);
  }, [stacks]);
  return (
    <div className="stack indicator w-52">
      {stacks.map((item) => (
        <div
          id={item.id}
          key={item.id}
          onClick={() => {
            document.getElementById(`${item.id}`)?.classList.add("fly");
            let arr = [...stacks];
            let old = arr.shift();
            if (old) arr.push(old);
            setStacks(arr);
            document.getElementById(`${item.id}`)?.remove();
          }}
          className="text-center border border-base-content card bg-base-100"
        >
          <div className="card-body">{item.text}</div>
        </div>
      ))}
      {/* <div
        id="card1"
        onClick={() => {
          document.getElementById("card1")?.classList.add("fly");
        }}
        className="border border-base-content card bg-base-100"
      >
        <div className="indicator-item badge badge-primary animate-bounce">
          Click Me!
        </div>
        <div className="flex p-2">
          <div className="avatar placeholder mr-3">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10 ring ring-primary ring-offset-base-100">
              <span className="text-2xl">T</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div>Ty</div>
            <div className="text-gray-400">Submissions: 2</div>
          </div>
        </div>
        <div className="card-body text-center">Here</div>
      </div>
      <div
        id="card2"
        onClick={() => {
          document.getElementById("card2")?.classList.add("fly");
        }}
        className="text-center border border-base-content card bg-base-100"
      >
        <div className="card-body">Here</div>
      </div>
      <div
        id="card3"
        onClick={() => {
          document.getElementById("card3")?.classList.add("fly");
        }}
        className="text-center border border-base-content card bg-base-100"
      >
        <div className="card-body">Here</div>
      </div> */}
    </div>
  );
};

const Accordion = () => {
  return (
    <div className="join join-vertical w-full p-3">
      <div className="collapse collapse-arrow join-item border border-base-300 focus-within:bg-secondary">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">
          Enjoy the fun with friends!
        </div>
        <div className="collapse-content text-center">
          <p>
            Create an account to start the conversation and settle the debate
            with friends!
          </p>
          <div className="btn btn-outline btn-primary w-full">Sign Up</div>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300 focus-within:bg-secondary">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">
          Test your knowledge on our favorite Topix Quizzes!
        </div>
        <div className="collapse-content text-center">
          <p>
            Think you're a Harry Potter Wiz? Are you the ultimate RDC fan? Test
            your knowledge here 👇
          </p>
          <div className="btn btn-outline btn-primary w-full">Click here</div>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300 focus-within:bg-secondary">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">Contact me!</div>
        <div className="collapse-content text-center">
          <p>
            Let me know what you like, don't like, chat to me about React, give
            me tips, alert me of bugs. Buzzzz 🐝
          </p>
          <div className="btn btn-outline btn-primary w-full">Click here</div>
        </div>
      </div>
    </div>
  );
};

const Carousel = () => {
  return (
    <>
      <div className="carousel h-32 sm:h-80 w-full">
        <div id="item1" className="carousel-item w-full">
          <img
            src={HarryPotter}
            className="w-full object-cover object-center"
          />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src={Spongebob} className="w-full object-cover object-center" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src={Cartoons} className="w-full object-cover object-center" />
        </div>
        <div
          id="item4"
          className="carousel-item w-full object-cover object-center"
        >
          <img src={StarWars} className="w-full" />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </>
  );
};
