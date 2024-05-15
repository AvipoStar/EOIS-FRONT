import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/NavigationMenu.css";

import ExitIcon from "../../../Common/assets/icons/exit.svg";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../Common/redux/redusers/dataSlice";
import { routes } from "../../../Common/config/routeSelector";
import { getMenu } from "../../../API/getMenu";
interface INavigationMenu {
  userRoleId: number;
}

export const NavigationMenu = (params: INavigationMenu) => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isOpened, setisOpened] = useState(false);

  const [routeList, setrouteList] = useState<any[]>([]);
  const [selectedRouteId, setselectedRouteId] = useState<number>(0);

  useEffect(() => {
    fetchMenu(userInfo.id);
  }, [params.userRoleId]);

  const fetchMenu = async (userId: number) => {
    const result = await getMenu(userId);
    if (result) setrouteList(result);
  };

  const handleClick = (item: any) => {
    setselectedRouteId(item.id);
    navigate(item.path);
  };

  const handleExit = () => {
    dispatch(setUserInfo({}));
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <div
      className={isOpened ? "NavigationMenu" : "NavigationMenu close"}
      onMouseEnter={() => setisOpened(true)}
      onMouseLeave={() => setisOpened(false)}
    >
      {routes
        .filter((route) => routeList.some((item) => item.id === route.id))
        .map((r) => {
          return (
            <div
              key={r.id}
              className={
                r.id == selectedRouteId
                  ? "NavigationMenu__item selected"
                  : "NavigationMenu__item"
              }
              onClick={() => handleClick(r)}
            >
              <img
                src={r.id == selectedRouteId ? r.icon_dark : r.icon}
                alt="icon"
              />
              {isOpened && <div>{r.name}</div>}
            </div>
          );
        })}
      <div
        className="NavigationMenu__item"
        onClick={handleExit}
        style={{ color: "var(--color-main-red)" }}
      >
        <img src={ExitIcon} alt="icon" />
        {isOpened && <span>Выход</span>}
      </div>
    </div>
  );
};
