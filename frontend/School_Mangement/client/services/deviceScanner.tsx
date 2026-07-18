// services/deviceScanner.ts

import api from "@/services/axiosConfig";

export const scanAttendance = async (token: string) => {
    const response = await api.post("/devices/mark", {
        token,
    });

    return response.data;
};