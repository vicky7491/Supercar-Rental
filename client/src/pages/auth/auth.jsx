import {createContext, use, useState} from "react";
import { useContext } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    const storeTokeninLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    }
    let isLoggedIn = !!token;

const LogoutUser = () => {
    setToken("");
   return localStorage.removeItem("token");
};



    return (
        <AuthContext.Provider value={{ storeTokeninLS, LogoutUser, isLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {  
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
}