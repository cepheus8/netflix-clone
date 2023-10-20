import { forwardRef, useContext } from "react";
import classes from "./SearchBar.module.css";
import AppContext from "../context/appContext";

const SearchBar = forwardRef((props, ref) => {
  const { resultsViewHandler } = useContext(AppContext);

  const blurHandler = () => {
    props.onBlurHandler();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    resultsViewHandler(ref.current.value);
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
