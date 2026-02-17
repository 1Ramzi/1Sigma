"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";
import SignalCard from "@/components/SignalCard";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useSignalStore } from "@/stores/signalStore";
import { useUserStore } from "@/stores/userStore";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { TabsOption } from "@/types/tabs";
import RecentEarnings from "@/templates/Income/EarningPage/RecentEarnings";

const SignalsPage = () => {
    const { filteredSignals, setFilter, vote } = useSignalStore();
    const { accountType } = useUserStore();
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const isFree = accountType === 'free';
    
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

                {/* Free account upgrade banner */}
                {isFree && !isHistory && (
                    <div className="relative rounded-2xl border-2 border-amber-500/20 bg-amber-500/5 p-6 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
                                <Icon name="lock" className="!size-7 fill-amber-500" />
                            </div>
                            <h3 className="text-h5 font-bold text-t-primary">Signaux en temps réel réservés aux membres</h3>
                            <p className="text-body-2 text-t-secondary max-w-lg">Les signaux actifs sont floutés pour les comptes gratuits. Passez en Premium ou ouvrez un compte broker partenaire pour accéder aux signaux en temps réel.</p>
                            <div className="flex gap-3 mt-2">
                                <Button href="/subscription" as="link" isBlack>Voir les offres</Button>
                                <Button href="/broker" as="link" isStroke>Compte broker gratuit</Button>
                            </div>
                        </div>
                    </div>
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
                                className="relative"
                            >
                                {isFree && !isHistory ? (
                                    <div className="relative rounded-2xl border border-s-border bg-b-surface2 p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-b-surface1 animate-pulse" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-32 bg-b-surface1 rounded animate-pulse" />
                                                <div className="h-3 w-48 bg-b-surface1 rounded animate-pulse" />
                                            </div>
                                            <div className="h-8 w-20 bg-b-surface1 rounded-lg animate-pulse" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            <div className="h-16 bg-b-surface1 rounded-xl animate-pulse" />
                                            <div className="h-16 bg-b-surface1 rounded-xl animate-pulse" />
                                            <div className="h-16 bg-b-surface1 rounded-xl animate-pulse" />
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-b-surface2/80">
                                            <div className="text-center">
                                                <Icon name="lock" className="!size-8 fill-t-tertiary mx-auto mb-2" />
                                                <p className="text-body-2 font-semibold text-t-secondary">Signal réservé aux membres</p>
                                                <p className="text-caption text-t-tertiary mt-1">Aucune donnée n&apos;est transmise</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <SignalCard signal={signal} vote={vote} />
                                )}
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
