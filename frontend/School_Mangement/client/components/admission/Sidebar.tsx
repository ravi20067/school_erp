import {
    LayoutDashboard,
    UserPlus,
    Users,
    FileText,
    Search,
    CheckCircle,
    XCircle,
    Calendar,
    CreditCard,
    Bell,
    MessageSquare,
    BarChart3,
} from "lucide-react";

const menu = [
    {
        title: "Admissions",
        items: [
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: UserPlus, label: "New Application" },
            { icon: Users, label: "Applicants" },
            { icon: Search, label: "Application Search" },
        ],
    },

    {
        title: "Application Processing",
        items: [
            { icon: FileText, label: "Application Forms" },
            { icon: CheckCircle, label: "Document Verification" },
            { icon: Calendar, label: "Interview Schedule" },
            { icon: FileText, label: "Admission Decisions" },
        ],
    },

    {
        title: "Enrollment",
        items: [
            { icon: CheckCircle, label: "Approved Students" },
            { icon: XCircle, label: "Rejected Applications" },
            { icon: Users, label: "Student Enrollment" },
        ],
    },

    {
        title: "Fee Management",
        items: [
            { icon: CreditCard, label: "Admission Fees" },
            { icon: FileText, label: "Fee Receipts" },
            { icon: FileText, label: "Payment History" },
        ],
    },

    {
        title: "Communication",
        items: [
            { icon: MessageSquare, label: "Applicant Messages" },
            { icon: Bell, label: "Notifications" },
            { icon: FileText, label: "Announcements" },
        ],
    },

    {
        title: "Reports & Analytics",
        items: [
            { icon: BarChart3, label: "Admission Statistics" },
            { icon: BarChart3, label: "Application Trends" },
            { icon: BarChart3, label: "Enrollment Reports" },
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