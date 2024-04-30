import Layout from "@/components/layout/layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import {
  convertIdGenresToNames,
  fetchPopularMovies,
  getAllGenres,
} from "@/utils/api-utils";
import React from "react";
import { MovieObj } from "../movie/[movieId]";
import MovieGridItem from "@/components/ui/MovieGridItem";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type favoriteProps = {
  movies: Array<MovieObj>;
};

const favorite = ({ movies }: favoriteProps) => {
  return (
    <Layout>
      <ProfileLayout pageTitle="Favorite">
        <div className="flex items-center p-2 border-b-4 border-gray-800 hover:border-gray-500 group ">
          {searchIcon}
          <input
            className="bg-transparent text-2xl border-none focus:ring-0 focus:border-none w-full group-hover:placeholder-gray-300"
            type="text"
            placeholder="Search my favorite"
          />
        </div>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 1200: 2, 1536: 3 }} //1536px -> 2xl || 1200px -> xl
        >
          <Masonry>
            {movies.map((movie) => (
              <div className="m-4">
                <MovieGridItem movie={movie} key={movie.id} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </ProfileLayout>
    </Layout>
  );
};

export default favorite;

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

const searchIcon = (
  <svg
    className="w-8 h-8 text-gray-600 group-hover:text-gray-500"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    />
  </svg>
);
