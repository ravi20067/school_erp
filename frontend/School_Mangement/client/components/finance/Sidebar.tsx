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

const menu = [
    {
        title: "Finance Operations",
        items: [
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: CreditCard, label: "Fee Collection" },
            { icon: Receipt, label: "Generate Receipt" },
            { icon: Receipt, label: "Receipt History" },
        ],
    },

    {
        title: "Student Fees",
        items: [
            { icon: Users, label: "Student Fee Records" },
            { icon: AlertCircle, label: "Pending Fees" },
            { icon: CircleDollarSign, label: "Fee Defaulters" },
            { icon: CreditCard, label: "Online Payments" },
            { icon: CreditCard, label: "Transport Fees" },
            { icon: CreditCard, label: "Hostel Fees" },
        ],
    },

    {
        title: "Accounts",
        items: [
            { icon: Wallet, label: "Daily Collection" },
            { icon: Banknote, label: "Cash Transactions" },
            { icon: CreditCard, label: "Bank Transactions" },
            { icon: Receipt, label: "Refund Management" },
            { icon: FileText, label: "Expense Tracking" },
        ],
    },

    {
        title: "Payroll",
        items: [
            { icon: Wallet, label: "Employee Salaries" },
            { icon: Receipt, label: "Salary Slips" },
            { icon: Banknote, label: "Salary Payments" },
        ],
    },

    {
        title: "Scholarships & Discounts",
        items: [
            { icon: FileText, label: "Scholarships" },
            { icon: FileText, label: "Fee Concessions" },
            { icon: FileText, label: "Discount Requests" },
        ],
    },

    {
        title: "Reports & Analytics",
        items: [
            { icon: TrendingUp, label: "Revenue Reports" },
            { icon: BarChart3, label: "Collection Analytics" },
            { icon: BarChart3, label: "Outstanding Dues" },
            { icon: BarChart3, label: "Financial Summary" },
            { icon: BarChart3, label: "Audit Reports" },
        ],
    },

    {
        title: "Communication",
        items: [
            { icon: Bell, label: "Notifications" },
            { icon: FileText, label: "Fee Reminders" },
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
