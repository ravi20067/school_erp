import {
    LayoutDashboard,
    GraduationCap,
    Users,
    ScanLine,
    School,
    Layers,
    BookOpen,
    Calendar,
    FolderOpen,
    Megaphone,
    Image,
    Globe,
    Mail,
    Shield,
    Settings,
    Database,
    History,
    FileBarChart,
    BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menu = [
    {
        title: "Dashboard",
        items: [
            {
                icon: LayoutDashboard,
                label: "Dashboard Overview",
                path: "/admin"
            },
        ],
    },

    {
        title: "User Management",
        items: [
            { icon: GraduationCap, label: "Students", path: "/admin/students" },
            { icon: Users, label: "Teachers", path: "/admin/teachers" },
            { icon: ScanLine, label: "Devices", path: "/admin/devices" },
        ],
    },

    {
        title: "Academic Management",
        items: [
            { icon: School, label: "Classes", path: "/admin/classes" },
            { icon: BookOpen, label: "Subjects", path: "/admin/subjects" },
            { icon: Layers, label: "Cources", path: "/admin/cources" },
            { icon: Calendar, label: "Timetable", path: "/admin/timetable" },
            { icon: FolderOpen, label: "Study Material", path: "/admin/study-material" },
        ],
    },

    {
        title: "School Management",
        items: [
            { icon: Megaphone, label: "Announcements", path: "/admin/announcements" },
            { icon: Calendar, label: "Events", path: "/admin/events" },
            { icon: Image, label: "Gallery", path: "/admin/gallery" },
            { icon: Globe, label: "Website Content", path: "/admin/website-content" },
            { icon: Mail, label: "Contact Queries", path: "/admin/contact-queries" },
        ],
    },

    {
        title: "System Management",
        items: [
            { icon: Shield, label: "Roles & Permissions", path: "/admin/roles-permissions" },
            { icon: Settings, label: "Settings", path: "/admin/settings" },
            { icon: Database, label: "Backup & Restore", path: "/admin/backup-restore" },
            { icon: History, label: "Audit Logs", path: "/admin/audit-logs" },
        ],
    },

    {
        title: "Reports",
        items: [
            { icon: FileBarChart, label: "Student Reports", path: "/admin/reports/student" },
            { icon: FileBarChart, label: "Staff Reports", path: "/admin/reports/staff" },
            { icon: FileBarChart, label: "Finance Reports", path: "/admin/reports/finance" },
            { icon: FileBarChart, label: "Library Reports", path: "/admin/reports/library" },
            { icon: BarChart3, label: "Examination Reports", path: "/admin/reports/examination" },
        ],
    },

];

export default function Sidebar() {
    const navigate = useNavigate();
    return (<aside className="hidden lg:block w-72 bg-white dark:bg-slate-900 border-r min-h-screen overflow-y-auto"> <div className="p-5">
        {menu.map((section) => (<div key={section.title} className="mb-6"> <h3 className="text-xs font-bold uppercase text-slate-400 mb-3">
            {section.title} </h3>

            {
                section.items.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </button>
                ))
            }
        </div >
        ))}
    </div >
    </aside >
    );


}
