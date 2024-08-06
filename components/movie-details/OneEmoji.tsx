import Image from "next/image";
type OneEmojiProps = {
  name: string;
  image: string;
  color: string;
  isClicked?: boolean;
  onPress?: (value: string) => void;
};
const OneEmoji = ({
  name,
  image,
  color,
  isClicked,
  onPress,
}: OneEmojiProps) => {
  const imgStyle =
    "w-20 h-20 opacity-75 group-hover:cursor-pointer group-hover:opacity-100 group-hover:-translate-y-2 group-hover:scale-125 transition ease-in-out duration-300 ";
  const activeImgStyle = "w-20 h-20 opacity-100 -translate-y-2 scale-125 ";

  return (
    <div
      className="flex flex-col gap-y-10 items-center mr-10 w-28 group"
      data-testid="emoji div"
      onClick={() => {
        onPress && onPress(image);
      }}
    >
      <Image
        src={`/imgs/rating/${image}.png`}
        alt={name + " emoji"}
        className={isClicked ? activeImgStyle : imgStyle}
        width={50}
        height={50}
      />
      <div
        className={`flex gap-x-2 p-2 items-center rounded-full ring-gray-500  ${
          isClicked
            ? "ring-2 cursor-default"
            : "group-hover:ring-2 group-hover:cursor-pointer"
        }`}
      >
        <div
          className={`${color} w-3 h-3 rounded-full`}
          data-testid="color div"
        ></div>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default OneEmoji;
