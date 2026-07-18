import {
    Bell,
    BookOpen,
    RefreshCw,
    AlertCircle,
    Library,
} from "lucide-react";

export default function RecentNotifications() {
    const notices = [
        {
            icon: BookOpen,
            title: "Book Issued",
            desc: "12 books were issued today.",
        },
        {
            icon: RefreshCw,
            title: "Book Returned",
            desc: "8 books returned and added back to inventory.",
        },
        {
            icon: AlertCircle,
            title: "Overdue Books",
            desc: "15 books are overdue for return.",
        },
        {
            icon: Library,
            title: "New Books Added",
            desc: "25 new Science books added to the catalog.",
        },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">

            <div className="flex items-center gap-2 mb-5">
                <Bell size={20} />
                <h2 className="font-bold text-xl">
                    Library Notifications
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