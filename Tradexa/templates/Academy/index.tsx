"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useUserStore } from "@/stores/userStore";
import { setLiveAlertsMuted } from "@/components/LiveAlertStack";

const AcademyPage = () => {
    const { t } = useLanguage();
    const { accountType } = useUserStore();
    const isFree = accountType === 'free';

    const modules = useMemo(() => [
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
    ], [t]);

    const [selectedModuleId, setSelectedModuleId] = useState(2);
    const [selectedVideoIdx, setSelectedVideoIdx] = useState(4);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        setLiveAlertsMuted(muted);
        return () => { setLiveAlertsMuted(false); };
    }, [muted]);

    const selectedModule = modules.find(m => m.id === selectedModuleId) || modules[0];
    const selectedVideo = selectedModule.videos[selectedVideoIdx] || selectedModule.videos[0];
    const totalXP = 450;

    const allVideos = modules.flatMap(m => m.videos.map(v => ({ ...v, moduleTitle: m.title, moduleLocked: m.locked })));

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <Icon name="check-circle-fill" className="!size-4 fill-primary-02" />;
            case 'required': return <div className="w-4 h-4 rounded-full border-2 border-primary-01" />;
            case 'locked': return <Icon name="lock" className="!size-4 fill-t-tertiary" />;
            default: return null;
        }
    };

    return (
        <Layout title={t.academy}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                {/* Free account banner */}
                {isFree && (
                    <div className="relative rounded-2xl border-2 border-amber-500/20 bg-amber-500/5 p-6 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
                                <Icon name="lock" className="!size-7 fill-amber-500" />
                            </div>
                            <h3 className="text-h5 font-bold text-t-primary">Académie réservée aux membres</h3>
                            <p className="text-body-2 text-t-secondary max-w-lg">L&apos;accès complet à l&apos;académie et aux modules de formation est réservé aux comptes Premium et Partenaire. Seuls les modules de base sont accessibles en compte gratuit.</p>
                            <div className="flex gap-3 mt-2">
                                <Button href="/subscription" as="link" isBlack>Voir les offres</Button>
                                <Button href="/broker" as="link" isStroke>Compte broker gratuit</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-h3 font-bold text-t-primary">{t.academyTitle}</h1>
                        <p className="text-body-1 text-t-secondary mt-1">{t.academySubtitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary-01/10 text-primary-01 rounded-lg">
                            <Icon name="book-open" className="!size-5 fill-primary-01" />
                            <span className="font-semibold text-button">{t.levelBeginner}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary-02/10 text-primary-02 rounded-lg">
                            <span className="font-bold text-button">{totalXP} XP</span>
                        </div>
                        <button
                            onClick={() => setMuted(!muted)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-button font-semibold transition-colors ${muted ? 'bg-primary-03/10 text-primary-03' : 'bg-b-surface2 text-t-secondary hover:text-t-primary'}`}
                            title={muted ? t.unmute : t.muteNotifications}
                        >
                            <Icon name={muted ? 'volume-x' : 'volume-2'} className={`!size-5 ${muted ? 'fill-primary-03' : 'fill-t-secondary'}`} />
                            <span className="hidden sm:inline">{muted ? t.unmute : t.muteNotifications}</span>
                        </button>
                    </div>
                </div>

                {/* Video Player + Module Selector Side-by-Side */}
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${isFree ? 'relative' : ''}`}>
                    {isFree && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-b-surface1/40 backdrop-blur-[3px] rounded-2xl">
                            <div className="text-center p-6">
                                <Icon name="lock" className="!size-10 fill-t-tertiary mx-auto mb-3" />
                                <p className="text-h6 font-bold text-t-primary mb-1">Contenu réservé aux membres</p>
                                <p className="text-body-2 text-t-secondary max-w-sm">Passez en Premium ou ouvrez un compte broker partenaire pour accéder aux vidéos de formation.</p>
                            </div>
                        </div>
                    )}
                    {/* Video Player — 2/3 */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="!p-0 overflow-hidden" title="">
                            <div className="aspect-video bg-shade-01 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-shade-01/80" />
                                <button className="relative z-2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                    <Icon name="play" className="!size-8 fill-white ml-1" />
                                </button>
                                <div className="absolute bottom-4 left-5 right-5 z-2">
                                    <p className="text-caption text-white/60">{selectedModule.title}</p>
                                    <p className="text-body-2 font-semibold text-white">{selectedVideo.name}</p>
                                </div>
                            </div>
                        </Card>
                        <div className="flex items-center gap-4 text-caption text-t-secondary">
                            <span className="flex items-center gap-1.5"><Icon name="clock" className="!size-4 fill-t-tertiary" /> {selectedVideo.duration}</span>
                            <span className="flex items-center gap-1.5 text-primary-02 font-semibold">+{selectedVideo.xp} XP</span>
                            {selectedVideo.status === 'completed' && <span className="flex items-center gap-1.5 text-primary-02"><Icon name="check-circle-fill" className="!size-4 fill-primary-02" /> {t.videoCompleted}</span>}
                        </div>
                    </div>

                    {/* Module Selector Sidebar — 1/3 */}
                    <div className="space-y-2 lg:max-h-[520px] lg:overflow-y-auto pr-1">
                        {modules.map((module, mi) => {
                            const isActive = module.id === selectedModuleId;
                            return (
                                <div key={module.id}>
                                    <button
                                        onClick={() => { if (!module.locked) { setSelectedModuleId(module.id); setSelectedVideoIdx(0); } }}
                                        className={`w-full text-left p-4 rounded-xl transition-colors ${isActive ? 'bg-b-surface2 border border-primary-01/30' : module.locked ? 'opacity-50 cursor-not-allowed bg-b-surface1' : 'bg-b-surface1 hover:bg-b-surface2 border border-transparent'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${module.locked ? 'bg-b-surface2' : module.progress === 100 ? 'bg-primary-02/10' : 'bg-primary-01/10'}`}>
                                                {module.locked ? <Icon name="lock" className="!size-4 fill-t-tertiary" /> : module.progress === 100 ? <Icon name="check-circle-fill" className="!size-4 fill-primary-02" /> : <span className="text-caption font-bold text-primary-01">{mi + 1}</span>}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-caption font-semibold text-t-primary truncate">{module.title}</p>
                                                <p className="text-[11px] text-t-tertiary">{module.lessons} {t.lessons} · {module.duration} · +{module.xp} XP</p>
                                            </div>
                                        </div>
                                        {!module.locked && (
                                            <div className="mt-2 h-1 bg-b-surface2 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full bg-primary-02 transition-all" style={{ width: `${module.progress}%` }} />
                                            </div>
                                        )}
                                    </button>

                                    {isActive && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-4 space-y-0.5 mt-1 mb-2">
                                            {module.videos.map((video, vi) => (
                                                <button
                                                    key={vi}
                                                    onClick={() => setSelectedVideoIdx(vi)}
                                                    className={`w-full flex items-center gap-2.5 py-2 px-3 rounded-lg text-left transition-colors ${vi === selectedVideoIdx ? 'bg-primary-01/10' : 'hover:bg-b-surface2'}`}
                                                >
                                                    {getStatusIcon(video.status)}
                                                    <span className={`text-[12px] truncate flex-1 ${vi === selectedVideoIdx ? 'text-primary-01 font-semibold' : video.status === 'locked' ? 'text-t-tertiary' : 'text-t-secondary'}`}>
                                                        {video.name}
                                                    </span>
                                                    <span className="text-[10px] text-t-tertiary shrink-0">{video.duration}</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Video Registry Table */}
                <Card title={t.allVideos || 'Toutes les vidéos'} className="!p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-s-border">
                                    <th className="px-5 py-3 text-caption font-semibold text-t-tertiary">{t.videoName}</th>
                                    <th className="px-5 py-3 text-caption font-semibold text-t-tertiary">{t.module}</th>
                                    <th className="px-5 py-3 text-caption font-semibold text-t-tertiary text-center">{t.videoDuration}</th>
                                    <th className="px-5 py-3 text-caption font-semibold text-t-tertiary text-center">XP</th>
                                    <th className="px-5 py-3 text-caption font-semibold text-t-tertiary text-center">{t.status}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allVideos.map((video, i) => (
                                    <tr key={i} className="border-b border-s-border/50 last:border-0 hover:bg-b-surface2/40 transition-colors">
                                        <td className="px-5 py-3 flex items-center gap-2.5">
                                            {getStatusIcon(video.status)}
                                            <span className={`text-body-2 ${video.status === 'locked' ? 'text-t-tertiary' : 'text-t-primary'}`}>{video.name}</span>
                                        </td>
                                        <td className="px-5 py-3 text-caption text-t-secondary">{video.moduleTitle}</td>
                                        <td className="px-5 py-3 text-caption text-t-secondary text-center">{video.duration}</td>
                                        <td className="px-5 py-3 text-center">
                                            <span className="text-caption font-semibold text-primary-02">+{video.xp}</span>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <span className={`inline-flex text-[11px] font-medium px-2 py-0.5 rounded-md ${
                                                video.status === 'completed' ? 'text-primary-02 bg-primary-02/10' :
                                                video.status === 'required' ? 'text-primary-01 bg-primary-01/10' :
                                                'text-t-tertiary bg-b-surface2'
                                            }`}>
                                                {video.status === 'completed' ? (t.videoCompleted || 'Terminé') :
                                                 video.status === 'required' ? (t.videoRequired || 'À faire') :
                                                 (t.videoLocked || 'Verrouillé')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default AcademyPage;
