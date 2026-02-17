"use client";

import { useState } from "react";
import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { Wallet, TrendingUp, Clock, DollarSign, Lock, ShieldAlert } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const placeholderHistory = [
    { month: "Sep", amount: 3200 }, { month: "Oct", amount: 4100 }, { month: "Nov", amount: 3800 },
    { month: "Déc", amount: 5200 }, { month: "Jan", amount: 6100 }, { month: "Fév", amount: 4700 },
];

export default function EarningsPage() {
    const { earnings } = useTraderStore();
    const [revenueUnlocked] = useState(false);

    if (!revenueUnlocked) {
        return (
            <TraderLayout title="Mes Revenus">
                <div className="relative">
                    {/* Blurred stats behind */}
                    <div className="select-none pointer-events-none" aria-hidden="true" style={{ filter: "blur(8px)", opacity: 0.35 }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                            {[
                                { label: "Total", val: "12,480€", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: <DollarSign className="w-5 h-5 text-emerald-500" /> },
                                { label: "Ce mois", val: "4,700€", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: <TrendingUp className="w-5 h-5 text-emerald-500" /> },
                                { label: "En attente", val: "1,200€", color: "text-amber-500", bg: "bg-amber-500/10", icon: <Clock className="w-5 h-5 text-amber-500" /> },
                                { label: "Dernier paiement", val: "3,580€", color: "text-t-primary", bg: "bg-purple-500/10", icon: <Wallet className="w-5 h-5 text-purple-500" /> },
                            ].map((c) => (
                                <div key={c.label} className="card p-5">
                                    <div className="flex items-start justify-between">
                                        <div><p className="text-caption text-t-tertiary mb-1">{c.label}</p><p className={`text-h5 font-bold ${c.color}`}>{c.val}</p></div>
                                        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>{c.icon}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card p-5 mb-6">
                            <h3 className="text-h6 font-semibold mb-4">Historique des revenus</h3>
                            <div className="h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={placeholderHistory}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke-subtle)" />
                                        <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--text-tertiary)" />
                                        <YAxis tick={{ fontSize: 11 }} stroke="var(--text-tertiary)" />
                                        <Bar dataKey="amount" fill="#10B981" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    {/* Lock overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="max-w-md w-full mx-4 text-center">
                            <div className="card p-8 border border-s-border shadow-xl backdrop-blur-sm bg-b-surface1/90">
                                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
                                    <Lock className="w-8 h-8 text-amber-500" />
                                </div>
                                <h2 className="text-h5 font-bold text-t-primary mb-2">Accès restreint</h2>
                                <p className="text-body-2 text-t-secondary mb-4">La page des revenus est verrouillée pour votre compte. Seul l&apos;administrateur peut activer cette section.</p>
                                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-caption text-amber-600">
                                    <ShieldAlert className="w-4 h-4" /> Contactez votre admin pour débloquer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TraderLayout>
        );
    }

    return (
        <TraderLayout title="Mes Revenus">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                <div className="card p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-caption text-t-tertiary mb-1">Total</p>
                            <p className="text-h5 font-bold">{earnings.totalEarnings.toLocaleString()}€</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><DollarSign className="w-5 h-5 text-emerald-500" /></div>
                    </div>
                </div>
                <div className="card p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-caption text-t-tertiary mb-1">Ce mois</p>
                            <p className="text-h5 font-bold text-emerald-500">{earnings.monthlyEarnings.toLocaleString()}€</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-emerald-500" /></div>
                    </div>
                </div>
                <div className="card p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-caption text-t-tertiary mb-1">En attente</p>
                            <p className="text-h5 font-bold text-amber-500">{earnings.pendingPayout.toLocaleString()}€</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Clock className="w-5 h-5 text-amber-500" /></div>
                    </div>
                </div>
                <div className="card p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-caption text-t-tertiary mb-1">Dernier paiement</p>
                            <p className="text-h5 font-bold">{earnings.lastPayout.amount.toLocaleString()}€</p>
                            <p className="text-caption text-t-tertiary">{new Date(earnings.lastPayout.date).toLocaleDateString("fr-FR")}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-purple-500" /></div>
                    </div>
                </div>
            </div>

            <div className="card p-5 mb-6">
                <h3 className="text-h6 font-semibold mb-4">Historique des revenus</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={earnings.earningsHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke-subtle)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--text-tertiary)" />
                            <YAxis tick={{ fontSize: 11 }} stroke="var(--text-tertiary)" />
                            <Bar dataKey="amount" fill="#10B981" radius={[6, 6, 0, 0]} name="Revenus (€)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card p-5">
                <h3 className="text-h6 font-semibold mb-4">Détail mensuel</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-body-2">
                        <thead>
                            <tr className="text-left text-caption text-t-tertiary border-b border-s-border">
                                <th className="pb-3 pr-4">Mois</th>
                                <th className="pb-3 pr-4">Signaux</th>
                                <th className="pb-3 pr-4">Moy/Signal</th>
                                <th className="pb-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earnings.earningsHistory.map((row) => (
                                <tr key={row.month} className="border-b border-s-border/50 last:border-0">
                                    <td className="py-3 pr-4 font-medium">{row.month}</td>
                                    <td className="py-3 pr-4 text-t-secondary">{row.signalsCount}</td>
                                    <td className="py-3 pr-4 text-t-secondary">{row.avgPerSignal}€</td>
                                    <td className="py-3 text-right font-semibold text-emerald-500">{row.amount.toLocaleString()}€</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </TraderLayout>
    );
}
