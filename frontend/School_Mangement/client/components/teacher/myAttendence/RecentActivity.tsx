import {
    CheckCircle2,
    Clock3,
    QrCode,
    ScanLine,
    XCircle,
} from "lucide-react";

import type { ActivityItem } from "@/types/teacher/MyAttendence";

interface RecentActivityProps {
    activity: ActivityItem[];
}

const activityConfig = {
    GENERATED: {
        icon: QrCode,
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/30",
    },

    SCANNED: {
        icon: ScanLine,
        color: "text-amber-600",
        bg: "bg-amber-100 dark:bg-amber-900/30",
    },

    SUCCESS: {
        icon: CheckCircle2,
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/30",
    },

    FAILED: {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-100 dark:bg-red-900/30",
    },
};

export default function RecentActivity({
    activity,
}: RecentActivityProps) {

    return (
        <div className="rounded-3xl border bg-white dark:bg-slate-900 shadow-sm">

            {/* Header */}

            <div className="border-b px-6 py-5">

                <h2 className="text-xl font-bold">
                    Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Latest attendance authentication events.
                </p>

            </div>

            {/* Body */}

            <div className="p-6">

                {activity.length === 0 ? (

                    <div className="py-12 text-center">

                        <Clock3
                            size={48}
                            className="mx-auto text-slate-400"
                        />

                        <p className="mt-4 text-slate-500">
                            No recent activity available.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {activity.map((item) => {

                            const config =
                                activityConfig[item.type];

                            const Icon = config.icon;

                            return (

                                <div
                                    key={item.id}
                                    className="flex gap-4"
                                >

                                    <div
                                        className={`
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            ${config.bg}
                                        `}
                                    >
                                        <Icon
                                            size={22}
                                            className={config.color}
                                        />
                                    </div>

                                    <div className="flex-1">

                                        <div className="flex items-center justify-between">

                                            <h3 className="font-semibold">
                                                {item.title}
                                            </h3>

                                            <span className="text-sm text-slate-500">
                                                {item.time}
                                            </span>

                                        </div>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {item.description}
                                        </p>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>
    );
}