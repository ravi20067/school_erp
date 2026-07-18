export type AttendanceStatusType =
    | "READY"
    | "WAITING"
    | "SCANNED"
    | "SUCCESS"
    | "EXPIRED"
    | "FAILED";


export interface QRCodeResponse {
    token: string;
    expiresAt: string;
}

export interface TodayAttendance {
    checkIn?: string;
    checkOut?: string;
    workingHours?: string;
    location?: string;
    status: string;
}

export interface ActivityItem {
    id: number;
    title: string;
    description: string;
    time: string;
    type: ActivityType;
}
export type ActivityType =
    | "GENERATED"
    | "SCANNED"
    | "SUCCESS"
    | "FAILED";

export interface AttendanceScanResponse {
    success: boolean;
    message: string;
    type: "CHECK_IN" | "CHECK_OUT" | "FAILED";
}

export interface AttendanceSocketEvent {

    status: AttendanceStatusType;

    message: string;

    eventTime: string;

    todayAttendance: TodayAttendance;

    recentActivity: ActivityItem[];

}