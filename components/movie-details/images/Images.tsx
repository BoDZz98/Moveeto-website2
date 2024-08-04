import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";
import ImagesGrid from "./ImagesGrid";

const Images = () => {
  const { youtubeTrailerKey, images, id, cast } =
    useContext(MovieDetailsCtx).movieData;
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="2xl:w-2/5 z-0">
      <div className="rounded-xl overflow-hidden mb-5 mt-12 z-0 flex justify-center">
        {domLoaded && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${youtubeTrailerKey}`}
            style={{ maxWidth: "100%" }}
            playing
            loop
            muted
            controls
          />
        )}
      </div>
      <ImagesGrid movieImgs={images} movieId={id} />
      <h1 className="text-white text-5xl font-extrabold my-12 ">Cast</h1>
      <ImagesGrid cast={cast} movieId={id} />
    </div>
  );
};

export default Images;
