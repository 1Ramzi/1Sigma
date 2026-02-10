"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";
import Advancement from "@/templates/Signals/Advancement";
import Explanation from "@/templates/Signals/Explanation";

const AcademyPage = () => {
    const { t } = useLanguage();
    const [expandedModule, setExpandedModule] = useState<number | null>(null);

    const modules = [
      {
        id: 1,
        title: t.introTrading,
        desc: t.introTradingDesc,
        duration: '45 min',
        lessons: 5,
        progress: 100,
        locked: false,
        xp: 150,
        videos: [
          { name: 'Qu\'est-ce que le trading ?', duration: '8 min', status: 'completed' as const, xp: 30 },
          { name: 'Les marchés financiers', duration: '10 min', status: 'completed' as const, xp: 30 },
          { name: 'Types d\'ordres', duration: '12 min', status: 'completed' as const, xp: 30 },
          { name: 'Votre premier trade', duration: '8 min', status: 'completed' as const, xp: 30 },
          { name: 'Gestion du risque basique', duration: '7 min', status: 'completed' as const, xp: 30 },
        ],
      },
      {
        id: 2,
        title: t.techAnalysis,
        desc: t.techAnalysisDesc,
        duration: '2h 30min',
        lessons: 12,
        progress: 35,
        locked: false,
        xp: 300,
        videos: [
          { name: 'Lire un graphique', duration: '12 min', status: 'completed' as const, xp: 25 },
          { name: 'Supports et résistances', duration: '15 min', status: 'completed' as const, xp: 25 },
          { name: 'Les chandeliers japonais', duration: '10 min', status: 'completed' as const, xp: 25 },
          { name: 'Moyennes mobiles', duration: '12 min', status: 'completed' as const, xp: 25 },
          { name: 'RSI et MACD', duration: '14 min', status: 'required' as const, xp: 25 },
          { name: 'Fibonacci', duration: '11 min', status: 'required' as const, xp: 25 },
          { name: 'Patterns de prix', duration: '13 min', status: 'required' as const, xp: 25 },
          { name: 'Volumes', duration: '10 min', status: 'required' as const, xp: 25 },
          { name: 'Timeframes', duration: '8 min', status: 'required' as const, xp: 25 },
          { name: 'Divergences', duration: '12 min', status: 'required' as const, xp: 25 },
          { name: 'Ichimoku', duration: '15 min', status: 'required' as const, xp: 25 },
          { name: 'Stratégie multi-indicateurs', duration: '18 min', status: 'required' as const, xp: 25 },
        ],
      },
      {
        id: 3,
        title: t.traderPsychology,
        desc: t.traderPsychologyDesc,
        duration: '1h 15min',
        lessons: 8,
        progress: 0,
        locked: true,
        xp: 200,
        unlockXp: 400,
        videos: [
          { name: 'FOMO et FUD', duration: '10 min', status: 'locked' as const, xp: 25 },
          { name: 'Discipline de trading', duration: '12 min', status: 'locked' as const, xp: 25 },
          { name: 'Plan de trading', duration: '10 min', status: 'locked' as const, xp: 25 },
          { name: 'Gestion des pertes', duration: '8 min', status: 'locked' as const, xp: 25 },
          { name: 'Biais cognitifs', duration: '10 min', status: 'locked' as const, xp: 25 },
          { name: 'Journal de trading', duration: '8 min', status: 'locked' as const, xp: 25 },
          { name: 'Routine du trader', duration: '7 min', status: 'locked' as const, xp: 25 },
          { name: 'Mindset gagnant', duration: '10 min', status: 'locked' as const, xp: 25 },
        ],
      },
      {
        id: 4,
        title: t.advancedStrategies,
        desc: t.advancedStrategiesDesc,
        duration: '3h 45min',
        lessons: 15,
        progress: 0,
        locked: true,
        xp: 450,
        unlockXp: 600,
        videos: [
          { name: 'Scalping', duration: '15 min', status: 'locked' as const, xp: 30 },
          { name: 'Swing Trading', duration: '15 min', status: 'locked' as const, xp: 30 },
          { name: 'Position Trading', duration: '12 min', status: 'locked' as const, xp: 30 },
        ],
      },
    ];

    const getVideoStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <Icon name="check-circle-fill" className="!size-4 fill-primary-02" />;
            case 'required': return <div className="w-4 h-4 rounded-full border-2 border-primary-01" />;
            case 'locked': return <Icon name="lock" className="!size-4 fill-t-tertiary" />;
            default: return null;
        }
    };

    const getVideoStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return t.videoCompleted;
            case 'required': return t.videoRequired;
            case 'locked': return t.videoLocked;
            default: return '';
        }
    };

    const totalXP = 450; // Mock current XP

    return (
        <Layout title={t.academy}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-h3 font-bold text-t-primary">
                            {t.academyTitle}
                        </h1>
                        <p className="text-body-1 text-t-secondary mt-1">
                            {t.academySubtitle}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary-01/10 text-primary-01 rounded-lg">
                            <Icon name="graduation-cap" className="!size-5 fill-primary-01" />
                            <span className="font-semibold text-button">
                                {t.levelBeginner}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary-02/10 text-primary-02 rounded-lg">
                            <span className="font-bold text-button">{totalXP} XP</span>
                        </div>
                    </div>
                </div>

                {/* Advancement & Explanation (moved from Signals) */}
                <Advancement />
                <Explanation />

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modules.map((module, i) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="!p-0 h-full flex flex-col overflow-hidden group hover:shadow-depth transition-all duration-300 border border-transparent dark:border-s-border" title="">
                                <div className="h-40 bg-shade-01 relative">
                                    <div className="absolute inset-0 bg-linear-to-br from-primary-04/20 to-accent/20" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {module.locked ? (
                                            <div className="w-12 h-12 rounded-full bg-shade-02 flex items-center justify-center">
                                                <Icon name="lock" className="!size-5 fill-t-secondary" />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-shade-10/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon name="play-circle" className="!size-6 fill-shade-10" />
                                            </div>
                                        )}
                                    </div>
                                    {module.progress > 0 && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-shade-02">
                                            <div 
                                                className="h-full bg-primary-02" 
                                                style={{ width: `${module.progress}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-h6 font-bold text-t-primary line-clamp-1">{module.title}</h3>
                                        {module.progress === 100 && (
                                            <Icon name="check-circle-fill" className="!size-5 fill-primary-02 flex-shrink-0" />
                                        )}
                                    </div>
                                    
                                    <p className="text-body-2 text-t-secondary mb-3 line-clamp-2">{module.desc}</p>

                                    {/* Meta info row */}
                                    <div className="flex items-center gap-4 mb-3 text-caption text-t-tertiary font-medium">
                                        <span className="flex items-center gap-1">
                                            <Icon name="book-open" className="!size-3.5 fill-t-tertiary" />
                                            {module.lessons} {t.lessons}
                                        </span>
                                        <span>{module.duration}</span>
                                        <span className="ml-auto text-primary-02 font-bold">+{module.xp} XP</span>
                                    </div>

                                    {/* Locked info */}
                                    {module.locked && module.unlockXp && (
                                        <div className="flex items-center gap-2 px-3 py-2 bg-b-surface2 rounded-lg mb-3 text-caption">
                                            <Icon name="lock" className="!size-3.5 fill-t-tertiary" />
                                            <span className="text-t-secondary">{t.unlockIn} <strong className="text-t-primary">{module.unlockXp} XP</strong></span>
                                        </div>
                                    )}

                                    {/* Action button */}
                                    <div className="mt-auto">
                                        {module.progress === 100 ? (
                                            <button
                                                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                                className="w-full text-center py-2 text-caption font-semibold text-primary-02 bg-primary-02/10 rounded-lg hover:bg-primary-02/20 transition-colors"
                                            >
                                                {t.moduleCompleted} ✓
                                            </button>
                                        ) : !module.locked ? (
                                            <button
                                                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                                className="w-full text-center py-2 text-caption font-semibold text-primary-01 bg-primary-01/10 rounded-lg hover:bg-primary-01/20 transition-colors"
                                            >
                                                {module.progress > 0 ? t.continueModule : t.startModule}
                                            </button>
                                        ) : null}
                                    </div>

                                    {/* Expanded video list */}
                                    {expandedModule === module.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-4 border-t border-s-border pt-4 space-y-2"
                                        >
                                            {module.videos.map((video, vi) => (
                                                <div key={vi} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-b-surface2 transition-colors">
                                                    {getVideoStatusIcon(video.status)}
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-body-2 truncate ${video.status === 'locked' ? 'text-t-tertiary' : 'text-t-primary'}`}>
                                                            {video.name}
                                                        </p>
                                                    </div>
                                                    <span className="text-caption text-t-tertiary shrink-0">{video.duration}</span>
                                                    <span className={`text-caption font-medium shrink-0 ${video.status === 'completed' ? 'text-primary-02' : 'text-t-tertiary'}`}>
                                                        {getVideoStatusLabel(video.status)}
                                                    </span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default AcademyPage;
