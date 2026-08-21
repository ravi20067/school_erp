import useAttendanceAuthenticator from "@/hooks/teacher/useAttendanceAuthenticator";

import QRCard from "./QRCard";
import TodayAttendanceCard from "./TodayAttendanceCard";
import RecentActivity from "./RecentActivity";

export default function AttendanceAuthenticator() {

    const {

        loading,

        status,

        qr,

        todayAttendance,

        recentActivity,

        countdown,

        generateNewQr,

    } = useAttendanceAuthenticator();

    return (

        <div className="space-y-6">

            {/* Page Heading */}

            <div>

                <h1 className="text-3xl font-bold tracking-tight">

                    Attendance Authenticator

                </h1>

                <p className="mt-2 text-slate-500">

                    Generate a secure QR code for attendance verification.

                </p>

            </div>

            {/* QR */}

            <QRCard

                token={qr?.token}

                loading={loading}

                expired={countdown.expired}

                status={status}

                secondsLeft={countdown.secondsLeft}

                percentage={countdown.percentage}

                onGenerateQr={generateNewQr}

            />

            {/* Bottom */}

            <div className="grid gap-6 xl:grid-cols-2">

                <TodayAttendanceCard

                    attendance={todayAttendance}

                />

                <RecentActivity

                    activity={recentActivity}

                />

            </div>

        </div>

    );

}