import React, { Suspense, useContext } from "react";
import ReactPlayer from "react-player";
import ImagesGrid from "./ImagesGrid";
import Link from "next/link";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";

const Images = () => {
  const { youtubeTrailerKey, images, id, cast } =
    useContext(MovieDetailsCtx).movieData;
  return (
    <div className="2xl:w-2/5 z-10 ">
      <div className="rounded-xl overflow-hidden mb-5 mt-12  flex justify-center">
        <Suspense fallback={<p>Loading</p>}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${youtubeTrailerKey}`}
            style={{ maxWidth: "100%" }}
            playing
            loop
            muted
            controls
          />
        </Suspense>
      </div>
      <ImagesGrid movieImgs={images} movieId={id} />
      <h1 className="text-white text-5xl font-extrabold my-12 ">Cast</h1>
      <ImagesGrid cast={cast} movieId={id} />
    </div>
  );
};

export default Images;
