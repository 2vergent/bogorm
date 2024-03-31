import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  let isAuth = JSON.parse(localStorage.getItem("isAuth"));
  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

export const PublicRoutes = () => {
  let isAuth = JSON.parse(localStorage.getItem("isAuth"));
  return <>{isAuth ? <Navigate to="/home" /> : <Outlet />}</>;
};
