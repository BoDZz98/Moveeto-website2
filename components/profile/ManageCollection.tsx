import React from "react";
import MyModalCard from "../ui/MyModalCard";
import { Label, TextInput } from "flowbite-react";

type ManageCollectionProps = {
  title: string;
  onClose: () => void;
};
const ManageCollection = ({ title, onClose }: ManageCollectionProps) => {
  return (
    <MyModalCard closeHandler={onClose} modalTitle={title}>
      <div>
        <div>
          <Label htmlFor="title" value="Title" className="text-white text-lg" />
          <input
            id="title"
            type="text"
            placeholder="write collection title"
            className="bg-black w-full rounded border-none focus:border-none focus:ring-0"
            required
          />
        </div>
      </div>
    </MyModalCard>
  );
};

export default ManageCollection;
