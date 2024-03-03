import { fetchPopularMovies } from "@/utils/api-utils";
import React from "react";

const MovieDetails = (props: any) => {
  const { movie } = props;
  return <div>{movie.id}</div>;
};

export default MovieDetails;

export function getStaticProps(context: { params: { movieId: number } }) {
  const movieId = context.params.movieId;

  const movieData = { id: movieId };

  return {
    props: { movie: movieData },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  let popularMovies: Array<{ id: number }>;
  popularMovies = await fetchPopularMovies();

  popularMovies = popularMovies.map((movie) => ({ id: movie.id }));
  const paths = popularMovies.map((movie) => ({
    params: { movieId: movie.id.toString() },
  }));
  // This fallback tells next js wethere we specified all the available paths or not.
  // It's true bec we didn't specify all
  return {
    paths: paths,
    fallback: true,
  };
}
