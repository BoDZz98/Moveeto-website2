import React from "react";
import RatingBar from "./RatingBar";

type GamesStatisticsProps = {
  favMoviesLength: number;
  wishlistMoviesLength: number;
};
const MoviesStatistics = (props: GamesStatisticsProps) => {
  const { favMoviesLength, wishlistMoviesLength } = props;
  const totalMovies = favMoviesLength + wishlistMoviesLength;
  return (
    <div className="flex flex-col gap-y-10 w-1/3 border-r-2 px-10">
      <span className="text-8xl font-bold">
        {totalMovies}
        <span className="text-4xl font-normal ml-2">Movies</span>
      </span>
      <RatingBar
        label="Favorite"
        color="blue"
        progress={(favMoviesLength / totalMovies) * 100}
        count={favMoviesLength}
      />
      <RatingBar
        label="Wishlist"
        color="blue"
        progress={(wishlistMoviesLength / totalMovies) * 100}
        count={wishlistMoviesLength}
      />
    </div>
  );
};

export default MoviesStatistics;
