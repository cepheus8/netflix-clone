import classes from "./Navigation.module.css";
import { useContext } from "react";
import AppContext from "../context/appContext";

const Navigation = () => {
  const { homeViewHandler, showFavoritesHandler } = useContext(AppContext);

  return (
    <nav className={classes.navigation}>
      <p className={classes.logo} onClick={homeViewHandler}>
        NETFLIX
      </p>
      <ul className={classes.list}>
        <li onClick={homeViewHandler}>Strona główna</li>
        <li onClick={showFavoritesHandler}>Moja lista</li>
      </ul>
    </nav>
  );
};

export default Navigation;
