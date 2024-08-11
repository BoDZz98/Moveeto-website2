import Layout from "@/components/layout/layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import User, { userMovieObj } from "@/models/userModel";
import SearchComponent from "@/components/profile/Search";
import { useRef, useState } from "react";
import MoviesGrid from "@/components/ui/MoviesGrid";
import useMySession from "@/hooks/useMySession";
import EmptyPage from "@/components/profile/EmptyPage";

const Favorite = () => {
  const { userFavMovies } = useMySession();
  const [moviesShown, setMoviesShown] = useState<Array<userMovieObj>>();

  //----------------------------------------------------------------------
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value.toLowerCase();
    const filteredResults = userFavMovies.filter((m) =>
      m.title.toLowerCase().includes(searchQuery)
    );
    setMoviesShown(filteredResults);
  }
  //----------------------------------------------------------------------

  return (
    <Layout>
      <ProfileLayout pageTitle="Favorite">
        {userFavMovies.length !== 0 && (
          <SearchComponent
            placeholder="Search my favorite"
            changeInputHandler={inputHandler}
          />
        )}
        {(moviesShown || userFavMovies) && (
          <MoviesGrid
            movies={moviesShown ? moviesShown : userFavMovies}
            gridCols={3}
          />
        )}
        {userFavMovies.length === 0 && (
          <EmptyPage pageTitle="No movies yet" contStyle="mt-20" />
        )}
      </ProfileLayout>
    </Layout>
  );
};

export default Favorite;
