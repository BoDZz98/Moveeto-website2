import User, { collectionObj, userMovieObj, userObj } from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";
import { connectDB } from "@/utils/db-util";

type reqData = {
  list: string;
  movie: userMovieObj;
  collectionId: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const session: Session | null = await getServerSession(req, res, authOptions);
  const email = session?.user?.email;
  const user: userObj | null = await User.findOne({ email });
  const { list, movie, collectionId }: reqData = await req.body;
  // console.log(user);

  // Adding movies to fav and wishlist --------------------------------------------------
  if ((list === "favMovies" || list === "wishlistMovies") && user) {
    try {
      const movieIndex: number = user[list].findIndex(
        (m: userMovieObj) => m.title === movie.title
      );

      if (movieIndex !== -1) {
        // The movie is in the user's favorite movies, so we should remove it
        user[list].splice(movieIndex, 1);
        user.save();
        res.status(202).json({});
      } else {
        user[list].push(movie);
        user.save();
        res.status(201).json({});
      }
    } catch (error) {
      // typeof movie.genres === "object" &&}
      console.log("error while add/remove movie in fav/wishlist", error);
      res
        .status(500)
        .json({ message: "error while add/remove movie in fav/wishlist" });
    }
  }
  // Adding movies to user Collections --------------------------------------------------
  if (collectionId && user) {
    try {
      const collection: collectionObj | undefined = user.userCollections.find(
        (collection) => collection._id == collectionId
      );

      const movieIndex: number = collection!.movies.findIndex(
        (m) => m.title === movie.title
      );

      if (movieIndex !== -1) {
        // The movie is in the user's favorite movies, so we should remove it
        collection?.movies.splice(movieIndex, 1);
        user.save();
        res.status(202).json({ collections: user.userCollections });
      } else {
        collection?.movies.push(movie);
        user.save();
        res.status(201).json({ collections: user.userCollections });
      }
    } catch (error) {
      console.log("error while add/remove movie in collection", error);
      res
        .status(500)
        .json({ message: "error while add/remove movie in collection" });
    }
  }

  // If the user is not signed in
  if (!user) {
    console.log("User is not signed in");
    res.status(500).json({ message: "User is not signed in" });
  }
}
