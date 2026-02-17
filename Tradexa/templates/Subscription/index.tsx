"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";

type PlanId = 'free' | 'subscriber' | 'partner';

const SubscriptionPage = () => {
    const { t } = useLanguage();
    const [selectedPlan, setSelectedPlan] = useState<PlanId>('free');
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
        {
            id: 'free' as PlanId,
            name: t.planFreeName,
            price: { monthly: 0, yearly: 0 },
            color: 'text-t-secondary',
            bgColor: 'bg-b-surface2',
            borderColor: 'border-s-border',
            iconBg: 'bg-shade-07/10',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            features: [
                t.planFreeFeature1,
                t.planFreeFeature2,
                t.planFreeFeature3,
                "Historique des signaux passés",
                "Accès communauté Discord",
            ],
            cta: t.planFreeCta,
            current: true,
        },
        {
            id: 'subscriber' as PlanId,
            name: t.planSubscriberName,
            price: { monthly: 89.99, yearly: 69.99 },
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/5',
            borderColor: 'border-blue-500/20',
            iconBg: 'bg-blue-500/10',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3L12 1L18 3L20 9L16 15H8L4 9L6 3Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5"/>
                    <path d="M12 5L14 9L12 15L10 9L12 5Z" fill="#60A5FA"/>
                </svg>
            ),
            features: [
                t.planSubFeature1,
                t.planSubFeature2,
                t.planSubFeature3,
                t.planSubFeature4,
                "Copier les prix en 1 clic",
                "Alertes push en temps réel",
                "Statistiques détaillées",
            ],
            cta: t.planSubCta,
        },
        {
            id: 'partner' as PlanId,
            name: t.planPartnerName,
            price: { monthly: 0, yearly: 0 },
            color: 'text-amber-500',
            bgColor: 'bg-amber-500/5',
            borderColor: 'border-amber-500/20',
            iconBg: 'bg-amber-500/10',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5"/>
                </svg>
            ),
            features: [
                t.planPartnerFeature1,
                t.planPartnerFeature2,
                t.planPartnerFeature3,
                t.planPartnerFeature4,
                "Pas d'abonnement mensuel",
                "Votre dépôt reste le vôtre",
                "Conditions de trading optimisées",
                "Support prioritaire dédié",
            ],
            cta: t.planPartnerCta,
            isBroker: true,
            popular: true,
        },
    ];

    return (
        <Layout title={t.subscription}>
            <div className="max-w-[1200px] mx-auto space-y-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-h2 font-bold text-t-primary mb-3">{t.subscriptionTitle}</h1>
                    <p className="text-body-1 text-t-secondary">{t.subscriptionSubtitle}</p>
                </div>

                {/* Billing toggle */}
                <div className="flex justify-center">
                    <div className="flex items-center bg-b-surface2 rounded-xl p-1 border border-s-border">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`px-6 py-2.5 rounded-lg text-button font-medium transition-all ${
                                billingPeriod === 'monthly'
                                    ? 'bg-b-surface1 text-t-primary shadow-sm'
                                    : 'text-t-secondary hover:text-t-primary'
                            }`}
                        >
                            {t.monthly}
                        </button>
                        <button
                            onClick={() => setBillingPeriod('yearly')}
                            className={`px-6 py-2.5 rounded-lg text-button font-medium transition-all flex items-center gap-2 ${
                                billingPeriod === 'yearly'
                                    ? 'bg-b-surface1 text-t-primary shadow-sm'
                                    : 'text-t-secondary hover:text-t-primary'
                            }`}
                        >
                            {t.yearly}
                            <span className="text-[10px] font-bold bg-primary-02/10 text-primary-02 px-1.5 py-0.5 rounded-full">-22%</span>
                        </button>
                    </div>
                </div>

                {/* Plans grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card
                                className={`!p-0 h-full flex flex-col overflow-hidden transition-all duration-300 border-2 ${
                                    plan.popular ? `${plan.borderColor} shadow-lg` : 'border-transparent dark:border-s-border'
                                }`}
                                title=""
                            >
                                {plan.popular && (
                                    <div className={`${plan.id === 'partner' ? 'bg-amber-500' : 'bg-blue-500'} text-white text-center py-2 text-caption font-bold tracking-wide uppercase`}>
                                        {t.planMostPopular}
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Plan header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-12 h-12 rounded-xl ${plan.iconBg} flex items-center justify-center`}>
                                            {plan.icon}
                                        </div>
                                        <div>
                                            <h3 className={`text-h5 font-bold ${plan.color}`}>{plan.name}</h3>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        {plan.isBroker ? (
                                            <div>
                                                <span className="text-h2 font-bold text-t-primary">{t.planPartnerPriceFree}</span>
                                                <p className="text-caption text-t-secondary mt-1">{t.planPartnerPriceNote}</p>
                                            </div>
                                        ) : plan.price.monthly === 0 ? (
                                            <span className="text-h2 font-bold text-t-primary">{t.planPartnerPriceFree}</span>
                                        ) : (
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-h2 font-bold text-t-primary">
                                                    {billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}€
                                                </span>
                                                <span className="text-body-2 text-t-tertiary">/{t.perMonth}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {plan.features.map((feature, fi) => (
                                            <li key={fi} className="flex items-start gap-3">
                                                <Icon name="check-circle-fill" className={`!size-5 shrink-0 mt-0.5 ${
                                                    plan.id === 'subscriber' ? 'fill-blue-500' :
                                                    plan.id === 'partner' ? 'fill-amber-500' : 'fill-t-tertiary'
                                                }`} />
                                                <span className="text-body-2 text-t-secondary">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <div className="mt-auto">
                                        {plan.current ? (
                                            <Button className="w-full justify-center" isStroke disabled>
                                                {plan.cta}
                                            </Button>
                                        ) : plan.isBroker ? (
                                            <Button className="w-full justify-center" href="/broker" as="link" isStroke>
                                                {plan.cta}
                                            </Button>
                                        ) : (
                                            <Button className="w-full justify-center" isBlack>
                                                {plan.cta}
                                            </Button>
                                        )}
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

export default SubscriptionPage;
