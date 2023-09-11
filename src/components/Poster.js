import classes from "./Poster.module.css";

const Poster = ({ poster, translate }) => {
  // const showModalHandler() {

  // }

  return (
    <div
      className={classes.container}
      style={{ transform: `translate(-${translate * 100}%)` }}
    >
      <img src={poster} alt="movie poster" width="145px" />
    </div>
  );
};

export default Poster;
