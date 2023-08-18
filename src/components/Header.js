import Navigation from "./Navigation";
import Icons from "./Icons";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      
      <Navigation />
      <Icons />
    </header>
  );
};

export default Header;
