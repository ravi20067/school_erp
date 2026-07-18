import { Loader2 } from "lucide-react";
import { TeacherFormData } from "@/types/admin/teacher";

interface TeacherFormProps {
    formData: TeacherFormData;
    submitting: boolean;

    onFormChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) => void;

    onSubmit: (
        e: React.FormEvent<HTMLFormElement>
    ) => void;

    onCancel: () => void;
}

export default function TeacherForm({
    formData,
    submitting,
    onFormChange,
    onSubmit,
    onCancel,
}: TeacherFormProps) {

    return (
        <form
            onSubmit={onSubmit}
            className="space-y-5"
        >

            {/* Personal Information */}

            <div>

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Personal Information
                </h3>

                <div className="grid grid-cols-2 gap-4">

                    <div>

                        <label className="block text-xs font-medium mb-1.5">
                            First Name *
                        </label>

                        <input
                            required
                            name="firstName"
                            value={formData.firstName}
                            onChange={onFormChange}
                            className="w-full border rounded-xl px-4 py-2.5"
                        />

                    </div>

                    <div>

                        <label className="block text-xs font-medium mb-1.5">
                            Last Name *
                        </label>

                        <input
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={onFormChange}
                            className="w-full border rounded-xl px-4 py-2.5"
                        />

                    </div>

                </div>

                <div className="mt-4">

                    <label className="block text-xs font-medium mb-1.5">
                        Date of Birth *
                    </label>

                    <input
                        required
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={onFormChange}
                        className="w-full border rounded-xl px-4 py-2.5"
                    />

                </div>

            </div>

            {/* Contact Information */}

            <div>

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Contact Information
                </h3>

                <div className="space-y-4">

                    <div>

                        <label className="block text-xs font-medium mb-1.5">
                            Email *
                        </label>

                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onFormChange}
                            className="w-full border rounded-xl px-4 py-2.5"
                        />

                    </div>

                    <div>

                        <label className="block text-xs font-medium mb-1.5">
                            Phone *
                        </label>

                        <input
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={onFormChange}
                            className="w-full border rounded-xl px-4 py-2.5"
                        />

                    </div>

                </div>

            </div>

            {/* Professional Information */}

            <div>

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Professional Information
                </h3>

                <div className="space-y-4">

                    <div>

                        <label className="block text-xs font-medium mb-1.5">
                            Qualification *
                        </label>

                        <input
                            required
                            name="qualification"
                            value={formData.qualification}
                            onChange={onFormChange}
                            className="w-full border rounded-xl px-4 py-2.5"
                        />

                    </div>

                    <div>

                        <label className="block text-xs font-medium mb-1.5">
                            Specialization *
                        </label>

                        <input
                            required
                            name="specialization"
                            value={formData.specialization}
                            onChange={onFormChange}
                            className="w-full border rounded-xl px-4 py-2.5"
                        />

                    </div>

                </div>

            </div>

            {/* System Information */}

            <div>

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    System Information
                </h3>

                <div className="grid grid-cols-2 gap-4">

                    <div>

                        <label className="block text-xs font-medium mb-1.5">
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={onFormChange}
                            className="w-full border rounded-xl px-4 py-2.5"
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="SUSPEND">SUSPEND</option>
                        </select>

                    </div>

                    <div>

                        <label className="block text-xs font-medium mb-1.5">
                            Role
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={onFormChange}
                            className="w-full border rounded-xl px-4 py-2.5"
                        >
                            <option value="TEACHER">Teacher</option>
                            <option value="LIBRARY">Library</option>
                            <option value="FINANCE">Finance</option>
                            <option value="ADMISSION">Admission</option>
                            <option value="EXAMINATION">Examination</option>
                        </select>

                    </div>

                </div>

            </div>

            {/* Buttons */}

            <div className="pt-4 flex gap-3 border-t">

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 border rounded-xl py-3 font-semibold"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-primary text-white rounded-xl py-3 flex justify-center items-center gap-2"
                >
                    {submitting ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Processing...
                        </>
                    ) : (
                        "Add Teacher"
                    )}
                </button>

            </div>

        </form>
    );
}