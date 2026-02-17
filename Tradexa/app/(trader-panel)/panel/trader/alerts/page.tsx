"use client";

import { useState } from "react";
import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { Megaphone, Send, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

type Alert = {
    id: string; title: string; message: string; type: "promotion" | "info" | "urgent";
    status: "pending" | "approved" | "rejected"; createdAt: string;
};

const mockAlerts: Alert[] = [
    { id: "a1", title: "Promo Signal Gratuit", message: "Signal gratuit ce week-end pour tous les nouveaux abonnés ! Rejoignez maintenant.", type: "promotion", status: "approved", createdAt: "15/02/2026 14:00" },
    { id: "a2", title: "Changement de stratégie", message: "Je passe en mode swing trading cette semaine. Moins de signaux mais plus de qualité.", type: "info", status: "approved", createdAt: "13/02/2026 09:30" },
    { id: "a3", title: "⚠️ Attention marché volatile", message: "NFP ce vendredi, réduisez vos positions. Je ne posterai pas de signal avant les résultats.", type: "urgent", status: "pending", createdAt: "17/02/2026 10:15" },
];

export default function AlertsPage() {
    const [alerts, setAlerts] = useState(mockAlerts);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", message: "", type: "info" as Alert["type"] });

    const submitAlert = () => {
        if (!form.title.trim() || !form.message.trim()) return;
        const newAlert: Alert = {
            id: `a_${Date.now()}`, ...form, status: "pending",
            createdAt: new Date().toLocaleString("fr-FR"),
        };
        setAlerts((prev) => [newAlert, ...prev]);
        setForm({ title: "", message: "", type: "info" });
        setShowForm(false);
    };

    const statusConfig = {
        pending: { label: "En attente d'approbation admin", icon: Clock, color: "text-amber-500 bg-amber-500/10" },
        approved: { label: "Approuvée — Envoyée aux utilisateurs", icon: CheckCircle, color: "text-emerald-500 bg-emerald-500/10" },
        rejected: { label: "Refusée par l'admin", icon: XCircle, color: "text-red-500 bg-red-500/10" },
    };

    return (
        <TraderLayout title="Alertes & Promotions">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                <div className="flex-1">
                    <p className="text-body-2 text-t-secondary">
                        Envoyez des alertes à tous vos followers. Chaque alerte doit être approuvée par un admin avant d&apos;être diffusée.
                    </p>
                </div>
                <button onClick={() => setShowForm(!showForm)}
                    className="h-10 px-5 rounded-xl bg-emerald-500 text-white text-button font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2 shrink-0">
                    <Send className="w-4 h-4" /> Nouvelle alerte
                </button>
            </div>

            {showForm && (
                <div className="card !p-6 mb-6 space-y-4">
                    <h3 className="text-h6 font-semibold">Créer une alerte</h3>
                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-caption text-amber-500">Les alertes promotionnelles nécessitent l&apos;approbation d&apos;un admin avant d&apos;être envoyées aux utilisateurs.</p>
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1.5 block">Type</label>
                        <div className="flex gap-2">
                            {(["info", "promotion", "urgent"] as const).map((t) => (
                                <button key={t} onClick={() => setForm((f) => ({ ...f, type: t }))}
                                    className={`flex-1 h-10 rounded-lg text-button border transition-colors ${
                                        form.type === t
                                            ? t === "promotion" ? "bg-purple-500/10 border-purple-500/30 text-purple-500"
                                                : t === "urgent" ? "bg-red-500/10 border-red-500/30 text-red-500"
                                                : "bg-blue-500/10 border-blue-500/30 text-blue-500"
                                            : "bg-b-surface1 border-s-border text-t-secondary"
                                    }`}>{t === "info" ? "Information" : t === "promotion" ? "Promotion" : "Urgent"}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1.5 block">Titre</label>
                        <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} maxLength={80}
                            className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none"
                            placeholder="Ex: Signal gratuit ce week-end !" />
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1.5 block">Message</label>
                        <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} maxLength={300}
                            className="w-full h-24 px-4 py-3 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none resize-none"
                            placeholder="Le contenu de votre alerte..." />
                        <p className="text-caption text-t-tertiary text-right mt-1">{form.message.length}/300</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowForm(false)}
                            className="flex-1 h-11 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary hover:text-t-primary transition-colors">
                            Annuler
                        </button>
                        <button onClick={submitAlert} disabled={!form.title.trim() || !form.message.trim()}
                            className="flex-1 h-11 rounded-xl bg-emerald-500 text-white text-button font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" /> Soumettre pour approbation
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-2">
                {alerts.map((a) => {
                    const sc = statusConfig[a.status];
                    return (
                        <div key={a.id} className="card !p-4">
                            <div className="flex flex-col sm:flex-row items-start gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                    a.type === "promotion" ? "bg-purple-500/10" : a.type === "urgent" ? "bg-red-500/10" : "bg-blue-500/10"
                                }`}>
                                    <Megaphone className={`w-5 h-5 ${a.type === "promotion" ? "text-purple-500" : a.type === "urgent" ? "text-red-500" : "text-blue-500"}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <p className="text-body-2 font-semibold text-t-primary">{a.title}</p>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                            a.type === "promotion" ? "bg-purple-500/10 text-purple-500" : a.type === "urgent" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                                        }`}>{a.type === "info" ? "Info" : a.type === "promotion" ? "Promo" : "Urgent"}</span>
                                    </div>
                                    <p className="text-body-2 text-t-secondary">{a.message}</p>
                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                        <span className={`text-caption flex items-center gap-1 px-2 py-0.5 rounded-full ${sc.color}`}>
                                            <sc.icon className="w-3 h-3" /> {sc.label}
                                        </span>
                                        <span className="text-caption text-t-tertiary">{a.createdAt}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </TraderLayout>
    );
}
