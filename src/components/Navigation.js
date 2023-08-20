import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.navigation}>
      <p className={classes.logo}>NETFLIX</p>
      <ul className={classes.list}>
        <li>Strona główna</li>
        <li>Moja lista</li>
      </ul>
    </nav>
  );
};

export default Navigation;
