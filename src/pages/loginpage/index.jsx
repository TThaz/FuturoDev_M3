import { FormProvider, useForm } from "react-hook-form";
import { UserLogin } from "../../components/user-login";

import "./login.css";
import { useAuth } from "../../contexts/authentication";

export function LoginPage() {
    const methods = useForm();
    const { login } = useAuth();

    const { handleSubmit } = methods;

    function onSubmit(data) {
        login(data);
    }

    return (
        <div className="container--login">
            <div className="container--image">
                <h1>Bem-vindo de volta!</h1>
                <img src="programming.png" alt="Pessoa programando" />
            </div>

            <div className="container--form">
                <h2> Login </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormProvider {...methods}>
                        <UserLogin />
                    </FormProvider>
                    <div className="form--buttons">
                        <button type="submit"> Login </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
