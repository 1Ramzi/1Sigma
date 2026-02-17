"use client";

import { useState } from "react";
import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { Bell, UserPlus, TrendingUp, MessageSquare, DollarSign, CheckCheck, Trash2 } from "lucide-react";

type Notification = {
    id: string; type: "follower" | "signal" | "feedback" | "payout" | "system";
    title: string; message: string; time: string; read: boolean;
};

const mockNotifications: Notification[] = [
    { id: "n1", type: "follower", title: "Nouveau follower", message: "+12 nouveaux followers cette semaine", time: "Il y a 5 min", read: false },
    { id: "n2", type: "signal", title: "Signal EUR/USD", message: "TP1 atteint ! +45 pips de profit", time: "Il y a 23 min", read: false },
    { id: "n3", type: "feedback", title: "Nouveau commentaire", message: "Un utilisateur a commenté votre signal BTC/USDT", time: "Il y a 1h", read: false },
    { id: "n4", type: "payout", title: "Paiement reçu", message: "Virement de 1,250€ effectué sur votre compte", time: "Il y a 3h", read: true },
    { id: "n5", type: "system", title: "Mise à jour plateforme", message: "Nouvelle fonctionnalité: Analyse IA disponible pour vos signaux", time: "Il y a 6h", read: true },
    { id: "n6", type: "signal", title: "Signal GOLD", message: "Stop Loss touché sur GOLD — Signal fermé en perte", time: "Il y a 8h", read: true },
    { id: "n7", type: "follower", title: "Milestone", message: "Vous avez atteint 1,000 followers ! 🎉", time: "Hier", read: true },
    { id: "n8", type: "feedback", title: "Avis supprimé", message: "L'admin a approuvé votre demande de suppression d'avis", time: "Hier", read: true },
    { id: "n9", type: "payout", title: "Revenus du mois", message: "Vos revenus de Janvier: 2,340€ — Paiement en cours", time: "Il y a 2j", read: true },
    { id: "n10", type: "system", title: "Alerte approuvée", message: "Votre alerte promotionnelle a été approuvée par l'admin", time: "Il y a 3j", read: true },
];

const iconMap = {
    follower: { icon: UserPlus, color: "bg-blue-500/10 text-blue-500" },
    signal: { icon: TrendingUp, color: "bg-emerald-500/10 text-emerald-500" },
    feedback: { icon: MessageSquare, color: "bg-purple-500/10 text-purple-500" },
    payout: { icon: DollarSign, color: "bg-amber-500/10 text-amber-500" },
    system: { icon: Bell, color: "bg-red-500/10 text-red-500" },
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState<"all" | "unread">("all");

    const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    const deleteNotif = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));
    const toggleRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: !n.read } : n));

    const unreadCount = notifications.filter((n) => !n.read).length;
    const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

    return (
        <TraderLayout title="Notifications">
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex gap-2">
                    <button onClick={() => setFilter("all")}
                        className={`h-9 px-4 rounded-lg text-button border transition-colors ${filter === "all" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                        Toutes
                    </button>
                    <button onClick={() => setFilter("unread")}
                        className={`h-9 px-4 rounded-lg text-button border transition-colors ${filter === "unread" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                        Non lues ({unreadCount})
                    </button>
                </div>
                <button onClick={markAllRead} className="ml-auto h-9 px-4 rounded-lg text-caption border border-s-border text-t-secondary hover:text-t-primary transition-colors flex items-center gap-1.5">
                    <CheckCheck className="w-3.5 h-3.5" /> Tout marquer lu
                </button>
            </div>

            <div className="space-y-2">
                {filtered.map((n) => {
                    const { icon: Icon, color } = iconMap[n.type];
                    return (
                        <div key={n.id} className={`card !p-4 flex flex-col sm:flex-row items-start gap-3 transition-colors ${!n.read ? "border-l-2 border-l-emerald-500" : ""}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleRead(n.id)}>
                                <div className="flex items-center gap-2">
                                    <p className={`text-body-2 ${!n.read ? "font-semibold text-t-primary" : "text-t-secondary"}`}>{n.title}</p>
                                    {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                                </div>
                                <p className="text-body-2 text-t-secondary mt-0.5">{n.message}</p>
                                <p className="text-caption text-t-tertiary mt-1">{n.time}</p>
                            </div>
                            <button onClick={() => deleteNotif(n.id)} className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-t-tertiary hover:text-red-500 transition-colors" title="Supprimer">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
                {filtered.length === 0 && (
                    <div className="text-center py-12">
                        <Bell className="w-12 h-12 text-t-tertiary/30 mx-auto mb-3" />
                        <p className="text-body-1 text-t-tertiary">Aucune notification</p>
                    </div>
                )}
            </div>
        </TraderLayout>
    );
}
