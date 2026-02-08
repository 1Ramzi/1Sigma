"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";
import SignalCard from "@/components/SignalCard";
import { useSignalStore } from "@/stores/signalStore";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import { TabsOption } from "@/types/tabs";

const marketOptions: TabsOption[] = [
    { id: 'all', name: 'All Markets' },
    { id: 'Crypto', name: 'Crypto' },
    { id: 'Forex', name: 'Forex' },
    { id: 'Indices', name: 'Indices' },
    { id: 'Commodities', name: 'Commodities' },
];

const viewOptions = [
    { id: 'active', name: 'Active' },
    { id: 'history', name: 'History' },
];

const SignalsPage = () => {
    const { filteredSignals, setFilter, vote, filters } = useSignalStore();
    const { language } = useLanguage();
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
        const matchesView = view.id === 'active' ? s.status === 'active' : s.status !== 'active';
        return matchesView;
    });

    return (
        <Layout title="Signals">
            <div className="max-w-[1200px] mx-auto space-y-6">
                {/* Header & Controls */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-h3 font-bold text-t-primary">
                                {language === 'fr' ? 'Signaux de Trading' : 'Trading Signals'}
                            </h1>
                            <p className="text-body-1 text-t-secondary mt-1">
                                {language === 'fr' 
                                ? 'Opportunités de trading en temps réel avec analyse détaillée' 
                                : 'Real-time trading opportunities with detailed analysis'}
                            </p>
                        </div>
                        <div className="bg-b-surface2 p-1 rounded-2xl self-start md:self-auto flex gap-1">
                            {viewOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleViewChange(option)}
                                    className={`px-4 py-2 rounded-xl text-button font-medium transition-all ${
                                        view.id === option.id
                                            ? 'bg-b-surface1 text-t-primary shadow-sm'
                                            : 'text-t-secondary hover:text-t-primary'
                                    }`}
                                >
                                    {language === 'fr' && option.id === 'active' ? 'En cours' : 
                                     language === 'fr' && option.id === 'history' ? 'Historique' : 
                                     option.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Search 
                                value={search}
                                onChange={handleSearch}
                                placeholder={language === 'fr' ? 'Rechercher une paire...' : 'Search pair...'}
                                isGray
                            />
                        </div>
                        <div className="overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                            <Tabs 
                                items={marketOptions}
                                value={market}
                                setValue={handleMarketChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Signals List */}
                <div className="grid gap-4">
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
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-b-surface2 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon name="search" className="w-8 h-8 fill-t-tertiary" />
                            </div>
                            <h3 className="text-h6 font-medium text-t-primary">
                                {language === 'fr' ? 'Aucun signal trouvé' : 'No signals found'}
                            </h3>
                            <p className="text-t-secondary mt-1">
                                {language === 'fr' ? 'Essayez de modifier vos filtres' : 'Try adjusting your filters'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SignalsPage;
