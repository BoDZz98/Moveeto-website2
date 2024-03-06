import { MovieObj } from "@/pages/movieDetails/[movieId]";
import React from "react";
type MovieDetailsProps = { movieData: MovieObj };
const MovieDetails = ({ movieData: movie }: MovieDetailsProps) => {
  const data = [
    { title: "Release Date", value: movie.release_date },
    { title: "Genres", genres: movie.genres },
    { title: "Runtime", value: movie.runtime },
    { title: "Revenue", value: movie.revenue },
  ];
  return (
    <div className="flex flex-col gap-y-5">
      {/* {movie.runtime} */}
      <h1 className="text-white text-4xl font-extrabold  ">About</h1>
      <p className="text-lg">{movie.overview}</p>
      <div className="grid grid-cols-2 gap-y-8">
        {data.map((item) => (
          <div className="flex flex-col ">
            <span className="font-bold text-gray-500 mb-4">{item.title}</span>
            <div className="flex ">
              {item.genres?.map((genre, index) => (
                <p className=" ">
                  {index > 0 ? ", " : ""}
                  {genre.name}{" "}
                </p>
              ))}
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
