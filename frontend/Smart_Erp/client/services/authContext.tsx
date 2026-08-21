import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { setLogoutHandler } from "@/services/axiosConfig";
import type { UserProfile } from "@/types/auth";

import { getProfile } from "./authService";


interface DecodedToken {
    sub: string;
    role?: string;
    exp: number;
}

interface AuthContextType {
    token: string | null;
    role: string | null;
    user: UserProfile | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    getDashboardRoute: () => string;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [role, setRole] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setRole(null);
        setUser(null);
    };

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const decoded: DecodedToken = jwtDecode(newToken);
        setRole(decoded.role || null);


    };
    const loadProfile = async () => {

        if (!token) return;

        try {

            const decoded: DecodedToken = jwtDecode(token);

            if (decoded.exp * 1000 < Date.now()) {
                logout();
                return;
            }

            setRole(decoded.role || null);
            const profile = await getProfile();

            setUser(profile);

        } catch (error) {

            console.error(error);

            logout();

        }
    }

    useEffect(() => {
        loadProfile();
    }, [token]);
    useEffect(() => {
        setLogoutHandler(logout);
    }, []);

    const getDashboardRoute = () => {
        switch (role) {

            case "ROLE_STUDENT":
                return "/student";

            case "ROLE_TEACHER":
                return "/teacher";

            case "ROLE_LIBRARY":
                return "/library";

            case "ROLE_ADMISSION":
                return "/admission";

            case "ROLE_EXAMINATION":
                return "/examination-dept";

            case "ROLE_FINANCE":
                return "/finance";

            case "ROLE_ADMIN":
                return "/admin";

            case "ROLE_DEVICES":
                return "/devices";

            default:
                return "/login";
        }
    };
    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                user,
                refreshProfile: loadProfile,
                login,
                logout,
                isAuthenticated: !!token,
                getDashboardRoute,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("AuthContext missing");
    return context;
};
