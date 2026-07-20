import { MainPage } from "./Pages/MainPage/MainPage";
import { RegistUser } from "./Pages/RegistUser/RegistUser";
import { Report } from "./Pages/Report/Report";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { AdminDashboard } from "./Pages/AdminDashboard/AdminDashboard";

export const routes = [
  { path: "", element: <MainPage /> },
  { path: "*", element: <MainPage /> },
  { path: "regist", element: <RegistUser /> },
  { path: "report", element: <Report /> },
  { path: "dashboard", element: <Dashboard /> },
  { path: "Admindashboard", element: <AdminDashboard /> },
];
