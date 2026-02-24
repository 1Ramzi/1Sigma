"use client";

import MobileLayout from "@/components/MobileLayout";

const mockTraders = [
    { name: "TraderPro", winRate: 78.5, signals: 156, followers: 1247, status: "Actif" },
    { name: "CryptoKing", winRate: 72.1, signals: 89, followers: 834, status: "Actif" },
    { name: "ForexMaster", winRate: 81.2, signals: 203, followers: 1523, status: "Actif" },
    { name: "GoldTrader", winRate: 69.8, signals: 67, followers: 456, status: "En pause" },
];

export default function AdminTradersPage() {
    return (
        <MobileLayout title="Traders" mode="admin">
            <div className="space-y-2">
                {mockTraders.map((t, i) => (
                    <div key={i} className="card !p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-caption font-bold shrink-0">
                            {t.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-body-2 font-semibold text-t-primary truncate">{t.name}</p>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                    t.status === "Actif" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                }`}>{t.status}</span>
                            </div>
                            <p className="text-[11px] text-t-tertiary">{t.signals} signaux • {t.followers.toLocaleString()} followers</p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-body-2 font-bold text-emerald-500">{t.winRate}%</p>
                            <p className="text-[10px] text-t-tertiary">Win Rate</p>
                        </div>
                    </div>
                ))}
            </div>
        </MobileLayout>
    );
}
