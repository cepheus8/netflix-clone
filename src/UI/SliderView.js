import Poster from "../components/Poster";
import { useEffect, useState, useContext } from "react";
import classes from "./SliderView.module.css";
import { VscChevronRight, VscChevronLeft } from "react-icons/vsc";
import AppContext from "../context/appContext";
import useMoviesData from "../hooks/use-movies";

const SliderView = ({ query, title }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const { movieData, isLoaded, fetchMovies, addToFavoriteHandler } =
    useMoviesData();
  const { openModalHandler } = useContext(AppContext);

  useEffect(() => {
    fetchMovies(query, false, null);
  }, [fetchMovies, query]);

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
    }
  };

  const favoriteHandler = async (id) => {
    addToFavoriteHandler(id);
  };

  return (
    <>
      {isLoaded ? (
        <div>
          <p className={classes.title}>{title}</p>
          <div className={classes.posterList}>
            {movieData.map((mov) => (
              <Poster
                key={mov.imdbID}
                poster={mov.Poster}
                id={mov.imdbID}
                translate={slideIndex}
                openModalHandler={openModalHandler.bind(null, mov.imdbID)}
                onFavorite={favoriteHandler}
              />
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SliderView;
