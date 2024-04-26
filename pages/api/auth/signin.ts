// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/utils/connect";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

type Data = {
  message: string;
};
/* username: string;
  email: string;
  password: string; */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await connectDB();

    const { username, email, password } = await req.body;
    console.log(username, email, password);

    // We should validate the data first -------------------------------

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      // return res.status(400).send("User already exists!");

      console.log("user Exists");
      res.status(500).json({ message: "Email already exists" });
      // return NextResponse.json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "user created!" });
  } catch (error) {
    console.log("error in api/register/route", error);
  }
}
