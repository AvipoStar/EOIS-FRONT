import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import Sidebar from "../molecules/SideMenu";
import LOGO from "../../../Common/assets/icons/LOGO.svg";

export const Header = () => {
  const [showMenu, setshowMenu] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="Header">
        <img src={LOGO} onClick={() => windowWidth < 1000 && setshowMenu(!showMenu)} style={{ cursor: "pointer" }} />
        {showMenu ? <Sidebar setShow={() => setshowMenu(!showMenu)} /> : <></>}
        <div>Фабрика программирования</div>
      </div>
    </>
  );
};
