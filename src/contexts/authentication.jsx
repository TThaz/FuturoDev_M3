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
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    function login(data) {
        setUserData({
            email: data.email,
            password: data.password,
        });

        const usuarioCadastrado = usuarios.find(
            ({ email }) => email == userData.email
        );

        if (usuarioCadastrado) {
            if (usuarioCadastrado.senha === userData.password) {
                setAuth("Logado");
                return auth;
            }
            return console.log("Informações de Login estão incorretas");
        }

        alert("Informações de login estão incorretas");
    }

    const logout = () => {
        setAuth(null);
        setUserData({
            email: "",
            password: "",
        });
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
