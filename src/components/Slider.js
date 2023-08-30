import Poster from "./Poster";
import { useEffect, useState } from "react";
import classes from "./Slider.module.css";
import { VscChevronRight, VscChevronLeft } from "react-icons/vsc";

const Slider = ({ query, title }) => {
  const [movieData, setMovieData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=fd47b721`
      );

      const res = await response.json();
      console.log(res);

      setMovieData(res.Search);
    };
    fetchMovie();
  }, []);

  const slideHandler = (direction) => {
    const sliderLength = movieData.length - 8; // how to not hardcode

    if (slideIndex === sliderLength) {
      setSlideIndex(sliderLength - 1);
    }

    if (direction === "left" && slideIndex !== 0) {
      setSlideIndex((prev) => prev - 1);
    }

    if (direction === "right" && slideIndex < sliderLength) {
      setSlideIndex((prev) => prev + 1);
      console.log(slideIndex);
    }
  };

  return (
    <>
      <p className={classes.title}>{title}</p>
      <div className={classes.posterList}>
        {movieData.map((mov) => (
          <Poster key={mov.imdbID} poster={mov.Poster} translate={slideIndex} />
        ))}
        {slideIndex !== 0 ? (
          <button>
            <VscChevronLeft
              className={classes.arrowLeft}
              onClick={() => slideHandler("left")}
            />
          </button>
        ) : (
          ""
        )}
        <button>
          <VscChevronRight
            className={classes.arrowRight}
            onClick={() => slideHandler("right")}
          />
        </button>
      </div>
    </>
  );
};

export default Slider;
