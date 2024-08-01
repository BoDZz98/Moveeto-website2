import User from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";
import { connectDB } from "@/utils/db-util";
import Review from "@/models/reviewsModel";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  // _id is the review id created by mongoDB, used to update review
  // movieId is used to fetch all reviews for certain movie
  const { newReview, _id, movieId } = await req.body;
  const session: Session | null = await getServerSession(req, res, authOptions);
  const username = session?.user?.name;

  // // Get move reviews -----------------------------------------
  // if (req.method === "GET") {
  //   try {
  //     const reviews = await Review.find({ movieId });
  //     console.log("review is -> ", reviews);
  //   } catch (error) {}
  // }
  // Create /update -----------------------------------------
  if (req.method === "POST") {
    try {
      if (_id) {
        //update review
        await Review.findByIdAndUpdate(_id, {
          rating: newReview.rating,
          description: newReview.description,
        });
      } else {
        // create review
        await Review.create({ ...newReview, username });
      }
      res.status(201).json({ message: "review updated/created!" });
    } catch (error) {
      console.log("error while creating review", error);
      res.status(500).json({ message: "Error" });
    }
  }

  //Delete ---------------------------------------------
  if (req.method === "DELETE") {
    try {
      await Review.findByIdAndDelete(_id);
      res.status(201).json({ message: "review deleted" });
    } catch (error) {
      console.log("error while deleting review", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
