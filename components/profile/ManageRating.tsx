import React, { useContext, useState } from "react";
import MyModalCard from "../ui/MyModalCard";
import { Label, Textarea } from "flowbite-react";
import OneEmoji from "../movie-details/OneEmoji";
import { ratingData } from "../movie-details/details/Rating";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";
import { useRouter } from "next/router";
import { manageReview } from "@/utils/db-util";

type ManageRatingProps = {
  title: string;
  oldValue?: { _id: string; rating: string; description: String | any };
  onClose: () => void;
};
const ManageRating = ({ title, oldValue, onClose }: ManageRatingProps) => {
  const router = useRouter();
  const { title: movieName, id: movieId } =
    useContext(MovieDetailsCtx).movieData;

  const [inputs, setInputs] = useState({
    rating: { value: oldValue ? oldValue.rating : "", isValid: true },
    description: { value: oldValue ? oldValue.description : "", isValid: true },
  });

  function changeInputHandler(identifier: string, enteredValue: string) {
    setInputs((prevState) => {
      return {
        ...prevState,
        [identifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  //------------------------------------------------------------------
  async function onSubmitForm(e: any) {
    e.preventDefault();
    const movieData = { movieId, movieName };
    const res = await manageReview(inputs, movieData, oldValue?._id);
    if (res.ok) {
      // If we are updating, refresh the page
      if (oldValue) router.push("/profile/reviews");
      onClose();
    }
    if (res.invalidInputs) {
      // If sth wrong with the inputs field
      setInputs((prev) => {
        return {
          rating: {
            value: prev.rating.value,
            isValid: res.ratingIsValid,
          },
          description: {
            value: prev.description.value,
            isValid: res.descriptionIsValid,
          },
        };
      });
    }
  }

  return (
    <MyModalCard closeHandler={onClose} modalTitle={title}>
      <form className="flex flex-col gap-4 z-40" onSubmit={onSubmitForm}>
        <div className="flex my-6 justify-center">
          {ratingData.map((obj, index) => (
            <OneEmoji
              {...obj}
              key={obj.key}
              onPress={(value) => {
                changeInputHandler("rating", value);
              }}
              isClicked={index + 1 === parseInt(inputs.rating.value)}
            />
          ))}
        </div>
        {!inputs.rating.isValid && (
          <p className="text-red-500 text-lg place-self-center">
            Rating is required
          </p>
        )}
        <Label
          htmlFor="description"
          value="Description"
          className="text-white text-2xl "
        />
        <Textarea
          required
          rows={8}
          value={inputs.description.value}
          onChange={(e) => changeInputHandler("description", e.target.value)}
          id="description"
          placeholder="Write a description..."
          className="bg-black p-4 mt-2 text-white text-lg  border-none focus:border-none focus:ring-0"
        />
        {!inputs.description.isValid && (
          <p className="text-red-500 text-lg place-self-center">
            description is invalid
          </p>
        )}
        <button
          className="rounded p-4 h-fit hover:bg-gray-400 bg-white text-black text-2xl transition ease-in-out"
          type="submit"
        >
          Save changes
        </button>
      </form>
    </MyModalCard>
  );
};

export default ManageRating;
