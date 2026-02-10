"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";
import SignalCard from "@/components/SignalCard";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { useSignalStore } from "@/stores/signalStore";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { TabsOption } from "@/types/tabs";
import { mockSignals } from "@/data/mockData";

const SignalsPage = () => {
    const { filteredSignals, setFilter, vote } = useSignalStore();
    const { language, t } = useLanguage();
    
    const marketOptions: TabsOption[] = [
        { id: 'all', name: t.allMarketsTab },
        { id: 'Crypto', name: t.cryptoTab },
        { id: 'Forex', name: t.forexTab },
        { id: 'Indices', name: t.indicesTab },
        { id: 'Commodities', name: t.commoditiesTab },
    ];
    
    const viewOptions = [
        { id: 'active', name: t.activeView },
        { id: 'history', name: t.historyView },
    ];

    const [search, setSearch] = useState('');
    const [view, setView] = useState(viewOptions[0]);
    const [market, setMarket] = useState<TabsOption>(marketOptions[0]);

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

    // Handle View Change
    const handleViewChange = (item: { id: string, name: string }) => {
        setView(item);
    };

    const signals = filteredSignals().filter(s => {
        if (view.id === 'active') return s.status === 'active';
        return s.status === 'won' || s.status === 'lost';
    });

    const totalWon = mockSignals.filter(s => s.status === 'won').length;
    const totalLost = mockSignals.filter(s => s.status === 'lost').length;
    const winRate = totalWon + totalLost > 0 ? (totalWon / (totalWon + totalLost) * 100).toFixed(1) : 0;

    return (
        <Layout title={t.tradingSignals}>
            <div className="max-w-[1200px] mx-auto space-y-8">
                {/* Top Recap Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card title="" className="!p-5 border border-transparent dark:border-s-border">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary-02/10 flex items-center justify-center">
                                <Icon name="check-circle-fill" className="!size-6 fill-primary-02" />
                            </div>
                            <div>
                                <p className="text-body-2 text-t-secondary">{t.wonTotal}</p>
                                <p className="text-h4 font-bold text-t-primary">{totalWon}</p>
                            </div>
                        </div>
                    </Card>
                    <Card title="" className="!p-5 border border-transparent dark:border-s-border">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary-03/10 flex items-center justify-center">
                                <Icon name="close-circle-fill" className="!size-6 fill-primary-03" />
                            </div>
                            <div>
                                <p className="text-body-2 text-t-secondary">{t.lostTotal}</p>
                                <p className="text-h4 font-bold text-t-primary">{totalLost}</p>
                            </div>
                        </div>
                    </Card>
                    <Card title="" className="!p-5 border border-transparent dark:border-s-border">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary-04/10 flex items-center justify-center">
                                <Icon name="chart" className="!size-6 fill-primary-04" />
                            </div>
                            <div>
                                <p className="text-body-2 text-t-secondary">{t.winRate}</p>
                                <p className="text-h4 font-bold text-t-primary">{winRate}%</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Filters Stripe */}
                <div className="sticky top-22 z-10 bg-b-surface1/95 backdrop-blur-sm border-y border-s-border py-4 -mx-4 px-4 md:mx-0 md:px-0 md:border-y-0 md:bg-transparent md:static">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex bg-b-surface2 p-1 rounded-xl self-start">
                            {viewOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleViewChange(option)}
                                    className={`px-6 py-2.5 rounded-lg text-button font-medium transition-all ${
                                        view.id === option.id
                                            ? 'bg-b-surface1 text-t-primary shadow-sm'
                                            : 'text-t-secondary hover:text-t-primary'
                                    }`}
                                >
                                    {option.name}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 flex-1 justify-end">
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
                </div>

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
