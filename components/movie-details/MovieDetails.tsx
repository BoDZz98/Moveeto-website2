import { MovieObj } from "@/pages/movie/[movieId]";
import React from "react";
type MovieDetailsProps = { movieData: MovieObj };
const MovieDetails = ({ movieData: movie }: MovieDetailsProps) => {
  const data = [
    { title: "Release Date", value: movie.release_date },
    { title: "Genres", arrayData: movie.genres },
    { title: "Runtime", value: movie.runtime },
    { title: "Production Companies", arrayData: movie.production_companies.slice(0,4) },
    { title: "Revenue", value: movie.revenue },
    { title: "Production Countries", arrayData: movie.production_countries },
  ];
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-white text-4xl font-extrabold  ">About</h1>
      <p className="text-lg">{movie.overview}</p>
      <div className="grid grid-cols-2 gap-y-8 ">
        {data.map((item) => (
          <div className="flex flex-col ">
            <span className="font-bold text-gray-500 mb-4">{item.title}</span>
            <p className="flex ">
              {item.arrayData?.map((genre, index) => (
                <p>
                  {index > 0 ? ", " : ""}
                  {genre.name}
                </p>
              ))}
            </p>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
