import User, { collectionObj } from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";
import { connectDB } from "@/utils/db-util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const { name, description, _id } = await req.body;

  const session: Session | null = await getServerSession(req, res, authOptions);
  const email = session?.user?.email;
  const user = await User.findOne({ email });

  // Create /update -----------------------------------------
  if (req.method === "POST") {
    try {
      if (_id) {
        user.userCollections = user.userCollections.map((c: collectionObj) => {
          if (c._id == _id) {
            return { ...c, name, description };
          } else {
            return { ...c };
          }
        });
      } else {
        user.userCollections.push({ name, description, movies: [] });
      }
      user.save();
      res.status(201).json({ message: "collection created!" });

      //   console.log(user);
    } catch (error) {
      console.log("error while creating/updating collection", error);
      res.status(500).json({});
    }
  }

  //Delete ---------------------------------------------
  if (req.method === "DELETE") {
    try {
      console.log("in");

      user.userCollections = user.userCollections.filter(
        (c: collectionObj) => c._id != _id
      );
      user.save();
      res.status(201).json({ message: "collection deleted" });
    } catch (error) {
      console.log("error while deleting collection", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
