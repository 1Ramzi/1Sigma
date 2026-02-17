"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { ArrowLeft, Ban, ShieldCheck, Key, Mail, Globe, Monitor, Clock, Activity, ChevronDown, ChevronUp, UserCog } from "lucide-react";

const mockUser = {
    id: "usr_12345", username: "user_ahmed92", email: "ahmed.benali@gmail.com",
    phone: "+33 6 12 34 56 78", status: "active" as string, role: "member" as string,
    createdAt: "2025-09-15T14:32:00Z", lastLogin: "2026-02-17T16:45:00Z",
    ip: "192.168.1.42", device: "Chrome 121 / Windows 11", country: "France",
    totalSignalsFollowed: 47, totalSpent: "89.99€", subscription: "Premium",
    subscriptionExpiry: "2026-06-15", referredBy: "crypto_sarah",
    logs: [
        { id: "l1", action: "Connexion", ip: "192.168.1.42", device: "Chrome/Win11", date: "17/02/2026 16:45" },
        { id: "l2", action: "Signal suivi: EUR/USD BUY", ip: "192.168.1.42", device: "Chrome/Win11", date: "17/02/2026 15:30" },
        { id: "l3", action: "Signal suivi: BTC/USDT BUY", ip: "192.168.1.42", device: "Chrome/Win11", date: "17/02/2026 12:10" },
        { id: "l4", action: "Paiement: 29.99€ (Premium)", ip: "192.168.1.42", device: "Chrome/Win11", date: "16/02/2026 09:00" },
        { id: "l5", action: "Changement email", ip: "192.168.1.42", device: "Chrome/Win11", date: "15/02/2026 11:20" },
        { id: "l6", action: "Connexion", ip: "10.0.0.1", device: "Safari/iPhone 15", date: "14/02/2026 22:15" },
        { id: "l7", action: "Commentaire signal GOLD", ip: "10.0.0.1", device: "Safari/iPhone 15", date: "14/02/2026 21:50" },
        { id: "l8", action: "Connexion", ip: "192.168.1.42", device: "Chrome/Win11", date: "13/02/2026 08:30" },
        { id: "l9", action: "Création de compte", ip: "192.168.1.42", device: "Chrome/Win11", date: "15/09/2025 14:32" },
    ],
};

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [user, setUser] = useState(mockUser);
    const [showLogs, setShowLogs] = useState(false);
    const [showResetPwd, setShowResetPwd] = useState(false);
    const [newRole, setNewRole] = useState(user.role);
    const [confirmBan, setConfirmBan] = useState(false);

    const toggleBan = () => {
        setUser((u) => ({ ...u, status: u.status === "banned" ? "active" : "banned" }));
        setConfirmBan(false);
    };

    const creationDuration = () => {
        const created = new Date(user.createdAt);
        const now = new Date();
        const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
        if (diff < 30) return `${diff} jours`;
        if (diff < 365) return `${Math.floor(diff / 30)} mois`;
        return `${Math.floor(diff / 365)} an(s) et ${Math.floor((diff % 365) / 30)} mois`;
    };

    return (
        <AdminLayout title={`Utilisateur: ${user.username}`}>
            <button onClick={() => router.push("/panel/admin/users")} className="flex items-center gap-2 text-button text-t-secondary hover:text-t-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour liste
            </button>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2 space-y-4">
                    <div className="card !p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-h5">
                                {user.username.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h2 className="text-h5 font-bold">{user.username}</h2>
                                    <span className={`text-caption px-2.5 py-0.5 rounded-full font-medium ${
                                        user.status === "active" ? "bg-emerald-500/10 text-emerald-500" : user.status === "banned" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                                    }`}>{user.status === "active" ? "Actif" : user.status === "banned" ? "Banni" : "Suspendu"}</span>
                                    <span className={`text-caption px-2.5 py-0.5 rounded-full font-medium ${
                                        user.role === "vip" ? "bg-amber-500/10 text-amber-500" : user.role === "moderator" ? "bg-blue-500/10 text-blue-500" : "bg-b-surface1 text-t-secondary"
                                    }`}>{user.role}</span>
                                </div>
                                <p className="text-body-2 text-t-secondary">ID: {id || user.id}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-b-surface1 flex items-center gap-3">
                                <Mail className="w-4 h-4 text-t-tertiary shrink-0" />
                                <div><p className="text-caption text-t-tertiary">Email</p><p className="text-body-2 font-mono">{user.email}</p></div>
                            </div>
                            <div className="p-3 rounded-xl bg-b-surface1 flex items-center gap-3">
                                <Globe className="w-4 h-4 text-t-tertiary shrink-0" />
                                <div><p className="text-caption text-t-tertiary">IP / Pays</p><p className="text-body-2 font-mono">{user.ip} ({user.country})</p></div>
                            </div>
                            <div className="p-3 rounded-xl bg-b-surface1 flex items-center gap-3">
                                <Monitor className="w-4 h-4 text-t-tertiary shrink-0" />
                                <div><p className="text-caption text-t-tertiary">Appareil</p><p className="text-body-2">{user.device}</p></div>
                            </div>
                            <div className="p-3 rounded-xl bg-b-surface1 flex items-center gap-3">
                                <Clock className="w-4 h-4 text-t-tertiary shrink-0" />
                                <div><p className="text-caption text-t-tertiary">Membre depuis</p><p className="text-body-2">{new Date(user.createdAt).toLocaleDateString("fr-FR")} ({creationDuration()})</p></div>
                            </div>
                            <div className="p-3 rounded-xl bg-b-surface1 flex items-center gap-3">
                                <Activity className="w-4 h-4 text-t-tertiary shrink-0" />
                                <div><p className="text-caption text-t-tertiary">Dernière connexion</p><p className="text-body-2">{new Date(user.lastLogin).toLocaleString("fr-FR")}</p></div>
                            </div>
                            <div className="p-3 rounded-xl bg-b-surface1 flex items-center gap-3">
                                <UserCog className="w-4 h-4 text-t-tertiary shrink-0" />
                                <div><p className="text-caption text-t-tertiary">Parrainé par</p><p className="text-body-2">{user.referredBy}</p></div>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <button onClick={() => setShowLogs(!showLogs)} className="flex items-center justify-between w-full">
                            <h3 className="text-h6 font-semibold">Historique d&apos;activité ({user.logs.length})</h3>
                            {showLogs ? <ChevronUp className="w-5 h-5 text-t-tertiary" /> : <ChevronDown className="w-5 h-5 text-t-tertiary" />}
                        </button>
                        {showLogs && (
                            <div className="mt-4 space-y-1 max-h-96 overflow-y-auto">
                                {user.logs.map((log) => (
                                    <div key={log.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 p-3 rounded-xl bg-b-surface1 text-body-2">
                                        <span className="font-medium text-t-primary flex-1">{log.action}</span>
                                        <span className="text-caption text-t-tertiary font-mono">{log.ip}</span>
                                        <span className="text-caption text-t-tertiary hidden md:block">{log.device}</span>
                                        <span className="text-caption text-t-tertiary shrink-0">{log.date}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="card !p-5">
                        <h3 className="text-sub-title-1 font-semibold mb-3">Abonnement</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-body-2"><span className="text-t-secondary">Plan</span><span className="font-semibold text-emerald-500">{user.subscription}</span></div>
                            <div className="flex justify-between text-body-2"><span className="text-t-secondary">Expire</span><span>{user.subscriptionExpiry}</span></div>
                            <div className="flex justify-between text-body-2"><span className="text-t-secondary">Total dépensé</span><span className="font-semibold">{user.totalSpent}</span></div>
                            <div className="flex justify-between text-body-2"><span className="text-t-secondary">Signaux suivis</span><span>{user.totalSignalsFollowed}</span></div>
                        </div>
                    </div>

                    <div className="card !p-5">
                        <h3 className="text-sub-title-1 font-semibold mb-3">Changer le rôle</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {["member", "vip", "moderator", "admin"].map((r) => (
                                <button key={r} onClick={() => setNewRole(r)}
                                    className={`h-9 px-4 rounded-lg text-caption border transition-colors ${
                                        newRole === r ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-b-surface1 border-s-border text-t-secondary"
                                    }`}>{r}</button>
                            ))}
                        </div>
                        {newRole !== user.role && (
                            <button onClick={() => setUser((u) => ({ ...u, role: newRole }))}
                                className="w-full h-10 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors">
                                Appliquer: {newRole}
                            </button>
                        )}
                    </div>

                    <div className="card !p-5">
                        <h3 className="text-sub-title-1 font-semibold mb-3">Actions</h3>
                        <div className="space-y-2">
                            <button onClick={() => setShowResetPwd(true)}
                                className="w-full h-10 rounded-xl bg-b-surface1 border border-s-border text-button text-t-secondary hover:text-t-primary transition-colors flex items-center justify-center gap-2">
                                <Key className="w-4 h-4" /> Réinitialiser le mot de passe
                            </button>
                            {user.status !== "banned" ? (
                                <button onClick={() => setConfirmBan(true)}
                                    className="w-full h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-button text-red-500 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
                                    <Ban className="w-4 h-4" /> Bannir l&apos;utilisateur
                                </button>
                            ) : (
                                <button onClick={toggleBan}
                                    className="w-full h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-button text-emerald-500 hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> Débannir l&apos;utilisateur
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {confirmBan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="card !p-6 w-full max-w-sm">
                        <h3 className="text-h6 font-semibold text-red-500 mb-2">Confirmer le bannissement</h3>
                        <p className="text-body-2 text-t-secondary mb-4">Voulez-vous vraiment bannir <strong>{user.username}</strong> ? Il ne pourra plus accéder à la plateforme.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmBan(false)} className="flex-1 h-11 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary">Annuler</button>
                            <button onClick={toggleBan} className="flex-1 h-11 rounded-xl bg-red-500 text-white text-button font-semibold">Bannir</button>
                        </div>
                    </div>
                </div>
            )}

            {showResetPwd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="card !p-6 w-full max-w-sm">
                        <h3 className="text-h6 font-semibold mb-2">Réinitialiser le mot de passe</h3>
                        <p className="text-body-2 text-t-secondary mb-4">Un email de réinitialisation sera envoyé à <strong>{user.email}</strong>.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowResetPwd(false)} className="flex-1 h-11 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary">Annuler</button>
                            <button onClick={() => setShowResetPwd(false)} className="flex-1 h-11 rounded-xl bg-red-500 text-white text-button font-semibold">Envoyer</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
