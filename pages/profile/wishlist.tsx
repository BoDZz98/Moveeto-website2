import Layout from "@/components/layout/layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { userMovieObj } from "@/models/userModel";
import SearchComponent from "@/components/profile/Search";
import MoviesGrid from "@/components/ui/MoviesGrid";
import useMySession from "@/hooks/useMySession";
import EmptyPage from "@/components/profile/EmptyPage";
import { useState } from "react";

const Wishlist = () => {
  const [moviesShown, setMoviesShown] = useState<Array<userMovieObj>>();
  const { userWishlistMovies } = useMySession();

  //--------------------------------------------------------------------------
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value.toLowerCase();
    const filteredResults = userWishlistMovies.filter((m) =>
      m.title.toLowerCase().includes(searchQuery)
    );
    setMoviesShown(filteredResults);
  }
  return (
    <Layout>
      <ProfileLayout pageTitle="Wishlist">
        <SearchComponent
          placeholder="Search my wishlist"
          changeInputHandler={inputHandler}
        />
        {(moviesShown || userWishlistMovies) && (
          <MoviesGrid
            movies={moviesShown ? moviesShown : userWishlistMovies}
            gridCols={3}
          />
        )}
        {userWishlistMovies.length === 0 && (
          <EmptyPage pageTitle="No movies yet" contStyle="mt-20" />
        )}
      </ProfileLayout>
    </Layout>
  );
};

export default Wishlist;
