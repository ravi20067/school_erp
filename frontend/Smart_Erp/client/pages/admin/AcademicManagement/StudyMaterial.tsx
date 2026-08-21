import { useEffect, useMemo, useState } from "react";

import {
    MessageCircle,
    X,
    Search,
    Plus,
    Pencil,
    Trash2,
    BookOpen,
    ChevronDown,
    ChevronRight,
    UserRound,
    FileQuestion,
    BookMarked,
    RefreshCw,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/admin/Sidebar";
import Copilot from "@/components/admin/Copilot";

import {
    Subject,
    Chapter,
    MiniChapter,
    Teacher,
    getSubjects,
    getSubjectById,
    getTeachers,
    addChapter,
    updateChapter,
    deleteChapter,
    addMiniChapter,
    updateMiniChapter,
    deleteMiniChapter,
    assignQuestionBankTeacher,
    assignStudyMaterialTeacher,
    removeQuestionBankTeacher,
    removeStudyMaterialTeacher,
    getApiErrorMessage,
} from "@/services/admin/studyMaterialService";

// ============================================================
// TYPES
// ============================================================

type ModalType =
    | "chapter"
    | "miniChapter"
    | "questionBankTeacher"
    | "studyMaterialTeacher"
    | null;

interface Toast {
    type: "success" | "error";
    message: string;
}

// ============================================================
// COMPONENT
// ============================================================

export default function StudyMaterial() {
    const [chatOpen, setChatOpen] = useState(false);

    // --------------------------------------------------------
    // DATA
    // --------------------------------------------------------

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const [selectedSubject, setSelectedSubject] =
        useState<Subject | null>(null);

    const [loading, setLoading] = useState(true);
    const [detailLoading, setDetailLoading] = useState(false);

    const [search, setSearch] = useState("");

    // --------------------------------------------------------
    // UI STATE
    // --------------------------------------------------------

    const [expandedSubjects, setExpandedSubjects] =
        useState<number[]>([]);

    const [expandedChapters, setExpandedChapters] =
        useState<number[]>([]);

    const [modal, setModal] = useState<ModalType>(null);

    const [editingChapter, setEditingChapter] =
        useState<Chapter | null>(null);

    const [editingMiniChapter, setEditingMiniChapter] =
        useState<MiniChapter | null>(null);

    const [selectedChapter, setSelectedChapter] =
        useState<Chapter | null>(null);

    const [selectedTeacherId, setSelectedTeacherId] =
        useState<number | "">("");

    const [formName, setFormName] = useState("");
    const [formDescription, setFormDescription] = useState("");

    const [saving, setSaving] = useState(false);

    const [toast, setToast] = useState<Toast | null>(null);

    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {
        loadInitialData();
    }, []);

    async function loadInitialData() {
        try {
            setLoading(true);

            const [subjectData, teacherData] =
                await Promise.all([
                    getSubjects(),
                    getTeachers(),
                ]);

            setSubjects(subjectData);
            setTeachers(teacherData);

            if (subjectData.length > 0) {
                setSelectedSubject(subjectData[0]);
                setExpandedSubjects([subjectData[0].id]);
            }
        } catch (error) {
            showToast(
                "error",
                getApiErrorMessage(
                    error,
                    "Failed to load study material data."
                )
            );
        } finally {
            setLoading(false);
        }
    }

    // ========================================================
    // SEARCH
    // ========================================================

    const filteredSubjects = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) {
            return subjects;
        }

        return subjects.filter(
            (subject) =>
                subject.subjectName
                    .toLowerCase()
                    .includes(value) ||
                subject.subjectCode
                    .toLowerCase()
                    .includes(value)
        );
    }, [subjects, search]);

    // ========================================================
    // SUBJECT SELECTION
    // ========================================================

    async function handleSubjectSelect(subject: Subject) {
        try {
            setSelectedSubject(subject);
            setExpandedSubjects((previous) =>
                previous.includes(subject.id)
                    ? previous.filter((id) => id !== subject.id)
                    : [...previous, subject.id]
            );

            setDetailLoading(true);

            const latestSubject =
                await getSubjectById(subject.id);

            setSelectedSubject(latestSubject);

            setSubjects((previous) =>
                previous.map((item) =>
                    item.id === latestSubject.id
                        ? latestSubject
                        : item
                )
            );
        } catch (error) {
            showToast(
                "error",
                getApiErrorMessage(
                    error,
                    "Failed to load subject details."
                )
            );
        } finally {
            setDetailLoading(false);
        }
    }

    // ========================================================
    // CHAPTER
    // ========================================================

    function openAddChapter() {
        setEditingChapter(null);
        setFormName("");
        setFormDescription("");
        setModal("chapter");
    }

    function openEditChapter(chapter: Chapter) {
        setEditingChapter(chapter);
        setFormName(chapter.name);
        setFormDescription(chapter.description || "");
        setModal("chapter");
    }

    async function handleSaveChapter() {
        if (!selectedSubject) return;

        if (!formName.trim()) {
            showToast("error", "Chapter name is required.");
            return;
        }

        try {
            setSaving(true);

            if (editingChapter) {
                await updateChapter(editingChapter.id, {
                    name: formName.trim(),
                    description: formDescription.trim(),
                });

                showToast(
                    "success",
                    "Chapter updated successfully."
                );
            } else {
                await addChapter(selectedSubject.id, {
                    name: formName.trim(),
                    description: formDescription.trim(),
                });

                showToast(
                    "success",
                    "Chapter added successfully."
                );
            }

            closeModal();
            await refreshSelectedSubject();
        } catch (error) {
            showToast(
                "error",
                getApiErrorMessage(
                    error,
                    "Failed to save chapter."
                )
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteChapter(chapter: Chapter) {
        const confirmed = window.confirm(
            `Delete chapter "${chapter.name}"?\n\nThis may also remove its mini chapters.`
        );

        if (!confirmed) return;

        try {
            setSaving(true);

            await deleteChapter(chapter.id);

            showToast(
                "success",
                "Chapter deleted successfully."
            );

            await refreshSelectedSubject();
        } catch (error) {
            showToast(
                "error",
                getApiErrorMessage(
                    error,
                    "Failed to delete chapter."
                )
            );
        } finally {
            setSaving(false);
        }
    }

    // ========================================================
    // MINI CHAPTER
    // ========================================================

    function openAddMiniChapter(chapter: Chapter) {
        setSelectedChapter(chapter);
        setEditingMiniChapter(null);
        setFormName("");
        setFormDescription("");
        setModal("miniChapter");
    }

    function openEditMiniChapter(
        chapter: Chapter,
        miniChapter: MiniChapter
    ) {
        setSelectedChapter(chapter);
        setEditingMiniChapter(miniChapter);
        setFormName(miniChapter.name);
        setFormDescription(miniChapter.description || "");
        setModal("miniChapter");
    }

    async function handleSaveMiniChapter() {
        if (!selectedChapter) return;

        if (!formName.trim()) {
            showToast(
                "error",
                "Mini chapter name is required."
            );
            return;
        }

        try {
            setSaving(true);

            if (editingMiniChapter) {
                await updateMiniChapter(
                    editingMiniChapter.id,
                    {
                        name: formName.trim(),
                        description:
                            formDescription.trim(),
                    }
                );

                showToast(
                    "success",
                    "Mini chapter updated successfully."
                );
            } else {
                await addMiniChapter(
                    selectedChapter.id,
                    {
                        name: formName.trim(),
                        description:
                            formDescription.trim(),
                    }
                );

                showToast(
                    "success",
                    "Mini chapter added successfully."
                );
            }

            closeModal();
            await refreshSelectedSubject();
        } catch (error) {
            showToast(
                "error",
                getApiErrorMessage(
                    error,
                    "Failed to save mini chapter."
                )
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteMiniChapter(
        miniChapter: MiniChapter
    ) {
        const confirmed = window.confirm(
            `Delete mini chapter "${miniChapter.name}"?`
        );

        if (!confirmed) return;

        try {
            setSaving(true);

            await deleteMiniChapter(miniChapter.id);

            showToast(
                "success",
                "Mini chapter deleted successfully."
            );

            await refreshSelectedSubject();
        } catch (error) {
            showToast(
                "error",
                getApiErrorMessage(
                    error,
                    "Failed to delete mini chapter."
                )
            );
        } finally {
            setSaving(false);
        }
    }

    // ========================================================
    // TEACHERS
    // ========================================================

    function openQuestionBankTeacherModal() {
        if (!selectedSubject) return;

        setSelectedTeacherId(
            selectedSubject.questionBankTeacher?.id || ""
        );

        setModal("questionBankTeacher");
    }

    function openStudyMaterialTeacherModal() {
        if (!selectedSubject) return;

        setSelectedTeacherId(
            selectedSubject.studyMaterialTeacher?.id || ""
        );

        setModal("studyMaterialTeacher");
    }

    async function handleAssignTeacher(
        type: "questionBank" | "studyMaterial"
    ) {
        if (!selectedSubject) return;

        if (!selectedTeacherId) {
            showToast(
                "error",
                "Please select a teacher."
            );
            return;
        }

        try {
            setSaving(true);

            if (type === "questionBank") {
                await assignQuestionBankTeacher(
                    selectedSubject.id,
                    Number(selectedTeacherId)
                );

                showToast(
                    "success",
                    "Question bank teacher assigned."
                );
            } else {
                await assignStudyMaterialTeacher(
                    selectedSubject.id,
                    Number(selectedTeacherId)
                );

                showToast(
                    "success",
                    "Study material teacher assigned."
                );
            }

            closeModal();
            await refreshSelectedSubject();
        } catch (error) {
            showToast(
                "error",
                getApiErrorMessage(
                    error,
                    "Failed to assign teacher."
                )
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleRemoveTeacher(
        type: "questionBank" | "studyMaterial"
    ) {
        if (!selectedSubject) return;

        const confirmed = window.confirm(
            "Remove the currently assigned teacher?"
        );

        if (!confirmed) return;

        try {
            setSaving(true);

            if (type === "questionBank") {
                await removeQuestionBankTeacher(
                    selectedSubject.id
                );
            } else {
                await removeStudyMaterialTeacher(
                    selectedSubject.id
                );
            }

            showToast(
                "success",
                "Teacher assignment removed."
            );

            await refreshSelectedSubject();
        } catch (error) {
            showToast(
                "error",
                getApiErrorMessage(
                    error,
                    "Failed to remove teacher."
                )
            );
        } finally {
            setSaving(false);
        }
    }

    // ========================================================
    // REFRESH
    // ========================================================

    async function refreshSelectedSubject() {
        if (!selectedSubject) return;

        const latest =
            await getSubjectById(selectedSubject.id);

        setSelectedSubject(latest);

        setSubjects((previous) =>
            previous.map((subject) =>
                subject.id === latest.id
                    ? latest
                    : subject
            )
        );
    }

    // ========================================================
    // HELPERS
    // ========================================================

    function closeModal() {
        setModal(null);
        setEditingChapter(null);
        setEditingMiniChapter(null);
        setSelectedChapter(null);
        setFormName("");
        setFormDescription("");
        setSelectedTeacherId("");
    }

    function showToast(
        type: "success" | "error",
        message: string
    ) {
        setToast({
            type,
            message,
        });

        setTimeout(() => {
            setToast(null);
        }, 4000);
    }

    function toggleChapter(chapterId: number) {
        setExpandedChapters((previous) =>
            previous.includes(chapterId)
                ? previous.filter(
                    (id) => id !== chapterId
                )
                : [...previous, chapterId]
        );
    }

    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div className="h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">

            <Header />

            <div className="flex h-[calc(100vh-80px)]">

                {/* SIDEBAR */}
                <aside
                    className="
                    hidden lg:block
                    w-72 shrink-0
                    overflow-y-auto
                    border-r
                    border-slate-200
                    dark:border-slate-800
                    bg-white
                    dark:bg-slate-900
                    "
                >
                    <Sidebar />
                </aside>

                {/* MAIN */}
                <main
                    className="
                    flex-1
                    overflow-y-auto
                    p-4 md:p-6
                    "
                >

                    {/* PAGE HEADER */}
                    <div className="mb-6">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                    Study Material
                                </h1>

                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Manage subjects, chapters, mini chapters and teacher assignments.
                                </p>
                            </div>

                            <button
                                onClick={loadInitialData}
                                disabled={loading}
                                className="
                                inline-flex items-center gap-2
                                px-4 py-2.5
                                rounded-xl
                                border
                                border-slate-200
                                dark:border-slate-700
                                bg-white
                                dark:bg-slate-900
                                hover:bg-slate-50
                                dark:hover:bg-slate-800
                                "
                            >
                                <RefreshCw
                                    size={17}
                                    className={
                                        loading
                                            ? "animate-spin"
                                            : ""
                                    }
                                />

                                Refresh
                            </button>

                        </div>

                    </div>

                    {/* SEARCH */}
                    <div
                        className="
                        mb-6
                        relative
                        "
                    >
                        <Search
                            size={20}
                            className="
                            absolute left-4 top-1/2
                            -translate-y-1/2
                            text-slate-400
                            "
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search subject by name or code..."
                            className="
                            w-full
                            pl-12 pr-4
                            py-3
                            rounded-xl
                            border
                            border-slate-200
                            dark:border-slate-700
                            bg-white
                            dark:bg-slate-900
                            text-slate-900
                            dark:text-white
                            outline-none
                            focus:ring-2
                            focus:ring-primary/30
                            "
                        />
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <RefreshCw
                                className="animate-spin text-primary"
                                size={30}
                            />
                        </div>
                    )}

                    {/* EMPTY */}
                    {!loading &&
                        filteredSubjects.length === 0 && (
                            <div
                                className="
                                bg-white
                                dark:bg-slate-900
                                border
                                border-slate-200
                                dark:border-slate-800
                                rounded-2xl
                                p-12
                                text-center
                                "
                            >
                                <BookOpen
                                    size={42}
                                    className="mx-auto mb-4 text-slate-400"
                                />

                                <h3 className="font-semibold text-lg">
                                    No subjects found
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Try another subject name or code.
                                </p>
                            </div>
                        )}

                    {!loading &&
                        filteredSubjects.length > 0 && (

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                                {/* SUBJECT LIST */}
                                <section
                                    className="
                                    xl:col-span-1
                                    bg-white
                                    dark:bg-slate-900
                                    border
                                    border-slate-200
                                    dark:border-slate-800
                                    rounded-2xl
                                    overflow-hidden
                                    "
                                >

                                    <div
                                        className="
                                        px-5 py-4
                                        border-b
                                        border-slate-200
                                        dark:border-slate-800
                                        "
                                    >
                                        <h2 className="font-bold">
                                            Subjects
                                        </h2>

                                        <p className="text-xs text-slate-500 mt-1">
                                            {filteredSubjects.length} subject
                                            {filteredSubjects.length !== 1
                                                ? "s"
                                                : ""}
                                        </p>
                                    </div>

                                    <div className="divide-y divide-slate-100 dark:divide-slate-800">

                                        {filteredSubjects.map(
                                            (subject) => {
                                                const active =
                                                    selectedSubject?.id ===
                                                    subject.id;

                                                return (
                                                    <button
                                                        key={subject.id}
                                                        onClick={() =>
                                                            handleSubjectSelect(
                                                                subject
                                                            )
                                                        }
                                                        className={`
                                                        w-full
                                                        text-left
                                                        p-4
                                                        transition
                                                        ${active
                                                                ? "bg-primary/10"
                                                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                                            }
                                                        `}
                                                    >

                                                        <div className="flex items-center gap-3">

                                                            <div
                                                                className="
                                                                w-10 h-10
                                                                rounded-xl
                                                                bg-primary/10
                                                                flex
                                                                items-center
                                                                justify-center
                                                                "
                                                            >
                                                                <BookOpen
                                                                    size={19}
                                                                    className="text-primary"
                                                                />
                                                            </div>

                                                            <div className="min-w-0">

                                                                <h3 className="font-semibold truncate">
                                                                    {
                                                                        subject.subjectName
                                                                    }
                                                                </h3>

                                                                <p className="text-xs text-slate-500">
                                                                    {
                                                                        subject.subjectCode
                                                                    }
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </button>
                                                );
                                            }
                                        )}

                                    </div>

                                </section>

                                {/* SUBJECT DETAILS */}
                                <section
                                    className="
                                    xl:col-span-2
                                    "
                                >

                                    {selectedSubject && (
                                        <div className="space-y-6">

                                            {/* SUBJECT INFO */}
                                            <div
                                                className="
                                                bg-white
                                                dark:bg-slate-900
                                                border
                                                border-slate-200
                                                dark:border-slate-800
                                                rounded-2xl
                                                p-5
                                                "
                                            >

                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                                    <div>

                                                        <div className="flex items-center gap-2">

                                                            <BookOpen
                                                                size={21}
                                                                className="text-primary"
                                                            />

                                                            <h2 className="text-xl font-bold">
                                                                {
                                                                    selectedSubject.subjectName
                                                                }
                                                            </h2>

                                                        </div>

                                                        <p className="text-sm text-slate-500 mt-1">
                                                            Subject Code:{" "}
                                                            <span className="font-medium">
                                                                {
                                                                    selectedSubject.subjectCode
                                                                }
                                                            </span>
                                                        </p>

                                                    </div>

                                                    {detailLoading && (
                                                        <RefreshCw
                                                            size={20}
                                                            className="animate-spin text-primary"
                                                        />
                                                    )}

                                                </div>

                                            </div>

                                            {/* TEACHER ASSIGNMENTS */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                {/* QUESTION BANK */}
                                                <TeacherAssignmentCard
                                                    title="Question Bank Teacher"
                                                    icon={
                                                        <FileQuestion
                                                            size={20}
                                                        />
                                                    }
                                                    teacher={
                                                        selectedSubject.questionBankTeacher
                                                    }
                                                    onAssign={
                                                        openQuestionBankTeacherModal
                                                    }
                                                    onRemove={() =>
                                                        handleRemoveTeacher(
                                                            "questionBank"
                                                        )
                                                    }
                                                />

                                                {/* STUDY MATERIAL */}
                                                <TeacherAssignmentCard
                                                    title="Study Material Teacher"
                                                    icon={
                                                        <BookMarked
                                                            size={20}
                                                        />
                                                    }
                                                    teacher={
                                                        selectedSubject.studyMaterialTeacher
                                                    }
                                                    onAssign={
                                                        openStudyMaterialTeacherModal
                                                    }
                                                    onRemove={() =>
                                                        handleRemoveTeacher(
                                                            "studyMaterial"
                                                        )
                                                    }
                                                />

                                            </div>

                                            {/* CHAPTERS */}
                                            <div
                                                className="
                                                bg-white
                                                dark:bg-slate-900
                                                border
                                                border-slate-200
                                                dark:border-slate-800
                                                rounded-2xl
                                                overflow-hidden
                                                "
                                            >

                                                <div
                                                    className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    p-5
                                                    border-b
                                                    border-slate-200
                                                    dark:border-slate-800
                                                    "
                                                >

                                                    <div>
                                                        <h2 className="font-bold text-lg">
                                                            Chapters
                                                        </h2>

                                                        <p className="text-xs text-slate-500 mt-1">
                                                            Manage chapters and mini chapters.
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={
                                                            openAddChapter
                                                        }
                                                        className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        px-3
                                                        py-2
                                                        rounded-xl
                                                        bg-primary
                                                        text-white
                                                        text-sm
                                                        font-medium
                                                        hover:opacity-90
                                                        "
                                                    >
                                                        <Plus
                                                            size={17}
                                                        />

                                                        Add Chapter
                                                    </button>

                                                </div>

                                                {selectedSubject.chapters?.length ===
                                                    0 ? (
                                                    <div className="p-10 text-center text-sm text-slate-500">
                                                        No chapters added yet.
                                                    </div>
                                                ) : (
                                                    <div className="divide-y divide-slate-100 dark:divide-slate-800">

                                                        {selectedSubject.chapters.map(
                                                            (
                                                                chapter
                                                            ) => {
                                                                const expanded =
                                                                    expandedChapters.includes(
                                                                        chapter.id
                                                                    );

                                                                return (
                                                                    <div
                                                                        key={
                                                                            chapter.id
                                                                        }
                                                                    >

                                                                        <div className="flex items-center justify-between gap-3 p-4">

                                                                            <button
                                                                                onClick={() =>
                                                                                    toggleChapter(
                                                                                        chapter.id
                                                                                    )
                                                                                }
                                                                                className="flex items-center gap-3 min-w-0 text-left"
                                                                            >

                                                                                {expanded ? (
                                                                                    <ChevronDown
                                                                                        size={
                                                                                            18
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    <ChevronRight
                                                                                        size={
                                                                                            18
                                                                                        }
                                                                                    />
                                                                                )}

                                                                                <div
                                                                                    className="
                                                                                    w-9 h-9
                                                                                    rounded-lg
                                                                                    bg-slate-100
                                                                                    dark:bg-slate-800
                                                                                    flex
                                                                                    items-center
                                                                                    justify-center
                                                                                    "
                                                                                >
                                                                                    <BookOpen
                                                                                        size={
                                                                                            17
                                                                                        }
                                                                                    />
                                                                                </div>

                                                                                <div className="min-w-0">

                                                                                    <h3 className="font-semibold truncate">
                                                                                        {
                                                                                            chapter.name
                                                                                        }
                                                                                    </h3>

                                                                                    {chapter.description && (
                                                                                        <p className="text-xs text-slate-500 truncate">
                                                                                            {
                                                                                                chapter.description
                                                                                            }
                                                                                        </p>
                                                                                    )}

                                                                                </div>

                                                                            </button>

                                                                            <div className="flex items-center gap-1">

                                                                                <button
                                                                                    onClick={() =>
                                                                                        openEditChapter(
                                                                                            chapter
                                                                                        )
                                                                                    }
                                                                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                                                                                >
                                                                                    <Pencil
                                                                                        size={
                                                                                            16
                                                                                        }
                                                                                    />
                                                                                </button>

                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleDeleteChapter(
                                                                                            chapter
                                                                                        )
                                                                                    }
                                                                                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                                                                >
                                                                                    <Trash2
                                                                                        size={
                                                                                            16
                                                                                        }
                                                                                    />
                                                                                </button>

                                                                            </div>

                                                                        </div>

                                                                        {/* MINI CHAPTERS */}
                                                                        {expanded && (
                                                                            <div className="bg-slate-50/70 dark:bg-slate-950/40 px-5 pb-5 pt-2">

                                                                                <div className="flex items-center justify-between mb-3">

                                                                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                                                                        Mini Chapters
                                                                                    </span>

                                                                                    <button
                                                                                        onClick={() =>
                                                                                            openAddMiniChapter(
                                                                                                chapter
                                                                                            )
                                                                                        }
                                                                                        className="text-xs flex items-center gap-1 text-primary font-medium"
                                                                                    >
                                                                                        <Plus
                                                                                            size={
                                                                                                14
                                                                                            }
                                                                                        />

                                                                                        Add
                                                                                    </button>

                                                                                </div>

                                                                                {chapter.miniChapters?.length ===
                                                                                    0 ? (
                                                                                    <p className="text-xs text-slate-500 py-3">
                                                                                        No mini chapters.
                                                                                    </p>
                                                                                ) : (
                                                                                    <div className="space-y-2">

                                                                                        {chapter.miniChapters.map(
                                                                                            (
                                                                                                mini
                                                                                            ) => (
                                                                                                <div
                                                                                                    key={
                                                                                                        mini.id
                                                                                                    }
                                                                                                    className="
                                                                                                    flex
                                                                                                    items-center
                                                                                                    justify-between
                                                                                                    gap-3
                                                                                                    bg-white
                                                                                                    dark:bg-slate-900
                                                                                                    border
                                                                                                    border-slate-200
                                                                                                    dark:border-slate-800
                                                                                                    rounded-xl
                                                                                                    px-3
                                                                                                    py-2.5
                                                                                                    "
                                                                                                >

                                                                                                    <div className="flex items-center gap-2 min-w-0">

                                                                                                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                                                                                            <BookMarked
                                                                                                                size={
                                                                                                                    14
                                                                                                                }
                                                                                                                className="text-primary"
                                                                                                            />
                                                                                                        </div>

                                                                                                        <div className="min-w-0">

                                                                                                            <p className="text-sm font-medium truncate">
                                                                                                                {
                                                                                                                    mini.name
                                                                                                                }
                                                                                                            </p>

                                                                                                            {mini.description && (
                                                                                                                <p className="text-xs text-slate-500 truncate">
                                                                                                                    {
                                                                                                                        mini.description
                                                                                                                    }
                                                                                                                </p>
                                                                                                            )}

                                                                                                        </div>

                                                                                                    </div>

                                                                                                    <div className="flex items-center">

                                                                                                        <button
                                                                                                            onClick={() =>
                                                                                                                openEditMiniChapter(
                                                                                                                    chapter,
                                                                                                                    mini
                                                                                                                )
                                                                                                            }
                                                                                                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                                                                                                        >
                                                                                                            <Pencil
                                                                                                                size={
                                                                                                                    14
                                                                                                                }
                                                                                                            />
                                                                                                        </button>

                                                                                                        <button
                                                                                                            onClick={() =>
                                                                                                                handleDeleteMiniChapter(
                                                                                                                    mini
                                                                                                                )
                                                                                                            }
                                                                                                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                                                                                        >
                                                                                                            <Trash2
                                                                                                                size={
                                                                                                                    14
                                                                                                                }
                                                                                                            />
                                                                                                        </button>

                                                                                                    </div>

                                                                                                </div>
                                                                                            )
                                                                                        )}

                                                                                    </div>
                                                                                )}

                                                                            </div>
                                                                        )}

                                                                    </div>
                                                                );
                                                            }
                                                        )}

                                                    </div>
                                                )}

                                            </div>

                                        </div>
                                    )}

                                </section>

                            </div>
                        )}

                </main>
            </div>

            {/* ====================================================
                MODALS
            ==================================================== */}

            {modal && (
                <div
                    className="
                    fixed inset-0 z-[100]
                    bg-black/50
                    flex items-center justify-center
                    p-4
                    "
                    onClick={closeModal}
                >

                    <div
                        className="
                        w-full max-w-md
                        bg-white
                        dark:bg-slate-900
                        rounded-2xl
                        border
                        border-slate-200
                        dark:border-slate-700
                        shadow-2xl
                        "
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* CHAPTER / MINI CHAPTER */}
                        {(modal === "chapter" ||
                            modal === "miniChapter") && (
                                <>
                                    <ModalHeader
                                        title={
                                            modal === "chapter"
                                                ? editingChapter
                                                    ? "Edit Chapter"
                                                    : "Add Chapter"
                                                : editingMiniChapter
                                                    ? "Edit Mini Chapter"
                                                    : "Add Mini Chapter"
                                        }
                                        onClose={closeModal}
                                    />

                                    <div className="p-5 space-y-4">

                                        <div>
                                            <label className="block text-sm font-medium mb-1.5">
                                                Name
                                            </label>

                                            <input
                                                value={formName}
                                                onChange={(e) =>
                                                    setFormName(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={
                                                    modal === "chapter"
                                                        ? "Chapter name"
                                                        : "Mini chapter name"
                                                }
                                                className="
                                            w-full
                                            px-3 py-2.5
                                            rounded-xl
                                            border
                                            border-slate-200
                                            dark:border-slate-700
                                            bg-white
                                            dark:bg-slate-950
                                            outline-none
                                            focus:ring-2
                                            focus:ring-primary/30
                                            "
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1.5">
                                                Description
                                            </label>

                                            <textarea
                                                value={
                                                    formDescription
                                                }
                                                onChange={(e) =>
                                                    setFormDescription(
                                                        e.target.value
                                                    )
                                                }
                                                rows={3}
                                                placeholder="Optional description"
                                                className="
                                            w-full
                                            px-3 py-2.5
                                            rounded-xl
                                            border
                                            border-slate-200
                                            dark:border-slate-700
                                            bg-white
                                            dark:bg-slate-950
                                            outline-none
                                            resize-none
                                            "
                                            />
                                        </div>

                                        <div className="flex justify-end gap-3 pt-2">

                                            <button
                                                onClick={closeModal}
                                                className="
                                            px-4 py-2.5
                                            rounded-xl
                                            border
                                            border-slate-200
                                            dark:border-slate-700
                                            "
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={
                                                    modal ===
                                                        "chapter"
                                                        ? handleSaveChapter
                                                        : handleSaveMiniChapter
                                                }
                                                disabled={saving}
                                                className="
                                            px-4 py-2.5
                                            rounded-xl
                                            bg-primary
                                            text-white
                                            disabled:opacity-50
                                            "
                                            >
                                                {saving
                                                    ? "Saving..."
                                                    : "Save"}
                                            </button>

                                        </div>

                                    </div>
                                </>
                            )}

                        {/* TEACHER ASSIGNMENT */}
                        {(modal ===
                            "questionBankTeacher" ||
                            modal ===
                            "studyMaterialTeacher") && (
                                <>
                                    <ModalHeader
                                        title={
                                            modal ===
                                                "questionBankTeacher"
                                                ? "Assign Question Bank Teacher"
                                                : "Assign Study Material Teacher"
                                        }
                                        onClose={closeModal}
                                    />

                                    <div className="p-5 space-y-4">

                                        <div>
                                            <label className="block text-sm font-medium mb-1.5">
                                                Select Teacher
                                            </label>

                                            <select
                                                value={
                                                    selectedTeacherId
                                                }
                                                onChange={(e) =>
                                                    setSelectedTeacherId(
                                                        e.target
                                                            .value
                                                            ? Number(
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                            : ""
                                                    )
                                                }
                                                className="
                                            w-full
                                            px-3 py-2.5
                                            rounded-xl
                                            border
                                            border-slate-200
                                            dark:border-slate-700
                                            bg-white
                                            dark:bg-slate-950
                                            "
                                            >
                                                <option value="">
                                                    Select teacher
                                                </option>

                                                {teachers.map(
                                                    (teacher) => (
                                                        <option
                                                            key={
                                                                teacher.id
                                                            }
                                                            value={
                                                                teacher.id
                                                            }
                                                        >
                                                            {
                                                                teacher.name
                                                            }
                                                            {teacher.subject
                                                                ? ` — ${teacher.subject}`
                                                                : ""}
                                                        </option>
                                                    )
                                                )}

                                            </select>

                                        </div>

                                        <div className="flex justify-end gap-3">

                                            <button
                                                onClick={closeModal}
                                                className="
                                            px-4 py-2.5
                                            rounded-xl
                                            border
                                            border-slate-200
                                            dark:border-slate-700
                                            "
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleAssignTeacher(
                                                        modal ===
                                                            "questionBankTeacher"
                                                            ? "questionBank"
                                                            : "studyMaterial"
                                                    )
                                                }
                                                disabled={saving}
                                                className="
                                            px-4 py-2.5
                                            rounded-xl
                                            bg-primary
                                            text-white
                                            disabled:opacity-50
                                            "
                                            >
                                                {saving
                                                    ? "Assigning..."
                                                    : "Assign Teacher"}
                                            </button>

                                        </div>

                                    </div>
                                </>
                            )}

                    </div>

                </div>
            )}

            {/* ====================================================
                TOAST
            ==================================================== */}

            {toast && (
                <div
                    className="
                    fixed
                    top-24
                    right-6
                    z-[200]
                    w-[min(420px,calc(100vw-32px))]
                    "
                >

                    <div
                        className={`
                        flex
                        items-start
                        gap-3
                        p-4
                        rounded-xl
                        border
                        shadow-xl
                        ${toast.type === "success"
                                ? "bg-white dark:bg-slate-900 border-green-200 dark:border-green-900"
                                : "bg-white dark:bg-slate-900 border-red-200 dark:border-red-900"
                            }
                        `}
                    >

                        {toast.type === "success" ? (
                            <CheckCircle2
                                className="text-green-500 shrink-0"
                                size={20}
                            />
                        ) : (
                            <AlertCircle
                                className="text-red-500 shrink-0"
                                size={20}
                            />
                        )}

                        <p className="text-sm flex-1">
                            {toast.message}
                        </p>

                        <button
                            onClick={() =>
                                setToast(null)
                            }
                        >
                            <X size={16} />
                        </button>

                    </div>

                </div>
            )}

            {/* ====================================================
                FLOATING COPILOT
            ==================================================== */}

            <button
                onClick={() => setChatOpen(true)}
                className="
                fixed
                bottom-6
                right-6
                z-50
                w-16
                h-16
                rounded-full
                bg-gradient-to-r
                from-primary
                to-secondary
                text-white
                shadow-xl
                hover:scale-105
                transition
                flex
                items-center
                justify-center
                "
            >
                <MessageCircle size={28} />
            </button>

            {chatOpen && (
                <>
                    <div
                        className="
                        fixed inset-0
                        bg-black/40
                        z-40
                        "
                        onClick={() =>
                            setChatOpen(false)
                        }
                    />

                    <div
                        className="
                        fixed
                        bottom-24 right-6
                        z-50
                        w-[95vw] sm:w-[420px]
                        h-[75vh] max-h-[700px]
                        rounded-3xl
                        overflow-hidden
                        bg-white dark:bg-slate-900
                        border
                        border-slate-200
                        dark:border-slate-700
                        shadow-2xl
                        animate-in
                        slide-in-from-bottom-4
                        "
                    >

                        <div
                            className="
                            flex items-center justify-between
                            px-5 py-4
                            border-b
                            border-slate-200
                            dark:border-slate-700
                            "
                        >

                            <div>
                                <h2 className="font-bold text-lg">
                                    AI Administrator Copilot
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Ask anything.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setChatOpen(false)
                                }
                                className="
                                p-2 rounded-lg
                                hover:bg-slate-100
                                dark:hover:bg-slate-800
                                "
                            >
                                <X size={20} />
                            </button>

                        </div>

                        <div className="h-[calc(100%-72px)]">
                            <Copilot />
                        </div>

                    </div>
                </>
            )}

        </div>
    );
}

// ============================================================
// TEACHER ASSIGNMENT CARD
// ============================================================

function TeacherAssignmentCard({
    title,
    icon,
    teacher,
    onAssign,
    onRemove,
}: {
    title: string;
    icon: React.ReactNode;
    teacher?: Teacher | null;
    onAssign: () => void;
    onRemove: () => void;
}) {
    return (
        <div
            className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            p-5
            "
        >

            <div className="flex items-center gap-2 mb-4">

                <div
                    className="
                    w-9 h-9
                    rounded-lg
                    bg-primary/10
                    flex items-center
                    justify-center
                    text-primary
                    "
                >
                    {icon}
                </div>

                <h3 className="font-semibold">
                    {title}
                </h3>

            </div>

            {teacher ? (
                <div
                    className="
                    flex items-center justify-between
                    gap-3
                    "
                >

                    <div className="flex items-center gap-3 min-w-0">

                        <div
                            className="
                            w-10 h-10
                            rounded-full
                            bg-slate-100
                            dark:bg-slate-800
                            flex items-center
                            justify-center
                            "
                        >
                            <UserRound size={18} />
                        </div>

                        <div className="min-w-0">

                            <p className="font-medium truncate">
                                {teacher.name}
                            </p>

                            {teacher.subject && (
                                <p className="text-xs text-slate-500 truncate">
                                    {teacher.subject}
                                </p>
                            )}

                        </div>

                    </div>

                    <div className="flex items-center">

                        <button
                            onClick={onAssign}
                            className="
                            p-2 rounded-lg
                            hover:bg-slate-100
                            dark:hover:bg-slate-800
                            "
                            title="Change teacher"
                        >
                            <Pencil size={15} />
                        </button>

                        <button
                            onClick={onRemove}
                            className="
                            p-2 rounded-lg
                            text-red-500
                            hover:bg-red-50
                            dark:hover:bg-red-950/30
                            "
                            title="Remove teacher"
                        >
                            <Trash2 size={15} />
                        </button>

                    </div>

                </div>
            ) : (
                <div>

                    <p className="text-sm text-slate-500 mb-3">
                        No teacher assigned.
                    </p>

                    <button
                        onClick={onAssign}
                        className="
                        inline-flex
                        items-center
                        gap-2
                        px-3 py-2
                        rounded-xl
                        bg-primary
                        text-white
                        text-sm
                        "
                    >
                        <Plus size={16} />
                        Assign Teacher
                    </button>

                </div>
            )}

        </div>
    );
}

// ============================================================
// MODAL HEADER
// ============================================================

function ModalHeader({
    title,
    onClose,
}: {
    title: string;
    onClose: () => void;
}) {
    return (
        <div
            className="
            flex items-center justify-between
            px-5 py-4
            border-b
            border-slate-200
            dark:border-slate-800
            "
        >

            <h2 className="font-bold text-lg">
                {title}
            </h2>

            <button
                onClick={onClose}
                className="
                p-2 rounded-lg
                hover:bg-slate-100
                dark:hover:bg-slate-800
                "
            >
                <X size={18} />
            </button>

        </div>
    );
}