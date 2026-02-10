"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { useLanguage } from '@/context/LanguageContext';
import Icon from '@/components/Icon';
import Card from '@/components/Card';
import Button from '@/components/Button';

const OnboardingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { completeOnboarding } = useUserStore();
    const router = useRouter();
    const { t } = useLanguage();

    const slides = [
        {
            id: 'welcome',
            icon: 'zap',
            title: t.welcomeTitle,
            subtitle: t.welcomeSubtitle,
            description: t.welcomeDesc,
            color: 'from-primary-04 to-accent'
        },
        {
            id: 'presentation',
            icon: 'play-circle',
            title: t.discoverTitle,
            subtitle: t.discoverSubtitle,
            description: t.discoverDesc,
            color: 'from-primary-01 to-primary-04'
        },
        {
            id: 'signals',
            icon: 'bell',
            title: t.liveSignalsTitle,
            subtitle: t.liveSignalsSubtitle,
            description: t.liveSignalsDesc,
            color: 'from-primary-02 to-secondary-04'
        },
        {
            id: 'broker',
            icon: 'wallet',
            title: t.brokerConnectionTitle,
            subtitle: t.brokerConnectionSubtitle,
            description: t.brokerConnectionDesc,
            color: 'from-primary-05 to-secondary-05'
        },
        {
            id: 'community',
            icon: 'users-2',
            title: t.communityTitle,
            subtitle: t.communitySubtitle,
            description: t.communityDesc,
            color: 'from-accent to-[#ff4757]'
        },
        {
            id: 'ready',
            icon: 'check-circle',
            title: t.readyTitle,
            subtitle: t.readySubtitle,
            description: t.readyDesc,
            color: 'from-primary-01 to-primary-04'
        }
    ];

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
                                        {slide.title}
                                    </h2>
                                    <p className="text-shade-10/80 text-center text-body-1">
                                        {slide.subtitle}
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
                                            <div className="text-shade-10/70 text-caption">{t.signalsReceived}</div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Right - Content */}
                                <div className="p-8 md:p-12 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-body-2 font-medium text-t-tertiary">
                                                {t.step} {currentSlide + 1} / {slides.length}
                                            </span>
                                            <button 
                                                onClick={handleSkip}
                                                className="text-body-2 text-t-tertiary hover:text-t-primary flex items-center gap-1 transition-colors"
                                            >
                                                <Icon name="close" className="!size-4 fill-inherit" />
                                                {t.skip}
                                            </button>
                                        </div>

                                        <h3 className="text-h4 font-bold text-t-primary mb-4">
                                            {slide.title}
                                        </h3>
                                        <p className="text-body-1 text-t-secondary leading-relaxed">
                                            {slide.description}
                                        </p>

                                        {/* Feature bullets for specific slides */}
                                        {slide.id === 'signals' && (
                                            <ul className="mt-6 space-y-3">
                                                {[
                                                    t.forexCryptoIndices,
                                                    t.realTimeUpdates,
                                                    t.winRate78
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
                                                    t.secureConnection,
                                                    t.fastExecution,
                                                    t.multiBrokerSupport
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
                                                ? t.startNow
                                                : t.continue
                                            }
                                            <Icon name="arrow" className="!size-5 fill-shade-10 -rotate-90" />
                                        </button>

                                        {!isLast && (
                                            <button 
                                                onClick={handleSkip}
                                                className="w-full mt-3 py-3 text-t-tertiary hover:text-t-primary text-body-2 font-medium transition-colors cursor-pointer"
                                            >
                                                {t.skipTutorial}
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
                        💡 {t.tutorialTip}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default OnboardingPage;
