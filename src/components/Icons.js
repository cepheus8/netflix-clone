import { VscSearch } from "react-icons/vsc";
import { VscBell } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import classes from "./Icons.module.css";

const Icons = () => {
  return (
    <ul className={classes.iconsList}>
      <li>
        <VscSearch />
      </li>
      <li>
        <VscBell />
      </li>
      <li>
        <VscAccount />
      </li>
    </ul>
  );
};

export default Icons;
