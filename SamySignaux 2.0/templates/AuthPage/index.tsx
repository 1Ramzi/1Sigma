"use client";

import { useLanguage } from "@/context/LanguageContext";
import Login from "@/components/Login";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Link from "next/link";

type AuthPageProps = {
    initialView?: "signIn" | "signUp";
};

const AuthPage = ({ initialView = "signIn" }: AuthPageProps) => {
    const { t, language } = useLanguage();

    return (
        <div className="min-h-screen flex bg-b-surface1 text-t-primary font-sans">
            {/* Left - Preview Side */}
            <div className="hidden lg:flex flex-1 bg-linear-to-br from-primary-01/5 via-primary-02/5 to-secondary-01/5 items-center justify-center p-12 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-01/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-01/5 rounded-full blur-3xl" />

                <div className="relative max-w-md space-y-6">
                    {/* Preview card 1 - Chart */}
                    <div className="bg-b-surface1 rounded-xl shadow-lg border border-s-stroke2 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-button font-semibold text-t-primary">{t.botProfit}, USDT</span>
                            <Icon name="bar-chart-3" className="size-4 fill-t-tertiary" />
                        </div>
                        <p className="text-caption text-t-secondary mb-1">{t.avgDailyProfit}</p>
                        <p className="text-secondary-04 text-button font-semibold">+12.4%</p>
                        <div className="mt-3 h-16 flex items-end gap-1">
                            {[40, 25, 35, 55, 30, 45, 60, 35, 50, 70, 55, 80].map((h, i) => (
                                <div key={i} className="flex-1 bg-primary-01/20 rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>

                    {/* Preview cards row */}
                    <div className="flex gap-4">
                        <div className="flex-1 bg-b-surface1 rounded-xl shadow-lg border border-s-stroke2 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="size-6 rounded-full bg-primary-01/10 flex items-center justify-center">
                                    <Icon name="trending-up" className="size-3.5 fill-primary-01" />
                                </div>
                                <span className="text-caption text-t-secondary">PNL</span>
                            </div>
                            <p className="text-h6 font-bold text-t-primary font-mono">$5,647</p>
                            <p className="text-caption text-secondary-04 mt-1">↗ +10% {t.fromLastWeek}</p>
                        </div>
                        <div className="flex-1 bg-b-surface1 rounded-xl shadow-lg border border-s-stroke2 p-4">
                            <p className="text-caption text-t-secondary mb-1">{t.rewardRate}</p>
                            <p className="text-h6 font-bold text-t-primary font-mono">37.42%</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="size-2 rounded-full bg-secondary-04" />
                                <span className="text-caption text-secondary-04">-7.67%</span>
                            </div>
                        </div>
                    </div>

                    {/* Tagline */}
                    <div className="text-center pt-4">
                        <h2 className="text-h4 font-bold text-t-primary">
                            {t.joinElite}
                        </h2>
                        <p className="text-t-secondary mt-2 text-body-2">
                            {t.joinEliteDesc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-b-surface1 relative">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Link href="/">
                            <Image
                                className="w-16 h-16 opacity-100 dark:hidden"
                                src="/images/logo-dark.png"
                                alt="SamySignaux"
                                width={64}
                                height={64}
                                priority
                            />
                            <Image
                                className="w-16 h-16 hidden opacity-100 dark:block"
                                src="/images/logo-light.png"
                                alt="SamySignaux"
                                width={64}
                                height={64}
                                priority
                            />
                        </Link>
                    </div>

                    <Login initialView={initialView} />

                    <p className="text-center text-caption text-t-tertiary mt-8">© 2026 SamySignaux</p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
