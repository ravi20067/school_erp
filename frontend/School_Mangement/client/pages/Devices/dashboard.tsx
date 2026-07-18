import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Scanner,
} from "@yudiel/react-qr-scanner";
import AttendanceResultModal from "@/components/device/AttendanceResultModal";

import {
    ScanLine,
    CheckCircle2,
    XCircle,
    Loader2,
    LogOut,
    Wifi,
    Camera,
    ShieldCheck,
} from "lucide-react";

import { scanAttendance } from "@/services/deviceScanner";
import { useAuth } from "@/services/authContext";

interface AttendanceResult {

    type: "CHECK_IN" | "CHECK_OUT" | "FAILED";

    message: string;

    teacherName?: string;

    employeeId?: string;

    department?: string;

    attendanceTime?: string;

    deviceName?: string;
}

export default function ScannerPage() {
    const [showResult, setShowResult] = useState(false);

    const [attendanceResult, setAttendanceResult] =
        useState<AttendanceResult | null>(null);

    const { logout } = useAuth();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState<
        "IDLE" | "CHECK_IN" | "CHECK_OUT" | "FAILED"
    >("IDLE");

    const [message, setMessage] = useState(
        "Place the QR inside the scanning area."
    );

    const handleLogout = async () => {

        try {

            await logout();

        } catch (e) {

            console.log(e);

        } finally {

            localStorage.clear();

            navigate("/login");

        }

    };

    const handleScan = async (result: any) => {

        if (loading) return;

        if (!result?.[0]) return;

        setLoading(true);

        try {

            const token = result[0].rawValue;

            const response = await scanAttendance(token);

            setStatus(response.type);

            setMessage(response.message);

            setAttendanceResult({

                type: response.type,

                message: response.message,

                teacherName: response.teacherName,

                employeeId: response.employeeId,

                department: response.department,

                attendanceTime: response.attendanceTime,

                deviceName: response.deviceName,

            });

            setShowResult(true);

        } catch {
            setStatus("FAILED");

            setMessage("Unable to connect to server.");

            setAttendanceResult({

                type: "FAILED",

                message: "Unable to connect to server."

            });

            setShowResult(true);
        } finally {

            setLoading(false);


        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">

            {/* Background Glow */}

            <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[140px] -top-24 -left-20" />

            <div className="absolute w-[450px] h-[450px] rounded-full bg-indigo-600/20 blur-[120px] bottom-0 right-0" />

            {/* Header */}

            <div className="relative z-10 px-5 md:px-10 py-5 flex items-center justify-between">

                <div>

                    <h1 className="text-2xl md:text-4xl font-black text-white">

                        Attendance Scanner

                    </h1>

                    <p className="text-slate-400 text-sm mt-1">

                        Academy Elite School

                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-red-500
                        hover:bg-red-600
                        transition
                        px-4
                        py-3
                        text-white
                        shadow-xl
                    "
                >

                    <LogOut size={18} />

                    <span className="hidden sm:block">

                        Logout

                    </span>

                </button>

            </div>

            {/* Main */}

            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10">

                <div
                    className="
                        grid
                        lg:grid-cols-2
                        gap-8
                        items-center
                    "
                >

                    {/* Scanner */}

                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                            p-5
                            shadow-2xl
                        "
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 flex items-center justify-center">

                                <ScanLine className="text-white" />

                            </div>

                            <div>

                                <h2 className="text-white text-xl font-bold">

                                    Live Scanner

                                </h2>

                                <p className="text-slate-400 text-sm">

                                    Scan teacher QR code

                                </p>

                            </div>

                        </div>

                        <div
                            className="
                                rounded-3xl
                                overflow-hidden
                                border
                                border-cyan-500/30
                                shadow-[0_0_35px_rgba(34,211,238,.25)]
                            "
                        >

                            <Scanner

                                onScan={handleScan}

                                onError={(e) => console.log(e)}

                            />

                        </div>

                    </div>

                    {/* Right Side */}

                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                            p-8
                            shadow-2xl
                        "
                    >

                        <div className="flex justify-center">

                            <div
                                className="
                                    h-36
                                    w-36
                                    rounded-full
                                    bg-gradient-to-r
                                    from-cyan-500
                                    to-indigo-600
                                    flex
                                    items-center
                                    justify-center
                                    shadow-[0_0_50px_rgba(56,189,248,.35)]
                                "
                            >

                                {

                                    loading ?

                                        <Loader2
                                            size={70}
                                            className="animate-spin text-white"
                                        />

                                        :

                                        status === "CHECK_IN" ?

                                            <CheckCircle2
                                                size={70}
                                                className="text-white"
                                            />

                                            :

                                            status === "CHECK_OUT" ?

                                                <CheckCircle2
                                                    size={70}
                                                    className="text-white"
                                                />

                                                :

                                                status === "FAILED" ?

                                                    <XCircle
                                                        size={70}
                                                        className="text-white"
                                                    />

                                                    :

                                                    <ScanLine
                                                        size={70}
                                                        className="text-white"
                                                    />

                                }

                            </div>

                        </div>

                        <div className="mt-8 text-center">

                            <h2 className="text-3xl font-black text-white">

                                {

                                    loading ?

                                        "Scanning..."

                                        :

                                        status === "CHECK_IN" ?

                                            "Check In"

                                            :

                                            status === "CHECK_OUT" ?

                                                "Check Out"

                                                :

                                                status === "FAILED" ?

                                                    "Failed"

                                                    :

                                                    "Waiting"

                                }

                            </h2>

                            <p className="mt-4 text-slate-300 text-lg">

                                {message}

                            </p>

                        </div>

                        {/* Status Cards */}

                        <div className="grid grid-cols-3 gap-4 mt-10">

                            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4 text-center">

                                <Camera
                                    className="mx-auto text-cyan-400"
                                    size={24}
                                />

                                <p className="text-xs text-slate-400 mt-2">

                                    Camera

                                </p>

                                <p className="font-bold text-cyan-400 mt-1">

                                    LIVE

                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4 text-center">

                                <Wifi
                                    className="mx-auto text-green-400"
                                    size={24}
                                />

                                <p className="text-xs text-slate-400 mt-2">

                                    Network

                                </p>

                                <p className="font-bold text-green-400 mt-1">

                                    ONLINE

                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4 text-center">

                                <ShieldCheck
                                    className="mx-auto text-purple-400"
                                    size={24}
                                />

                                <p className="text-xs text-slate-400 mt-2">

                                    Scanner

                                </p>

                                <p className="font-bold text-purple-400 mt-1">

                                    READY

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <AttendanceResultModal

                open={showResult}

                onClose={() => {

                    setShowResult(false);

                    setAttendanceResult(null);

                }}

                type={attendanceResult?.type ?? "FAILED"}

                message={attendanceResult?.message ?? ""}

                teacherName={attendanceResult?.teacherName}

                employeeId={attendanceResult?.employeeId}

                department={attendanceResult?.department}

                attendanceTime={attendanceResult?.attendanceTime}

                deviceName={attendanceResult?.deviceName}

            />

        </div>

    );

}