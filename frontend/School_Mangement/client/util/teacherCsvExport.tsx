import { Teacher } from "@/types/admin/teacher";

export const exportTeachersToCSV = (teachers: Teacher[]) => {

    if (teachers.length === 0) {
        alert("No teachers available to export.");
        return;
    }

    const headers = [
        "Teacher Name",
        "Email",
        "Phone",
        "Qualification",
        "Specialization",
        "Date Of Birth",
        "Role",
        "Status",
    ];

    const rows = teachers.map((teacher) => [

        teacher.name ??
        `${teacher.firstName} ${teacher.lastName}`,

        teacher.email,

        teacher.phone,

        teacher.qualification,

        teacher.specialization,

        teacher.dateOfBirth,

        teacher.role,

        teacher.status,

    ]);

    const csvContent = [
        headers,
        ...rows,
    ]
        .map((row) =>
            row
                .map((value) => `"${value ?? ""}"`)
                .join(",")
        )
        .join("\n");

    const blob = new Blob(
        [csvContent],
        {
            type: "text/csv;charset=utf-8;",
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `teachers_${new Date().toISOString().split("T")[0]}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};