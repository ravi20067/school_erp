import {
    LayoutDashboard,
    Calendar,
    FileText,
    ClipboardList,
    GraduationCap,
    BarChart3,
    Award,
    Users,
    Bell,
    Settings,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const menu = [
    {
        title: "Examination Management",
        items: [
            { icon: LayoutDashboard, label: "Dashboard", path: "/examination/dashboard" },
            { icon: Calendar, label: "Exam Schedule", path: "/examination/schedule" },
            { icon: FileText, label: "Question Papers", path: "/examination/question-papers" },
            { icon: ClipboardList, label: "Exam Sessions", path: "/examination/sessions" },
        ],
    },

    {
        title: "Marks & Results",
        items: [
            { icon: FileText, label: "Marks Entry", path: "/examination/marks-entry" },
            { icon: GraduationCap, label: "Result Generation", path: "/examination/result-generation" },
            { icon: Award, label: "Rank List", path: "/examination/rank-list" },
            { icon: Users, label: "Student Results", path: "/examination/student-results" },
        ],
    },

    {
        title: "Examination Records",
        items: [
            { icon: ClipboardList, label: "Attendance Records", path: "/examination/attendance-records" },
            { icon: FileText, label: "Admit Cards", path: "/examination/admit-cards" },
            { icon: FileText, label: "Revaluation Requests", path: "/examination/revaluation-requests" },
        ],
    },

    {
        title: "Reports & Analytics",
        items: [
            { icon: BarChart3, label: "Performance Analytics", path: "/examination/performance-analytics" },
            { icon: BarChart3, label: "Pass/Fail Analysis", path: "/examination/pass-fail-analysis" },
            { icon: BarChart3, label: "Subject Reports", path: "/examination/subject-reports" },
        ],
    },

    {
        title: "Communication",
        items: [
            { icon: Bell, label: "Notifications", path: "/examination/notifications" },
            { icon: FileText, label: "Announcements", path: "/examination/announcements" },
        ],
    },

    {
        title: "Settings",
        items: [
            { icon: Settings, label: "Exam Settings", path: "/examination/settings" },
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