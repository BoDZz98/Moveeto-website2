import { fetchMovieDetails, fetchPopularMovies } from "@/utils/api-utils";
import React from "react";
import { MovieObj } from ".";
import ScreenShotsCard from "@/components/movie-details/ScreenShotsCard";
import ActorImage from "@/components/movie-details/ActorImage";

const Cast = (props: { movie: MovieObj }) => {
  const { movie } = props;

  return (
    <ScreenShotsCard
      titlePage="Cast"
      title={movie.title}
      backdrop_path={movie.backdrop_path}
      movieId={movie.id}
    >
      <div className="grid grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 w-3/4 gap-5 ">
        {movie.cast.map(
          (actor) => actor.profile_path && <ActorImage actor={actor} />
        )}
      </div>
    </ScreenShotsCard>
  );
};

export default Cast;

export async function getStaticProps(context: { params: { movieId: number } }) {
  const movieId = context.params.movieId;

  const movieData = await fetchMovieDetails(movieId);
  // console.log("movieData :", movieData);

  return {
    props: { movie: movieData },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const popularMovies: Array<MovieObj> = await fetchPopularMovies();

  const popularMoviesId = popularMovies.map((movie) => ({ id: movie.id }));
  const paths = popularMoviesId.map((movie) => ({
    params: { movieId: movie.id.toString() },
  }));
  // This fallback tells next js wethere we specified all the available paths or not.
  // It's true bec we didn't specify all
  return {
    paths: paths,
    fallback: true,
  };
}
