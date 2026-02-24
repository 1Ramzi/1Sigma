"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    LayoutDashboard, Users, Signal, UserCheck, Settings, Shield, Briefcase, HeadphonesIcon,
    MessageSquareWarning, GraduationCap, UserPlus, EyeOff, Sun, Moon, X, Menu,
    PlusCircle, List, MessageSquare, User, Bell, Megaphone, TrendingUp, Home,
} from "lucide-react";

type NavItem = { title: string; icon: React.ElementType; href: string; disabled?: boolean; badge?: string };

const adminNav: NavItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { title: "Utilisateurs", icon: Users, href: "/admin/users" },
    { title: "Traders", icon: UserCheck, href: "/admin/traders" },
    { title: "Signaux", icon: Signal, href: "/admin/signals" },
    { title: "Demandes avis", icon: EyeOff, href: "/admin/reviews" },
    { title: "Tickets", icon: HeadphonesIcon, href: "/admin/tickets" },
    { title: "Alertes", icon: MessageSquareWarning, href: "/admin/alerts" },
    { title: "Adhésions broker", icon: Briefcase, href: "/admin/broker" },
    { title: "Gestion traders", icon: UserPlus, href: "/admin/create-trader" },
    { title: "Formations", icon: GraduationCap, href: "/admin/formations" },
    { title: "Paramètres", icon: Settings, href: "/admin/settings" },
];

const traderNav: NavItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/trader" },
    { title: "Nouveau Signal", icon: PlusCircle, href: "/trader/signals/new" },
    { title: "Mes Signaux", icon: List, href: "/trader/signals" },
    { title: "Notifications", icon: Bell, href: "/trader/notifications" },
    { title: "Alertes", icon: Megaphone, href: "/trader/alerts" },
    { title: "Feedbacks", icon: MessageSquare, href: "/trader/feedback" },
    { title: "Mon Profil", icon: User, href: "/trader/profile" },
];

type BottomTab = { title: string; icon: React.ElementType; href: string };

const adminTabs: BottomTab[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { title: "Users", icon: Users, href: "/admin/users" },
    { title: "Traders", icon: UserCheck, href: "/admin/traders" },
    { title: "Broker", icon: Briefcase, href: "/admin/broker" },
];

const traderTabs: BottomTab[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/trader" },
    { title: "Signaux", icon: List, href: "/trader/signals" },
    { title: "Nouveau", icon: PlusCircle, href: "/trader/signals/new" },
    { title: "Profil", icon: User, href: "/trader/profile" },
];

function isActive(pathname: string, href: string, isRoot: boolean): boolean {
    if (isRoot) return pathname === href;
    return pathname.startsWith(href);
}

type Props = {
    title?: string;
    children: React.ReactNode;
    mode: "admin" | "trader";
};

export default function MobileLayout({ title, children, mode }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const nav = mode === "admin" ? adminNav : traderNav;
    const tabs = mode === "admin" ? adminTabs : traderTabs;
    const accentColor = mode === "admin" ? "red" : "emerald";
    const rootHref = mode === "admin" ? "/admin" : "/trader";

    return (
        <div className="min-h-screen bg-b-surface1 pb-20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-30 bg-b-surface2 border-b border-s-border safe-top">
                <div className="flex items-center h-14 px-4">
                    <button onClick={() => setMenuOpen(true)} className="w-10 h-10 -ml-2 flex items-center justify-center rounded-xl text-t-secondary">
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex-1 text-center">
                        <h1 className="text-sub-title-1 font-bold text-t-primary truncate">{title || "Tradexa"}</h1>
                    </div>
                    <div className="w-10 h-10 -mr-2" />
                </div>
            </header>

            {/* Slide-out menu */}
            {menuOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setMenuOpen(false)} />}
            <aside className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-b-surface2 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center justify-between p-4 border-b border-s-border">
                    <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-xl ${mode === "admin" ? "bg-red-500/10" : "bg-emerald-500/10"} flex items-center justify-center`}>
                            {mode === "admin"
                                ? <Shield className="w-4 h-4 text-red-500" />
                                : <TrendingUp className="w-4 h-4 text-emerald-500" />
                            }
                        </div>
                        <div>
                            <p className="text-sub-title-1 font-bold text-t-primary">Tradexa</p>
                            <p className="text-caption text-t-tertiary">{mode === "admin" ? "Admin" : "Trader"}</p>
                        </div>
                    </div>
                    <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl text-t-secondary">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-3 space-y-0.5 overflow-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
                    {nav.map((item) => {
                        const active = isActive(pathname, item.href, item.href === rootHref);
                        return (
                            <Link key={item.href} href={item.disabled ? "#" : item.href} onClick={() => !item.disabled && setMenuOpen(false)}
                                className={`flex items-center gap-3 h-11 px-3 rounded-xl text-button transition-all ${
                                    item.disabled ? "text-t-tertiary/40 cursor-not-allowed" :
                                    active ? `bg-${accentColor}-500/10 text-${accentColor}-500` : "text-t-secondary active:bg-b-surface1"
                                }`}>
                                <item.icon className={`w-[18px] h-[18px] ${active && !item.disabled ? `text-${accentColor}-500` : ""}`} />
                                <span className="text-[13px]">{item.title}</span>
                                {item.badge && <span className="ml-auto text-[10px] bg-b-surface1 text-t-tertiary px-2 py-0.5 rounded-full">{item.badge}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-s-border space-y-0.5">
                    <Link href="/" onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 h-11 px-3 rounded-xl text-button text-t-secondary active:bg-b-surface1">
                        <Home className="w-[18px] h-[18px]" /> <span className="text-[13px]">Accueil</span>
                    </Link>
                    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-3 w-full h-11 px-3 rounded-xl text-button text-t-secondary active:bg-b-surface1">
                        {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                        <span className="text-[13px]">{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="pt-14 px-4 py-4">
                {children}
            </main>

            {/* Bottom tab bar */}
            <nav className="fixed bottom-0 left-0 right-0 z-30 bg-b-surface2 border-t border-s-border safe-bottom">
                <div className="flex items-center justify-around h-16">
                    {tabs.map((tab) => {
                        const active = isActive(pathname, tab.href, tab.href === rootHref);
                        return (
                            <Link key={tab.href} href={tab.href}
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                                    active ? `text-${accentColor}-500` : "text-t-tertiary"
                                }`}>
                                <tab.icon className="w-5 h-5" />
                                <span className="text-[10px] font-medium">{tab.title}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
