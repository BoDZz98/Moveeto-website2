import User from "@/models/userModel";
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
