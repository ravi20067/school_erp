import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type {
    AttendanceSocketEvent,
} from "@/types/teacher/MyAttendence";

interface Props {

    teacherId: number;

    onEvent: (
        event: AttendanceSocketEvent
    ) => void;

}

export default function useAttendanceSocket({

    teacherId,

    onEvent,

}: Props) {

    const clientRef = useRef<Client | null>(null);

    useEffect(() => {

        if (!teacherId) {
            return;
        }

        const socket = new SockJS(
            import.meta.env.VITE_WS_ENDPOINT
        );

        const client = new Client({

            webSocketFactory: () => socket,

            reconnectDelay: 5000,

            debug: () => { },

        });

        client.onConnect = () => {

            console.log("WebSocket Connected");

            client.subscribe(

                `/topic/attendance/${teacherId}`,

                (message) => {

                    const event: AttendanceSocketEvent =
                        JSON.parse(message.body);

                    onEvent(event);

                }

            );

        };

        client.activate();

        clientRef.current = client;

        return () => {

            client.deactivate();

        };

    }, [teacherId]);

}