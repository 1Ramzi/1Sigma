"use client";

import MobileLayout from "@/components/MobileLayout";
import { Users, Signal, UserCheck, TrendingUp, AlertTriangle } from "lucide-react";

const stats = [
    { title: "Utilisateurs", value: "3,247", sub: "+124 ce mois", icon: Users, bg: "bg-blue-500/10", color: "text-blue-500" },
    { title: "Traders Actifs", value: "12", sub: "8 en ligne", icon: UserCheck, bg: "bg-emerald-500/10", color: "text-emerald-500" },
    { title: "Signaux Actifs", value: "34", sub: "156 ce mois", icon: Signal, bg: "bg-purple-500/10", color: "text-purple-500" },
    { title: "Win Rate Global", value: "76.3%", icon: TrendingUp, bg: "bg-emerald-500/10", color: "text-emerald-500" },
    { title: "Signalements", value: "3", sub: "2 en attente", icon: AlertTriangle, bg: "bg-red-500/10", color: "text-red-500" },
];

const users = [
    { name: "user_ahmed92", email: "a***@gmail.com", status: "Actif", date: "17/02/2026" },
    { name: "crypto_sarah", email: "s***@hotmail.com", status: "Actif", date: "17/02/2026" },
    { name: "fx_trader_01", email: "f***@yahoo.com", status: "Nouveau", date: "16/02/2026" },
    { name: "invest_marc", email: "m***@gmail.com", status: "Actif", date: "16/02/2026" },
    { name: "trading_julie", email: "j***@outlook.com", status: "Suspendu", date: "15/02/2026" },
];

const traders = [
    { name: "TraderPro", signals: 156, winRate: 78.5, followers: 1247 },
    { name: "CryptoKing", signals: 89, winRate: 72.1, followers: 834 },
    { name: "ForexMaster", signals: 203, winRate: 81.2, followers: 1523 },
    { name: "GoldTrader", signals: 67, winRate: 69.8, followers: 456 },
];

export default function AdminDashboard() {
    return (
        <MobileLayout title="Dashboard Admin" mode="admin">
            {/* Stats grid - 2 col on mobile */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                {stats.map((s) => (
                    <div key={s.title} className="card !p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                                <s.icon className={`w-4 h-4 ${s.color}`} />
                            </div>
                        </div>
                        <p className="text-h5 font-bold text-t-primary">{s.value}</p>
                        <p className="text-[11px] text-t-tertiary mt-0.5">{s.title}</p>
                        {s.sub && <p className="text-[10px] text-t-secondary">{s.sub}</p>}
                    </div>
                ))}
            </div>

            {/* Recent users */}
            <div className="card !p-4 mb-3">
                <h3 className="text-body-2 font-semibold mb-3">Derniers Utilisateurs</h3>
                <div className="space-y-2">
                    {users.map((u, i) => (
                        <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-b-surface1">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-[10px] font-bold shrink-0">
                                {u.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-caption font-medium text-t-primary truncate">{u.name}</p>
                                <p className="text-[10px] text-t-tertiary">{u.email}</p>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                u.status === "Actif" ? "bg-emerald-500/10 text-emerald-500" :
                                u.status === "Nouveau" ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                            }`}>{u.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Traders performance */}
            <div className="card !p-4">
                <h3 className="text-body-2 font-semibold mb-3">Traders Performance</h3>
                <div className="space-y-2">
                    {traders.map((t, i) => (
                        <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-b-surface1">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-[10px] font-bold shrink-0">
                                {t.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-caption font-medium text-t-primary">{t.name}</p>
                                <p className="text-[10px] text-t-tertiary">{t.signals} signaux • {t.followers} followers</p>
                            </div>
                            <p className="text-caption font-semibold text-emerald-500">{t.winRate}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
