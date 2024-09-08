import "./header.css";
import { House, Timer, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <header className="container--header">
            <img src="/logotipo.png" alt="Logotipo do Timer" />

            <nav>
                <NavLink to="/login" end>
                    <User size={24} />
                </NavLink>
            </nav>
        </header>
    );
}
