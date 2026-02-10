"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";

const AcademyPage = () => {
    const { t } = useLanguage();

    const modules = [
      {
        id: 1,
        title: t.introTrading,
        desc: t.introTradingDesc,
        duration: '45 min',
        lessons: 5,
        progress: 100,
        locked: false,
      },
      {
        id: 2,
        title: t.techAnalysis,
        desc: t.techAnalysisDesc,
        duration: '2h 30min',
        lessons: 12,
        progress: 35,
        locked: false,
      },
      {
        id: 3,
        title: t.traderPsychology,
        desc: t.traderPsychologyDesc,
        duration: '1h 15min',
        lessons: 8,
        progress: 0,
        locked: true,
      },
      {
        id: 4,
        title: t.advancedStrategies,
        desc: t.advancedStrategiesDesc,
        duration: '3h 45min',
        lessons: 15,
        progress: 0,
        locked: true,
      },
    ];

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
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary-01/10 text-primary-01 rounded-lg">
                        <Icon name="graduation-cap" className="!size-5 fill-primary-01" />
                        <span className="font-semibold text-button">
                            {t.levelBeginner}
                        </span>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    
                                    <p className="text-body-2 text-t-secondary mb-4 line-clamp-2">{module.desc}</p>
                                    
                                    <div className="mt-auto flex items-center justify-between text-caption text-t-tertiary font-medium">
                                        <span className="flex items-center gap-1">
                                            <Icon name="book-open" className="!size-3.5 fill-t-tertiary" />
                                            {module.lessons} {t.lessons}
                                        </span>
                                        <span>{module.duration}</span>
                                    </div>
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
