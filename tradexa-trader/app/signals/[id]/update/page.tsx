"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import TraderLayout from "@/components/layout/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { ArrowLeft, Save } from "lucide-react";

export default function SignalUpdatePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { getSignalById, updateSignal } = useTraderStore();
    const sig = getSignalById(id);
    const [newSL, setNewSL] = useState("");
    const [note, setNote] = useState("");
    const [tpHit, setTpHit] = useState<number | null>(null);

    if (!sig || sig.status !== "active") return (
        <TraderLayout title="Signal introuvable">
            <p className="text-body-1 text-t-secondary text-center py-10">Signal introuvable ou déjà fermé.</p>
        </TraderLayout>
    );

    const handleSubmit = () => {
        const updates = [...sig.updates];
        if (tpHit) updates.push({ id: `u_${Date.now()}`, timestamp: new Date(), type: "tp_hit" as const, message: `TP${tpHit} marqué comme atteint.` });
        if (newSL) updates.push({ id: `u_${Date.now() + 1}`, timestamp: new Date(), type: "sl_adjusted" as const, message: `SL ajusté à ${newSL}` });
        if (note) updates.push({ id: `u_${Date.now() + 2}`, timestamp: new Date(), type: "note" as const, message: note });

        updateSignal(id, {
            ...(newSL ? { stopLoss: parseFloat(newSL) } : {}),
            ...(tpHit ? { tpsHit: [...sig.tpsHit, tpHit] } : {}),
            updates,
        });
        router.push(`/signals/${id}`);
    };

    const availableTps = [1, 2, 3, 4, 5].filter((n) => {
        const val = sig[`takeProfit${n}` as keyof typeof sig];
        return val !== undefined && !sig.tpsHit.includes(n);
    });

    return (
        <TraderLayout title={`Modifier ${sig.pair}`}>
            <button onClick={() => router.back()} className="flex items-center gap-2 text-button text-t-secondary hover:text-t-primary mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour
            </button>
            <div className="max-w-xl mx-auto space-y-4">
                <div className="card !p-6">
                    <h3 className="text-h6 font-semibold mb-4">Ajuster le Stop Loss</h3>
                    <div className="flex gap-3 items-end">
                        <div className="flex-1">
                            <label className="text-caption text-t-secondary mb-1.5 block">Nouveau SL (actuel: {sig.stopLoss})</label>
                            <input type="number" step="any" value={newSL} onChange={(e) => setNewSL(e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none" placeholder="Nouveau prix" />
                        </div>
                        <button onClick={() => setNewSL(String(sig.entryPrice))}
                            className="h-11 px-4 rounded-xl bg-amber-500/10 text-amber-500 text-button hover:bg-amber-500/20 transition-colors whitespace-nowrap">
                            Déplacer au BE
                        </button>
                    </div>
                </div>

                {availableTps.length > 0 && (
                    <div className="card !p-6">
                        <h3 className="text-h6 font-semibold mb-4">Marquer un TP atteint</h3>
                        <div className="flex gap-2">
                            {availableTps.map((n) => (
                                <button key={n} onClick={() => setTpHit(tpHit === n ? null : n)}
                                    className={`h-10 px-5 rounded-lg text-button border transition-colors ${tpHit === n ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                                    TP{n}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="card !p-6">
                    <h3 className="text-h6 font-semibold mb-4">Note de mise à jour</h3>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={300}
                        className="w-full h-24 px-4 py-3 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none resize-none"
                        placeholder="Ex: TP1 touché, SL au BE..." />
                </div>

                <button onClick={handleSubmit}
                    className="w-full h-12 rounded-xl bg-emerald-500 text-white text-button font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> Enregistrer les modifications
                </button>
            </div>
        </TraderLayout>
    );
}
