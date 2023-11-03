import classes from "./Notification.module.css";
import { useContext } from "react";
import dataContext from "../context/dataContext";

const Notification = () => {
  const { hideNotificationHandler } = useContext(dataContext);

  return (
    <div className={classes.notification} onClick={hideNotificationHandler}>
      <p>ERROR</p>
      <p>Failed to connect</p>
    </div>
  );
};

export default Notification;
