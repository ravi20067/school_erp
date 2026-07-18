export default function RecentNotifications() {
    const notices = [
        "Mathematics assignment uploaded",
        "Fee reminder for July",
        "Library book due in 3 days",
        "Exam timetable released",
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6">
            <h2 className="font-bold text-xl mb-4">
                Notifications
            </h2>

            {notices.map((notice) => (
                <div
                    key={notice}
                    className="py-3 border-b last:border-none"
                >
                    {notice}
                </div>
            ))}
        </div>
    );
}