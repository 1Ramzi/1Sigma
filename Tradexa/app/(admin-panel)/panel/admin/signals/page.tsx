"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { Check, X, Ban, Filter, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Clock, Users, Target, BarChart3, Crown, Zap, Gift } from "lucide-react";

type SignalEntry = {
    id: string; pair: string; trader: string; direction: string;
    status: "pending" | "active" | "removed" | "closed"; followers: number; winRate: string;
    createdAt: string; entryPrice: string; stopLoss: string; tp1: string; tp2?: string; tp3?: string;
    confidence: "low" | "medium" | "high"; timeframe: string; analysis?: string;
    visibility: "free" | "vip" | "premium"; currentPL?: string; tpsHit?: number[];
};

const mockSignals: SignalEntry[] = [
    { id: "sig_001", pair: "EUR/USD", trader: "TraderPro", direction: "BUY", status: "pending", followers: 0, winRate: "78%", createdAt: "17/02/2026 16:00", entryPrice: "1.0852", stopLoss: "1.0820", tp1: "1.0890", tp2: "1.0920", confidence: "high", timeframe: "4h", analysis: "Structure haussière confirmée sur H4. Cassure de la résistance 1.0830 avec volume. RSI en zone neutre, MACD croisement haussier. Ratio R:R favorable.", visibility: "premium" },
    { id: "sig_002", pair: "BTC/USDT", trader: "CryptoKing", direction: "BUY", status: "active", followers: 89, winRate: "72%", createdAt: "17/02/2026 12:00", entryPrice: "67,450", stopLoss: "66,800", tp1: "68,500", tp2: "69,200", tp3: "70,000", confidence: "high", timeframe: "1h", analysis: "Momentum haussier fort sur H1. Support clé à 67,200 testé et tenu.", visibility: "vip", currentPL: "+1.56%", tpsHit: [1] },
    { id: "sig_003", pair: "GOLD", trader: "GoldTrader", direction: "SELL", status: "active", followers: 34, winRate: "70%", createdAt: "16/02/2026 18:00", entryPrice: "2,338", stopLoss: "2,355", tp1: "2,320", tp2: "2,305", confidence: "medium", timeframe: "daily", visibility: "free", currentPL: "-0.34%", tpsHit: [] },
    { id: "sig_004", pair: "GBP/JPY", trader: "ForexMaster", direction: "BUY", status: "closed", followers: 56, winRate: "81%", createdAt: "15/02/2026 09:00", entryPrice: "189.42", stopLoss: "188.80", tp1: "190.20", tp2: "190.80", confidence: "high", timeframe: "4h", visibility: "premium", currentPL: "+0.82%", tpsHit: [1, 2] },
    { id: "sig_005", pair: "NAS100", trader: "TraderPro", direction: "BUY", status: "active", followers: 62, winRate: "78%", createdAt: "15/02/2026 14:00", entryPrice: "18,250", stopLoss: "18,100", tp1: "18,450", tp2: "18,600", confidence: "medium", timeframe: "4h", visibility: "vip", currentPL: "+0.55%", tpsHit: [] },
    { id: "sig_006", pair: "SOL/USDT", trader: "CryptoKing", direction: "SELL", status: "pending", followers: 0, winRate: "72%", createdAt: "17/02/2026 15:30", entryPrice: "142.5", stopLoss: "146.0", tp1: "138.0", confidence: "medium", timeframe: "1h", analysis: "Divergence baissière RSI sur H1. Résistance forte à 144. Volume en baisse progressive.", visibility: "free" },
    { id: "sig_007", pair: "SILVER", trader: "GoldTrader", direction: "BUY", status: "removed", followers: 12, winRate: "70%", createdAt: "14/02/2026 10:00", entryPrice: "24.85", stopLoss: "24.50", tp1: "25.30", confidence: "low", timeframe: "daily", visibility: "free", currentPL: "-1.2%" },
];

const visibilityConfig = {
    free: { label: "Gratuit", icon: Gift, cls: "bg-blue-500/10 text-blue-500" },
    vip: { label: "VIP", icon: Crown, cls: "bg-amber-500/10 text-amber-500" },
    premium: { label: "Premium", icon: Zap, cls: "bg-purple-500/10 text-purple-500" },
};

export default function AdminSignalsPage() {
    const [signals, setSignals] = useState(mockSignals);
    const [filter, setFilter] = useState<"all" | "pending" | "active" | "removed">("all");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const approve = (id: string) => { setSignals((p) => p.map((s) => s.id === id ? { ...s, status: "active" } : s)); };
    const remove = (id: string) => { setSignals((p) => p.map((s) => s.id === id ? { ...s, status: "removed" } : s)); };
    const toggle = (id: string) => setExpandedId((prev) => prev === id ? null : id);

    const filtered = filter === "all" ? signals : signals.filter((s) => s.status === filter);
    const pendingCount = signals.filter((s) => s.status === "pending").length;

    const statusLabel = (s: string) => {
        if (s === "pending") return { text: "En attente", cls: "bg-amber-500/10 text-amber-500" };
        if (s === "active") return { text: "Actif", cls: "bg-emerald-500/10 text-emerald-500" };
        if (s === "removed") return { text: "Supprimé", cls: "bg-red-500/10 text-red-500" };
        return { text: "Fermé", cls: "bg-b-surface1 text-t-tertiary" };
    };

    const confLabel = (c: string) => {
        if (c === "high") return { text: "Haute", cls: "text-emerald-500" };
        if (c === "medium") return { text: "Moyenne", cls: "text-amber-500" };
        return { text: "Faible", cls: "text-red-500" };
    };

    return (
        <AdminLayout title="Signaux">
            <div className="flex flex-wrap items-center gap-2 mb-6">
                <Filter className="w-4 h-4 text-t-tertiary" />
                {(["all", "pending", "active", "removed"] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`h-9 px-3 rounded-lg text-caption border transition-colors ${filter === f ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                        {f === "all" ? "Tous" : f === "pending" ? `En attente (${pendingCount})` : f === "active" ? "Actifs" : "Supprimés"}
                    </button>
                ))}
                <span className="text-caption text-t-tertiary ml-auto">{filtered.length} signal{filtered.length > 1 ? "x" : ""}</span>
            </div>

            <div className="space-y-2">
                {filtered.map((s) => {
                    const sl = statusLabel(s.status);
                    const cl = confLabel(s.confidence);
                    const vc = visibilityConfig[s.visibility];
                    const VIcon = vc.icon;
                    const expanded = expandedId === s.id;
                    return (
                        <div key={s.id} className={`card !p-0 overflow-hidden ${s.status === "pending" ? "border-l-2 border-l-amber-500" : ""}`}>
                            <div className="flex flex-col sm:flex-row items-start gap-3 p-4 cursor-pointer" onClick={() => toggle(s.id)}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.direction === "BUY" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                                    {s.direction === "BUY" ? <TrendingUp className="w-5 h-5 text-emerald-500" /> : <TrendingDown className="w-5 h-5 text-red-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="text-body-2 font-bold">{s.pair}</span>
                                        <span className={`text-caption px-2 py-0.5 rounded-full ${s.direction === "BUY" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>{s.direction}</span>
                                        <span className={`text-caption px-2 py-0.5 rounded-full ${sl.cls}`}>{sl.text}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${vc.cls}`}><VIcon className="w-3 h-3" />{vc.label}</span>
                                        {s.currentPL && (
                                            <span className={`text-caption font-semibold ${s.currentPL.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>{s.currentPL}</span>
                                        )}
                                    </div>
                                    <p className="text-caption text-t-secondary">
                                        Par <strong>{s.trader}</strong> ({s.winRate}) • Entrée: {s.entryPrice} • SL: {s.stopLoss} • {s.followers} followers • {s.createdAt}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                        {s.status === "pending" && (
                                            <>
                                                <button onClick={() => approve(s.id)} className="h-9 px-3 rounded-lg bg-emerald-500 text-white text-caption font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-1">
                                                    <Check className="w-3.5 h-3.5" /> Accepter
                                                </button>
                                                <button onClick={() => remove(s.id)} className="h-9 px-3 rounded-lg bg-b-surface1 border border-s-border text-caption text-t-secondary hover:text-red-500 hover:border-red-500/30 transition-colors flex items-center gap-1">
                                                    <X className="w-3.5 h-3.5" /> Refuser
                                                </button>
                                            </>
                                        )}
                                        {s.status === "active" && (
                                            <button onClick={() => remove(s.id)} className="h-9 px-3 rounded-lg bg-red-500/10 border border-red-500/20 text-caption text-red-500 hover:bg-red-500/20 transition-colors flex items-center gap-1">
                                                <Ban className="w-3.5 h-3.5" /> Supprimer
                                            </button>
                                        )}
                                    </div>
                                    {expanded ? <ChevronUp className="w-4 h-4 text-t-tertiary" /> : <ChevronDown className="w-4 h-4 text-t-tertiary" />}
                                </div>
                            </div>

                            {expanded && (
                                <div className="border-t border-s-border bg-b-surface1/30 p-4 space-y-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                                        <div className="p-2.5 rounded-lg bg-b-surface1">
                                            <p className="text-[10px] text-t-tertiary uppercase tracking-wide mb-0.5">Entrée</p>
                                            <p className="text-body-2 font-mono font-semibold">{s.entryPrice}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-b-surface1">
                                            <p className="text-[10px] text-t-tertiary uppercase tracking-wide mb-0.5">Stop Loss</p>
                                            <p className="text-body-2 font-mono font-semibold text-red-500">{s.stopLoss}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-b-surface1">
                                            <p className="text-[10px] text-t-tertiary uppercase tracking-wide mb-0.5">TP1 {s.tpsHit?.includes(1) ? "✅" : ""}</p>
                                            <p className="text-body-2 font-mono font-semibold text-emerald-500">{s.tp1}</p>
                                        </div>
                                        {s.tp2 && <div className="p-2.5 rounded-lg bg-b-surface1">
                                            <p className="text-[10px] text-t-tertiary uppercase tracking-wide mb-0.5">TP2 {s.tpsHit?.includes(2) ? "✅" : ""}</p>
                                            <p className="text-body-2 font-mono font-semibold text-emerald-500">{s.tp2}</p>
                                        </div>}
                                        {s.tp3 && <div className="p-2.5 rounded-lg bg-b-surface1">
                                            <p className="text-[10px] text-t-tertiary uppercase tracking-wide mb-0.5">TP3</p>
                                            <p className="text-body-2 font-mono font-semibold text-emerald-500">{s.tp3}</p>
                                        </div>}
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <div className="flex items-center gap-2 text-caption text-t-secondary">
                                            <Target className="w-3.5 h-3.5" /> Confiance: <span className={`font-semibold ${cl.cls}`}>{cl.text}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-caption text-t-secondary">
                                            <Clock className="w-3.5 h-3.5" /> TF: <span className="font-semibold text-t-primary">{s.timeframe}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-caption text-t-secondary">
                                            <Users className="w-3.5 h-3.5" /> {s.followers} followers
                                        </div>
                                        <div className="flex items-center gap-2 text-caption text-t-secondary">
                                            <BarChart3 className="w-3.5 h-3.5" /> Win rate: <span className="font-semibold text-t-primary">{s.winRate}</span>
                                        </div>
                                    </div>
                                    {s.analysis && (
                                        <div className="p-3 rounded-xl bg-b-surface2 border border-s-border">
                                            <p className="text-[10px] text-t-tertiary uppercase tracking-wide mb-1">Analyse du trader</p>
                                            <p className="text-body-2 text-t-secondary">{s.analysis}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
