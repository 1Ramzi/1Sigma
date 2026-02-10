"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import OnlineUsers from "./OnlineUsers";
import User from "./User";
import Notifications from "./Notifications";
import Messages from "./Messages";
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
    const { user } = useUserStore();
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const statusRef = useRef<HTMLDivElement>(null);

    const getUserStatus = () => {
        const role = user?.role || 'member';
        if (role === 'vip' || role === 'trader' || role === 'admin') return 'partner';
        if (role === 'moderator') return 'subscriber';
        return 'free';
    };

    const userStatus = getUserStatus();

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
                    {/* Status badge with dropdown */}
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
                            ) : userStatus === 'subscriber' ? (
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
                                    className="absolute top-full right-0 mt-2 w-64 bg-b-surface1 border border-s-border rounded-xl shadow-depth p-2 z-30"
                                >
                                    <Link
                                        href="/subscription"
                                        onClick={() => setShowStatusMenu(false)}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-b-surface2 transition-colors"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 3L12 1L18 3L20 9L16 15H8L4 9L6 3Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5"/>
                                                <path d="M12 5L14 9L12 15L10 9L12 5Z" fill="#60A5FA"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-body-2 font-semibold text-blue-500">{t.statusBadgeSubscriber}</p>
                                            <p className="text-caption text-t-tertiary">{t.subscriberDesc}</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/broker"
                                        onClick={() => setShowStatusMenu(false)}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-b-surface2 transition-colors"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-body-2 font-semibold text-amber-500">{t.statusBadgePartner}</p>
                                            <p className="text-caption text-t-tertiary">{t.partnerDesc}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Notifications />
                    <Messages />
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
