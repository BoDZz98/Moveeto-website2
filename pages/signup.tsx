import Layout from "@/components/layout/layout";
import Card from "@/components/movie-details/Card";
import LoginForm from "@/components/ui/LoginForm";
import { fetchPopularMovies } from "@/utils/api-utils";
import Link from "next/link";
import React from "react";
type loginProps = {
  backgroundImg: string;
};

const siginup = ({ backgroundImg }: loginProps) => {
  function signupHandler(email: string, pass: string, username: string) {
    console.log(email);
    console.log(pass);
    console.log(username);
  }
  return (
    <Layout sideBarNotVisible>
      <Card backdrop_path={backgroundImg} noLeftPadding={true}>
        <div className=" py-48 flex items-center justify-center ">
          <div className="w-full xl:w-2/3 2xl:w-1/2 z-10 flex flex-col items-center gap-y-6  ">
            <p className="text-5xl font-bold">Signup</p>
            <LoginForm submitHandler={signupHandler} signingUp />
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

export async function getStaticProps() {
  let popularMovies: Array<{ backdrop_path: string }> =
    await fetchPopularMovies();
  const randomNumber = Math.floor(Math.random() * popularMovies.length);

  return {
    props: { backgroundImg: popularMovies[randomNumber].backdrop_path },
    revalidate: 1800,
  };
}
