export type Device = {
    id: number;
    deviceEPid: string;
    location: string;
    password: string;
    status: "Active" | "Inactive";
};

export interface DeviceFormData {
    location: string;
    password: string;
}