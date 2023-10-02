import classes from "./Backdrop.module.css";

const Backdrop = ({ closeModalHandler }) => {
  return <div className={classes.backdrop} onClick={closeModalHandler}></div>;
};

export default Backdrop;
