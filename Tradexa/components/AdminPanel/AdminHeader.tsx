"use client";

import { useState } from "react";
import { Menu, Bell, Globe, VolumeX, Volume2 } from "lucide-react";
import { setLiveAlertsMuted } from "@/components/LiveAlertStack";

const LANGS = [
    { code: "fr", label: "FR", flag: "🇫🇷", name: "Français" },
    { code: "en", label: "EN", flag: "🇬🇧", name: "English" },
    { code: "ar", label: "AR", flag: "🇸🇦", name: "العربية" },
];

const NOTIFS = [
    { id: 1, text: "Nouveau signal EUR/USD en attente d'approbation", time: "2 min", type: "signal" },
    { id: 2, text: "Ticket #tk_001 — Réponse utilisateur reçue", time: "15 min", type: "ticket" },
    { id: 3, text: "Nouvelle adhésion broker à vérifier (Ahmed Benali)", time: "32 min", type: "broker" },
    { id: 4, text: "Demande suppression avis de TraderPro", time: "1h", type: "review" },
    { id: 5, text: "+12 nouvelles inscriptions aujourd'hui", time: "2h", type: "stat" },
];

type Props = { title?: string; onToggleSidebar: () => void };

export default function AdminHeader({ title, onToggleSidebar }: Props) {
    const [lang, setLang] = useState("fr");
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [showNotifs, setShowNotifs] = useState(false);
    const [muted, setMuted] = useState(false);
    const currentLang = LANGS.find((l) => l.code === lang)!;

    const toggleMute = () => {
        const next = !muted;
        setMuted(next);
        setLiveAlertsMuted(next);
    };

    return (
        <header className="fixed top-0 right-0 left-0 xl:left-64 z-20 bg-b-surface1 border-b border-transparent dark:border-s-border">
            <div className="flex items-center h-16 px-5 max-md:px-3">
                <button className="xl:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-b-surface2 transition-colors mr-3" onClick={onToggleSidebar} title="Menu">
                    <Menu className="w-5 h-5 text-t-secondary" />
                </button>
                {title && <h1 className="text-h5 font-semibold text-t-primary truncate">{title}</h1>}
                <div className="ml-auto flex items-center gap-2">
                    <div className="relative">
                        <button onClick={() => setShowLangMenu(!showLangMenu)}
                            className="h-9 px-2.5 flex items-center gap-1.5 rounded-xl hover:bg-b-surface2 transition-colors text-t-secondary" title="Langue">
                            <Globe className="w-4 h-4" />
                            <span className="text-caption font-medium hidden sm:inline">{currentLang.flag} {currentLang.label}</span>
                        </button>
                        {showLangMenu && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                                <div className="absolute right-0 top-full mt-1 bg-b-surface2 border border-s-border rounded-xl p-1 z-20 shadow-lg w-40">
                                    {LANGS.map((l) => (
                                        <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                                            className={`w-full h-9 px-3 rounded-lg text-caption text-left flex items-center gap-2 transition-colors ${lang === l.code ? "bg-red-500/10 text-red-500 font-semibold" : "text-t-secondary hover:bg-b-surface1"}`}>
                                            <span>{l.flag}</span> {l.name}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <button onClick={toggleMute}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${muted ? "bg-red-500/10 text-red-500" : "hover:bg-b-surface2 text-t-secondary"}`}
                        title={muted ? "Réactiver les alertes" : "Couper les alertes"}>
                        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <div className="relative">
                        <button onClick={() => setShowNotifs(!showNotifs)} className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-b-surface2 transition-colors" title="Notifications">
                            <Bell className="w-5 h-5 text-t-secondary" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        {showNotifs && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowNotifs(false)} />
                                <div className="absolute right-0 top-full mt-1 bg-b-surface2 border border-s-border rounded-xl p-1 z-20 shadow-lg w-80">
                                    <p className="px-3 py-2 text-[10px] text-t-tertiary uppercase tracking-wider font-semibold">Notifications</p>
                                    {NOTIFS.map((n) => (
                                        <button key={n.id} onClick={() => setShowNotifs(false)}
                                            className="w-full text-left p-3 rounded-lg hover:bg-b-surface1 transition-colors">
                                            <p className="text-caption text-t-primary leading-snug">{n.text}</p>
                                            <p className="text-[10px] text-t-tertiary mt-0.5">{n.time}</p>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold text-button">AD</div>
                </div>
            </div>
        </header>
    );
}
