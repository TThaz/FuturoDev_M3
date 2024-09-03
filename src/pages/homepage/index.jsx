import "./home.css";
import { NavLink } from "react-router-dom";
export function HomePage() {
  return (
    <div className="container--home container--background">
      <div className="container--screen-card">
        <h1>Seja bem-vindo(a)!</h1>
        <h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          repudiandae, cum quod eius repellendus laudantium earum voluptate
          maxime molestias nihil totam esse, voluptatum non cupiditate ipsam?
          Quae totam quas maxime.
        </h4>
        <span>Já é usuário? Faça seu Login</span>
        <NavLink to="/login" end>
          <button>Login</button>
        </NavLink>
      </div>
    </div>
  );
}
