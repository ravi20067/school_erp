import {
    Library,
    BookOpen,
    Search,
    PlusCircle,
    RefreshCw,
    Clock,
    AlertCircle,
    Users,
    BarChart3,
    Bell,
    FileText,
} from "lucide-react";
import path from "path";
import { useNavigate } from "react-router-dom";

const menu = [
    {
        title: "Library Operations",
        items: [
            { icon: Library, label: "Dashboard", path: "/library/dashboard" },
            { icon: Search, label: "Book Search", path: "/library/book-search" },
            { icon: BookOpen, label: "Book Catalog", path: "/library/book-catalog" },
            { icon: PlusCircle, label: "Add New Book", path: "/library/add-new-book" },
        ],
    },

    {
        title: "Book Circulation",
        items: [
            { icon: BookOpen, label: "Issue Book", path: "/library/issue-book" },
            { icon: RefreshCw, label: "Return Book", path: "/library/return-book" },
            { icon: Clock, label: "Renew Book", path: "/library/renew-book" },
            { icon: AlertCircle, label: "Overdue Books", path: "/library/overdue-books" },
        ],
    },

    {
        title: "Members",
        items: [
            { icon: Users, label: "Students", path: "/library/students" },
            { icon: Users, label: "Teachers", path: "/library/teachers" },
            { icon: FileText, label: "Issue History", path: "/library/issue-history" },
        ],
    },

    {
        title: "Fine Management",
        items: [
            { icon: AlertCircle, label: "Pending Fines", path: "/library/pending-fines" },
            { icon: FileText, label: "Fine Collection", path: "/library/fine-collection" },
            { icon: FileText, label: "Fine Reports", path: "/library/fine-reports" },
        ],
    },

    {
        title: "Reports & Analytics",
        items: [
            { icon: BarChart3, label: "Book Usage", path: "/library/book-usage" },
            { icon: BarChart3, label: "Most Borrowed Books", path: "/library/most-borrowed-books" },
            { icon: BarChart3, label: "Library Analytics", path: "/library/library-analytics" },
        ],
    },

    {
        title: "Communication",
        items: [
            { icon: Bell, label: "Notifications", path: "/library/notifications" },
            { icon: FileText, label: "Announcements", path: "/library/announcements" },
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