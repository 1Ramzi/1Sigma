"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { Megaphone, Check, X, Clock, CheckCircle, XCircle } from "lucide-react";

type TraderAlert = {
    id: string; trader: string; title: string; message: string;
    type: "promotion" | "info" | "urgent"; status: "pending" | "approved" | "rejected";
    createdAt: string;
};

const mockAlerts: TraderAlert[] = [
    { id: "ta1", trader: "TraderPro", title: "Promo Signal Gratuit", message: "Signal gratuit ce week-end pour tous les nouveaux abonnés ! Rejoignez maintenant.", type: "promotion", status: "pending", createdAt: "17/02/2026 14:00" },
    { id: "ta2", trader: "CryptoKing", title: "⚠️ Attention marché volatile", message: "NFP ce vendredi, réduisez vos positions. Je ne posterai pas de signal avant les résultats.", type: "urgent", status: "pending", createdAt: "17/02/2026 10:15" },
    { id: "ta3", trader: "ForexMaster", title: "Changement de stratégie", message: "Je passe en mode swing trading cette semaine. Moins de signaux mais plus de qualité.", type: "info", status: "approved", createdAt: "16/02/2026 09:30" },
    { id: "ta4", trader: "GoldTrader", title: "-50% sur l'abonnement", message: "Offre spéciale: -50% sur tous les abonnements cette semaine seulement !", type: "promotion", status: "rejected", createdAt: "15/02/2026 11:00" },
];

export default function AdminAlertsPage() {
    const [alerts, setAlerts] = useState(mockAlerts);

    const handleAction = (id: string, action: "approved" | "rejected") => {
        setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status: action } : a));
    };

    const pending = alerts.filter((a) => a.status === "pending");
    const processed = alerts.filter((a) => a.status !== "pending");

    const statusIcons = { pending: Clock, approved: CheckCircle, rejected: XCircle };

    return (
        <AdminLayout title="Alertes Traders">
            <p className="text-body-2 text-t-secondary mb-6">
                Les traders soumettent des alertes/promotions pour leurs followers. Approuvez ou refusez avant diffusion.
            </p>

            {pending.length > 0 && (
                <>
                    <h3 className="text-sub-title-1 font-semibold mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 text-caption font-bold flex items-center justify-center">{pending.length}</span>
                        En attente d&apos;approbation
                    </h3>
                    <div className="space-y-3 mb-8">
                        {pending.map((a) => (
                            <div key={a.id} className="card !p-5 border-l-2 border-l-amber-500">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                            a.type === "promotion" ? "bg-purple-500/10" : a.type === "urgent" ? "bg-red-500/10" : "bg-blue-500/10"
                                        }`}>
                                            <Megaphone className={`w-5 h-5 ${a.type === "promotion" ? "text-purple-500" : a.type === "urgent" ? "text-red-500" : "text-blue-500"}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className="text-body-2 font-semibold">{a.trader}</span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                                    a.type === "promotion" ? "bg-purple-500/10 text-purple-500" : a.type === "urgent" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                                                }`}>{a.type}</span>
                                            </div>
                                            <p className="text-body-2 font-medium text-t-primary">{a.title}</p>
                                            <p className="text-body-2 text-t-secondary mt-0.5">{a.message}</p>
                                            <p className="text-caption text-t-tertiary mt-1.5">{a.createdAt}</p>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-col gap-2 shrink-0">
                                        <button onClick={() => handleAction(a.id, "approved")}
                                            className="flex-1 lg:w-32 h-10 rounded-xl bg-emerald-500 text-white text-button font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5">
                                            <Check className="w-4 h-4" /> Approuver
                                        </button>
                                        <button onClick={() => handleAction(a.id, "rejected")}
                                            className="flex-1 lg:w-32 h-10 rounded-xl bg-b-surface1 border border-s-border text-button text-t-secondary hover:text-red-500 transition-colors flex items-center justify-center gap-1.5">
                                            <X className="w-4 h-4" /> Refuser
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {processed.length > 0 && (
                <>
                    <h3 className="text-sub-title-1 font-semibold mb-3">Historique</h3>
                    <div className="space-y-2">
                        {processed.map((a) => {
                            const Icon = statusIcons[a.status];
                            return (
                                <div key={a.id} className="card !p-4 flex flex-col sm:flex-row items-start gap-3 opacity-70">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-body-2"><strong>{a.trader}</strong> — {a.title}</p>
                                        <p className="text-caption text-t-tertiary mt-0.5">{a.createdAt}</p>
                                    </div>
                                    <span className={`text-caption px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1 shrink-0 ${
                                        a.status === "approved" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                    }`}><Icon className="w-3 h-3" /> {a.status === "approved" ? "Approuvé" : "Refusé"}</span>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </AdminLayout>
    );
}
