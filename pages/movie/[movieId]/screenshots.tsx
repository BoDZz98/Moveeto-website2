import {
  baseImageURL,
  fetchMovieDetails,
  fetchPopularMovies,
} from "@/utils/api-utils";
import React from "react";
import { MovieObj } from ".";
import Image from "next/image";
import ScreenShotsCard from "@/components/movie-details/ScreenShotsCard";

const Screenshots = (props: { movie: MovieObj }) => {
  const { movie } = props;

  return (
    <ScreenShotsCard
      titlePage="Screenshots"
      title={movie.title}
      backdrop_path={movie.backdrop_path}
      movieId={movie.id}
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 2xl:w-3/4 gap-5  w-full">
        {movie.images.map(
          (img) =>
            img.file_path && (
              <Image
                id={img.file_path}
                src={baseImageURL + img.file_path}
                alt={img.file_path}
                height={100}
                width={150}
                className="rounded w-full"
              />
            )
        )}
      </div>
    </ScreenShotsCard>
  );
};

export default Screenshots;

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
