import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import React from "react";
import { optionsIcon } from "../ui/MovieGridItem";
import ActorImage from "./ActorImage";
import { useRouter } from "next/router";

type ImagesGridProps = {
  movieId: number;
  movieImgs?: Array<{ file_path: string }>;
  cast?: Array<{ name: string; profile_path: string; character: string }>;
};
const ImagesGrid = ({ movieId, movieImgs, cast }: ImagesGridProps) => {
  const router = useRouter();

  return (
    <div className="w-full grid grid-cols-2 gap-5">
      {movieImgs?.map((movie, index) => {
        if (index > 2) return;
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
        if (index > 2) return;
        return <ActorImage actor={actor} imgSize="h-56" />;
      })}
      <div
        className="w-full rounded-lg bg-gray-800 flex flex-col justify-center items-center hover:bg-gray-400 group"
        onClick={() =>
          movieImgs
            ? router.push(`/movie/${movieId}/screenshots`)
            : router.push(`/movie/${movieId}/cast`)
        }
      >
        {optionsIcon}
        <p className="text-gray-500 group-hover:text-black">View all</p>
      </div>
    </div>
  );
};

export default ImagesGrid;
