import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import MuiModal from "@mui/material/Modal";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modelAtom";
import { Element, Genre, Movie } from "../typings";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = React.useState<string>("");
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [muted, setMuted] = React.useState(true);

  React.useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);
  const handleClose = () => {
    setShowModal(!showModal);
  };
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-50 h-10 w-10 bg-[#181818] hover:bg-[#141411] border-none"
        >
          <XIcon className="h-7 w-7" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
            <div className="flex space-x-2">
              <button className="flex items-center px-8 py-2 text-xl font-bold text-black transition bg-white rounded gap-x-2 hover:bg-gray-500">
                <FaPlay className="w-8 h-8 text-black" />
                Play
              </button>
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
            </div>

            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-7 w-7" />
              ) : (
                <VolumeUpIcon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#171717] px-10 py-10">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="text-xl font-bold text-white">
                {movie?.title || movie?.name}
              </p>
              <p className="font-semibold text-green-500">
                {movie?.vote_average * 10} Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex items-center justify-center h-4 px-2 py-0 text-xs border border-white rounded">
                HD
              </div>
            </div>
            <div className="flex flex-col font-light gap-x-10 gap-y-5 md:flex-row">
              <p className="w-5/6 text-justify">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-red-900">Genres: </span>
                  {genres.map((genre) => genre.name).join(" , ")}
                </div>
                <div>
                  <span className="text-[#a1a1a1]">Original Langauage: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[#a1a1a1]">Total Votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
