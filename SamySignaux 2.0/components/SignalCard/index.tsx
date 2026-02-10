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
    const { language, t } = useLanguage();
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
            case 'active': return t.active;
            case 'won': return t.won;
            case 'lost': return t.lost;
            default: return status.toUpperCase();
        }
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <Card className="!p-0 overflow-hidden hover:shadow-depth transition-shadow duration-300 border border-transparent dark:border-s-border" title="">
            <div className="p-6">
                {/* Header */}
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
                            <span className="text-body-2 font-medium text-t-secondary">{t.confidence}</span>
                            <span className="text-body-2 font-bold text-primary-04">{signal.confidence}%</span>
                        </div>
                        <div className="w-24 h-1.5 bg-b-surface1 rounded-full overflow-hidden ml-auto">
                            <div 
                                className="h-full bg-primary-04 rounded-full"
                                style={{ width: `${signal.confidence}%` }}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-4 mt-3">
                            <button 
                                onClick={() => vote(signal.id, 'up')}
                                className="flex items-center gap-1.5 text-caption font-medium text-primary-02 hover:bg-primary-02/10 px-2 py-1 rounded-lg transition-colors"
                            >
                                <Icon name="arrow-up-right" className="!size-3.5 fill-primary-02" />
                                {signal.votes.up}
                            </button>
                            <div className="w-px h-3 bg-s-border" />
                            <button 
                                onClick={() => vote(signal.id, 'down')}
                                className="flex items-center gap-1.5 text-caption font-medium text-primary-03 hover:bg-primary-03/10 px-2 py-1 rounded-lg transition-colors"
                            >
                                <Icon name="arrow-down-right" className="!size-3.5 fill-primary-03" />
                                {signal.votes.down}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div>
                        <p className="text-caption font-medium text-t-secondary mb-1">{t.entryPrice}</p>
                        <p className="font-mono font-semibold text-t-primary">{formatPrice(signal.entryPrice)}</p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-caption font-medium text-t-secondary mb-1">{t.currentPrice}</p>
                        <div className="flex items-center gap-4">
                            <p className={`font-mono font-semibold ${pnlClass} text-h6`}>
                                {formatPrice(signal.currentPrice)}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button className="!h-8 !px-3 !text-caption" isStroke href="https://fr.tradingview.com/" target="_blank">
                                    TradingView
                                </Button>
                                <Button className="!h-8 !px-3 !text-caption" isStroke href="https://www.axi.com/" target="_blank">
                                    Axi
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-caption font-medium text-t-secondary mb-1">{t.stopLoss}</p>
                        <div className="flex items-center gap-1.5">
                            <Icon name="alert-triangle" className="!size-3.5 fill-primary-03" />
                            <p className="font-mono font-semibold text-primary-03">{formatPrice(signal.stopLoss)}</p>
                        </div>
                    </div>
                </div>

                {/* TPs List */}
                <div className="flex flex-wrap gap-2 mb-6">
                     {[
                        { label: 'TP1', value: signal.tp1 },
                        { label: 'TP2', value: signal.tp2 },
                        { label: 'TP3', value: signal.tp3 },
                        { label: 'TP4', value: signal.tp4 },
                        { label: 'TP5', value: signal.tp5 },
                    ].filter(tp => tp.value !== undefined).map((tp) => {
                        const isHit = Math.abs((signal.currentPrice - signal.entryPrice)/((tp.value as number) - signal.entryPrice)) >= 1 && (signal.direction === 'BUY' ? signal.currentPrice >= (tp.value as number) : signal.currentPrice <= (tp.value as number));
                        return (
                            <div key={tp.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isHit ? 'bg-primary-02/10 border-primary-02/20' : 'bg-b-surface1 border-s-border'}`}>
                                <span className={`text-caption font-medium ${isHit ? 'text-primary-02' : 'text-t-secondary'}`}>{tp.label}</span>
                                <span className={`font-mono text-caption font-semibold ${isHit ? 'text-primary-02' : 'text-t-primary'}`}>{formatPrice(tp.value as number)}</span>
                                {isHit && <Icon name="check-circle-fill" className="!size-3.5 fill-primary-02" />}
                            </div>
                        );
                    })}
                </div>

                <Button 
                    href={`/signals/${signal.id}`}
                    as="link"
                    className="w-full !h-10 justify-center text-button"
                    isStroke
                >
                    {t.viewFullAnalysis}
                    <Icon name="arrow" className="!size-4 fill-inherit" />
                </Button>
            </div>
        </Card>
    );
};

export default SignalCard;
