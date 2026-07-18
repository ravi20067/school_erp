import { useEffect, useMemo, useState } from "react";

interface UseCountdownOptions {
    duration?: number; // seconds
    autoStart?: boolean;
    onExpire?: () => void;
}

export default function useCountdown({
    duration = 60,
    autoStart = true,
    onExpire,
}: UseCountdownOptions = {}) {
    const [secondsLeft, setSecondsLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(autoStart);

    useEffect(() => {
        if (!isRunning) return;

        if (secondsLeft <= 0) {
            setIsRunning(false);
            onExpire?.();
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft, isRunning, onExpire]);

    const restart = (newDuration?: number) => {
        setSecondsLeft(newDuration ?? duration);
        setIsRunning(true);
    };

    const stop = () => {
        setIsRunning(false);
    };

    const start = () => {
        if (secondsLeft > 0) {
            setIsRunning(true);
        }
    };

    const reset = () => {
        setSecondsLeft(duration);
        setIsRunning(false);
    };

    const percentage = useMemo(() => {
        return (secondsLeft / duration) * 100;
    }, [secondsLeft, duration]);

    return {
        secondsLeft,
        percentage,
        expired: secondsLeft === 0,
        isRunning,
        restart,
        stop,
        start,
        reset,
    };
}