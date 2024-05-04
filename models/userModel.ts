import mongoose from "mongoose";
var Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  release_date: String,
  backdrop_path: String,
  genres: [String],
});

const collectionsSchema = new Schema({
  name: {
    type: String,
    // sparse: true,
    unique: [true, "Collection name already exists"],
  },
  description: String,
  movies: [{ movieId: { type: String }, movieName: { type: String } }],
});

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
    collections: [collectionsSchema], // array of objects with collection
    favMovies: [movieSchema],
    wishlistMovies: [movieSchema],
  },
  { timestamps: true }
);
// module.exports

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
