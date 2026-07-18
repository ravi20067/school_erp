interface CountdownTimerProps {
    secondsLeft: number;
    percentage: number;
}

export default function CountdownTimer({
    secondsLeft,
    percentage,
}: CountdownTimerProps) {

    const radius = 65;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset =
        circumference - (percentage / 100) * circumference;

    const getColor = () => {
        if (percentage > 50) return "#22C55E"; // Green
        if (percentage > 20) return "#F59E0B"; // Orange
        return "#EF4444"; // Red
    };

    return (
        <div className="flex flex-col items-center">

            <div className="relative">

                <svg
                    width={170}
                    height={170}
                    className="-rotate-90"
                >

                    {/* Background */}

                    <circle
                        cx="85"
                        cy="85"
                        r={radius}
                        strokeWidth="10"
                        fill="none"
                        className="stroke-slate-200 dark:stroke-slate-700"
                    />

                    {/* Progress */}

                    <circle
                        cx="85"
                        cy="85"
                        r={radius}
                        stroke={getColor()}
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{
                            transition:
                                "stroke-dashoffset 1s linear, stroke 0.5s",
                        }}
                    />

                </svg>

                {/* Center */}

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        items-center
                        justify-center
                    "
                >
                    <span className="text-4xl font-bold">
                        {secondsLeft}
                    </span>

                    <span className="text-xs text-slate-500">
                        seconds
                    </span>

                </div>

            </div>

        </div>
    );
}