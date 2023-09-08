import { useEffect, useState } from "react";
import classes from "./Results.module.css";
import Poster from "./Poster";

const Results = (props) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${props.query}&apikey=fd47b721`
      );

      const res = await response.json();
      console.log(res);

      setMovieData(res.Search);
    };
    fetchMovie();
  }, [props.query]);

  return (
    <div className={classes.resultsList}>
      {movieData.map((mov) => (
        <Poster key={mov.imdbID} poster={mov.Poster} />
      ))}
    </div>
  );
};

export default Results;
