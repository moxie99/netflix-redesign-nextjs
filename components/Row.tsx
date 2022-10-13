import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}
const Row = ({ title, movies }: Props) => {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = React.useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div>
      <h2 className="w-56 font-semibold transition duration-200 cursor-pointer text-gray-50 hover:text-white md:text-2xl lg:3xl">
        {title}
      </h2>
      <div className="relative h-40 space-y-1 group md:-ml-2 md:space-y-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 z-40 w-10 h-10 m-auto transition opacity-0 cursor-pointer left-2 hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-3 md:p-2 scrollbar-hide"
        >
          {movies.map((movie, index) => (
            <Thumbnail movie={movie} key={index.toString()} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute bottom-0 z-40 m-auto transition opacity-0 cursor-pointer top-9 w-9 h-9 right-2 hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
