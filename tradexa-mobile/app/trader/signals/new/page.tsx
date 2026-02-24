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
            <div className="flex items-center justify-between mb-6 px-2 mt-2">
                <h2 className="text-h4 font-bold text-t-primary">Nouveau Signal</h2>
            </div>
            
            <div className="bg-b-surface2 rounded-[24px] p-5 shadow-sm border border-s-stroke2 space-y-5 mb-6">
                <div>
                    <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">Paire</label>
                    <input type="text" value={form.pair} onChange={(e) => setForm({ ...form, pair: e.target.value })} placeholder="Ex: EUR/USD"
                        className="w-full h-14 px-5 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-semibold text-t-primary outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">Direction</label>
                        <select value={form.direction} onChange={(e) => setForm({ ...form, direction: e.target.value })}
                            className="w-full h-14 px-4 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-semibold text-t-primary outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all">
                            <option value="buy">BUY</option>
                            <option value="sell">SELL</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">Marché</label>
                        <select value={form.market} onChange={(e) => setForm({ ...form, market: e.target.value })}
                            className="w-full h-14 px-4 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-semibold text-t-primary outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all">
                            <option value="forex">Forex</option>
                            <option value="crypto">Crypto</option>
                            <option value="commodities">Matières</option>
                            <option value="indices">Indices</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">Timeframe</label>
                    <select value={form.timeframe} onChange={(e) => setForm({ ...form, timeframe: e.target.value })}
                        className="w-full h-14 px-4 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-semibold text-t-primary outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all">
                        <option value="M15">M15</option>
                        <option value="H1">H1</option>
                        <option value="H4">H4</option>
                        <option value="D1">D1</option>
                        <option value="W1">W1</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">Entrée</label>
                        <input type="text" value={form.entry} onChange={(e) => setForm({ ...form, entry: e.target.value })} placeholder="Prix"
                            className="w-full h-14 px-5 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-semibold text-t-primary outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">Stop Loss</label>
                        <input type="text" value={form.sl} onChange={(e) => setForm({ ...form, sl: e.target.value })} placeholder="SL"
                            className="w-full h-14 px-5 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-semibold text-t-primary outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">TP1</label>
                        <input type="text" value={form.tp1} onChange={(e) => setForm({ ...form, tp1: e.target.value })} placeholder="TP1"
                            className="w-full h-14 px-4 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-semibold text-t-primary outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">TP2</label>
                        <input type="text" value={form.tp2} onChange={(e) => setForm({ ...form, tp2: e.target.value })} placeholder="TP2"
                            className="w-full h-14 px-4 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-semibold text-t-primary outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">TP3</label>
                        <input type="text" value={form.tp3} onChange={(e) => setForm({ ...form, tp3: e.target.value })} placeholder="TP3"
                            className="w-full h-14 px-4 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-semibold text-t-primary outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                    </div>
                </div>

                <div>
                    <label className="text-caption text-t-secondary mb-2 block font-medium ml-1">Note (optionnel)</label>
                    <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Analyse, contexte..."
                        className="w-full h-24 px-5 py-4 rounded-2xl bg-b-surface1 border border-s-stroke2 text-body-1 font-medium text-t-primary outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none" />
                </div>
            </div>

            <button onClick={handleSubmit} disabled={!form.pair || !form.entry || !form.sl || !form.tp1}
                className="w-full h-14 rounded-2xl bg-emerald-500 text-white text-sub-title-1 font-bold active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-emerald-500/25 mb-8">
                Publier le Signal
            </button>
        </MobileLayout>
    );
}
