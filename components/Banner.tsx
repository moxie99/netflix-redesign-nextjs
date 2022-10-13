import Image from "next/image";
import React from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/outline";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col py-16 space-y-2 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 md:px-6 lg:px-10">
      <div className="absolute top-0 left-0 w-screen -z-10 h-[95vh]">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1 className="my-10 text-2xl font-bold text-gray-100 lg:text-7xl md:text-4xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>

      <p className="max-w-xs text-xs md:max-w-lg text-shadow-md md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-5">
        <button className="text-black bg-white bannerButton">
          <FaPlay className="w-4 h-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button className="bg-gray-500 bannerButton">
          More Info
          <InformationCircleIcon className="w-5 h-5 text-white md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
