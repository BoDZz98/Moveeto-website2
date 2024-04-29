import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div className="mb-20 flex sm:flex-col items-start lg:flex-row z-10 opacity-60">
      {/*  */}
      <Link href="/" className="w-full lg:w-3/12 flex gap-x-11  ">
        <h1 className="text-white text-5xl font-extrabold py-2 ">Moveeto</h1>
        <Image
          src="/imgs/icon.png"
          alt="An image showing bodz"
          width={300}
          height={300}
          className="rounded-2xl w-40 h-16"
          style={{ objectFit: "cover" }}
        />
      </Link>
      {/*  */}
      <div className="flex w-full ">
        <div className="w-2/3 xl:w-10/12 ">
          <SearchBar />
        </div>

        <div className=" flex w-2/12 justify-end items-center   sm:w-1/3 sm:gap-x-5 md:gap-x-10">
          {status === "unauthenticated" && (
            <>
              <Link href="/login">
                <h1 className="text-white text-2xl font-bold ">Login</h1>
              </Link>
              <Link href="/signup">
                <h1 className="text-white text-2xl font-bold ">Signup</h1>
              </Link>
            </>
          )}
          {status === "authenticated" && (
            <>
              <Link href="/profile/overview">
                <h1 className="text-white text-2xl font-bold ">My Library</h1>
              </Link>
              <button onClick={() => signOut()}>
                <h1 className="text-white text-2xl font-bold ">Logout</h1>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
