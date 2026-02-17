"use client";

import AdminLayout from "@/components/AdminPanel/AdminLayout";

const mockTraders = [
    { name: "TraderPro", winRate: 78.5, signals: 156, followers: 1247, revenue: "3,420€", status: "Actif" },
    { name: "CryptoKing", winRate: 72.1, signals: 89, followers: 834, revenue: "2,180€", status: "Actif" },
    { name: "ForexMaster", winRate: 81.2, signals: 203, followers: 1523, revenue: "4,750€", status: "Actif" },
    { name: "GoldTrader", winRate: 69.8, signals: 67, followers: 456, revenue: "1,340€", status: "En pause" },
];

export default function AdminTradersPage() {
    return (
        <AdminLayout title="Traders">
            <div className="card !p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-body-2">
                        <thead>
                            <tr className="text-left text-caption text-t-tertiary border-b border-s-border bg-b-surface1">
                                <th className="p-4">Trader</th>
                                <th className="p-4">Win Rate</th>
                                <th className="p-4">Signaux</th>
                                <th className="p-4">Followers</th>
                                <th className="p-4">Revenus/mois</th>
                                <th className="p-4">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockTraders.map((t, i) => (
                                <tr key={i} className="border-b border-s-border/50 last:border-0 hover:bg-b-surface1/50 transition-colors">
                                    <td className="p-4 font-medium">{t.name}</td>
                                    <td className="p-4 font-semibold text-[#10B981]">{t.winRate}%</td>
                                    <td className="p-4 text-t-secondary">{t.signals}</td>
                                    <td className="p-4 text-t-secondary">{t.followers.toLocaleString()}</td>
                                    <td className="p-4 font-medium">{t.revenue}</td>
                                    <td className="p-4"><span className={`label text-caption ${t.status === "Actif" ? "label-green" : "label-yellow"}`}>{t.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
