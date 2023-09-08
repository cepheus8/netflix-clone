import { forwardRef } from "react";
import classes from "./SearchBar.module.css";

const SearchBar = forwardRef((props, ref) => {
  const blurHandler = () => {
    props.onBlur();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onResults(ref.current.value);
  };

  return (
    <form onSubmit={submitHandler}>
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
