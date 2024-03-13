import Head from "next/head";
import {
  convertIdGenresToNames,
  fetchPopularMovies,
  getAllGenres,
} from "@/utils/api-utils";
import MoviesGrid from "@/components/ui/MoviesGrid";
import Dropdown from "@/components/ui/Dropdown";
import Breadcrumb from "@/components/movie-details/Breadcrumb";
import { MovieObj } from "./movie/[movieId]";

type HomeProps = {
  movies: Array<MovieObj>;
};

const data = {
  title: "New and trending",
  subTitle: "Based on player counts and release date",
};

export default function Home({ movies }: HomeProps) {
  return (
    <div className="flex flex-col gap-8 w-full  ">
      <Head>
        <title>Moveeto</title>
        <meta name="description" content="Enjoy the latest movies" />
      </Head>
      <h1 className="text-white text-8xl font-extrabold  ">{data.title}</h1>
      <h1 className="text-white text-2xl font-semibold  ">{data.subTitle}</h1>

      <Dropdown />
      <MoviesGrid movies={movies} />
    </div>
  );
}

export async function getStaticProps() {
  let popularMovies: Array<{ genre_ids: Array<number> }> =
    await fetchPopularMovies();

  const genresDetails = await getAllGenres();

  popularMovies = popularMovies.map((movie) => {
    const genresNames = convertIdGenresToNames(
      movie.genre_ids,
      genresDetails,
      3
    );
    return { ...movie, genres: genresNames };
  });
  // console.log("data is", popularMovies[0]);

  return {
    props: { movies: popularMovies },
    revalidate: 1800,
  };
}
