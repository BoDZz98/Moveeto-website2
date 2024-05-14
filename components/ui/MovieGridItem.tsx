import { MovieObj } from "@/pages/movie/[movieId]";
import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type MovieGridItemProps = {
  movie: MovieObj;
};

const contClassName =
  "flex items-center gap-x-1 rounded bg-gray-600 w-fit group cont hover:bg-white transition ease-in-out duration-300";

const MovieGridItem = ({ movie }: MovieGridItemProps) => {
  return (
    <div className="relative rounded-xl hover:rounded-b-none  h-fit w-full bg-gray-800 flex flex-col group transition ease-in-out duration-1000 ">
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

        <div className="flex gap-x-3">
          <div className={`${contClassName} p-2`}>
            {plusIcon}
            <p className=" group-hover:group-[.cont]:text-black font-semibold">
              {movie.vote_count}
            </p>
          </div>
          <div
            className={`${contClassName} px-4 py-2 hidden group-hover:flex `}
          >
            {giftIcon}
          </div>
          <div
            className={`${contClassName} px-2 py-1 hidden group-hover:flex `}
          >
            {optionsIcon}
          </div>
        </div>
        <div className="absolute left-0 -bottom-56 p-4  rounded-b-xl w-full hidden group-hover:flex group-hover:flex-col bg-gray-800 z-10">
          <div className=" w-full justify-between border-b-2 border-b-gray-700 py-5 hidden group-hover:flex ">
            <h1 className="text-gray-400">Release Date:</h1>
            <h1 className="text-gray-300">{movie.release_date}</h1>
          </div>
          <div className=" w-full relative justify-end border-b-2 border-b-gray-700 py-5 hidden group-hover:flex ">
            <h1 className="text-gray-400 absolute left-0">genres:</h1>
            {movie.genres &&
              movie.genres.map((genre: string | { name: string }, index) => (
                <h1 className="mr-1 underline text-gray-300" key={index}>
                  {typeof genre === "string" ? genre : genre.name}
                  {index + 1 !== movie.genres?.length && ","}
                </h1>
              ))}
          </div>
          <div className=" justify-between w-full bg-gray-600 rounded-lg p-5 hidden group-hover:flex ">
            <p>Show more like this</p>
            {arrowRight}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieGridItem;

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={4}
    stroke="currentColor"
    className="w-5 h-5 group-hover:group-[.cont]:stroke-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
export const giftIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 group-hover:group-[.cont]:stroke-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
    />
  </svg>
);
export const optionsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-8 h-8 group-hover:group-[.cont]:stroke-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
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
