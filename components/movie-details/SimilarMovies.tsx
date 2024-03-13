import { similarMovieObj } from "@/pages/movie/[movieId]";
import React from "react";
import MovieGridItem from "../ui/MovieGridItem";
import { convertIdGenresToNames } from "@/utils/api-utils";
import MoviesGrid from "../ui/MoviesGrid";

type SimilarMoviesProps = {
  title: string;
  movies: Array<similarMovieObj>;
  genresDetails: Array<{ id: number; name: string }>;
};

const SimilarMovies = ({
  title,
  movies,
  genresDetails,
}: SimilarMoviesProps) => {
  return (
    <div className="flex flex-col items-center  w-11/12">
      <h1 className="text-white text-5xl font-bold my-8 ">Movies Like {title}</h1>
      <div className="grid grid-cols-4 gap-6">
        {movies.map((movie, index) => {
          if (index > 3) return;
          const genresNames = convertIdGenresToNames(
            movie.genre_ids,
            genresDetails,
            1
          );
          movie["genres"] = genresNames;
          if (movie.backdrop_path) return <MovieGridItem movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default SimilarMovies;
