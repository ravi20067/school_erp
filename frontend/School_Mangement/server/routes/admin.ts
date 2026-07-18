import { Request, Response, RequestHandler } from "express";

// Mock data for students
const mockStudents = [
  {
    id: 1,
    admissionNo: "20260001",
    rollNumber: 1,
    firstName: "Ravi",
    lastName: "Kumar",
    gender: "MALE",
    schoolClass: "CLASS_10",
    section: "A",
    phone: "9876543210",
    status: "Active",
    email: "ravi@example.com",
    dateOfBirth: "2010-01-01",
    address: "123 Main St",
  },
  // Add more mock students as needed
];

// Mock sections per class
const classSections: Record<string, string[]> = {
  CLASS_10: ["A", "B", "C"],
  CLASS_11: ["A", "B"],
  CLASS_12: ["A"],
};

export const loadSections: RequestHandler = (req: Request, res: Response) => {
  const cls = req.query.class as string;
  const sections = classSections[cls] ?? [];
  res.json(sections);
};

export const getStats: RequestHandler = (req: Request, res: Response) => {
  const totalStudents = mockStudents.length;
  const boys = mockStudents.filter(s => s.gender === 'MALE').length;
  const girls = mockStudents.filter(s => s.gender === 'FEMALE').length;
  const newStudent = mockStudents.filter(s => s.admissionNo === 'PENDING' || s.admissionNo === '').length;
  res.json({ totalStudents, boys, girls, newStudent });
};

export const loadStudents: RequestHandler = (req: Request, res: Response) => {
  const search = (req.query.search as string) || "";
  const className = (req.query.class as string) || "";
  const section = (req.query.section as string) || "";

  const filtered = mockStudents.filter((s) => {
    const matchesSearch =
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.includes(search);
    const matchesClass = className ? s.schoolClass.replace("CLASS_", "") === className : true;
    const matchesSection = section ? s.section === section : true;
    return matchesSearch && matchesClass && matchesSection;
  });

  res.json(filtered);
};
