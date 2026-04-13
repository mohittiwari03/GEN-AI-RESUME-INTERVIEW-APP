import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await getMe();
                if (response && response.user) {
                    setUser(response.user);
                }
            } catch (err) {
                console.log("No active session");
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, []);

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )
}