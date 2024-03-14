import {
  convertIdGenresToNames,
  fetchMovieDetails,
  fetchPopularMovies,
  getAllGenres,
} from "@/utils/api-utils";
import React from "react";
import { MovieObj } from ".";
import ScreenShotsCard from "@/components/movie-details/ScreenShotsCard";
import MoviesGrid from "@/components/ui/MoviesGrid";

const SimilarMovies = (props: { movie: MovieObj }) => {
  const { movie } = props;

  return (
    <ScreenShotsCard
      titlePage="Similar Movies"
      title={movie.title}
      backdrop_path={movie.backdrop_path}
      movieId={movie.id}
    >
      <MoviesGrid movies={movie.similarMovies} />
    </ScreenShotsCard>
  );
};

export default SimilarMovies;

export async function getStaticProps(context: { params: { movieId: number } }) {
  const movieId = context.params.movieId;

  let movieData = await fetchMovieDetails(movieId);

  const genresDetails = await getAllGenres();

  const newSimilarMovies = movieData.similarMovies.map(
    (similarMovie: MovieObj) => {
      const genresNames = convertIdGenresToNames(
        similarMovie.genre_ids,
        genresDetails,
        1
      );
      return {
        ...similarMovie,
        genres: genresNames,
      };
    }
  );
  movieData["similarMovies"] = newSimilarMovies;

  // console.log("-----------------------------", movieData.similarMovies);

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
