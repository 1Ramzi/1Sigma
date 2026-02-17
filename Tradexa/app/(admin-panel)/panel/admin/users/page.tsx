"use client";

import { useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { Search, ChevronRight, Filter, Users } from "lucide-react";

const mockUsers = [
    { id: "usr_12345", name: "user_ahmed92", email: "a***@gmail.com", role: "member", status: "Actif", joined: "12/01/2026", ip: "192.168.1.42", device: "Chrome/Win11", lastLogin: "17/02/2026" },
    { id: "usr_12346", name: "crypto_sarah", email: "s***@hotmail.com", role: "vip", status: "Actif", joined: "05/11/2025", ip: "10.0.0.55", device: "Safari/Mac", lastLogin: "17/02/2026" },
    { id: "usr_12347", name: "fx_trader_01", email: "f***@yahoo.com", role: "member", status: "Nouveau", joined: "16/02/2026", ip: "172.16.0.1", device: "Chrome/Android", lastLogin: "16/02/2026" },
    { id: "usr_12348", name: "invest_marc", email: "m***@gmail.com", role: "moderator", status: "Actif", joined: "20/09/2025", ip: "192.168.2.10", device: "Firefox/Win10", lastLogin: "17/02/2026" },
    { id: "usr_12349", name: "trading_julie", email: "j***@outlook.com", role: "member", status: "Banni", joined: "03/06/2025", ip: "10.0.1.22", device: "Safari/iPhone", lastLogin: "10/02/2026" },
    { id: "usr_12350", name: "gold_mike", email: "g***@gmail.com", role: "vip", status: "Actif", joined: "14/12/2025", ip: "192.168.3.5", device: "Chrome/Win11", lastLogin: "16/02/2026" },
    { id: "usr_12351", name: "btc_anna", email: "b***@proton.me", role: "member", status: "Actif", joined: "28/01/2026", ip: "172.16.1.8", device: "Edge/Win11", lastLogin: "17/02/2026" },
    { id: "usr_12352", name: "scalper_youssef", email: "y***@gmail.com", role: "member", status: "Actif", joined: "01/02/2026", ip: "10.0.2.15", device: "Chrome/Android", lastLogin: "15/02/2026" },
];

export default function AdminUsersPage() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<"all" | "member" | "vip" | "moderator">("all");

    const filtered = mockUsers
        .filter((u) => roleFilter === "all" || u.role === roleFilter)
        .filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <AdminLayout title="Utilisateurs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-t-tertiary" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher nom, email..."
                        className="w-full h-10 pl-10 pr-4 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Filter className="w-4 h-4 text-t-tertiary" />
                    {(["all", "member", "vip", "moderator"] as const).map((r) => (
                        <button key={r} onClick={() => setRoleFilter(r)}
                            className={`h-8 px-3 rounded-lg text-caption border transition-colors ${roleFilter === r ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                            {r === "all" ? "Tous" : r}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-caption text-t-tertiary mb-3">{filtered.length} utilisateur{filtered.length > 1 ? "s" : ""}</p>

            <div className="space-y-2">
                {filtered.map((u) => (
                    <Link key={u.id} href={`/panel/admin/users/${u.id}`}
                        className="card !p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:bg-b-surface1/30 transition-colors cursor-pointer block">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-caption font-bold shrink-0">
                            {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <p className="text-body-2 font-semibold">{u.name}</p>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                    u.role === "vip" ? "bg-amber-500/10 text-amber-500" : u.role === "moderator" ? "bg-blue-500/10 text-blue-500" : "bg-b-surface1 text-t-secondary"
                                }`}>{u.role}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                    u.status === "Actif" ? "bg-emerald-500/10 text-emerald-500" : u.status === "Nouveau" ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                                }`}>{u.status}</span>
                            </div>
                            <p className="text-caption text-t-tertiary">
                                {u.email} • IP: {u.ip} • {u.device} • Inscrit: {u.joined} • Dernière co: {u.lastLogin}
                            </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-t-tertiary shrink-0 hidden sm:block" />
                    </Link>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <Users className="w-12 h-12 text-t-tertiary/30 mx-auto mb-3" />
                    <p className="text-body-1 text-t-tertiary">Aucun utilisateur trouvé</p>
                </div>
            )}
        </AdminLayout>
    );
}
