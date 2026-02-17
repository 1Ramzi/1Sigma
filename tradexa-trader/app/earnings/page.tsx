"use client";

import TraderLayout from "@/components/layout/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { Wallet, TrendingUp, Clock, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function EarningsPage() {
    const { earnings } = useTraderStore();

    return (
        <TraderLayout title="Mes Revenus">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                <div className="card !p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-caption text-t-tertiary mb-1">Total</p>
                            <p className="text-h5 font-bold">{earnings.totalEarnings.toLocaleString()}€</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><DollarSign className="w-5 h-5 text-emerald-500" /></div>
                    </div>
                </div>
                <div className="card !p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-caption text-t-tertiary mb-1">Ce mois</p>
                            <p className="text-h5 font-bold text-emerald-500">{earnings.monthlyEarnings.toLocaleString()}€</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-emerald-500" /></div>
                    </div>
                </div>
                <div className="card !p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-caption text-t-tertiary mb-1">En attente</p>
                            <p className="text-h5 font-bold text-amber-500">{earnings.pendingPayout.toLocaleString()}€</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Clock className="w-5 h-5 text-amber-500" /></div>
                    </div>
                </div>
                <div className="card !p-5">
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

            <div className="card !p-5 mb-6">
                <h3 className="text-h6 font-semibold mb-4">Historique des revenus</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={earnings.earningsHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke-subtle)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--text-tertiary)" />
                            <YAxis tick={{ fontSize: 11 }} stroke="var(--text-tertiary)" />
                            <Tooltip contentStyle={{ backgroundColor: "var(--backgrounds-surface2)", border: "1px solid var(--stroke-border)", borderRadius: 12, fontSize: 12 }} />
                            <Bar dataKey="amount" fill="#10B981" radius={[6, 6, 0, 0]} name="Revenus (€)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card !p-5">
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
