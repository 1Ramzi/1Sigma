"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import { liveAlertPool, LiveAlert, LiveAlertType } from "@/mocks/notifications";
import { useUserStore } from "@/stores/userStore";

const ALERT_DURATION = 6000;
const ALERT_INTERVAL_MIN = 8000;
const ALERT_INTERVAL_MAX = 15000;
const MAX_VISIBLE = 3;

const alertStyles: Record<LiveAlertType, { bg: string; border: string; icon: string; iconClass: string }> = {
    buy: { bg: 'bg-primary-02/10', border: 'border-primary-02/30', icon: 'trending-up', iconClass: 'fill-primary-02' },
    sell: { bg: 'bg-primary-03/10', border: 'border-primary-03/30', icon: 'trending-down', iconClass: 'fill-primary-03' },
    tp: { bg: 'bg-primary-04/10', border: 'border-primary-04/30', icon: 'check-circle-fill', iconClass: 'fill-primary-04' },
    sl: { bg: 'bg-primary-03/10', border: 'border-primary-03/30', icon: 'check-circle', iconClass: 'fill-primary-03' },
    info: { bg: 'bg-primary-01/10', border: 'border-primary-01/30', icon: 'info', iconClass: 'fill-primary-01' },
};

let globalMuted = false;
export const setLiveAlertsMuted = (muted: boolean) => { globalMuted = muted; };
export const getLiveAlertsMuted = () => globalMuted;

const LiveAlertStack = () => {
    const router = useRouter();
    const { accountType, role } = useUserStore();
    const isFree = accountType === 'free' && role === 'user';
    const [alerts, setAlerts] = useState<LiveAlert[]>([]);
    const poolIndex = useRef(0);
    const alertIdCounter = useRef(0);

    const dismissAlert = useCallback((id: number) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    }, []);

    const addAlert = useCallback(() => {
        if (globalMuted) return;
        const template = liveAlertPool[poolIndex.current % liveAlertPool.length];
        poolIndex.current++;
        alertIdCounter.current++;

        const newAlert: LiveAlert = {
            ...template,
            id: alertIdCounter.current,
            timestamp: Date.now(),
        };

        setAlerts(prev => {
            const updated = [newAlert, ...prev];
            return updated.slice(0, MAX_VISIBLE + 1);
        });

        setTimeout(() => {
            setAlerts(prev => prev.filter(a => a.id !== newAlert.id));
        }, ALERT_DURATION);
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        const scheduleNext = () => {
            const delay = ALERT_INTERVAL_MIN + Math.random() * (ALERT_INTERVAL_MAX - ALERT_INTERVAL_MIN);
            intervalId = setTimeout(() => {
                addAlert();
                scheduleNext();
            }, delay);
        };
        // First alert after a comfortable delay
        const firstTimeout = setTimeout(() => {
            addAlert();
            scheduleNext();
        }, 4000);

        return () => {
            clearTimeout(firstTimeout);
            clearTimeout(intervalId);
        };
    }, [addAlert]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none max-md:right-3 max-md:bottom-3 max-md:max-w-[calc(100%-1.5rem)]">
            <AnimatePresence mode="popLayout">
                {alerts.slice(0, MAX_VISIBLE).map((alert) => {
                    const style = alertStyles[alert.type];
                    const elapsed = Date.now() - alert.timestamp;
                    const remaining = Math.max(0, ALERT_DURATION - elapsed);

                    return (
                        <motion.div
                            key={alert.id}
                            layout
                            initial={{ opacity: 0, x: 80, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 80, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className={`pointer-events-auto relative overflow-hidden rounded-xl border ${style.border} ${style.bg} backdrop-blur-md shadow-lg cursor-pointer hover:scale-[1.02] transition-transform`}
                            onClick={() => router.push('/signals?view=active')}
                        >
                            {/* Dismiss X button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); dismissAlert(alert.id); }}
                                className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-shade-07/10 hover:bg-shade-07/20 flex items-center justify-center transition-colors"
                                aria-label="Dismiss"
                            >
                                <Icon name="close" className="!size-3.5 fill-t-secondary" />
                            </button>
                            <div className="flex items-start gap-3 p-3.5 pr-10">
                                <div className="shrink-0 mt-0.5">
                                    <Icon name={style.icon} className={`!size-5 ${style.iconClass}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-caption font-bold text-t-primary truncate">{alert.pair}</span>
                                        <span className="text-[10px] text-t-tertiary shrink-0">
                                            {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-caption font-medium text-t-primary">{alert.message}</p>
                                    {alert.detail && (
                                        <p className="text-[11px] text-t-secondary mt-0.5 truncate">
                                            {isFree ? alert.detail.replace(/[\d.,]+/g, '****') : alert.detail}
                                        </p>
                                    )}
                                    {isFree && (
                                        <p className="text-[9px] text-amber-500 mt-0.5 font-medium">Passez en Premium pour voir les détails</p>
                                    )}
                                </div>
                            </div>
                            {/* Cooldown bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-shade-07/10">
                                <motion.div
                                    className={`h-full ${
                                        alert.type === 'buy' ? 'bg-primary-02' :
                                        alert.type === 'sell' || alert.type === 'sl' ? 'bg-primary-03' :
                                        alert.type === 'tp' ? 'bg-primary-04' : 'bg-primary-01'
                                    }`}
                                    initial={{ width: `${(remaining / ALERT_DURATION) * 100}%` }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: remaining / 1000, ease: 'linear' }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default LiveAlertStack;
