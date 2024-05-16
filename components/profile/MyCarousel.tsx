import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import EmptyMovieCard from "./EmptyMovieCard";
import { userMovieObj } from "@/models/userModel";
import { Slider } from "@/utils/imports";
import MovieGridItem from "../ui/MovieGridItem";

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
  const myArray = ["", "", "", "", "", ""];
  return (
    <Slider {...settings}>
      {myArray.map((a, i) => {
        if (i > 5) return;
        if (i < movies.length) {
          return (
            <div className="p-4 h-[650px]">
              <MovieGridItem movie={movies[i]} />
            </div>
          );
        } else {
          return <EmptyMovieCard />;
        }
      })}

      {/* 
        <EmptyMovieCard />
        <EmptyMovieCard />
        <EmptyMovieCard />
        <EmptyMovieCard />
        <EmptyMovieCard /> */}
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
