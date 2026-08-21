import {
    Bell,
    CreditCard,
    Receipt,
    AlertCircle,
    TrendingUp,
} from "lucide-react";

export default function RecentNotifications() {
    const notices = [
        {
            icon: CreditCard,
            title: "Fee Collection Update",
            desc: "₹1,25,000 collected from student fee payments today.",
        },
        {
            icon: AlertCircle,
            title: "Pending Fee Alert",
            desc: "42 students have overdue fee payments.",
        },
        {
            icon: Receipt,
            title: "Receipts Generated",
            desc: "156 fee receipts were generated this week.",
        },
        {
            icon: TrendingUp,
            title: "Monthly Revenue Report",
            desc: "Finance report for June is ready for review.",
        },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">

            <div className="flex items-center gap-2 mb-5">
                <Bell size={20} />
                <h2 className="font-bold text-xl">
                    Finance Notifications
                </h2>
            </div>

            <div className="space-y-4">
                {notices.map((notice) => (
                    <div
                        key={notice.title}
                        className="
                            flex
                            gap-3
                            p-3
                            rounded-xl
                            hover:bg-slate-50
                            dark:hover:bg-slate-800
                            transition
                        "
                    >
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-slate-700">
                            <notice.icon size={18} />
                        </div>

                        <div>
                            <h3 className="font-medium">
                                {notice.title}
                            </h3>

                            <p className="text-sm text-slate-500">
                                {notice.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}