import { fetchMovieDetails, fetchPopularMovies } from "@/utils/api-utils";
import React from "react";
import { MovieObj } from ".";
import ScreenShotsCard from "@/components/movie-details/ScreenShotsCard";
import Image from "next/image";
import GameReview from "@/components/movie-details/GameReview";
import { connectDB } from "@/utils/db-util";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import authOptions from "../../api/auth/[...nextauth]";
import Review, { reviewObj } from "@/models/reviewsModel";

type MovieCommentsProps = {
  movie: MovieObj;
  reviews: Array<reviewObj>;
};

const MovieComments = ({ movie, reviews }: MovieCommentsProps) => {
  return (
    <ScreenShotsCard
      titlePage="Reviews"
      title={movie.title}
      backdrop_path={movie.backdrop_path}
      movieId={movie.id}
    >
      <div className="w-3/4  flex flex-col  p-10 ">
        {reviews.map((review) => (
          <GameReview
            username={review.username}
            description={review.description}
            rating={review.rating}
            createdAt=""
          />
        ))}
      </div>
    </ScreenShotsCard>
  );
};

export default MovieComments;
/* 
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
} */

export async function getServerSideProps(ctx: {
  params: { movieId: string };
  req: any;
  res: any;
}) {
  const movieId = ctx.params.movieId;

  const movieData = await fetchMovieDetails(parseInt(movieId));

  await connectDB();
  const session: any = await getServerSession(ctx.req, ctx.res, authOptions);
  const username = session?.user?.name;

  const reviews = await Review.find({ movieId });
  // console.log(reviews);

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
      movie: movieData,
    },
  };
}
