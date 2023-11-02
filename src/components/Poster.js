import classes from "./Poster.module.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useContext } from "react";
import AppContext from "../context/appContext";
import DataContext from "../context/dataContext";

const Poster = ({ poster, translate, id, openModalHandler }) => {
  const { favoritesView } = useContext(AppContext);
  const { removeFavoriteHandler } = useContext(DataContext);

  const favoriteHandler = (event) => {
    event.stopPropagation();
    removeFavoriteHandler(id);
  };

  const moviePoster = !(poster === "N/A") ? poster : "./fallback.jpg";

  return (
    <div
      className={classes.container}
      style={{ transform: `translate(-${translate * 100}%)` }}
      onClick={openModalHandler}
    >
      <img src={moviePoster} alt="movie poster" />

      {favoritesView && (
        <button className={classes.button} onClick={favoriteHandler}>
          <AiOutlineCheckCircle />
        </button>
      )}
    </div>
  );
};

export default Poster;
