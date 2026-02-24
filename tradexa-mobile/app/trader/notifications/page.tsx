"use client";

import MobileLayout from "@/components/MobileLayout";
import { useNotificationStore } from "@/stores/notificationStore";
import { CheckCircle, Info, AlertTriangle, XCircle, Trash2, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationsPage() {
    const { notifications, markAsRead, markAllAsRead, removeNotification } = useNotificationStore();

    const getIcon = (type: string) => {
        switch (type) {
            case "success": return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case "error": return <XCircle className="w-5 h-5 text-red-500" />;
            case "warning": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `Il y a ${mins} min`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `Il y a ${hours} h`;
        return date.toLocaleDateString("fr-FR");
    };

    return (
        <MobileLayout title="Notifications" mode="trader">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-h4 font-bold text-t-primary">Notifications</h2>
                {notifications.length > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center gap-1.5 text-caption text-emerald-500 font-medium active:opacity-70 transition-opacity"
                    >
                        <CheckSquare className="w-4 h-4" /> Tout marquer lu
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="card !p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-16 h-16 rounded-full bg-b-surface2 flex items-center justify-center mb-4">
                        <Info className="w-8 h-8 text-t-tertiary" />
                    </div>
                    <p className="text-body-2 font-medium text-t-secondary mb-1">Aucune notification</p>
                    <p className="text-caption text-t-tertiary">Vous êtes à jour !</p>
                </div>
            ) : (
                <div className="space-y-2">
                    <AnimatePresence>
                        {notifications.map((n) => (
                            <motion.div
                                key={n.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`card !p-4 flex items-start gap-3 transition-colors ${
                                    n.read ? "opacity-70" : "border border-s-stroke2 shadow-sm"
                                }`}
                                onClick={() => !n.read && markAsRead(n.id)}
                            >
                                <div className="shrink-0 pt-0.5">{getIcon(n.type)}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                        <p className={`text-body-2 font-bold truncate ${n.read ? "text-t-secondary" : "text-t-primary"}`}>
                                            {n.title}
                                        </p>
                                        <span className="text-[10px] text-t-tertiary shrink-0">
                                            {formatDate(n.createdAt)}
                                        </span>
                                    </div>
                                    <p className={`text-caption ${n.read ? "text-t-tertiary" : "text-t-secondary"}`}>
                                        {n.message}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-t-tertiary hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </MobileLayout>
    );
}
