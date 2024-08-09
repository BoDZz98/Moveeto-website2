import User, { userMovieObj } from "@/models/userModel";
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

//-------------------------------------------------------------------------------------

export async function addMovieHandler(
  movie: userMovieObj,
  update: any,
  collectionId: string | null,
  list: string | null
) {
  const res = await fetch("/api/addMovies", {
    method: "POST",
    body: JSON.stringify({
      movie,
      collectionId,
      list,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) update();
}

// Create or update review---------------------------------------------------------
type inputsObj = { rating: { value: string }; description: { value: string } };
type movieObj = { movieId: number; movieName: string };
export async function manageReview(
  inputs: inputsObj,
  movie: movieObj,
  reviewId?: string
) {
  const ratingIsValid = inputs.rating.value.length !== 0;
  const descriptionIsValid = inputs.description.value.length > 4;

  if (ratingIsValid && descriptionIsValid) {
    // If all is good
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        _id: reviewId,
        newReview: {
          ...movie,
          rating: inputs.rating.value,
          description: inputs.description.value,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return { ok: true };
    } else {
      return { ok: false };
    }
  } else {
    return { invalidInputs: true, ratingIsValid, descriptionIsValid };
  }
}
// delete review--------------------------------------------------
export async function deleteReview(reviewId: string) {
  const res = await fetch("/api/reviews", {
    method: "DELETE",
    body: JSON.stringify({
      _id: reviewId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return { ok: true };
  } else {
    return { ok: false };
  }
}

//-------------------------------------------------------------------------------------
// export async function getMovieReviews(movieId: string) {
//   const res = await fetch("/api/reviews", {
//     method: "GET",
//     body: JSON.stringify({
//       movieId,
//     }),
//   });
// }

//-------------------------------------------------------------------------------------

type inputsObj2 = { title: { value: string }; description: { value: string } };
export async function manageCollection(
  inputs: inputsObj2,
  collectionId?: string
) {
  const titleIsValid = inputs.title.value.length > 3;
  const descriptionIsValid = inputs.description.value.length > 4;

  if (titleIsValid && descriptionIsValid) {
    // If all is good
    const res = await fetch("/api/collections", {
      method: "POST",
      body: JSON.stringify({
        _id: collectionId,
        name: inputs.title.value,
        description: inputs.description.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return { ok: true };
    } else {
      return { ok: false };
    }
  } else {
    return { invalidInputs: true, titleIsValid, descriptionIsValid };
  }
}

//-------------------------------------------------------------------------------------

export async function deleteCollection(
  collectionId: string,
  router: any,
  update: any
) {
  const res = await fetch("/api/collections", {
    method: "DELETE",
    body: JSON.stringify({
      _id: collectionId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    update();
    router.push("/profile/collections");
    return true;
  } else {
    return false;
  }
}
