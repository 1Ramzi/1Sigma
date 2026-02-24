"use client";

import MobileLayout from "@/components/MobileLayout";
import Link from "next/link";
import { TrendingUp, Signal, Target, Users, BarChart3 } from "lucide-react";

const stats = [
    { title: "Signaux Totaux", value: "47", sub: "5 actifs", icon: Signal, bg: "bg-emerald-500/10", color: "text-emerald-500" },
    { title: "Win Rate", value: "78.5%", sub: "30 derniers jours", icon: Target, bg: "bg-blue-500/10", color: "text-blue-500" },
    { title: "Followers", value: "1,247", sub: "~26 par signal", icon: Users, bg: "bg-purple-500/10", color: "text-purple-500" },
    { title: "Signaux Actifs", value: "5", icon: TrendingUp, bg: "bg-emerald-500/10", color: "text-emerald-500" },
    { title: "Moy. Followers", value: "26", icon: BarChart3, bg: "bg-cyan-500/10", color: "text-cyan-500" },
];

const activeSignals = [
    { id: "s1", pair: "EUR/USD", direction: "buy", market: "Forex", followers: 245, pl: 32 },
    { id: "s2", pair: "BTC/USD", direction: "sell", market: "Crypto", followers: 189, pl: -12 },
    { id: "s3", pair: "XAU/USD", direction: "buy", market: "Commodities", followers: 312, pl: 67 },
    { id: "s4", pair: "GBP/JPY", direction: "buy", market: "Forex", followers: 156, pl: 18 },
    { id: "s5", pair: "ETH/USD", direction: "sell", market: "Crypto", followers: 201, pl: 45 },
];

export default function TraderDashboard() {
    return (
        <MobileLayout title="Dashboard" mode="trader">
            <div className="flex items-center justify-between mb-6 px-2 mt-2">
                <h2 className="text-h4 font-bold text-t-primary">Aperçu</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                {stats.map((s) => (
                    <div key={s.title} className="bg-b-surface2 rounded-2xl p-4 shadow-sm border border-s-stroke2 relative overflow-hidden">
                        <div className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full ${s.bg} blur-2xl opacity-50 pointer-events-none`}></div>
                        <div className="flex items-center gap-2 mb-3 relative z-10">
                            <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center shadow-sm`}>
                                <s.icon className={`w-4 h-4 ${s.color}`} />
                            </div>
                        </div>
                        <p className="text-h4 font-bold text-t-primary relative z-10">{s.value}</p>
                        <p className="text-caption text-t-tertiary mt-1 relative z-10 font-medium">{s.title}</p>
                        {s.sub && <p className="text-[10px] text-t-secondary/60 mt-0.5 relative z-10">{s.sub}</p>}
                    </div>
                ))}
            </div>
            <div className="bg-b-surface2 rounded-[24px] p-5 shadow-sm border border-s-stroke2 mb-8">
                <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="text-sub-title-1 font-bold">Signaux Actifs</h3>
                    <Link href="/trader/signals" className="text-caption font-bold text-emerald-500 hover:text-emerald-600 transition-colors">Voir tout</Link>
                </div>
                <div className="space-y-3">
                    {activeSignals.map((sig) => (
                        <div key={sig.id} className="flex items-center gap-4 p-3 rounded-2xl bg-b-surface1">
                            <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 ${
                                sig.direction === "buy" ? "bg-emerald-500/10" : "bg-red-500/10"
                            }`}>
                                <TrendingUp className={`w-5 h-5 ${
                                    sig.direction === "buy" ? "text-emerald-500" : "text-red-500 rotate-180"
                                }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sub-title-1 font-bold text-t-primary">{sig.pair}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold tracking-wide ${
                                        sig.direction === "buy" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                    }`}>{sig.direction.toUpperCase()}</span>
                                </div>
                                <p className="text-caption font-medium text-t-tertiary">{sig.market} • <span className="text-t-secondary">{sig.followers}</span> followers</p>
                            </div>
                            <p className={`text-body-2 font-mono font-bold ${sig.pl >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                                {sig.pl >= 0 ? "+" : ""}{sig.pl} pips
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
