import { userMovieObj } from "@/models/userModel";
import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import MGIButtonGroup from "./MGIButtonGroup";

type MovieGridItemProps = {
  movie: userMovieObj;
};

const MovieGridItem = memo(function MovieGridItem({
  movie,
}: MovieGridItemProps) {
  return (
    <div className="relative rounded-xl hover:rounded-b-none  h-fit w-full bg-gray-800 flex flex-col group transition-all ease-in-out duration-1000 " data-testid='movieGridItem'>
      <Image
        src={baseImageURL + movie.backdrop_path}
        alt="movie img"
        width={300}
        height={300}
        className="rounded-t-xl  w-full"
      />
      <div className="flex flex-col gap-y-3 p-4">
        <Link href={`/movie/${movie.id}`}>
          <h1 className="text-white text-4xl font-bold py-2 ">{movie.title}</h1>
        </Link>

        <MGIButtonGroup movie={movie} />

        <div className="absolute left-0 -bottom-56 p-4  rounded-b-xl w-full hidden group-hover:flex group-hover:flex-col bg-gray-800 z-10">
          <div className=" w-full justify-between border-b-2 border-b-gray-700 py-5 hidden group-hover:flex ">
            <h1 className="text-gray-400">Release Date:</h1>
            <h1 className="text-gray-300">{movie.release_date}</h1>
          </div>
          <div className=" w-full relative justify-end border-b-2 border-b-gray-700 py-5 hidden group-hover:flex ">
            <h1 className="text-gray-400 absolute left-0">genres:</h1>
            {movie.genres &&
              movie.genres.map((genre: string, index) => (
                <h1 className="mr-1 underline text-gray-300" key={index}>
                  {genre}
                  {index + 1 !== movie.genres?.length && ","}
                </h1>
              ))}
          </div>
          <Link
            href={`/movie/${movie.id}/similarMovies`}
            className=" justify-between w-full bg-gray-600 rounded-lg p-5 hover:bg-gray-500 hidden group-hover:flex transition-all ease-in-out duration-500"
          >
            <p>Show more like this</p>
            {arrowRight}
          </Link>
        </div>
      </div>
    </div>
  );
});

export default MovieGridItem;

const arrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);
