import { useEffect, useContext } from "react";
import classes from "./ResultsView.module.css";
import Poster from "../components/Poster";
import AppContext from "../context/appContext";
import useMoviesData from "../hooks/use-movies";

const ResultsView = () => {
  const { query, openModalHandler, favoriteState } = useContext(AppContext);
  const { movieData, fetchMovies, addToFavoriteHandler } = useMoviesData();

  useEffect(() => {
    if (favoriteState.isFavorite) {
      fetchMovies("", "", favoriteState.idArray);
    } else {
      fetchMovies("s", query);
    }
  }, [fetchMovies, query, favoriteState]);

  const favoriteHandler = async (id) => {
    addToFavoriteHandler(id);
  };

  return (
    <div className={classes.resultsList}>
      {movieData.map((mov) => (
        <Poster
          key={mov.imdbID}
          poster={mov.Poster}
          id={mov.imdbID}
          openModalHandler={openModalHandler.bind(null, mov.imdbID)}
          onFavorite={favoriteHandler}
        />
      ))}
    </div>
  );
};

export default ResultsView;
