"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { EyeOff, Check, X, MessageSquare, FileText, ExternalLink } from "lucide-react";

type ReviewRequest = {
    id: string; trader: string; signalPair: string; feedbackType: "downvote" | "comment";
    userId: string; comment?: string; reason: string; document?: string;
    status: "pending" | "approved" | "rejected"; createdAt: string;
};

const mockRequests: ReviewRequest[] = [
    { id: "rr1", trader: "TraderPro", signalPair: "EUR/USD", feedbackType: "downvote", userId: "User #4521", reason: "Vote injustifié, le signal était correct et a atteint TP1", document: "preuve_tp1_atteint.png", status: "pending", createdAt: "17/02/2026 14:30" },
    { id: "rr2", trader: "CryptoKing", signalPair: "BTC/USDT", feedbackType: "comment", userId: "User #7832", comment: "Arnaque pure, ne suivez pas ce trader", reason: "Commentaire diffamatoire et faux", document: "capture_resultats.pdf", status: "pending", createdAt: "17/02/2026 11:15" },
    { id: "rr3", trader: "ForexMaster", signalPair: "GOLD", feedbackType: "comment", userId: "User #9451", comment: "Le pire signal que j'ai vu", reason: "Commentaire haineux sans fondement", status: "pending", createdAt: "16/02/2026 18:00" },
    { id: "rr4", trader: "TraderPro", signalPair: "NAS100", feedbackType: "downvote", userId: "User #3287", reason: "Vote spam, même utilisateur vote négatif sur tous mes signaux", status: "approved", createdAt: "15/02/2026 09:20" },
    { id: "rr5", trader: "GoldTrader", signalPair: "SILVER", feedbackType: "comment", userId: "User #5120", comment: "Incompétent total", reason: "Insulte gratuite", status: "rejected", createdAt: "14/02/2026 16:45" },
];

export default function AdminReviewsPage() {
    const [requests, setRequests] = useState(mockRequests);

    const handleAction = (id: string, action: "approved" | "rejected") => {
        setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
    };

    const pending = requests.filter((r) => r.status === "pending");
    const processed = requests.filter((r) => r.status !== "pending");

    return (
        <AdminLayout title="Demandes de suppression d'avis">
            <p className="text-body-2 text-t-secondary mb-6">
                Les traders peuvent demander la suppression d&apos;avis négatifs. C&apos;est à vous de décider si l&apos;avis est légitime ou non.
            </p>

            {pending.length > 0 && (
                <>
                    <h3 className="text-sub-title-1 font-semibold mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 text-caption font-bold flex items-center justify-center">{pending.length}</span>
                        En attente
                    </h3>
                    <div className="space-y-3 mb-8">
                        {pending.map((r) => (
                            <div key={r.id} className="card !p-5 border-l-2 border-l-amber-500">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="text-body-2 font-semibold">{r.trader}</span>
                                            <span className="text-caption text-t-tertiary">demande de masquer un</span>
                                            <span className={`text-caption px-2 py-0.5 rounded-full ${r.feedbackType === "downvote" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"}`}>
                                                {r.feedbackType === "downvote" ? "👎 Downvote" : "💬 Commentaire"}
                                            </span>
                                            <span className="text-caption text-t-tertiary">de <strong>{r.userId}</strong> sur <strong>{r.signalPair}</strong></span>
                                        </div>
                                        {r.comment && (
                                            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-b-surface1 mb-2">
                                                <MessageSquare className="w-3.5 h-3.5 text-t-tertiary mt-0.5 shrink-0" />
                                                <p className="text-body-2 text-t-secondary italic">&quot;{r.comment}&quot;</p>
                                            </div>
                                        )}
                                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10">
                                            <EyeOff className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                                            <p className="text-body-2 text-amber-600 dark:text-amber-400"><strong>Raison du trader:</strong> {r.reason}</p>
                                        </div>
                                        {r.document && (
                                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 mt-2">
                                                <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                                <span className="text-body-2 text-blue-500 flex-1 truncate">{r.document}</span>
                                                <button className="text-caption text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1 shrink-0">
                                                    <ExternalLink className="w-3 h-3" /> Visualiser
                                                </button>
                                            </div>
                                        )}
                                        <p className="text-caption text-t-tertiary mt-2">{r.createdAt}</p>
                                    </div>
                                    <div className="flex lg:flex-col gap-2 shrink-0">
                                        <button onClick={() => handleAction(r.id, "approved")}
                                            className="flex-1 lg:w-36 h-10 rounded-xl bg-emerald-500 text-white text-button font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5">
                                            <Check className="w-4 h-4" /> Approuver
                                        </button>
                                        <button onClick={() => handleAction(r.id, "rejected")}
                                            className="flex-1 lg:w-36 h-10 rounded-xl bg-b-surface1 border border-s-border text-button text-t-secondary hover:text-red-500 hover:border-red-500/30 transition-colors flex items-center justify-center gap-1.5">
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
                        {processed.map((r) => (
                            <div key={r.id} className="card !p-4 flex flex-col sm:flex-row items-start gap-3 opacity-70">
                                <div className="flex-1 min-w-0">
                                    <p className="text-body-2"><strong>{r.trader}</strong> — {r.feedbackType} de {r.userId} sur {r.signalPair}</p>
                                    <p className="text-caption text-t-tertiary mt-0.5">{r.createdAt}</p>
                                </div>
                                <span className={`text-caption px-2.5 py-0.5 rounded-full font-medium shrink-0 ${
                                    r.status === "approved" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                }`}>{r.status === "approved" ? "Approuvé" : "Refusé"}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </AdminLayout>
    );
}
