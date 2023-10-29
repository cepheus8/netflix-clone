import { useEffect, useContext } from "react";
import classes from "./ResultsView.module.css";
import Poster from "../components/Poster";
import AppContext from "../context/appContext";
import useMoviesData from "../hooks/use-movies";
import DataContext from "../context/dataContext";

const ResultsView = () => {
  const { query, openModalHandler, favoritesView } = useContext(AppContext);
  const { idArray } = useContext(DataContext);

  const { movieData, fetchMovies } = useMoviesData();

  useEffect(() => {
    if (favoritesView) {
      fetchMovies(query, false, idArray);
    } else {
      fetchMovies(query, false, null);
    }
  }, [fetchMovies, query, favoritesView, idArray]);

  return (
    <div className={classes.resultsList}>
      {movieData.map((mov) => (
        <Poster
          key={mov.imdbID}
          poster={mov.Poster}
          id={mov.imdbID}
          openModalHandler={openModalHandler.bind(null, mov.imdbID)}
        />
      ))}
    </div>
  );
};

export default ResultsView;
