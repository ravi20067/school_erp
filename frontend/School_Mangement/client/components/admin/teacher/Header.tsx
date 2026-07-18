import { Download, Plus } from "lucide-react";

interface HeaderProps {
    onAdd: () => void;
    onExport: () => void;
}

export default function Header({
    onAdd,
    onExport,
}: HeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
                <h1 className="text-3xl font-bold">
                    Teacher Management
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage all teachers, enrollment and attendance records.
                </p>
            </div>

            <div className="flex gap-3">

                <button
                    onClick={onExport}
                    className="px-5 py-3 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                    <Download size={18} />
                    Export
                </button>

                <button
                    onClick={onAdd}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Teacher
                </button>

            </div>


        </div>

    );
}