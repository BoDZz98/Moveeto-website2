import Layout from "@/components/layout/layout";
import Card from "@/components/movie-details/Card";
import LoginForm from "@/components/ui/LoginForm";
import { fetchPopularMovies } from "@/utils/api-utils";
import { Session, getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import authOptions from "./api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

type loginProps = {
  backgroundImg: string;
};

const Login = ({ backgroundImg }: loginProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("Log in");
  const [error, setError] = useState("");

  async function loginHandler(email: string, password: string) {
    setTitle("logging in");

    // This function will trigger our api route [...nextauth].js
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // we don't want to be redirected to an error page when we through an error
    });

    console.log(result);

    if (result!.error) {
      setError(result!.error);
      setTitle("Log in");
      return;
    } else {
      setTitle("Log in");
      router.push("/");
    }
  }
  return (
    <Layout sideBarNotVisible>
      <Card backdrop_path={backgroundImg} noLeftPadding={true}>
        <div className=" py-48 flex items-center justify-center ">
          <div className="w-full xl:w-2/3 2xl:w-1/2 z-10 flex flex-col items-center gap-y-6  ">
            <h1 className="text-5xl font-bold">Login</h1>
            <LoginForm
              submitHandler={loginHandler}
              buttonTitle={title}
              errorMessage={error}
            />
            <Link
              href="/signup"
              className="text-center text-white underline hover:text-gray-500 "
            >
              <p>Dont have an account? Sign up</p>
            </Link>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Login;

interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
}

export async function getServerSideProps(context: Context) {
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
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

/* 
const result = await fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json?price_greater_than=1&rating_greater_than=1"
    );

*/
