import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type SelfProps = {
  imageSrcArray: any;
};

export default function Carousel(props: SelfProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [arrayInitializer, setArrayInitializer] = useState<string[]>([]);
  // const sampleArray = ["/boxer.jpeg", "/green_miatex.jpeg"];

  useEffect(() => {
    if (props.imageSrcArray.length < 1) {
      return;
    }
    setArrayInitializer(JSON.parse(props.imageSrcArray));
  }, [props.imageSrcArray]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className="relative top-[12.5rem] flex justify-around space-x-48">
        <button
          type="button"
          className="top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={scrollPrev}
        >
          <div className="">
            <FontAwesomeIcon
              className="px-2 py-0  btn bg-inherit border-none rounded-full w-8 shadow-none text-xl"
              icon={faCircleArrowLeft}
            />
          </div>
        </button>
        <button
          type="button"
          className="top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={scrollNext}
        >
          <div className="">
            <FontAwesomeIcon
              className="px-2 py-0 btn bg-inherit border-none rounded-full w-8 shadow-none text-xl"
              icon={faCircleArrowRight}
            />
          </div>
        </button>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {/* <div className="embla__slide">
            <span>Content 1</span>
          </div>
          <div className="embla__slide">
            <span>Content 2</span>
          </div>
          <div className="embla__slide">
            <span>Content 3</span>
          </div> */}
          {arrayInitializer.length > 0 ? (
            arrayInitializer.map((item, index) => (
              <div className="embla__slide" key={index}>
                <Image
                  src={item}
                  width={1000}
                  height={1000}
                  loading="lazy"
                  className="object-scale-down h-[28rem]"
                  alt="..."
                />
              </div>
            ))
          ) : (
            <>Loading...</>
          )}
        </div>{" "}
      </div>

      {/* <div
        id="controls-carousel"
        className="relative w-full"
        data-carousel="static"
      >
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev=""
        >
          <div className="">
            <FontAwesomeIcon
              className="px-2 py-0  btn bg-inherit border-none rounded-full w-8 shadow-none text-xl"
              icon={faCircleArrowLeft}
            />
          </div>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next=""
        >
          <div className="">
            <FontAwesomeIcon
              className="px-2 py-0 btn bg-inherit border-none rounded-full w-8 shadow-none text-xl"
              icon={faCircleArrowRight}
            />
          </div>
        </button>
      </div> */}
    </>
  );
}
