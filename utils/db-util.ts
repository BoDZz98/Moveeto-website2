import User, { userMovieObj } from "@/models/userModel";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://boudy1q1q:boudy1q1q@cluster0.m2fmta0.mongodb.net/moveeto?retryWrites=true&w=majority&appName=Cluster0"
    );
  } catch (error) {
    console.log("error while connecting to DB", error);
  }
}

//-------------------------------------------------------------------------------------

export async function addMovieHandler(
  movie: userMovieObj,
  update: any,
  collectionId?: string,
  list?: string
) {
  const res = await fetch("/api/addMovies", {
    method: "POST",
    body: JSON.stringify({
      list,
      collectionId,
      movie,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) update();
}
