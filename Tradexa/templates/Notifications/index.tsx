"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import Tabs from "@/components/Tabs";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Notification from "./Notification";
import { TabsOption } from "@/types/tabs";

import { allNotifications } from "@/mocks/notifications";

const NotificationsPage = () => {
    const { t } = useLanguage();

    const categories: TabsOption[] = [
        { id: 1, name: t.recent },
        { id: 2, name: t.earlier },
    ];

    const [category, setCategory] = useState<TabsOption>(categories[0]);
    const [dismissed, setDismissed] = useState<number[]>([]);

    const visibleNotifications = allNotifications.filter(n => !dismissed.includes(n.id));

    return (
        <Layout title={t.notifications}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                {/* Notification list */}
                <div className="card pb-4">
                    <div className="flex items-center mb-6">
                        <Tabs
                            items={categories}
                            value={category}
                            setValue={setCategory}
                        />
                        <Button className="ml-auto" isBlack>
                            {t.markAllAsRead}
                        </Button>
                    </div>
                    <div className="divide-y divide-s-subtle">
                        {visibleNotifications.map((notification) => (
                            <Notification
                                value={notification}
                                key={notification.id}
                                onDismiss={(id) => setDismissed(prev => [...prev, id])}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile App Download CTA */}
                <div className="card !p-0 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary-01/10 flex items-center justify-center shrink-0">
                            <Icon name="mobile" className="!size-8 fill-primary-01" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-h5 font-bold text-t-primary mb-1">
                                {t.mobileAppTitle}
                            </h3>
                            <p className="text-body-2 text-t-secondary max-w-lg">
                                {t.mobileAppDesc}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <a
                                href="https://apps.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 h-12 px-5 bg-shade-07 dark:bg-shade-10 text-shade-10 dark:text-shade-07 rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.7 12.57 5.7C13.36 5.7 14.85 4.63 16.4 4.8C17.06 4.83 18.89 5.08 20.11 6.83C20 6.91 17.68 8.28 17.71 11.1C17.74 14.45 20.68 15.58 20.71 15.59C20.69 15.65 20.23 17.22 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                                </svg>
                                <div className="text-left">
                                    <div className="text-[9px] leading-none opacity-80">Download on the</div>
                                    <div className="text-caption font-semibold leading-tight">App Store</div>
                                </div>
                            </a>
                            <a
                                href="https://play.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 h-12 px-5 bg-shade-07 dark:bg-shade-10 text-shade-10 dark:text-shade-07 rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.31 12l2.388-2.492zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z"/>
                                </svg>
                                <div className="text-left">
                                    <div className="text-[9px] leading-none opacity-80">GET IT ON</div>
                                    <div className="text-caption font-semibold leading-tight">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NotificationsPage;
