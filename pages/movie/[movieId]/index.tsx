import Layout from "@/components/layout/layout";
import Card from "@/components/movie-details/Card";
import Details from "@/components/movie-details/Details";
import Images from "@/components/movie-details/Images";
import SimilarMovies from "@/components/movie-details/SimilarMovies";
import {
  fetchMovieDetails,
  fetchPopularMovies,
  getAllGenres,
} from "@/utils/api-utils";
import React from "react";

/* export type similarMovieObj = {
  id: number;
  title: string;
  vote_count: number;
  backdrop_path: string;
  release_date: string;
  genre_ids: Array<number>;
  genres: Array<string>;
}; */
export type MovieObj = {
  id: number;
  title: string;
  poster: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: string;
  overview: string;
  youtubeTrailerKey: string;
  revenue: string;
  vote_count: number;
  genres: Array<{ name: string }> | Array<string>;
  images: Array<{ file_path: string }>;
  cast: Array<{ name: string; profile_path: string; character: string }>;
  production_companies: Array<{ name: string }>;
  production_countries: Array<{ name: string }>;
  similarMovies: Array<MovieObj>;
  genre_ids: Array<number>;
};

type MovieProps = {
  movie: MovieObj;
  genresDetails: Array<{ id: number; name: string }>;
};

const MovieDetails = (props: MovieProps) => {
  const { movie, genresDetails } = props;
  return (
    <Layout>
      <Card backdrop_path={movie.backdrop_path}>
        <div className="flex flex-col 2xl:flex-row ">
          <Details movieData={movie} />
          <Images
            id={movie.id}
            cast={movie.cast}
            movieImgs={movie.images}
            youtubekey={movie.youtubeTrailerKey}
          />
        </div>
        <SimilarMovies
          title={movie.title}
          movies={movie.similarMovies}
          genresDetails={genresDetails}
        />
      </Card>
    </Layout>
  );
};

export default MovieDetails;

export async function getStaticProps(context: { params: { movieId: number } }) {
  const movieId = context.params.movieId;

  const movieData = await fetchMovieDetails(movieId);
  // console.log("movieData :", movieData.similarMovies);

  const genresDetails = await getAllGenres();

  return {
    props: { movie: movieData, genresDetails },
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
