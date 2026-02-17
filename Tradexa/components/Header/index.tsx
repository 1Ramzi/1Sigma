"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Logo from "@/components/Logo";
import OnlineUsers from "./OnlineUsers";
import User from "./User";
import Notifications from "./Notifications";
import { SelectOption } from "@/types/select";
import { useLanguage } from "@/context/LanguageContext";
import { useUserStore } from "@/stores/userStore";

type HeaderProps = {
    className?: string;
    title?: string;
    newProduct?: boolean;
    hideSidebar?: boolean;
    onToggleSidebar?: () => void;
};

const Header = ({
    className,
    title,
    newProduct,
    hideSidebar,
    onToggleSidebar,
}: HeaderProps) => {
    const { t } = useLanguage();
    const { user, accountType, setAccountType, role, setRole } = useUserStore();
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const statusRef = useRef<HTMLDivElement>(null);

    const userStatus = accountType;

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
                setShowStatusMenu(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);
    
    const times: SelectOption[] = [
        { id: 1, name: t.publishNow },
        { id: 2, name: t.publishTomorrow },
        { id: 3, name: t.publishLater },
    ];

    const [time, setTime] = useState(times[0]);
    const [hasOverflowHidden, setHasOverflowHidden] = useState(false);

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "style") {
                    const htmlElement = document.documentElement;
                    const isOverflowHidden =
                        window.getComputedStyle(htmlElement).overflow ===
                        "hidden";
                    setHasOverflowHidden(isOverflowHidden);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["style"],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <header
            className={`fixed top-0 right-0 z-20 bg-b-surface1 max-lg:!right-0 ${
                hasOverflowHidden
                    ? "right-[calc(0px+var(--scrollbar-width))]"
                    : ""
            } ${
                hideSidebar
                    ? "left-0"
                    : "left-85 max-4xl:left-70 max-3xl:left-60 max-xl:left-0"
            } ${className || ""}`}
        >
            <div
                className={`flex items-center h-22 max-md:h-18 ${
                    hideSidebar ? "center max-w-full" : "center-with-sidebar"
                } ${
                    newProduct
                        ? "max-md:flex-wrap max-md:!h-auto max-md:p-3"
                        : ""
                }`}
            >
                <div
                    className={`mr-3 gap-3 max-md:mr-auto ${
                        hideSidebar ? "flex" : "hidden max-xl:flex"
                    }`}
                >
                    <Logo />
                    <Button
                        className="flex-col gap-[4.5px] shrink-0 before:w-4.5 before:h-[1.5px] before:rounded-full before:bg-t-secondary before:transition-colors after:w-4.5 after:h-[1.5px] after:rounded-full after:bg-t-secondary after:transition-colors hover:before:bg-t-primary hover:after:bg-t-primary"
                        onClick={onToggleSidebar}
                        isCircle
                        isWhite
                    />
                </div>
                {title && (
                    <div className="mr-auto text-h4 max-lg:text-h5 max-md:hidden">
                        {title}
                    </div>
                )}
                <div
                    className={`flex items-center gap-3 ${
                        newProduct ? "hidden max-md:flex" : ""
                    } ${
                        hideSidebar ? "grow max-lg:grow-0 max-lg:ml-auto" : ""
                    }`}
                >
                    {!newProduct && (
                        <OnlineUsers
                            className={`max-md:hidden ${
                                hideSidebar ? "mr-auto" : ""
                            }`}
                        />
                    )}
                    {/* Account type switcher (temporary demo) */}
                    <div className="hidden md:block relative" ref={statusRef}>
                        <button
                            onClick={() => setShowStatusMenu(!showStatusMenu)}
                            className="relative flex items-center gap-2 h-10 px-4 rounded-xl text-button font-semibold border transition-all hover:shadow-sm cursor-pointer group overflow-hidden bg-b-surface2 border-s-border text-t-secondary"
                        >
                            {userStatus === 'partner' ? (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5"/>
                                    </svg>
                                    <span className="text-amber-500">{t.statusBadgePartner}</span>
                                </>
                            ) : userStatus === 'premium' ? (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 3L12 1L18 3L20 9L16 15H8L4 9L6 3Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5"/>
                                        <path d="M12 5L14 9L12 15L10 9L12 5Z" fill="#60A5FA"/>
                                    </svg>
                                    <span className="text-blue-500">{t.statusBadgeSubscriber}</span>
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        animate={{ scale: [1, 1.15, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </motion.div>
                                    <span>{t.statusBadgeFree}</span>
                                    <motion.span
                                        className="absolute inset-0 rounded-xl"
                                        animate={{
                                            boxShadow: [
                                                '0 0 0 0 rgba(139,92,246,0)',
                                                '0 0 0 3px rgba(139,92,246,0.15)',
                                                '0 0 0 0 rgba(139,92,246,0)',
                                            ],
                                        }}
                                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
                                    />
                                </>
                            )}
                        </button>
                        <AnimatePresence>
                            {showStatusMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full right-0 mt-2 w-72 bg-b-surface1 border border-s-border rounded-xl shadow-depth p-2 z-30"
                                >
                                    <p className="px-3 py-1.5 text-[10px] text-t-tertiary uppercase tracking-wider font-semibold">Choisir un type de compte (démo)</p>
                                    <button
                                        onClick={() => { setAccountType('free'); setShowStatusMenu(false); }}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${userStatus === 'free' ? 'bg-b-surface2 ring-1 ring-t-tertiary/20' : 'hover:bg-b-surface2'}`}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-shade-07/10 flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-body-2 font-semibold text-t-secondary">{t.statusBadgeFree}</p>
                                            <p className="text-[11px] text-t-tertiary">Signaux floutés, alertes masquées</p>
                                        </div>
                                        {userStatus === 'free' && <span className="ml-auto text-[10px] bg-t-tertiary/10 text-t-secondary px-2 py-0.5 rounded-full">Actif</span>}
                                    </button>
                                    <button
                                        onClick={() => { setAccountType('premium'); setShowStatusMenu(false); }}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${userStatus === 'premium' ? 'bg-blue-500/5 ring-1 ring-blue-500/20' : 'hover:bg-b-surface2'}`}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 3L12 1L18 3L20 9L16 15H8L4 9L6 3Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5"/>
                                                <path d="M12 5L14 9L12 15L10 9L12 5Z" fill="#60A5FA"/>
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-body-2 font-semibold text-blue-500">{t.statusBadgeSubscriber}</p>
                                            <p className="text-[11px] text-t-tertiary">Accès complet par abonnement</p>
                                        </div>
                                        {userStatus === 'premium' && <span className="ml-auto text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Actif</span>}
                                    </button>
                                    <button
                                        onClick={() => { setAccountType('partner'); setShowStatusMenu(false); }}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${userStatus === 'partner' ? 'bg-amber-500/5 ring-1 ring-amber-500/20' : 'hover:bg-b-surface2'}`}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5"/>
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-body-2 font-semibold text-amber-500">{t.statusBadgePartner}</p>
                                            <p className="text-[11px] text-t-tertiary">Via broker, accès gratuit à vie</p>
                                        </div>
                                        {userStatus === 'partner' && <span className="ml-auto text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">Actif</span>}
                                    </button>
                                    <div className="my-1 border-t border-s-border" />
                                    <p className="px-3 py-1.5 text-[10px] text-t-tertiary uppercase tracking-wider font-semibold">Rôle (démo)</p>
                                    <button
                                        onClick={() => { setRole('user'); setShowStatusMenu(false); }}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${role === 'user' ? 'bg-b-surface2 ring-1 ring-t-tertiary/20' : 'hover:bg-b-surface2'}`}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-shade-07/10 flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-body-2 font-semibold text-t-secondary">Utilisateur</p>
                                            <p className="text-[11px] text-t-tertiary">Signaux selon abonnement</p>
                                        </div>
                                        {role === 'user' && <span className="ml-auto text-[10px] bg-t-tertiary/10 text-t-secondary px-2 py-0.5 rounded-full">Actif</span>}
                                    </button>
                                    <button
                                        onClick={() => { setRole('trader'); setShowStatusMenu(false); }}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${role === 'trader' ? 'bg-emerald-500/5 ring-1 ring-emerald-500/20' : 'hover:bg-b-surface2'}`}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 17l4-8 4 4 4-6 4 4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-body-2 font-semibold text-emerald-500">Trader</p>
                                            <p className="text-[11px] text-t-tertiary">Accès complet aux signaux</p>
                                        </div>
                                        {role === 'trader' && <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">Actif</span>}
                                    </button>
                                    <button
                                        onClick={() => { setRole('admin'); setShowStatusMenu(false); }}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${role === 'admin' ? 'bg-red-500/5 ring-1 ring-red-500/20' : 'hover:bg-b-surface2'}`}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="#EF4444" stroke="#EF4444" strokeWidth="1"/></svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-body-2 font-semibold text-red-500">Admin</p>
                                            <p className="text-[11px] text-t-tertiary">Accès complet aux signaux</p>
                                        </div>
                                        {role === 'admin' && <span className="ml-auto text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Actif</span>}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Notifications />
                    <User />
                </div>
                {newProduct && (
                    <div className="flex items-center gap-3 max-md:gap-0 max-md:w-[calc(100%+0.75rem)] max-md:mt-3 max-md:-mx-1.5">
                        <Button
                            className="max-md:w-[calc(50%-0.75rem)] max-md:mx-1.5"
                            isWhite
                        >
                            {t.saveDraft}
                        </Button>
                        <Select
                            className="min-w-36 max-md:w-[calc(50%-0.75rem)] max-md:mx-1.5"
                            value={time}
                            onChange={setTime}
                            options={times}
                            isBlack
                        />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
