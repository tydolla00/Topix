import { BiSolidCameraMovie as Movie } from "react-icons/bi";
import { PiTelevisionSimpleFill as TV } from "react-icons/pi";
import { RiMickeyFill as Mickey } from "react-icons/ri";
import Moon from "../assets/4k-star-wars-battlefront-helmet-btxw0mp8avfl87n5.jpg";
import { ParallaxBanner, useParallax } from "react-scroll-parallax";
import Space from "../assets/space.png";
import { useEffect, useRef } from "react";
// @ts-ignore
import Typed from "typed.js";

export default function ParallaxEffect() {
  const tvParallax: any = useParallax({
    rotateZ: [-120, 60],
  });
  const disneyParallax: any = useParallax({
    rotateZ: [120, -60],
  });
  const settleText: any = useParallax({
    translateX: [-50, 5],
    startScroll: 100,
    endScroll: 400,
  });
  const typer = useRef(null);

  const colorfulText = [
    [
      { text: "Top Movies", class: "from-purpleGrad to-pinkGrad" },
      { text: "Best Disney Show", class: "from-blueGrad to-redGrad" },
      { text: "Top Movies", class: "from-lightblueGrad to-whiteGrad" },
    ],
    [
      { text: "Best Disney Show", class: "from-purpleGrad to-pinkGrad" },
      { text: "Best Sci-Fi Movies", class: "from-blueGrad to-redGrad" },
      { text: "Top Anime Shows", class: "from-lightblueGrad to-whiteGrad" },
    ],
    [
      { text: "Best Actors", class: "from-purpleGrad to-pinkGrad" },
      { text: "Top Athletes", class: "from-blueGrad to-redGrad" },
      {
        text: "Best Nickelodeon Shows",
        class: "from-lightblueGrad to-whiteGrad",
      },
    ],
    [
      { text: "Best Sport", class: "from-purpleGrad to-pinkGrad" },
      { text: "Top Gaming", class: "from-blueGrad to-redGrad" },
    ],
  ];

  useEffect(() => {
    const typed = new Typed(typer.current, {
      strings: [
        "Settle the debate on the best tv shows, movies, and much more. ",
      ],
      typeSpeed: 30,
      showCursor: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="h-[9000px]">
        <div className="text-center text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-600 from-30% to-80% to-rose-500 my-4">
          Welcome to Topix...
        </div>
        <div
          ref={typer}
          className="text-white text-center font-worksans h-20 font-black uppercase text-3xl mb-5"
        />
        {/* <div className="flex justify-center my-5">
          <button className="transition duration-300 w-24 bg-sky-300 hover:animate-bounce text-black hover:bg-slate-600 rounded-md">
            Click me
          </button>
        </div> */}
        <div className="h-[75vh]">
          <div className="flex flex-wrap justify-center mb-10">
            <div className="origin-bottom-right" ref={tvParallax.ref}>
              <Cards message="Best TV Shows" img={<TV />} />
            </div>
            <Cards z={10} message="Best Sci-Fi Movies" img={<Movie />} />
            <div className="origin-bottom-left" ref={disneyParallax.ref}>
              <Cards message="Best Disney Shows" img={<Mickey />} />
            </div>
          </div>
        </div>
        {/* <ParallaxBanner
            className="h-96 text-white"
            layers={[
              { image: Space, speed: 10 },
              {
                speed: -20,
                children: (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-white text-center text-4xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-sky-600 flex justify-center items-center"></div>
                  </div>
                ),
              },
            ]}
          /> */}
        {/* <div className="w-full rounded-full h-2.5 bg-gray-700">
            <div className="rounded-full bg-blue-600 h-2.5 w-[45%]"></div>
          </div> */}
        <div
          ref={settleText.ref}
          className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-600 from-30% to-80% to-rose-500"
        >
          Settle the debate
        </div>
        {colorfulText.map((item) => (
          <div className="text-3xl flex overflow-clip mb-10">
            {item.map((item, index) => (
              <ColorLines item={item} index={index} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

const ColorLines = ({
  item,
  index,
}: {
  item: { text: string; class: string } | any;
  index: number;
}) => (
  <div
    className={`text-transparent bg-clip-text bg-gradient-to-r inline-block after:content-['·'] mr-2 shrink-0 ${item.class}`}
    key={index}
  >
    {item.text}
  </div>
);

const Cards = ({
  message,
  img,
  z,
}: {
  message: string;
  img: JSX.Element;
  z?: number;
}) => (
  <div
    className={`flex h-[180px] cursor-pointer w-[120px] bg-white justify-center items-center rounded-lg z-${z}`}
  >
    <div className="h-[170px] w-[110px] bg-red-300 font-extrabold">
      <div className="text-center">{message}</div>
      <div className="flex justify-center text-7xl">{img}</div>
    </div>
  </div>
);
