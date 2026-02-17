"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    LayoutDashboard, PlusCircle, List, MessageSquare, Wallet, User, X, Sun, Moon, TrendingUp, ArrowLeft,
    Bell, Megaphone, Video,
} from "lucide-react";

type NavItem = { title: string; icon: React.ElementType; href: string; disabled?: boolean; badge?: string };

const navigation: NavItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/panel/trader" },
    { title: "Nouveau Signal", icon: PlusCircle, href: "/panel/trader/signals/new" },
    { title: "Mes Signaux", icon: List, href: "/panel/trader/signals" },
    { title: "Notifications", icon: Bell, href: "/panel/trader/notifications" },
    { title: "Alertes", icon: Megaphone, href: "/panel/trader/alerts" },
    { title: "Feedbacks", icon: MessageSquare, href: "/panel/trader/feedback" },
    { title: "Revenus", icon: Wallet, href: "/panel/trader/earnings" },
    { title: "Lives", icon: Video, href: "/panel/trader/lives", disabled: true, badge: "Bientôt" },
    { title: "Mon Profil", icon: User, href: "/panel/trader/profile" },
];

function getActiveHref(pathname: string): string {
    const sorted = [...navigation].filter(n => !n.disabled).sort((a, b) => b.href.length - a.href.length);
    for (const item of sorted) {
        if (item.href === "/panel/trader") {
            if (pathname === "/panel/trader") return item.href;
        } else if (pathname.startsWith(item.href)) {
            return item.href;
        }
    }
    return "/panel/trader";
}

type Props = { visible: boolean; onClose: () => void };

export default function TraderSidebar({ visible, onClose }: Props) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const activeHref = getActiveHref(pathname);

    return (
        <>
            {visible && <div className="fixed inset-0 z-30 bg-black/50 xl:hidden" onClick={onClose} />}
            <aside className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col w-64 bg-b-surface2 border-r border-transparent dark:border-s-border p-4 transition-transform duration-300 max-xl:w-72 ${visible ? "translate-x-0" : "max-xl:-translate-x-full"}`}>
                <div className="flex items-center justify-between mb-6">
                    <Link href="/panel/trader" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-[#10B981]" />
                        </div>
                        <div>
                            <h1 className="text-sub-title-1 font-bold text-t-primary">Tradexa</h1>
                            <p className="text-caption text-t-tertiary">Panel Trader</p>
                        </div>
                    </Link>
                    <button className="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-b-surface1 transition-colors" onClick={onClose} title="Fermer">
                        <X className="w-5 h-5 text-t-secondary" />
                    </button>
                </div>
                <nav className="flex-1 space-y-1 overflow-auto">
                    {navigation.map((item) => {
                        const isActive = activeHref === item.href;
                        if (item.disabled) {
                            return (
                                <div key={item.href} className="flex items-center gap-3 h-11 px-3 rounded-xl text-button text-t-tertiary/50 cursor-not-allowed select-none">
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.title}</span>
                                    {item.badge && <span className="ml-auto text-[10px] bg-b-surface1 text-t-tertiary px-2 py-0.5 rounded-full">{item.badge}</span>}
                                </div>
                            );
                        }
                        return (
                            <Link key={item.href} href={item.href} onClick={onClose}
                                className={`flex items-center gap-3 h-11 px-3 rounded-xl text-button transition-all ${isActive ? "bg-[#10B981]/10 text-[#10B981]" : "text-t-secondary hover:text-t-primary hover:bg-b-surface1"}`}>
                                <item.icon className={`w-5 h-5 ${isActive ? "text-[#10B981]" : ""}`} />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="mt-auto pt-4 border-t border-s-border space-y-1">
                    <Link href="/dashboard" className="flex items-center gap-3 w-full h-11 px-3 rounded-xl text-button text-t-secondary hover:text-t-primary hover:bg-b-surface1 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Retour Dashboard
                    </Link>
                    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-3 w-full h-11 px-3 rounded-xl text-button text-t-secondary hover:text-t-primary hover:bg-b-surface1 transition-colors">
                        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
