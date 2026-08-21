import { Download, GraduationCap } from "lucide-react";

interface StudentReceiptProps {
    student: any;
    onDownload: (student: any) => void;
    onClose: () => void;
}

export default function StudentReceipt({
    student,
    onDownload,
    onClose,
}: StudentReceiptProps) {

    return (
        <div className="space-y-6">

            {/* Success */}

            <div className="flex flex-col items-center justify-center text-center p-4">

                <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">

                    <GraduationCap size={36} />

                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Admission Approved!
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                    Student has been registered with admission number
                </p>

                <span className="text-2xl font-black text-primary mt-2 bg-blue-50 dark:bg-slate-800 px-5 py-1.5 rounded-full border border-blue-100 dark:border-slate-700 font-mono">
                    {student?.admissionNo || "GENERATING..."}
                </span>

            </div>

            {/* Receipt */}

            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 font-mono text-xs space-y-4">

                <div className="text-center font-bold pb-3 border-b border-dashed border-slate-300 dark:border-slate-700">

                    <p className="text-sm font-sans uppercase font-black tracking-wider text-slate-800 dark:text-slate-200">
                        Academy Elite School
                    </p>

                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                        Official Admission Record
                    </p>

                </div>

                <div className="space-y-2">

                    <ReceiptRow
                        label="Admission No:"
                        value={student?.admissionNo}
                    />

                    <ReceiptRow
                        label="Roll Number:"
                        value={student?.rollNumber || student?.rollNo}
                    />

                    <ReceiptRow
                        label="Student Name:"
                        value={`${student?.firstName || student?.name?.split(" ")[0] || ""}
                        ${student?.lastName || student?.name?.split(" ")[1] || ""}`}
                    />

                    <ReceiptRow
                        label="Class Enrolled:"
                        value={student?.className}
                    />

                    <ReceiptRow
                        label="Section Assigned:"
                        value={student?.section}
                    />

                    <ReceiptRow
                        label="Date of Birth:"
                        value={student?.dateOfBirth}
                    />

                    <ReceiptRow
                        label="Gender:"
                        value={student?.gender}
                    />

                    <ReceiptRow
                        label="Phone:"
                        value={student?.phone}
                    />

                    <ReceiptRow
                        label="Email:"
                        value={student?.email}
                    />

                    <ReceiptRow
                        label="Address:"
                        value={student?.address}
                        wrap
                    />

                </div>

                <div className="pt-3 border-t border-dashed border-slate-300 dark:border-slate-700 text-center text-slate-400">

                    <p className="text-[10px]">
                        Student successfully enrolled.
                        Please download this receipt for official check-in.
                    </p>

                </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-3">

                <button
                    onClick={() => onDownload(student)}
                    className="flex-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl py-3 text-sm font-semibold transition flex items-center justify-center gap-2"
                >

                    <Download size={16} />

                    Download Receipt

                </button>

                <button
                    onClick={onClose}
                    className="flex-1 bg-primary hover:bg-primary/95 text-white rounded-xl py-3 text-sm font-semibold transition"
                >

                    Close

                </button>

            </div>

        </div>
    );
}

interface ReceiptRowProps {
    label: string;
    value?: string;
    wrap?: boolean;
}

function ReceiptRow({
    label,
    value,
    wrap = false,
}: ReceiptRowProps) {

    return (

        <div className="flex justify-between">

            <span className="text-slate-400">
                {label}
            </span>

            <span
                className={`font-bold text-slate-800 dark:text-slate-200 ${wrap
                    ? "text-right max-w-[200px] break-words"
                    : ""
                    }`}
            >
                {value || "N/A"}
            </span>

        </div>

    );
}