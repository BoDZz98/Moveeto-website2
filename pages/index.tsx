import Head from "next/head";
import { fetchPopularMovies, getAllGenres } from "@/utils/api-utils";
import MoviesGrid from "@/components/ui/MoviesGrid";
import Dropdown from "@/components/ui/Dropdown";
import Breadcrumb from "@/components/movie-details/Breadcrumb";

type HomeProps = {
  movies: Array<{}>;
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
  let popularMovies: Array<{ genre_ids: Array<number> }>;
  popularMovies = await fetchPopularMovies();
  const genresDetails = await getAllGenres();
  // console.log("array length is", featuredPosts.length); //20

  popularMovies = popularMovies.map((movie) => {
    const genresNames: Array<string> = [];
    movie.genre_ids.map((movieGenres) => {
      const genreObject = genresDetails.find(
        (genre: { id: number }) => genre.id === movieGenres
      );
      genresNames.push(genreObject.name);
    });
    console.log(genresNames);

    return { ...movie, genres: genresNames };
  });
  console.log("data is", popularMovies[0]);

  return {
    props: { movies: popularMovies },
    revalidate: 1800,
  };
}
