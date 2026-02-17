"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { UserPlus, Copy, CheckCircle, Eye, EyeOff, Key } from "lucide-react";

type CreatedTrader = { id: string; username: string; email: string; password: string; createdAt: string };

export default function CreateTraderPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [created, setCreated] = useState<CreatedTrader[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    const generatePassword = () => {
        const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
        let pwd = "";
        for (let i = 0; i < 16; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
        setForm((f) => ({ ...f, password: pwd, confirmPassword: pwd }));
    };

    const handleCreate = () => {
        if (!form.username || !form.email || !form.password || form.password !== form.confirmPassword) return;
        const newTrader: CreatedTrader = {
            id: `trader_${Date.now()}`, username: form.username, email: form.email,
            password: form.password, createdAt: new Date().toLocaleString("fr-FR"),
        };
        setCreated((p) => [newTrader, ...p]);
        setForm({ username: "", email: "", password: "", confirmPassword: "" });
    };

    const copyText = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(null), 1500);
    };

    const copyAll = (t: CreatedTrader) => {
        const text = `Identifiants Trader Tradexa\n\nUsername: ${t.username}\nEmail: ${t.email}\nMot de passe: ${t.password}\n\nConnexion: https://tradexa-dashboard.vercel.app/login`;
        navigator.clipboard.writeText(text);
        setCopied(`all_${t.id}`);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <AdminLayout title="Créer un compte trader">
            <div className="max-w-2xl mx-auto space-y-6">
                <p className="text-body-2 text-t-secondary">Créez un compte trader en entrant les identifiants. Copiez les accès pour les transmettre au trader.</p>

                <div className="card !p-6 space-y-4">
                    <h3 className="text-h6 font-semibold flex items-center gap-2"><UserPlus className="w-5 h-5 text-red-500" /> Nouveau trader</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Nom d&apos;utilisateur</label>
                            <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none" placeholder="trader_pro" />
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Email</label>
                            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none" placeholder="trader@example.com" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-caption text-t-secondary">Mot de passe</label>
                            <button onClick={generatePassword} className="text-[11px] text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors">
                                <Key className="w-3 h-3" /> Générer automatiquement
                            </button>
                        </div>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full h-11 px-4 pr-12 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none font-mono" placeholder="••••••••" />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-t-tertiary hover:text-t-primary transition-colors">
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1.5 block">Confirmer le mot de passe</label>
                        <input type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            className={`w-full h-11 px-4 rounded-xl bg-b-surface1 border text-body-2 text-t-primary outline-none font-mono ${form.confirmPassword && form.password !== form.confirmPassword ? "border-red-500" : "border-s-border focus:border-red-500"}`}
                            placeholder="••••••••" />
                        {form.confirmPassword && form.password !== form.confirmPassword && (
                            <p className="text-caption text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
                        )}
                    </div>
                    <button onClick={handleCreate} disabled={!form.username || !form.email || !form.password || form.password !== form.confirmPassword}
                        className="w-full h-11 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                        <UserPlus className="w-4 h-4" /> Créer le compte trader
                    </button>
                </div>

                {created.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-sub-title-1 font-semibold">Comptes créés ({created.length})</h3>
                        {created.map((t) => (
                            <div key={t.id} className="card !p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="text-body-2 font-bold text-t-primary">{t.username}</p>
                                        <p className="text-caption text-t-tertiary">Créé le {t.createdAt}</p>
                                    </div>
                                    <button onClick={() => copyAll(t)}
                                        className={`h-8 px-3 rounded-lg text-caption font-medium flex items-center gap-1.5 transition-colors ${copied === `all_${t.id}` ? "bg-emerald-500/10 text-emerald-500" : "bg-b-surface1 border border-s-border text-t-secondary hover:text-t-primary"}`}>
                                        {copied === `all_${t.id}` ? <><CheckCircle className="w-3.5 h-3.5" /> Copié !</> : <><Copy className="w-3.5 h-3.5" /> Copier tout</>}
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { label: "Email", value: t.email, key: `email_${t.id}` },
                                        { label: "Username", value: t.username, key: `user_${t.id}` },
                                        { label: "Mot de passe", value: t.password, key: `pwd_${t.id}` },
                                    ].map((f) => (
                                        <div key={f.key} className="p-3 rounded-xl bg-b-surface1 flex items-center justify-between">
                                            <div className="min-w-0">
                                                <p className="text-[10px] text-t-tertiary">{f.label}</p>
                                                <p className="text-caption font-mono text-t-primary truncate">{f.value}</p>
                                            </div>
                                            <button onClick={() => copyText(f.value, f.key)} className="shrink-0 ml-2 text-t-tertiary hover:text-t-primary transition-colors">
                                                {copied === f.key ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
