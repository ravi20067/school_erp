import { Plus } from "lucide-react";

interface DeviceHeaderProps {
    onAddDevice: () => void;
}

export default function DeviceHeader({
    onAddDevice,
}: DeviceHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
                <h1 className="text-3xl font-bold">
                    Devices Management
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage all device .
                </p>
            </div>

            <div className="flex gap-3">

                <button
                    onClick={onAddDevice}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Device
                </button>

            </div>


        </div>

    );
}