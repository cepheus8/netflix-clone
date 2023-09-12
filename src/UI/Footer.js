import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoYoutube } from "react-icons/bi";
import { BiCopyright } from "react-icons/bi";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={classes.footerIcons}>
        <BiLogoFacebook />
        <BiLogoInstagram />
        <BiLogoTwitter />
        <BiLogoYoutube />
      </div>
      <div>
        <p className={classes.copyright}>
          <BiCopyright />
          Rafał Woźniacki
        </p>
      </div>
    </footer>
  );
};

export default Footer;
