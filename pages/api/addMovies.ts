import User from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";
import { connectDB } from "@/utils/db-util";
import { getSession } from "next-auth/react";

type MovieObj = {
  title: String;
  release_date: String;
  backdrop_path: String;
  genres: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const session: Session | null = await getServerSession(req, res, authOptions);
  const email = session?.user?.email;
  // console.log(session);
  // const session = await getSession();

  // if (session) {
  //   const userData = session.user;
  //   console.log("User data:", userData);
  // }
  // return;
  try {
    const { button: list, movie }: { button: string; movie: MovieObj } =
      await req.body;

    const user = await User.findOne({ email });
    const movieIndex: number = user[list].findIndex(
      (movieObj: MovieObj) => movieObj.title === movie.title
    );

    if (movieIndex !== -1) {
      // The movie is in the user's favorite movies, so we should remove it
      user[list].splice(movieIndex, 1);
      user.save();
      res.status(202).json({});
    } else {
      movie["genres"] = movie.genres.map(
        (genre: { name: string }) => genre.name
      );
      user[list].push(movie);
      user.save();
      res.status(201).json({});
    }
    // typeof movie.genres === "object" &&
  } catch (error) {
    console.log("error while add/remove movie", error);
    res.status(500).json({ message: "error while creating collection" });
  }
}
