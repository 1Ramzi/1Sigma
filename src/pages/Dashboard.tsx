import { motion } from 'framer-motion';
import { PlayCircle, ArrowRight, Activity, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { useLanguage } from '../components/ui/LanguageSwitcher';
import { useUserStore } from '../stores/userStore';
import { useSignalStore } from '../stores/signalStore';

export default function Dashboard() {
  const { user } = useUserStore();
  const { language } = useLanguage();
  const { signals } = useSignalStore();
  
  const activeSignals = signals.filter(s => s.status === 'active');
  const winRate = 78.5;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {language === 'fr' ? `Bonjour, ${user?.username} 👋` : `Hello, ${user?.username} 👋`}
            </h1>
            <p className="text-slate-500 mt-1">
              {language === 'fr' 
                ? 'Prêt pour une nouvelle session de trading ?' 
                : 'Ready for a new trading session?'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Video & Quick Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-0 overflow-hidden border-0 shadow-lg group cursor-pointer relative aspect-video">
              {/* Video Thumbnail / Placeholder */}
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                  alt="Platform Presentation" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-indigo-600/90 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl shadow-indigo-500/30">
                  <PlayCircle className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-slate-900 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-indigo-600 text-[10px] font-bold uppercase tracking-wider">
                    {language === 'fr' ? 'Tutoriel' : 'Tutorial'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">
                  {language === 'fr' ? 'Découvrir la plateforme SamySignaux' : 'Discover SamySignaux Platform'}
                </h3>
                <p className="text-white/80 text-sm line-clamp-1">
                  {language === 'fr' 
                    ? 'Comment utiliser les signaux, connecter votre broker et maximiser vos gains.' 
                    : 'How to use signals, connect your broker and maximize your profits.'}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Key Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-white/20">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    {language === 'fr' ? 'Signaux Actifs' : 'Active Signals'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{activeSignals.length}</span>
                  <span className="text-sm text-emerald-300 font-medium">+2 today</span>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 bg-white border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <Activity className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-slate-500 text-sm font-medium">
                    {language === 'fr' ? 'Taux de réussite' : 'Win Rate'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">{winRate}%</span>
                  <span className="text-sm text-emerald-600 font-medium flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +1.2%
                  </span>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-4 bg-white border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-amber-100">
                    <BarChart3 className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-slate-500 text-sm font-medium">
                    {language === 'fr' ? 'Profit Mensuel' : 'Monthly Profit'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">+12.4%</span>
                  <span className="text-sm text-emerald-600 font-medium">Target 15%</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Broker & Actions */}
        <div className="space-y-6">
          {/* Broker Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-slate-900 text-white border-0 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-indigo-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
                        {language === 'fr' ? 'Broker Connecté' : 'Connected Broker'}
                      </p>
                      <p className="font-bold text-lg">PuPrime</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Connected
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-white/60 text-sm mb-1">
                      {language === 'fr' ? 'Solde Total' : 'Total Balance'}
                    </p>
                    <p className="text-3xl font-bold font-mono">$24,500.00</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-white/60 text-xs">PnL (Today)</p>
                      <p className="text-emerald-400 font-mono font-medium">+$450.20</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Open Trades</p>
                      <p className="text-white font-mono font-medium">3 Active</p>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/broker"
                  className="w-full py-3 bg-white text-slate-900 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
                >
                  {language === 'fr' ? 'Gérer mon compte' : 'Manage Account'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-4">
                {language === 'fr' ? 'Accès Rapide' : 'Quick Access'}
              </h3>
              <div className="space-y-3">
                <Link to="/signals" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 group transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                      <Activity className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">
                      {language === 'fr' ? 'Voir les signaux' : 'View Signals'}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                </Link>

                <Link to="/broker" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50 group transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-amber-700">
                      {language === 'fr' ? 'Mes positions' : 'My Positions'}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
