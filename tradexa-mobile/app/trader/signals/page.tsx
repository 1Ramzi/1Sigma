"use client";

import { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import Link from "next/link";
import { TrendingUp, PlusCircle, Filter } from "lucide-react";

const mockSignals = [
    { id: "s1", pair: "EUR/USD", direction: "buy", market: "Forex", timeframe: "H4", entryPrice: 1.0892, stopLoss: 1.0850, tp1: 1.0950, status: "active", result: null, followers: 245, pl: 32, tpsHit: [1], upvotes: 45, downvotes: 3 },
    { id: "s2", pair: "BTC/USD", direction: "sell", market: "Crypto", timeframe: "H1", entryPrice: 52340, stopLoss: 53000, tp1: 51000, status: "active", result: null, followers: 189, pl: -12, tpsHit: [], upvotes: 28, downvotes: 8 },
    { id: "s3", pair: "XAU/USD", direction: "buy", market: "Commodities", timeframe: "D1", entryPrice: 2025, stopLoss: 2010, tp1: 2060, status: "active", result: null, followers: 312, pl: 67, tpsHit: [1, 2], upvotes: 78, downvotes: 2 },
    { id: "s4", pair: "GBP/JPY", direction: "buy", market: "Forex", timeframe: "H4", entryPrice: 188.50, stopLoss: 187.80, tp1: 189.50, status: "closed", result: "win", followers: 156, pl: 85, tpsHit: [1, 2, 3], upvotes: 62, downvotes: 1 },
    { id: "s5", pair: "ETH/USD", direction: "sell", market: "Crypto", timeframe: "H1", entryPrice: 3120, stopLoss: 3200, tp1: 3000, status: "closed", result: "loss", followers: 201, pl: -45, tpsHit: [], upvotes: 15, downvotes: 22 },
    { id: "s6", pair: "USD/CAD", direction: "sell", market: "Forex", timeframe: "H4", entryPrice: 1.3580, stopLoss: 1.3620, tp1: 1.3500, status: "closed", result: "win", followers: 134, pl: 52, tpsHit: [1], upvotes: 34, downvotes: 4 },
];

export default function TraderSignalsPage() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [marketFilter, setMarketFilter] = useState("all");

    const filtered = mockSignals
        .filter((s) => statusFilter === "all" || s.status === statusFilter)
        .filter((s) => marketFilter === "all" || s.market.toLowerCase() === marketFilter);

    return (
        <MobileLayout title="Mes Signaux" mode="trader">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-h4 font-bold text-t-primary">Signaux</h2>
            </div>
            
            <Link href="/trader/signals/new"
                className="flex items-center justify-center gap-2 w-full h-11 mb-4 bg-emerald-500 text-white rounded-xl text-button font-semibold active:bg-emerald-600 transition-colors">
                <PlusCircle className="w-4 h-4" /> Nouveau Signal
            </Link>

            <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-t-tertiary shrink-0" />
                <div className="flex gap-2 overflow-x-auto pb-1">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-8 px-2 rounded-lg bg-b-surface2 border border-s-border text-caption text-t-primary">
                        <option value="all">Tous</option>
                        <option value="active">Actifs</option>
                        <option value="closed">Fermés</option>
                    </select>
                    <select value={marketFilter} onChange={(e) => setMarketFilter(e.target.value)}
                        className="h-8 px-2 rounded-lg bg-b-surface2 border border-s-border text-caption text-t-primary">
                        <option value="all">Marché</option>
                        <option value="forex">Forex</option>
                        <option value="crypto">Crypto</option>
                        <option value="commodities">Matières</option>
                    </select>
                </div>
            </div>

            <p className="text-[11px] text-t-tertiary mb-2">{filtered.length} signal{filtered.length > 1 ? "s" : ""}</p>

            <div className="space-y-2">
                {filtered.length === 0 && (
                    <div className="card !p-8 text-center">
                        <p className="text-body-2 text-t-secondary">Aucun signal trouvé.</p>
                    </div>
                )}
                {filtered.map((sig) => (
                    <div key={sig.id} className="card !p-3">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                sig.direction === "buy" ? "bg-emerald-500/10" : "bg-red-500/10"
                            }`}>
                                <TrendingUp className={`w-4 h-4 ${
                                    sig.direction === "buy" ? "text-emerald-500" : "text-red-500 rotate-180"
                                }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-body-2 font-bold text-t-primary">{sig.pair}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                                        sig.direction === "buy" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                    }`}>{sig.direction.toUpperCase()}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                                        sig.status === "active" ? "bg-blue-500/10 text-blue-500" :
                                        sig.result === "win" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                    }`}>{sig.status === "active" ? "Actif" : sig.result === "win" ? "Win" : "Loss"}</span>
                                </div>
                                <p className="text-[10px] text-t-tertiary mt-0.5">
                                    {sig.market} • {sig.timeframe} • E: {sig.entryPrice} • SL: {sig.stopLoss}
                                </p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className={`text-caption font-mono font-semibold ${sig.pl >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                                    {sig.pl >= 0 ? "+" : ""}{sig.pl} pips
                                </p>
                                <p className="text-[10px] text-t-tertiary">{sig.followers} foll.</p>
                            </div>
                        </div>
                        {sig.tpsHit.length > 0 && (
                            <div className="flex gap-1.5 mt-2 ml-13">
                                {sig.tpsHit.map((tp) => (
                                    <span key={tp} className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold">TP{tp} ✓</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </MobileLayout>
    );
}
