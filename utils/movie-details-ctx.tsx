import { MovieObj } from "@/pages/movie/[movieId]";
import { createContext } from "react";

export const MovieDetailsCtx = createContext({
  movieData: {
    id: 0,
    title: "",
    poster_path: "",
    backdrop_path: "",
    vote_average: 0,
    release_date: "",
    runtime: "",
    overview: "",
    youtubeTrailerKey: "",
    revenue: "",
    vote_count: 0,
    genres: [""],
    images: [{ file_path: "" }],
    cast: [{ name: "", profile_path: "", character: "" }],
    production_companies: [{ name: "" }],
    production_countries: [{ name: "" }],
    genre_ids: [1],
  },
  reviewData: {
    reviewsLength: 0,
    mostRepeatedRating: "",
  },
});
