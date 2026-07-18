import {
    LayoutDashboard,
    Calendar,
    BookOpen,
    ClipboardList,
    FileText,
    GraduationCap,
    Users,
    BarChart3,
    MessageSquare,
    Bell,
    Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menu = [
    {
        title: "Classes & Teaching",
        items: [
            { icon: Calendar, label: "Class Timetable", path: "/teacher/class-timetable" },
            { icon: Users, label: "My Classes", path: "/teacher/my-classes" },
            { icon: BookOpen, label: "Subjects", path: "/teacher/subjects" },
            { icon: GraduationCap, label: "Lesson Plans", path: "/teacher/lesson-plans" },
            { icon: FileText, label: "Study Material", path: "/teacher/study-material" },
        ],
    },

    {
        title: "Attendance",
        items: [
            { icon: ClipboardList, label: "Mark Attendance", path: "/teacher/mark-attendance" },
            { icon: ClipboardList, label: "Attendance Records", path: "/teacher/attendance-records" },
        ],
    },

    {
        title: "My Attendance",
        items: [
            { icon: Calendar, label: "Attendance Authenticator", path: "/teacher/attendance-authenticator" },
            { icon: ClipboardList, label: "Attendance History", path: "/teacher/my-attendance/history" },
            { icon: BarChart3, label: "Monthly Summary", path: "/teacher/my-attendance/monthly-summary" },
            { icon: FileText, label: "Attendance Report", path: "/teacher/my-attendance/report" },
        ],
    },

    {
        title: "Assignments",
        items: [
            { icon: FileText, label: "Create Assignment", path: "/teacher/create-assignment" },
            { icon: ClipboardList, label: "Submitted Assignments", path: "/teacher/submitted-assignments" },
            { icon: Award, label: "Grade Assignments", path: "/teacher/grade-assignments" },
        ],
    },

    {
        title: "Examinations",
        items: [
            { icon: Calendar, label: "Exam Schedule", path: "/teacher/exam-schedule" },
            { icon: FileText, label: "Question Papers", path: "/teacher/question-papers" },
            { icon: Award, label: "Marks Entry", path: "/teacher/marks-entry" },
            { icon: BarChart3, label: "Student Performance", path: "/teacher/student-performance" },
        ],
    },

    {
        title: "Communication",
        items: [
            { icon: MessageSquare, label: "Messages", path: "/teacher/messages" },
            { icon: Bell, label: "Announcements", path: "/teacher/announcements" },
        ],
    },

    {
        title: "Reports",
        items: [
            { icon: BarChart3, label: "Class Analytics", path: "/teacher/class-analytics" },
            { icon: Award, label: "Result Reports", path: "/teacher/result-reports" },
        ],
    },
];
export default function Sidebar() {
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