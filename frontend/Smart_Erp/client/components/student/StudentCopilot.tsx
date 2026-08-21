import { SendHorizonal } from "lucide-react";

export default function StudentCopilot() {
    return (<div className="flex flex-col h-full">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

            <div className="bg-blue-100 text-slate-900 rounded-xl p-3 w-fit max-w-[80%]">
                Hi Ravi 👋
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 w-fit max-w-[80%]">
                You can ask:
                <br />
                • Attendance
                <br />
                • Fee Status
                <br />
                • Homework
                <br />
                • Exam Schedule
            </div>

        </div>

        {/* Input */}
        <div className="border-t p-4">
            <div className="flex gap-2">

                <input
                    type="text"
                    placeholder="Ask AI..."
                    className="
                        flex-1
                        border
                        border-slate-300
                        dark:border-slate-700
                        rounded-xl
                        px-4
                        py-2
                        bg-transparent
                    "
                />

                <button
                    className="
                        bg-gradient-to-r
                        from-primary
                        to-secondary
                        text-white
                        px-4
                        rounded-xl
                    "
                >
                    <SendHorizonal size={18} />
                </button>

            </div>
        </div>

    </div>
    );

}
