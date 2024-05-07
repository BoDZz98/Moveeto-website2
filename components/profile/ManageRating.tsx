import React, { useState } from "react";
import MyModalCard from "../ui/MyModalCard";
import { Label, Textarea } from "flowbite-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import OneEmoji from "../movie-details/OneEmoji";
import { ratingData } from "../movie-details/Rating";

type ManageRatingProps = {
  title: string;
  onClose: () => void;
};
const ManageRating = ({ title, onClose }: ManageRatingProps) => {
  const router = useRouter();
  const { update } = useSession();

  const [inputs, setInputs] = useState({
    rating: { value: "", isValid: true },
    description: { value: "", isValid: true },
  });

  function changeInputHandler(identifier: string, enteredValue: string) {
    setInputs((prevState) => {
      return {
        ...prevState,
        [identifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  //----------------------------------------------------
  async function onSubmitForm(e: any) {
    e.preventDefault();
    const ratingIsValid = inputs.rating.value.length !== 0;
    const descriptionIsValid = inputs.description.value.length > 4;

    if (ratingIsValid && descriptionIsValid) {
      // If all is good
      //   const res = await fetch("/api/collections", {
      //     method: "POST",
      //     body: JSON.stringify({
      //       title: inputs.title.value,
      //       description: inputs.description.value,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   if (res.ok) {
      //     router.push("/profile/collections");
      //     onClose();
      //     update();
      //   }
    } else {
      // If sth wrong with the inputs field
      setInputs((prev) => {
        return {
          rating: {
            value: prev.rating.value,
            isValid: ratingIsValid,
          },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
    }
  }

  return (
    <MyModalCard closeHandler={onClose} modalTitle={title}>
      <form className="flex flex-col gap-4" onSubmit={onSubmitForm}>
        <div className="flex my-6">
          {ratingData.map((obj, index) => (
            <OneEmoji
              {...obj}
              onPress={(value) => {
                changeInputHandler("rating", value);
              }}
              isClicked={index + 1 === parseInt(inputs.rating.value)}
            />
          ))}
        </div>
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
