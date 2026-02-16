"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Field from '@/components/Field';
import { useLanguage } from '@/context/LanguageContext';
import { mockSignals, mockUsers } from '@/data/mockData';

interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  commentEn: string;
  createdAt: Date;
  helpful: number;
}

const ago = (h: number) => new Date(Date.now() - h * 3600000);

const mockReviews: Review[] = [
  { id: 'r1', userId: 'u2', rating: 5, comment: 'Signal parfait, TP2 touché en moins de 4h. Bravo !', commentEn: 'Perfect signal, TP2 hit in less than 4h. Bravo!', createdAt: ago(2), helpful: 12 },
  { id: 'r2', userId: 'u3', rating: 4, comment: 'Bonne entrée, j\'ai pris mes profits au TP1. Prudent mais efficace.', commentEn: 'Good entry, I took my profits at TP1. Cautious but effective.', createdAt: ago(5), helpful: 8 },
  { id: 'r3', userId: 'u5', rating: 5, comment: 'Encore un signal en or ! La confiance IA était bien calibrée.', commentEn: 'Another golden signal! AI confidence was well calibrated.', createdAt: ago(8), helpful: 15 },
  { id: 'r4', userId: 'u7', rating: 3, comment: 'Le signal a mis du temps à se déclencher mais a fini positif.', commentEn: 'The signal took time to trigger but ended positive.', createdAt: ago(12), helpful: 4 },
  { id: 'r5', userId: 'u4', rating: 5, comment: 'Money management respecté, très bon ratio risk/reward.', commentEn: 'Money management respected, very good risk/reward ratio.', createdAt: ago(18), helpful: 21 },
];

type SignalDetailProps = {
    id: string;
};

const SignalDetail = ({ id }: SignalDetailProps) => {
    const { t, language } = useLanguage();
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [reviews, setReviews] = useState(mockReviews);
    const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

    const signal = mockSignals.find(s => s.id === id) || mockSignals[0];
    const profitPercent = ((signal.currentPrice - signal.entryPrice) / signal.entryPrice * 100) * (signal.direction === 'SELL' ? -1 : 1);
    const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        const review: Review = {
            id: `r${Date.now()}`,
            userId: 'u1',
            rating: newRating,
            comment: newComment,
            commentEn: newComment,
            createdAt: new Date(),
            helpful: 0,
        };
        setReviews(prev => [review, ...prev]);
        setNewComment('');
        setNewRating(5);
    };

    const getUser = (uid: string) => mockUsers.find(u => u.id === uid);

    return (
        <Layout title="Signal Detail">
            <div className="max-w-[1200px] mx-auto space-y-6">
                {/* Back */}
                <Link href="/signals" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-body-1 font-medium text-t-secondary hover:text-t-primary hover:bg-b-surface2 transition-all mb-2 -ml-3">
                    <Icon name="arrow" className="!size-5 fill-inherit rotate-180" />
                    {t.backToSignals}
                </Link>

                {/* Signal Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card title="" className="!p-6 border border-transparent dark:border-s-border">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                    signal.direction === 'BUY' ? 'bg-primary-02/10' : 'bg-primary-03/10'
                                }`}>
                                    <Icon 
                                        name={signal.direction === 'BUY' ? 'trending-up' : 'trending-down'} 
                                        className={`!size-7 ${signal.direction === 'BUY' ? 'fill-primary-02' : 'fill-primary-03'}`}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-h4 font-bold text-t-primary">{signal.pair}</h1>
                                        <Badge color={signal.direction === 'BUY' ? 'green' : 'red'}>
                                            {signal.direction}
                                        </Badge>
                                        <Badge color={
                                            signal.status === 'active' ? 'blue' : 
                                            signal.status === 'won' ? 'green' : 
                                            signal.status === 'lost' ? 'red' : 'gray'
                                        }>
                                            {signal.status.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-body-2 text-t-secondary">
                                        <span className="flex items-center gap-1">
                                            <Icon name="clock" className="!size-3.5 fill-t-secondary" /> 
                                            {new Date(signal.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Icon name="users-2" className="!size-3.5 fill-t-secondary" /> 
                                            {signal.followers} {t.followers}
                                        </span>
                                        <span>{signal.market}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Profit */}
                            <div className="text-right">
                                <p className={`text-h3 font-bold font-mono ${profitPercent >= 0 ? 'text-primary-02' : 'text-primary-03'}`}>
                                    {profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%
                                </p>
                                <p className="text-body-2 text-t-secondary">{t.currentProfit}</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Price Levels */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <Card title={t.priceLevels} className="!p-5 border border-transparent dark:border-s-border">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="bg-b-surface1 rounded-xl p-4 text-center border border-transparent dark:border-s-border">
                                        <p className="text-caption text-t-secondary mb-1">{t.entry}</p>
                                        <p className="font-bold text-t-primary font-mono">${signal.entryPrice.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-b-surface1 rounded-xl p-4 text-center border border-transparent dark:border-s-border">
                                        <p className="text-caption text-t-secondary mb-1">{t.current}</p>
                                        <p className={`font-bold font-mono ${profitPercent >= 0 ? 'text-primary-02' : 'text-primary-03'}`}>
                                            ${signal.currentPrice.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-primary-02/10 rounded-xl p-4 text-center border border-transparent dark:border-primary-02/20">
                                        <p className="text-caption text-primary-02 mb-1 flex items-center justify-center gap-1">
                                            <Icon name="target" className="!size-3 fill-primary-02" /> Take Profit
                                        </p>
                                        <p className="font-bold text-primary-02 font-mono">${signal.takeProfit.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-primary-03/10 rounded-xl p-4 text-center border border-transparent dark:border-primary-03/20">
                                        <p className="text-caption text-primary-03 mb-1 flex items-center justify-center gap-1">
                                            <Icon name="shield" className="!size-3 fill-primary-03" /> Stop Loss
                                        </p>
                                        <p className="font-bold text-primary-03 font-mono">${signal.stopLoss.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* TP Levels */}
                                <div className="mt-4 space-y-2">
                                    {[
                                        { label: 'TP1', value: signal.tp1, pct: 33 },
                                        { label: 'TP2', value: signal.tp2, pct: 66 },
                                        { label: 'TP3', value: signal.tp3, pct: 100 },
                                    ].map(tp => (
                                        <div key={tp.label} className="flex items-center gap-3">
                                            <span className="text-caption font-semibold text-t-secondary w-8">{tp.label}</span>
                                            <div className="flex-1 h-2 bg-b-surface1 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${
                                                        tp.value > 0 ? 'bg-primary-02' : 'bg-primary-03'
                                                    }`}
                                                    style={{ width: `${Math.min(Math.max(tp.value / signal.tp3 * 100, 0), 100)}%` }}
                                                />
                                            </div>
                                            <span className={`text-caption font-bold w-14 text-right ${tp.value > 0 ? 'text-primary-02' : 'text-primary-03'}`}>
                                                {tp.value > 0 ? '+' : ''}{tp.value}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Votes */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                            <Card title={t.communityVotes} className="!p-5 border border-transparent dark:border-s-border">
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => setUserVote(userVote === 'up' ? null : 'up')}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                                            userVote === 'up'
                                                ? 'bg-primary-02 text-white shadow-lg shadow-primary-02/25'
                                                : 'bg-primary-02/10 text-primary-02 hover:bg-primary-02/20'
                                        }`}
                                    >
                                        <Icon name="thumbs-up" className={`!size-5 ${userVote === 'up' ? 'fill-white' : 'fill-primary-02'}`} />
                                        <span className="font-bold">{signal.votes.up + (userVote === 'up' ? 1 : 0)}</span>
                                    </button>
                                    <button
                                        onClick={() => setUserVote(userVote === 'down' ? null : 'down')}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                                            userVote === 'down'
                                                ? 'bg-primary-03 text-white shadow-lg shadow-primary-03/25'
                                                : 'bg-primary-03/10 text-primary-03 hover:bg-primary-03/20'
                                        }`}
                                    >
                                        <Icon name="thumbs-down" className={`!size-5 ${userVote === 'down' ? 'fill-white' : 'fill-primary-03'}`} />
                                        <span className="font-bold">{signal.votes.down + (userVote === 'down' ? 1 : 0)}</span>
                                    </button>
                                    <div className="flex-1">
                                        <div className="h-3 bg-b-surface1 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary-02 rounded-full"
                                                style={{ width: `${(signal.votes.up / (signal.votes.up + signal.votes.down)) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-caption text-t-secondary mt-1">
                                            {Math.round((signal.votes.up / (signal.votes.up + signal.votes.down)) * 100)}% {t.positive}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Reviews */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <Card title="" className="!p-5 border border-transparent dark:border-s-border">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-body-1 font-semibold text-t-primary">
                                            {t.reviewsAndComments}
                                        </h3>
                                        <span className="text-body-2 text-t-secondary">({reviews.length})</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Icon key={i} name="star-fill" className={`!size-4 ${i < Math.round(avgRating) ? 'fill-primary-05' : 'fill-shade-06'}`} />
                                        ))}
                                        <span className="text-body-2 font-bold text-t-primary ml-1">{avgRating.toFixed(1)}</span>
                                    </div>
                                </div>

                                {/* Write Review */}
                                <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-b-surface1 rounded-xl">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-body-2 font-medium text-t-primary">
                                            {t.yourRating}
                                        </span>
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => setNewRating(i + 1)}
                                                    className="p-0.5"
                                                >
                                                    <Icon name="star-fill" className={`!size-5 transition-colors ${
                                                        i < newRating ? 'fill-primary-05' : 'fill-shade-06'
                                                    }`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Field 
                                            value={newComment}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewComment(e.target.value)}
                                            placeholder={t.reviewPlaceholder}
                                            className="flex-1"
                                            classInput="!h-10"
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!newComment.trim()}
                                            isBlack
                                            className="!h-10 !px-4"
                                        >
                                            <Icon name="send" className="!size-4 fill-inherit" />
                                        </Button>
                                    </div>
                                </form>

                                {/* Reviews List */}
                                <div className="space-y-4">
                                    {reviews.map(review => {
                                        const user = getUser(review.userId);
                                        return (
                                            <div key={review.id} className="flex items-start gap-3">
                                                <div className="relative">
                                                    <img src={user?.avatar} alt="" className="w-9 h-9 rounded-full flex-shrink-0 mt-0.5 bg-b-surface2" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="text-body-2 font-semibold text-t-primary">{user?.username}</span>
                                                        <div className="flex items-center gap-0.5">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <Icon key={i} name="star-fill" className={`!size-3 ${i < review.rating ? 'fill-primary-05' : 'fill-shade-06'}`} />
                                                            ))}
                                                        </div>
                                                        <span className="text-caption text-t-tertiary">
                                                            {Math.floor((Date.now() - review.createdAt.getTime()) / 3600000)}h
                                                        </span>
                                                    </div>
                                                    <p className="text-body-2 text-t-secondary mt-1">
                                                        {language === 'fr' ? review.comment : review.commentEn}
                                                    </p>
                                                    <button className="flex items-center gap-1 text-caption text-t-tertiary hover:text-t-primary mt-1.5 transition-colors">
                                                        <Icon name="thumbs-up" className="!size-3 fill-current" />
                                                        <span>{review.helpful} {t.helpful}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column - Sidebar Info */}
                    <div className="space-y-4">
                        {/* Confidence */}
                        <Card title={t.aiConfidence} className="!p-5 border border-transparent dark:border-s-border">
                            <div className="relative w-32 h-32 mx-auto">
                                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-s-stroke2)" strokeWidth="3" />
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke={signal.confidence >= 80 ? 'var(--color-primary-02)' : signal.confidence >= 60 ? 'var(--color-primary-05)' : 'var(--color-primary-03)'}
                                        strokeWidth="3"
                                        strokeDasharray={`${signal.confidence}, 100`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-h4 font-extrabold text-t-primary">{signal.confidence}%</span>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Stats */}
                        <Card title={t.statistics} className="!p-5 border border-transparent dark:border-s-border">
                            <div className="space-y-3">
                                {[
                                    { label: t.market, value: signal.market },
                                    { label: t.followers, value: signal.followers.toString() },
                                    { label: t.avgRating, value: `${avgRating.toFixed(1)}/5` },
                                    { label: t.reviews, value: reviews.length.toString() },
                                    { label: 'Risk/Reward', value: `1:${((signal.takeProfit - signal.entryPrice) / (signal.entryPrice - signal.stopLoss)).toFixed(1)}` },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-s-border last:border-0">
                                        <span className="text-body-2 text-t-secondary">{stat.label}</span>
                                        <span className="text-body-2 font-semibold text-t-primary">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Similar Signals CTA */}
                        <Card title={t.similarSignals} className="!p-5 !bg-b-surface2 border border-transparent dark:border-s-border">
                            <div className="space-y-2">
                                {mockSignals.filter(s => s.id !== signal.id && s.market === signal.market).slice(0, 3).map(s => (
                                    <Link
                                        key={s.id}
                                        href={`/signals/${s.id}`}
                                        className="flex items-center justify-between p-2.5 bg-b-surface1 rounded-lg border border-s-border hover:border-primary-04 transition-colors group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={`text-caption font-bold px-1.5 py-0.5 rounded ${
                                                s.direction === 'BUY' ? 'bg-primary-02/10 text-primary-02' : 'bg-primary-03/10 text-primary-03'
                                            }`}>{s.direction}</span>
                                            <span className="text-body-2 font-medium text-t-primary">{s.pair}</span>
                                        </div>
                                        <Icon name="chevron" className="!size-4 fill-t-secondary group-hover:fill-primary-04 -rotate-90" />
                                    </Link>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SignalDetail;
