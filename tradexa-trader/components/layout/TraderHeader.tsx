"use client";

import { Menu, Bell } from "lucide-react";

type TraderHeaderProps = {
    title?: string;
    onToggleSidebar: () => void;
};

export default function TraderHeader({ title, onToggleSidebar }: TraderHeaderProps) {
    return (
        <header className="fixed top-0 right-0 left-0 xl:left-64 z-20 bg-b-surface1 border-b border-transparent dark:border-s-border">
            <div className="flex items-center h-16 px-5 max-md:px-3">
                <button
                    className="xl:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-b-surface2 transition-colors mr-3"
                    onClick={onToggleSidebar}
                    title="Menu"
                >
                    <Menu className="w-5 h-5 text-t-secondary" />
                </button>
                {title && (
                    <h1 className="text-h5 font-semibold text-t-primary">{title}</h1>
                )}
                <div className="ml-auto flex items-center gap-3">
                    <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-b-surface2 transition-colors" title="Notifications">
                        <Bell className="w-5 h-5 text-t-secondary" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-button">
                        TP
                    </div>
                </div>
            </div>
        </header>
    );
}
