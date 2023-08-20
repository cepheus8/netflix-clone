import Poster from "./Poster";
import { useEffect, useState } from "react";
import classes from "./Slider.module.css";

const Slider = ({ query, title }) => {
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
  }, []);

  return (
    <div>
      <p className={classes.title}>{title}</p>
      {movieData.map((mov) => (
        <Poster key={mov.imdbID} poster={mov.Poster} />
      ))}
    </div>
  );
};

export default Slider;
