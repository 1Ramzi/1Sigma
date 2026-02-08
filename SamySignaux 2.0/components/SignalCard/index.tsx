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
                                    <Badge color={
                                        signal.status === 'active' ? 'blue' : 
                                        signal.status === 'won' ? 'green' : 
                                        signal.status === 'lost' ? 'red' : 'gray'
                                    }>
                                        {signal.status.toUpperCase()}
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
                                <span className="text-body-2 font-medium text-t-secondary">Confidence</span>
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
                            <p className="text-caption font-medium text-t-secondary mb-1">ENTRY PRICE</p>
                            <p className="font-mono font-semibold text-t-primary">{signal.entryPrice}</p>
                        </div>
                        <div>
                            <p className="text-caption font-medium text-t-secondary mb-1">CURRENT</p>
                            <div className="flex items-center gap-1.5">
                                <p className={`font-mono font-semibold ${pnlClass}`}>
                                    {signal.currentPrice}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-caption font-medium text-t-secondary mb-1">TAKE PROFIT</p>
                            <div className="flex items-center gap-1.5">
                                <Icon name="target" className="!size-3.5 fill-primary-02" />
                                <p className="font-mono font-semibold text-primary-02">{signal.takeProfit}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-caption font-medium text-t-secondary mb-1">STOP LOSS</p>
                            <div className="flex items-center gap-1.5">
                                <Icon name="alert-triangle" className="!size-3.5 fill-primary-03" />
                                <p className="font-mono font-semibold text-primary-03">{signal.stopLoss}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Actions & Stats */}
                <div className="p-6 md:w-64 bg-b-surface1/50 flex flex-col justify-center">
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center text-body-2">
                            <span className="text-t-secondary">TP1</span>
                            <span className="font-mono font-medium text-t-primary">{signal.tp1}</span>
                            {Math.abs((signal.currentPrice - signal.entryPrice)/(signal.tp1 - signal.entryPrice)) >= 1 
                                ? <Icon name="check-circle-fill" className="!size-4 fill-primary-02" /> 
                                : <div className="w-4 h-4 rounded-full border border-s-border" />
                            }
                        </div>
                        <div className="flex justify-between items-center text-body-2">
                            <span className="text-t-secondary">TP2</span>
                            <span className="font-mono font-medium text-t-primary">{signal.tp2}</span>
                            {Math.abs((signal.currentPrice - signal.entryPrice)/(signal.tp2 - signal.entryPrice)) >= 1 
                                ? <Icon name="check-circle-fill" className="!size-4 fill-primary-02" /> 
                                : <div className="w-4 h-4 rounded-full border border-s-border" />
                            }
                        </div>
                    </div>

                    <Button 
                        href={`/signals/${signal.id}`}
                        as="link"
                        className="w-full !h-10 mb-3 justify-between"
                        isStroke
                    >
                        {language === 'fr' ? 'Voir Analyse' : 'View Analysis'}
                        <Icon name="arrow" className="!size-4 fill-inherit" />
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
