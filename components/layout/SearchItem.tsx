import { MovieObj } from "@/pages/movie/[movieId]";
import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type SearchItemProps = {
  movie: MovieObj;
};

const SearchItem = ({ movie }: SearchItemProps) => {
  return (
    <div className="flex group rounded-lg p-4 " data-testid="searchItem">
      <Link href={`/movie/${movie.id}`}>
        <Image
          src={baseImageURL + movie.poster_path}
          alt="movie img"
          width={150}
          height={150}
          className="rounded-xl w-16 h-fit cursor-pointer hover:opacity-60 transition ease-in-out duration-300"
        />
      </Link>
      <div className="flex flex-col justify-center ml-2 w-1/2">
        <Link
          href={`/movie/${movie.id}`}
          className="text-xl font-semibold mb-2 transition ease-in-out duration-300 hover:text-gray-500 cursor-pointer"
        >
          {movie.title}
        </Link>
        <p className=" mb-2 text-gray-400">{movie.release_date}</p>
        <div className="flex items-center gap-x-1 rounded bg-gray-700 w-fit group cont hover:bg-white transition ease-in-out duration-300 p-1">
          <p className=" group-hover:group-[.cont]:text-black cursor-default font-semibold ">
            {movie.vote_average!.toFixed(1)}
          </p>
          {star}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

const star = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="yellow"
    className="w-4 h-4"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clipRule="evenodd"
    />
  </svg>
);
