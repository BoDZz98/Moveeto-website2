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

  const { newReview } = await req.body;
  const session: Session | null = await getServerSession(req, res, authOptions);
  const username = session?.user?.name;
  try {
    await Review.create({ ...newReview, username });
    res.status(201).json({ message: "review created!" });
  } catch (error) {
    console.log("error while creating review", error);
    res.status(500).json({ message: "Error" });
  }
}
