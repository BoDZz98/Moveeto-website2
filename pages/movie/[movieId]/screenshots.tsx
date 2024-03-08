import Card from "@/components/movie-details/Card";
import { fetchMovieDetails, fetchPopularMovies } from "@/utils/api-utils";
import React from "react";
import { MovieObj } from ".";

const Screenshots = (props: { movie: MovieObj }) => {
  const { movie } = props;

  return <Card backdrop_path={movie.backdrop_path}>
    <div className="h-screen">secrenhots</div>
  </Card>;
};

export default Screenshots;

export async function getStaticProps(context: { params: { movieId: number } }) {
  const movieId = context.params.movieId;

  const movieData = await fetchMovieDetails(movieId);
  console.log("movieData :", movieData.cast);

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
