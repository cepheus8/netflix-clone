import classes from "./Poster.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Poster = ({ poster, translate, id, openModalHandler, onFavorite }) => {
  const addToFavoriteHandler = () => {
    onFavorite(id);
  };

  return (
    <div
      className={classes.container}
      style={{ transform: `translate(-${translate * 100}%)` }}
      onClick={openModalHandler}
    >
      <img src={poster} alt="movie poster" width="145px" />
      <AiOutlinePlusCircle
        className={classes.icon}
        onClick={addToFavoriteHandler}
      />
    </div>
  );
};

export default Poster;
