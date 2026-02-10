"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { useLanguage } from "@/context/LanguageContext";
import { setLiveAlertsMuted, getLiveAlertsMuted } from "@/components/LiveAlertStack";

import { allNotifications } from "@/mocks/notifications";

const typeConfig: Record<string, { icon: string; iconClass: string; bg: string; href: string }> = {
    signal: { icon: 'trending-up', iconClass: 'fill-primary-02', bg: 'bg-primary-02/10', href: '/signals?view=active' },
    alert: { icon: 'check-circle-fill', iconClass: 'fill-primary-04', bg: 'bg-primary-04/10', href: '/signals?view=active' },
    info: { icon: 'info-circle', iconClass: 'fill-primary-01', bg: 'bg-primary-01/10', href: '/signals?view=active' },
    sl: { icon: 'alert-triangle', iconClass: 'fill-primary-03', bg: 'bg-primary-03/10', href: '/signals?view=active' },
    support: { icon: 'chat', iconClass: 'fill-secondary-04', bg: 'bg-secondary-04/10', href: '/support' },
};

const Notifications = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dismissed, setDismissed] = useState<number[]>([]);
    const [muted, setMuted] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        setMuted(getLiveAlertsMuted());
    }, [isOpen]);

    const visibleNotifications = allNotifications.filter(n => !dismissed.includes(n.id));

    return (
        <>
            <div className="relative">
                <Button isWhite isCircle onClick={() => setIsOpen(true)}>
                    <Icon name="bell" />
                </Button>
                {visibleNotifications.length > 0 && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-primary-03 rounded-full border-2 border-b-surface1" />
                )}
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} isSlidePanel>
                <div className="flex items-center justify-between h-20 pl-10 pr-20 pt-5 pb-3 max-md:h-18 max-md:pt-3 max-md:pl-9">
                    <span className="text-h5">{t.notifications}</span>
                    <button
                        onClick={() => { const next = !muted; setMuted(next); setLiveAlertsMuted(next); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                            muted ? 'bg-primary-03/10 text-primary-03' : 'bg-b-surface2 text-t-secondary hover:text-t-primary'
                        }`}
                        title={muted ? t.unmute : t.muteNotifications}
                    >
                        <Icon name={muted ? 'volume-x' : 'volume-2'} className={`!size-4 ${muted ? 'fill-primary-03' : 'fill-t-secondary'}`} />
                        {muted ? t.unmute : t.muteNotifications}
                    </button>
                </div>
                <div className="h-[calc(100svh-5rem)] px-5 pb-5 overflow-y-auto max-md:h-[calc(100svh-4.5rem)] max-md:px-4">
                    {visibleNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <Icon name="bell" className="!size-10 fill-t-tertiary mb-3" />
                            <p className="text-body-2 text-t-tertiary">{t.noNotifications}</p>
                        </div>
                    ) : (
                        visibleNotifications.map((notification) => {
                            const config = typeConfig[notification.type] || typeConfig.info;
                            return (
                                <div
                                    className="group relative flex items-center p-4 mb-1 rounded-xl hover:bg-b-surface2/60 transition-colors"
                                    key={notification.id}
                                >
                                    <Link
                                        href={config.href}
                                        className="relative z-2 flex items-center flex-1 min-w-0"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className={`shrink-0 w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                                            <Icon name={config.icon} className={`!size-5 ${config.iconClass}`} />
                                        </div>
                                        <div className="ml-3 min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-body-2 font-semibold text-t-primary truncate">@{notification.login}</span>
                                                <span className="text-body-2 text-t-secondary truncate">{notification.action}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-caption font-medium text-primary-01 truncate">{notification.product}</span>
                                                <span className="text-[11px] text-t-tertiary shrink-0">{notification.time}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => setDismissed(prev => [...prev, notification.id])}
                                        className="relative z-3 shrink-0 ml-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-b-surface2 transition-all"
                                    >
                                        <Icon name="close" className="!size-3.5 fill-t-tertiary" />
                                    </button>
                                    {notification.new && (
                                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary-02 group-hover:hidden" />
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
                <Button
                    className="!absolute left-1/2 bottom-5 z-3 -translate-x-1/2"
                    isBlack
                    as="link"
                    href="/notifications"
                >
                    {t.allNotifications}
                </Button>
            </Modal>
        </>
    );
};

export default Notifications;
