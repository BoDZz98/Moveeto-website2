import React, { useEffect } from "react";
import MovieGridItem from "./MovieGridItem";
import { Masonry, ResponsiveMasonry } from "@/utils/imports";
import { userMovieObj } from "@/models/userModel";
import { useSession } from "next-auth/react";

type MoviesGridProps = {
  movies: Array<userMovieObj>;
  gridCols?: number;
};

const MoviesGrid = ({ movies, gridCols }: MoviesGridProps) => {
  
  const columns = gridCols ? gridCols : 4;
  return (
    <div className="-ml-4 w-full ">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 1200: 2, 1536: columns }} //1536px -> 2xl || 1200px -> xl
      >
        <Masonry>
          {movies.map((movie) => (
            <div className="m-4" key={movie.id}>
              {movie.backdrop_path && <MovieGridItem movie={movie} />}
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default MoviesGrid;
