import { FormProvider, useForm } from "react-hook-form";
import { UserLogin } from "../../components/user-login";
import { NavLink } from "react-router-dom";

import "./login.css";

export function LoginPage() {
  const methods = useForm();

  const { handleSubmit } = methods;

  function teste() {
    alert("Usuário Logado!");
  }

  return (
    <div className="container--login">
      <div className="container--image">
        <h1>Bem-vindo de volta!</h1>
        <img src="programming.png" alt="Pessoa programando" />
      </div>

      <div className="container--form">
        <h2> Login </h2>
        <form onSubmit={handleSubmit(teste)}>
          <FormProvider {...methods}>
            <UserLogin />
          </FormProvider>
          <div className="form--buttons">
            <NavLink to="/" end>
              <button type="button"> Home </button>
            </NavLink>
            <button type="submit"> Login </button>
          </div>
        </form>
      </div>
    </div>
  );
}
