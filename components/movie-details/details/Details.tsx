import React from "react";
import AddToButtons from "./AddToButtons";
import MyBreadcrumb from "./MyBreadcrumb";
import Rating from "./Rating";
import MovieDetails from "./MovieDetails";

type DetailsProps = { movieTitle: string };

const Details = ({ movieTitle }: DetailsProps) => {
  //movieData: movie -> renaming movieData to movie
  return (
    <div className="flex flex-col gap-y-8 2xl:w-1/2 z-10">
      <MyBreadcrumb title={movieTitle} />
      <h1 className="text-white text-8xl font-extrabold ">{movieTitle}</h1>
      <AddToButtons />
      <Rating />
      <MovieDetails />
    </div>
  );
};

export default Details;
