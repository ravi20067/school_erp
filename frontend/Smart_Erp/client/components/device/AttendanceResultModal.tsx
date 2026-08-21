import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    LogIn,
    LogOut,
    User,
    Clock3,
    Building2,
    IdCard,
    MapPin,
} from "lucide-react";

export interface AttendanceResult {

    open: boolean;

    type: "CHECK_IN" | "CHECK_OUT" | "FAILED";

    message: string;

    teacherName?: string;

    employeeId?: string;

    department?: string;

    attendanceTime?: string;

    deviceName?: string;

    onClose: () => void;
}

export default function AttendanceResultModal({

    open,
    type,
    message,
    teacherName,
    employeeId,
    department,
    attendanceTime,
    deviceName,
    onClose,

}: AttendanceResult) {

    const [progress, setProgress] = useState(100);

    useEffect(() => {

        if (!open) return;

        setProgress(100);

        const duration = 5000;

        const start = Date.now();

        const timer = setInterval(() => {

            const elapsed = Date.now() - start;

            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);

            setProgress(remaining);

        }, 50);

        const close = setTimeout(() => {

            onClose();

        }, duration);

        return () => {

            clearInterval(timer);

            clearTimeout(close);

        };

    }, [open]);

    const success = type !== "FAILED";

    const bg =
        type === "CHECK_IN"
            ? "from-emerald-500 to-green-600"
            : type === "CHECK_OUT"
                ? "from-sky-500 to-indigo-600"
                : "from-red-500 to-red-700";

    const Icon =
        type === "CHECK_IN"
            ? LogIn
            : type === "CHECK_OUT"
                ? LogOut
                : XCircle;

    return (

        <AnimatePresence>

            {

                open && (

                    <motion.div

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md"

                    >

                        <motion.div

                            initial={{ scale: .8, opacity: 0, y: 40 }}

                            animate={{ scale: 1, opacity: 1, y: 0 }}

                            exit={{ scale: .8, opacity: 0 }}

                            transition={{ duration: .35 }}

                            className="w-[95%] max-w-md rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-[0_0_60px_rgba(0,0,0,.5)]"

                        >

                            <div className={`bg-gradient-to-r ${bg} p-7 text-center`}>

                                {

                                    success ?

                                        <CheckCircle2

                                            size={80}

                                            className="mx-auto text-white"

                                        />

                                        :

                                        <XCircle

                                            size={80}

                                            className="mx-auto text-white"

                                        />

                                }

                                <h1 className="text-3xl font-black text-white mt-4">

                                    {

                                        type === "CHECK_IN"

                                            ? "CHECK IN"

                                            : type === "CHECK_OUT"

                                                ? "CHECK OUT"

                                                : "FAILED"

                                    }

                                </h1>

                            </div>

                            <div className="p-7">

                                {

                                    success && (

                                        <>

                                            <h2 className="mt-5 text-center text-3xl font-bold text-white">

                                                {teacherName}

                                            </h2>



                                            <div className="mt-7 space-y-4">

                                                <InfoRow
                                                    icon={<IdCard size={18} />}
                                                    title="Employee ID"
                                                    value={employeeId}
                                                />

                                                <InfoRow
                                                    icon={<Building2 size={18} />}
                                                    title="Department"
                                                    value={department}
                                                />

                                                <InfoRow
                                                    icon={<Clock3 size={18} />}
                                                    title="Time"
                                                    value={attendanceTime}
                                                />

                                                <InfoRow
                                                    icon={<MapPin size={18} />}
                                                    title="Device"
                                                    value={deviceName}
                                                />

                                            </div>

                                        </>

                                    )

                                }

                                {

                                    !success && (

                                        <div className="text-center py-10">

                                            <p className="text-2xl font-bold text-red-400">

                                                {message}

                                            </p>

                                        </div>

                                    )

                                }

                                <div className="mt-8">

                                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                                        <motion.div

                                            animate={{ width: `${progress}%` }}

                                            className={`h-full bg-gradient-to-r ${bg}`}

                                        />

                                    </div>

                                    <p className="text-center text-slate-400 mt-3">

                                        Closing automatically...

                                    </p>

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>

                )

            }

        </AnimatePresence>

    );

}

function InfoRow({

    icon,
    title,
    value,

}: any) {

    return (

        <div className="flex items-center justify-between rounded-xl bg-slate-900 p-4">

            <div className="flex items-center gap-3 text-slate-300">

                {icon}

                <span>{title}</span>

            </div>

            <span className="font-semibold text-white">

                {value}

            </span>

        </div>

    );

}