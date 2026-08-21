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
import { useNavigate } from "react-router-dom";

const menu = [
    {
        title: "Admissions",
        items: [
            { icon: LayoutDashboard, label: "Dashboard", path: "/admission/dashboard" },
            { icon: UserPlus, label: "New Application", path: "/admission/new" },
            { icon: Users, label: "Applicants", path: "/admission/applicants" },
            { icon: Search, label: "Application Search", path: "/admission/search" },
        ],
    },

    {
        title: "Application Processing",
        items: [
            { icon: FileText, label: "Application Forms", path: "/admission/forms" },
            { icon: CheckCircle, label: "Document Verification", path: "/admission/verification" },
            { icon: Calendar, label: "Interview Schedule", path: "/admission/interview" },
            { icon: FileText, label: "Admission Decisions", path: "/admission/decision" },
        ],
    },

    {
        title: "Enrollment",
        items: [
            { icon: CheckCircle, label: "Approved Students", path: "/admission/approved" },
            { icon: XCircle, label: "Rejected Applications", path: "/admission/rejected" },
            { icon: Users, label: "Student Enrollment", path: "/admission/enrollment" },
        ],
    },

    {
        title: "Fee Management",
        items: [
            { icon: CreditCard, label: "Admission Fees", path: "/admission/fees" },
            { icon: FileText, label: "Fee Receipts", path: "/admission/receipts" },
            { icon: FileText, label: "Payment History", path: "/admission/payment-history" },
        ],
    },

    {
        title: "Communication",
        items: [
            { icon: MessageSquare, label: "Applicant Messages", path: "/admission/messages" },
            { icon: Bell, label: "Notifications", path: "/admission/notifications" },
            { icon: FileText, label: "Announcements", path: "/admission/announcements" },
        ],
    },

    {
        title: "Reports & Analytics",
        items: [
            { icon: BarChart3, label: "Admission Statistics", path: "/admission/statistics" },
            { icon: BarChart3, label: "Application Trends", path: "/admission/trends" },
            { icon: BarChart3, label: "Enrollment Reports", path: "/admission/enrollment-reports" },
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