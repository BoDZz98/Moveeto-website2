import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import React from "react";

type MovieGridItemProps = {
  movie: { title?: string; backdrop_path?: string; vote_count?: number };
};

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={4}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const MovieGridItem = ({ movie }: MovieGridItemProps) => {
  return (
    <div className="rounded-xl h-fit w-full bg-gray-800 flex flex-col">
      <Image
        src={baseImageURL + movie.backdrop_path}
        alt="movie img"
        width={300}
        height={300}
        className="rounded-t-xl  w-full"
      />
      <div className="flex flex-col gap-y-3 p-4">
        <h1 className="text-white text-4xl font-bold py-2 ">
          {movie.title}
        </h1>
        <div className="flex items-center gap-x-1 rounded p-2 bg-gray-600 w-fit">
          {plusIcon}
          {movie.vote_count}
        </div>
      </div>
    </div>
  );
};

export default MovieGridItem;
