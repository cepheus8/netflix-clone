import { useEffect, useContext } from "react";
import classes from "./MovieModal.module.css";
import { VscClose } from "react-icons/vsc";
import { AiOutlinePlusCircle, AiOutlineCheckCircle } from "react-icons/ai";
import AppContext from "../context/appContext";
import useMoviesData from "../hooks/use-movies";
import DataContext from "../context/dataContext";

const MovieModal = () => {
  const { closeModalHandler, id } = useContext(AppContext);

  const { addToFavoriteHandler, removeFavoriteHandler, idArray } =
    useContext(DataContext);

  const { movieData, isLoaded, fetchMovies } = useMoviesData();

  useEffect(() => {
    fetchMovies(id, true, idArray);
  }, [fetchMovies, id, idArray]);

  const favoriteHandler = (event) => {
    if (movieData.isFavorite) {
      removeFavoriteHandler(id);
      movieData.isFavorite = false;
    } else {
      addToFavoriteHandler(id);
    }
  };

  if (!isLoaded) {
    return (
      <dialog className={classes.modal}>
        <p>Loading...</p>
      </dialog>
    );
  }

  const moviePoster = !(movieData.Poster === "N/A")
    ? movieData.Poster
    : "./fallback.jpg";

  return (
    <dialog className={classes.modal}>
      <div
        className={classes.imageContainer}
        style={{ backgroundImage: `url(${moviePoster})` }}
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
