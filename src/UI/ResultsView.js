import { useEffect, useState } from "react";
import classes from "./ResultsView.module.css";
import Poster from "../components/Poster";

const Results = ({ query, onActionHandler }) => {
  const [movieData, setMovieData] = useState([]);

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

  const showModalHandler = (id) => {
    onActionHandler(id);
  };

  return (
    <div className={classes.resultsList}>
      {movieData.map((mov) => (
        <Poster
          key={mov.imdbID}
          poster={mov.Poster}
          id={mov.imdbID}
          onModal={showModalHandler}
        />
      ))}
    </div>
  );
};

export default Results;
