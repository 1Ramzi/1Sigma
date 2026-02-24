"use client";

import MobileLayout from "@/components/MobileLayout";
import { User, TrendingUp, Signal, Users, Target, MessageSquare } from "lucide-react";

export default function TraderProfilePage() {
    return (
        <MobileLayout title="Mon Profil" mode="trader">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-h4 font-bold text-t-primary">Profil</h2>
            </div>

            {/* Avatar + name */}
            <div className="card !p-5 flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
                    <User className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-h5 font-bold text-t-primary">TraderPro</h2>
                <p className="text-caption text-t-secondary mt-1 text-center">Trader Forex & Crypto depuis 5 ans. Spécialisé en swing trading.</p>
                <div className="flex gap-2 mt-3">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">Swing Trading</span>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 font-medium">Forex</span>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-500 font-medium">Crypto</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                    { label: "Signaux", value: "47", icon: Signal, bg: "bg-emerald-500/10", color: "text-emerald-500" },
                    { label: "Win Rate", value: "78.5%", icon: Target, bg: "bg-blue-500/10", color: "text-blue-500" },
                    { label: "Followers", value: "1,247", icon: Users, bg: "bg-purple-500/10", color: "text-purple-500" },
                    { label: "Feedbacks", value: "89", icon: MessageSquare, bg: "bg-amber-500/10", color: "text-amber-500" },
                ].map((s) => (
                    <div key={s.label} className="card !p-3 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                            <s.icon className={`w-4 h-4 ${s.color}`} />
                        </div>
                        <div>
                            <p className="text-h6 font-bold text-t-primary">{s.value}</p>
                            <p className="text-[10px] text-t-tertiary">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent performance */}
            <div className="card !p-4">
                <h3 className="text-body-2 font-semibold mb-3">Performance récente</h3>
                <div className="space-y-2">
                    {[
                        { pair: "EUR/USD", result: "win", pips: "+32" },
                        { pair: "BTC/USD", result: "loss", pips: "-12" },
                        { pair: "XAU/USD", result: "win", pips: "+67" },
                        { pair: "GBP/JPY", result: "win", pips: "+85" },
                        { pair: "ETH/USD", result: "win", pips: "+45" },
                    ].map((t, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-b-surface1">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                t.result === "win" ? "bg-emerald-500/10" : "bg-red-500/10"
                            }`}>
                                <TrendingUp className={`w-4 h-4 ${
                                    t.result === "win" ? "text-emerald-500" : "text-red-500 rotate-180"
                                }`} />
                            </div>
                            <span className="text-body-2 font-medium text-t-primary flex-1">{t.pair}</span>
                            <span className={`text-caption font-mono font-semibold ${
                                t.result === "win" ? "text-emerald-500" : "text-red-500"
                            }`}>{t.pips} pips</span>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
