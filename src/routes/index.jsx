import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/homepage";
import { LoginPage } from "../pages/loginpage";
import { Layout } from "../template";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/login',
                element: <LoginPage />
            }
        ]
    }
])