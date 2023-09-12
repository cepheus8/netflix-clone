import { useEffect, useState } from "react";
import classes from "./MovieModal.module.css";
import { VscClose } from "react-icons/vsc";

const MovieModal = ({ id, closeModalHandler }) => {
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=fd47b721`
      );

      const res = await response.json();

      setMovieData(res);
    };
    fetchMovie();
  }, [id, movieData]);

  const hideModalHandler = () => {
    closeModalHandler();
  };

  if (!movieData) {
    return (
      <dialog className={classes.modal}>
        <p>Loading...</p>
      </dialog>
    );
  }

  return (
    <dialog className={classes.modal}>
      <div
        className={classes.imageContainer}
        style={{ backgroundImage: `url(${movieData.Poster})` }}
      ></div>
      <div className={classes.descriptionContainer}>
        <h3 className={classes.title}>{movieData.Title}</h3>
        <div>
          <p>{movieData.Year}</p>
          <p>{movieData.Runtime}</p>
          <p>{movieData.Plot}</p>
        </div>
        <div>
          <p>Aktorzy: {movieData.Actors}</p>
          <p>Gatunki: {movieData.Genre}</p>
          <p>Kraj: {movieData.Country}</p>
        </div>
      </div>
      <button className={classes.button} onClick={hideModalHandler}>
        <VscClose className={classes.icon} />
      </button>
    </dialog>
  );
};

export default MovieModal;
