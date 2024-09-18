import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/homepage";
import { LoginPage } from "../pages/loginpage";
import { Layout } from "../template";
import { ProtectedRoutes } from "./protectedRoutes";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LoginPage />,
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: "/home",
                        element: <HomePage />,
                    },
                ],
            },
        ],
    },
]);
