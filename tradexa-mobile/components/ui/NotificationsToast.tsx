"use client";

import { useNotificationStore } from "@/stores/notificationStore";
import { useEffect, useState } from "react";
import { X, CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function NotificationsToast() {
    const { notifications, removeNotification } = useNotificationStore();
    const [activeToasts, setActiveToasts] = useState<string[]>([]);

    // Simple effect to show new unread notifications as toasts for 5 seconds
    useEffect(() => {
        const unread = notifications.filter((n) => !n.read && !activeToasts.includes(n.id));
        if (unread.length > 0) {
            unread.forEach((n) => {
                setActiveToasts((prev) => [...prev, n.id]);
                setTimeout(() => {
                    setActiveToasts((prev) => prev.filter((id) => id !== n.id));
                }, 5000);
            });
        }
    }, [notifications]);

    const getIcon = (type: string) => {
        switch (type) {
            case "success": return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case "error": return <XCircle className="w-5 h-5 text-red-500" />;
            case "warning": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="fixed top-16 left-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {activeToasts.map((id) => {
                    const notification = notifications.find((n) => n.id === id);
                    if (!notification) return null;

                    return (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                            className="pointer-events-auto w-full bg-b-surface2 border border-s-border shadow-lg rounded-2xl p-4 flex items-start gap-3"
                        >
                            <div className="shrink-0">{getIcon(notification.type)}</div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <p className="text-body-2 font-bold text-t-primary">{notification.title}</p>
                                <p className="text-caption text-t-secondary mt-0.5">{notification.message}</p>
                            </div>
                            <button
                                onClick={() => setActiveToasts((prev) => prev.filter((t) => t !== id))}
                                className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-t-tertiary hover:bg-b-surface1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
