import { Loader2 } from "lucide-react";
import { DeviceFormData } from "@/types/admin/device";

interface DeviceFormProps {
    formData: DeviceFormData;
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

export default function DeviceForm({
    formData,
    submitting,
    onFormChange,
    onSubmit,
    onCancel,
}: DeviceFormProps) {

    return (

        <form
            onSubmit={onSubmit}
            className="space-y-5"
        >

            <div className="pt-2">

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Information
                </h3>

                <div className="space-y-4">

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Location
                        </label>

                        <input
                            required
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={onFormChange}
                            placeholder="Location"
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                        />

                    </div>

                    <div>

                        <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Password
                        </label>

                        <input
                            required
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={onFormChange}
                            placeholder="Password"
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 bg-transparent dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200"
                        />

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
                        "Register Device"
                    )}
                </button>

            </div>

        </form>

    );
}   