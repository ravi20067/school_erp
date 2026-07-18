import { SendHorizonal } from "lucide-react";

export default function ExaminationCopilot() {
    return (
        <div className="flex flex-col h-full">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                <div className="bg-blue-100 text-slate-900 rounded-2xl p-3 w-fit max-w-[85%]">
                    Welcome back, Examination Officer 👋
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 w-fit max-w-[85%]">
                    I'm your AI Examination Copilot.
                    <br /><br />
                    You can ask me:
                    <br />
                    • Exam Schedule
                    <br />
                    • Question Papers
                    <br />
                    • Marks Entry Status
                    <br />
                    • Result Processing
                    <br />
                    • Student Performance Analysis
                    <br />
                    • Examination Reports
                </div>

            </div>

            {/* Input */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-4">

                <div className="flex gap-2">

                    <input
                        type="text"
                        placeholder="Ask Examination Copilot..."
                        className="
                            flex-1
                            rounded-xl
                            px-4
                            py-3
                            border
                            border-slate-300
                            dark:border-slate-700
                            bg-white
                            dark:bg-slate-900
                            focus:outline-none
                            focus:ring-2
                            focus:ring-primary
                        "
                    />

                    <button
                        className="
                            h-12
                            w-12
                            flex
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-r
                            from-primary
                            to-secondary
                            text-white
                            hover:scale-105
                            transition
                        "
                    >
                        <SendHorizonal size={18} />
                    </button>

                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-3">

                    <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        Exam Schedule
                    </button>

                    <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        Pending Marks
                    </button>

                    <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        Generate Results
                    </button>

                    <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        Exam Analytics
                    </button>

                </div>

            </div>

        </div>
    );
}