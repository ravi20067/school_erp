import {
    CalendarClock,
    Clock3,
    LogIn,
    LogOut,
    MapPin,
    BadgeCheck,
} from "lucide-react";

import type { TodayAttendance } from "@/types/teacher/MyAttendence";

interface TodayAttendanceCardProps {
    attendance: TodayAttendance | null;
}

export default function TodayAttendanceCard({
    attendance,
}: TodayAttendanceCardProps) {

    const Item = ({
        icon: Icon,
        label,
        value,
    }: {
        icon: React.ElementType;
        label: string;
        value: string;
    }) => (
        <div className="flex items-center gap-4 rounded-xl bg-slate-50 dark:bg-slate-800 p-4">

            <div className="rounded-lg bg-blue-100 dark:bg-blue-900/40 p-3">
                <Icon
                    size={20}
                    className="text-blue-600 dark:text-blue-400"
                />
            </div>

            <div>
                <p className="text-xs uppercase text-slate-500">
                    {label}
                </p>

                <p className="font-semibold">
                    {value}
                </p>
            </div>

        </div>
    );

    return (
        <div className="rounded-3xl border bg-white dark:bg-slate-900 shadow-sm">

            {/* Header */}

            <div className="border-b px-6 py-5">

                <div className="flex items-center gap-3">

                    <CalendarClock className="text-blue-600" />

                    <div>

                        <h2 className="text-xl font-bold">
                            Today's Attendance
                        </h2>

                        <p className="text-sm text-slate-500">
                            Your attendance summary for today.
                        </p>

                    </div>

                </div>

            </div>

            {/* Body */}

            <div className="grid gap-4 p-6 md:grid-cols-2">

                <Item
                    icon={LogIn}
                    label="Check In"
                    value={attendance?.checkIn || "--"}
                />

                <Item
                    icon={LogOut}
                    label="Check Out"
                    value={attendance?.checkOut || "--"}
                />

                <Item
                    icon={Clock3}
                    label="Working Hours"
                    value={attendance?.workingHours || "--"}
                />

                <Item
                    icon={MapPin}
                    label="Scanner Location"
                    value={attendance?.location || "--"}
                />

            </div>

            {/* Footer */}

            <div className="border-t px-6 py-4">

                <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/40 px-4 py-2">

                    <BadgeCheck
                        size={18}
                        className="text-green-600"
                    />

                    <span className="font-medium text-green-700 dark:text-green-300">

                        {attendance?.status || "Not Available"}

                    </span>

                </div>

            </div>

        </div>
    );
}