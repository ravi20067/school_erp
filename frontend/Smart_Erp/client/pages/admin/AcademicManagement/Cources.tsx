import { useEffect, useMemo, useState } from "react";
import {
    MessageCircle,
    X,
    Plus,
    Search,
    Pencil,
    Trash2,
    BookOpen,
    Layers,
    Users,
    Loader2,
    AlertCircle,
    CheckCircle2,
    ArrowLeft,
    GraduationCap,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/admin/Sidebar";
import Copilot from "@/components/admin/Copilot";

import {
    getCourses,
    getCourseById,
    getAvailableSections,
    getAvailableSubjects,
    createCourse,
    updateCourse,
    deleteCourse,
    addSectionToCourse,
    removeSectionFromCourse,
    addSubjectToCourse,
    removeSubjectFromCourse,
    type Course,
    type CourseSection,
    type CourseSubject,
} from "@/services/admin/courceService";

// ============================================================
// COMPONENT
// ============================================================

export default function Cources() {
    // ==========================================================
    // CHAT
    // ==========================================================

    const [chatOpen, setChatOpen] = useState(false);

    // ==========================================================
    // COURSE DATA
    // ==========================================================

    const [courses, setCourses] = useState<Course[]>([]);

    const [availableSections, setAvailableSections] =
        useState<CourseSection[]>([]);

    const [availableSubjects, setAvailableSubjects] =
        useState<CourseSubject[]>([]);

    // ==========================================================
    // COURSE DETAILS
    // ==========================================================

    const [selectedCourse, setSelectedCourse] =
        useState<Course | null>(null);

    const [detailsLoading, setDetailsLoading] =
        useState(false);

    // ==========================================================
    // LOADING
    // ==========================================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    const [processingId, setProcessingId] =
        useState<number | null>(null);

    // ==========================================================
    // MESSAGES
    // ==========================================================

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // ==========================================================
    // SEARCH
    // ==========================================================

    const [search, setSearch] = useState("");

    // ==========================================================
    // MODAL
    // ==========================================================

    const [modalOpen, setModalOpen] = useState(false);

    const [editingCourse, setEditingCourse] =
        useState<Course | null>(null);

    // ==========================================================
    // FORM
    // ==========================================================

    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");

    const [selectedSectionIds, setSelectedSectionIds] =
        useState<number[]>([]);

    const [selectedSubjectIds, setSelectedSubjectIds] =
        useState<number[]>([]);

    // ==========================================================
    // FORM SEARCH
    // ==========================================================

    const [sectionSearch, setSectionSearch] =
        useState("");

    const [subjectSearch, setSubjectSearch] =
        useState("");

    // ==========================================================
    // DETAIL TAB
    // ==========================================================

    const [activeTab, setActiveTab] = useState<
        "overview" | "sections" | "subjects"
    >("overview");

    // ==========================================================
    // INITIAL LOAD
    // ==========================================================

    useEffect(() => {
        loadInitialData();
    }, []);

    async function loadInitialData() {
        try {
            setLoading(true);
            setErrorMsg("");

            const [
                courseData,
                sectionData,
                subjectData,
            ] = await Promise.all([
                getCourses(),
                getAvailableSections(),
                getAvailableSubjects(),
            ]);

            setCourses(courseData);
            setAvailableSections(sectionData);
            setAvailableSubjects(subjectData);
        } catch (error: any) {
            setErrorMsg(
                error?.message ||
                "Unable to load course data."
            );
        } finally {
            setLoading(false);
        }
    }

    // ==========================================================
    // SEARCH COURSES
    // ==========================================================

    const filteredCourses = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return courses;
        }

        return courses.filter((course) => {
            const sectionNames =
                course.sections
                    ?.map(
                        (section) =>
                            `${section.sectionName} ${section.className || ""}`
                    )
                    .join(" ")
                    .toLowerCase() || "";

            const subjectNames =
                course.subjects
                    ?.map(
                        (subject) =>
                            `${subject.subjectName} ${subject.subjectCode}`
                    )
                    .join(" ")
                    .toLowerCase() || "";

            return (
                course.courseName
                    ?.toLowerCase()
                    .includes(query) ||
                course.courseCode
                    ?.toLowerCase()
                    .includes(query) ||
                sectionNames.includes(query) ||
                subjectNames.includes(query)
            );
        });
    }, [courses, search]);

    // ==========================================================
    // SEARCH SECTIONS
    // ==========================================================

    const filteredSections = useMemo(() => {
        const query = sectionSearch
            .trim()
            .toLowerCase();

        if (!query) {
            return availableSections;
        }

        return availableSections.filter((section) =>
            `${section.sectionName} ${section.className || ""}`
                .toLowerCase()
                .includes(query)
        );
    }, [
        availableSections,
        sectionSearch,
    ]);

    // ==========================================================
    // SEARCH SUBJECTS
    // ==========================================================

    const filteredSubjects = useMemo(() => {
        const query = subjectSearch
            .trim()
            .toLowerCase();

        if (!query) {
            return availableSubjects;
        }

        return availableSubjects.filter((subject) =>
            `${subject.subjectName} ${subject.subjectCode}`
                .toLowerCase()
                .includes(query)
        );
    }, [
        availableSubjects,
        subjectSearch,
    ]);

    // ==========================================================
    // OPEN ADD
    // ==========================================================

    function openAddModal() {
        setEditingCourse(null);

        setCourseName("");
        setCourseCode("");

        setSelectedSectionIds([]);
        setSelectedSubjectIds([]);

        setSectionSearch("");
        setSubjectSearch("");

        setErrorMsg("");

        setModalOpen(true);
    }

    // ==========================================================
    // OPEN EDIT
    // ==========================================================

    function openEditModal(course: Course) {
        setEditingCourse(course);

        setCourseName(course.courseName || "");
        setCourseCode(course.courseCode || "");

        setSelectedSectionIds(
            course.sections?.map(
                (section) => section.id
            ) || []
        );

        setSelectedSubjectIds(
            course.subjects?.map(
                (subject) => subject.id
            ) || []
        );

        setSectionSearch("");
        setSubjectSearch("");

        setErrorMsg("");

        setModalOpen(true);
    }

    // ==========================================================
    // CLOSE MODAL
    // ==========================================================

    function closeModal() {
        if (saving) {
            return;
        }

        setModalOpen(false);
        setEditingCourse(null);

        setCourseName("");
        setCourseCode("");

        setSelectedSectionIds([]);
        setSelectedSubjectIds([]);

        setSectionSearch("");
        setSubjectSearch("");
    }

    // ==========================================================
    // TOGGLE SECTION
    // ==========================================================

    function toggleSection(sectionId: number) {
        setSelectedSectionIds((current) => {
            if (current.includes(sectionId)) {
                return current.filter(
                    (id) => id !== sectionId
                );
            }

            return [...current, sectionId];
        });
    }

    // ==========================================================
    // TOGGLE SUBJECT
    // ==========================================================

    function toggleSubject(subjectId: number) {
        setSelectedSubjectIds((current) => {
            if (current.includes(subjectId)) {
                return current.filter(
                    (id) => id !== subjectId
                );
            }

            return [...current, subjectId];
        });
    }

    // ==========================================================
    // VALIDATION
    // ==========================================================

    function validateForm(): string | null {
        if (!courseName.trim()) {
            return "Course name is required.";
        }

        if (!courseCode.trim()) {
            return "Course code is required.";
        }

        if (courseName.trim().length < 2) {
            return "Course name must contain at least 2 characters.";
        }

        if (courseCode.trim().length < 2) {
            return "Course code must contain at least 2 characters.";
        }

        return null;
    }

    // ==========================================================
    // SAVE COURSE
    // ==========================================================

    async function handleSaveCourse() {
        const validationError =
            validateForm();

        if (validationError) {
            setErrorMsg(validationError);
            return;
        }

        try {
            setSaving(true);
            setErrorMsg("");
            setSuccessMsg("");

            const payload = {
                courseName: courseName.trim(),
                courseCode: courseCode
                    .trim()
                    .toUpperCase(),

                sectionIds: selectedSectionIds,
                subjectIds: selectedSubjectIds,
            };

            if (editingCourse) {
                const updated =
                    await updateCourse(
                        editingCourse.id,
                        payload
                    );

                setCourses((current) =>
                    current.map((course) =>
                        course.id === updated.id
                            ? updated
                            : course
                    )
                );

                if (
                    selectedCourse?.id ===
                    updated.id
                ) {
                    setSelectedCourse(updated);
                }

                setSuccessMsg(
                    "Course updated successfully."
                );
            } else {
                const created =
                    await createCourse(payload);

                setCourses((current) => [
                    created,
                    ...current,
                ]);

                setSuccessMsg(
                    "Course created successfully."
                );
            }

            setModalOpen(false);

            setEditingCourse(null);

            setCourseName("");
            setCourseCode("");

            setSelectedSectionIds([]);
            setSelectedSubjectIds([]);
        } catch (error: any) {
            setErrorMsg(
                error?.message ||
                "Unable to save course."
            );
        } finally {
            setSaving(false);
        }
    }

    // ==========================================================
    // DELETE COURSE
    // ==========================================================

    async function handleDeleteCourse(
        course: Course
    ) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${course.courseName}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(course.id);

            setErrorMsg("");
            setSuccessMsg("");

            await deleteCourse(course.id);

            setCourses((current) =>
                current.filter(
                    (item) =>
                        item.id !== course.id
                )
            );

            if (
                selectedCourse?.id ===
                course.id
            ) {
                setSelectedCourse(null);
            }

            setSuccessMsg(
                `${course.courseName} deleted successfully.`
            );
        } catch (error: any) {
            setErrorMsg(
                error?.message ||
                "Unable to delete course."
            );
        } finally {
            setDeletingId(null);
        }
    }

    // ==========================================================
    // OPEN COURSE DETAILS
    // ==========================================================

    async function openCourseDetails(
        course: Course
    ) {
        try {
            setDetailsLoading(true);
            setErrorMsg("");

            const details =
                await getCourseById(
                    course.id
                );

            setSelectedCourse(details);
            setActiveTab("overview");
        } catch (error: any) {
            setErrorMsg(
                error?.message ||
                "Unable to load course details."
            );
        } finally {
            setDetailsLoading(false);
        }
    }

    // ==========================================================
    // BACK TO COURSE LIST
    // ==========================================================

    function closeCourseDetails() {
        setSelectedCourse(null);
    }

    // ==========================================================
    // ADD SECTION
    // ==========================================================

    async function handleAddSection(
        sectionId: number
    ) {
        if (!selectedCourse) {
            return;
        }

        try {
            setProcessingId(sectionId);

            setErrorMsg("");
            setSuccessMsg("");

            const updated =
                await addSectionToCourse(
                    selectedCourse.id,
                    sectionId
                );

            setSelectedCourse(updated);

            setCourses((current) =>
                current.map((course) =>
                    course.id === updated.id
                        ? updated
                        : course
                )
            );

            setSuccessMsg(
                "Section added to course."
            );
        } catch (error: any) {
            setErrorMsg(
                error?.message ||
                "Unable to add section."
            );
        } finally {
            setProcessingId(null);
        }
    }

    // ==========================================================
    // REMOVE SECTION
    // ==========================================================

    async function handleRemoveSection(
        sectionId: number
    ) {
        if (!selectedCourse) {
            return;
        }

        try {
            setProcessingId(sectionId);

            setErrorMsg("");
            setSuccessMsg("");

            await removeSectionFromCourse(
                selectedCourse.id,
                sectionId
            );

            const updated = {
                ...selectedCourse,
                sections:
                    selectedCourse.sections.filter(
                        (section) =>
                            section.id !== sectionId
                    ),
            };

            setSelectedCourse(updated);

            setCourses((current) =>
                current.map((course) =>
                    course.id === updated.id
                        ? updated
                        : course
                )
            );

            setSuccessMsg(
                "Section removed successfully."
            );
        } catch (error: any) {
            setErrorMsg(
                error?.message ||
                "Unable to remove section."
            );
        } finally {
            setProcessingId(null);
        }
    }

    // ==========================================================
    // ADD SUBJECT
    // ==========================================================

    async function handleAddSubject(
        subjectId: number
    ) {
        if (!selectedCourse) {
            return;
        }

        try {
            setProcessingId(subjectId);

            setErrorMsg("");
            setSuccessMsg("");

            const updated =
                await addSubjectToCourse(
                    selectedCourse.id,
                    subjectId
                );

            setSelectedCourse(updated);

            setCourses((current) =>
                current.map((course) =>
                    course.id === updated.id
                        ? updated
                        : course
                )
            );

            setSuccessMsg(
                "Subject added to course."
            );
        } catch (error: any) {
            setErrorMsg(
                error?.message ||
                "Unable to add subject."
            );
        } finally {
            setProcessingId(null);
        }
    }

    // ==========================================================
    // REMOVE SUBJECT
    // ==========================================================

    async function handleRemoveSubject(
        subjectId: number
    ) {
        if (!selectedCourse) {
            return;
        }

        try {
            setProcessingId(subjectId);

            setErrorMsg("");
            setSuccessMsg("");

            await removeSubjectFromCourse(
                selectedCourse.id,
                subjectId
            );

            const updated = {
                ...selectedCourse,
                subjects:
                    selectedCourse.subjects.filter(
                        (subject) =>
                            subject.id !== subjectId
                    ),
            };

            setSelectedCourse(updated);

            setCourses((current) =>
                current.map((course) =>
                    course.id === updated.id
                        ? updated
                        : course
                )
            );

            setSuccessMsg(
                "Subject removed successfully."
            );
        } catch (error: any) {
            setErrorMsg(
                error?.message ||
                "Unable to remove subject."
            );
        } finally {
            setProcessingId(null);
        }
    }

    // ==========================================================
    // MAIN UI
    // ==========================================================

    return (
        <div className="h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">

            <Header />

            <div className="flex h-[calc(100vh-80px)]">

                {/* ==================================================
                    SIDEBAR
                ================================================== */}

                <aside
                    className="
                        hidden
                        w-72
                        shrink-0
                        overflow-y-auto
                        border-r
                        border-slate-200
                        bg-white
                        dark:border-slate-800
                        dark:bg-slate-900
                        lg:block
                    "
                >
                    <Sidebar />
                </aside>

                {/* ==================================================
                    CONTENT
                ================================================== */}

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        p-4
                        md:p-6
                    "
                >

                    {/* ==================================================
                        ERROR
                    ================================================== */}

                    {errorMsg && (
                        <div
                            className="
                                mb-5
                                flex
                                items-start
                                gap-3
                                rounded-xl
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-red-700
                                dark:border-red-900
                                dark:bg-red-950/40
                                dark:text-red-300
                            "
                        >
                            <AlertCircle
                                size={20}
                                className="mt-0.5"
                            />

                            <span className="flex-1 text-sm">
                                {errorMsg}
                            </span>

                            <button
                                onClick={() =>
                                    setErrorMsg("")
                                }
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}

                    {/* ==================================================
                        SUCCESS
                    ================================================== */}

                    {successMsg && (
                        <div
                            className="
                                mb-5
                                flex
                                items-start
                                gap-3
                                rounded-xl
                                border
                                border-green-200
                                bg-green-50
                                px-4
                                py-3
                                text-green-700
                                dark:border-green-900
                                dark:bg-green-950/40
                                dark:text-green-300
                            "
                        >
                            <CheckCircle2
                                size={20}
                            />

                            <span className="flex-1 text-sm">
                                {successMsg}
                            </span>

                            <button
                                onClick={() =>
                                    setSuccessMsg("")
                                }
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}

                    {/* ==================================================
                        COURSE DETAILS
                    ================================================== */}

                    {selectedCourse ? (

                        <div>

                            {/* DETAILS HEADER */}

                            <div className="mb-6">

                                <button
                                    onClick={
                                        closeCourseDetails
                                    }
                                    className="
                                        mb-4
                                        inline-flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-semibold
                                        text-slate-500
                                        hover:text-primary
                                    "
                                >
                                    <ArrowLeft
                                        size={17}
                                    />

                                    Back to Courses
                                </button>

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                        md:flex-row
                                        md:items-center
                                        md:justify-between
                                    "
                                >

                                    <div className="flex items-center gap-3">

                                        <div
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-primary/10
                                                text-primary
                                            "
                                        >
                                            <GraduationCap
                                                size={25}
                                            />
                                        </div>

                                        <div>

                                            <h1
                                                className="
                                                    text-2xl
                                                    font-bold
                                                    text-slate-900
                                                    dark:text-white
                                                "
                                            >
                                                {
                                                    selectedCourse.courseName
                                                }
                                            </h1>

                                            <p className="text-sm text-slate-500">
                                                {
                                                    selectedCourse.courseCode
                                                }
                                            </p>

                                        </div>

                                    </div>

                                    <button
                                        onClick={() =>
                                            openEditModal(
                                                selectedCourse
                                            )
                                        }
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-primary
                                            px-5
                                            py-3
                                            text-sm
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        <Pencil
                                            size={17}
                                        />

                                        Edit Course
                                    </button>

                                </div>

                            </div>

                            {/* TABS */}

                            <div
                                className="
                                    mb-6
                                    flex
                                    overflow-x-auto
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-1
                                    dark:border-slate-800
                                    dark:bg-slate-900
                                "
                            >

                                {[
                                    {
                                        id: "overview",
                                        label: "Overview",
                                        icon: BookOpen,
                                    },
                                    {
                                        id: "sections",
                                        label: "Sections",
                                        icon: Layers,
                                    },
                                    {
                                        id: "subjects",
                                        label: "Subjects",
                                        icon: BookOpen,
                                    },
                                ].map((tab) => {
                                    const Icon =
                                        tab.icon;

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() =>
                                                setActiveTab(
                                                    tab.id as
                                                    | "overview"
                                                    | "sections"
                                                    | "subjects"
                                                )
                                            }
                                            className={`
                                                flex
                                                flex-1
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-lg
                                                px-4
                                                py-2.5
                                                text-sm
                                                font-semibold
                                                transition
                                                ${activeTab ===
                                                    tab.id
                                                    ? "bg-primary text-white"
                                                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                }
                                            `}
                                        >
                                            <Icon
                                                size={17}
                                            />

                                            {tab.label}
                                        </button>
                                    );
                                })}

                            </div>

                            {/* ==================================================
                                OVERVIEW
                            ================================================== */}

                            {activeTab ===
                                "overview" && (
                                    <div
                                        className="
                                        grid
                                        gap-5
                                        md:grid-cols-3
                                    "
                                    >

                                        <div
                                            className="
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            p-6
                                            dark:border-slate-800
                                            dark:bg-slate-900
                                        "
                                        >
                                            <div className="mb-4 flex items-center justify-between">

                                                <span className="text-sm text-slate-500">
                                                    Course
                                                </span>

                                                <GraduationCap
                                                    size={20}
                                                    className="text-primary"
                                                />

                                            </div>

                                            <h3 className="text-lg font-bold dark:text-white">
                                                {
                                                    selectedCourse.courseName
                                                }
                                            </h3>

                                            <p className="mt-1 font-mono text-sm text-slate-500">
                                                {
                                                    selectedCourse.courseCode
                                                }
                                            </p>

                                        </div>

                                        <div
                                            className="
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            p-6
                                            dark:border-slate-800
                                            dark:bg-slate-900
                                        "
                                        >

                                            <div className="mb-4 flex items-center justify-between">

                                                <span className="text-sm text-slate-500">
                                                    Sections
                                                </span>

                                                <Layers
                                                    size={20}
                                                    className="text-primary"
                                                />

                                            </div>

                                            <h3 className="text-3xl font-bold dark:text-white">
                                                {
                                                    selectedCourse
                                                        .sections
                                                        ?.length || 0
                                                }
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Assigned sections
                                            </p>

                                        </div>

                                        <div
                                            className="
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            p-6
                                            dark:border-slate-800
                                            dark:bg-slate-900
                                        "
                                        >

                                            <div className="mb-4 flex items-center justify-between">

                                                <span className="text-sm text-slate-500">
                                                    Subjects
                                                </span>

                                                <BookOpen
                                                    size={20}
                                                    className="text-primary"
                                                />

                                            </div>

                                            <h3 className="text-3xl font-bold dark:text-white">
                                                {
                                                    selectedCourse
                                                        .subjects
                                                        ?.length || 0
                                                }
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Assigned subjects
                                            </p>

                                        </div>

                                    </div>
                                )}

                            {/* ==================================================
                                SECTIONS
                            ================================================== */}

                            {activeTab ===
                                "sections" && (
                                    <div
                                        className="
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        p-5
                                        dark:border-slate-800
                                        dark:bg-slate-900
                                    "
                                    >

                                        <div className="mb-5">

                                            <h2 className="text-lg font-bold dark:text-white">
                                                Course Sections
                                            </h2>

                                            <p className="text-sm text-slate-500">
                                                Manage sections assigned
                                                to this course.
                                            </p>

                                        </div>

                                        <div className="space-y-3">

                                            {selectedCourse.sections
                                                ?.length ? (
                                                selectedCourse.sections.map(
                                                    (
                                                        section
                                                    ) => (
                                                        <div
                                                            key={
                                                                section.id
                                                            }
                                                            className="
                                                            flex
                                                            items-center
                                                            justify-between
                                                            rounded-xl
                                                            border
                                                            border-slate-200
                                                            p-4
                                                            dark:border-slate-700
                                                        "
                                                        >

                                                            <div className="flex items-center gap-3">

                                                                <div
                                                                    className="
                                                                    flex
                                                                    h-10
                                                                    w-10
                                                                    items-center
                                                                    justify-center
                                                                    rounded-lg
                                                                    bg-primary/10
                                                                    text-primary
                                                                "
                                                                >
                                                                    <Layers
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </div>

                                                                <div>

                                                                    <p className="font-semibold dark:text-white">
                                                                        {
                                                                            section.sectionName
                                                                        }
                                                                    </p>

                                                                    {section.className && (
                                                                        <p className="text-xs text-slate-500">
                                                                            Class:{" "}
                                                                            {
                                                                                section.className
                                                                            }
                                                                        </p>
                                                                    )}

                                                                </div>

                                                            </div>

                                                            <button
                                                                disabled={
                                                                    processingId ===
                                                                    section.id
                                                                }
                                                                onClick={() =>
                                                                    handleRemoveSection(
                                                                        section.id
                                                                    )
                                                                }
                                                                className="
                                                                rounded-lg
                                                                border
                                                                border-red-200
                                                                px-3
                                                                py-2
                                                                text-xs
                                                                font-semibold
                                                                text-red-600
                                                                dark:border-red-900
                                                                dark:text-red-400
                                                            "
                                                            >
                                                                {processingId ===
                                                                    section.id ? (
                                                                    <Loader2
                                                                        size={
                                                                            15
                                                                        }
                                                                        className="animate-spin"
                                                                    />
                                                                ) : (
                                                                    "Remove"
                                                                )}
                                                            </button>

                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <p className="py-10 text-center text-sm text-slate-500">
                                                    No sections assigned.
                                                </p>
                                            )}

                                        </div>

                                        {/* AVAILABLE SECTIONS */}

                                        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">

                                            <h3 className="mb-4 font-semibold dark:text-white">
                                                Add Section
                                            </h3>

                                            <div className="mb-4 relative">

                                                <Search
                                                    size={17}
                                                    className="
                                                    absolute
                                                    left-3
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-slate-400
                                                "
                                                />

                                                <input
                                                    value={
                                                        sectionSearch
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setSectionSearch(
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Search class or section..."
                                                    className="
                                                    w-full
                                                    rounded-xl
                                                    border
                                                    border-slate-200
                                                    bg-slate-50
                                                    py-2.5
                                                    pl-9
                                                    pr-3
                                                    text-sm
                                                    dark:border-slate-700
                                                    dark:bg-slate-950
                                                    dark:text-white
                                                "
                                                />

                                            </div>

                                            <div className="grid gap-3 md:grid-cols-2">

                                                {filteredSections
                                                    .filter(
                                                        (
                                                            section
                                                        ) =>
                                                            !selectedCourse.sections.some(
                                                                (
                                                                    assigned
                                                                ) =>
                                                                    assigned.id ===
                                                                    section.id
                                                            )
                                                    )
                                                    .map(
                                                        (
                                                            section
                                                        ) => (
                                                            <button
                                                                key={
                                                                    section.id
                                                                }
                                                                disabled={
                                                                    processingId ===
                                                                    section.id
                                                                }
                                                                onClick={() =>
                                                                    handleAddSection(
                                                                        section.id
                                                                    )
                                                                }
                                                                className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                rounded-xl
                                                                border
                                                                border-slate-200
                                                                p-4
                                                                text-left
                                                                hover:border-primary
                                                                dark:border-slate-700
                                                            "
                                                            >

                                                                <div>

                                                                    <p className="font-semibold dark:text-white">
                                                                        {
                                                                            section.sectionName
                                                                        }
                                                                    </p>

                                                                    <p className="text-xs text-slate-500">
                                                                        {
                                                                            section.className
                                                                        }
                                                                    </p>

                                                                </div>

                                                                {processingId ===
                                                                    section.id ? (
                                                                    <Loader2
                                                                        size={
                                                                            17
                                                                        }
                                                                        className="animate-spin"
                                                                    />
                                                                ) : (
                                                                    <Plus
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                )}

                                                            </button>
                                                        )
                                                    )}

                                            </div>

                                        </div>

                                    </div>
                                )}

                            {/* ==================================================
                                SUBJECTS
                            ================================================== */}

                            {activeTab ===
                                "subjects" && (
                                    <div
                                        className="
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        p-5
                                        dark:border-slate-800
                                        dark:bg-slate-900
                                    "
                                    >

                                        <div className="mb-5">

                                            <h2 className="text-lg font-bold dark:text-white">
                                                Course Subjects
                                            </h2>

                                            <p className="text-sm text-slate-500">
                                                Manage subjects included
                                                in this course.
                                            </p>

                                        </div>

                                        {/* ASSIGNED SUBJECTS */}

                                        <div className="space-y-3">

                                            {selectedCourse.subjects
                                                ?.length ? (
                                                selectedCourse.subjects.map(
                                                    (
                                                        subject
                                                    ) => (
                                                        <div
                                                            key={
                                                                subject.id
                                                            }
                                                            className="
                                                            flex
                                                            items-center
                                                            justify-between
                                                            rounded-xl
                                                            border
                                                            border-slate-200
                                                            p-4
                                                            dark:border-slate-700
                                                        "
                                                        >

                                                            <div className="flex items-center gap-3">

                                                                <div
                                                                    className="
                                                                    flex
                                                                    h-10
                                                                    w-10
                                                                    items-center
                                                                    justify-center
                                                                    rounded-lg
                                                                    bg-primary/10
                                                                    text-primary
                                                                "
                                                                >
                                                                    <BookOpen
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </div>

                                                                <div>

                                                                    <p className="font-semibold dark:text-white">
                                                                        {
                                                                            subject.subjectName
                                                                        }
                                                                    </p>

                                                                    <p className="font-mono text-xs text-slate-500">
                                                                        {
                                                                            subject.subjectCode
                                                                        }
                                                                    </p>

                                                                </div>

                                                            </div>

                                                            <button
                                                                disabled={
                                                                    processingId ===
                                                                    subject.id
                                                                }
                                                                onClick={() =>
                                                                    handleRemoveSubject(
                                                                        subject.id
                                                                    )
                                                                }
                                                                className="
                                                                rounded-lg
                                                                border
                                                                border-red-200
                                                                px-3
                                                                py-2
                                                                text-xs
                                                                font-semibold
                                                                text-red-600
                                                                dark:border-red-900
                                                                dark:text-red-400
                                                            "
                                                            >
                                                                {processingId ===
                                                                    subject.id ? (
                                                                    <Loader2
                                                                        size={
                                                                            15
                                                                        }
                                                                        className="animate-spin"
                                                                    />
                                                                ) : (
                                                                    "Remove"
                                                                )}
                                                            </button>

                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <p className="py-10 text-center text-sm text-slate-500">
                                                    No subjects assigned.
                                                </p>
                                            )}

                                        </div>

                                        {/* ADD SUBJECT */}

                                        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">

                                            <h3 className="mb-4 font-semibold dark:text-white">
                                                Add Subject
                                            </h3>

                                            <div className="mb-4 relative">

                                                <Search
                                                    size={17}
                                                    className="
                                                    absolute
                                                    left-3
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-slate-400
                                                "
                                                />

                                                <input
                                                    value={
                                                        subjectSearch
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setSubjectSearch(
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Search subject..."
                                                    className="
                                                    w-full
                                                    rounded-xl
                                                    border
                                                    border-slate-200
                                                    bg-slate-50
                                                    py-2.5
                                                    pl-9
                                                    pr-3
                                                    text-sm
                                                    dark:border-slate-700
                                                    dark:bg-slate-950
                                                    dark:text-white
                                                "
                                                />

                                            </div>

                                            <div className="grid gap-3 md:grid-cols-2">

                                                {filteredSubjects
                                                    .filter(
                                                        (
                                                            subject
                                                        ) =>
                                                            !selectedCourse.subjects.some(
                                                                (
                                                                    assigned
                                                                ) =>
                                                                    assigned.id ===
                                                                    subject.id
                                                            )
                                                    )
                                                    .map(
                                                        (
                                                            subject
                                                        ) => (
                                                            <button
                                                                key={
                                                                    subject.id
                                                                }
                                                                disabled={
                                                                    processingId ===
                                                                    subject.id
                                                                }
                                                                onClick={() =>
                                                                    handleAddSubject(
                                                                        subject.id
                                                                    )
                                                                }
                                                                className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                rounded-xl
                                                                border
                                                                border-slate-200
                                                                p-4
                                                                text-left
                                                                hover:border-primary
                                                                dark:border-slate-700
                                                            "
                                                            >

                                                                <div>

                                                                    <p className="font-semibold dark:text-white">
                                                                        {
                                                                            subject.subjectName
                                                                        }
                                                                    </p>

                                                                    <p className="font-mono text-xs text-slate-500">
                                                                        {
                                                                            subject.subjectCode
                                                                        }
                                                                    </p>

                                                                </div>

                                                                {processingId ===
                                                                    subject.id ? (
                                                                    <Loader2
                                                                        size={
                                                                            17
                                                                        }
                                                                        className="animate-spin"
                                                                    />
                                                                ) : (
                                                                    <Plus
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                )}

                                                            </button>
                                                        )
                                                    )}

                                            </div>

                                        </div>

                                    </div>
                                )}

                        </div>

                    ) : (

                        /* ==================================================
                            COURSE LIST
                        ================================================== */

                        <div>

                            {/* PAGE HEADER */}

                            <div
                                className="
                                    mb-6
                                    flex
                                    flex-col
                                    gap-4
                                    md:flex-row
                                    md:items-center
                                    md:justify-between
                                "
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-primary/10
                                            text-primary
                                        "
                                    >
                                        <GraduationCap
                                            size={23}
                                        />
                                    </div>

                                    <div>

                                        <h1
                                            className="
                                                text-2xl
                                                font-bold
                                                text-slate-900
                                                dark:text-white
                                            "
                                        >
                                            Courses
                                        </h1>

                                        <p className="text-sm text-slate-500">
                                            Manage courses, sections
                                            and subjects.
                                        </p>

                                    </div>

                                </div>

                                <button
                                    onClick={
                                        openAddModal
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-primary
                                        px-5
                                        py-3
                                        font-semibold
                                        text-white
                                    "
                                >
                                    <Plus size={19} />
                                    Add Course
                                </button>

                            </div>

                            {/* SEARCH */}

                            <div
                                className="
                                    mb-5
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-4
                                    dark:border-slate-800
                                    dark:bg-slate-900
                                "
                            >

                                <div className="relative">

                                    <Search
                                        size={19}
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(
                                                e.target
                                                    .value
                                            )
                                        }
                                        placeholder="Search courses by name, code, section or subject..."
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            py-3
                                            pl-11
                                            pr-4
                                            text-sm
                                            outline-none
                                            focus:border-primary
                                            dark:border-slate-700
                                            dark:bg-slate-950
                                            dark:text-white
                                        "
                                    />

                                </div>

                                <div className="mt-3 text-xs text-slate-500">
                                    {filteredCourses.length}{" "}
                                    course
                                    {filteredCourses.length !==
                                        1
                                        ? "s"
                                        : ""}{" "}
                                    found
                                </div>

                            </div>

                            {/* COURSE LIST */}

                            <div
                                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    dark:border-slate-800
                                    dark:bg-slate-900
                                "
                            >

                                {loading ? (

                                    <div className="flex min-h-[350px] flex-col items-center justify-center gap-3 text-slate-500">

                                        <Loader2
                                            size={32}
                                            className="animate-spin text-primary"
                                        />

                                        <p className="text-sm">
                                            Loading courses...
                                        </p>

                                    </div>

                                ) : filteredCourses.length ===
                                    0 ? (

                                    <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                                        <GraduationCap
                                            size={40}
                                            className="mb-3 text-slate-400"
                                        />

                                        <h3 className="font-semibold dark:text-white">
                                            No courses found
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {search
                                                ? "Try another search."
                                                : "No courses have been created yet."}
                                        </p>

                                    </div>

                                ) : (

                                    <div className="overflow-x-auto">

                                        <table className="w-full min-w-[950px]">

                                            <thead>

                                                <tr
                                                    className="
                                                        border-b
                                                        border-slate-200
                                                        bg-slate-50
                                                        dark:border-slate-800
                                                        dark:bg-slate-950
                                                    "
                                                >

                                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                        Course
                                                    </th>

                                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                        Code
                                                    </th>

                                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                        Sections
                                                    </th>

                                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                        Subjects
                                                    </th>

                                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                        Actions
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {filteredCourses.map(
                                                    (
                                                        course
                                                    ) => (
                                                        <tr
                                                            key={
                                                                course.id
                                                            }
                                                            className="
                                                                border-b
                                                                border-slate-100
                                                                last:border-0
                                                                hover:bg-slate-50
                                                                dark:border-slate-800
                                                                dark:hover:bg-slate-800/50
                                                            "
                                                        >

                                                            {/* COURSE */}

                                                            <td className="px-5 py-4">

                                                                <button
                                                                    onClick={() =>
                                                                        openCourseDetails(
                                                                            course
                                                                        )
                                                                    }
                                                                    className="flex items-center gap-3 text-left"
                                                                >

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            h-10
                                                                            w-10
                                                                            items-center
                                                                            justify-center
                                                                            rounded-lg
                                                                            bg-primary/10
                                                                            text-primary
                                                                        "
                                                                    >
                                                                        <GraduationCap
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div>

                                                                        <p className="font-semibold text-slate-900 dark:text-white">
                                                                            {
                                                                                course.courseName
                                                                            }
                                                                        </p>

                                                                        <p className="text-xs text-slate-500">
                                                                            ID:{" "}
                                                                            {
                                                                                course.id
                                                                            }
                                                                        </p>

                                                                    </div>

                                                                </button>

                                                            </td>

                                                            {/* CODE */}

                                                            <td className="px-5 py-4">

                                                                <span
                                                                    className="
                                                                        rounded-lg
                                                                        bg-slate-100
                                                                        px-3
                                                                        py-1.5
                                                                        font-mono
                                                                        text-xs
                                                                        font-semibold
                                                                        text-slate-700
                                                                        dark:bg-slate-800
                                                                        dark:text-slate-300
                                                                    "
                                                                >
                                                                    {
                                                                        course.courseCode
                                                                    }
                                                                </span>

                                                            </td>

                                                            {/* SECTIONS */}

                                                            <td className="px-5 py-4">

                                                                <div className="flex items-center gap-2">

                                                                    <Layers
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="text-slate-400"
                                                                    />

                                                                    <span className="text-sm dark:text-slate-300">
                                                                        {
                                                                            course
                                                                                .sections
                                                                                ?.length ||
                                                                            0
                                                                        }
                                                                    </span>

                                                                </div>

                                                            </td>

                                                            {/* SUBJECTS */}

                                                            <td className="px-5 py-4">

                                                                <div className="flex items-center gap-2">

                                                                    <BookOpen
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="text-slate-400"
                                                                    />

                                                                    <span className="text-sm dark:text-slate-300">
                                                                        {
                                                                            course
                                                                                .subjects
                                                                                ?.length ||
                                                                            0
                                                                        }
                                                                    </span>

                                                                </div>

                                                            </td>

                                                            {/* ACTIONS */}

                                                            <td className="px-5 py-4">

                                                                <div className="flex justify-end gap-2">

                                                                    <button
                                                                        onClick={() =>
                                                                            openEditModal(
                                                                                course
                                                                            )
                                                                        }
                                                                        className="
                                                                            inline-flex
                                                                            items-center
                                                                            gap-1.5
                                                                            rounded-lg
                                                                            border
                                                                            border-slate-200
                                                                            px-3
                                                                            py-2
                                                                            text-xs
                                                                            font-semibold
                                                                            dark:border-slate-700
                                                                            dark:text-slate-300
                                                                        "
                                                                    >
                                                                        <Pencil
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        disabled={
                                                                            deletingId ===
                                                                            course.id
                                                                        }
                                                                        onClick={() =>
                                                                            handleDeleteCourse(
                                                                                course
                                                                            )
                                                                        }
                                                                        className="
                                                                            inline-flex
                                                                            items-center
                                                                            gap-1.5
                                                                            rounded-lg
                                                                            border
                                                                            border-red-200
                                                                            px-3
                                                                            py-2
                                                                            text-xs
                                                                            font-semibold
                                                                            text-red-600
                                                                            dark:border-red-900
                                                                            dark:text-red-400
                                                                        "
                                                                    >

                                                                        {deletingId ===
                                                                            course.id ? (
                                                                            <Loader2
                                                                                size={
                                                                                    14
                                                                                }
                                                                                className="animate-spin"
                                                                            />
                                                                        ) : (
                                                                            <Trash2
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                        )}

                                                                        Delete
                                                                    </button>

                                                                </div>

                                                            </td>

                                                        </tr>
                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </div>
                    )}

                </main>
            </div>

            {/* ==================================================
                ADD / EDIT COURSE MODAL
            ================================================== */}

            {modalOpen && (
                <>
                    <div
                        className="
                            fixed
                            inset-0
                            z-[60]
                            bg-black/50
                            backdrop-blur-sm
                        "
                        onClick={closeModal}
                    />

                    <div
                        className="
                            fixed
                            inset-0
                            z-[70]
                            flex
                            items-center
                            justify-center
                            p-4
                        "
                    >

                        <div
                            className="
                                flex
                                max-h-[90vh]
                                w-full
                                max-w-3xl
                                flex-col
                                overflow-hidden
                                rounded-2xl
                                bg-white
                                shadow-2xl
                                dark:bg-slate-900
                            "
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            {/* HEADER */}

                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">

                                <div>

                                    <h2 className="text-lg font-bold dark:text-white">
                                        {editingCourse
                                            ? "Edit Course"
                                            : "Add Course"}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Configure course information,
                                        sections and subjects.
                                    </p>

                                </div>

                                <button
                                    onClick={closeModal}
                                    className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    <X size={20} />
                                </button>

                            </div>

                            {/* BODY */}

                            <div className="overflow-y-auto p-6">

                                {errorMsg && (
                                    <div className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                                        <AlertCircle
                                            size={18}
                                        />

                                        {errorMsg}
                                    </div>
                                )}

                                {/* COURSE NAME */}

                                <div className="mb-5">

                                    <label className="mb-2 block text-sm font-semibold dark:text-slate-300">
                                        Course Name
                                    </label>

                                    <input
                                        value={
                                            courseName
                                        }
                                        onChange={(e) =>
                                            setCourseName(
                                                e.target
                                                    .value
                                            )
                                        }
                                        placeholder="e.g. Bachelor of Computer Applications"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-4
                                            py-3
                                            text-sm
                                            outline-none
                                            focus:border-primary
                                            dark:border-slate-700
                                            dark:bg-slate-950
                                            dark:text-white
                                        "
                                    />

                                </div>

                                {/* COURSE CODE */}

                                <div className="mb-6">

                                    <label className="mb-2 block text-sm font-semibold dark:text-slate-300">
                                        Course Code
                                    </label>

                                    <input
                                        value={
                                            courseCode
                                        }
                                        onChange={(e) =>
                                            setCourseCode(
                                                e.target
                                                    .value
                                            )
                                        }
                                        placeholder="e.g. BCA"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-4
                                            py-3
                                            font-mono
                                            uppercase
                                            text-sm
                                            outline-none
                                            focus:border-primary
                                            dark:border-slate-700
                                            dark:bg-slate-950
                                            dark:text-white
                                        "
                                    />

                                </div>

                                {/* SECTIONS */}

                                <div className="mb-7">

                                    <div className="mb-3 flex items-center justify-between">

                                        <div>

                                            <h3 className="text-sm font-semibold dark:text-slate-300">
                                                Assign Sections
                                            </h3>

                                            <p className="text-xs text-slate-500">
                                                Select the sections
                                                that belong to this
                                                course.
                                            </p>

                                        </div>

                                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                            {
                                                selectedSectionIds.length
                                            }{" "}
                                            selected
                                        </span>

                                    </div>

                                    <div className="relative mb-3">

                                        <Search
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            value={
                                                sectionSearch
                                            }
                                            onChange={(e) =>
                                                setSectionSearch(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder="Search sections or classes..."
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                        />

                                    </div>

                                    <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700">

                                        {filteredSections.map(
                                            (
                                                section
                                            ) => {
                                                const selected =
                                                    selectedSectionIds.includes(
                                                        section.id
                                                    );

                                                return (
                                                    <button
                                                        key={
                                                            section.id
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            toggleSection(
                                                                section.id
                                                            )
                                                        }
                                                        className={`
                                                            flex
                                                            w-full
                                                            items-center
                                                            justify-between
                                                            border-b
                                                            border-slate-100
                                                            px-4
                                                            py-3
                                                            text-left
                                                            last:border-0
                                                            dark:border-slate-800
                                                            ${selected
                                                                ? "bg-primary/10"
                                                                : "hover:bg-slate-50 dark:hover:bg-slate-800"
                                                            }
                                                        `}
                                                    >

                                                        <div>

                                                            <p className="text-sm font-semibold dark:text-white">
                                                                {
                                                                    section.sectionName
                                                                }
                                                            </p>

                                                            <p className="text-xs text-slate-500">
                                                                {
                                                                    section.className
                                                                }
                                                            </p>

                                                        </div>

                                                        <div
                                                            className={`
                                                                flex
                                                                h-5
                                                                w-5
                                                                items-center
                                                                justify-center
                                                                rounded-md
                                                                border
                                                                ${selected
                                                                    ? "border-primary bg-primary text-white"
                                                                    : "border-slate-300 dark:border-slate-600"
                                                                }
                                                            `}
                                                        >
                                                            {selected &&
                                                                "✓"}
                                                        </div>

                                                    </button>
                                                );
                                            }
                                        )}

                                    </div>

                                </div>

                                {/* SUBJECTS */}

                                <div>

                                    <div className="mb-3 flex items-center justify-between">

                                        <div>

                                            <h3 className="text-sm font-semibold dark:text-slate-300">
                                                Assign Subjects
                                            </h3>

                                            <p className="text-xs text-slate-500">
                                                Select subjects included
                                                in this course.
                                            </p>

                                        </div>

                                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                            {
                                                selectedSubjectIds.length
                                            }{" "}
                                            selected
                                        </span>

                                    </div>

                                    <div className="relative mb-3">

                                        <Search
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            value={
                                                subjectSearch
                                            }
                                            onChange={(e) =>
                                                setSubjectSearch(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder="Search subjects..."
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                        />

                                    </div>

                                    <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700">

                                        {filteredSubjects.map(
                                            (
                                                subject
                                            ) => {
                                                const selected =
                                                    selectedSubjectIds.includes(
                                                        subject.id
                                                    );

                                                return (
                                                    <button
                                                        key={
                                                            subject.id
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            toggleSubject(
                                                                subject.id
                                                            )
                                                        }
                                                        className={`
                                                            flex
                                                            w-full
                                                            items-center
                                                            justify-between
                                                            border-b
                                                            border-slate-100
                                                            px-4
                                                            py-3
                                                            text-left
                                                            last:border-0
                                                            dark:border-slate-800
                                                            ${selected
                                                                ? "bg-primary/10"
                                                                : "hover:bg-slate-50 dark:hover:bg-slate-800"
                                                            }
                                                        `}
                                                    >

                                                        <div>

                                                            <p className="text-sm font-semibold dark:text-white">
                                                                {
                                                                    subject.subjectName
                                                                }
                                                            </p>

                                                            <p className="font-mono text-xs text-slate-500">
                                                                {
                                                                    subject.subjectCode
                                                                }
                                                            </p>

                                                        </div>

                                                        <div
                                                            className={`
                                                                flex
                                                                h-5
                                                                w-5
                                                                items-center
                                                                justify-center
                                                                rounded-md
                                                                border
                                                                ${selected
                                                                    ? "border-primary bg-primary text-white"
                                                                    : "border-slate-300 dark:border-slate-600"
                                                                }
                                                            `}
                                                        >
                                                            {selected &&
                                                                "✓"}
                                                        </div>

                                                    </button>
                                                );
                                            }
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* FOOTER */}

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end dark:border-slate-800 dark:bg-slate-950">

                                <button
                                    onClick={closeModal}
                                    disabled={
                                        saving
                                    }
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold dark:border-slate-700 dark:text-slate-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={
                                        handleSaveCourse
                                    }
                                    disabled={
                                        saving
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                                >

                                    {saving ? (
                                        <>
                                            <Loader2
                                                size={
                                                    17
                                                }
                                                className="animate-spin"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Plus
                                                size={
                                                    17
                                                }
                                            />

                                            {editingCourse
                                                ? "Update Course"
                                                : "Create Course"}
                                        </>
                                    )}

                                </button>

                            </div>

                        </div>

                    </div>
                </>
            )}

            {/* ==================================================
                FLOATING COPILOT
            ================================================== */}

            <button
                onClick={() =>
                    setChatOpen(true)
                }
                className="
                    fixed
                    bottom-6
                    right-6
                    z-50
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-primary
                    to-secondary
                    text-white
                    shadow-xl
                    transition
                    hover:scale-105
                "
            >
                <MessageCircle size={28} />
            </button>

            {chatOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/40"
                        onClick={() =>
                            setChatOpen(false)
                        }
                    />

                    <div
                        className="
                            fixed
                            bottom-24
                            right-6
                            z-50
                            h-[75vh]
                            max-h-[700px]
                            w-[95vw]
                            overflow-hidden
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            shadow-2xl
                            dark:border-slate-700
                            dark:bg-slate-900
                            sm:w-[420px]
                        "
                    >

                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">

                            <div>

                                <h2 className="text-lg font-bold">
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
                                className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
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