"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import TraderLayout from "@/components/layout/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { SignalResult } from "@/types/trader";
import { ArrowLeft, XCircle } from "lucide-react";

export default function SignalClosePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { getSignalById, closeSignal } = useTraderStore();
    const sig = getSignalById(id);
    const [exitPrice, setExitPrice] = useState("");
    const [result, setResult] = useState<SignalResult>("win");
    const [note, setNote] = useState("");

    if (!sig || sig.status !== "active") return (
        <TraderLayout title="Signal introuvable">
            <p className="text-body-1 text-t-secondary text-center py-10">Signal introuvable ou déjà fermé.</p>
        </TraderLayout>
    );

    const handleClose = () => {
        if (!exitPrice) return;
        closeSignal(id, parseFloat(exitPrice), result, note || undefined);
        router.push(`/signals/${id}`);
    };

    return (
        <TraderLayout title={`Clôturer ${sig.pair}`}>
            <button onClick={() => router.back()} className="flex items-center gap-2 text-button text-t-secondary hover:text-t-primary mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour
            </button>
            <div className="max-w-xl mx-auto space-y-4">
                <div className="card !p-6">
                    <h3 className="text-h6 font-semibold mb-4">Prix de sortie</h3>
                    <input type="number" step="any" value={exitPrice} onChange={(e) => setExitPrice(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none" placeholder="Prix de sortie" />
                </div>
                <div className="card !p-6">
                    <h3 className="text-h6 font-semibold mb-4">Résultat</h3>
                    <div className="flex gap-2">
                        {(["win", "loss", "breakeven"] as SignalResult[]).map((r) => (
                            <button key={r} onClick={() => setResult(r)}
                                className={`flex-1 h-10 rounded-lg text-button border transition-colors ${
                                    result === r
                                        ? r === "win" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                                            : r === "loss" ? "bg-red-500/10 border-red-500/30 text-red-500"
                                            : "bg-amber-500/10 border-amber-500/30 text-amber-500"
                                        : "bg-b-surface1 border-s-border text-t-secondary"
                                }`}>{r === "win" ? "Win" : r === "loss" ? "Loss" : "Breakeven"}</button>
                        ))}
                    </div>
                </div>
                <div className="card !p-6">
                    <h3 className="text-h6 font-semibold mb-4">Note de clôture</h3>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={300}
                        className="w-full h-24 px-4 py-3 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none resize-none"
                        placeholder="Optionnel..." />
                </div>
                <button onClick={handleClose} disabled={!exitPrice}
                    className="w-full h-12 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <XCircle className="w-4 h-4" /> Clôturer le Signal
                </button>
            </div>
        </TraderLayout>
    );
}
