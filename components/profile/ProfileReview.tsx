import Image from "next/image";
import React, { useState } from "react";
import { formatDate } from "@/utils/functions-utils";
import ReviewDropdown from "./ReviewDropdown";
import ManageRating from "./ManageRating";
import { reviewObj } from "@/models/reviewsModel";
import { useRouter } from "next/router";
type ProfileReviewProps = {
  review: reviewObj;
  notEditable?: boolean;
};

const ProfileReview = (props: ProfileReviewProps) => {
  const { movieName, rating, description, createdAt, _id } = props.review;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const router = useRouter();
  async function deleteHandler() {
    const res = await fetch("/api/reviews", {
      method: "DELETE",
      body: JSON.stringify({
        _id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      router.push("/profile/reviews");
    }
  }
  return (
    <div className="flex flex-col gap-y-5 bg-gray-800  p-10 my-10 rounded">
      <div className="relative flex items-center gap-x-5 ">
        <span className="text-4xl font-bold text-gray-200 underline-offset-8 underline ">
          {movieName}
        </span>
        <Image
          src={`/imgs/rating/${rating}.png`}
          alt="Racing"
          className="w-16 h-16  "
          width={50}
          height={50}
        />
        {!props.notEditable && (
          <ReviewDropdown
            deleteHandler={deleteHandler}
            editHandler={() => setModalIsVisible(true)}
          />
        )}
        {modalIsVisible && (
          <ManageRating
            title="Edit Rating"
            oldValue={{ _id, rating: rating.toString(), description }}
            onClose={() => setModalIsVisible(false)}
          />
        )}
      </div>
      <p className="text-gray-400 text-xl font-semibold">{description}</p>
      <p className="text-gray-500 text-lg font-semibold">
        {formatDate(createdAt)}
      </p>
    </div>
  );
};

export default ProfileReview;
