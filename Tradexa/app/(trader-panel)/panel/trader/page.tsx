"use client";

import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { TrendingUp, BarChart3, Users, Wallet, Signal, Target } from "lucide-react";
import Link from "next/link";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";

function StatsCard({ title, value, subtitle, icon: Icon, color }: {
    title: string; value: string | number; subtitle?: string;
    icon: React.ElementType; color: string;
}) {
    return (
        <div className="card !p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-caption text-t-tertiary mb-1">{title}</p>
                    <p className="text-h5 font-bold text-t-primary">{value}</p>
                    {subtitle && <p className="text-caption text-t-secondary mt-1">{subtitle}</p>}
                </div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { stats, signals } = useTraderStore();
    const activeSignals = signals.filter((s) => s.status === "active").slice(0, 5);

    return (
        <TraderLayout title="Dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">
                <StatsCard
                    title="Signaux Totaux"
                    value={stats.totalSignals}
                    subtitle={`${stats.activeSignals} actifs`}
                    icon={Signal}
                    color="bg-emerald-500/10 text-emerald-500"
                />
                <StatsCard
                    title="Win Rate"
                    value={`${stats.winRate}%`}
                    subtitle="30 derniers jours"
                    icon={Target}
                    color="bg-blue-500/10 text-blue-500"
                />
                <StatsCard
                    title="Followers"
                    value={stats.totalFollowers.toLocaleString()}
                    subtitle={`~${stats.avgFollowersPerSignal} par signal`}
                    icon={Users}
                    color="bg-purple-500/10 text-purple-500"
                />
                <StatsCard
                    title="Revenus du mois"
                    value={`${stats.monthlyEarnings.toLocaleString()}€`}
                    icon={Wallet}
                    color="bg-amber-500/10 text-amber-500"
                />
                <StatsCard
                    title="Signaux Actifs"
                    value={stats.activeSignals}
                    icon={TrendingUp}
                    color="bg-emerald-500/10 text-emerald-500"
                />
                <StatsCard
                    title="Moy. Followers/Signal"
                    value={stats.avgFollowersPerSignal}
                    icon={BarChart3}
                    color="bg-cyan-500/10 text-cyan-500"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-6">
                <div className="card !p-5">
                    <h3 className="text-h6 font-semibold mb-4">Performance 30 jours</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.performanceLast30Days}>
                                <defs>
                                    <linearGradient id="winGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke-subtle)" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="var(--text-tertiary)" tickFormatter={(v) => v.slice(5)} />
                                <YAxis tick={{ fontSize: 10 }} stroke="var(--text-tertiary)" domain={[50, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: "var(--backgrounds-surface2)", border: "1px solid var(--stroke-border)", borderRadius: 12, fontSize: 12 }} />
                                <Area type="monotone" dataKey="winRate" stroke="#10B981" fill="url(#winGrad)" strokeWidth={2} name="Win Rate %" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card !p-5">
                    <h3 className="text-h6 font-semibold mb-4">Croissance Followers</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.followersGrowth}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke-subtle)" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="var(--text-tertiary)" tickFormatter={(v) => v.slice(5)} />
                                <YAxis tick={{ fontSize: 10 }} stroke="var(--text-tertiary)" />
                                <Tooltip contentStyle={{ backgroundColor: "var(--backgrounds-surface2)", border: "1px solid var(--stroke-border)", borderRadius: 12, fontSize: 12 }} />
                                <Line type="monotone" dataKey="count" stroke="#7f5fff" strokeWidth={2} dot={false} name="Followers" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="card !p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-h6 font-semibold">Signaux Actifs</h3>
                    <Link href="/panel/trader/signals" className="text-button text-emerald-500 hover:underline">
                        Voir tout
                    </Link>
                </div>
                <div className="space-y-3">
                    {activeSignals.length === 0 && (
                        <p className="text-body-2 text-t-secondary py-8 text-center">Aucun signal actif.</p>
                    )}
                    {activeSignals.map((sig) => (
                        <Link
                            key={sig.id}
                            href={`/signals/${sig.id}`}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-b-surface1 transition-colors"
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                sig.direction === "buy" ? "bg-emerald-500/10" : "bg-red-500/10"
                            }`}>
                                <TrendingUp className={`w-4 h-4 ${
                                    sig.direction === "buy" ? "text-emerald-500" : "text-red-500 rotate-180"
                                }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-button font-bold text-t-primary">{sig.pair}</span>
                                    <span className={`label text-caption ${sig.direction === "buy" ? "label-green" : "label-red"}`}>
                                        {sig.direction.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-caption text-t-secondary">{sig.market} • {sig.followersCount} followers</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className={`text-button font-mono ${sig.currentPL >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                                    {sig.currentPL >= 0 ? "+" : ""}{sig.currentPL} pips
                                </p>
                                <p className="text-caption text-t-tertiary">
                                    {sig.upvotes} 👍 • {sig.downvotes} 👎
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </TraderLayout>
    );
}
