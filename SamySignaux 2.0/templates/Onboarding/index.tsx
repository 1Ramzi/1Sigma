"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { useLanguage } from '@/context/LanguageContext';
import Icon from '@/components/Icon';
import Card from '@/components/Card';
import Button from '@/components/Button';

const slides = [
  {
    id: 'welcome',
    icon: 'zap',
    title: { fr: 'Bienvenue sur SamySignaux', en: 'Welcome to SamySignaux' },
    subtitle: { fr: 'Votre plateforme de signaux de trading IA', en: 'Your AI trading signals platform' },
    description: { 
      fr: 'Recevez des signaux de trading en temps réel, générés par intelligence artificielle, avec un taux de réussite de 78%.', 
      en: 'Get real-time trading signals powered by AI, with a 78% success rate.' 
    },
    color: 'from-primary-04 to-accent'
  },
  {
    id: 'presentation',
    icon: 'play-circle',
    title: { fr: 'Découvrir la Plateforme', en: 'Discover the Platform' },
    subtitle: { fr: 'Regardez notre vidéo de présentation', en: 'Watch our presentation video' },
    description: { 
      fr: 'Une courte vidéo pour comprendre comment utiliser SamySignaux, suivre les signaux et connecter votre broker.', 
      en: 'A short video to understand how to use SamySignaux, follow signals and connect your broker.' 
    },
    color: 'from-primary-01 to-primary-04'
  },
  {
    id: 'signals',
    icon: 'bell',
    title: { fr: 'Signaux en Direct', en: 'Live Signals' },
    subtitle: { fr: 'Ne manquez aucune opportunité', en: 'Never miss an opportunity' },
    description: { 
      fr: 'Accédez à tous nos signaux actifs avec entrée, take profit et stop loss clairement indiqués. Les signaux sont mis à jour en temps réel.', 
      en: 'Access all our active signals with entry, take profit and stop loss clearly indicated. Signals update in real-time.' 
    },
    color: 'from-primary-02 to-secondary-04'
  },
  {
    id: 'broker',
    icon: 'wallet',
    title: { fr: 'Connexion Broker', en: 'Broker Connection' },
    subtitle: { fr: 'Tradez directement', en: 'Trade directly' },
    description: { 
      fr: 'Connectez votre compte broker pour trader automatiquement ou manuellement depuis la plateforme. Supporte PuPrime et d\'autres brokers populaires.', 
      en: 'Connect your broker account to trade automatically or manually from the platform. Supports PuPrime and other popular brokers.' 
    },
    color: 'from-primary-05 to-secondary-05'
  },
  {
    id: 'community',
    icon: 'users-2',
    title: { fr: 'Communauté', en: 'Community' },
    subtitle: { fr: 'Échangez avec d\'autres traders', en: 'Chat with other traders' },
    description: { 
      fr: 'Rejoignez notre communauté de traders. Discutez des signaux, partagez vos analyses et apprenez des meilleurs.', 
      en: 'Join our trading community. Discuss signals, share your analysis, and learn from the best.' 
    },
    color: 'from-accent to-[#ff4757]'
  },
  {
    id: 'ready',
    icon: 'check-circle',
    title: { fr: 'Vous êtes prêt !', en: 'You are ready!' },
    subtitle: { fr: 'Commencez votre voyage de trading', en: 'Start your trading journey' },
    description: { 
      fr: 'Votre tableau de bord personnel vous attend. Consultez vos signaux, votre performance et tradez comme un pro.', 
      en: 'Your personal dashboard awaits. Check your signals, performance, and trade like a pro.' 
    },
    color: 'from-primary-01 to-primary-04'
  }
];

const OnboardingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { completeOnboarding } = useUserStore();
    const router = useRouter();
    const { language } = useLanguage();
    const lang = language as 'fr' | 'en';

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(curr => curr + 1);
        } else {
            completeOnboarding();
            router.push('/');
        }
    };

    const handleSkip = () => {
        completeOnboarding();
        router.push('/');
    };

    const slide = slides[currentSlide];
    const isLast = currentSlide === slides.length - 1;

    return (
        <div className="min-h-screen bg-linear-to-br from-shade-01 via-[#1e1e1e] to-shade-01 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Progress Bar */}
                <div className="flex gap-2 mb-8 justify-center">
                    {slides.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                idx <= currentSlide ? 'w-12 bg-shade-10' : 'w-8 bg-shade-10/20'
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
                        <Card title="" className="!p-0 shadow-2xl overflow-hidden !bg-b-surface1/95 backdrop-blur-xl">
                            <div className="grid md:grid-cols-2">
                                {/* Left - Visual */}
                                <div className={`bg-linear-to-br ${slide.color} p-8 md:p-12 flex flex-col items-center justify-center text-shade-10 min-h-[300px] md:min-h-[500px]`}>
                                    <motion.div
                                        initial={{ scale: 0.8, rotate: -10 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.2, type: 'spring' }}
                                        className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-shade-10/20 backdrop-blur-sm flex items-center justify-center mb-6"
                                    >
                                        <Icon name={slide.icon} className="!size-12 md:!size-16 fill-shade-10" />
                                    </motion.div>
                                    <h2 className="text-h4 md:text-h3 font-bold text-center mb-2">
                                        {slide.title[lang]}
                                    </h2>
                                    <p className="text-shade-10/80 text-center text-body-1">
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
                                            <div className="bg-shade-10/20 rounded-lg p-3 flex items-center gap-2">
                                                <Icon name="trending-up" className="!size-4 fill-secondary-04" />
                                                <span className="text-button font-medium">BTC/USD BUY</span>
                                            </div>
                                            <div className="bg-shade-10/20 rounded-lg p-3 flex items-center gap-2">
                                                <Icon name="bar-chart-3" className="!size-4 fill-secondary-05" />
                                                <span className="text-button font-medium">+2.45%</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {slide.id === 'presentation' && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="mt-6 w-full max-w-[280px] aspect-video bg-shade-01 rounded-lg overflow-hidden relative shadow-lg ring-1 ring-shade-10/20"
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <div className="w-10 h-10 rounded-full bg-shade-10/20 backdrop-blur-sm flex items-center justify-center">
                                                    <Icon name="play-circle" className="!size-5 fill-shade-10" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-2 left-2 right-2 h-1 bg-shade-10/30 rounded-full overflow-hidden">
                                                <div className="h-full w-1/3 bg-shade-10 rounded-full" />
                                            </div>
                                        </motion.div>
                                    )}

                                    {slide.id === 'broker' && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="mt-6 bg-shade-10/20 rounded-xl p-4 w-full max-w-[200px]"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <Icon name="shield" className="!size-5 fill-shade-10" />
                                                <span className="font-semibold text-body-2">PuPrime</span>
                                            </div>
                                            <div className="text-h4 font-bold">124</div>
                                            <div className="text-shade-10/70 text-caption">{lang === 'fr' ? 'Signaux Reçus' : 'Signals Received'}</div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Right - Content */}
                                <div className="p-8 md:p-12 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-body-2 font-medium text-t-tertiary">
                                                {lang === 'fr' ? 'Étape' : 'Step'} {currentSlide + 1} / {slides.length}
                                            </span>
                                            <button 
                                                onClick={handleSkip}
                                                className="text-body-2 text-t-tertiary hover:text-t-primary flex items-center gap-1 transition-colors"
                                            >
                                                <Icon name="close" className="!size-4 fill-inherit" />
                                                {lang === 'fr' ? 'Passer' : 'Skip'}
                                            </button>
                                        </div>

                                        <h3 className="text-h4 font-bold text-t-primary mb-4">
                                            {slide.title[lang]}
                                        </h3>
                                        <p className="text-body-1 text-t-secondary leading-relaxed">
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
                                                        className="flex items-center gap-3 text-t-secondary"
                                                    >
                                                        <Icon name="check-circle" className="!size-5 fill-primary-02 flex-shrink-0" />
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
                                                        className="flex items-center gap-3 text-t-secondary"
                                                    >
                                                        <Icon name="check-circle" className="!size-5 fill-primary-05 flex-shrink-0" />
                                                        {item}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            onClick={handleNext}
                                            className={`w-full py-4 px-6 rounded-xl font-semibold text-shade-10 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-linear-to-r ${slide.color} cursor-pointer`}
                                        >
                                            {isLast 
                                                ? (lang === 'fr' ? 'Commencer maintenant' : 'Get started now')
                                                : (lang === 'fr' ? 'Continuer' : 'Continue')
                                            }
                                            <Icon name="arrow" className="!size-5 fill-shade-10 -rotate-90" />
                                        </button>

                                        {!isLast && (
                                            <button 
                                                onClick={handleSkip}
                                                className="w-full mt-3 py-3 text-t-tertiary hover:text-t-primary text-body-2 font-medium transition-colors cursor-pointer"
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
                    <p className="text-shade-10/60 text-body-2">
                        💡 {lang === 'fr' 
                            ? 'Vous pouvez revoir ce tutoriel à tout moment depuis les paramètres' 
                            : 'You can review this tutorial anytime from settings'}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default OnboardingPage;
