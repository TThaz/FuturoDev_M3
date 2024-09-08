import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    const isLogged = JSON.parse(localStorage.getItem("isLogged"));

    return !isLogged ? <Navigate to="/login" /> : <Outlet />;
};
