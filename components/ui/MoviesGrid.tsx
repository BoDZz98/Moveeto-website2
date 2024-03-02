import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import React from "react";
import MovieGridItem from "./MovieGridItem";
type MovieObj = {
  title?: string;
  backdrop_path?: string;
};
type MoviesGridProps = {
  movies: Array<MovieObj>;
};

const MoviesGrid = ({ movies }: MoviesGridProps) => {
  return (
    <div className="flex gap-x-2">
      <div className="flex flex-col gap-y-4 w-1/4 ">
        {movies.map((movieData) => (
          <MovieGridItem movie={movieData} />
        ))}
      </div>
    </div>
    /* <div className="grid gap-4"></div>
        <div className="grid gap-4"></div>
        <div className="grid gap-4"></div> */
  );
};

export default MoviesGrid;
