"use client";

import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { Users, Signal, UserCheck, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

function StatCard({ title, value, subtitle, icon: Icon, color }: {
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

export default function AdminDashboardPage() {
    return (
        <AdminLayout title="Dashboard Admin">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">
                <StatCard title="Utilisateurs Total" value="3,247" subtitle="+124 ce mois" icon={Users} color="bg-blue-500/10 text-blue-500" />
                <StatCard title="Traders Actifs" value="12" subtitle="8 en ligne" icon={UserCheck} color="bg-[#10B981]/10 text-[#10B981]" />
                <StatCard title="Signaux Actifs" value="34" subtitle="156 ce mois" icon={Signal} color="bg-purple-500/10 text-purple-500" />
                <StatCard title="Revenus Plateforme" value="42,580€" subtitle="+18% vs mois dernier" icon={DollarSign} color="bg-amber-500/10 text-amber-500" />
                <StatCard title="Taux de Win Global" value="76.3%" icon={TrendingUp} color="bg-[#10B981]/10 text-[#10B981]" />
                <StatCard title="Signalements" value="3" subtitle="2 en attente" icon={AlertTriangle} color="bg-red-500/10 text-red-500" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                <div className="card !p-5">
                    <h3 className="text-h6 font-semibold mb-4">Derniers Utilisateurs</h3>
                    <div className="space-y-3">
                        {[
                            { name: "user_ahmed92", email: "a***@gmail.com", status: "Actif", date: "17/02/2026" },
                            { name: "crypto_sarah", email: "s***@hotmail.com", status: "Actif", date: "17/02/2026" },
                            { name: "fx_trader_01", email: "f***@yahoo.com", status: "Nouveau", date: "16/02/2026" },
                            { name: "invest_marc", email: "m***@gmail.com", status: "Actif", date: "16/02/2026" },
                            { name: "trading_julie", email: "j***@outlook.com", status: "Suspendu", date: "15/02/2026" },
                        ].map((u, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-b-surface1">
                                <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-caption font-bold">
                                    {u.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-body-2 font-medium text-t-primary truncate">{u.name}</p>
                                    <p className="text-caption text-t-tertiary">{u.email}</p>
                                </div>
                                <span className={`label text-caption ${u.status === "Actif" ? "label-green" : u.status === "Nouveau" ? "label-blue" : "label-red"}`}>
                                    {u.status}
                                </span>
                                <span className="text-caption text-t-tertiary hidden sm:block">{u.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card !p-5">
                    <h3 className="text-h6 font-semibold mb-4">Traders Performance</h3>
                    <div className="space-y-3">
                        {[
                            { name: "TraderPro", signals: 156, winRate: 78.5, followers: 1247, revenue: "3,420€" },
                            { name: "CryptoKing", signals: 89, winRate: 72.1, followers: 834, revenue: "2,180€" },
                            { name: "ForexMaster", signals: 203, winRate: 81.2, followers: 1523, revenue: "4,750€" },
                            { name: "GoldTrader", signals: 67, winRate: 69.8, followers: 456, revenue: "1,340€" },
                        ].map((t, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-b-surface1">
                                <div className="w-9 h-9 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] text-caption font-bold">
                                    {t.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-body-2 font-medium text-t-primary">{t.name}</p>
                                    <p className="text-caption text-t-tertiary">{t.signals} signaux • {t.followers} followers</p>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-body-2 font-semibold text-[#10B981]">{t.winRate}%</p>
                                    <p className="text-caption text-t-tertiary">{t.revenue}/mois</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
