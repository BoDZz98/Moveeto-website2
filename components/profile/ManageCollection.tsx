import React, { useState } from "react";
import MyModalCard from "../ui/MyModalCard";
import { Label, Textarea } from "flowbite-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { manageCollection } from "@/utils/db-util";

type ManageCollectionProps = {
  title: string;
  oldValue?: { _id: string; name: string; description: string };
  onClose: () => void;
};
const ManageCollection = (props: ManageCollectionProps) => {
  const { title, oldValue, onClose } = props;
  const router = useRouter();
  const { update } = useSession();

  const [inputs, setInputs] = useState({
    title: { value: oldValue ? oldValue.name : "", isValid: true },
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
  //----------------------------------------------------
  async function onSubmitForm(e: any) {
    e.preventDefault();
    const res = await manageCollection(inputs, oldValue?._id);
    if (res.ok) {
      update();
      onClose();
      // If we are creating a new collection, we want to refresh page
      if (!oldValue?._id) router.push("/profile/collections");
    }
    if (res.invalidInputs) {
      // If sth wrong with the inputs field
      setInputs((prev) => {
        return {
          title: {
            value: prev.title.value,
            isValid: res.titleIsValid,
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
      <form className="flex flex-col gap-4" onSubmit={onSubmitForm}>
        <div>
          <Label
            htmlFor="title"
            value="Title"
            className="text-white text-2xl "
          />
          <input
            required
            value={inputs.title.value}
            onChange={(e) => changeInputHandler("title", e.target.value)}
            id="title"
            type="text"
            placeholder="write collection title"
            className="bg-black w-full py-6 mt-2 text-xl rounded border-none focus:border-none focus:ring-0"
          />
        </div>
        <div>
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
        </div>
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

export default ManageCollection;
