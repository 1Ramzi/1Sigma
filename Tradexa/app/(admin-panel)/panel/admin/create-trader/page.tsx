"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { UserPlus, Copy, CheckCircle, Eye, EyeOff, Key, Search, Ban, ShieldCheck, Signal, FileText, ChevronDown, ChevronUp, X } from "lucide-react";

type Trader = {
    id: string; username: string; email: string; password: string; createdAt: string;
    status: "active" | "banned"; signalCount: number;
    logs: { date: string; action: string }[];
};

const mockTraders: Trader[] = [
    { id: "t1", username: "TraderPro", email: "traderpro@tradexa.com", password: "Tp#2026xK9m", createdAt: "15/01/2026 10:30", status: "active", signalCount: 47, logs: [
        { date: "17/02/2026 21:06", action: "Signal EUR/USD publié" }, { date: "17/02/2026 15:30", action: "Connexion" }, { date: "16/02/2026 20:00", action: "Signal BTC/USDT clôturé (TP1)" },
    ] },
    { id: "t2", username: "CryptoKing", email: "crypto@tradexa.com", password: "Ck!2026aB3n", createdAt: "20/01/2026 14:15", status: "active", signalCount: 23, logs: [
        { date: "17/02/2026 18:00", action: "Signal SOL/USDT publié" }, { date: "16/02/2026 09:45", action: "Connexion" },
    ] },
    { id: "t3", username: "ForexMaster", email: "forex@tradexa.com", password: "Fm@2026pQ7x", createdAt: "01/02/2026 09:00", status: "banned", signalCount: 5, logs: [
        { date: "10/02/2026 12:00", action: "Banni par admin — Signals frauduleux" },
    ] },
];

export default function ManageTradersPage() {
    const [traders, setTraders] = useState(mockTraders);
    const [search, setSearch] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    const filtered = traders.filter((t) => !search || t.username.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase()));
    const activeCount = traders.filter((t) => t.status === "active").length;
    const bannedCount = traders.filter((t) => t.status === "banned").length;

    const generatePassword = () => {
        const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
        let pwd = "";
        for (let i = 0; i < 16; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
        setForm((f) => ({ ...f, password: pwd, confirmPassword: pwd }));
    };

    const handleCreate = () => {
        if (!form.username || !form.email || !form.password || form.password !== form.confirmPassword) return;
        const now = new Date().toLocaleString("fr-FR");
        setTraders((p) => [{ id: `t_${Date.now()}`, username: form.username, email: form.email, password: form.password, createdAt: now, status: "active", signalCount: 0, logs: [{ date: now, action: "Compte créé par admin" }] }, ...p]);
        setForm({ username: "", email: "", password: "", confirmPassword: "" });
        setShowCreate(false);
    };

    const toggleBan = (id: string) => {
        setTraders((p) => p.map((t) => {
            if (t.id !== id) return t;
            const now = new Date().toLocaleString("fr-FR");
            const newStatus = t.status === "banned" ? "active" : "banned";
            return { ...t, status: newStatus, logs: [{ date: now, action: newStatus === "banned" ? "Banni par admin" : "Débanni par admin" }, ...t.logs] };
        }));
    };

    const copyText = (text: string, key: string) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 1500); };
    const copyAll = (t: Trader) => {
        navigator.clipboard.writeText(`Identifiants Trader Tradexa\n\nUsername: ${t.username}\nEmail: ${t.email}\nMot de passe: ${t.password}\n\nConnexion: https://tradexa-dashboard.vercel.app/login`);
        setCopied(`all_${t.id}`); setTimeout(() => setCopied(null), 2000);
    };

    return (
        <AdminLayout title="Gestion des traders">
            <div className="card p-5 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <div className="relative flex-1 max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-t-tertiary" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un trader..."
                            className="w-full h-10 pl-10 pr-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none focus:border-red-500" />
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                        <div className="flex items-center gap-4 text-caption text-t-tertiary">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {activeCount} actifs</span>
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> {bannedCount} bannis</span>
                        </div>
                        <button onClick={() => setShowCreate(!showCreate)} className="h-10 px-4 rounded-xl bg-red-500 text-white text-caption font-semibold hover:bg-red-600 transition-colors flex items-center gap-1.5">
                            <UserPlus className="w-4 h-4" /> Créer un trader
                        </button>
                    </div>
                </div>
            </div>

            {showCreate && (
                <div className="card p-5 mb-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-h6 font-semibold flex items-center gap-2"><UserPlus className="w-5 h-5 text-red-500" /> Nouveau trader</h3>
                        <button onClick={() => setShowCreate(false)} className="text-t-tertiary hover:text-t-primary" title="Fermer"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="text-caption text-t-secondary mb-1 block">Username</label><input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full h-10 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none" placeholder="trader_pro" /></div>
                        <div><label className="text-caption text-t-secondary mb-1 block">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-10 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none" placeholder="trader@example.com" /></div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1"><label className="text-caption text-t-secondary">Mot de passe</label><button onClick={generatePassword} className="text-[11px] text-red-500 hover:text-red-400 flex items-center gap-1"><Key className="w-3 h-3" /> Générer</button></div>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full h-10 px-4 pr-10 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none font-mono" placeholder="••••••••" />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-t-tertiary hover:text-t-primary" title="Afficher/masquer">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                        </div>
                    </div>
                    <div><label className="text-caption text-t-secondary mb-1 block">Confirmer</label><input type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className={`w-full h-10 px-4 rounded-xl bg-b-surface1 border text-body-2 text-t-primary outline-none font-mono ${form.confirmPassword && form.password !== form.confirmPassword ? "border-red-500" : "border-s-border"}`} placeholder="••••••••" /></div>
                    <button onClick={handleCreate} disabled={!form.username || !form.email || !form.password || form.password !== form.confirmPassword}
                        className="w-full h-10 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"><UserPlus className="w-4 h-4" /> Créer</button>
                </div>
            )}

            <div className="card p-0 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-caption text-t-tertiary border-b border-s-border">
                            <th className="px-5 py-3.5">Trader</th>
                            <th className="px-5 py-3.5">Signaux</th>
                            <th className="px-5 py-3.5">Statut</th>
                            <th className="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((t) => {
                            const expanded = expandedId === t.id;
                            return (
                                <tr key={t.id} className="group">
                                    <td colSpan={4} className="p-0">
                                        <div className="flex items-center gap-3 px-5 py-3.5 cursor-pointer hover:bg-b-surface1/50 transition-colors border-b border-s-border/50" onClick={() => setExpandedId(expanded ? null : t.id)}>
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[11px] shrink-0 ${t.status === "banned" ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"}`}>{t.username.slice(0, 2).toUpperCase()}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-body-2 font-semibold text-t-primary">{t.username}</p>
                                                <p className="text-caption text-t-tertiary truncate">{t.email} · Créé le {t.createdAt}</p>
                                            </div>
                                            <div className="w-20 text-center">
                                                <span className="text-body-2 font-semibold">{t.signalCount}</span>
                                            </div>
                                            <div className="w-20 text-center">
                                                <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${t.status === "banned" ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                                                    {t.status === "banned" ? "Banni" : "Actif"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                                <button onClick={() => toggleBan(t.id)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${t.status === "banned" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : "hover:bg-red-500/10 text-t-tertiary hover:text-red-500"}`} title={t.status === "banned" ? "Débannir" : "Bannir"}>
                                                    {t.status === "banned" ? <ShieldCheck className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                                                </button>
                                                <button onClick={() => copyAll(t)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${copied === `all_${t.id}` ? "bg-emerald-500/10 text-emerald-500" : "hover:bg-b-surface1 text-t-tertiary"}`} title="Copier identifiants">
                                                    {copied === `all_${t.id}` ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                </button>
                                                <div className="w-5 flex items-center justify-center">
                                                    {expanded ? <ChevronUp className="w-4 h-4 text-t-tertiary" /> : <ChevronDown className="w-4 h-4 text-t-tertiary" />}
                                                </div>
                                            </div>
                                        </div>
                                        {expanded && (
                                            <div className="bg-b-surface1/30 px-5 py-4 space-y-4 border-b border-s-border/50">
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                    {[{ label: "Email", value: t.email, k: `e_${t.id}` }, { label: "Username", value: t.username, k: `u_${t.id}` }, { label: "Mot de passe", value: t.password, k: `p_${t.id}` }].map((f) => (
                                                        <div key={f.k} className="p-3 rounded-xl bg-b-surface2 flex items-center justify-between">
                                                            <div className="min-w-0"><p className="text-[10px] text-t-tertiary">{f.label}</p><p className="text-caption font-mono text-t-primary truncate">{f.value}</p></div>
                                                            <button onClick={() => copyText(f.value, f.k)} className="shrink-0 ml-2 text-t-tertiary hover:text-t-primary" title="Copier">{copied === f.k ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}</button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-b-surface2"><Signal className="w-4 h-4 text-blue-500" /><span className="text-caption font-semibold">{t.signalCount} signaux</span></div>
                                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-b-surface2"><FileText className="w-4 h-4 text-t-tertiary" /><span className="text-caption text-t-tertiary">{t.logs.length} logs</span></div>
                                                </div>
                                                <div>
                                                    <p className="text-caption font-semibold text-t-secondary mb-2">Historique des actions</p>
                                                    <div className="space-y-1 max-h-40 overflow-y-auto">
                                                        {t.logs.map((log, i) => (
                                                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-b-surface2/50 text-caption">
                                                                <span className="text-[10px] text-t-tertiary shrink-0 w-28">{log.date}</span>
                                                                <span className="text-t-primary">{log.action}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="py-12 text-center text-body-2 text-t-tertiary">Aucun trader trouvé</div>
                )}
            </div>
        </AdminLayout>
    );
}
