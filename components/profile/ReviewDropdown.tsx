import { Dropdown } from "flowbite-react";

type ReviewDropdownProps = {
  editHandler: () => void;
  deleteHandler: () => void;
};
const ReviewDropdown = ({
  editHandler,
  deleteHandler,
}: ReviewDropdownProps) => {
  return (
    <div className="w-40 flex justify-end absolute right-0 ">
      <Dropdown
        label=""
        placement="left-start"
        dismissOnClick={false}
        renderTrigger={() => optionsIcon}
      >
        <Dropdown.Item onClick={editHandler} className="text-lg">
          Edit
        </Dropdown.Item>
        <Dropdown.Item className="text-lg text-red-600" onClick={deleteHandler}>
          Delete Review
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default ReviewDropdown;

const optionsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="rgb(107 114 128)"
    className="w-10 h-10 hover:cursor-pointer bg-gray500 hover:stroke-white"
    data-testid="review dropdown"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
