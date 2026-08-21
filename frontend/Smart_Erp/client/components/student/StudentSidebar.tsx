import {
    Calendar,
    BookOpen,
    ClipboardList,
    FileText,
    GraduationCap,
    CreditCard,
    Library,
    Search,
    BarChart3,
} from "lucide-react";
import path from "path";
import { useNavigate } from "react-router-dom";

const menu = [
    {
        title: "Academics",
        items: [
            { icon: Calendar, label: "Attendance", path: "student/attendance" },
            { icon: Calendar, label: "Timetable", path: "student/timetable" },
            { icon: BookOpen, label: "Subjects", path: "student/subjects" },
            { icon: ClipboardList, label: "Assignments", path: "student/assignments" },
            { icon: FileText, label: "Homework", path: "student/homework" },
            { icon: GraduationCap, label: "Study Material", path: "student/study-material" },
        ],
    },
    {
        title: "Examination",
        items: [
            { icon: Calendar, label: "Exam Schedule", path: "student/exam-schedule" },
            { icon: FileText, label: "Admit Card", path: "student/admit-card" },
            { icon: BarChart3, label: "Results", path: "student/results" },
            { icon: GraduationCap, label: "Report Card", path: "student/report-card" },
            { icon: BarChart3, label: "Progress Analytics", path: "student/progress-analytics" },
        ],
    },
    {
        title: "Finance",
        items: [
            { icon: CreditCard, label: "Fee Status", path: "student/fee-status" },
            { icon: CreditCard, label: "Fee Payment", path: "student/fee-payment" },
            { icon: FileText, label: "Fee Receipts", path: "student/fee-receipts" },
            { icon: FileText, label: "Fee History", path: "student/fee-history" },
        ],
    },
    {
        title: "Library",
        items: [
            { icon: Library, label: "Issued Books", path: "student/issued-books" },
            { icon: Calendar, label: "Due Books", path: "student/due-books" },
            { icon: FileText, label: "Fine Details", path: "student/fine-details" },
            { icon: Search, label: "Book Search", path: "student/book-search" },
        ],
    },
];

export default function StudentSidebar() {
    const navigate = useNavigate();
    return (
        <aside className="hidden lg:block w-72 bg-white dark:bg-slate-900 border-r min-h-screen overflow-y-auto">
            <div className="p-5">
                {menu.map((section) => (
                    <div key={section.title} className="mb-6">
                        <h3 className="text-xs font-bold uppercase text-slate-400 mb-3">
                            {section.title}
                        </h3>

                        {section.items.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </aside>
    );
}