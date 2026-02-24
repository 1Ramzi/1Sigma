"use client";

import Link from "next/link";
import { Shield, TrendingUp } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-b-surface1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-h3 font-bold text-t-primary mb-2 text-center">Tradexa Mobile</h1>
            <p className="text-body-2 text-t-secondary mb-8 text-center">Interface mobile optimisée</p>

            <div className="w-full max-w-xs space-y-3">
                <Link href="/admin"
                    className="flex items-center gap-4 w-full p-4 rounded-2xl bg-b-surface2 border border-s-border active:scale-[0.98] transition-transform">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <p className="text-sub-title-1 font-bold text-t-primary">Panel Admin</p>
                        <p className="text-caption text-t-tertiary">Gérer la plateforme</p>
                    </div>
                </Link>

                <Link href="/trader"
                    className="flex items-center gap-4 w-full p-4 rounded-2xl bg-b-surface2 border border-s-border active:scale-[0.98] transition-transform">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-sub-title-1 font-bold text-t-primary">Panel Trader</p>
                        <p className="text-caption text-t-tertiary">Gérer vos signaux</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
