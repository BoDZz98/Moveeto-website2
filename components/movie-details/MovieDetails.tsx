import { MovieDetailsCtx } from "@/utils/movie-details-ctx";
import React, { useContext } from "react";
const MovieDetails = () => {
  const {
    runtime,
    genres,
    production_companies,
    release_date,
    revenue,
    production_countries,
    overview,
  } = useContext(MovieDetailsCtx).movieData;
  const data = [
    { title: "Release Date", value: release_date },
    { title: "Genres", arrayData: genres },
    { title: "Runtime", value: runtime },
    {
      title: "Production Companies",
      arrayData: production_companies.slice(0, 4),
    },
    { title: "Revenue", value: revenue },
    { title: "Production Countries", arrayData: production_countries },
  ];
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-white text-4xl font-extrabold  ">About</h1>
      <p className="text-lg">{overview}</p>
      <div className="grid grid-cols-2 gap-y-8 ">
        {data.map((item, index) => (
          <div className="flex flex-col " key={index}>
            <span className="font-bold text-gray-500 mb-4">{item.title}</span>
            <div className="flex ">
              {item.arrayData?.map((genre, index) => (
                <p key={genre.name}>
                  {index > 0 ? ", " : ""}
                  {genre.name}
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
