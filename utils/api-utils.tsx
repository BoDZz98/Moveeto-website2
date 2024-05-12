import {
  convertMinutesToTime,
  convertToShortForm,
  getCurrentDate,
  getDate,
} from "./functions-utils";

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
    images: data.images.backdrops.slice(0, 21),
    production_companies: data.production_companies.slice(0, 5),
    production_countries: data.production_countries.slice(0, 5),
    cast: data.credits.cast.slice(0, 20),
    similarMovies: data.similar.results,
    revenue,
    youtubeTrailerKey,
    vote_count: data.vote_count,
  };

  return newMovieObject;
}

export function convertIdGenresToNames(
  genres: Array<number>,
  genresDetails: Array<{ id: number; name: string }>,
  limit: number
) {
  const genresNames: Array<{ name: string }> = [];

  genres.map((movieGenres, index) => {
    if (index > limit) return;
    const genreObject = genresDetails.find((genre) => genre.id === movieGenres);
    genreObject && genresNames.push({ name: genreObject.name });
  });
  return genresNames;
}

export async function fetchMoviesByDate(time: string) {
  const currentDate = getCurrentDate();
  let prevDate = "";
  time === "Past Month" && (prevDate = getDate(30, "prev"));
  time === "This Weak" && (prevDate = getDate(7, "prev"));
  time === "Next Weak" && (prevDate = getDate(7, "next"));

  let url = "";
  time === "Next Weak"
    ? (url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${currentDate}&primary_release_date.lte=${prevDate}&sort_by=popularity.desc`)
    : (url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${prevDate}&primary_release_date.lte=${currentDate}&sort_by=popularity.desc`);

  const response = await fetch(url, {
    headers: configHeaders,
  });
  const data = await response.json();
  return data.results;
}
