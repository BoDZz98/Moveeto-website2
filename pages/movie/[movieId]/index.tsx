import Card from "@/components/movie-details/Card";
import Details from "@/components/movie-details/Details";
import Images from "@/components/movie-details/Images";
import {
  baseImageURL,
  fetchMovieDetails,
  fetchPopularMovies,
} from "@/utils/api-utils";
import React from "react";

export type MovieObj = {
  id: number;
  title: string;
  poster: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: string;
  overview: string;
  genres: Array<{ name: string }>;
  images: Array<{ file_path: string }>;
  cast: Array<{ name: string; profile_path: string; character: string }>;
  youtubeTrailerKey: string;
  revenue: string;
  production_companies: Array<{ name: string }>;
  production_countries: Array<{ name: string }>;
};

type MovieProps = {
  movie: MovieObj;
};

const MovieDetails = (props: MovieProps) => {
  const { movie } = props;
  return (
    <Card backdrop_path={movie.backdrop_path}>
      <Details movieData={movie} />
      <Images
        id={movie.id}
        cast={movie.cast}
        movieImgs={movie.images}
        youtubekey={movie.youtubeTrailerKey}
      />
    </Card>
  );
};

export default MovieDetails;

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
