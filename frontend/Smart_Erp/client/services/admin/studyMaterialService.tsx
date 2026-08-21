import api from "@/services/axiosConfig";

// ============================================================
// TYPES
// ============================================================

export interface Teacher {
    id: number;
    name: string;
    subject?: string;
}

export interface MiniChapter {
    id: number;
    name: string;
    description?: string;
}

export interface Chapter {
    id: number;
    name: string;
    description?: string;
    miniChapters: MiniChapter[];
}

export interface Subject {
    id: number;
    subjectName: string;
    subjectCode: string;

    chapters: Chapter[];

    questionBankTeacher?: Teacher | null;
    studyMaterialTeacher?: Teacher | null;
}

export interface CreateChapterRequest {
    name: string;
    description?: string;
}

export interface UpdateChapterRequest {
    name: string;
    description?: string;
}

export interface CreateMiniChapterRequest {
    name: string;
    description?: string;
}

export interface UpdateMiniChapterRequest {
    name: string;
    description?: string;
}

// ============================================================
// ERROR HANDLER
// ============================================================

export function getApiErrorMessage(
    error: unknown,
    fallback = "Something went wrong. Please try again."
): string {
    const axiosError = error as {
        response?: {
            data?: {
                message?: string;
                error?: string;
            };
        };
        message?: string;
    };

    return (
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        fallback
    );
}

// ============================================================
// SUBJECT APIs
// ============================================================

/**
 * Get all subjects
 */
export async function getSubjects(): Promise<Subject[]> {
    const response = await api.get<Subject[]>("/admin/study-material/subjects");

    return response.data;
}

/**
 * Search subjects
 */
export async function searchSubjects(
    search: string
): Promise<Subject[]> {
    const response = await api.get<Subject[]>(
        "/admin/study-material/subjects/search",
        {
            params: {
                search,
            },
        }
    );

    return response.data;
}

/**
 * Get single subject
 */
export async function getSubjectById(
    subjectId: number
): Promise<Subject> {
    const response = await api.get<Subject>(
        `/admin/study-material/subjects/${subjectId}`
    );

    return response.data;
}

// ============================================================
// CHAPTER APIs
// ============================================================

/**
 * Add chapter
 */
export async function addChapter(
    subjectId: number,
    data: CreateChapterRequest
): Promise<Chapter> {
    const response = await api.post<Chapter>(
        `/admin/study-material/subjects/${subjectId}/chapters`,
        data
    );

    return response.data;
}

/**
 * Update chapter
 */
export async function updateChapter(
    chapterId: number,
    data: UpdateChapterRequest
): Promise<Chapter> {
    const response = await api.put<Chapter>(
        `/admin/study-material/chapters/${chapterId}`,
        data
    );

    return response.data;
}

/**
 * Delete chapter
 */
export async function deleteChapter(
    chapterId: number
): Promise<void> {
    await api.delete(
        `/admin/study-material/chapters/${chapterId}`
    );
}

// ============================================================
// MINI CHAPTER APIs
// ============================================================

/**
 * Add mini chapter
 */
export async function addMiniChapter(
    chapterId: number,
    data: CreateMiniChapterRequest
): Promise<MiniChapter> {
    const response = await api.post<MiniChapter>(
        `/admin/study-material/chapters/${chapterId}/mini-chapters`,
        data
    );

    return response.data;
}

/**
 * Update mini chapter
 */
export async function updateMiniChapter(
    miniChapterId: number,
    data: UpdateMiniChapterRequest
): Promise<MiniChapter> {
    const response = await api.put<MiniChapter>(
        `/admin/study-material/mini-chapters/${miniChapterId}`,
        data
    );

    return response.data;
}

/**
 * Delete mini chapter
 */
export async function deleteMiniChapter(
    miniChapterId: number
): Promise<void> {
    await api.delete(
        `/admin/study-material/mini-chapters/${miniChapterId}`
    );
}

// ============================================================
// TEACHER APIs
// ============================================================

/**
 * Get teachers available for assignment
 */
export async function getTeachers(): Promise<Teacher[]> {
    const response = await api.get<Teacher[]>(
        "/admin/study-material/teachers"
    );

    return response.data;
}

/**
 * Assign teacher for question bank
 */
export async function assignQuestionBankTeacher(
    subjectId: number,
    teacherId: number
): Promise<Subject> {
    const response = await api.put<Subject>(
        `/admin/study-material/subjects/${subjectId}/question-bank-teacher`,
        {
            teacherId,
        }
    );

    return response.data;
}

/**
 * Assign teacher for study material
 */
export async function assignStudyMaterialTeacher(
    subjectId: number,
    teacherId: number
): Promise<Subject> {
    const response = await api.put<Subject>(
        `/admin/study-material/subjects/${subjectId}/study-material-teacher`,
        {
            teacherId,
        }
    );

    return response.data;
}

/**
 * Remove question bank teacher
 */
export async function removeQuestionBankTeacher(
    subjectId: number
): Promise<Subject> {
    const response = await api.delete<Subject>(
        `/admin/study-material/subjects/${subjectId}/question-bank-teacher`
    );

    return response.data;
}

/**
 * Remove study material teacher
 */
export async function removeStudyMaterialTeacher(
    subjectId: number
): Promise<Subject> {
    const response = await api.delete<Subject>(
        `/admin/study-material/subjects/${subjectId}/study-material-teacher`
    );

    return response.data;
}