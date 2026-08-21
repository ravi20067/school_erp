import { Download, Plus } from "lucide-react";

interface StudentHeaderProps {
    onAddStudent: () => void;
    onExport: () => void;
}

export default function StudentHeader({
    onAddStudent,
    onExport,
}: StudentHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
                <h1 className="text-3xl font-bold">
                    Students Management
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage all students, admissions and academic records.
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
                    onClick={onAddStudent}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Student
                </button>

            </div>


        </div>

    );
}