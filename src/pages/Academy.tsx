import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, Lock, CheckCircle, GraduationCap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useLanguage } from '../components/ui/LanguageSwitcher';

const modules = [
  {
    id: 1,
    title: { fr: 'Introduction au Trading', en: 'Introduction to Trading' },
    desc: { fr: 'Les bases fondamentales pour bien débuter.', en: 'Fundamental bases to start well.' },
    duration: '45 min',
    lessons: 5,
    progress: 100,
    locked: false,
  },
  {
    id: 2,
    title: { fr: 'Analyse Technique', en: 'Technical Analysis' },
    desc: { fr: 'Maîtriser les graphiques et indicateurs.', en: 'Master charts and indicators.' },
    duration: '2h 30min',
    lessons: 12,
    progress: 35,
    locked: false,
  },
  {
    id: 3,
    title: { fr: 'Psychologie du Trader', en: 'Trader Psychology' },
    desc: { fr: 'Gérer ses émotions et son mindset.', en: 'Manage emotions and mindset.' },
    duration: '1h 15min',
    lessons: 8,
    progress: 0,
    locked: true,
  },
  {
    id: 4,
    title: { fr: 'Stratégies Avancées', en: 'Advanced Strategies' },
    desc: { fr: 'Techniques pour traders expérimentés.', en: 'Techniques for experienced traders.' },
    duration: '3h 45min',
    lessons: 15,
    progress: 0,
    locked: true,
  },
];

export default function Academy() {
  const { language } = useLanguage();
  const lang = language as 'fr' | 'en';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'fr' ? 'Académie de Trading' : 'Trading Academy'}
          </h1>
          <p className="text-slate-500 mt-1">
            {language === 'fr' 
              ? 'Apprenez à trader avec nos cours structurés' 
              : 'Learn to trade with our structured courses'}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
          <GraduationCap className="w-5 h-5" />
          <span className="font-semibold text-sm">
            {language === 'fr' ? 'Niveau: Débutant' : 'Level: Beginner'}
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
            <Card className={`p-0 h-full flex flex-col overflow-hidden group ${module.locked ? 'opacity-75' : 'hover:ring-2 hover:ring-indigo-500 transition-all'}`}>
              <div className="h-40 bg-slate-900 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {module.locked ? (
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-slate-400" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                {module.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                    <div 
                      className="h-full bg-emerald-500" 
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-slate-900 line-clamp-1">{module.title[lang]}</h3>
                  {module.progress === 100 && (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  )}
                </div>
                
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{module.desc[lang]}</p>
                
                <div className="mt-auto flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {module.lessons} {language === 'fr' ? 'leçons' : 'lessons'}
                  </span>
                  <span>{module.duration}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
