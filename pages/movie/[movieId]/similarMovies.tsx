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
  //   console.log("movieData :", movieData.similarMovies);

  const genresDetails = await getAllGenres();

  movieData = movieData.similarMovies.genre_ids.map((genreId: number) => {
    const genresNames = convertIdGenresToNames(genreId, genresDetails, 3);
    return { ...movie, genres: genresNames };
  });
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
