"use client";

import { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores/notificationStore";

export default function NewSignalPage() {
    const router = useRouter();
    const { addNotification } = useNotificationStore();
    const [form, setForm] = useState({ pair: "", direction: "buy", market: "forex", timeframe: "H4", entry: "", sl: "", tp1: "", tp2: "", tp3: "", note: "" });

    const handleSubmit = () => {
        addNotification({
            title: "Signal publié",
            message: `Le signal ${form.pair} a été publié avec succès.`,
            type: "success"
        });
        router.push("/trader/signals");
    };

    return (
        <MobileLayout title="Nouveau Signal" mode="trader">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-h4 font-bold text-t-primary">Nouveau Signal</h2>
            </div>
            
            <div className="space-y-3">
                <div>
                    <label className="text-caption text-t-secondary mb-1 block">Paire</label>
                    <input type="text" value={form.pair} onChange={(e) => setForm({ ...form, pair: e.target.value })} placeholder="Ex: EUR/USD"
                        className="w-full h-11 px-4 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-emerald-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-caption text-t-secondary mb-1 block">Direction</label>
                        <select value={form.direction} onChange={(e) => setForm({ ...form, direction: e.target.value })}
                            className="w-full h-11 px-3 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary">
                            <option value="buy">BUY</option>
                            <option value="sell">SELL</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1 block">Marché</label>
                        <select value={form.market} onChange={(e) => setForm({ ...form, market: e.target.value })}
                            className="w-full h-11 px-3 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary">
                            <option value="forex">Forex</option>
                            <option value="crypto">Crypto</option>
                            <option value="commodities">Matières</option>
                            <option value="indices">Indices</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-caption text-t-secondary mb-1 block">Timeframe</label>
                    <select value={form.timeframe} onChange={(e) => setForm({ ...form, timeframe: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary">
                        <option value="M15">M15</option>
                        <option value="H1">H1</option>
                        <option value="H4">H4</option>
                        <option value="D1">D1</option>
                        <option value="W1">W1</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-caption text-t-secondary mb-1 block">Entrée</label>
                        <input type="text" value={form.entry} onChange={(e) => setForm({ ...form, entry: e.target.value })} placeholder="Prix"
                            className="w-full h-11 px-4 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1 block">Stop Loss</label>
                        <input type="text" value={form.sl} onChange={(e) => setForm({ ...form, sl: e.target.value })} placeholder="SL"
                            className="w-full h-11 px-4 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-red-500" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="text-caption text-t-secondary mb-1 block">TP1</label>
                        <input type="text" value={form.tp1} onChange={(e) => setForm({ ...form, tp1: e.target.value })} placeholder="TP1"
                            className="w-full h-11 px-3 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1 block">TP2</label>
                        <input type="text" value={form.tp2} onChange={(e) => setForm({ ...form, tp2: e.target.value })} placeholder="TP2"
                            className="w-full h-11 px-3 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1 block">TP3</label>
                        <input type="text" value={form.tp3} onChange={(e) => setForm({ ...form, tp3: e.target.value })} placeholder="TP3"
                            className="w-full h-11 px-3 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-emerald-500" />
                    </div>
                </div>
                <div>
                    <label className="text-caption text-t-secondary mb-1 block">Note (optionnel)</label>
                    <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Analyse, contexte..."
                        className="w-full h-20 px-4 py-3 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-emerald-500 resize-none" />
                </div>
                <button onClick={handleSubmit} disabled={!form.pair || !form.entry || !form.sl || !form.tp1}
                    className="w-full h-12 rounded-xl bg-emerald-500 text-white text-button font-bold active:bg-emerald-600 transition-colors disabled:opacity-50 mt-2">
                    Publier le Signal
                </button>
            </div>
        </MobileLayout>
    );
}
