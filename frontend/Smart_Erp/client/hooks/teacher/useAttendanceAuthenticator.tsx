import { useCallback, useEffect, useState } from "react";
import useAttendanceSocket from "./useAttendanceSocket";

import { useAuth } from "@/services/authContext";


import {
    AttendanceStatusType,
    QRCodeResponse,
    TodayAttendance,
    ActivityItem,
} from "@/types/teacher/MyAttendence";

import {
    generateQr,
    refreshQr,
    getTodayAttendance,
    getRecentActivity,
} from "@/services/teacher/myattendanceService";

import useCountdown from "./useCountdown";

export default function useAttendanceAuthenticator() {

    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [status, setStatus] =
        useState<AttendanceStatusType>("READY");

    const [qr, setQr] =
        useState<QRCodeResponse | null>(null);

    const [todayAttendance, setTodayAttendance] =
        useState<TodayAttendance | null>(null);

    const [recentActivity, setRecentActivity] =
        useState<ActivityItem[]>([]);

    /**
     * Countdown
     */

    const countdown = useCountdown({
        duration: 60,
        autoStart: false,
        onExpire: () => {
            setStatus("EXPIRED");
        },
    });

    useAttendanceSocket({

        teacherId: user?.id ?? 0,

        onEvent: (event) => {
            setStatus(event.status);
            setTodayAttendance(event.todayAttendance);
            setRecentActivity(event.recentActivity);
        }

    });

    /**
     * Load whole page
     */

    const load = async () => {

        setLoading(true);

        try {

            const [

                qr,

                attendance,

                activity

            ] = await Promise.all([

                generateQr(),

                getTodayAttendance(),

                getRecentActivity()

            ]);

            setQr(qr);

            setTodayAttendance(attendance);

            setRecentActivity(activity);

            countdown.restart();

            setStatus("WAITING");

        } catch (error) {

            setError("Unable to load page.");

        } finally {

            setLoading(false);

        }

    };

    /**
     * Refresh QR
     */

    const generateNewQr = async () => {

        const qr = await refreshQr();

        setQr(qr);

        countdown.restart();

    };

    /**
     * QR successfully scanned
     */

    const markScanned = () => {

        setStatus("SCANNED");

    };

    /**
     * Attendance marked
     */

    const markSuccess = () => {

        setStatus("SUCCESS");

    };

    /**
     * Attendance failed
     */

    const markFailed = () => {

        setStatus("FAILED");

    };

    useEffect(() => {

        load();

    }, []);

    return {

        error,

        load,

        generateNewQr,

        markScanned,

        markSuccess,

        markFailed,

        loading,

        status,

        qr,

        todayAttendance,

        recentActivity,

        countdown


    };

}