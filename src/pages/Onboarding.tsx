import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { useLanguage } from '../components/ui/LanguageSwitcher';
import { 
  TrendingUp, Zap, Bell, Wallet, ArrowRight, CheckCircle, 
  BarChart3, Shield, Users, PlayCircle, X
} from 'lucide-react';
import { Card } from '../components/ui/Card';

const slides = [
  {
    id: 'welcome',
    icon: Zap,
    title: { fr: 'Bienvenue sur SamySignaux', en: 'Welcome to SamySignaux' },
    subtitle: { fr: 'Votre plateforme de signaux de trading IA', en: 'Your AI trading signals platform' },
    description: { 
      fr: 'Recevez des signaux de trading en temps réel, générés par intelligence artificielle, avec un taux de réussite de 78%.', 
      en: 'Get real-time trading signals powered by AI, with a 78% success rate.' 
    },
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'presentation',
    icon: PlayCircle,
    title: { fr: 'Découvrir la Plateforme', en: 'Discover the Platform' },
    subtitle: { fr: 'Regardez notre vidéo de présentation', en: 'Watch our presentation video' },
    description: { 
      fr: 'Une courte vidéo pour comprendre comment utiliser SamySignaux, suivre les signaux et connecter votre broker.', 
      en: 'A short video to understand how to use SamySignaux, follow signals and connect your broker.' 
    },
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'signals',
    icon: Bell,
    title: { fr: 'Signaux en Direct', en: 'Live Signals' },
    subtitle: { fr: 'Ne manquez aucune opportunité', en: 'Never miss an opportunity' },
    description: { 
      fr: 'Accédez à tous nos signaux actifs avec entrée, take profit et stop loss clairement indiqués. Les signaux sont mis à jour en temps réel.', 
      en: 'Access all our active signals with entry, take profit and stop loss clearly indicated. Signals update in real-time.' 
    },
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'broker',
    icon: Wallet,
    title: { fr: 'Connexion Broker', en: 'Broker Connection' },
    subtitle: { fr: 'Tradez directement', en: 'Trade directly' },
    description: { 
      fr: 'Connectez votre compte broker pour trader automatiquement ou manuellement depuis la plateforme. Supporte PuPrime et d\'autres brokers populaires.', 
      en: 'Connect your broker account to trade automatically or manually from the platform. Supports PuPrime and other popular brokers.' 
    },
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'community',
    icon: Users,
    title: { fr: 'Communauté', en: 'Community' },
    subtitle: { fr: 'Échangez avec d\'autres traders', en: 'Chat with other traders' },
    description: { 
      fr: 'Rejoignez notre communauté de traders. Discutez des signaux, partagez vos analyses et apprenez des meilleurs.', 
      en: 'Join our trading community. Discuss signals, share your analysis, and learn from the best.' 
    },
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'ready',
    icon: CheckCircle,
    title: { fr: 'Vous êtes prêt !', en: 'You are ready!' },
    subtitle: { fr: 'Commencez votre voyage de trading', en: 'Start your trading journey' },
    description: { 
      fr: 'Votre tableau de bord personnel vous attend. Consultez vos signaux, votre performance et tradez comme un pro.', 
      en: 'Your personal dashboard awaits. Check your signals, performance, and trade like a pro.' 
    },
    color: 'from-blue-500 to-indigo-600'
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { completeOnboarding } = useUserStore();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lang = language as 'fr' | 'en';

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(curr => curr + 1);
    } else {
      completeOnboarding();
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLast = currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8 justify-center">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx <= currentSlide ? 'w-12 bg-white' : 'w-8 bg-white/20'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left - Visual */}
                <div className={`bg-gradient-to-br ${slide.color} p-8 md:p-12 flex flex-col items-center justify-center text-white min-h-[300px] md:min-h-[500px]`}>
                  <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6"
                  >
                    <Icon className="w-12 h-12 md:w-16 md:h-16" />
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                    {slide.title[lang]}
                  </h2>
                  <p className="text-white/80 text-center">
                    {slide.subtitle[lang]}
                  </p>

                  {/* Mock UI Elements based on slide */}
                  {slide.id === 'signals' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 space-y-2 w-full max-w-[200px]"
                    >
                      <div className="bg-white/20 rounded-lg p-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-300" />
                        <span className="text-sm font-medium">BTC/USD BUY</span>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-amber-300" />
                        <span className="text-sm font-medium">+2.45%</span>
                      </div>
                    </motion.div>
                  )}

                  {slide.id === 'presentation' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 w-full max-w-[280px] aspect-video bg-slate-900 rounded-lg overflow-hidden relative shadow-lg ring-1 ring-white/20"
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <PlayCircle className="w-5 h-5 text-white fill-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-white rounded-full" />
                      </div>
                    </motion.div>
                  )}

                  {slide.id === 'broker' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 bg-white/20 rounded-xl p-4 w-full max-w-[200px]"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">PuPrime</span>
                      </div>
                      <div className="text-2xl font-bold">$12,450</div>
                      <div className="text-white/70 text-sm">Solde disponible</div>
                    </motion.div>
                  )}
                </div>

                {/* Right - Content */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-sm font-medium text-slate-400">
                        {lang === 'fr' ? 'Étape' : 'Step'} {currentSlide + 1} / {slides.length}
                      </span>
                      <button 
                        onClick={handleSkip}
                        className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        {lang === 'fr' ? 'Passer' : 'Skip'}
                      </button>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                      {slide.title[lang]}
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {slide.description[lang]}
                    </p>

                    {/* Feature bullets for specific slides */}
                    {slide.id === 'signals' && (
                      <ul className="mt-6 space-y-3">
                        {[
                          lang === 'fr' ? 'Signaux Forex, Crypto, Indices' : 'Forex, Crypto, Indices signals',
                          lang === 'fr' ? 'Mise à jour en temps réel' : 'Real-time updates',
                          lang === 'fr' ? 'Taux de réussite 78%' : '78% win rate'
                        ].map((item, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center gap-3 text-slate-700"
                          >
                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {slide.id === 'broker' && (
                      <ul className="mt-6 space-y-3">
                        {[
                          lang === 'fr' ? 'Connexion sécurisée' : 'Secure connection',
                          lang === 'fr' ? 'Exécution rapide' : 'Fast execution',
                          lang === 'fr' ? 'Support multi-brokers' : 'Multi-broker support'
                        ].map((item, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center gap-3 text-slate-700"
                          >
                            <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={handleNext}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${slide.color}`}
                    >
                      {isLast 
                        ? (lang === 'fr' ? 'Commencer maintenant' : 'Get started now')
                        : (lang === 'fr' ? 'Continuer' : 'Continue')
                      }
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    {!isLast && (
                      <button 
                        onClick={handleSkip}
                        className="w-full mt-3 py-3 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                      >
                        {lang === 'fr' ? 'Passer le tutoriel' : 'Skip tutorial'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Quick Tip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-white/60 text-sm">
            💡 {lang === 'fr' 
              ? 'Vous pouvez revoir ce tutoriel à tout moment depuis les paramètres' 
              : 'You can review this tutorial anytime from settings'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
