import { fetchMovieDetails, fetchPopularMovies } from "@/utils/api-utils";
import React from "react";
import { MovieObj } from ".";
import ScreenShotsCard from "@/components/movie-details/ScreenShotsCard";
import Image from "next/image";

const MovieComments = (props: { movie: MovieObj }) => {
  const { movie } = props;
  return (
    <ScreenShotsCard
      titlePage="Comments"
      title={movie.title}
      backdrop_path={movie.backdrop_path}
      movieId={movie.id}
    >
      <div className="w-3/4  flex flex-col  p-10 ">
        <div className="flex flex-col gap-y-5 bg-gray-900 bg-opacity-70 p-10 rounded">
          <div className="flex items-center gap-x-5 ">
            <span className="text-5xl font-bold text-white ">Exceptional</span>
            <Image
              src={`/imgs/rating/3.png`}
              alt="Racing"
              className="w-20 h-20 opacity-100 "
              width={50}
              height={50}
            />
          </div>
          <p className="text-gray-400 text-xl font-semibold">
            comment description
          </p>
          <div className="flex items-center gap-x-5">
            <Image
              src={`/imgs/rating/5.png`}
              alt="User Img"
              className="w-20 h-20 opacity-100 "
              width={50}
              height={50}
            />
            <div>
              <p className="text-xl font-bold">BoDZzz</p>
              <p className="text-gray-500 text-lg font-semibold">3/13/2024</p>
            </div>
          </div>
        </div>
      </div>
    </ScreenShotsCard>
  );
};

export default MovieComments;

export async function getStaticProps(context: { params: { movieId: number } }) {
  const movieId = context.params.movieId;

  let movieData = await fetchMovieDetails(movieId);

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
