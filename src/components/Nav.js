import React, { useEffect, useState } from "react";
import "../css/Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const listner = window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", listner);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img className="nav_logo" src="" alter="logo" />

      <img className="nav_login" src="" alter="login" />
    </div>
  );
}

export default Nav;
