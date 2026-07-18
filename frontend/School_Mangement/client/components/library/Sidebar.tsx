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

const menu = [
    {
        title: "Library Operations",
        items: [
            { icon: Library, label: "Dashboard" },
            { icon: Search, label: "Book Search" },
            { icon: BookOpen, label: "Book Catalog" },
            { icon: PlusCircle, label: "Add New Book" },
        ],
    },

    {
        title: "Book Circulation",
        items: [
            { icon: BookOpen, label: "Issue Book" },
            { icon: RefreshCw, label: "Return Book" },
            { icon: Clock, label: "Renew Book" },
            { icon: AlertCircle, label: "Overdue Books" },
        ],
    },

    {
        title: "Members",
        items: [
            { icon: Users, label: "Students" },
            { icon: Users, label: "Teachers" },
            { icon: FileText, label: "Issue History" },
        ],
    },

    {
        title: "Fine Management",
        items: [
            { icon: AlertCircle, label: "Pending Fines" },
            { icon: FileText, label: "Fine Collection" },
            { icon: FileText, label: "Fine Reports" },
        ],
    },

    {
        title: "Reports & Analytics",
        items: [
            { icon: BarChart3, label: "Book Usage" },
            { icon: BarChart3, label: "Most Borrowed Books" },
            { icon: BarChart3, label: "Library Analytics" },
        ],
    },

    {
        title: "Communication",
        items: [
            { icon: Bell, label: "Notifications" },
            { icon: FileText, label: "Announcements" },
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