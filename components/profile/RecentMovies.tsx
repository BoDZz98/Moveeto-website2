import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import React from "react";
import { userMovieObj } from "@/models/userModel";
import MGIButtonGroup from "../ui/MGIButtonGroup";

type RecentMoviesProps = {
  movies: Array<userMovieObj>;
};
const RecentMovies = ({ movies }: RecentMoviesProps) => {
  const uniqueMovies = Array.from(
    new Map(movies.map((obj) => [obj.id, obj])).values()
  );

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

                <MGIButtonGroup movie={m} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentMovies;
