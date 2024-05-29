import {
  convertIdGenresToNames,
  fetchPopularMovies,
  getAllGenres,
} from "@/utils/api-utils";
import HomeCard from "@/components/ui/HomeCard";
import { useSession } from "next-auth/react";
import { userMovieObj } from "@/models/userModel";

const data = {
  title: "New and trending",
  subTitle: "Based on player counts and release date",
};

type HomeProps = {
  movies: Array<userMovieObj>;
};

export default function Home({ movies }: HomeProps) {
  const { data: session, status } = useSession();

  let userData: any = undefined;
  if (session) {
    userData = session.user;
    // console.log("userData", userData);
  }
  return (
    <HomeCard title={data.title} subTitle={data.subTitle} movies={movies} />
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
