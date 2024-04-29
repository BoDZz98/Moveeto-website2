import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import EmptyMovieCard from "./EmptyMovieCard";
import Slider from "react-slick";

const Carouselll = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <EmptyMovieCard />
      <EmptyMovieCard />
      <EmptyMovieCard />
      <EmptyMovieCard />
      <EmptyMovieCard />
      <EmptyMovieCard />
    </Slider>
  );
};

export default Carouselll;
