import { Header } from "../components/header";
import { Outlet } from "react-router-dom";

import './template.css'

export function Layout() {
    return (
        <>
            <Header />
            <main className="container--template">
                <div className="container--template-contents">
                    <Outlet />
                </div>
            </main>
        </>
    )
}