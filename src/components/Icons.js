import { VscSearch } from "react-icons/vsc";

import classes from "./Icons.module.css";

const Icons = ({ onSearch, hideSearchIcon, isFocused }) => {
  return (
    <ul className={classes.iconsList}>
      <li>
        {!hideSearchIcon && !isFocused && <VscSearch onClick={onSearch} />}
      </li>
    </ul>
  );
};

export default Icons;
