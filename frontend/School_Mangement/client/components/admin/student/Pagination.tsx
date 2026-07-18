import { ChevronLeft, ChevronRight } from "lucide-react";

interface StudentPaginationProps {
    filteredStudents: number;
    totalStudents: number;
}

export default function StudentPagination({
    filteredStudents,
    totalStudents,
}: StudentPaginationProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 border-t">

            <p className="text-sm text-slate-500">
                Showing {filteredStudents} of {totalStudents} students
            </p>

            <div className="flex items-center gap-2">

                <button
                    className="
                        h-10
                        w-10
                        rounded-lg
                        border
                        flex
                        items-center
                        justify-center
                        hover:bg-slate-100
                        dark:hover:bg-slate-800
                    "
                >
                    <ChevronLeft size={18} />
                </button>

                <button className="h-10 w-10 rounded-lg bg-primary text-white">
                    1
                </button>

                <button
                    className="
                        h-10
                        w-10
                        rounded-lg
                        border
                        hover:bg-slate-100
                        dark:hover:bg-slate-800
                    "
                >
                    2
                </button>

                <button
                    className="
                        h-10
                        w-10
                        rounded-lg
                        border
                        hover:bg-slate-100
                        dark:hover:bg-slate-800
                    "
                >
                    3
                </button>

                <button
                    className="
                        h-10
                        w-10
                        rounded-lg
                        border
                        flex
                        items-center
                        justify-center
                        hover:bg-slate-100
                        dark:hover:bg-slate-800
                    "
                >
                    <ChevronRight size={18} />
                </button>

            </div>

        </div>
    );
}