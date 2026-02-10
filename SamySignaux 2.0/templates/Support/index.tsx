"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateHeight from "react-animate-height";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";

type TicketCategory = 'broker' | 'subscription' | 'bug' | 'question';
type TicketStatus = 'open' | 'answered' | 'closed';

interface Ticket {
    id: number;
    subject: string;
    message: string;
    category: TicketCategory;
    status: TicketStatus;
    date: string;
    reply?: string;
}

const SupportPage = () => {
    const { t } = useLanguage();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState<TicketCategory>('question');
    const [tickets, setTickets] = useState<Ticket[]>([
        { id: 1001, subject: 'Problème de connexion broker', message: 'Je n\'arrive pas à lier mon compte AXI.', category: 'broker', status: 'answered', date: '2026-02-09', reply: 'Bonjour, veuillez vérifier votre ID de compte et réessayer. Si le problème persiste, contactez le support AXI directement.' },
        { id: 1002, subject: 'Question sur l\'abonnement', message: 'Est-ce que je peux changer de plan en cours de mois ?', category: 'subscription', status: 'open', date: '2026-02-10' },
    ]);
    const [sent, setSent] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>('all');

    const categories: { value: TicketCategory; label: string }[] = [
        { value: 'broker', label: t.categoryBroker },
        { value: 'subscription', label: t.categorySubscription },
        { value: 'bug', label: t.categoryBug },
        { value: 'question', label: t.categoryQuestion },
    ];

    const faqItems = [
        { q: t.faqPlatformQ, a: t.faqPlatformA },
        { q: t.faqDepositQ, a: t.faqDepositA },
        { q: t.faqWithdrawalQ, a: t.faqWithdrawalA },
        { q: t.faqRiskQ, a: t.faqRiskA },
        { q: t.faqSubscriptionQ, a: t.faqSubscriptionA },
        { q: t.faqTrainingQ, a: t.faqTrainingA },
    ];

    const handleSend = () => {
        if (!subject.trim() || !message.trim()) return;
        const newTicket: Ticket = {
            id: Date.now(),
            subject: subject.trim(),
            message: message.trim(),
            category,
            status: 'open',
            date: new Date().toISOString().split('T')[0],
        };
        setTickets(prev => [newTicket, ...prev]);
        setSubject('');
        setMessage('');
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    const getStatusBadge = (status: TicketStatus) => {
        const map = {
            open: { label: t.ticketStatusOpen, color: 'bg-yellow-500/10 text-yellow-600' },
            answered: { label: t.ticketStatusAnswered, color: 'bg-primary-02/10 text-primary-02' },
            closed: { label: t.ticketStatusClosed, color: 'bg-t-tertiary/10 text-t-tertiary' },
        };
        const s = map[status];
        return <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${s.color}`}>{s.label}</span>;
    };

    const getCategoryLabel = (cat: TicketCategory) => {
        const found = categories.find(c => c.value === cat);
        return found?.label || cat;
    };

    const filteredTickets = filterCategory === 'all' ? tickets : tickets.filter(t => t.category === filterCategory);

    return (
        <Layout title={t.support}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-h3 font-bold text-t-primary">{t.supportTitle}</h1>
                    <p className="text-body-1 text-t-secondary mt-1">{t.supportSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: New Ticket + History */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* New Ticket Form */}
                        <Card title={t.newTicket}>
                            <div className="px-5 pb-5 space-y-4">
                                {/* Category Select */}
                                <div>
                                    <label className="text-caption font-semibold text-t-secondary mb-1.5 block">{t.ticketCategory}</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value as TicketCategory)}
                                        className="w-full h-11 px-4 bg-b-surface2 border border-s-border rounded-xl text-body-2 text-t-primary focus:outline-none focus:border-primary-01 transition-colors"
                                    >
                                        {categories.map(c => (
                                            <option key={c.value} value={c.value}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="text-caption font-semibold text-t-secondary mb-1.5 block">{t.ticketSubject}</label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder={t.ticketSubjectPlaceholder}
                                        className="w-full h-11 px-4 bg-b-surface2 border border-s-border rounded-xl text-body-2 text-t-primary placeholder:text-t-tertiary focus:outline-none focus:border-primary-01 transition-colors"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="text-caption font-semibold text-t-secondary mb-1.5 block">{t.ticketMessage}</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={t.ticketMessagePlaceholder}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-b-surface2 border border-s-border rounded-xl text-body-2 text-t-primary placeholder:text-t-tertiary focus:outline-none focus:border-primary-01 transition-colors resize-none"
                                    />
                                </div>

                                {/* Send Button + Success Message */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleSend}
                                        disabled={!subject.trim() || !message.trim()}
                                        className="h-11 px-6 bg-shade-01 dark:bg-shade-07 text-shade-07 dark:text-shade-01 rounded-xl text-button font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        {t.sendTicket}
                                    </button>
                                    <AnimatePresence>
                                        {sent && (
                                            <motion.p
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-caption text-primary-02 font-medium"
                                            >
                                                {t.ticketSent}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </Card>

                        {/* Ticket History */}
                        <Card title={t.ticketHistory} className="!p-0 overflow-hidden">
                            {/* Category Filter */}
                            <div className="flex items-center gap-2 px-5 pt-5 pb-3 flex-wrap">
                                {[{ value: 'all', label: t.allVideos?.replace('vidéos', 'tickets').replace('videos', 'tickets') || 'Tous' }, ...categories].map(c => (
                                    <button
                                        key={c.value}
                                        onClick={() => setFilterCategory(c.value)}
                                        className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                                            filterCategory === c.value
                                                ? 'bg-shade-01 dark:bg-shade-07 text-shade-07 dark:text-shade-01'
                                                : 'bg-b-surface2 text-t-secondary hover:text-t-primary'
                                        }`}
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                            <div className="divide-y divide-s-border/50">
                                {filteredTickets.length === 0 ? (
                                    <div className="px-5 py-10 text-center text-caption text-t-tertiary">{t.noTickets}</div>
                                ) : (
                                    filteredTickets.map(ticket => (
                                        <div key={ticket.id} className="px-5 py-4 hover:bg-b-surface2/40 transition-colors">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-body-2 font-semibold text-t-primary truncate">{ticket.subject}</span>
                                                        {getStatusBadge(ticket.status)}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-[11px] text-t-tertiary">
                                                        <span>{getCategoryLabel(ticket.category)}</span>
                                                        <span>#{ticket.id}</span>
                                                        <span>{ticket.date}</span>
                                                    </div>
                                                    <p className="text-caption text-t-secondary mt-1.5 line-clamp-2">{ticket.message}</p>
                                                    {ticket.reply && (
                                                        <div className="mt-3 p-3 bg-primary-02/5 border border-primary-02/15 rounded-lg">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <Icon name="chat" className="!size-3.5 fill-primary-02" />
                                                                <span className="text-[11px] font-semibold text-primary-02">{t.adminReplied}</span>
                                                            </div>
                                                            <p className="text-caption text-t-secondary">{ticket.reply}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Right: FAQ */}
                    <div>
                        <Card title={t.faqTitle} className="sticky top-24">
                            <div className="p-6">
                                {faqItems.map((item, i) => (
                                    <div key={i} className="py-3 border-b border-s-subtle last:border-0">
                                        <div
                                            className="flex items-center gap-6 py-4 text-h6 cursor-pointer hover:text-primary-01 transition-colors"
                                            onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                        >
                                            <div className="grow">{item.q}</div>
                                            <div className="relative shrink-0 w-6 h-6 ml-auto">
                                                <div className="absolute top-1/2 left-1/2 -translate-1/2 w-3 h-0.5 rounded-full bg-t-secondary"></div>
                                                <div
                                                    className={`absolute top-1/2 left-1/2 -translate-1/2 w-0.5 h-3 rounded-full bg-t-secondary transition-transform duration-300 ${
                                                        expandedFaq === i ? "rotate-90" : ""
                                                    }`}
                                                ></div>
                                            </div>
                                        </div>
                                        <AnimateHeight duration={300} height={expandedFaq === i ? "auto" : 0}>
                                            <div className="pb-4 text-body-2 text-t-secondary">{item.a}</div>
                                        </AnimateHeight>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SupportPage;
