import Layout from "@/components/layout/layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { connectDB } from "@/utils/db-util";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]";
import User, { userMovieObj } from "@/models/userModel";
import { GetServerSidePropsContext } from "next";
import SearchComponent from "@/components/profile/Search";
import { useEffect, useRef, useState } from "react";
import MoviesGrid from "@/components/ui/MoviesGrid";
import useMySession from "@/hooks/useMySession";

type favoriteProps = {
  movies: Array<userMovieObj>;
};

const Favorite = ({ movies }: favoriteProps) => {
  const [moviesShown, setmoviesShown] = useState(movies);
  const { userFavMovies } = useMySession();
  const lastChange = useRef<number | null>();

  useEffect(() => {
    if (userFavMovies) {
      setmoviesShown(userFavMovies);
    }
  }, [userFavMovies]);

  //----------------------------------------------------------------------
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // Adding debouncing, meaning it will only search if the user stops writing for 500ms
    if (lastChange.current) clearTimeout(lastChange.current);
    // The setTimeout() method sets a timer which executes a function or specified piece of code once the timer expires.
    lastChange.current = window.setTimeout(() => {
      lastChange.current = null;
      const searchQuery = e.target.value.toLowerCase();
      const filteredResults = movies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery)
      );
      setmoviesShown(filteredResults);
    }, 500);
  }
  //----------------------------------------------------------------------
  return (
    <Layout>
      <ProfileLayout pageTitle="Favorite">
        <SearchComponent changeInputHandler={inputHandler} />
        <MoviesGrid movies={moviesShown} gridCols={3} />
      </ProfileLayout>
    </Layout>
  );
};

export default Favorite;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await connectDB();
  const session: any = await getServerSession(ctx.req, ctx.res, authOptions);
  const email = session?.user?.email;

  const user = await User.findOne({ email });
  const favMovies = user.favMovies;
  // console.log(favMovies);

  return {
    props: {
      movies: JSON.parse(JSON.stringify(favMovies)),
    },
  };
}
