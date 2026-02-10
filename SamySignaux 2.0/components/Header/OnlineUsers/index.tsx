"use client";

import { useState, useEffect, useRef } from "react";

const OnlineUsers = ({ className }: { className?: string }) => {
    const [count, setCount] = useState(487);
    const targetRef = useRef(487);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Pick a new target every 4-8 seconds
        const pickTarget = () => {
            const delta = Math.floor(Math.random() * 15) - 5; // -5 to +9 bias up
            targetRef.current = Math.max(380, Math.min(620, targetRef.current + delta));
        };

        const targetInterval = setInterval(pickTarget, 4000 + Math.random() * 4000);

        // Animate count towards target smoothly every 800-1500ms
        const tick = () => {
            setCount((prev) => {
                const target = targetRef.current;
                if (prev === target) return prev;
                const step = prev < target ? 1 : -1;
                // Sometimes jump by 2-3 for realism
                const jump = Math.random() > 0.6 ? Math.min(Math.abs(target - prev), Math.floor(Math.random() * 3) + 1) : 1;
                return prev + step * jump;
            });
            intervalRef.current = setTimeout(tick, 800 + Math.random() * 700);
        };

        intervalRef.current = setTimeout(tick, 1000);

        return () => {
            clearInterval(targetInterval);
            if (intervalRef.current) clearTimeout(intervalRef.current);
        };
    }, []);

    return (
        <div className={`flex items-center gap-2 h-10 px-4 rounded-xl bg-b-surface2 border border-s-border ${className || ""}`}>
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-02 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-02"></span>
            </span>
            <span className="text-body-2 font-semibold text-t-primary tabular-nums">{count}</span>
            <span className="text-caption text-t-tertiary hidden sm:inline">connectés</span>
        </div>
    );
};

export default OnlineUsers;
