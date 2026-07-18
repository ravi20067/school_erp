import {
    RefreshCw,
    Maximize2,
    LoaderCircle,
} from "lucide-react";

interface ActionButtonsProps {
    loading?: boolean;
    onGenerateQr: () => void;
    onFullScreen: () => void;
}

export default function ActionButtons({
    loading = false,
    onGenerateQr,
    onFullScreen,
}: ActionButtonsProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4">

            <button
                onClick={onGenerateQr}
                disabled={loading}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-primary
                    to-secondary
                    px-5
                    py-3
                    text-white
                    font-medium
                    shadow-lg
                    transition
                    hover:scale-[1.02]
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                "
            >
                {loading ? (
                    <LoaderCircle
                        size={18}
                        className="animate-spin"
                    />
                ) : (
                    <RefreshCw size={18} />
                )}

                Generate New QR
            </button>

            <button
                onClick={onFullScreen}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-300
                    dark:border-slate-700
                    bg-white
                    dark:bg-slate-900
                    px-5
                    py-3
                    font-medium
                    transition
                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                "
            >
                <Maximize2 size={18} />

                Full Screen
            </button>

        </div>
    );
}