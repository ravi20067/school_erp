import api from "./axiosConfig";
import type { UserProfile } from "@/types/auth";

export const loginAuth = async (username: string, password: string) => {
    const response = await api.post("/auth/login", {
        username,
        password,
    });
    return response.data;
};

export const getProfile = async (): Promise<UserProfile> => {
    const response = await api.get("/auth/profile");
    return response.data;
};