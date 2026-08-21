import {
    Bell,
    GraduationCap,
    Users,
    IndianRupee,
    Calendar,
} from "lucide-react";

export default function RecentNotifications() {
    const notices = [
        {
            icon: GraduationCap,
            title: "New Student Admissions",
            desc: "42 new students enrolled successfully today.",
        },
        {
            icon: Users,
            title: "Staff Update",
            desc: "3 teacher accounts are awaiting administrator approval.",
        },
        {
            icon: IndianRupee,
            title: "Fee Collection",
            desc: "₹4.8L fees collected today across all classes.",
        },
        {
            icon: Calendar,
            title: "Upcoming School Event",
            desc: "Annual Science Exhibition is scheduled for next Friday.",
        },
    ];


    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">

            <div className="flex items-center gap-2 mb-5">
                <Bell size={20} />
                <h2 className="font-bold text-xl">
                    Administrator Notifications
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
                            <notice.icon
                                size={18}
                                className="text-primary"
                            />
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
