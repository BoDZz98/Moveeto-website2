import Image from "next/image";
import { Inter } from "next/font/google";
import { Fragment } from "react";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen ">
      <Head>
        <title>Moveeto</title>
        <meta name="description" content="Enjoy the latest movies" />
      </Head>
      <h1 className="text-white text-8xl font-extrabold py-2 ">
        New and trending
      </h1>
    </div>
  );
}

export function getStaticProps() {
  const featuredPosts: any = [];
  return {
    props: { posts: featuredPosts },
    revalidate: 1800,
  };
}
