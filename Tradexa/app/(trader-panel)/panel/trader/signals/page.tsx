"use client";

import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import Link from "next/link";
import { TrendingUp, PlusCircle, Filter } from "lucide-react";

export default function SignalsPage() {
    const { filteredSignals, filters, setFilter } = useTraderStore();
    const signals = filteredSignals();

    return (
        <TraderLayout title="Mes Signaux">
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                    href="/panel/trader/signals/new"
                    className="inline-flex items-center gap-2 h-10 px-5 bg-emerald-500 text-white rounded-xl text-button font-semibold hover:bg-emerald-600 transition-colors"
                >
                    <PlusCircle className="w-4 h-4" />
                    Nouveau Signal
                </Link>
                <div className="flex items-center gap-2 ml-auto flex-wrap">
                    <Filter className="w-4 h-4 text-t-tertiary" />
                    <select
                        value={filters.status}
                        onChange={(e) => setFilter("status", e.target.value)}
                        className="h-9 px-3 rounded-lg bg-b-surface2 border border-s-border text-body-2 text-t-primary"
                    >
                        <option value="all">Tous</option>
                        <option value="active">Actifs</option>
                        <option value="closed">Fermés</option>
                    </select>
                    <select
                        value={filters.result}
                        onChange={(e) => setFilter("result", e.target.value)}
                        className="h-9 px-3 rounded-lg bg-b-surface2 border border-s-border text-body-2 text-t-primary"
                    >
                        <option value="all">Résultat</option>
                        <option value="win">Wins</option>
                        <option value="loss">Losses</option>
                        <option value="breakeven">Breakeven</option>
                    </select>
                    <select
                        value={filters.market}
                        onChange={(e) => setFilter("market", e.target.value)}
                        className="h-9 px-3 rounded-lg bg-b-surface2 border border-s-border text-body-2 text-t-primary"
                    >
                        <option value="all">Marché</option>
                        <option value="forex">Forex</option>
                        <option value="crypto">Crypto</option>
                        <option value="commodities">Matières</option>
                        <option value="indices">Indices</option>
                        <option value="stocks">Actions</option>
                    </select>
                    <select
                        value={filters.period}
                        onChange={(e) => setFilter("period", e.target.value)}
                        className="h-9 px-3 rounded-lg bg-b-surface2 border border-s-border text-body-2 text-t-primary"
                    >
                        <option value="all">Tout</option>
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                {signals.length === 0 && (
                    <div className="card !p-10 text-center">
                        <p className="text-body-1 text-t-secondary">Aucun signal trouvé.</p>
                    </div>
                )}
                {signals.map((sig) => (
                    <Link key={sig.id} href={`/signals/${sig.id}`} className="card !p-4 block hover:shadow-depth transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                sig.direction === "buy" ? "bg-emerald-500/10" : "bg-red-500/10"
                            }`}>
                                <TrendingUp className={`w-5 h-5 ${
                                    sig.direction === "buy" ? "text-emerald-500" : "text-red-500 rotate-180"
                                }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sub-title-1 font-bold text-t-primary">{sig.pair}</span>
                                    <span className={`label text-caption ${sig.direction === "buy" ? "label-green" : "label-red"}`}>
                                        {sig.direction.toUpperCase()}
                                    </span>
                                    <span className={`label text-caption ${
                                        sig.status === "active" ? "label-blue" : sig.result === "win" ? "label-green" : sig.result === "loss" ? "label-red" : "label-yellow"
                                    }`}>
                                        {sig.status === "active" ? "Actif" : sig.result === "win" ? "Win" : sig.result === "loss" ? "Loss" : "BE"}
                                    </span>
                                </div>
                                <p className="text-caption text-t-secondary mt-0.5">
                                    {sig.market} • {sig.timeframe} • Entrée: {sig.entryPrice} • SL: {sig.stopLoss} • TP1: {sig.takeProfit1}
                                </p>
                            </div>
                            <div className="text-right shrink-0 hidden sm:block">
                                <p className={`text-button font-mono ${sig.currentPL >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                                    {sig.currentPL >= 0 ? "+" : ""}{sig.currentPL} pips
                                </p>
                                <p className="text-caption text-t-tertiary">{sig.followersCount} followers</p>
                                <p className="text-caption text-t-tertiary">{sig.upvotes} 👍 {sig.downvotes} 👎</p>
                            </div>
                        </div>
                        {sig.tpsHit.length > 0 && (
                            <div className="flex gap-2 mt-3 ml-15">
                                {sig.tpsHit.map((tp) => (
                                    <span key={tp} className="label label-green text-caption">TP{tp} ✓</span>
                                ))}
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </TraderLayout>
    );
}
