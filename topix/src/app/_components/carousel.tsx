import Image from "next/image";
import Cartoons from "@/app/assets/cartoons.jpg";
import Spongebob from "@/app/assets/spongebob.png";
import HarryPotter from "@/app/assets/harry-potter.png";
import StarWars from "@/app/assets/4k-star-wars-battlefront-helmet-btxw0mp8avfl87n5.jpg";

export const Carousel = () => {
  return (
    <>
      <div className="carousel h-32 sm:h-80 w-full">
        <div id="item1" className="carousel-item w-full">
          <Image
            alt="Harry Potter "
            src={HarryPotter}
            className="w-full object-cover object-center"
          />
        </div>
        <div id="item2" className="carousel-item w-full">
          <Image
            alt="Spongebob"
            src={Spongebob}
            className="w-full object-cover object-center"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <Image
            alt="Cartoon Compilation"
            src={Cartoons}
            className="w-full object-cover object-center"
          />
        </div>
        <div
          id="item4"
          className="carousel-item w-full object-cover object-center"
        >
          <Image alt="Star Wars" src={StarWars} className="w-full" />
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
