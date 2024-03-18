import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/SideMenu.css";

interface ISidebar {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = (params: ISidebar) => {
  // const userRoleId = localStorage.getItem("roleId");
  // const userFio = `${localStorage.getItem("userSurname")} ${localStorage.getItem("userName")} ${localStorage.getItem(
  //   "userPatronymic"
  // )}`;

  const handleExit = async () => {
    localStorage.clear();
    params.setShow(false);
  };

  return (
    <>
      <div className="SideMenu">
        <div className="SideMenuUserInfo">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              fontSize: "24px",
            }}
          >
            {/* <div>{userFio ? userFio : ""}</div> */}
          </div>
        </div>
        <div className={"SideMenuButtonBlock"}>
          <div onClick={() => params}>
            <NavLink to="/" className="SideMenuButton">
              Личный кабинет
            </NavLink>
          </div>
          <div onClick={() => params}>
            <NavLink to="/Project" className="SideMenuButton">
              Проекты
            </NavLink>
          </div>
          <div onClick={() => params}>
            <NavLink to="/Curator" className="SideMenuButton">
              Кураторы
            </NavLink>
          </div>
          {/* {userRoleId == "1" && ( */}
            <div onClick={() => params}>
              <NavLink to="/Student" className="SideMenuButton">
                Участники
              </NavLink>
            </div>
          {/* )} */}
          <div onClick={() => params}>
            <NavLink to="/Payment" className="SideMenuButton">
              Штрафы поощрения
            </NavLink>{" "}
          </div>

          <div onClick={() => params}>
            <NavLink to="/Timetable" className="SideMenuButton">
              Расписание
            </NavLink>
          </div>
          {/* {userRoleId == "1" && ( */}
            <div onClick={() => params}>
              <NavLink to="/Session" className="SideMenuButton">
                Сессии
              </NavLink>{" "}
            </div>
          {/* )} */}
          <div onClick={() => params}>
            <NavLink to="/AuthReg" className="SideMenuButton">
              <div onClick={handleExit}>Выход</div>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="SideMenuBackground" onClick={() => params.setShow} />
    </>
  );
};

export default Sidebar;
