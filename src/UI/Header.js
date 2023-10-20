import Navigation from "../components/Navigation";
import Icons from "../components/Icons";
import classes from "./Header.module.css";
import SearchBar from "../components/SearchBar";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (isFocus) {
      inputRef.current.focus();
    }
  }, [isFocus]);

  const startSearchHandler = () => {
    setShowSearchBar(true);
    setIsFocus(true);
  };

  const exitSearchHandler = () => {
    setIsFocus(false);
    setShowSearchBar(false);
  };

  return (
    <header className={classes.header}>
      <Navigation />
      {showSearchBar && isFocus && (
        <div className={classes.searchBar}>
          <SearchBar ref={inputRef} onBlurHandler={exitSearchHandler} />
        </div>
      )}
      <div>
        <Icons
          onSearch={startSearchHandler}
          hideSearchIcon={showSearchBar}
          isFocused={isFocus}
        />
      </div>
    </header>
  );
};

export default Header;
