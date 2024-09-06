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
    const [isLogged, setIsLogged] = useState(false);
    const [auth, setAuth] = useState({
        token: 0,
        value: false,
    });
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    // const [login, setLogin] = useState();

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
                setAuth({
                    token: new Date().getTime(),
                    value: true,
                });
                setIsLogged(true);
                return;
            }
            return console.log("Informações de Login estão incorretas");
        }

        console.log("Informações de login estão incorretas");
    }

    const logout = () => {
        setIsLogged(false);
        setUserData({
            email: "",
            password: "",
        });
    };

    return (
        <AuthContext.Provider
            value={{
                isLogged,
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
