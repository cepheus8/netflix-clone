import { forwardRef } from "react";
import classes from "./SearchBar.module.css";

const SearchBar = forwardRef((props, ref) => {
  const blurHandler = () => {
    props.onBlur();
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Tytuły, osoby, gatunki"
        className={classes.input}
        ref={ref}
        onBlur={blurHandler}
      />
    </form>
  );
});

export default SearchBar;
