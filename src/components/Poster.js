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

  return (
    <div
      className={classes.container}
      style={{ transform: `translate(-${translate * 100}%)` }}
      onClick={openModalHandler}
    >
      <img src={poster} alt="movie poster" width="145px" />

      {favoritesView && (
        <button className={classes.button} onClick={favoriteHandler}>
          <AiOutlineCheckCircle />
        </button>
      )}
    </div>
  );
};

export default Poster;
