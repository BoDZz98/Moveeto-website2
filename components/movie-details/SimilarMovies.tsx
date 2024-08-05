import React from "react";
import MovieGridItem from "../ui/MovieGridItem";
import { convertIdGenresToNames } from "@/utils/api-utils";
import { MovieObj } from "@/pages/movie/[movieId]";

type SimilarMoviesProps = {
  title: string;
  movies: Array<MovieObj>;
  genresDetails: Array<{ id: number; name: string }>;
};

const SimilarMovies = ({
  title,
  movies,
  genresDetails,
}: SimilarMoviesProps) => {
  return (
    <div className="flex flex-col items-center  2xl:w-11/12">
      <h1 className="text-white text-5xl font-bold my-8 ">
        Movies Like {title}
      </h1>
      <div className="grid grid-cols-2 2xl:grid-cols-4  w-full gap-6">
        {movies.map((movie, index) => {
          if (index > 3) return;
          const genresNames = convertIdGenresToNames(
            movie.genre_ids,
            genresDetails,
            1
          );
          // @ts-ignore
          movie["genres"] = genresNames;
          if (movie.backdrop_path)
            // @ts-ignore
            return <MovieGridItem movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
};

export default SimilarMovies;
