import React, { Suspense } from "react";
import ReactPlayer from "react-player";
import ImagesGrid from "./ImagesGrid";
import Link from "next/link";

type ImagesProps = {
  id: number;
  youtubekey: string;
  movieImgs: Array<{ file_path: string }>;
  cast: Array<{ name: string; profile_path: string; character: string }>;
};

const Images = ({ youtubekey, movieImgs, cast, id }: ImagesProps) => {
  return (
    <div className="w-2/5 z-10">
      <div className="rounded-xl overflow-hidden mb-5 mt-12">
        <Suspense fallback={<p>Loading</p>}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${youtubekey}`}
            style={{ maxWidth: "100%" }}
            playing
            loop
            muted
            controls
          />
        </Suspense>
      </div>
      <ImagesGrid movieImgs={movieImgs} />
      <Link href={`/movie/${id}/screenshots`}>
        <h1 className="text-white text-5xl font-extrabold my-12 ">Cast</h1>
      </Link>
      <h1 className="text-white text-5xl font-extrabold my-12 ">Cast</h1>
      <ImagesGrid cast={cast} />
    </div>
  );
};

export default Images;
