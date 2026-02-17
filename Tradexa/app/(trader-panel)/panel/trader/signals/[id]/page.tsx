"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { TrendingUp, ArrowLeft, Edit, XCircle, Copy, Clock, Users, ThumbsUp, ThumbsDown } from "lucide-react";

export default function SignalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { getSignalById } = useTraderStore();
    const sig = getSignalById(id);

    if (!sig) return (
        <TraderLayout title="Signal introuvable">
            <div className="card !p-10 text-center">
                <p className="text-body-1 text-t-secondary mb-4">Ce signal n&apos;existe pas.</p>
                <Link href="/panel/trader/signals" className="text-emerald-500 hover:underline text-button">Retour aux signaux</Link>
            </div>
        </TraderLayout>
    );

    const formatPrice = (p: number) => p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 });
    const tps = [
        { n: 1, v: sig.takeProfit1 }, { n: 2, v: sig.takeProfit2 }, { n: 3, v: sig.takeProfit3 },
        { n: 4, v: sig.takeProfit4 }, { n: 5, v: sig.takeProfit5 },
    ].filter((t) => t.v !== undefined);

    return (
        <TraderLayout title={`${sig.pair} ${sig.direction.toUpperCase()}`}>
            <button onClick={() => router.back()} className="flex items-center gap-2 text-button text-t-secondary hover:text-t-primary mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour
            </button>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                <div className="xl:col-span-2 space-y-3">
                    <div className="card !p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${sig.direction === "buy" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                                    <TrendingUp className={`w-6 h-6 ${sig.direction === "buy" ? "text-emerald-500" : "text-red-500 rotate-180"}`} />
                                </div>
                                <div>
                                    <h2 className="text-h5 font-bold">{sig.pair}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`label text-caption ${sig.direction === "buy" ? "label-green" : "label-red"}`}>{sig.direction.toUpperCase()}</span>
                                        <span className={`label text-caption ${sig.status === "active" ? "label-blue" : sig.result === "win" ? "label-green" : sig.result === "loss" ? "label-red" : "label-yellow"}`}>
                                            {sig.status === "active" ? "Actif" : sig.result === "win" ? "Win" : sig.result === "loss" ? "Loss" : "BE"}
                                        </span>
                                        <span className="label label-gray text-caption">{sig.market}</span>
                                        <span className="label label-gray text-caption">{sig.timeframe}</span>
                                    </div>
                                </div>
                            </div>
                            {sig.status === "active" && (
                                <div className="flex gap-2">
                                    <Link href={`/signals/${sig.id}/update`} className="h-9 px-4 flex items-center gap-2 rounded-lg bg-blue-500/10 text-blue-500 text-button hover:bg-blue-500/20 transition-colors">
                                        <Edit className="w-3.5 h-3.5" /> Modifier
                                    </Link>
                                    <Link href={`/signals/${sig.id}/close`} className="h-9 px-4 flex items-center gap-2 rounded-lg bg-red-500/10 text-red-500 text-button hover:bg-red-500/20 transition-colors">
                                        <XCircle className="w-3.5 h-3.5" /> Clôturer
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-b-surface1">
                                <p className="text-caption text-t-tertiary">Entrée</p>
                                <p className="text-sub-title-1 font-mono font-bold">{formatPrice(sig.entryPrice)}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-b-surface1">
                                <p className="text-caption text-t-tertiary">Prix actuel</p>
                                <p className={`text-sub-title-1 font-mono font-bold ${sig.currentPL >= 0 ? "text-emerald-500" : "text-red-500"}`}>{formatPrice(sig.currentPrice)}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-b-surface1">
                                <p className="text-caption text-t-tertiary">Stop Loss</p>
                                <p className="text-sub-title-1 font-mono font-bold text-red-500">{formatPrice(sig.stopLoss)}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-b-surface1">
                                <p className="text-caption text-t-tertiary">P/L</p>
                                <p className={`text-sub-title-1 font-mono font-bold ${sig.currentPL >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                                    {sig.currentPL >= 0 ? "+" : ""}{sig.currentPL} pips
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-caption text-t-tertiary">Take Profits</p>
                            <div className="flex flex-wrap gap-2">
                                {tps.map((tp) => {
                                    const hit = sig.tpsHit.includes(tp.n);
                                    return (
                                        <div key={tp.n} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${hit ? "bg-emerald-500/10 border-emerald-500/20" : "bg-b-surface1 border-s-border"}`}>
                                            <span className={`text-caption font-bold ${hit ? "text-emerald-500" : "text-t-secondary"}`}>TP{tp.n}</span>
                                            <span className={`font-mono text-body-2 ${hit ? "text-emerald-500" : "text-t-primary"}`}>{formatPrice(tp.v!)}</span>
                                            {hit && <span className="text-emerald-500">✓</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {sig.analysis && (
                            <div className="mt-6 p-4 rounded-xl bg-b-surface1 border border-s-border">
                                <p className="text-caption text-t-tertiary mb-2">Analyse</p>
                                <p className="text-body-2 text-t-primary">{sig.analysis}</p>
                            </div>
                        )}
                    </div>

                    {sig.updates.length > 0 && (
                        <div className="card !p-6">
                            <h3 className="text-h6 font-semibold mb-4">Historique</h3>
                            <div className="space-y-3">
                                {sig.updates.map((u) => (
                                    <div key={u.id} className="flex items-start gap-3 p-3 rounded-xl bg-b-surface1">
                                        <Clock className="w-4 h-4 text-t-tertiary mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-body-2 text-t-primary">{u.message}</p>
                                            <p className="text-caption text-t-tertiary">{new Date(u.timestamp).toLocaleString("fr-FR")}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="card !p-5">
                        <h3 className="text-h6 font-semibold mb-4">Stats Anonymes</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Users className="w-4 h-4 text-purple-500" /></div>
                                <div><p className="text-caption text-t-tertiary">Followers</p><p className="text-sub-title-1 font-bold">{sig.followersCount} personnes</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><ThumbsUp className="w-4 h-4 text-emerald-500" /></div>
                                <div><p className="text-caption text-t-tertiary">Upvotes</p><p className="text-sub-title-1 font-bold">{sig.upvotes}</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><ThumbsDown className="w-4 h-4 text-red-500" /></div>
                                <div><p className="text-caption text-t-tertiary">Downvotes</p><p className="text-sub-title-1 font-bold">{sig.downvotes}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="card !p-5">
                        <p className="text-caption text-t-tertiary mb-1">Confiance</p>
                        <p className="text-sub-title-1 font-bold capitalize">{sig.confidence === "low" ? "Faible" : sig.confidence === "medium" ? "Moyenne" : "Haute"}</p>
                        <p className="text-caption text-t-tertiary mt-3 mb-1">Créé le</p>
                        <p className="text-body-2">{new Date(sig.createdAt).toLocaleString("fr-FR")}</p>
                        {sig.closedAt && (<><p className="text-caption text-t-tertiary mt-3 mb-1">Fermé le</p><p className="text-body-2">{new Date(sig.closedAt).toLocaleString("fr-FR")}</p></>)}
                    </div>
                </div>
            </div>
        </TraderLayout>
    );
}
