"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    ChevronDown,
    ChevronRight,
    Menu,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
    X,
} from "lucide-react";

const navItems = [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#solution", label: "Solution" },
    { href: "#pricing", label: "Tarifs" },
    { href: "#faq", label: "FAQ" },
];

const stats = [
    { value: "3 200+", label: "Traders actifs" },
    { value: "78%", label: "Taux de réussite moyen" },
    { value: "24/7", label: "Signaux & alertes" },
    { value: "12", label: "Marchés couverts" },
];

const features = [
    {
        title: "Signaux IA en temps réel",
        description:
            "Des alertes prêtes à exécuter, construites sur des scénarios multi-timeframes.",
        icon: Sparkles,
    },
    {
        title: "Gestion du risque guidée",
        description:
            "Chaque signal inclut des zones d'entrée, invalidation et objectifs progressifs.",
        icon: ShieldCheck,
    },
    {
        title: "Communauté de performance",
        description:
            "Analyse collective, débrief quotidien et revue des exécutions pour progresser vite.",
        icon: Users,
    },
    {
        title: "Tracking transparent",
        description:
            "Historique public des performances et métriques claires pour chaque stratégie.",
        icon: TrendingUp,
    },
];

const plans = [
    {
        name: "Starter",
        price: "0€",
        description: "Découvrir l'écosystème SamySignaux",
        bullets: ["Signaux quotidiens limités", "Accès communauté", "1 débrief / semaine"],
        cta: "Commencer",
        featured: false,
    },
    {
        name: "Pro Trader",
        price: "49€",
        description: "Pour les traders qui veulent scaler",
        bullets: [
            "Signaux premium multi-actifs",
            "Plan d'exécution détaillé",
            "Room privée & coaching de groupe",
        ],
        cta: "Passer Pro",
        featured: true,
    },
    {
        name: "Mentorat Elite",
        price: "149€",
        description: "Accompagnement 1:1 et stratégie personnalisée",
        bullets: ["Sessions individuelles", "Risk plan sur mesure", "Suivi avancé des performances"],
        cta: "Réserver un appel",
        featured: false,
    },
];

const faqs = [
    {
        q: "Est-ce que SamySignaux prend la main sur mon capital ?",
        a: "Non. Vous gardez le contrôle total. Nous envoyons uniquement des plans d'exécution, sans accès à vos fonds.",
    },
    {
        q: "Quels marchés sont couverts ?",
        a: "Principalement Forex, crypto, indices et métaux, avec une rotation selon la volatilité et la liquidité.",
    },
    {
        q: "Puis-je commencer sans expérience ?",
        a: "Oui. Le parcours Starter et les débriefs hebdomadaires sont conçus pour les débutants motivés.",
    },
    {
        q: "Comment est calculé le taux de réussite ?",
        a: "Il est basé sur l'historique des signaux clôturés, publié avec règles d'entrée/sortie identiques pour tous.",
    },
];

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-b-surface1 text-t-primary">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-[32rem] w-[32rem] rounded-full bg-[#7F5FFF]/15 blur-3xl" />
                <div className="absolute bottom-[-8rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[#00A656]/15 blur-3xl" />
            </div>

            <header className="sticky top-0 z-40 border-b border-s-subtle/80 bg-b-surface1/85 backdrop-blur-xl">
                <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#7F5FFF] to-[#2A85FF] text-white">
                            <Sparkles className="h-4 w-4" />
                        </span>
                        <span className="text-lg font-semibold tracking-tight">SamySignaux</span>
                    </Link>

                    <nav className="hidden items-center gap-7 md:flex">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-t-secondary transition-colors hover:text-t-primary"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link
                            href="/login"
                            className="rounded-xl border border-s-subtle px-4 py-2 text-sm font-medium hover:border-s-highlight"
                        >
                            Se connecter
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-xl bg-b-dark1 px-4 py-2 text-sm font-semibold text-t-light transition-all hover:translate-y-[-1px]"
                        >
                            Rejoindre
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <button
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-s-subtle md:hidden"
                        onClick={() => setMobileMenuOpen((prev: boolean) => !prev)}
                        aria-label="Ouvrir le menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="border-t border-s-subtle bg-b-surface1 px-6 py-4 md:hidden">
                        <div className="flex flex-col gap-3">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-lg px-2 py-2 text-sm font-medium text-t-secondary hover:bg-b-surface2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <Link
                                    href="/login"
                                    className="rounded-lg border border-s-subtle px-3 py-2 text-center text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-lg bg-b-dark1 px-3 py-2 text-center text-sm font-semibold text-t-light"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main>
                <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-14 lg:grid-cols-2 lg:items-center lg:pt-20">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#7F5FFF]/30 bg-[#7F5FFF]/10 px-3 py-1 text-xs font-semibold text-[#7F5FFF]">
                            <span className="h-2 w-2 rounded-full bg-[#00A656]" />
                            Nouvelle landing 2026
                        </span>
                        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                            Pilote tes trades avec une
                            <span className="bg-gradient-to-r from-[#2A85FF] to-[#7F5FFF] bg-clip-text text-transparent">
                                {" "}
                                vision claire
                            </span>
                        </h1>
                        <p className="mt-6 max-w-xl text-base text-t-secondary md:text-lg">
                            SamySignaux fusionne signaux, exécution et mentorat dans une même
                            expérience. Moins d'hésitation, plus de discipline, de meilleurs résultats.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-b-dark1 px-5 py-3 text-sm font-semibold text-t-light"
                            >
                                Créer un compte
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                            <a
                                href="#solution"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-s-subtle px-5 py-3 text-sm font-semibold"
                            >
                                Voir la démo
                            </a>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
                            {stats.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-s-subtle bg-b-surface2 p-3">
                                    <p className="text-lg font-semibold">{item.value}</p>
                                    <p className="text-xs text-t-secondary">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -left-5 top-6 h-24 w-24 rounded-full bg-[#2A85FF]/25 blur-2xl" />
                        <div className="absolute -right-6 bottom-8 h-24 w-24 rounded-full bg-[#7F5FFF]/25 blur-2xl" />

                        <div className="relative rounded-[28px] border border-s-subtle bg-gradient-to-b from-b-surface2 to-b-surface1 p-4 shadow-depth">
                            <Image
                                src="/images/all-img/v1/card01.png"
                                alt="Dashboard preview"
                                width={960}
                                height={640}
                                className="h-auto w-full rounded-2xl border border-s-subtle"
                                priority
                            />
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <Image
                                    src="/images/all-img/v1/card02.png"
                                    alt="Signal card"
                                    width={520}
                                    height={320}
                                    className="h-auto w-full rounded-xl border border-s-subtle"
                                />
                                <Image
                                    src="/images/all-img/v1/card04.png"
                                    alt="Performance card"
                                    width={520}
                                    height={320}
                                    className="h-auto w-full rounded-xl border border-s-subtle"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-t-secondary">Our Feature</p>
                        <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Architecture pensée pour les traders sérieux</h2>
                    </div>
                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {features.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article
                                    key={item.title}
                                    className="rounded-3xl border border-s-subtle bg-b-surface2 p-6 transition-all hover:-translate-y-1 hover:border-s-highlight"
                                >
                                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-b-surface1">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                    <p className="mt-2 text-sm text-t-secondary">{item.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section id="solution" className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
                    <div className="rounded-3xl border border-s-subtle bg-b-surface2 p-6">
                        <Image
                            src="/images/all-img/v1/hero-bg.png"
                            alt="Solution trading"
                            width={1200}
                            height={800}
                            className="h-auto w-full rounded-2xl"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-t-secondary">Our Solution</p>
                        <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Une stack complète, de l'idée à l'exécution</h2>
                        <p className="mt-4 text-base text-t-secondary">
                            Inspirée de la structure Teaser, cette nouvelle landing se concentre sur la
                            preuve de valeur, la lisibilité du parcours utilisateur et la conversion.
                        </p>
                        <ul className="mt-6 space-y-3">
                            {[
                                "Pipeline simple : découvrir → tester → convertir",
                                "Sections orientées bénéfices et confiance",
                                "Design responsive et optimisé pour mobile",
                            ].map((line) => (
                                <li key={line} className="flex items-start gap-2 text-sm text-t-secondary">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00A656]" />
                                    {line}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/dashboard"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-b-dark1 px-5 py-3 text-sm font-semibold text-t-light"
                        >
                            Voir le dashboard
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-t-secondary">Our Pricing</p>
                        <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Choisis ton rythme de progression</h2>
                    </div>
                    <div className="mt-10 grid gap-4 lg:grid-cols-3">
                        {plans.map((plan) => (
                            <article
                                key={plan.name}
                                className={`rounded-3xl border p-6 ${
                                    plan.featured
                                        ? "border-[#2A85FF]/40 bg-[#2A85FF]/5"
                                        : "border-s-subtle bg-b-surface2"
                                }`}
                            >
                                {plan.featured && (
                                    <span className="mb-4 inline-block rounded-full bg-[#2A85FF] px-2.5 py-1 text-xs font-semibold text-white">
                                        Recommandé
                                    </span>
                                )}
                                <h3 className="text-xl font-semibold">{plan.name}</h3>
                                <p className="mt-1 text-sm text-t-secondary">{plan.description}</p>
                                <p className="mt-5 text-4xl font-semibold">{plan.price}</p>
                                <ul className="mt-5 space-y-2">
                                    {plan.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-start gap-2 text-sm text-t-secondary">
                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00A656]" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-6 w-full rounded-xl bg-b-dark1 px-4 py-3 text-sm font-semibold text-t-light">
                                    {plan.cta}
                                </button>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="faq" className="mx-auto w-full max-w-4xl px-6 py-16">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-t-secondary">Knowledge Base</p>
                        <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Questions fréquentes</h2>
                    </div>
                    <div className="mt-10 space-y-3">
                        {faqs.map((item, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <article key={item.q} className="rounded-2xl border border-s-subtle bg-b-surface2">
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                                    >
                                        <span className="font-medium">{item.q}</span>
                                        <ChevronDown
                                            className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {isOpen && <p className="px-5 pb-5 text-sm text-t-secondary">{item.a}</p>}
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>

            <footer className="mx-auto w-full max-w-6xl px-6 pb-10 pt-6">
                <div className="rounded-3xl border border-s-subtle bg-b-surface2 p-6 md:flex md:items-center md:justify-between">
                    <div>
                        <p className="text-sm text-t-secondary">SamySignaux 2.0</p>
                        <p className="mt-1 text-lg font-semibold">Trade mieux, avec méthode.</p>
                    </div>
                    <div className="mt-4 flex items-center gap-4 md:mt-0">
                        <Link href="/login" className="text-sm text-t-secondary hover:text-t-primary">
                            Login
                        </Link>
                        <Link href="/register" className="text-sm text-t-secondary hover:text-t-primary">
                            Register
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
