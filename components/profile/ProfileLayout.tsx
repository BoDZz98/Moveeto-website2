import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

type ProfileLayoutProps = {
  pageTitle: string;
  children: React.ReactNode;
};
const ProfileLayout = ({ pageTitle, children }: ProfileLayoutProps) => {
  const [title, setTitle] = useState(pageTitle);
  const { data: session } = useSession();

  const linkStyle =
    "text-gray-600 text-3xl font-semibold hover:underline-offset-8 hover:underline";
  const activeLinkStyle =
    "text-gray-300 text-3xl font-semibold underline-offset-8 underline";

  return (
    <div className=" flex flex-col gap-y-7 justify-center ml-32 2xl:mr-48 w-3/4 ">
      <div className="flex justify-between items-center">
        <p className="text-8xl font-extrabold">{session?.user?.name}</p>
        <button className="rounded p-4 h-fit hover:bg-gray-300 bg-white text-black text-xl">
          Settings
        </button>
      </div>
      <div className="flex gap-x-10 mb-10 " data-testid="links div">
        <Link
          href="/profile/overview"
          className={title === "Overview" ? activeLinkStyle : linkStyle}
          onClick={() => setTitle("Overview")}
        >
          Overview
        </Link>
        <Link
          href="/profile/favorite"
          className={title === "Favorite" ? activeLinkStyle : linkStyle}
          onClick={() => setTitle("Favorite")}
        >
          Favorite
        </Link>
        <Link
          href="/profile/wishlist"
          className={title === "Wishlist" ? activeLinkStyle : linkStyle}
          onClick={() => setTitle("Wishlist")}
        >
          Wishlist
        </Link>
        <Link
          href="/profile/reviews"
          className={title === "Reviews" ? activeLinkStyle : linkStyle}
          onClick={() => setTitle("Reviews")}
        >
          Reviews
        </Link>
        <Link
          href="/profile/collections"
          className={title === "Collections" ? activeLinkStyle : linkStyle}
          onClick={() => setTitle("Collections")}
        >
          Collections
        </Link>
      </div>
      {children}
    </div>
  );
};

export default ProfileLayout;
