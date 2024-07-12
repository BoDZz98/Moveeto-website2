import {
  convertIdGenresToNames,
  fetchMoviesByDate,
  getAllGenres,
} from "@/utils/api-utils";
import HomeCard from "@/components/ui/HomeCard";
import { userMovieObj } from "@/models/userModel";

type HomeProps = {
  movies: Array<userMovieObj>;
  title: string;
};

export default function Discover({ movies, title }: HomeProps) {
  return <HomeCard title={title} subTitle="" movies={movies} />;
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  console.log(query);

  let movies: Array<{ genre_ids: Array<number> }> = [];
  if (query.time) {
    movies = await fetchMoviesByDate(query.time);
  }
  const genresDetails = await getAllGenres();

  movies = movies.map((movie) => {
    const genresNames = convertIdGenresToNames(
      movie.genre_ids,
      genresDetails,
      3
    );
    return { ...movie, genres: genresNames };
  });
  // console.log("data is", popularMovies[0]);

  // same returned object as in getStaticProps()
  return {
    props: {
      movies: movies,
      title: query.time,
    },
  };
}
