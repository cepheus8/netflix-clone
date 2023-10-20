import { useEffect, useState, useContext } from "react";
import classes from "./MovieModal.module.css";
import { VscClose } from "react-icons/vsc";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AppContext from "../context/appContext";

const MovieModal = () => {
  const [movieData, setMovieData] = useState();
  const { closeModalHandler, id } = useContext(AppContext);

  
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
        <div className={classes.title}>
          <AiOutlinePlusCircle className={classes.iconAdd} />
          <h3 className={classes.title}>{movieData.Title}</h3>
        </div>
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
      <button className={classes.button} onClick={closeModalHandler}>
        <VscClose className={classes.iconClose} />
      </button>
    </dialog>
  );
};

export default MovieModal;
