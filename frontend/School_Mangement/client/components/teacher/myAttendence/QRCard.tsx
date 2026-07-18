import { useRef } from "react";
import { QrCode } from "lucide-react";

import CountdownTimer from "./CountdownTimer";
import AttendanceStatus from "./AttendanceStatus";
import ActionButtons from "./ActionButtons";
import QRCode from "react-qr-code";

import type { AttendanceStatusType } from "@/types/teacher/MyAttendence";

interface QRCardProps {
    token?: string;
    loading?: boolean;
    expired: boolean;
    status: AttendanceStatusType;
    secondsLeft: number;
    percentage: number;
    onGenerateQr: () => void;
}

export default function QRCard({
    token,
    loading = false,
    expired,
    status,
    secondsLeft,
    percentage,
    onGenerateQr,
}: QRCardProps) {

    const qrContainerRef = useRef<HTMLDivElement>(null);

    const handleFullScreen = async () => {

        if (!qrContainerRef.current) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
            return;
        }

        await qrContainerRef.current.requestFullscreen();
    };

    return (
        <div className="rounded-3xl border bg-white dark:bg-slate-900 shadow-sm">

            {/* Header */}

            <div className="border-b px-6 py-5">

                <h2 className="text-xl font-bold">
                    Attendance Authenticator
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Scan this QR at the institute scanner.
                </p>

            </div>

            <div className="p-8">

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Left */}

                    <div
                        ref={qrContainerRef}
                        className="flex flex-col items-center justify-center"
                    >

                        <div
                            className={`
                                flex
                                h-80
                                w-80
                                items-center
                                justify-center
                                rounded-3xl
                                border-2
                                bg-white
                                transition

                                ${expired
                                    ? "opacity-40 grayscale blur-[2px]"
                                    : ""
                                }
                            `}
                        >

                            {token ? (

                                <QRCode
                                    value={token}
                                    size={260}
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                />

                            ) : (

                                <div className="text-center">

                                    <QrCode
                                        size={100}
                                        className="mx-auto text-slate-400"
                                    />

                                    <p className="mt-3 text-slate-500">
                                        QR Not Available
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                    {/* Right */}

                    <div className="space-y-8">

                        <CountdownTimer
                            secondsLeft={secondsLeft}
                            percentage={percentage}
                        />

                        <AttendanceStatus
                            status={status}
                        />

                        <ActionButtons
                            loading={loading}
                            onGenerateQr={onGenerateQr}
                            onFullScreen={handleFullScreen}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}