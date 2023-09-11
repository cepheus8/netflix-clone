import { useEffect, useState } from "react";
import classes from "./MovieModal.module.css";

const MovieModal = () => {
  const [movieData, setMovieData] = useState();

  //   useEffect(() => {
  //     const fetchMovie = async () => {
  //       const response = await fetch(
  //         `http://www.omdbapi.com/?i=${id}&apikey=fd47b721`
  //       );

  //       const res = await response.json();

  //       setMovieData(res.Search);
  //     };
  //     fetchMovie();
  //   }, [query]);

  return (
    <dialog className={classes.modal}>
      <div className={classes.imageContainer}></div>
      <div className={classes.descriptionContainer}>
        <h3 className={classes.title}>Spider-Man</h3>
        <div>
          <p>2010</p>
          <p>2 godz. 3 min</p>
          <p>
            Przeciętny nastolatek, Peter Parker (Tobey Maguire) przeistacza się
            w superbohatera pod wpływem ukąszenia przez radioaktywnego pająka.
          </p>
        </div>
        <div>
          <p>Obsada: Tom Holland</p>
          <p>Gatunki: Akcja</p>
          <p>Kraj produkcji: USA</p>
        </div>
      </div>
    </dialog>
  );
};

export default MovieModal;
