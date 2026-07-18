import { SendHorizonal } from "lucide-react";

export default function AdminCopilot() {
    return (<div className="flex flex-col h-full">


        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

            <div className="bg-blue-100 text-slate-900 rounded-2xl p-3 w-fit max-w-[85%]">
                Welcome back, Administrator 👋
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 w-fit max-w-[85%]">
                I'm your AI School Copilot.
                <br /><br />
                I can help you manage every department of the school.
                <br /><br />
                You can ask me:
                <br />
                • Student Information
                <br />
                • Teacher Management
                <br />
                • Attendance Reports
                <br />
                • Fee Collection Status
                <br />
                • Examination Analytics
                <br />
                • Library Records
                <br />
                • School Announcements
                <br />
                • Website Content
                <br />
                • User & Role Management
                <br />
                • School Performance Analytics
            </div>

        </div>

        {/* Input */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4">

            <div className="flex gap-2">

                <input
                    type="text"
                    placeholder="Ask AI School Copilot..."
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
                    Student Report
                </button>

                <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    Fee Summary
                </button>

                <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    Attendance Report
                </button>

                <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    Teacher List
                </button>

                <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    Examination Report
                </button>

                <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    Library Status
                </button>

            </div>

        </div>

    </div>
    );


}
