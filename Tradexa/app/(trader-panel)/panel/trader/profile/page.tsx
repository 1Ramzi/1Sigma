"use client";

import { useState } from "react";
import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { Save, User } from "lucide-react";

export default function ProfilePage() {
    const { profile } = useTraderStore();
    const [form, setForm] = useState({ ...profile });
    const [saved, setSaved] = useState(false);

    const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));
    const setSocial = (key: string, val: string) => setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, [key]: val } }));

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <TraderLayout title="Mon Profil">
            <div className="max-w-2xl mx-auto space-y-4">
                <div className="card !p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <User className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                            <h2 className="text-h6 font-bold">{form.displayName}</h2>
                            <p className="text-body-2 text-t-secondary">{form.tradingStyle}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Nom d&apos;affichage</label>
                            <input type="text" value={form.displayName} onChange={(e) => set("displayName", e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Bio</label>
                            <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)} maxLength={200}
                                className="w-full h-24 px-4 py-3 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none resize-none" />
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Style de trading</label>
                            <input type="text" value={form.tradingStyle} onChange={(e) => set("tradingStyle", e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none"
                                placeholder="Ex: Swing Trading, Scalping..." />
                        </div>
                    </div>
                </div>

                <div className="card !p-6">
                    <h3 className="text-h6 font-semibold mb-4">Réseaux sociaux</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Twitter</label>
                            <input type="url" value={form.socialLinks.twitter || ""} onChange={(e) => setSocial("twitter", e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none" placeholder="https://twitter.com/..." />
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Telegram</label>
                            <input type="url" value={form.socialLinks.telegram || ""} onChange={(e) => setSocial("telegram", e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none" placeholder="https://t.me/..." />
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Discord</label>
                            <input type="url" value={form.socialLinks.discord || ""} onChange={(e) => setSocial("discord", e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-emerald-500 outline-none" placeholder="https://discord.gg/..." />
                        </div>
                    </div>
                </div>

                <button onClick={handleSave}
                    className="w-full h-12 rounded-xl bg-emerald-500 text-white text-button font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />
                    {saved ? "Sauvegardé !" : "Enregistrer le profil"}
                </button>
            </div>
        </TraderLayout>
    );
}
