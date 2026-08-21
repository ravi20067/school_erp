import api from "@/services/axiosConfig";

// ============================================================
// TYPES
// ============================================================

export interface SubjectTeacher {
    id: number;
    name: string;
    subject?: string;
}

export interface Subject {
    id: number;
    subjectName: string;
    subjectCode: string;
    teachers: SubjectTeacher[];
}

export interface Teacher {
    id: number;
    name: string;
    subject?: string;
}

export interface SubjectRequest {
    subjectName: string;
    subjectCode: string;
    teacherIds: number[];
}

// ============================================================
// GET ALL SUBJECTS
// ============================================================

export const getSubjects = async (): Promise<Subject[]> => {
    try {
        const response = await api.get("/admin/subjects");

        if (!Array.isArray(response.data)) {
            throw new Error("Invalid subjects response from server.");
        }

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch subjects:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to load subjects.";

        throw new Error(message);
    }
};

// ============================================================
// GET ALL TEACHERS
// ============================================================

export const getTeachers = async (): Promise<Teacher[]> => {
    try {
        const response = await api.get("/admin/subjects/teachers");

        if (!Array.isArray(response.data)) {
            throw new Error("Invalid teachers response from server.");
        }

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch teachers:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to load teachers.";

        throw new Error(message);
    }
};

// ============================================================
// CREATE SUBJECT
// ============================================================

export const createSubject = async (
    subject: SubjectRequest
): Promise<Subject> => {
    try {
        const response = await api.post(
            "/admin/subjects",
            subject
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to create subject:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to create subject.";

        throw new Error(message);
    }
};

// ============================================================
// UPDATE SUBJECT
// ============================================================

export const updateSubject = async (
    id: number,
    subject: SubjectRequest
): Promise<Subject> => {
    try {
        const response = await api.put(
            `/admin/subjects/${id}`,
            subject
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to update subject:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to update subject.";

        throw new Error(message);
    }
};

// ============================================================
// DELETE SUBJECT
// ============================================================

export const deleteSubject = async (
    id: number
): Promise<void> => {
    try {
        await api.delete(`/admin/subjects/${id}`);
    } catch (error: any) {
        console.error("Failed to delete subject:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to delete subject.";

        throw new Error(message);
    }
};