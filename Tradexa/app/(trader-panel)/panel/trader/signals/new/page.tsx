"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { Market, Direction, Confidence, Timeframe, TraderSignalView } from "@/types/trader";
import { ArrowLeft, ArrowRight, Check, TrendingUp, TrendingDown, AlertTriangle, Sparkles, Loader2, Crown, Zap, Users, CheckCircle } from "lucide-react";

const PAIRS: Record<Market, string[]> = {
    forex: ["EUR/USD", "GBP/USD", "USD/JPY", "GBP/JPY", "USD/CHF", "AUD/USD", "EUR/GBP", "NZD/USD"],
    crypto: ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT", "ADA/USDT", "DOGE/USDT"],
    commodities: ["GOLD", "SILVER", "OIL", "NATGAS"],
    indices: ["NAS100", "SP500", "DAX40", "FTSE100", "CAC40"],
    stocks: ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT", "NVDA"],
};

export default function NewSignalPage() {
    const router = useRouter();
    const { addSignal } = useTraderStore();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        pair: "", market: "forex" as Market, direction: "buy" as Direction,
        entryPrice: "", stopLoss: "", takeProfit1: "", takeProfit2: "", takeProfit3: "", takeProfit4: "", takeProfit5: "",
        confidence: "medium" as Confidence, timeframe: "4h" as Timeframe,
        analysis: "", visibility: ["free"] as ("free" | "vip" | "premium")[], aiAutoEnrich: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [aiLoading, setAiLoading] = useState(false);
    const [aiDone, setAiDone] = useState(false);

    const runAiAnalysis = () => {
        setAiLoading(true);
        setTimeout(() => {
            const confidenceMap: Record<string, Confidence> = { "EUR/USD": "high", "BTC/USDT": "high", "GOLD": "medium", "NAS100": "high" };
            const timeframeMap: Record<string, Timeframe> = { "EUR/USD": "4h", "BTC/USDT": "1h", "GOLD": "daily", "NAS100": "4h" };
            const analysisMap: Record<string, string> = {
                "EUR/USD": "Structure haussière confirmée sur H4. Cassure de la résistance 1.0830 avec volume. RSI en zone neutre, MACD croisement haussier. Ratio R:R favorable.",
                "BTC/USDT": "Momentum haussier fort sur H1. Support clé à 67,200 testé et tenu. Divergence haussière RSI. Volume en augmentation progressive.",
                "GOLD": "Consolidation en triangle ascendant sur Daily. Breakout imminent au-dessus de 2,340. Fondamentaux supportent la hausse (tensions géopolitiques).",
                "NAS100": "Tendance haussière intacte sur H4. Pullback sur EMA20 complété. Secteur tech en momentum. Attention au support 18,200.",
            };
            set("confidence", confidenceMap[form.pair] || "medium");
            set("timeframe", timeframeMap[form.pair] || "4h");
            set("analysis", analysisMap[form.pair] || `Analyse IA pour ${form.pair}: Tendance ${form.direction === "buy" ? "haussière" : "baissière"} identifiée sur le timeframe principal. Niveaux techniques cohérents avec le setup proposé. Confiance modérée basée sur la structure de marché actuelle.`);
            setAiLoading(false);
            setAiDone(true);
        }, 2000);
    };

    const [flashMsg, setFlashMsg] = useState("");
    const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

    const validateStep1 = () => {
        const e: Record<string, string> = {};
        if (!form.pair) e.pair = "Sélectionnez une paire";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validateStep2 = () => {
        const e: Record<string, string> = {};
        const entry = parseFloat(form.entryPrice);
        const sl = parseFloat(form.stopLoss);
        const tp1 = parseFloat(form.takeProfit1);
        if (!form.entryPrice || isNaN(entry)) e.entryPrice = "Prix d'entrée requis";
        if (!form.stopLoss || isNaN(sl)) e.stopLoss = "Stop Loss requis";
        if (!form.takeProfit1 || isNaN(tp1)) e.takeProfit1 = "TP1 requis";
        if (entry && sl) {
            if (form.direction === "buy" && sl >= entry) e.stopLoss = "SL doit être < entrée pour un BUY";
            if (form.direction === "sell" && sl <= entry) e.stopLoss = "SL doit être > entrée pour un SELL";
        }
        if (entry && tp1) {
            if (form.direction === "buy" && tp1 <= entry) e.takeProfit1 = "TP1 doit être > entrée pour un BUY";
            if (form.direction === "sell" && tp1 >= entry) e.takeProfit1 = "TP1 doit être < entrée pour un SELL";
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const next = () => {
        if (step === 1 && !validateStep1()) return;
        if (step === 2 && !validateStep2()) return;
        setStep((s) => Math.min(s + 1, 4));
    };
    const prev = () => setStep((s) => Math.max(s - 1, 1));

    const rrRatio = () => {
        const entry = parseFloat(form.entryPrice);
        const sl = parseFloat(form.stopLoss);
        const tp1 = parseFloat(form.takeProfit1);
        if (!entry || !sl || !tp1) return null;
        const risk = Math.abs(entry - sl);
        const reward = Math.abs(tp1 - entry);
        return risk > 0 ? (reward / risk).toFixed(2) : null;
    };

    const submit = () => {
        const newSig: TraderSignalView = {
            id: `sig_${Date.now()}`, pair: form.pair, market: form.market, direction: form.direction,
            entryPrice: parseFloat(form.entryPrice), currentPrice: parseFloat(form.entryPrice),
            stopLoss: parseFloat(form.stopLoss), takeProfit1: parseFloat(form.takeProfit1),
            ...(form.takeProfit2 ? { takeProfit2: parseFloat(form.takeProfit2) } : {}),
            ...(form.takeProfit3 ? { takeProfit3: parseFloat(form.takeProfit3) } : {}),
            ...(form.takeProfit4 ? { takeProfit4: parseFloat(form.takeProfit4) } : {}),
            ...(form.takeProfit5 ? { takeProfit5: parseFloat(form.takeProfit5) } : {}),
            status: "active", confidence: form.confidence, timeframe: form.timeframe,
            analysis: form.analysis || undefined, createdAt: new Date(),
            followersCount: 0, upvotes: 0, downvotes: 0, currentPL: 0, tpsHit: [], updates: [],
        };
        addSignal(newSig);
        setFlashMsg("Signal publié avec succès !");
        setTimeout(() => router.push("/panel/trader/signals"), 1800);
    };

    return (
        <TraderLayout title="Nouveau Signal">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex items-center gap-2 flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-caption font-bold shrink-0 ${
                                step >= s ? "bg-emerald-500 text-white" : "bg-b-surface2 text-t-tertiary border border-s-border"
                            }`}>{s}</div>
                            {s < 4 && <div className={`h-0.5 flex-1 rounded ${step > s ? "bg-emerald-500" : "bg-s-border"}`} />}
                        </div>
                    ))}
                </div>

                {step === 1 && (
                    <div className="card !p-6 space-y-5">
                        <h2 className="text-h6 font-semibold">Marché & Direction</h2>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Marché</label>
                            <div className="flex flex-wrap gap-2">
                                {(["forex", "crypto", "commodities", "indices", "stocks"] as Market[]).map((m) => (
                                    <button key={m} onClick={() => { set("market", m); set("pair", ""); }}
                                        className={`h-9 px-4 rounded-lg text-button border transition-colors ${
                                            form.market === m ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-b-surface1 border-s-border text-t-secondary hover:text-t-primary"
                                        }`}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Paire</label>
                            <div className="flex flex-wrap gap-2">
                                {PAIRS[form.market].map((p) => (
                                    <button key={p} onClick={() => set("pair", p)}
                                        className={`h-9 px-4 rounded-lg text-button border transition-colors ${
                                            form.pair === p ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-b-surface1 border-s-border text-t-secondary hover:text-t-primary"
                                        }`}>{p}</button>
                                ))}
                            </div>
                            {errors.pair && <p className="text-caption text-red-500 mt-1">{errors.pair}</p>}
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Direction</label>
                            <div className="flex gap-3">
                                <button onClick={() => set("direction", "buy")}
                                    className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-xl text-button font-semibold border transition-all ${
                                        form.direction === "buy" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-b-surface1 border-s-border text-t-secondary"
                                    }`}><TrendingUp className="w-4 h-4" /> BUY</button>
                                <button onClick={() => set("direction", "sell")}
                                    className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-xl text-button font-semibold border transition-all ${
                                        form.direction === "sell" ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-b-surface1 border-s-border text-t-secondary"
                                    }`}><TrendingDown className="w-4 h-4" /> SELL</button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="card !p-6 space-y-5">
                        <h2 className="text-h6 font-semibold">Prix & Risk Management</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-caption text-t-secondary mb-1.5 block">Prix d&apos;entrée *</label>
                                <input type="number" step="any" value={form.entryPrice} onChange={(e) => set("entryPrice", e.target.value)}
                                    className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none" placeholder="1.0850" />
                                {errors.entryPrice && <p className="text-caption text-red-500 mt-1">{errors.entryPrice}</p>}
                            </div>
                            <div>
                                <label className="text-caption text-t-secondary mb-1.5 block">Stop Loss *</label>
                                <input type="number" step="any" value={form.stopLoss} onChange={(e) => set("stopLoss", e.target.value)}
                                    className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none" placeholder="1.0820" />
                                {errors.stopLoss && <p className="text-caption text-red-500 mt-1">{errors.stopLoss}</p>}
                            </div>
                        </div>
                        {rrRatio() && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                                <AlertTriangle className="w-4 h-4 text-emerald-500" />
                                <span className="text-body-2 text-emerald-500 font-medium">Ratio R:R = 1:{rrRatio()}</span>
                            </div>
                        )}
                        <div className="space-y-3">
                            <label className="text-caption text-t-secondary block">Take Profits</label>
                            {[1, 2, 3, 4, 5].map((n) => (
                                <input key={n} type="number" step="any"
                                    value={form[`takeProfit${n}` as keyof typeof form] as string}
                                    onChange={(e) => set(`takeProfit${n}`, e.target.value)}
                                    className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none"
                                    placeholder={`TP${n}${n === 1 ? " *" : " (optionnel)"}`} />
                            ))}
                            {errors.takeProfit1 && <p className="text-caption text-red-500">{errors.takeProfit1}</p>}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="card !p-6 space-y-5">
                        <h2 className="text-h6 font-semibold">Analyse & Options</h2>
                        <label className="flex items-start gap-3 p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 cursor-pointer hover:bg-purple-500/10 transition-colors">
                            <input type="checkbox" checked={form.aiAutoEnrich} onChange={(e) => set("aiAutoEnrich", e.target.checked)}
                                className="w-5 h-5 rounded accent-purple-500 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <Sparkles className="w-4 h-4 text-purple-500" />
                                    <span className="text-body-2 font-semibold text-purple-500">Enrichissement IA</span>
                                </div>
                                <p className="text-caption text-t-secondary">L&apos;IA ajoutera automatiquement des éléments d&apos;analyse au fur et à mesure qu&apos;elle en identifie (niveaux clés, patterns, confluences).</p>
                            </div>
                        </label>
                        <button onClick={runAiAnalysis} disabled={aiLoading}
                            className={`w-full h-12 rounded-xl text-button font-semibold flex items-center justify-center gap-2 transition-all border ${aiDone ? "bg-purple-500/10 border-purple-500/30 text-purple-500" : "bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/15"} disabled:opacity-50`}>
                            {aiLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyse IA en cours...</>
                                : aiDone ? <><Sparkles className="w-4 h-4" /> IA a rempli les champs — Vous pouvez modifier</>
                                : <><Sparkles className="w-4 h-4" /> Lancer l&apos;analyse IA maintenant</>}
                        </button>
                        {aiDone && <p className="text-caption text-purple-400/70 text-center -mt-2">L&apos;IA a pré-rempli les champs ci-dessous. Ajustez si nécessaire.</p>}
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Confiance</label>
                            <div className="flex gap-2">
                                {(["low", "medium", "high"] as Confidence[]).map((c) => (
                                    <button key={c} onClick={() => set("confidence", c)}
                                        className={`flex-1 h-10 rounded-lg text-button border transition-colors ${
                                            form.confidence === c
                                                ? c === "high" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                                                    : c === "medium" ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                                                    : "bg-red-500/10 border-red-500/30 text-red-500"
                                                : "bg-b-surface1 border-s-border text-t-secondary"
                                        }`}>{c === "low" ? "Faible" : c === "medium" ? "Moyenne" : "Haute"}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Timeframe</label>
                            <div className="flex flex-wrap gap-2">
                                {(["15m", "1h", "4h", "daily", "weekly"] as Timeframe[]).map((t) => (
                                    <button key={t} onClick={() => set("timeframe", t)}
                                        className={`h-9 px-4 rounded-lg text-button border transition-colors ${
                                            form.timeframe === t ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-b-surface1 border-s-border text-t-secondary"
                                        }`}>{t}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Analyse (optionnel)</label>
                            <textarea value={form.analysis} onChange={(e) => set("analysis", e.target.value)} maxLength={500}
                                className="w-full h-28 px-4 py-3 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none resize-none"
                                placeholder="Votre analyse technique..." />
                            <p className="text-caption text-t-tertiary text-right">{form.analysis.length}/500</p>
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Visibilité — Qui reçoit ce signal ?</label>
                            <p className="text-[11px] text-t-tertiary mb-2">&quot;Tous les utilisateurs&quot; est toujours inclus. Sélectionnez des niveaux additionnels.</p>
                            <div className="grid grid-cols-3 gap-2">
                                {(["free", "vip", "premium"] as const).map((v) => {
                                    const cfg = { free: { label: "Tous", desc: "Tous les utilisateurs", icon: Users, color: "blue" }, vip: { label: "VIP", desc: "Abonnés VIP", icon: Crown, color: "amber" }, premium: { label: "Premium", desc: "Abonnés Premium", icon: Zap, color: "purple" } }[v];
                                    const Ic = cfg.icon;
                                    const isActive = form.visibility.includes(v);
                                    const toggle = () => {
                                        if (v === "free") return;
                                        setForm((f) => ({ ...f, visibility: isActive ? f.visibility.filter((x) => x !== v) : [...f.visibility, v] }));
                                    };
                                    return (
                                        <button key={v} onClick={toggle} disabled={v === "free"}
                                            className={`p-3 rounded-xl border text-left transition-all ${v === "free" ? "bg-blue-500/10 border-blue-500/30 cursor-default" : isActive ? `bg-${cfg.color}-500/10 border-${cfg.color}-500/30` : "bg-b-surface1 border-s-border hover:border-t-tertiary"}`}>
                                            <Ic className={`w-5 h-5 mb-1.5 ${isActive || v === "free" ? `text-${cfg.color}-500` : "text-t-tertiary"}`} />
                                            <p className={`text-button font-semibold ${isActive || v === "free" ? `text-${cfg.color}-500` : "text-t-primary"}`}>{cfg.label}</p>
                                            <p className="text-[10px] text-t-tertiary mt-0.5">{cfg.desc}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="card !p-6 space-y-4">
                        <h2 className="text-h6 font-semibold">Récapitulatif</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">Paire</p><p className="text-sub-title-1 font-bold">{form.pair}</p></div>
                            <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">Direction</p><p className={`text-sub-title-1 font-bold ${form.direction === "buy" ? "text-emerald-500" : "text-red-500"}`}>{form.direction.toUpperCase()}</p></div>
                            <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">Entrée</p><p className="text-sub-title-1 font-mono">{form.entryPrice}</p></div>
                            <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">Stop Loss</p><p className="text-sub-title-1 font-mono text-red-500">{form.stopLoss}</p></div>
                            <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">TP1</p><p className="text-sub-title-1 font-mono text-emerald-500">{form.takeProfit1}</p></div>
                            {form.takeProfit2 && <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">TP2</p><p className="text-sub-title-1 font-mono text-emerald-500">{form.takeProfit2}</p></div>}
                            {form.takeProfit3 && <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">TP3</p><p className="text-sub-title-1 font-mono text-emerald-500">{form.takeProfit3}</p></div>}
                            <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">Confiance</p><p className="text-sub-title-1">{form.confidence === "low" ? "Faible" : form.confidence === "medium" ? "Moyenne" : "Haute"}</p></div>
                            <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">Timeframe</p><p className="text-sub-title-1">{form.timeframe}</p></div>
                            {rrRatio() && <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">R:R</p><p className="text-sub-title-1 text-emerald-500 font-bold">1:{rrRatio()}</p></div>}
                            <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary">Visibilité</p><p className="text-sub-title-1 font-semibold">{form.visibility.map((v) => v === "free" ? "Tous" : v.toUpperCase()).join(" + ")}</p></div>
                        </div>
                        {form.analysis && <div className="p-3 rounded-xl bg-b-surface1"><p className="text-caption text-t-tertiary mb-1">Analyse</p><p className="text-body-2">{form.analysis}</p></div>}
                    </div>
                )}

                <div className="flex items-center gap-3 mt-6">
                    {step > 1 && (
                        <button onClick={prev} className="h-11 px-6 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary hover:text-t-primary transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Précédent
                        </button>
                    )}
                    <div className="ml-auto">
                        {step < 4 ? (
                            <button onClick={next} className="h-11 px-6 rounded-xl bg-emerald-500 text-white text-button font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2">
                                Suivant <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button onClick={submit} className="h-11 px-8 rounded-xl bg-emerald-500 text-white text-button font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2">
                                <Check className="w-4 h-4" /> Publier le Signal
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {flashMsg && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-500 text-white shadow-lg animate-in slide-in-from-bottom-4">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span className="text-body-2 font-semibold">{flashMsg}</span>
                </div>
            )}
        </TraderLayout>
    );
}
