import api from "@/services/axiosConfig";
import { TeacherFormData } from "@/types/admin/teacher";

export const getTeacherStats = async () => {
    const response = await api.get("/admin/teacher/stats");
    return response.data;
};

export const getTeachers = async (
    search: string,
    status: string
) => {
    const response = await api.get(
        `/admin/teacher/teachers?search=${encodeURIComponent(search)}&status=${status}`
    );

    return response.data;
};

export const addTeacher = async (
    formData: TeacherFormData
) => {
    const response = await api.post(
        "/admin/teacher/add",
        formData
    );

    return response.data;
};

export const updateTeacher = async (
    id: number,
    formData: TeacherFormData
) => {
    const response = await api.put(
        `/admin/teacher/update/${id}`,
        formData
    );

    return response.data;
};

export const deleteTeacher = async (
    id: number
) => {
    const response = await api.delete(
        `/admin/teacher/delete/${id}`
    );

    return response.data;
};

export const getTeacherById = async (
    id: number
) => {
    const response = await api.get(
        `/admin/teacher/${id}`
    );

    return response.data;
};