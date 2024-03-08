import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import React from "react";
import { optionsIcon } from "../ui/MovieGridItem";

type ImagesGridProps = {
  movieImgs?: Array<{ file_path: string }>;
  cast?: Array<{ name: string; profile_path: string; character: string }>;
};
const ImagesGrid = ({ movieImgs, cast }: ImagesGridProps) => {
  return (
    <div className="w-full grid grid-cols-2 gap-5">
      {movieImgs?.map((movie, index) => {
        if (index > 4) return;
        return (
          <Image
            id={movie.file_path}
            src={baseImageURL + movie.file_path}
            className="w-full rounded-lg"
            alt={movie.file_path}
            width={200}
            height={200}
          />
        );
      })}
      {cast?.map((actor, index) => {
        if (index > 4) return;
        return (
          <div
            id={actor.profile_path}
            className=" flex flex-col  w-full rounded-lg bg-gray-800 "
          >
            <Image
              src={baseImageURL + actor.profile_path}
              className="rounded-lg w-full h-56 object-cover  "
              alt={actor.profile_path}
              width={200}
              height={200}
            />
            <div className=" p-4">
              <p className="font-semibold text-lg">{actor.character}</p>
              <p className=" text-lg text-gray-500">{actor.name}</p>
            </div>
          </div>
        );
      })}
      <div className="w-full rounded-lg bg-gray-800 flex flex-col justify-center items-center hover:bg-gray-400 group">
        {optionsIcon}
        <p className="text-gray-500 group-hover:text-black">View all</p>
      </div>
    </div>
  );
};

export default ImagesGrid;
