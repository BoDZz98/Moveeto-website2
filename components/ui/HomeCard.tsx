import React from "react";
import Layout from "../layout/layout";
import Head from "next/head";
import Dropdown from "./Dropdown";
import MoviesGrid from "./MoviesGrid";
import { userMovieObj } from "@/models/userModel";

type HomeCardProps = {
  title: string;
  subTitle: string;
  movies: Array<userMovieObj>;
};
const HomeCard = ({ title, subTitle, movies }: HomeCardProps) => {
  return (
    <Layout>
      <div className="flex flex-col gap-8 w-full  ">
        <Head>
          <title>Moveeto</title>
          <meta name="description" content="Enjoy the latest movies" />
        </Head>
        <h1 className="text-white text-8xl font-extrabold  ">{title}</h1>
        <h1 className="text-white text-2xl font-semibold  ">{subTitle}</h1>

        <Dropdown />
        <MoviesGrid movies={movies} />
      </div>
    </Layout>
  );
};

export default HomeCard;
