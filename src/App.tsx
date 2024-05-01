import "./App.css";
import { Header } from "./ui/Header/organless/Header";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setDirections,
  setEventTypes,
  setFirmsOnCurrentSession,
  setProfiles,
  setRoles,
  setUserInfo,
  setTaskPriorities,
} from "./Common/redux/redusers/dataSlice";
import { useEffect } from "react";
import { getProfiles } from "./API/getProfiles";
import { getDirections } from "./API/getDirections";
import { getRoles } from "./API/getRoles";
import { checkToken } from "./API/checkToken";
import { getUserInfo } from "./API/getUserInfo";
import { NavigationMenu } from "./ui/NavigationMenu/organless/NavigationMenu";
import { getEventTypes } from "./API/getEventTypes";
import { getFirmsOnCurrentSession } from "./API/getFirmsOnCurrentSession";
import { routes } from "./Common/config/routeSelector";
import { TaskmanagerBoardPage } from "./pages/Tasmanager/organless/TaskmanagerBoardPage";
import { getTaskPriorities } from "./API/getTaskPriorities";

export const App = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.userInfo);

  useEffect(() => {
    const token = localStorage.getItem("EOIS_TOKEN"); // Проверка наличия токена
    if (token && token != "") {
      // Если токен есть авторизируемся через него
      tokenAuth(token);
    } // Иначе переходим на страницу авторизации
    else {
      navigate("/auth");
      localStorage.setItem("EOIS_TOKEN", "");
    }
  }, []);

  const tokenAuth = async (token: string) => {
    const result = await checkToken(token); // Проверка токена
    if (result.success) {
      localStorage.setItem("EOIS_TOKEN", result.token);
      fetchUserInfo(result.user_id);
      navigate("/LK");
    } else {
      navigate("/auth");
    }
  };

  const fetchUserInfo = async (userId: number) => {
    const userInfo = await getUserInfo(userId);
    dispatch(setUserInfo(userInfo));
  };

  const fetchProfiles = async () => {
    const profiles = await getProfiles();
    dispatch(setProfiles(profiles));
  };

  const fetchDirections = async () => {
    const directions = await getDirections();
    dispatch(setDirections(directions));
  };

  const fetchRoles = async () => {
    const roles = await getRoles();
    dispatch(setRoles(roles));
  };

  const fetchEventTypes = async () => {
    const eventTypes = await getEventTypes();
    dispatch(setEventTypes(eventTypes));
  };

  const fetchFirmsOnCurrentSession = async () => {
    const firms = await getFirmsOnCurrentSession();
    dispatch(setFirmsOnCurrentSession(firms));
  };

  const fetchTaskmanagerPriorities = async () => {
    const priorities = await getTaskPriorities();
    dispatch(setTaskPriorities(priorities));
  };

  useEffect(() => {
    if (userInfo.id) {
      fetchProfiles();
      fetchDirections();
      fetchRoles();
      fetchEventTypes();
      fetchFirmsOnCurrentSession();
      fetchTaskmanagerPriorities();
      navigate("/LK");
    }
  }, [userInfo]);

  return (
    <div className="App">
      {userInfo?.id && <Header />}
      <div className="MainPage" style={ {justifyContent: location.pathname === '/auth' ? 'center' : 'initial' }} >
        {userInfo?.id && <NavigationMenu userRoleId={userInfo.id} />}
        <Routes>
          <Route
            path="/tasks/:id"
            element={<TaskmanagerBoardPage />}
            key="taskPage"
          />
          {routes.map((r: any) => (
            <Route path={r.path} element={r.element} key={r.path} />
          ))}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </div>
  );
};
