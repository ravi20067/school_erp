import api from "@/services/axiosConfig";
import {
    QRCodeResponse,
    TodayAttendance,
    ActivityItem,
} from "@/types/teacher/MyAttendence";


export const generateQr =
    async (): Promise<QRCodeResponse> => {
        const response = await api.post(
            "/teacher/my-attendance/qr/generate"
        );

        return response.data;
    };

export const refreshQr =
    async (): Promise<QRCodeResponse> => {
        const response = await api.post(
            "/teacher/my-attendance/qr/refresh"
        );

        return response.data;
    };

export const getTodayAttendance =
    async (): Promise<TodayAttendance> => {
        const response = await api.get(
            "/teacher/my-attendance/today"
        );

        return response.data;
    };

export const getRecentActivity =
    async (): Promise<ActivityItem[]> => {
        const response = await api.get(
            "/teacher/my-attendance/activity"
        );

        return response.data;
    };