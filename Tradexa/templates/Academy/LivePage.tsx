"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import AnimateHeight from "react-animate-height";
import { useLanguage } from "@/context/LanguageContext";
import { useUserStore } from "@/stores/userStore";

const LivePage = () => {
    const { t } = useLanguage();
    const { accountType } = useUserStore();
    const isFree = accountType === 'free';
    const [chatMessage, setChatMessage] = useState('');
    const [showPlanning, setShowPlanning] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { user: 'TradexaTrader', text: 'On attend le signal EUR/USD', time: '22:01' },
        { user: 'Alex_FX', text: 'Le gold est en feu aujourd\'hui', time: '22:03' },
        { user: 'MarieT', text: 'Merci pour le dernier TP !', time: '22:05' },
        { user: 'TraderPro99', text: 'Quelle paire on regarde ?', time: '22:06' },
        { user: 'Tradexa', text: 'On surveille BTC/USD et XAU/USD ce soir', time: '22:07' },
    ]);

    const schedule = [
        { day: t.monday, sessions: ['Live Trading Gold - 21h00'], color: 'primary-01' },
        { day: t.tuesday, sessions: ['Live Trading Forex EUR/USD - 21h00'], color: 'primary-02' },
        { day: t.wednesday, sessions: ['Live Trading Indices - 21h00'], color: 'primary-04' },
        { day: t.thursday, sessions: ['Live Trading Crypto BTC - 21h00'], color: 'secondary-04' },
        { day: t.friday, sessions: ['Live Trading Gold + Forex - 21h00'], color: 'primary-01' },
        { day: t.saturday, sessions: [], color: '' },
        { day: t.sunday, sessions: [], color: '' },
    ];

    const today = new Date().getDay(); // 0=Sun, 1=Mon...
    const todayIndex = today === 0 ? 6 : today - 1; // Convert to 0=Mon

    const handleSendChat = () => {
        if (!chatMessage.trim()) return;
        setChatMessages(prev => [...prev, {
            user: 'Vous',
            text: chatMessage.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
        setChatMessage('');
    };

    return (
        <Layout title={t.live}>
            <div className="max-w-[1400px] mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-h3 font-bold text-t-primary">{t.liveTitle}</h1>
                        <p className="text-body-1 text-t-secondary mt-1">{t.liveSubtitle}</p>
                    </div>
                    <button
                        onClick={() => setShowPlanning(!showPlanning)}
                        className={`flex items-center gap-2 h-10 px-5 rounded-xl text-button font-semibold transition-all ${
                            showPlanning
                                ? 'bg-primary-01 text-white'
                                : 'bg-b-surface2 border border-s-border text-t-secondary hover:text-t-primary hover:border-primary-01/40'
                        }`}
                    >
                        <Icon name="calendar-1" className={`!size-4 ${showPlanning ? 'fill-white' : 'fill-t-tertiary'}`} />
                        {t.planning}
                    </button>
                </div>

                {/* Weekly Planning */}
                <AnimateHeight duration={300} height={showPlanning ? "auto" : 0}>
                    <Card title={t.weeklySchedule}>
                        <div className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
                                {schedule.map((s, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-xl p-3 border transition-colors ${
                                            i === todayIndex
                                                ? 'border-primary-01 bg-primary-01/5'
                                                : 'border-s-border bg-b-surface2/50'
                                        }`}
                                    >
                                        <div className={`text-caption font-bold mb-1.5 ${i === todayIndex ? 'text-primary-01' : 'text-t-primary'}`}>
                                            {s.day}
                                            {i === todayIndex && <span className="ml-1 text-[10px] font-medium text-primary-02">â—</span>}
                                        </div>
                                        {s.sessions.length > 0 ? (
                                            s.sessions.map((sess, j) => (
                                                <div key={j} className={`text-[11px] leading-snug font-medium text-${s.color}`}>
                                                    {sess}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-[11px] text-t-tertiary italic">{t.noSession}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </AnimateHeight>

                {/* Ad Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-20 rounded-2xl border-2 border-dashed border-s-border bg-b-surface2/50 flex items-center justify-center gap-3">
                        <Icon name="star-fill" className="!size-5 fill-t-tertiary" />
                        <span className="text-body-2 font-semibold text-t-tertiary">{t.adPlaceholder}</span>
                    </div>
                    <div className="h-20 rounded-2xl border-2 border-dashed border-s-border bg-b-surface2/50 flex items-center justify-center gap-3">
                        <Icon name="star-fill" className="!size-5 fill-t-tertiary" />
                        <span className="text-body-2 font-semibold text-t-tertiary">{t.adPlaceholder}</span>
                    </div>
                </div>

                {/* Live Stream + Chat */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Stream â€” 2/3 */}
                    <div className="lg:col-span-2">
                        <Card className="!p-0 overflow-hidden" title="">
                            <div className="aspect-video bg-shade-01 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-shade-01/80" />
                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <Icon name="play" className="!size-10 fill-white ml-1" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-h5 font-bold text-white">{t.liveTitle}</p>
                                        <p className="text-caption text-white/60 mt-1">{t.liveSubtitle}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-caption font-semibold text-red-400">LIVE</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Chat â€” 1/3 */}
                    <div className="lg:col-span-1">
                        <div className="bg-b-surface1 rounded-2xl border border-s-border flex flex-col h-full" style={{ minHeight: '480px' }}>
                            {/* Chat Header */}
                            <div className="px-5 py-3 border-b border-s-border flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Icon name="chat" className="!size-4 fill-primary-01" />
                                    <span className="text-button font-semibold text-t-primary">{t.liveChat}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-primary-02" />
                                    <span className="text-[11px] text-t-tertiary">127 {t.online || 'en ligne'}</span>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar scrollbar-thumb-t-tertiary/30 scrollbar-track-transparent">
                                {chatMessages.map((msg, i) => (
                                    <div key={i} className="flex gap-2">
                                        <div className="w-7 h-7 rounded-full bg-b-surface2 flex items-center justify-center shrink-0">
                                            <span className="text-[10px] font-bold text-t-secondary">{msg.user.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-baseline gap-2">
                                                <span className={`text-[11px] font-bold ${msg.user === 'Tradexa' ? 'text-primary-01' : msg.user === 'Vous' ? 'text-primary-02' : 'text-t-primary'}`}>{msg.user}</span>
                                                <span className="text-[10px] text-t-tertiary">{msg.time}</span>
                                            </div>
                                            <p className="text-caption text-t-secondary mt-0.5">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chat Input */}
                            <div className="px-3 py-3 border-t border-s-border">
                                {isFree ? (
                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/5 border border-amber-500/20">
                                        <Icon name="lock" className="!size-4 fill-amber-500 shrink-0" />
                                        <p className="text-[11px] text-amber-500 font-medium">Abonnez-vous pour participer au chat en direct</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={chatMessage}
                                            onChange={(e) => setChatMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                                            placeholder={t.messagePlaceholder || 'Message...'}
                                            className="flex-1 h-9 px-3 bg-b-surface2 border border-s-border rounded-lg text-caption text-t-primary placeholder:text-t-tertiary focus:outline-none focus:border-primary-01 transition-colors"
                                        />
                                        <button
                                            onClick={handleSendChat}
                                            disabled={!chatMessage.trim()}
                                            className="w-9 h-9 rounded-lg bg-shade-01 dark:bg-shade-07 flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity disabled:opacity-40"
                                            title="Envoyer"
                                        >
                                            <Icon name="send" className="!size-4 fill-shade-07 dark:fill-shade-01" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LivePage;

