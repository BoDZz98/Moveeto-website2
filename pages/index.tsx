import Head from "next/head";
import { fetchPopularMovies } from "@/utils/api-utils";
import MoviesGrid from "@/components/ui/MoviesGrid";

type HomeProps = {
  movies: Array<{}>;
};
export default function Home({ movies }: HomeProps) {
  return (
    <div className="flex flex-col w-full h-screen ">
      <Head>
        <title>Moveeto</title>
        <meta name="description" content="Enjoy the latest movies" />
      </Head>
      <h1 className="text-white text-8xl font-extrabold py-2 ">
        New and trending
      </h1>
      <MoviesGrid movies={movies} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredPosts: Array<{}> = await fetchPopularMovies();
  console.log("data is", featuredPosts[0]);

  return {
    props: { movies: featuredPosts },
    revalidate: 1800,
  };
}
