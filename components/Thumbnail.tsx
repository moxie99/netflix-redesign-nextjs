import Image from "next/image";
import React from "react";
import { imageUrl } from "../constants/movie";
import { Movie } from "../typings";

interface Props {
  movie: Movie;
}
const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="h-24 min-w-[180px] relative cursor-pointer duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 ">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie?.backdrop_path || movie?.poster_path
        }`}
        className="object-cover rounded-sm md:rounded"
        layout="fill"
      />
      <h4 className="absolute px-2 py-2 text-sm text-center text-black bg-white top-24">
        {movie?.title?.substring(0, 16) || movie?.name?.substring(0, 16)}
      </h4>
    </div>
  );
};

export default Thumbnail;
