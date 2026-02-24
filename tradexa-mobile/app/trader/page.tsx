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
            {/* Stats grid */}
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

            {/* Active signals */}
            <div className="card !p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-body-2 font-semibold">Signaux Actifs</h3>
                    <Link href="/trader/signals" className="text-caption text-emerald-500">Voir tout</Link>
                </div>
                <div className="space-y-2">
                    {activeSignals.map((sig) => (
                        <div key={sig.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-b-surface1">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                sig.direction === "buy" ? "bg-emerald-500/10" : "bg-red-500/10"
                            }`}>
                                <TrendingUp className={`w-4 h-4 ${
                                    sig.direction === "buy" ? "text-emerald-500" : "text-red-500 rotate-180"
                                }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-body-2 font-bold text-t-primary">{sig.pair}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                                        sig.direction === "buy" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                    }`}>{sig.direction.toUpperCase()}</span>
                                </div>
                                <p className="text-[10px] text-t-tertiary">{sig.market} • {sig.followers} followers</p>
                            </div>
                            <p className={`text-caption font-mono font-semibold ${sig.pl >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                                {sig.pl >= 0 ? "+" : ""}{sig.pl} pips
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
