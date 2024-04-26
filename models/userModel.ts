import mongoose from "mongoose";
var Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Please provide your name"] },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email is already used"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
  },
  { timestamps: true }
);
// module.exports

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
