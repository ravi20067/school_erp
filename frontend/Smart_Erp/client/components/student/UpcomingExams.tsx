export default function UpcomingExams() {
    const exams = [
        {
            subject: "Mathematics",
            date: "25 June 2026",
        },
        {
            subject: "Science",
            date: "28 June 2026",
        },
        {
            subject: "English",
            date: "30 June 2026",
        },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6">
            <h2 className="font-bold text-xl mb-4">
                Upcoming Exams
            </h2>

            {exams.map((exam) => (
                <div
                    key={exam.subject}
                    className="flex justify-between py-3 border-b"
                >
                    <span>{exam.subject}</span>
                    <span>{exam.date}</span>
                </div>
            ))}
        </div>
    );
}