import { useEffect, useState } from "react";


import type {
    Device,
    DeviceFormData,
} from "@/types/admin/device";
import { addDevice, getDevices } from "@/services/admin/deviceService";

export default function useDevices() {
    useEffect(() => {
        loadDevices();
    }, []);

    const [deviceList, setDeviceList] = useState<Device[]>([]);

    const [loadingDevices, setLoadingDevices] = useState(false);

    const [addDeviceOpen, setAddDeviceOpen] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [receiptDevice, setReceiptDevice] = useState<any>(null);

    const [errorMsg, setErrorMsg] = useState("");

    const filteredDevices = deviceList;

    const [formData, setFormData] =
        useState<DeviceFormData>({
            location: "",
            password: ""
        });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleCloseAddDevice = () => {
        setAddDeviceOpen(false);
        setReceiptDevice(null);
        setErrorMsg("");
        setFormData({
            location: "",
            password: ""
        });
    };
    const loadDevices = async () => {
        setLoadingDevices(true);

        try {
            const data = await getDevices();
            setDeviceList(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingDevices(false);
        }
    };
    const handleAddDeviceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg("");
        try {
            const data = await addDevice(formData);

            if (data) {
                const newDevice: Device = {
                    id: data.id || Date.now(),
                    deviceEPid: data.deviceEPid || "",
                    location: data.location || "",
                    password: data.password || "",
                    status: data.status
                };
                // Store the newly added student for receipt generation
                setReceiptDevice(newDevice);
                await loadDevices();
            }
        } catch (err: any) {
            console.error("Error creating device:", err);
            setErrorMsg(err.response?.data?.message || "Failed to add device. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };
    const handleDownloadReceipt = (device?: any) => {
        const data = device || receiptDevice;
        if (!data) return;
        const content = `
==================================================
              ACADEMY ELITE SCHOOL
             DEVICE REGISTRATION RECEIPT
==================================================
Date Generated : ${new Date().toLocaleDateString()}
--------------------------------------------------
Device EPid   : ${data.deviceEPid}
Location     : ${data.location}
Password     : ${data.password}
--------------------------------------------------
Status         : PROCESSED & ENROLLED
==================================================
Thank you for registering at Academy Elite.
Please retain this copy for future reference.
==================================================
`;
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `device_registration_receipt_${data.deviceEPid || "device"}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    return {

        // Data
        deviceList,
        filteredDevices,
        formData,
        receiptDevice,

        // Loading
        loadingDevices,
        submitting,

        // Drawer
        addDeviceOpen,
        setAddDeviceOpen,

        // Error
        errorMsg,

        // Actions
        handleFormChange,
        handleCloseAddDevice,
        handleAddDeviceSubmit,
        handleDownloadReceipt,

        // Refresh
        setDeviceList,

    };
}