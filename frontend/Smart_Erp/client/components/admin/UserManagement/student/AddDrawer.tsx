import { X } from "lucide-react";
import StudentForm from "./Form";
import StudentReceipt from "./Receipt";
import { StudentFormData } from "@/types/admin/student";

interface AddStudentDrawerProps {
    open: boolean;

    onClose: () => void;

    submitting: boolean;

    errorMsg: string;

    receiptStudent: any;

    formData: StudentFormData;

    classes?: string[];

    sections: string[];

    onFormChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) => void;

    onClassChange: (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => void;

    onSubmit: (
        e: React.FormEvent<HTMLFormElement>
    ) => void;

    onDownloadReceipt: () => void;
}

export default function AddStudentDrawer({
    open,
    onClose,
    submitting,
    errorMsg,
    receiptStudent,
    formData,
    classes,
    sections,
    onFormChange,
    onClassChange,
    onSubmit,
    onDownloadReceipt,
}: AddStudentDrawerProps) {

    if (!open) return null;

    return (
        <>
            {/* Overlay */}

            <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={onClose}
            />

            {/* Drawer */}

            <div
                className="
                    fixed
                    top-0
                    right-0
                    z-50

                    w-[95vw]
                    sm:w-[500px]

                    h-full

                    bg-white
                    dark:bg-slate-900

                    border-l
                    border-slate-200
                    dark:border-slate-800

                    shadow-2xl

                    flex
                    flex-col

                    animate-in
                    slide-in-from-right
                    duration-200
                "
            >

                {/* Header */}

                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">

                    <div>

                        <h2 className="font-bold text-xl">

                            {receiptStudent
                                ? "Admission Receipt"
                                : "Add New Student"}

                        </h2>

                        <p className="text-xs text-slate-500 mt-1">

                            {receiptStudent
                                ? "Student enrolled successfully"
                                : "Fill in the details to register a new student"}

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* Body */}

                <div className="flex-1 overflow-y-auto p-6">

                    {errorMsg && (

                        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm">

                            {errorMsg}

                        </div>

                    )}

                    {receiptStudent ? (

                        <StudentReceipt
                            student={receiptStudent}
                            onDownload={onDownloadReceipt}
                            onClose={onClose}
                        />

                    ) : (

                        <StudentForm

                            formData={formData}

                            classes={classes}

                            sections={sections}

                            submitting={submitting}

                            onFormChange={onFormChange}

                            onClassChange={onClassChange}

                            onSubmit={onSubmit}

                            onCancel={onClose}

                        />

                    )}

                </div>

            </div>

        </>
    );
}