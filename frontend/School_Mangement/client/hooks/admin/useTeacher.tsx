import { useEffect, useState } from "react";

import {
    getTeacherStats,
    getTeachers,
    addTeacher,
} from "@/services/admin/teacherService";

import type {
    Teacher,
    TeacherFormData,
    TeacherStats,
} from "@/types/admin/teacher";

import { exportTeachersToCSV } from "@/util/teacherCsvExport";

export default function useTeachers() {

    const [search, setSearch] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("");

    const [teacherList, setTeacherList] = useState<Teacher[]>([]);

    const filteredTeachers = teacherList;

    const [loadingTeachers, setLoadingTeachers] = useState(false);

    const [addTeacherOpen, setAddTeacherOpen] = useState(false);

    const [chatOpen, setChatOpen] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [receiptTeacher, setReceiptTeacher] = useState<any>(null);

    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState<TeacherFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        qualification: "",
        specialization: "",
        dateOfBirth: "",
        status: "ACTIVE",
        role: "TEACHER",
    });

    const [stats, setStats] = useState<TeacherStats>({
        totalTeacher: 0,
        male: 0,
        female: 0,
        toadayPresent: 0,
    });

    useEffect(() => {

        getTeacherStats()
            .then(setStats)
            .catch(console.error);

    }, []);
    const handleSearch = async () => {

        setLoadingTeachers(true);

        try {

            const data = await getTeachers(
                search,
                selectedStatus
            );

            if (Array.isArray(data)) {

                const mapped: Teacher[] = data.map((t: any) => ({

                    id: t.id,

                    employeeId: t.employeeId,

                    firstName: t.firstName,

                    lastName: t.lastName,

                    name: `${t.firstName} ${t.lastName}`,

                    email: t.email,

                    phone: t.phone,

                    qualification: t.qualification,

                    specialization: t.specialization,

                    dateOfBirth: t.dateOfBirth,

                    status: t.status,

                    role: t.role,

                    joiningDate: t.joiningDate,

                }));

                setTeacherList(mapped);

            }

        } catch (err) {

            console.error("Failed to fetch teachers.", err);

        } finally {

            setLoadingTeachers(false);

        }

    };
    const handleFormChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };
    const handleCloseAddTeacher = () => {

        setAddTeacherOpen(false);

        setReceiptTeacher(null);

        setErrorMsg("");

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            qualification: "",
            specialization: "",
            dateOfBirth: "",
            status: "ACTIVE",
            role: "TEACHER",
        });

    };
    const handleAddTeacherSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setSubmitting(true);

        setErrorMsg("");

        try {

            const data = await addTeacher(formData);

            if (data) {

                const newTeacher: Teacher = {

                    id: data.id,

                    employeeId: data.employeeId,

                    firstName: data.firstName,

                    lastName: data.lastName,

                    name: `${data.firstName} ${data.lastName}`,

                    email: data.email,

                    phone: data.phone,

                    qualification: data.qualification,

                    specialization: data.specialization,

                    dateOfBirth: data.dateOfBirth,

                    status: data.status,

                    joiningDate: data.joiningDate,

                    role: data.role,

                };

                setTeacherList((prev) => [
                    newTeacher,
                    ...prev,
                ]);

                setReceiptTeacher(newTeacher);

            }

        } catch (err: any) {

            console.error(err);

            setErrorMsg(
                err.response?.data?.message ||
                "Failed to add teacher."
            );

        } finally {

            setSubmitting(false);

        }

    };
    const handleDownloadReceipt = (
        teacher?: Teacher
    ) => {

        const data = teacher || receiptTeacher;

        if (!data) return;

        const content = `
==================================================
             ACADEMY ELITE SCHOOL
            TEACHER REGISTRATION
==================================================
Date Generated : ${new Date().toLocaleDateString()}
--------------------------------------------------
Teacher Name   : ${data.firstName} ${data.lastName}
--------------------------------------------------
Email          : ${data.email}
Phone          : ${data.phone}
EmployeeID     : ${data.employeeId}
Qualification  : ${data.qualification}
Specialization : ${data.specialization}
Date Of Birth  : ${data.dateOfBirth}
Role           : ${data.role}
Status         : ${data.status}
==================================================
Teacher registered successfully.
==================================================
`;

        const blob = new Blob(
            [content],
            {
                type: "text/plain;charset=utf-8",
            }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = `teacher_${data.firstName}_${data.lastName}.txt`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    };
    const handleExport = () => {

        exportTeachersToCSV(filteredTeachers);

    };
    return {

        search,
        setSearch,

        selectedStatus,
        setSelectedStatus,

        teacherList,

        filteredTeachers,

        loadingTeachers,

        addTeacherOpen,
        setAddTeacherOpen,

        chatOpen,
        setChatOpen,

        submitting,

        receiptTeacher,

        errorMsg,

        formData,

        stats,

        handleSearch,

        handleFormChange,

        handleCloseAddTeacher,

        handleAddTeacherSubmit,

        handleDownloadReceipt,

        handleExport,

    };

}