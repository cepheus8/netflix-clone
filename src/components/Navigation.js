import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav>
      <ul className={classes.list}>
        <li>Strona główna</li>
        <li>Seriale i programy</li>
        <li>Filmy</li>
        <li>Nowe i popularne</li>
        <li>Moja lista</li>
        <li>Przeglądaj wg języka</li>
      </ul>
    </nav>
  );
};

export default Navigation;
