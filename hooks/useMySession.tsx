import { collectionObj, userMovieObj } from "@/models/userModel";
import { useSession } from "next-auth/react";

// I created this custom hook to prevent this compiler error to be shown in several components
const useMySession = (): {
  userFavMovies: Array<userMovieObj>;
  userWishlistMovies: Array<userMovieObj>;
  userCollections: Array<collectionObj>;
  update: any;
} => {
  const { data: session, update } = useSession();

  return {
    userFavMovies: session?.user?.favMovies,
    userWishlistMovies: session?.user?.wishlistMovies,
    userCollections: session?.user?.userCollections,
    update,
  };
};

export default useMySession;
