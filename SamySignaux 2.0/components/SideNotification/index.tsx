"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";

export interface NotificationSignal {
    id: string;
    pair: string;
    direction: 'BUY' | 'SELL';
    price: number;
    type: 'new' | 'tp' | 'sl';
}

const SideNotification = () => {
    const { language } = useLanguage();
    const [notifications, setNotifications] = useState<NotificationSignal[]>([]);

    useEffect(() => {
        // Simulate incoming signals
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const pairs = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'XAU/USD', 'NASDAQ'];
                const directions: ('BUY' | 'SELL')[] = ['BUY', 'SELL'];
                const types: ('new' | 'tp' | 'sl')[] = ['new', 'tp'];
                
                const newNotification: NotificationSignal = {
                    id: Date.now().toString(),
                    pair: pairs[Math.floor(Math.random() * pairs.length)],
                    direction: directions[Math.floor(Math.random() * directions.length)],
                    price: 20000 + Math.random() * 10000,
                    type: types[Math.floor(Math.random() * types.length)]
                };

                setNotifications(prev => [newNotification, ...prev].slice(0, 3));

                // Auto remove after 5s
                setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
                }, 5000);
            }
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {notifications.map(notif => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        className="pointer-events-auto bg-b-surface1 border border-s-border rounded-2xl p-4 shadow-xl w-80 backdrop-blur-md"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                notif.direction === 'BUY' ? 'bg-primary-02/10 text-primary-02' : 'bg-primary-03/10 text-primary-03'
                            }`}>
                                <Icon 
                                    name={notif.direction === 'BUY' ? 'trending-up' : 'trending-down'} 
                                    className={`!size-5 ${notif.direction === 'BUY' ? 'fill-primary-02' : 'fill-primary-03'}`}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-t-primary">{notif.pair}</h4>
                                    <span className="text-caption text-t-secondary">Now</span>
                                </div>
                                <p className="text-body-2 text-t-secondary">
                                    {notif.type === 'new' 
                                        ? (language === 'fr' ? 'Nouveau signal détecté' : 'New signal detected')
                                        : (language === 'fr' ? 'Take Profit touché' : 'Take Profit hit')
                                    }
                                </p>
                                <p className={`font-mono font-semibold mt-1 ${
                                    notif.direction === 'BUY' ? 'text-primary-02' : 'text-primary-03'
                                }`}>
                                    ${notif.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default SideNotification;
