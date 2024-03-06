import { MovieObj } from "@/pages/movieDetails/[movieId]";
import React from "react";
import AddToButtons from "./AddToButtons";
import MyBreadcrumb from "./Breadcrumb";
import Rating from "./Rating";
import MovieDetails from "./MovieDetails";

type DetailsProps = { movieData: MovieObj };
const Details = ({ movieData: movie }: DetailsProps) => {
  //movieData: movie -> renaming movieData to movie
  return (
    <div className="flex flex-col gap-y-8 w-1/2 z-10">
      <div className="opacity-100 z-10">
        <MyBreadcrumb title={movie.title} />
      </div>
      <h1 className="text-white text-8xl font-extrabold ">{movie.title}</h1>
      <AddToButtons />
      <Rating />
      <MovieDetails movieData={movie} />
    </div>
  );
};

export default Details;
