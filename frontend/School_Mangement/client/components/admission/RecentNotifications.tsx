import {
    Bell,
    UserPlus,
    FileCheck,
    Calendar,
    GraduationCap,
} from "lucide-react";

export default function RecentNotifications() {
    const notices = [
        {
            icon: UserPlus,
            title: "New Applications",
            desc: "18 new admission applications received today.",
        },
        {
            icon: FileCheck,
            title: "Verification Pending",
            desc: "12 applications are awaiting document verification.",
        },
        {
            icon: Calendar,
            title: "Interviews Scheduled",
            desc: "8 admission interviews scheduled for tomorrow.",
        },
        {
            icon: GraduationCap,
            title: "Admissions Approved",
            desc: "25 students approved for enrollment this week.",
        },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">

            <div className="flex items-center gap-2 mb-5">
                <Bell size={20} />
                <h2 className="font-bold text-xl">
                    Admission Notifications
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