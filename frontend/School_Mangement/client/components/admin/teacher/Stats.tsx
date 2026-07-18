import {
    GraduationCap,
    Users,
    UserCheck,
    UserPlus,
} from "lucide-react";

import type { TeacherStats } from "@/types/admin/teacher";

interface StatsProps {
    stats: TeacherStats;
}

export default function TeacherStats({
    stats,
}: StatsProps) {
    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border">
                <div className="flex justify-between">
                    <div>
                        <p className="text-slate-500 text-sm">
                            Total Students
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {stats.totalTeacher}
                        </h2>
                    </div>

                    <GraduationCap
                        className="text-primary"
                        size={32}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border">
                <div className="flex justify-between">
                    <div>
                        <p className="text-slate-500 text-sm">
                            Boys
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {stats.male}
                        </h2>
                    </div>

                    <Users
                        className="text-primary"
                        size={32}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border">
                <div className="flex justify-between">
                    <div>
                        <p className="text-slate-500 text-sm">
                            Girls
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {stats.female}
                        </h2>
                    </div>

                    <UserCheck
                        className="text-primary"
                        size={32}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border">
                <div className="flex justify-between">
                    <div>
                        <p className="text-slate-500 text-sm">
                            Today Present
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {stats.toadayPresent}
                        </h2>
                    </div>

                    <UserPlus
                        className="text-primary"
                        size={32}
                    />
                </div>
            </div>

        </div>
    );
}