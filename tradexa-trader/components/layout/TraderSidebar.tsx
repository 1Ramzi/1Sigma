"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    LayoutDashboard,
    PlusCircle,
    List,
    MessageSquare,
    Wallet,
    User,
    X,
    Sun,
    Moon,
    TrendingUp,
} from "lucide-react";

const navigation = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/" },
    { title: "Nouveau Signal", icon: PlusCircle, href: "/signals/new" },
    { title: "Mes Signaux", icon: List, href: "/signals" },
    { title: "Feedbacks", icon: MessageSquare, href: "/feedback" },
    { title: "Revenus", icon: Wallet, href: "/earnings" },
    { title: "Mon Profil", icon: User, href: "/profile" },
];

type TraderSidebarProps = {
    visible: boolean;
    onClose: () => void;
};

export default function TraderSidebar({ visible, onClose }: TraderSidebarProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    return (
        <>
            {visible && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 xl:hidden"
                    onClick={onClose}
                />
            )}
            <aside
                className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col w-64 bg-b-surface2 border-r border-transparent dark:border-s-border p-4 transition-transform duration-300 max-xl:w-72 ${
                    visible ? "translate-x-0" : "max-xl:-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <h1 className="text-sub-title-1 font-bold text-t-primary">Tradexa</h1>
                            <p className="text-caption text-t-tertiary">Panel Trader</p>
                        </div>
                    </Link>
                    <button
                        className="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-b-surface1 transition-colors"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5 text-t-secondary" />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-auto">
                    {navigation.map((item) => {
                        const isActive =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 h-11 px-3 rounded-xl text-button transition-all ${
                                    isActive
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "text-t-secondary hover:text-t-primary hover:bg-b-surface1"
                                }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-500" : ""}`} />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-4 border-t border-s-border">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-3 w-full h-11 px-3 rounded-xl text-button text-t-secondary hover:text-t-primary hover:bg-b-surface1 transition-colors"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                        <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
