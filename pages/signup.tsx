import Layout from "@/components/layout/layout";
import Card from "@/components/movie-details/Card";
import LoginForm from "@/components/ui/LoginForm";
import { fetchPopularMovies } from "@/utils/api-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { PagesOptions, SessionOptions, getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { Provider } from "next-auth/providers/index";
type loginProps = {
  backgroundImg: string;
};

const siginup = ({ backgroundImg }: loginProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("signup");

  async function signupHandler(
    email: string,
    password: string,
    username: string
  ) {
    try {
      setTitle("signing up");
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email, password, username }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        router.replace("/login");
        // console.log(res.json());
      } else {
        console.log("sth wwent wrong");
      }
    } catch (error) {}
  }
  return (
    <Layout sideBarNotVisible>
      <Card backdrop_path={backgroundImg} noLeftPadding={true}>
        <div className=" py-48 flex items-center justify-center ">
          <div className="w-full xl:w-2/3 2xl:w-1/2 z-10 flex flex-col items-center gap-y-6  ">
            <p className="text-5xl font-bold">Signup</p>
            <LoginForm
              submitHandler={signupHandler}
              buttonTitle={title}
              signingUp
            />
            <Link
              href="/login"
              className="text-center text-white underline hover:text-gray-500 "
            >
              <p>Already have an account? Login</p>
            </Link>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default siginup;

interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
}
interface AuthOptions {
  providers: Provider[];
  pages?: Partial<PagesOptions>;
  session?: Partial<SessionOptions>;
}
export async function getServerSideProps(context: Context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let popularMovies: Array<{ backdrop_path: string }> =
    await fetchPopularMovies();
  const randomNumber = Math.floor(Math.random() * popularMovies.length);

  if (session) {
    return {
      props: { backgroundImg: popularMovies[randomNumber].backdrop_path },
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { backgroundImg: popularMovies[randomNumber].backdrop_path },
  };
}
