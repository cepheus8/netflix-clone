import { useEffect, useContext } from "react";
import classes from "./MovieModal.module.css";
import { VscClose } from "react-icons/vsc";
import { AiOutlinePlusCircle, AiOutlineCheckCircle } from "react-icons/ai";
import AppContext from "../context/appContext";
import useMoviesData from "../hooks/use-movies";

const MovieModal = () => {
  const { closeModalHandler, id, favoriteState } = useContext(AppContext);

  const { movieData, isLoaded, fetchMovies, addToFavoriteHandler } =
    useMoviesData();

  useEffect(() => {
    fetchMovies("i", id, favoriteState.idArray, false);
  }, [fetchMovies, id, favoriteState.idArray]);

  const favoriteHandler = () => {
    addToFavoriteHandler(id);
  };

  if (!isLoaded) {
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
        <div className={classes.titleContainer}>
          <button
            className={classes.buttonFavorite}
            onClick={favoriteHandler.bind(null, id)}
          >
            {!movieData.isFavorite ? (
              <AiOutlinePlusCircle />
            ) : (
              <AiOutlineCheckCircle />
            )}
          </button>
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
      <button className={classes.buttonClose} onClick={closeModalHandler}>
        <VscClose />
      </button>
    </dialog>
  );
};

export default MovieModal;
