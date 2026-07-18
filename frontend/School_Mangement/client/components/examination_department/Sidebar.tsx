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

const menu = [
    {
        title: "Examination Management",
        items: [
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: Calendar, label: "Exam Schedule" },
            { icon: FileText, label: "Question Papers" },
            { icon: ClipboardList, label: "Exam Sessions" },
        ],
    },

    {
        title: "Marks & Results",
        items: [
            { icon: FileText, label: "Marks Entry" },
            { icon: GraduationCap, label: "Result Generation" },
            { icon: Award, label: "Rank List" },
            { icon: Users, label: "Student Results" },
        ],
    },

    {
        title: "Examination Records",
        items: [
            { icon: ClipboardList, label: "Attendance Records" },
            { icon: FileText, label: "Admit Cards" },
            { icon: FileText, label: "Revaluation Requests" },
        ],
    },

    {
        title: "Reports & Analytics",
        items: [
            { icon: BarChart3, label: "Performance Analytics" },
            { icon: BarChart3, label: "Pass/Fail Analysis" },
            { icon: BarChart3, label: "Subject Reports" },
        ],
    },

    {
        title: "Communication",
        items: [
            { icon: Bell, label: "Notifications" },
            { icon: FileText, label: "Announcements" },
        ],
    },

    {
        title: "Settings",
        items: [
            { icon: Settings, label: "Exam Settings" },
        ],
    },
];

export default function Sidebar() {
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