"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";
import SignalCard from "@/components/SignalCard";
import Icon from "@/components/Icon";
import { useSignalStore } from "@/stores/signalStore";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { TabsOption } from "@/types/tabs";
import RecentEarnings from "@/templates/Income/EarningPage/RecentEarnings";

const SignalsPage = () => {
    const { filteredSignals, setFilter, vote } = useSignalStore();
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    
    const marketOptions: TabsOption[] = [
        { id: 'all', name: t.allMarketsTab },
        { id: 'Crypto', name: t.cryptoTab },
        { id: 'Forex', name: t.forexTab },
        { id: 'Indices', name: t.indicesTab },
        { id: 'Commodities', name: t.commoditiesTab },
    ];

    const [search, setSearch] = useState('');
    const [market, setMarket] = useState<TabsOption>(marketOptions[0]);

    // Determine view from URL (active or history)
    const viewParam = searchParams.get('view');
    const isHistory = viewParam === 'history';

    // Handle Search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setFilter('search', e.target.value);
    };

    // Handle Market Filter
    const handleMarketChange = (item: TabsOption) => {
        setMarket(item);
        setFilter('market', String(item.id));
    };

    const signals = filteredSignals().filter(s => {
        if (isHistory) return s.status === 'won' || s.status === 'lost';
        return s.status === 'active';
    });

    return (
        <Layout title={isHistory ? t.signalsHistory : t.tradingSignals}>
            <div className="max-w-[1200px] mx-auto space-y-8">
                {/* Filters Stripe */}
                <div className="sticky top-22 z-10 bg-b-surface1/95 backdrop-blur-sm border-y border-s-border py-4 -mx-4 px-4 md:mx-0 md:px-0 md:border-y-0 md:bg-transparent md:static">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                            <Tabs 
                                items={marketOptions}
                                value={market}
                                setValue={handleMarketChange}
                            />
                        </div>
                        <div className="w-full md:w-64">
                            <Search 
                                value={search}
                                onChange={handleSearch}
                                placeholder={t.searchPair}
                                isGray
                            />
                        </div>
                    </div>
                </div>

                {/* Recent Earnings chart - shown only in History view */}
                {isHistory && (
                    <RecentEarnings />
                )}

                {/* Signals List */}
                <div className="grid gap-6">
                    <AnimatePresence mode="popLayout">
                        {signals.map((signal, i) => (
                            <motion.div
                                key={signal.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <SignalCard signal={signal} vote={vote} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {signals.length === 0 && (
                        <div className="text-center py-20 bg-b-surface2/50 rounded-2xl border-2 border-dashed border-s-border">
                            <div className="w-20 h-20 bg-b-surface2 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon name="search" className="w-10 h-10 fill-t-tertiary" />
                            </div>
                            <h3 className="text-h5 font-medium text-t-primary mb-2">
                                {t.noSignalsFound}
                            </h3>
                            <p className="text-t-secondary max-w-md mx-auto">
                                {t.noSignalsDesc}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SignalsPage;
