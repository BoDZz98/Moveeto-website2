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

  const { newReview, _id } = await req.body;
  const session: Session | null = await getServerSession(req, res, authOptions);
  const username = session?.user?.name;
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
      res.status(201).json({ message: "review updated/created!" });
    } catch (error) {
      console.log("error while deleting review", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
