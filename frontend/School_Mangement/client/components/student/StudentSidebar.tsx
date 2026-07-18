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

const menu = [
    {
        title: "Academics",
        items: [
            { icon: Calendar, label: "Attendance" },
            { icon: Calendar, label: "Timetable" },
            { icon: BookOpen, label: "Subjects" },
            { icon: ClipboardList, label: "Assignments" },
            { icon: FileText, label: "Homework" },
            { icon: GraduationCap, label: "Study Material" },
        ],
    },
    {
        title: "Examination",
        items: [
            { icon: Calendar, label: "Exam Schedule" },
            { icon: FileText, label: "Admit Card" },
            { icon: BarChart3, label: "Results" },
            { icon: GraduationCap, label: "Report Card" },
            { icon: BarChart3, label: "Progress Analytics" },
        ],
    },
    {
        title: "Finance",
        items: [
            { icon: CreditCard, label: "Fee Status" },
            { icon: CreditCard, label: "Fee Payment" },
            { icon: FileText, label: "Fee Receipts" },
            { icon: FileText, label: "Fee History" },
        ],
    },
    {
        title: "Library",
        items: [
            { icon: Library, label: "Issued Books" },
            { icon: Calendar, label: "Due Books" },
            { icon: FileText, label: "Fine Details" },
            { icon: Search, label: "Book Search" },
        ],
    },
];

export default function StudentSidebar() {
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