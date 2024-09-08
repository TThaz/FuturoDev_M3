import "./header.css";
import { LogOut, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";

export function Header() {
    const isLogged = JSON.parse(localStorage.getItem("isLogged"));
    const { logout } = useAuth();

    return (
        <header className="container--header">
            <img src="/logotipo.png" alt="Logotipo do Timer" />
            <nav>
                {isLogged ? (
                    <a href="/login" onClick={logout}>
                        <LogOut size={24} />
                    </a>
                ) : (
                    <NavLink to="/login" end>
                        <User size={24} />
                    </NavLink>
                )}
            </nav>
        </header>
    );
}
