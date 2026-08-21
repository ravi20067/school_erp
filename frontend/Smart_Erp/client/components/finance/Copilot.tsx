import { SendHorizonal } from "lucide-react";

export default function FinanceCopilot() {
    return (
        <div className="flex flex-col h-full">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                <div className="bg-blue-100 text-slate-900 rounded-2xl p-3 w-fit max-w-[85%]">
                    Welcome back, Finance Officer 👋
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 w-fit max-w-[85%]">
                    I'm your AI Finance Copilot.
                    <br /><br />
                    You can ask me:
                    <br />
                    • Fee Collection Status
                    <br />
                    • Pending Payments
                    <br />
                    • Generate Receipts
                    <br />
                    • Daily Collection Reports
                    <br />
                    • Student Fee History
                    <br />
                    • Financial Analytics
                </div>

            </div>

            {/* Input */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-4">

                <div className="flex gap-2">

                    <input
                        type="text"
                        placeholder="Ask Finance Copilot..."
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
                        Collect Fee
                    </button>

                    <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        Pending Fees
                    </button>

                    <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        Generate Receipt
                    </button>

                    <button className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        Daily Report
                    </button>

                </div>

            </div>

        </div>
    );
}