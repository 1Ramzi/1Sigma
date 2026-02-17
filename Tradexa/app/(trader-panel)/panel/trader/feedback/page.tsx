"use client";

import { useState } from "react";
import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { ThumbsUp, ThumbsDown, MessageSquare, EyeOff, Check, Filter, Paperclip, FileText } from "lucide-react";

type HideRequest = { fbId: string; reason: string; document?: string; status: "pending" | "sent" };

export default function FeedbackPage() {
    const { feedback } = useTraderStore();
    const [hideRequests, setHideRequests] = useState<HideRequest[]>([]);
    const [hideModal, setHideModal] = useState<string | null>(null);
    const [hideReason, setHideReason] = useState("");
    const [hideDoc, setHideDoc] = useState<string>("");
    const [filterType, setFilterType] = useState<"all" | "upvote" | "downvote" | "comment">("all");

    const getIcon = (type: string) => {
        if (type === "upvote") return <ThumbsUp className="w-4 h-4 text-emerald-500" />;
        if (type === "downvote") return <ThumbsDown className="w-4 h-4 text-red-500" />;
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
    };

    const getLabel = (type: string) => {
        if (type === "upvote") return "a voté 👍";
        if (type === "downvote") return "a voté 👎";
        return "a commenté";
    };

    const sendHideRequest = (fbId: string) => {
        if (!hideReason.trim()) return;
        setHideRequests((prev) => [...prev, { fbId, reason: hideReason, document: hideDoc || undefined, status: "sent" }]);
        setHideModal(null);
        setHideReason("");
        setHideDoc("");
    };

    const handleFileSelect = () => {
        setHideDoc("preuve_capture_ecran.png");
    };

    const getHideStatus = (fbId: string) => hideRequests.find((r) => r.fbId === fbId);
    const filtered = feedback.filter((fb) => filterType === "all" || fb.type === filterType);

    return (
        <TraderLayout title="Feedbacks Anonymisés">
            <p className="text-body-2 text-t-secondary mb-4">
                Les retours de vos followers sont anonymisés. Vous ne voyez jamais les noms ou emails.
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-6">
                <Filter className="w-4 h-4 text-t-tertiary" />
                {(["all", "upvote", "downvote", "comment"] as const).map((t) => (
                    <button key={t} onClick={() => setFilterType(t)}
                        className={`h-8 px-3 rounded-lg text-caption border transition-colors ${filterType === t ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                        {t === "all" ? "Tous" : t === "upvote" ? "👍 Upvotes" : t === "downvote" ? "👎 Downvotes" : "💬 Commentaires"}
                    </button>
                ))}
                <span className="text-caption text-t-tertiary ml-auto">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
            </div>
            <div className="space-y-2">
                {filtered.map((fb) => {
                    const req = getHideStatus(fb.id);
                    return (
                        <div key={fb.id} className={`card !p-4 flex flex-col sm:flex-row items-start gap-4 ${req ? "opacity-60" : ""}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                fb.type === "upvote" ? "bg-emerald-500/10" : fb.type === "downvote" ? "bg-red-500/10" : "bg-blue-500/10"
                            }`}>
                                {getIcon(fb.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-body-2 text-t-primary">
                                    <span className="font-semibold text-t-secondary">{fb.odUserId}</span>{" "}
                                    {getLabel(fb.type)} sur <span className="font-semibold">{fb.signalPair}</span>
                                    <span className="text-[10px] text-t-tertiary ml-2 font-mono">#{fb.id.slice(-6).toUpperCase()}</span>
                                </p>
                                {fb.comment && (
                                    <p className="text-body-2 text-t-secondary mt-1 italic">&quot;{fb.comment}&quot;</p>
                                )}
                                <p className="text-caption text-t-tertiary mt-1">
                                    {new Date(fb.createdAt).toLocaleString("fr-FR")}
                                </p>
                                {req && (
                                    <p className="text-caption text-amber-500 mt-1 flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Demande envoyée — En attente de décision admin
                                    </p>
                                )}
                            </div>
                            {!req && (fb.type === "downvote" || fb.type === "comment") && (
                                <button onClick={() => setHideModal(fb.id)}
                                    className="shrink-0 h-9 px-3 rounded-lg text-caption border border-s-border text-t-secondary hover:text-red-500 hover:border-red-500/30 transition-colors flex items-center gap-1.5"
                                    title="Demander la suppression de cet avis">
                                    <EyeOff className="w-3.5 h-3.5" /> Masquer
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {hideModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="card !p-6 w-full max-w-md">
                        <h3 className="text-h6 font-semibold mb-2">Demander la suppression</h3>
                        <p className="text-body-2 text-t-secondary mb-4">
                            Votre demande sera envoyée à l&apos;admin qui décidera de masquer ou non cet avis. Vous pouvez indiquer une raison.
                        </p>
                        <textarea value={hideReason} onChange={(e) => setHideReason(e.target.value)} maxLength={200}
                            className="w-full h-24 px-4 py-3 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none resize-none mb-3"
                            placeholder="Raison de la demande (ex: commentaire inapproprié, faux avis...)" />
                        <div className="mb-4">
                            <p className="text-caption text-t-secondary mb-1.5">Document justificatif (optionnel)</p>
                            {!hideDoc ? (
                                <button onClick={handleFileSelect}
                                    className="w-full h-16 rounded-xl border-2 border-dashed border-s-border hover:border-red-500/30 transition-colors flex items-center justify-center gap-2 text-caption text-t-tertiary hover:text-t-secondary">
                                    <Paperclip className="w-4 h-4" /> Joindre un fichier (capture, PDF...)
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-b-surface1 border border-s-border">
                                    <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span className="text-body-2 text-t-primary flex-1 truncate">{hideDoc}</span>
                                    <button onClick={() => setHideDoc("")} className="text-caption text-t-tertiary hover:text-red-500 transition-colors">Retirer</button>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => { setHideModal(null); setHideReason(""); }}
                                className="flex-1 h-11 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary hover:text-t-primary transition-colors">
                                Annuler
                            </button>
                            <button onClick={() => sendHideRequest(hideModal)} disabled={!hideReason.trim()}
                                className="flex-1 h-11 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors disabled:opacity-50">
                                Envoyer la demande
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </TraderLayout>
    );
}
