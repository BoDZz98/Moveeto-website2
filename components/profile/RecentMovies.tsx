import { MovieObj } from "@/pages/movie/[movieId]";
import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import React from "react";
import { giftIcon, optionsIcon } from "../ui/MovieGridItem";
import { userMovieObj } from "@/models/userModel";

type RecentMoviesProps = {
  movies: Array<userMovieObj>;
};
const RecentMovies = ({ movies }: RecentMoviesProps) => {
  const uniqueMovies = Array.from(
    new Map(movies.map((obj) => [obj.id, obj])).values()
  );

  const contClassName =
    "flex items-center gap-x-1 rounded bg-gray-600 w-fit group cont hover:bg-white transition ease-in-out duration-300";

  return (
    <>
      <p className="font-semibold text-5xl place-self-center my-10">
        Recently Added Movies
      </p>
      <div className="grid grid-cols-2 gap-10 ">
        {uniqueMovies.map((m, index) => {
          if (index > 3) return;
          return (
            <div
              className="flex group rounded-lg p-4 h-52  bg-gray-800"
              key={m.id}
            >
              <Image
                src={baseImageURL + m.backdrop_path}
                alt="movie img"
                width={150}
                height={150}
                className="rounded-xl w-1/2 "
              />
              <div className="flex flex-col justify-center ml-2 w-1/2">
                <p className="text-2xl font-semibold mb-2">{m.title}</p>
                <p className="text-lg mb-2 text-gray-400">{m.release_date}</p>

                <div className="flex gap-x-3">
                  <div className={`${contClassName} p-2`}>
                    <p className=" group-hover:group-[.cont]:text-black font-semibold">
                      {heartIcon}
                    </p>
                  </div>
                  <div
                    className={`${contClassName} px-2 py-2 hidden group-hover:flex `}
                  >
                    {giftIcon}
                  </div>
                  <div
                    className={`${contClassName} px-2 py-1 hidden group-hover:flex `}
                  >
                    {optionsIcon}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentMovies;

const heartIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    className="w-8 h-8"
  >
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>
);
