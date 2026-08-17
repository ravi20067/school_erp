import {
    LayoutDashboard,
    CreditCard,
    Receipt,
    Users,
    AlertCircle,
    TrendingUp,
    Wallet,
    FileText,
    Bell,
    BarChart3,
    CircleDollarSign,
    Banknote,
} from "lucide-react";
import path from "path";
import { useNavigate } from "react-router-dom";

const menu = [
    {
        title: "Finance Operations",
        items: [
            { icon: LayoutDashboard, label: "Dashboard", path: "/finance/dashboard" },
            { icon: CreditCard, label: "Fee Collection", path: "/finance/fee-collection" },
            { icon: Receipt, label: "Generate Receipt", path: "/finance/generate-receipt" },
            { icon: Receipt, label: "Receipt History", path: "/finance/receipt-history" },
        ],
    },

    {
        title: "Student Fees",
        items: [
            { icon: Users, label: "Student Fee Records", path: "/finance/student-fee-records" },
            { icon: AlertCircle, label: "Pending Fees", path: "/finance/pending-fees" },
            { icon: CircleDollarSign, label: "Fee Defaulters", path: "/finance/fee-defaulters" },
            { icon: CreditCard, label: "Online Payments", path: "/finance/online-payments" },
            { icon: CreditCard, label: "Transport Fees", path: "/finance/transport-fees" },
            { icon: CreditCard, label: "Hostel Fees", path: "/finance/hostel-fees" },
        ],
    },

    {
        title: "Accounts",
        items: [
            { icon: Wallet, label: "Daily Collection", path: "/finance/daily-collection" },
            { icon: Banknote, label: "Cash Transactions", path: "/finance/cash-transactions" },
            { icon: CreditCard, label: "Bank Transactions", path: "/finance/bank-transactions" },
            { icon: Receipt, label: "Refund Management", path: "/finance/refund-management" },
            { icon: FileText, label: "Expense Tracking", path: "/finance/expense-tracking" },
        ],
    },

    {
        title: "Payroll",
        items: [
            { icon: Wallet, label: "Employee Salaries", path: "/finance/employee-salaries" },
            { icon: Receipt, label: "Salary Slips", path: "/finance/salary-slips" },
            { icon: Banknote, label: "Salary Payments", path: "/finance/salary-payments" },
        ],
    },

    {
        title: "Scholarships & Discounts",
        items: [
            { icon: FileText, label: "Scholarships", path: "/finance/scholarships" },
            { icon: FileText, label: "Fee Concessions", path: "/finance/fee-concessions" },
            { icon: FileText, label: "Discount Requests", path: "/finance/discount-requests" },
        ],
    },

    {
        title: "Reports & Analytics",
        items: [
            { icon: TrendingUp, label: "Revenue Reports", path: "/finance/revenue-reports" },
            { icon: BarChart3, label: "Collection Analytics", path: "/finance/collection-analytics" },
            { icon: BarChart3, label: "Outstanding Dues", path: "/finance/outstanding-dues" },
            { icon: BarChart3, label: "Financial Summary", path: "/finance/financial-summary" },
            { icon: BarChart3, label: "Audit Reports", path: "/finance/audit-reports" },
        ],
    },

    {
        title: "Communication",
        items: [
            { icon: Bell, label: "Notifications", path: "/finance/notifications" },
            { icon: FileText, label: "Fee Reminders", path: "/finance/fee-reminders" },
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
