import {
    Bell,
    Calendar,
    FileText,
    GraduationCap,
    BarChart3,
} from "lucide-react";

export default function RecentNotifications() {
    const notices = [
        {
            icon: Calendar,
            title: "Exam Schedule Published",
            desc: "Mid-Term examination timetable has been released.",
        },
        {
            icon: FileText,
            title: "Marks Entry Pending",
            desc: "Mathematics marks for Grade 10 are awaiting submission.",
        },
        {
            icon: GraduationCap,
            title: "Results Generated",
            desc: "Grade 12 Science stream results have been published.",
        },
        {
            icon: BarChart3,
            title: "Performance Report Ready",
            desc: "Subject-wise performance analytics are available.",
        },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">

            <div className="flex items-center gap-2 mb-5">
                <Bell size={20} />
                <h2 className="font-bold text-xl">
                    Examination Notifications
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