import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, Search, Filter, ArrowUpRight, 
  ArrowDownRight, Clock, Target, AlertTriangle, CheckCircle2,
  ChevronRight, BarChart2
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useSignalStore } from '../stores/signalStore';
import { useLanguage } from '../components/ui/LanguageSwitcher';

export default function Signals() {
  const { filteredSignals, setFilter, vote } = useSignalStore();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'active' | 'history'>('active');
  const { language } = useLanguage();

  const signals = filteredSignals().filter(s => {
    const matchesSearch = !search || s.pair.toLowerCase().includes(search.toLowerCase());
    const matchesView = view === 'active' ? s.status === 'active' : s.status !== 'active';
    return matchesSearch && matchesView;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'fr' ? 'Signaux de Trading' : 'Trading Signals'}
          </h1>
          <p className="text-slate-500 mt-1">
            {language === 'fr' 
              ? 'Opportunités de trading en temps réel avec analyse détaillée' 
              : 'Real-time trading opportunities with detailed analysis'}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setView('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'active' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {language === 'fr' ? 'En cours' : 'Active'}
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'history' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {language === 'fr' ? 'Historique' : 'History'}
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={language === 'fr' ? 'Rechercher une paire...' : 'Search pair...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {['Crypto', 'Forex', 'Indices', 'Commodities'].map(market => (
            <button
              key={market}
              onClick={() => setFilter('market', market)}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors whitespace-nowrap"
            >
              {market}
            </button>
          ))}
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
              <Card className="p-0 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Main Info */}
                  <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-slate-100">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          signal.direction === 'BUY' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {signal.direction === 'BUY' ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-slate-900">{signal.pair}</h3>
                            <Badge variant={signal.status === 'active' ? 'info' : signal.status === 'won' ? 'success' : 'danger'}>
                              {signal.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                            <span>{signal.market}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(signal.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 mb-1">
                          <span className="text-sm font-medium text-slate-500">Confidence</span>
                          <span className="text-sm font-bold text-indigo-600">{signal.confidence}%</span>
                        </div>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden ml-auto">
                          <div 
                            className="h-full bg-indigo-600 rounded-full"
                            style={{ width: `${signal.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-1">ENTRY PRICE</p>
                        <p className="font-mono font-semibold text-slate-900">{signal.entryPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-1">CURRENT</p>
                        <div className="flex items-center gap-1.5">
                          <p className={`font-mono font-semibold ${
                            signal.direction === 'BUY' 
                              ? (signal.currentPrice >= signal.entryPrice ? 'text-emerald-600' : 'text-red-600')
                              : (signal.currentPrice <= signal.entryPrice ? 'text-emerald-600' : 'text-red-600')
                          }`}>
                            {signal.currentPrice}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-1">TAKE PROFIT</p>
                        <div className="flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-emerald-500" />
                          <p className="font-mono font-semibold text-emerald-600">{signal.takeProfit}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-1">STOP LOSS</p>
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                          <p className="font-mono font-semibold text-red-600">{signal.stopLoss}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions & Stats */}
                  <div className="p-6 md:w-64 bg-slate-50 flex flex-col justify-center">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">TP1</span>
                        <span className="font-mono font-medium text-slate-700">{signal.tp1}</span>
                        {Math.abs((signal.currentPrice - signal.entryPrice)/(signal.tp1 - signal.entryPrice)) >= 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <span className="w-4 h-4 rounded-full border border-slate-300" />}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">TP2</span>
                        <span className="font-mono font-medium text-slate-700">{signal.tp2}</span>
                        {Math.abs((signal.currentPrice - signal.entryPrice)/(signal.tp2 - signal.entryPrice)) >= 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <span className="w-4 h-4 rounded-full border border-slate-300" />}
                      </div>
                    </div>

                    <Link 
                      to={`/signals/${signal.id}`}
                      className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2 mb-3"
                    >
                      {language === 'fr' ? 'Voir Analyse' : 'View Analysis'}
                      <ChevronRight className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => vote(signal.id, 'up')}
                        className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        {signal.votes.up}
                      </button>
                      <div className="w-px h-4 bg-slate-200" />
                      <button 
                        onClick={() => vote(signal.id, 'down')}
                        className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        {signal.votes.down}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {signals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              {language === 'fr' ? 'Aucun signal trouvé' : 'No signals found'}
            </h3>
            <p className="text-slate-500 mt-1">
              {language === 'fr' ? 'Essayez de modifier vos filtres' : 'Try adjusting your filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
