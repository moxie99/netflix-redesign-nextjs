import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modelAtom";
import { imageUrl } from "../constants/movie";
import { Movie } from "../typings";

interface Props {
  movie: Movie;
}
const Thumbnail = ({ movie }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="h-24 min-w-[180px] relative cursor-pointer duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 "
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie?.backdrop_path || movie?.poster_path
        }`}
        className="object-cover rounded-sm md:rounded"
        layout="fill"
      />
    </div>
  );
};

export default Thumbnail;
