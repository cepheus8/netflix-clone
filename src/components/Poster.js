import classes from "./Poster.module.css";

const Poster = ({ poster, translate, id, onModal }) => {
  const showModalHandler = () => {
    onModal(id);
    console.log(id);
  };

  return (
    <div
      className={classes.container}
      style={{ transform: `translate(-${translate * 100}%)` }}
      onClick={showModalHandler}
    >
      <img src={poster} alt="movie poster" width="145px" />
    </div>
  );
};

export default Poster;
