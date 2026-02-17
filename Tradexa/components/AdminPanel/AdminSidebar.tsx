"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    LayoutDashboard, Users, Signal, UserCheck, Settings, X, Sun, Moon, Shield, ArrowLeft,
    Briefcase, HeadphonesIcon, MessageSquareWarning, EyeOff, GraduationCap,
} from "lucide-react";

type NavItem = { title: string; icon: React.ElementType; href: string; section?: string };

const navigation: NavItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/panel/admin" },
    { title: "Utilisateurs", icon: Users, href: "/panel/admin/users", section: "Gestion" },
    { title: "Traders", icon: UserCheck, href: "/panel/admin/traders" },
    { title: "Signaux", icon: Signal, href: "/panel/admin/signals" },
    { title: "Demandes avis", icon: EyeOff, href: "/panel/admin/reviews", section: "Modération" },
    { title: "Tickets support", icon: HeadphonesIcon, href: "/panel/admin/tickets" },
    { title: "Alertes traders", icon: MessageSquareWarning, href: "/panel/admin/alerts" },
    { title: "Adhésions broker", icon: Briefcase, href: "/panel/admin/broker", section: "Business" },
    { title: "Formations", icon: GraduationCap, href: "/panel/admin/formations", section: "Contenu" },
    { title: "Paramètres", icon: Settings, href: "/panel/admin/settings" },
];

function getActiveHref(pathname: string): string {
    const sorted = [...navigation].sort((a, b) => b.href.length - a.href.length);
    for (const item of sorted) {
        if (item.href === "/panel/admin") {
            if (pathname === "/panel/admin") return item.href;
        } else if (pathname.startsWith(item.href)) {
            return item.href;
        }
    }
    return "/panel/admin";
}

type Props = { visible: boolean; onClose: () => void };

export default function AdminSidebar({ visible, onClose }: Props) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const activeHref = getActiveHref(pathname);

    return (
        <>
            {visible && <div className="fixed inset-0 z-30 bg-black/50 xl:hidden" onClick={onClose} />}
            <aside className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col w-64 bg-b-surface2 border-r border-transparent dark:border-s-border p-4 transition-transform duration-300 max-xl:w-72 ${visible ? "translate-x-0" : "max-xl:-translate-x-full"}`}>
                <div className="flex items-center justify-between mb-6">
                    <Link href="/panel/admin" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h1 className="text-sub-title-1 font-bold text-t-primary">Tradexa</h1>
                            <p className="text-caption text-t-tertiary">Panel Admin</p>
                        </div>
                    </Link>
                    <button className="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-b-surface1 transition-colors" onClick={onClose} title="Fermer">
                        <X className="w-5 h-5 text-t-secondary" />
                    </button>
                </div>
                <nav className="flex-1 space-y-0.5 overflow-auto">
                    {navigation.map((item, i) => {
                        const isActive = activeHref === item.href;
                        return (
                            <div key={item.href}>
                                {item.section && (
                                    <p className={`text-[10px] uppercase tracking-wider text-t-tertiary/60 font-semibold px-3 ${i > 0 ? "mt-4" : ""} mb-1.5`}>{item.section}</p>
                                )}
                                <Link href={item.href} onClick={onClose}
                                    className={`flex items-center gap-3 h-10 px-3 rounded-xl text-button transition-all ${isActive ? "bg-red-500/10 text-red-500" : "text-t-secondary hover:text-t-primary hover:bg-b-surface1"}`}>
                                    <item.icon className={`w-[18px] h-[18px] ${isActive ? "text-red-500" : ""}`} />
                                    <span className="text-[13px]">{item.title}</span>
                                </Link>
                            </div>
                        );
                    })}
                </nav>
                <div className="mt-auto pt-4 border-t border-s-border space-y-1">
                    <Link href="/dashboard" className="flex items-center gap-3 w-full h-10 px-3 rounded-xl text-button text-t-secondary hover:text-t-primary hover:bg-b-surface1 transition-colors">
                        <ArrowLeft className="w-[18px] h-[18px]" /> <span className="text-[13px]">Retour Dashboard</span>
                    </Link>
                    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-3 w-full h-10 px-3 rounded-xl text-button text-t-secondary hover:text-t-primary hover:bg-b-surface1 transition-colors">
                        {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                        <span className="text-[13px]">{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
