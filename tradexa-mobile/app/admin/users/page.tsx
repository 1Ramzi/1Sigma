"use client";

import { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { Search, ChevronRight } from "lucide-react";

const mockUsers = [
    { id: "usr_12345", name: "user_ahmed92", email: "a***@gmail.com", role: "member", status: "Actif", joined: "12/01/2026" },
    { id: "usr_12346", name: "crypto_sarah", email: "s***@hotmail.com", role: "vip", status: "Actif", joined: "05/11/2025" },
    { id: "usr_12347", name: "fx_trader_01", email: "f***@yahoo.com", role: "member", status: "Nouveau", joined: "16/02/2026" },
    { id: "usr_12348", name: "invest_marc", email: "m***@gmail.com", role: "moderator", status: "Actif", joined: "20/09/2025" },
    { id: "usr_12349", name: "trading_julie", email: "j***@outlook.com", role: "member", status: "Banni", joined: "03/06/2025" },
    { id: "usr_12350", name: "gold_mike", email: "g***@gmail.com", role: "vip", status: "Actif", joined: "14/12/2025" },
    { id: "usr_12351", name: "btc_anna", email: "b***@proton.me", role: "member", status: "Actif", joined: "28/01/2026" },
    { id: "usr_12352", name: "scalper_youssef", email: "y***@gmail.com", role: "member", status: "Actif", joined: "01/02/2026" },
];

export default function AdminUsersPage() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");

    const filtered = mockUsers
        .filter((u) => roleFilter === "all" || u.role === roleFilter)
        .filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <MobileLayout title="Utilisateurs" mode="admin">
            <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-t-tertiary" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..."
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-red-500" />
            </div>

            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                {(["all", "member", "vip", "moderator"] as const).map((r) => (
                    <button key={r} onClick={() => setRoleFilter(r)}
                        className={`h-8 px-3 rounded-lg text-caption border whitespace-nowrap transition-colors ${
                            roleFilter === r ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-b-surface1 border-s-border text-t-secondary"
                        }`}>
                        {r === "all" ? "Tous" : r}
                    </button>
                ))}
            </div>

            <p className="text-[11px] text-t-tertiary mb-2">{filtered.length} utilisateur{filtered.length > 1 ? "s" : ""}</p>

            <div className="space-y-2">
                {filtered.map((u) => (
                    <div key={u.id} className="card !p-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-[10px] font-bold shrink-0">
                            {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <p className="text-body-2 font-semibold text-t-primary truncate">{u.name}</p>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                                    u.role === "vip" ? "bg-amber-500/10 text-amber-500" :
                                    u.role === "moderator" ? "bg-blue-500/10 text-blue-500" : "bg-b-surface1 text-t-secondary"
                                }`}>{u.role}</span>
                            </div>
                            <p className="text-[10px] text-t-tertiary">{u.email} • {u.joined}</p>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${
                            u.status === "Actif" ? "bg-emerald-500/10 text-emerald-500" :
                            u.status === "Nouveau" ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                        }`}>{u.status}</span>
                        <ChevronRight className="w-4 h-4 text-t-tertiary shrink-0" />
                    </div>
                ))}
            </div>
        </MobileLayout>
    );
}
