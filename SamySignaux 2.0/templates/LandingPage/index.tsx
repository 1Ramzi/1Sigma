"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import { stats } from "@/mocks/stats";

const features = [
    { icon: "zap", color: "bg-primary-01/10 text-primary-01" },
    { icon: "bar-chart-3", color: "bg-secondary-01/10 text-secondary-01" },
    { icon: "shield", color: "bg-secondary-02/10 text-secondary-02" },
    { icon: "users-2", color: "bg-secondary-04/10 text-secondary-04" },
];

const testimonials = [
    { name: 'Lucas M.', role: 'Trader Crypto', rating: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas' },
    { name: 'Sophie D.', role: 'Trader Forex', rating: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sophied' },
    { name: 'Thomas R.', role: 'Investisseur', rating: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thomasr' },
];

const LandingPage = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'fr' ? 'en' : 'fr');
    };

    const featureTexts = language === 'fr' ? [
        { title: 'Signaux IA en temps réel', desc: 'Recevez des signaux de trading précis alimentés par notre intelligence artificielle avancée.' },
        { title: 'Taux de réussite de 78%+', desc: 'Nos signaux affichent un taux de réussite supérieur à 78% sur les 12 derniers mois.' },
        { title: 'Sécurité maximale', desc: 'Vos fonds restent sur votre broker. Nous n\'avons jamais accès à votre argent.' },
        { title: 'Communauté active', desc: 'Rejoignez +3000 traders qui partagent analyses, stratégies et résultats.' },
    ] : [
        { title: 'Real-time AI Signals', desc: 'Receive precise trading signals powered by our advanced artificial intelligence.' },
        { title: '78%+ Win Rate', desc: 'Our signals show a win rate above 78% over the last 12 months.' },
        { title: 'Maximum Security', desc: 'Your funds stay on your broker. We never have access to your money.' },
        { title: 'Active Community', desc: 'Join 3000+ traders sharing analyses, strategies and results.' },
    ];

    const testimonialTexts = language === 'fr' ? [
        'Les signaux sont incroyablement précis. J\'ai doublé mon compte en 3 mois.',
        'La communauté est top, on apprend vraiment beaucoup. Les alertes flash sont un game changer.',
        'Interface propre, signaux fiables. Exactement ce que je cherchais pour du copy trading.',
    ] : [
        'The signals are incredibly accurate. I doubled my account in 3 months.',
        'The community is great, you really learn a lot. Flash alerts are a game changer.',
        'Clean interface, reliable signals. Exactly what I was looking for in copy trading.',
    ];

    return (
        <div className="min-h-screen bg-b-surface1 text-t-primary">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-b-surface1/80 backdrop-blur-lg border-b border-s-stroke2">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary-01 flex items-center justify-center">
                            <Icon name="zap" className="w-4 h-4 fill-white" />
                        </div>
                        <span className="font-bold text-lg text-t-primary">SamySignaux</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-t-secondary hover:text-t-primary transition-colors">
                            {language === 'fr' ? 'Fonctionnalités' : 'Features'}
                        </a>
                        <a href="#stats" className="text-sm font-medium text-t-secondary hover:text-t-primary transition-colors">
                            {language === 'fr' ? 'Résultats' : 'Results'}
                        </a>
                        <a href="#testimonials" className="text-sm font-medium text-t-secondary hover:text-t-primary transition-colors">
                            {language === 'fr' ? 'Avis' : 'Reviews'}
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={toggleLanguage} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-t-secondary hover:bg-b-surface2 transition-colors">
                            <Icon name="globe" className="w-4 h-4 fill-current" />
                            <span>{language.toUpperCase()}</span>
                        </button>
                        <Link href="/login" className="text-sm font-medium text-t-primary hover:text-primary-01 transition-colors">
                            {language === 'fr' ? 'Se connecter' : 'Sign In'}
                        </Link>
                        <Link href="/register" className="text-sm font-medium bg-primary-01 text-white px-4 py-2 rounded-lg hover:bg-primary-02 transition-colors">
                            {language === 'fr' ? "S'inscrire" : 'Sign Up'}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary-01/5 via-secondary-01/5 to-b-surface1" />
                <div className="absolute top-20 left-10 w-96 h-96 bg-primary-01/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-01/5 rounded-full blur-3xl" />

                <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-primary-01/10 border border-primary-01/20 rounded-full px-4 py-1.5 mb-6">
                            <span className="w-2 h-2 bg-secondary-01 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-primary-01">
                                {language === 'fr' ? 'Signaux en direct maintenant' : 'Live signals now'}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-t-primary leading-tight tracking-tight">
                            {language === 'fr' ? (
                                <>Tradez avec les <span className="text-primary-01">meilleurs signaux</span> du marché</>
                            ) : (
                                <>Trade with the <span className="text-primary-01">best signals</span> on the market</>
                            )}
                        </h1>

                        <p className="mt-6 text-lg text-t-secondary max-w-2xl mx-auto leading-relaxed">
                            {language === 'fr'
                                ? 'Recevez des signaux de trading en temps réel, alimentés par l\'IA. Rejoignez une communauté de traders qui gagnent ensemble.'
                                : 'Receive real-time trading signals, powered by AI. Join a community of traders winning together.'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                            <Link href="/register" className="flex items-center gap-2 bg-primary-01 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-primary-02 transition-colors shadow-lg shadow-primary-01/25">
                                {language === 'fr' ? 'S\'inscrire maintenant' : 'Sign up now'}
                                <Icon name="arrow-right" className="w-5 h-5 fill-current" />
                            </Link>
                            <a href="#features" className="flex items-center gap-2 text-t-primary font-medium hover:text-primary-01 transition-colors">
                                {language === 'fr' ? 'Découvrir les fonctionnalités' : 'Discover features'}
                                <Icon name="chevron-right" className="w-4 h-4 fill-current" />
                            </a>
                        </div>
                    </div>

                    {/* Hero Video */}
                    <div className="mt-16 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-b-surface1/50 max-w-4xl mx-auto aspect-video bg-shade-01">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                <Icon name="play-circle" className="w-8 h-8 fill-white" />
                            </div>
                        </div>
                        {/* Placeholder for video/image */}
                        <div className="w-full h-full bg-shade-02 opacity-60"></div> 
                        <div className="absolute bottom-6 left-6 text-white text-left">
                            <p className="font-bold text-lg">{language === 'fr' ? 'Démo de la plateforme' : 'Platform Demo'}</p>
                            <p className="text-sm text-white/80">{language === 'fr' ? 'Regardez comment suivre nos signaux' : 'Watch how to follow our signals'}</p>
                        </div>
                    </div>

                    {/* Preview Cards */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        <div className="bg-b-surface1 rounded-xl shadow-lg border border-s-stroke2 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold text-t-tertiary uppercase tracking-wider">BTC/USD</span>
                                <span className="px-2 py-0.5 bg-secondary-01/10 text-secondary-01 text-xs font-bold rounded-full">BUY</span>
                            </div>
                            <p className="text-2xl font-bold text-t-primary font-mono">$43,324</p>
                            <p className="text-sm text-secondary-01 font-medium mt-1">+6.35% ↗</p>
                            <div className="mt-3 flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-s-stroke1 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-01 rounded-full" style={{ width: '87%' }} />
                                </div>
                                <span className="text-xs font-bold text-primary-01">87%</span>
                            </div>
                            <p className="text-[10px] text-t-tertiary mt-1">{language === 'fr' ? 'Confiance IA' : 'AI Confidence'}</p>
                        </div>

                        <div className="bg-b-surface1 rounded-xl shadow-lg border border-s-stroke2 p-5">
                            <p className="text-xs font-semibold text-t-tertiary uppercase tracking-wider mb-2">
                                {language === 'fr' ? 'Performance' : 'Performance'}
                            </p>
                            <p className="text-3xl font-extrabold text-secondary-01 font-mono">+78.5%</p>
                            <p className="text-sm text-t-secondary mt-1">{language === 'fr' ? 'Taux de réussite' : 'Win Rate'}</p>
                            <div className="mt-3 h-12 flex items-end gap-0.5">
                                {[40, 55, 35, 65, 50, 75, 60, 80, 70, 85, 75, 90].map((h, i) => (
                                    <div key={i} className="flex-1 bg-secondary-01/20 rounded-t-sm" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>

                        <div className="bg-b-surface1 rounded-xl shadow-lg border border-s-stroke2 p-5">
                            <p className="text-xs font-semibold text-t-tertiary uppercase tracking-wider mb-2">
                                {language === 'fr' ? 'Communauté' : 'Community'}
                            </p>
                            <p className="text-3xl font-extrabold text-t-primary">{stats.members.toLocaleString()}+</p>
                            <p className="text-sm text-t-secondary mt-1">{language === 'fr' ? 'Traders actifs' : 'Active traders'}</p>
                            <div className="flex -space-x-2 mt-3">
                                {['samy', 'marie', 'luc', 'sophie', 'thomas'].map((s, i) => (
                                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`} alt="" className="w-8 h-8 rounded-full border-2 border-b-surface1" />
                                ))}
                                <div className="w-8 h-8 rounded-full bg-primary-01/10 border-2 border-b-surface1 flex items-center justify-center text-[10px] font-bold text-primary-01">+3k</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section id="stats" className="bg-shade-01 py-12">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: `${stats.totalSignals}+`, label: language === 'fr' ? 'Signaux envoyés' : 'Signals sent' },
                        { value: `${stats.winRate}%`, label: language === 'fr' ? 'Taux de réussite' : 'Win Rate' },
                        { value: `${stats.members}+`, label: language === 'fr' ? 'Membres actifs' : 'Active members' },
                        { value: `+${stats.avgProfit}%`, label: language === 'fr' ? 'Profit moyen/mois' : 'Avg profit/month' },
                    ].map((s, i) => (
                        <div key={i}>
                            <p className="text-3xl md:text-4xl font-extrabold text-white">{s.value}</p>
                            <p className="text-sm text-shade-03 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 bg-b-surface1">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-t-primary">
                            {language === 'fr' ? 'Tout ce dont vous avez besoin' : 'Everything you need'}
                        </h2>
                        <p className="text-t-secondary mt-3 max-w-xl mx-auto">
                            {language === 'fr'
                                ? 'Une plateforme complète pour trader avec confiance et intelligence.'
                                : 'A complete platform to trade with confidence and intelligence.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featureTexts.map((f, i) => {
                            return (
                                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-s-stroke2 hover:border-primary-01/20 hover:bg-primary-01/5 transition-all">
                                    <div className={`w-12 h-12 rounded-xl ${features[i].color} flex items-center justify-center flex-shrink-0`}>
                                        <Icon name={features[i].icon} className="w-6 h-6 fill-current" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-t-primary text-lg">{f.title}</h3>
                                        <p className="text-t-secondary mt-1 text-sm leading-relaxed">{f.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 bg-b-surface2">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-t-primary">
                            {language === 'fr' ? 'Comment ça marche ?' : 'How does it work?'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(language === 'fr' ? [
                            { step: '01', title: 'Créez votre compte', desc: 'Inscription gratuite en 30 secondes. Aucune carte bancaire requise.' },
                            { step: '02', title: 'Connectez votre broker', desc: 'Liez votre compte PuPrime pour exécuter les signaux automatiquement.' },
                            { step: '03', title: 'Recevez les signaux', desc: 'Recevez des alertes flash et suivez les signaux en temps réel.' },
                        ] : [
                            { step: '01', title: 'Create your account', desc: 'Free signup in 30 seconds. No credit card required.' },
                            { step: '02', title: 'Connect your broker', desc: 'Link your PuPrime account to execute signals automatically.' },
                            { step: '03', title: 'Receive signals', desc: 'Get flash alerts and follow signals in real time.' },
                        ]).map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-01 flex items-center justify-center mb-4">
                                    <span className="text-xl font-bold text-white">{item.step}</span>
                                </div>
                                <h3 className="font-semibold text-t-primary text-lg">{item.title}</h3>
                                <p className="text-t-secondary mt-2 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-b-surface1">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-t-primary">
                            {language === 'fr' ? 'Ce que disent nos traders' : 'What our traders say'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((person, i) => (
                            <div key={i} className="bg-b-surface1 border border-s-stroke2 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: person.rating }).map((_, j) => (
                                        <Icon key={j} name="star-fill" className="w-4 h-4 fill-secondary-02" />
                                    ))}
                                </div>
                                <p className="text-t-secondary text-sm leading-relaxed mb-4">"{testimonialTexts[i]}"</p>
                                <div className="flex items-center gap-3 pt-3 border-t border-s-stroke1">
                                    <img src={person.avatar} alt="" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="text-sm font-semibold text-t-primary">{person.name}</p>
                                        <p className="text-xs text-t-tertiary">{person.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-linear-to-br from-primary-01 to-primary-02">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                        {language === 'fr' ? 'Prêt à trader comme un pro ?' : 'Ready to trade like a pro?'}
                    </h2>
                    <p className="text-white/80 mt-4 text-lg">
                        {language === 'fr'
                            ? 'Rejoignez des milliers de traders et commencez à recevoir des signaux dès maintenant.'
                            : 'Join thousands of traders and start receiving signals now.'}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link href="/register" className="flex items-center gap-2 bg-white text-primary-01 px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/90 transition-colors">
                            {language === 'fr' ? 'Créer un compte gratuit' : 'Create free account'}
                            <Icon name="arrow-right" className="w-5 h-5 fill-current" />
                        </Link>
                        <Link href="/login" className="text-white/80 font-medium hover:text-white transition-colors">
                            {language === 'fr' ? 'Déjà membre ? Se connecter' : 'Already a member? Sign in'}
                        </Link>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/70">
                        <span className="flex items-center gap-1.5"><Icon name="check-circle" className="w-4 h-4 fill-current" /> {language === 'fr' ? 'Gratuit' : 'Free'}</span>
                        <span className="flex items-center gap-1.5"><Icon name="check-circle" className="w-4 h-4 fill-current" /> {language === 'fr' ? 'Sans engagement' : 'No commitment'}</span>
                        <span className="flex items-center gap-1.5"><Icon name="check-circle" className="w-4 h-4 fill-current" /> {language === 'fr' ? 'Signaux IA' : 'AI Signals'}</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-shade-01 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-primary-01 flex items-center justify-center">
                                <Icon name="zap" className="w-3.5 h-3.5 fill-white" />
                            </div>
                            <span className="font-bold text-white">SamySignaux</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-shade-03">
                            <a href="#features" className="hover:text-white transition-colors">{language === 'fr' ? 'Fonctionnalités' : 'Features'}</a>
                            <a href="#stats" className="hover:text-white transition-colors">{language === 'fr' ? 'Résultats' : 'Results'}</a>
                            <a href="#testimonials" className="hover:text-white transition-colors">{language === 'fr' ? 'Avis' : 'Reviews'}</a>
                            <Link href="/login" className="hover:text-white transition-colors">
                                {language === 'fr' ? 'Se connecter' : 'Sign in'}
                            </Link>
                        </div>
                    </div>
                    <div className="border-t border-shade-02 mt-8 pt-8 text-center text-xs text-shade-03">
                        © 2026 SamySignaux. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
