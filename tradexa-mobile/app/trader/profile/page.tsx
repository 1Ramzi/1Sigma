"use client";

import MobileLayout from "@/components/MobileLayout";
import { User, TrendingUp, Signal, Users, Target, MessageSquare } from "lucide-react";

export default function TraderProfilePage() {
    return (
        <MobileLayout title="Mon Profil" mode="trader">
            <div className="flex items-center justify-between mb-6 px-2 mt-2">
                <h2 className="text-h4 font-bold text-t-primary">Profil</h2>
            </div>

            {/* Avatar + name */}
            <div className="bg-b-surface2 rounded-[24px] p-6 shadow-sm border border-s-stroke2 flex flex-col items-center mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                <div className="relative z-10 w-24 h-24 rounded-full bg-b-surface1 border-4 border-b-surface2 shadow-md flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-h4 font-bold text-t-primary relative z-10">TraderPro</h2>
                <p className="text-body-2 text-t-secondary mt-1.5 text-center relative z-10 px-4">Trader Forex & Crypto depuis 5 ans. Spécialisé en swing trading.</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4 relative z-10">
                    <span className="text-[11px] px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold tracking-wide">Swing Trading</span>
                    <span className="text-[11px] px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-500 font-bold tracking-wide">Forex</span>
                    <span className="text-[11px] px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-500 font-bold tracking-wide">Crypto</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                    { label: "Signaux", value: "47", icon: Signal, bg: "bg-emerald-500/10", color: "text-emerald-500" },
                    { label: "Win Rate", value: "78.5%", icon: Target, bg: "bg-blue-500/10", color: "text-blue-500" },
                    { label: "Followers", value: "1,247", icon: Users, bg: "bg-purple-500/10", color: "text-purple-500" },
                    { label: "Feedbacks", value: "89", icon: MessageSquare, bg: "bg-amber-500/10", color: "text-amber-500" },
                ].map((s) => (
                    <div key={s.label} className="bg-b-surface2 rounded-2xl p-4 shadow-sm border border-s-stroke2 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                            <s.icon className={`w-5 h-5 ${s.color}`} />
                        </div>
                        <div>
                            <p className="text-h5 font-bold text-t-primary">{s.value}</p>
                            <p className="text-caption text-t-tertiary font-medium">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent performance */}
            <div className="bg-b-surface2 rounded-[24px] p-5 shadow-sm border border-s-stroke2 mb-4">
                <h3 className="text-sub-title-1 font-bold mb-4">Performance récente</h3>
                <div className="space-y-3">
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
