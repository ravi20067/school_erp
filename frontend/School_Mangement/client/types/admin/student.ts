export type Student = {
    id: number;
    admissionNo: string;
    rollNo: number;
    name: string;
    gender: "Male" | "Female";
    className: string;
    section: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    status: "Active" | "Inactive";
    address?: string;
};

export interface StudentFormData {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: string;
    schoolClass: string;
    section: string;
}

export interface StudentStats {
    totalStudents: number;
    boys: number;
    girls: number;
    newStudent: number;
}