import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import { userMovieObj } from "@/models/userModel";
import { Slider } from "@/utils/imports";
import EmptyMovieCard from "./EmptyMovieCard";
import MovieGridItem from "@/components/ui/MovieGridItem";

type CarouselProps = {
  movies: Array<userMovieObj>;
};
const Carousel = ({ movies }: CarouselProps) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const myArray = ["1", "2", "3", "4", "5", "6"];
  return (
    <Slider {...settings}>
      {myArray.map((k, i) => {
        if (i < movies.length) {
          return (
            <div key={k} className="p-4 h-[650px] ">
              <MovieGridItem movie={movies[i]} />
            </div>
          );
        } else {
          return <EmptyMovieCard key={k} />;
        }
      })}
    </Slider>
  );
};

export default Carousel;

/* {movies.map((m) => (
        <div className="p-4 h-[650px]">
          <MovieGridItem movie={m} />
          {/* <EmptyMovieCard /> 
          </div>
        ))} */
