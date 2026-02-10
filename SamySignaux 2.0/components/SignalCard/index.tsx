"use client";

import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { Signal } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";

type SignalCardProps = {
    signal: Signal;
    vote: (id: string, type: 'up' | 'down') => void;
};

const SignalCard = ({ signal, vote }: SignalCardProps) => {
    const { language } = useLanguage();
    const isWin = signal.currentPrice >= signal.entryPrice === (signal.direction === 'BUY');
    const pnlClass = isWin ? "text-primary-02" : "text-primary-03";

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'active': return 'blue';
            case 'won': return 'green'; // Take-profit
            case 'lost': return 'red'; // Passed
            default: return 'gray';
        }
    };

    const getStatusLabel = (status: string) => {
        switch(status) {
            case 'active': return language === 'fr' ? 'Active' : 'Active';
            case 'won': return language === 'fr' ? 'Take-profit' : 'Take-Profit';
            case 'lost': return language === 'fr' ? 'Passed' : 'Passed';
            default: return status.toUpperCase();
        }
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <Card className="!p-0 overflow-hidden hover:shadow-depth transition-shadow duration-300 border border-transparent dark:border-s-border" title="">
            <div className="flex flex-col md:flex-row">
                {/* Left: Main Info */}
                <div className="p-6 flex-1 border-b border-s-border md:border-b-0 md:border-r">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                signal.direction === 'BUY' ? 'bg-primary-02/10 text-primary-02' : 'bg-primary-03/10 text-primary-03'
                            }`}>
                                <Icon 
                                    name={signal.direction === 'BUY' ? 'trending-up' : 'trending-down'} 
                                    className={signal.direction === 'BUY' ? 'fill-primary-02' : 'fill-primary-03'} 
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-h6 font-bold text-t-primary">{signal.pair}</h3>
                                    <Badge color={getStatusColor(signal.status)}>
                                        {getStatusLabel(signal.status)}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-body-2 text-t-secondary mt-1">
                                    <span>{signal.market}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Icon name="clock" className="!size-3.5 fill-t-secondary" />
                                        {new Date(signal.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-right">
                            <div className="flex items-center justify-end gap-1 mb-1">
                                <span className="text-body-2 font-medium text-t-secondary">Confiance</span>
                                <span className="text-body-2 font-bold text-primary-04">{signal.confidence}%</span>
                            </div>
                            <div className="w-24 h-1.5 bg-b-surface1 rounded-full overflow-hidden ml-auto">
                                <div 
                                    className="h-full bg-primary-04 rounded-full"
                                    style={{ width: `${signal.confidence}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div>
                            <p className="text-caption font-medium text-t-secondary mb-1">PRIX ENTRÉE</p>
                            <p className="font-mono font-semibold text-t-primary">{formatPrice(signal.entryPrice)}</p>
                        </div>
                        <div>
                            <p className="text-caption font-medium text-t-secondary mb-1">ACTUEL</p>
                            <div className="flex items-center gap-1.5">
                                <p className={`font-mono font-semibold ${pnlClass}`}>
                                    {formatPrice(signal.currentPrice)}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-caption font-medium text-t-secondary mb-1">TAKE PROFIT</p>
                            <div className="flex items-center gap-1.5">
                                <Icon name="target" className="!size-3.5 fill-primary-02" />
                                <p className="font-mono font-semibold text-primary-02">{formatPrice(signal.takeProfit)}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-caption font-medium text-t-secondary mb-1">STOP LOSS</p>
                            <div className="flex items-center gap-1.5">
                                <Icon name="alert-triangle" className="!size-3.5 fill-primary-03" />
                                <p className="font-mono font-semibold text-primary-03">{formatPrice(signal.stopLoss)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: TPs & Stats */}
                <div className="p-6 md:w-72 bg-b-surface1/50 flex flex-col justify-center border-l border-s-border">
                    <div className="space-y-2 mb-4">
                        {[
                            { label: 'TP1', value: signal.tp1 },
                            { label: 'TP2', value: signal.tp2 },
                            { label: 'TP3', value: signal.tp3 },
                            { label: 'TP4', value: signal.tp4 },
                            { label: 'TP5', value: signal.tp5 },
                        ].filter(tp => tp.value !== undefined).map((tp) => (
                            <div key={tp.label} className="flex justify-between items-center text-caption">
                                <span className="text-t-secondary w-8">{tp.label}</span>
                                <span className="font-mono font-medium text-t-primary">{formatPrice(tp.value as number)}</span>
                                {Math.abs((signal.currentPrice - signal.entryPrice)/((tp.value as number) - signal.entryPrice)) >= 1 && (signal.direction === 'BUY' ? signal.currentPrice >= (tp.value as number) : signal.currentPrice <= (tp.value as number))
                                    ? <Icon name="check-circle-fill" className="!size-3.5 fill-primary-02" /> 
                                    : <div className="w-3.5 h-3.5 rounded-full border border-s-border" />
                                }
                            </div>
                        ))}
                    </div>

                    <Button 
                        href={`/signals/${signal.id}`}
                        as="link"
                        className="w-full !h-9 mb-3 justify-between text-caption"
                        isStroke
                    >
                        {language === 'fr' ? 'Voir Analyse' : 'View Analysis'}
                        <Icon name="arrow" className="!size-3.5 fill-inherit" />
                    </Button>

                    <div className="flex items-center justify-center gap-4">
                        <button 
                            onClick={() => vote(signal.id, 'up')}
                            className="flex items-center gap-1.5 text-caption font-medium text-primary-02 hover:bg-primary-02/10 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <Icon name="arrow-up-right" className="!size-3.5 fill-primary-02" />
                            {signal.votes.up}
                        </button>
                        <div className="w-px h-4 bg-s-border" />
                        <button 
                            onClick={() => vote(signal.id, 'down')}
                            className="flex items-center gap-1.5 text-caption font-medium text-primary-03 hover:bg-primary-03/10 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <Icon name="arrow-down-right" className="!size-3.5 fill-primary-03" />
                            {signal.votes.down}
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SignalCard;
