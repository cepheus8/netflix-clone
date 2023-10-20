import classes from "./Backdrop.module.css";
import { useContext } from "react";
import AppContext from "../context/appContext";

const Backdrop = () => {
  const { closeModalHandler } = useContext(AppContext);

  return <div className={classes.backdrop} onClick={closeModalHandler}></div>;
};

export default Backdrop;
