import { useEffect, useState, useContext } from "react";
import classes from "./ResultsView.module.css";
import Poster from "../components/Poster";
import AppContext from "../context/appContext";

const ResultsView = () => {
  const [movieData, setMovieData] = useState([]);
  const { query, openModalHandler } = useContext(AppContext);

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
  }, [query]);

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
