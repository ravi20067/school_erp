import api from "@/services/axiosConfig";

// ============================================================
// TYPES
// ============================================================

export interface CourseClass {
    id: number;
    className: string;
}

export interface CourseSection {
    id: number;
    sectionName: string;
    classId?: number;
    className?: string;
    studentCount?: number;
}

export interface CourseSubject {
    id: number;
    subjectName: string;
    subjectCode: string;
}

export interface Course {
    id: number;
    courseName: string;
    courseCode: string;

    sections: CourseSection[];
    subjects: CourseSubject[];
}

export interface CourseRequest {
    courseName: string;
    courseCode: string;

    sectionIds: number[];
    subjectIds: number[];
}

export interface SectionRequest {
    sectionName: string;
    classId: number;
}

export interface SubjectRequest {
    subjectName: string;
    subjectCode: string;
}

// ============================================================
// GET ALL COURSES
// ============================================================

export const getCourses = async (): Promise<Course[]> => {
    try {
        const response = await api.get("/admin/courses");

        if (!Array.isArray(response.data)) {
            throw new Error("Invalid courses response from server.");
        }

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch courses:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to load courses.";

        throw new Error(message);
    }
};

// ============================================================
// GET COURSE DETAILS
// ============================================================

export const getCourseById = async (
    courseId: number
): Promise<Course> => {
    try {
        const response = await api.get(
            `/admin/courses/${courseId}`
        );

        return response.data;
    } catch (error: any) {
        console.error(
            "Failed to fetch course details:",
            error
        );

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to load course details.";

        throw new Error(message);
    }
};

// ============================================================
// CREATE COURSE
// ============================================================

export const createCourse = async (
    payload: CourseRequest
): Promise<Course> => {
    try {
        const response = await api.post(
            "/admin/courses",
            payload
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to create course:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to create course.";

        throw new Error(message);
    }
};

// ============================================================
// UPDATE COURSE
// ============================================================

export const updateCourse = async (
    courseId: number,
    payload: CourseRequest
): Promise<Course> => {
    try {
        const response = await api.put(
            `/admin/courses/${courseId}`,
            payload
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to update course:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to update course.";

        throw new Error(message);
    }
};

// ============================================================
// DELETE COURSE
// ============================================================

export const deleteCourse = async (
    courseId: number
): Promise<void> => {
    try {
        await api.delete(
            `/admin/courses/${courseId}`
        );
    } catch (error: any) {
        console.error("Failed to delete course:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to delete course.";

        throw new Error(message);
    }
};

// ============================================================
// GET AVAILABLE SECTIONS
// ============================================================

export const getAvailableSections =
    async (): Promise<CourseSection[]> => {
        try {
            const response = await api.get(
                "/admin/sections"
            );

            if (!Array.isArray(response.data)) {
                throw new Error(
                    "Invalid sections response from server."
                );
            }

            return response.data;
        } catch (error: any) {
            console.error(
                "Failed to fetch sections:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to load sections.";

            throw new Error(message);
        }
    };

// ============================================================
// GET AVAILABLE SUBJECTS
// ============================================================

export const getAvailableSubjects =
    async (): Promise<CourseSubject[]> => {
        try {
            const response = await api.get(
                "/admin/subjects"
            );

            if (!Array.isArray(response.data)) {
                throw new Error(
                    "Invalid subjects response from server."
                );
            }

            return response.data;
        } catch (error: any) {
            console.error(
                "Failed to fetch subjects:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to load subjects.";

            throw new Error(message);
        }
    };

// ============================================================
// ADD SECTION TO COURSE
// ============================================================

export const addSectionToCourse = async (
    courseId: number,
    sectionId: number
): Promise<Course> => {
    try {
        const response = await api.post(
            `/admin/courses/${courseId}/sections`,
            {
                sectionId,
            }
        );

        return response.data;
    } catch (error: any) {
        console.error(
            "Failed to add section to course:",
            error
        );

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to add section.";

        throw new Error(message);
    }
};

// ============================================================
// REMOVE SECTION FROM COURSE
// ============================================================

export const removeSectionFromCourse = async (
    courseId: number,
    sectionId: number
): Promise<void> => {
    try {
        await api.delete(
            `/admin/courses/${courseId}/sections/${sectionId}`
        );
    } catch (error: any) {
        console.error(
            "Failed to remove section:",
            error
        );

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to remove section.";

        throw new Error(message);
    }
};

// ============================================================
// ADD SUBJECT TO COURSE
// ============================================================

export const addSubjectToCourse = async (
    courseId: number,
    subjectId: number
): Promise<Course> => {
    try {
        const response = await api.post(
            `/admin/courses/${courseId}/subjects`,
            {
                subjectId,
            }
        );

        return response.data;
    } catch (error: any) {
        console.error(
            "Failed to add subject to course:",
            error
        );

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to add subject.";

        throw new Error(message);
    }
};

// ============================================================
// REMOVE SUBJECT FROM COURSE
// ============================================================

export const removeSubjectFromCourse = async (
    courseId: number,
    subjectId: number
): Promise<void> => {
    try {
        await api.delete(
            `/admin/courses/${courseId}/subjects/${subjectId}`
        );
    } catch (error: any) {
        console.error(
            "Failed to remove subject:",
            error
        );

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Failed to remove subject.";

        throw new Error(message);
    }
};