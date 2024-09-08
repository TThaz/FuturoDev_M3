import { createContext, useContext, useState } from "react";

const usuarios = [
    {
        email: "teste1@email.com",
        senha: "123456",
    },
    {
        email: "teste2@email.com",
        senha: "123456",
    },
    {
        email: "teste3@email.com",
        senha: "123456",
    },
    {
        email: "123",
        senha: "123",
    },
];

const AuthContext = createContext({
    autenticador: () => {},
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    function login(data) {
        const usuarioCadastrado = usuarios.find(
            ({ email }) => email == data.email
        );

        if (usuarioCadastrado) {
            if (usuarioCadastrado.senha === data.password) {
                setAuth("Logado");
                localStorage.setItem("isLogged", JSON.stringify("Logado"));
                window.location.href = "/home";
                return;
            }
            return console.log("Informações de Login estão incorretas");
        }

        console.log("Informações de login estão incorretas");
    }

    const logout = () => {
        localStorage.removeItem("isLogged");
        setAuth(null);
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
