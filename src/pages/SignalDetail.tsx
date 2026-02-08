import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, MessageSquare, Star, Send, Clock, Target, Shield, Users, ChevronRight } from 'lucide-react';
import { useLanguage } from '../components/ui/LanguageSwitcher';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockSignals, mockUsers } from '../data/mockData';

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

export default function SignalDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
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
    <div className="space-y-6">
      {/* Back */}
      <Link to="/signals" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {language === 'fr' ? 'Retour aux signaux' : 'Back to signals'}
      </Link>

      {/* Signal Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                signal.direction === 'BUY' ? 'bg-emerald-100' : 'bg-red-100'
              }`}>
                {signal.direction === 'BUY'
                  ? <TrendingUp className="w-7 h-7 text-emerald-600" />
                  : <TrendingDown className="w-7 h-7 text-red-600" />
                }
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">{signal.pair}</h1>
                  <Badge variant={signal.direction === 'BUY' ? 'success' : 'danger'}>
                    {signal.direction}
                  </Badge>
                  <Badge variant={signal.status === 'active' ? 'info' : signal.status === 'won' ? 'success' : 'danger'}>
                    {signal.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {signal.createdAt.toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {signal.followers} {language === 'fr' ? 'abonnés' : 'followers'}</span>
                  <span>{signal.market}</span>
                </div>
              </div>
            </div>

            {/* Profit */}
            <div className="text-right">
              <p className={`text-3xl font-bold font-mono ${profitPercent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%
              </p>
              <p className="text-sm text-slate-500">{language === 'fr' ? 'Profit actuel' : 'Current profit'}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Price Levels */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-4">
                {language === 'fr' ? 'Niveaux de prix' : 'Price Levels'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-500 mb-1">{language === 'fr' ? 'Entrée' : 'Entry'}</p>
                  <p className="font-bold text-slate-900 font-mono">${signal.entryPrice.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-500 mb-1">{language === 'fr' ? 'Prix actuel' : 'Current'}</p>
                  <p className={`font-bold font-mono ${profitPercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    ${signal.currentPrice.toLocaleString()}
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-emerald-600 mb-1 flex items-center justify-center gap-1">
                    <Target className="w-3 h-3" /> Take Profit
                  </p>
                  <p className="font-bold text-emerald-700 font-mono">${signal.takeProfit.toLocaleString()}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-red-600 mb-1 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" /> Stop Loss
                  </p>
                  <p className="font-bold text-red-700 font-mono">${signal.stopLoss.toLocaleString()}</p>
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
                    <span className="text-xs font-semibold text-slate-500 w-8">{tp.label}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          tp.value > 0 ? 'bg-emerald-500' : 'bg-red-400'
                        }`}
                        style={{ width: `${Math.min(Math.max(tp.value / signal.tp3 * 100, 0), 100)}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold w-14 text-right ${tp.value > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tp.value > 0 ? '+' : ''}{tp.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Votes */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-4">
                {language === 'fr' ? 'Votes de la communauté' : 'Community Votes'}
              </h3>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setUserVote(userVote === 'up' ? null : 'up')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    userVote === 'up'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-bold">{signal.votes.up + (userVote === 'up' ? 1 : 0)}</span>
                </button>
                <button
                  onClick={() => setUserVote(userVote === 'down' ? null : 'down')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    userVote === 'down'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-500/25'
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                  <span className="font-bold">{signal.votes.down + (userVote === 'down' ? 1 : 0)}</span>
                </button>
                <div className="flex-1">
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(signal.votes.up / (signal.votes.up + signal.votes.down)) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {Math.round((signal.votes.up / (signal.votes.up + signal.votes.down)) * 100)}% {language === 'fr' ? 'positif' : 'positive'}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Reviews */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-slate-900">
                    {language === 'fr' ? 'Avis & Commentaires' : 'Reviews & Comments'}
                  </h3>
                  <span className="text-sm text-slate-500">({reviews.length})</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                  ))}
                  <span className="text-sm font-bold text-slate-700 ml-1">{avgRating.toFixed(1)}</span>
                </div>
              </div>

              {/* Write Review */}
              <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-slate-700">
                    {language === 'fr' ? 'Votre note :' : 'Your rating:'}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewRating(i + 1)}
                        className="p-0.5"
                      >
                        <Star className={`w-5 h-5 transition-colors ${
                          i < newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder={language === 'fr' ? 'Donnez votre avis sur ce signal...' : 'Share your opinion on this signal...'}
                    className="flex-1 h-10 bg-white border border-slate-200 rounded-lg px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="px-4 h-10 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-30 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map(review => {
                  const user = getUser(review.userId);
                  return (
                    <div key={review.id} className="flex items-start gap-3">
                      <img src={user?.avatar} alt="" className="w-9 h-9 rounded-full flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-slate-900">{user?.username}</span>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-slate-400">
                            {Math.floor((Date.now() - review.createdAt.getTime()) / 3600000)}h
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {language === 'fr' ? review.comment : review.commentEn}
                        </p>
                        <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 mt-1.5 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{review.helpful} {language === 'fr' ? 'utile' : 'helpful'}</span>
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
          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-3">
              {language === 'fr' ? 'Confiance IA' : 'AI Confidence'}
            </h3>
            <div className="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={signal.confidence >= 80 ? '#10b981' : signal.confidence >= 60 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="3"
                  strokeDasharray={`${signal.confidence}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-extrabold text-slate-900">{signal.confidence}%</span>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-3">
              {language === 'fr' ? 'Statistiques' : 'Statistics'}
            </h3>
            <div className="space-y-3">
              {[
                { label: language === 'fr' ? 'Marché' : 'Market', value: signal.market },
                { label: language === 'fr' ? 'Abonnés' : 'Followers', value: signal.followers.toString() },
                { label: language === 'fr' ? 'Note moyenne' : 'Avg Rating', value: `${avgRating.toFixed(1)}/5` },
                { label: language === 'fr' ? 'Avis' : 'Reviews', value: reviews.length.toString() },
                { label: 'Risk/Reward', value: `1:${((signal.takeProfit - signal.entryPrice) / (signal.entryPrice - signal.stopLoss)).toFixed(1)}` },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500">{stat.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Similar Signals CTA */}
          <Card className="p-5 bg-gradient-to-br from-indigo-50 to-white">
            <h3 className="font-semibold text-slate-900 mb-2">
              {language === 'fr' ? 'Signaux similaires' : 'Similar signals'}
            </h3>
            <div className="space-y-2">
              {mockSignals.filter(s => s.id !== signal.id && s.market === signal.market).slice(0, 3).map(s => (
                <Link
                  key={s.id}
                  to={`/signals/${s.id}`}
                  className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-100 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      s.direction === 'BUY' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>{s.direction}</span>
                    <span className="text-sm font-medium text-slate-900">{s.pair}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
