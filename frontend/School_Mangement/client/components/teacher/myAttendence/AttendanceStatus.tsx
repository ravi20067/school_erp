import {
    CheckCircle2,
    Clock3,
    ScanLine,
    ShieldAlert,
    XCircle,
} from "lucide-react";

import { AttendanceStatusType } from "@/types/teacher/MyAttendence";

interface AttendanceStatusProps {
    status: AttendanceStatusType;
}

const STATUS_CONFIG = {
    READY: {
        icon: Clock3,
        title: "Ready",
        description: "Generate a QR code to begin authentication.",
        color: "text-blue-600",
        bg: "bg-blue-50 dark:bg-blue-950/30",
        border: "border-blue-200 dark:border-blue-800",
    },

    WAITING: {
        icon: Clock3,
        title: "Waiting for Scan",
        description: "Your QR code is active and ready to be scanned.",
        color: "text-amber-600",
        bg: "bg-amber-50 dark:bg-amber-950/30",
        border: "border-amber-200 dark:border-amber-800",
    },

    SCANNED: {
        icon: ScanLine,
        title: "QR Scanned",
        description: "Scanner detected your QR code.",
        color: "text-sky-600",
        bg: "bg-sky-50 dark:bg-sky-950/30",
        border: "border-sky-200 dark:border-sky-800",
    },

    SUCCESS: {
        icon: CheckCircle2,
        title: "Attendance Marked",
        description: "Your attendance has been recorded successfully.",
        color: "text-green-600",
        bg: "bg-green-50 dark:bg-green-950/30",
        border: "border-green-200 dark:border-green-800",
    },

    EXPIRED: {
        icon: ShieldAlert,
        title: "QR Expired",
        description: "Generate a new QR code to continue.",
        color: "text-orange-600",
        bg: "bg-orange-50 dark:bg-orange-950/30",
        border: "border-orange-200 dark:border-orange-800",
    },

    FAILED: {
        icon: XCircle,
        title: "Authentication Failed",
        description: "Unable to verify your attendance.",
        color: "text-red-600",
        bg: "bg-red-50 dark:bg-red-950/30",
        border: "border-red-200 dark:border-red-800",
    },
};

export default function AttendanceStatus({
    status,
}: AttendanceStatusProps) {

    const config = STATUS_CONFIG[status];

    const Icon = config.icon;

    return (
        <div
            className={`
                flex items-center gap-4
                rounded-2xl
                border
                p-4
                ${config.bg}
                ${config.border}
            `}
        >
            <div
                className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    dark:bg-slate-900
                    shadow-sm
                `}
            >
                <Icon className={config.color} size={24} />
            </div>

            <div>

                <h3
                    className={`
                        font-semibold
                        ${config.color}
                    `}
                >
                    {config.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {config.description}
                </p>

            </div>
        </div>
    );
}