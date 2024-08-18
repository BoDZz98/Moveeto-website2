import { fetchMovieDetails } from "@/utils/api-utils";
import React from "react";
import { MovieObj } from ".";
import { connectDB } from "@/utils/db-util";
import Review, { reviewObj } from "@/models/reviewsModel";
import MovieReview from "@/components/movie-details/MovieReview";
import DetailsCard from "@/components/movie-details/DetailsCard";

type MovieCommentsProps = {
  movie: MovieObj;
  reviews: Array<reviewObj>;
};

const MovieComments = ({ movie, reviews }: MovieCommentsProps) => {
  return (
    <DetailsCard
      titlePage="Reviews"
      title={movie.title}
      backdrop_path={movie.backdrop_path}
      movieId={movie.id}
    >
      {reviews.length === 0 ? (
        <div className="w-3/4 flex items-center justify-center">
          <p className="text-5xl font-bold">No reviews yet</p>
        </div>
      ) : (
        <div className="w-3/4  flex flex-col  p-10 ">
          {reviews.map((review) => (
            <MovieReview key={review._id} {...review} />
          ))}
        </div>
      )}
    </DetailsCard>
  );
};

export default MovieComments;

export async function getServerSideProps(ctx: {
  params: { movieId: string };
  req: any;
  res: any;
}) {
  const movieId = ctx.params.movieId;

  const movieData = await fetchMovieDetails(parseInt(movieId));

  await connectDB();

  const reviews = await Review.find({ movieId });

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
      movie: movieData,
    },
  };
}
