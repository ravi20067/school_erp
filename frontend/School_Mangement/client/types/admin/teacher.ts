export type Teacher = {
    id: number;

    employeeId: string;

    firstName: string;

    lastName: string;

    name: string;

    email: string;

    phone: string;

    qualification: string;

    specialization: string;

    joiningDate: string;

    dateOfBirth: string;

    status: "ACTIVE" | "INACTIVE";

    role: string;
};
export interface TeacherFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    qualification: string;
    specialization: string;
    dateOfBirth: string;
    status: string;
    role: string;
}

export interface TeacherStats {
    totalTeacher: number;
    male: number;
    female: number;
    toadayPresent: number;
}

