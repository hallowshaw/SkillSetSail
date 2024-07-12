import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Rhitam</div>
      <div>
        <Link to={"https://www.facebook.com/Hallowshaw/"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/@RhitamChaudhury"} target="_blank">
          <FaYoutube />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/rhitam-chaudhury-66b17b248/"}
          target="_blank"
        >
          <FaLinkedin />
        </Link>
        <Link
          to={"https://www.instagram.com/illusional_destiny/"}
          target="_blank"
        >
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
