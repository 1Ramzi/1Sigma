"use client";

import { useState } from "react";
import { Menu, Bell, Globe } from "lucide-react";

const LANGS = [
    { code: "fr", label: "FR", flag: "🇫🇷", name: "Français" },
    { code: "en", label: "EN", flag: "🇬🇧", name: "English" },
    { code: "ar", label: "AR", flag: "🇸🇦", name: "العربية" },
];

type Props = { title?: string; onToggleSidebar: () => void };

export default function TraderHeader({ title, onToggleSidebar }: Props) {
    const [lang, setLang] = useState("fr");
    const [showLangMenu, setShowLangMenu] = useState(false);
    const currentLang = LANGS.find((l) => l.code === lang)!;

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
                                            className={`w-full h-9 px-3 rounded-lg text-caption text-left flex items-center gap-2 transition-colors ${lang === l.code ? "bg-[#10B981]/10 text-[#10B981] font-semibold" : "text-t-secondary hover:bg-b-surface1"}`}>
                                            <span>{l.flag}</span> {l.name}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-b-surface2 transition-colors" title="Notifications">
                        <Bell className="w-5 h-5 text-t-secondary" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#10B981] rounded-full" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] font-bold text-button">TP</div>
                </div>
            </div>
        </header>
    );
}
