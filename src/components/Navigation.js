import classes from "./Navigation.module.css";

const Navigation = ({ onReturn }) => {
  const returnHandler = () => {
    onReturn();
  };

  return (
    <nav className={classes.navigation}>
      <p className={classes.logo} on onClick={returnHandler}>
        NETFLIX
      </p>
      <ul className={classes.list}>
        <li onClick={returnHandler}>Strona główna</li>
        <li>Moja lista</li>
      </ul>
    </nav>
  );
};

export default Navigation;
