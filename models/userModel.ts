import mongoose from "mongoose";
var Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  release_date: String,
  backdrop_path: String,
  genres: [String],
});

const userCollectionsSchema = new Schema({
  name: {
    type: String,
    // sparse: true,
    unique: [true, "Collection name already exists"],
  },
  description: String,
  movies: [movieSchema],
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
    userCollections: [userCollectionsSchema], // array of objects with collection
    favMovies: [movieSchema],
    wishlistMovies: [movieSchema],
  },
  { timestamps: true }
);
// module.exports

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;

type movieObj = {
  title: String;
  release_date: String;
  backdrop_path: String;
  genres: Array<String>;
};

export type collectionObj = {
  name: string;
  description: string;
  movies: Array<movieObj>;
};

export type userObj = {
  name: string;
  email: string;
  userCollections: Array<collectionObj>;
  favMovies: Array<movieObj>;
  wishlistMovies: Array<movieObj>;
  save: () => {}; // to prevent compiler error -> ( save() is not a property of userObj)
};
