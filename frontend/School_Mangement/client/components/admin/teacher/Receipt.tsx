import { Download, GraduationCap } from "lucide-react";

interface TeacherReceiptProps {
    teacher: any;
    onDownload: (teacher: any) => void;
    onClose: () => void;
}

export default function TeacherReceipt({
    teacher,
    onDownload,
    onClose,
}: TeacherReceiptProps) {

    return (
        <div className="space-y-6">

            {/* Success */}

            <div className="flex flex-col items-center justify-center text-center p-4">

                <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">

                    <GraduationCap size={36} />

                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Teacher Registered Successfully!
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                    Teacher account has been created successfully.
                </p>

            </div>

            {/* Receipt */}

            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 font-mono text-xs space-y-4">

                <div className="text-center font-bold pb-3 border-b border-dashed border-slate-300 dark:border-slate-700">

                    <p className="text-sm font-sans uppercase font-black tracking-wider text-slate-800 dark:text-slate-200">
                        Academy Elite School
                    </p>

                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                        Official Teacher Registration
                    </p>

                </div>

                <div className="space-y-2">

                    <ReceiptRow
                        label="Teacher Name:"
                        value={`${teacher?.firstName ?? ""} ${teacher?.lastName ?? ""}`.trim()}
                    />

                    <ReceiptRow
                        label="Email:"
                        value={teacher?.email}
                    />
                    <ReceiptRow
                        label="Employee ID:"
                        value={teacher?.employeeId}
                    />

                    <ReceiptRow
                        label="Phone:"
                        value={teacher?.phone}
                    />

                    <ReceiptRow
                        label="Qualification:"
                        value={teacher?.qualification}
                    />

                    <ReceiptRow
                        label="Specialization:"
                        value={teacher?.specialization}
                    />

                    <ReceiptRow
                        label="Date of Birth:"
                        value={teacher?.dateOfBirth}
                    />

                    <ReceiptRow
                        label="Status:"
                        value={teacher?.status}
                    />

                    <ReceiptRow
                        label="Role:"
                        value={teacher?.role}
                    />

                </div>

                <div className="pt-3 border-t border-dashed border-slate-300 dark:border-slate-700 text-center text-slate-400">

                    <p className="text-[10px]">
                        Teacher registration completed successfully.
                        Please download this receipt for future reference.
                    </p>

                </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-3">

                <button
                    onClick={() => onDownload(teacher)}
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

        <div className="flex justify-between items-start gap-4">

            <span className="text-slate-400 whitespace-nowrap">
                {label}
            </span>

            <span
                className={`font-bold text-slate-800 dark:text-slate-200 ${wrap
                    ? "text-right max-w-[220px] break-words"
                    : "text-right"
                    }`}
            >
                {value || "N/A"}
            </span>

        </div>

    );
}