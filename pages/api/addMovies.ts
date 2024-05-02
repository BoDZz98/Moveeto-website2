import User from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";
import { connectDB } from "@/utils/db-util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const session: Session | null = await getServerSession(req, res, authOptions);
  const email = session?.user?.email;
  try {
    const user = await User.findOne({ email });
    user.collections.push();
    user.save();
    res.status(201).json({ message: "user created!" });

    //   console.log(user);
  } catch (error) {
    console.log("error while creating collection", error);
    res.status(500).json({ message: "error while creating collection" });
  }
}
