import { ReactNode } from "react";
import { Auth } from "../../pages/Auth/organless/Auth";
import { CuratorsPage } from "../../pages/Curators/organless/CuratorsPage";
import { LKPage } from "../../pages/LK/organless/LKPage";
import { PaymentsPage } from "../../pages/Payments/organless/PaymentsPage";
import { ProjectsPage } from "../../pages/Projects/organless/ProjectsPage";
import { SessionsPage } from "../../pages/Sessions/organless/SessionsPage";
import { TaskmanagerPage } from "../../pages/Tasmanager/organless/TaskmanagerPage";
import { paths } from "./paths";

import LKIcon from "../assets/icons/LK.svg";
import ProjectsIcon from "../assets/icons/projects.svg";
import CuratorsIcon from "../assets/icons/curators.svg";
import PaymentsIcon from "../assets/icons/Bukazoid.svg";
import SessionsIcon from "../assets/icons/sessions.svg";
import TasksIcon from "../assets/icons/tasks.svg";
import StudentIcon from "../assets/icons/student.svg";

import LKIcon_dark from "../assets/icons/LK-dark.svg";
import ProjectsIcon_dark from "../assets/icons/projects-dark.svg";
import CuratorsIcon_dark from "../assets/icons/curators-dark.svg";
import PaymentsIcon_dark from "../assets/icons/Bukazoid-dark.svg";
import SessionsIcon_dark from "../assets/icons/sessions-dark.svg";
import TasksIcon_dark from "../assets/icons/tasks-dark.svg";
import StudentIcon_dark from "../assets/icons/student-dark.svg";

import ExitIcon from "../assets/icons/exit.svg";
import { StudentsPage } from "../../pages/Students/organless/StudentsPage";

export interface IRoute {
  id?: number;
  name?: string;
  path: string;
  icon?: string;
  icon_dark?: string;
  element: ReactNode;
}

export const routes: IRoute[] = [
  {
    id: 1,
    name: "Моя страница",
    path: paths.LK,
    icon: LKIcon,
    icon_dark: LKIcon_dark,
    element: <LKPage />,
  },
  {
    id: 2,
    name: "Проекты",
    path: paths.Projects,
    icon: ProjectsIcon,
    icon_dark: ProjectsIcon_dark,
    element: <ProjectsPage />,
  },
  {
    id: 3,
    name: "Кураторы",
    path: paths.Curators,
    icon: CuratorsIcon,
    icon_dark: CuratorsIcon_dark,
    element: <CuratorsPage />,
  },
  {
    id: 4,
    name: "Финансы",
    path: paths.Payments,
    icon: PaymentsIcon,
    icon_dark: PaymentsIcon_dark,
    element: <PaymentsPage />,
  },
  {
    id: 5,
    name: "Сессии",
    path: paths.Sessions,
    icon: SessionsIcon,
    icon_dark: SessionsIcon_dark,
    element: <SessionsPage />,
  },
  {
    id: 6,
    name: "Задачи",
    path: paths.Taskmanager,
    icon: TasksIcon,
    icon_dark: TasksIcon_dark,
    element: <TaskmanagerPage />,
  },
  // {
  //   id: 7,
  //   name: "Заявки",
  //   path: paths.Demands,
  //   icon: DemandsIcon,
  //   icon_dark: DemandsIcon_dark,
  //   // element: <TaskmanagerPage />,
  // },
  {
    id: 8,
    name: "Участники",
    path: paths.Students,
    icon: StudentIcon,
    icon_dark: StudentIcon_dark,
    element: <StudentsPage />,
  },
  {
    id: 10,
    name: "Выход",
    path: paths.Auth,
    icon: ExitIcon,
    element: <Auth />,
  },
];
