import classes from "./Poster.module.css";
import { AiOutlinePlusCircle, AiOutlineCheckCircle } from "react-icons/ai";

const Poster = ({
  poster,
  translate,
  id,
  openModalHandler,
  onFavorite,
  addFavoriteIcon,
}) => {
  return (
    <div
      className={classes.container}
      style={{ transform: `translate(-${translate * 100}%)` }}
      onClick={openModalHandler}
    >
      <img src={poster} alt="movie poster" width="145px" />

      {addFavoriteIcon && (
        <button className={classes.button}>
          <AiOutlineCheckCircle />
        </button>
      )}
    </div>
  );
};

export default Poster;
