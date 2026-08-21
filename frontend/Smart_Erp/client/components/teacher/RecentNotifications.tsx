import {
    Bell,
    ClipboardCheck,
    BookOpen,
    GraduationCap,
    Users,
} from "lucide-react";

export default function RecentNotifications() {
    const notices = [
        {
            icon: ClipboardCheck,
            title: "Attendance Pending",
            desc: "Class 10-A attendance not submitted.",
        },
        {
            icon: BookOpen,
            title: "Assignment Submission",
            desc: "25 students submitted Mathematics Assignment.",
        },
        {
            icon: GraduationCap,
            title: "Exam Evaluation Due",
            desc: "Mid-term answer sheets pending review.",
        },
        {
            icon: Users,
            title: "Parent Meeting",
            desc: "PTM scheduled on Friday at 10:00 AM.",
        },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">

            <div className="flex items-center gap-2 mb-5">
                <Bell size={20} />
                <h2 className="font-bold text-xl">
                    Recent Notifications
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