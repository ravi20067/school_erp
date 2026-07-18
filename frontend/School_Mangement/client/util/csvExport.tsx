import { Student } from "@/types/admin/student";

export const exportStudentsToCSV = (students: Student[]) => {

    if (students.length === 0) {
        alert("No students available to export.");
        return;
    }

    const headers = [
        "Admission No",
        "Roll No",
        "Name",
        "Gender",
        "Date Of Birth",
        "Email",
        "Phone",
        "Address",
        "Class",
        "Section",
        "Status",
    ];

    const rows = students.map((student) => [

        student.admissionNo,

        student.rollNo,

        student.name,

        student.gender,

        student.dateOfBirth,

        student.email,

        student.phone,

        student.address,

        student.className,

        student.section,

        student.status,

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

    link.download = `students_${new Date().toISOString().split("T")[0]}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};