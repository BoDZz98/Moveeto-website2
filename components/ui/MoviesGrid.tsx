import React from "react";
import MovieGridItem from "./MovieGridItem";
import { MovieObj } from "@/pages/movie/[movieId]";

type MoviesGridProps = {
  movies: Array<MovieObj>;
};

const MoviesGrid = ({ movies }: MoviesGridProps) => {
  return (
    <div className="gap-x-8 flex flex-col gap-y-8 xl:flex-row ">
      <div className="flex flex-col gap-y-8  xl:w-1/4 xl:px-0">
        {movies.map(
          // 0, 5
          (movieData, index) =>
            index < 5 &&
            movieData.backdrop_path && <MovieGridItem movie={movieData} />
        )}
      </div>
      <div className="flex flex-col gap-y-10  px-20 xl:w-1/4 xl:px-0 xl:mt-8">
        {movies.map(
          // 5, 10
          (movieData, index) =>
            index >= 5 &&
            index < 10 &&
            movieData.backdrop_path && <MovieGridItem movie={movieData} />
        )}
      </div>
      <div className="flex flex-col gap-y-8  px-20 xl:w-1/4 xl:px-0">
        {movies.map(
          // 10, 15
          (movieData, index) =>
            index >= 10 &&
            index < 15 &&
            movieData.backdrop_path && <MovieGridItem movie={movieData} />
        )}
      </div>
      <div className="flex flex-col gap-y-10  px-20 xl:w-1/4 xl:px-0 xl:mt-8">
        {movies.map(
          // 15, 20
          (movieData, index) =>
            index >= 15 &&
            index < 20 &&
            movieData.backdrop_path && <MovieGridItem movie={movieData} />
        )}
      </div>
    </div>
  );
};

export default MoviesGrid;
