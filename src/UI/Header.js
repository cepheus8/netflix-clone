import Navigation from "../components/Navigation";
import Icons from "../components/Icons";
import classes from "./Header.module.css";
import SearchBar from "../components/SearchBar";
import { useState, useEffect, useRef } from "react";

const Header = (props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (isFocus) {
      inputRef.current.focus();
    }
  }, [isFocus]);

  const addSearchHandler = () => {
    setShowSearchBar(true);
    setIsFocus(true);
  };

  const removeSearchHandler = () => {
    setIsFocus(false);
    setShowSearchBar(false);
  };

  const searchResultsHandler = (input) => {
    props.mainViewHandler(input);
  };

  return (
    <header className={classes.header}>
      <Navigation />
      {showSearchBar && isFocus && (
        <div className={classes.searchBar}>
          <SearchBar
            ref={inputRef}
            onBlur={removeSearchHandler}
            onResults={searchResultsHandler}
          />
        </div>
      )}
      <div>
        <Icons
          onSearch={addSearchHandler}
          hideSearchIcon={showSearchBar}
          isFocused={isFocus}
        />
      </div>
    </header>
  );
};

export default Header;
