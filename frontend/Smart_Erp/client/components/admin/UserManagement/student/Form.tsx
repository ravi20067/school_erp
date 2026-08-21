import { Loader2 } from "lucide-react";
import { StudentFormData } from "@/types/admin/student";

interface StudentFormProps {
    formData: StudentFormData;
    classes?: string[];
    sections: string[];
    submitting: boolean;

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

    onCancel: () => void;
}

export default function StudentForm({
    formData,
    classes,
    sections,
    submitting,
    onFormChange,
    onClassChange,
    onSubmit,
    onCancel,
}: StudentFormProps) {

    return (

        <form
            onSubmit={onSubmit}
            className="space-y-5"
        >

            {/* Personal Section */}

            <div>

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Personal Information
                </h3>

                <div className="grid grid-cols-2 gap-4">

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            First Name *
                        </label>

                        <input
                            required
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={onFormChange}
                            placeholder="First Name"
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                        />

                    </div>

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Last Name *
                        </label>

                        <input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={onFormChange}
                            placeholder="Last Name"
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                        />

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                        Gender *
                    </label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={onFormChange}
                        className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                    >
                        <option value="MALE">
                            Male
                        </option>

                        <option value="FEMALE">
                            Female
                        </option>

                        <option value="OTHER">
                            Other
                        </option>

                    </select>

                </div>

                <div>

                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                        Date of Birth *
                    </label>

                    <input
                        required
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={onFormChange}
                        className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                    />

                </div>

            </div>
            {/* Contact Section */}

            <div className="pt-2">

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Contact Information
                </h3>

                <div className="space-y-4">

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Email Address *
                        </label>

                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onFormChange}
                            placeholder="email@example.com"
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                        />

                    </div>

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Phone Number *
                        </label>

                        <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={onFormChange}
                            placeholder="Phone Number"
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                        />

                    </div>

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Address *
                        </label>

                        <textarea
                            required
                            rows={2}
                            name="address"
                            value={formData.address}
                            onChange={onFormChange}
                            placeholder="Full Address"
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200 resize-none"
                        />

                    </div>

                </div>

            </div>
            {/* Academic Section */}

            <div className="pt-2">

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Academic Placement
                </h3>

                <div className="grid grid-cols-2 gap-4">

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Class *
                        </label>

                        <select
                            name="schoolClass"
                            value={formData.schoolClass}
                            onChange={onClassChange}
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                        >
                            <option value="">Select Class</option>
                            {(classes || []).map((cls) => (
                                <option key={cls} value={cls}>
                                    {cls}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Section *
                        </label>

                        <select
                            name="section"
                            value={formData.section}
                            onChange={onFormChange}
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                        >
                            <option value="">
                                Select Section
                            </option>

                            {sections.map((section) => (
                                <option
                                    key={section}
                                    value={section}
                                >
                                    {section}
                                </option>
                            ))}

                        </select>

                    </div>

                </div>

            </div>

            {/* Action Buttons */}

            <div className="pt-4 flex gap-3 border-t dark:border-slate-800">

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl py-3 text-sm font-semibold transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-3 text-sm font-semibold transition hover:opacity-90 flex items-center justify-center gap-2"
                >
                    {submitting ? (
                        <>
                            <Loader2
                                className="animate-spin"
                                size={18}
                            />
                            Processing...
                        </>
                    ) : (
                        "Submit Admission"
                    )}
                </button>

            </div>

        </form>

    );
}   