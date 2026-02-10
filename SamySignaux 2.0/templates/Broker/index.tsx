"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import Badge from "@/components/Badge";
import { useLanguage } from "@/context/LanguageContext";
import { useUserStore } from "@/stores/userStore";
import Faq from "./Faq";

const AXI_URL = 'https://www.axi.com/';

const BrokerPage = () => {
    const { t } = useLanguage();
    const { user } = useUserStore();
    const [brokerId, setBrokerId] = useState('');
    const [depositConfirmed, setDepositConfirmed] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleConnect = async () => {
        if (!brokerId) return;
        if (!depositConfirmed) return;
        
        setConnecting(true);
        await new Promise(r => setTimeout(r, 1500));
        setConnecting(false);
        setSubmitted(true);
    };

    const getStatusBadge = () => {
        const role = user?.role || 'member';
        let color: "gray" | "green" | "blue" | "yellow" | "red" = "gray";
        let label = t.statusFree;

        if (role === 'vip' || role === 'trader' || role === 'admin') {
             color = "green";
             label = t.statusPartner;
        }
        
        if (submitted) {
             color = "blue";
             label = t.statusLinked;
        }

        return <Badge color={color}>{label}</Badge>;
    };

    return (
        <Layout title={t.broker}>
            <div className="max-w-[1200px] mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-h3 font-bold text-t-primary">{t.brokerHeroTitle}</h1>
                        <p className="text-body-1 text-t-secondary mt-2 max-w-2xl">{t.brokerHeroDesc}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-b-surface1 p-3 rounded-2xl border border-s-border">
                        <span className="text-body-2 font-medium text-t-secondary">{t.accountStatus}:</span>
                        {getStatusBadge()}
                    </div>
                </div>

                {/* 3 Key Points */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card title="" className="!p-5 border border-transparent dark:border-s-border">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-02/10 flex items-center justify-center shrink-0">
                                <Icon name="check-circle" className="!size-5 fill-primary-02" />
                            </div>
                            <div>
                                <h4 className="text-h6 font-bold text-t-primary mb-1">{t.brokerYouTrade}</h4>
                                <p className="text-body-2 text-t-secondary">{t.brokerYouTradeDesc}</p>
                            </div>
                        </div>
                    </Card>
                    <Card title="" className="!p-5 border border-transparent dark:border-s-border">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-04/10 flex items-center justify-center shrink-0">
                                <Icon name="chart" className="!size-5 fill-primary-04" />
                            </div>
                            <div>
                                <h4 className="text-h6 font-bold text-t-primary mb-1">{t.brokerPriceReference}</h4>
                                <p className="text-body-2 text-t-secondary">{t.brokerPriceReferenceDesc}</p>
                            </div>
                        </div>
                    </Card>
                    <Card title="" className="!p-5 border border-transparent dark:border-s-border">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary-04/10 flex items-center justify-center shrink-0">
                                <Icon name="lock" className="!size-5 fill-secondary-04" />
                            </div>
                            <div>
                                <h4 className="text-h6 font-bold text-t-primary mb-1">{t.security}</h4>
                                <p className="text-body-2 text-t-secondary">{t.securityDesc}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Partner Broker + Account Link */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Why this broker */}
                        <Card title={t.transparencyTitle} className="!p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary-01/10 flex items-center justify-center shrink-0">
                                    <Icon name="info-circle" className="!size-5 fill-primary-01" />
                                </div>
                                <p className="text-body-1 text-t-secondary leading-relaxed">
                                    {t.transparencyDesc}
                                </p>
                            </div>
                        </Card>

                        {/* Open account / link form */}
                        <Card className="w-full !p-8" title="">
                            {submitted ? (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-primary-02/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Icon name="check-circle-fill" className="!size-10 fill-primary-02" />
                                    </div>
                                    <h2 className="text-h3 font-bold text-t-primary mb-3">{t.requestReceived}</h2>
                                    <p className="text-body-1 text-t-secondary max-w-md mx-auto">
                                        {t.requestReceivedDesc}
                                    </p>
                                </div>
                            ) : !showForm ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-white dark:bg-shade-02 flex items-center justify-center shadow-sm border border-s-border">
                                            <span className="font-bold text-h5 text-primary-04">AXI</span>
                                        </div>
                                        <div>
                                            <h3 className="text-h5 font-bold text-t-primary">{t.brokerPartnerAdvantage}</h3>
                                            <p className="text-body-2 text-t-secondary">{t.brokerPartnerAdvantageDesc}</p>
                                        </div>
                                    </div>
                                    
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                            <Icon name="check" className="!size-4 fill-primary-02" />
                                            {t.faqBroker1A}
                                        </li>
                                        <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                            <Icon name="check" className="!size-4 fill-primary-02" />
                                            {t.faqBroker2A}
                                        </li>
                                        <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                            <Icon name="check" className="!size-4 fill-primary-02" />
                                            {t.faqBroker3A}
                                        </li>
                                    </ul>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <Button href={AXI_URL} as="a" target="_blank" isBlack>
                                            {t.openAccount}
                                        </Button>
                                        <Button onClick={() => setShowForm(true)} isStroke>
                                            {t.validateRegistration}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <h4 className="text-h5 font-bold text-t-primary">{t.validateRegistration}</h4>
                                    <Field
                                        label={t.axiAccountId}
                                        placeholder={t.brokerIdPlaceholder}
                                        value={brokerId}
                                        onChange={(e) => setBrokerId(e.target.value)}
                                    />
                                    <Checkbox 
                                        label={t.deposit300Confirmed}
                                        checked={depositConfirmed}
                                        onChange={setDepositConfirmed}
                                    />
                                    <div className="flex gap-4 pt-2">
                                        <Button 
                                            onClick={handleConnect} 
                                            disabled={!brokerId || !depositConfirmed || connecting}
                                            isBlack
                                        >
                                            {connecting ? t.verifying : t.validateAccount}
                                        </Button>
                                        <button onClick={() => setShowForm(false)} className="text-caption text-t-secondary hover:underline">{t.back}</button>
                                    </div>
                                </motion.div>
                            )}
                        </Card>
                    </div>

                    {/* Right Column - Quick Info */}
                    <div className="space-y-6">
                        <div className="bg-b-surface1 rounded-2xl p-6 border border-s-border">
                            <h3 className="text-h6 font-bold text-t-primary mb-4">{t.whyBroker}</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <Icon name="check-circle" className="!size-5 fill-secondary-04 shrink-0" />
                                    <span className="text-body-2 text-t-secondary">{t.faqBroker1A}</span>
                                </li>
                                <li className="flex gap-3">
                                    <Icon name="check-circle" className="!size-5 fill-secondary-04 shrink-0" />
                                    <span className="text-body-2 text-t-secondary">{t.faqBroker2A}</span>
                                </li>
                                <li className="flex gap-3">
                                    <Icon name="check-circle" className="!size-5 fill-secondary-04 shrink-0" />
                                    <span className="text-body-2 text-t-secondary">{t.faqBroker3A}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <Faq />
            </div>
        </Layout>
    );
};

export default BrokerPage;
