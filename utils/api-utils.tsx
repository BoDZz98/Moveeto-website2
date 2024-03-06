import { convertMinutesToTime, convertToShortForm } from "./functions-utils";

const configHeaders = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2U0ZWRkZDlmN2I2ZTVlY2Q3NmQyYzcxNDdkODBmZiIsInN1YiI6IjY1MTUyZTc2YzUwYWQyMDBlYWJjYTllNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQnd-ukFhZTaf5BUPQn1TZxBHK0Qkj-cANZ5AsTZuhg",
};

export const baseImageURL = "http://image.tmdb.org/t/p/original";

export async function getAllGenres() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      headers: configHeaders,
    }
  );
  const data = await response.json();
  return data.genres;
}

// Get Popular Movies ----------------------------------------------------------------------------------------------------------------------------
export async function fetchPopularMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: configHeaders,
    }
  );
  const data = await response.json();
  return data.results;
}

// Get all details related to a movie ------------------------------------------------------------------------------------------------------
export async function fetchMovieDetails(movieId: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,images,credits,similar`,
    {
      headers: configHeaders,
    }
  );
  const data = await response.json();

  const { hours, minutes } = convertMinutesToTime(data.runtime);
  const revenue = convertToShortForm(data.revenue);
  const youtubeTrailer = data.videos.results.find(
    (video: { type: string }) => video.type === "Trailer"
  );
  const youtubeTrailerKey = youtubeTrailer ? youtubeTrailer.key : "";

  const newMovieObject = {
    id: data.id,
    title: data.title,
    poster: data.poster_path,
    backdrop_path: data.backdrop_path,
    vote_average: data.vote_average.toFixed(1),
    release_date: data.release_date,
    runtime: `${hours}h ${minutes} min`,
    overview: data.overview,
    genres: data.genres,
    images: data.images.backdrops,
    production_companies: data.production_companies.slice(0, 5),
    production_countries: data.production_countries.slice(0, 5),
    cast: data.credits.cast.slice(0, 20),
    similarMovies: data.similar.results,
    revenue,
    youtubeTrailerKey,
  };

  return newMovieObject;
}
