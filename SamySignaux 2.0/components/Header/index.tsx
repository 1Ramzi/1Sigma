"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import SearchGlobal from "./SearchGlobal";
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

    const getUserStatusBadge = () => {
        const role = user?.role || 'member';
        if (role === 'vip' || role === 'trader' || role === 'admin' || role === 'moderator') {
            return { label: t.statusBadgePartner, color: 'text-primary-02 bg-primary-02/10 border-primary-02/20' };
        }
        return { label: t.statusBadgeFree, color: 'text-t-secondary bg-b-surface2 border-s-border' };
    };
    
    const times: SelectOption[] = [
        { id: 1, name: t.publishNow },
        { id: 2, name: t.publishTomorrow },
        { id: 3, name: t.publishLater },
    ];

    const [time, setTime] = useState(times[0]);
    const [hasOverflowHidden, setHasOverflowHidden] = useState(false);
    const [visibleSearch, setVisibleSearch] = useState(false);

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
                        <>
                            <SearchGlobal
                                className={`max-md:hidden ${
                                    hideSidebar ? "mr-auto" : ""
                                }`}
                                onClose={() => setVisibleSearch(false)}
                                visible={visibleSearch}
                            />
                        </>
                    )}
                    <Button
                        className="!hidden max-lg:!flex max-md:!hidden"
                        isWhite
                        isCircle
                        onClick={() => setVisibleSearch(true)}
                    >
                        <Icon name="search" />
                    </Button>
                    {/* Status Badge */}
                    {(() => {
                        const badge = getUserStatusBadge();
                        return (
                            <div className={`hidden md:flex items-center gap-2 h-10 px-4 rounded-xl text-button font-semibold border ${badge.color}`}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>{badge.label}</span>
                            </div>
                        );
                    })()}
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
