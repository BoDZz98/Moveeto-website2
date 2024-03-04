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
  cast: Array<{}>;
  youtubeTrailerKey: string;
};

type MovieProps = {
  movie: MovieObj;
};

const MovieDetails = (props: MovieProps) => {
  const { movie } = props;
  return (
    <div className="pl-32 pr-48 w-full h-screen flex">
      <div
        className="absolute inset-0 bg-cover bg-center  opacity-20 "
        style={{
          backgroundImage: `url(${baseImageURL}${movie.backdrop_path})`,
        }}
      ></div>
      <div className="absolute  inset-0 top-1/2  bg-gradient-to-b from-transparent to-gray-900"></div>
      <Details movieData={movie} />
      <Images youtubekey={movie.youtubeTrailerKey} movieImgs={movie.images} />
    </div>
  );
};

export default MovieDetails;

export async function getStaticProps(context: { params: { movieId: number } }) {
  const movieId = context.params.movieId;

  const movieData = await fetchMovieDetails(movieId);
  console.log("movieData :", movieData.images);

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
