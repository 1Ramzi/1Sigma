"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const PUPRIME_URL = 'https://www.puprime.com/';

type BrokerStep = 'AXI_QUESTION' | 'AXI_FORM' | 'PUPRIME_QUESTION' | 'PUPRIME_FORM' | 'COUPON';

const BrokerPage = () => {
    const { t } = useLanguage();
    const { user } = useUserStore();
    const [step, setStep] = useState<BrokerStep>('AXI_QUESTION');
    const [brokerId, setBrokerId] = useState('');
    const [depositConfirmed, setDepositConfirmed] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleConnect = async (broker: string) => {
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
             label = t.statusSubscriber;
        } else if (role === 'moderator') { // Using as partner for example
             color = "yellow";
             label = t.statusPartner;
        }
        
        if (submitted) {
             color = "blue";
             label = t.statusLinked;
        }

        return <Badge color={color}>{label}</Badge>;
    };

    const renderContent = () => {
        if (submitted) {
            return (
                <div className="text-center py-10">
                    <div className="w-20 h-20 bg-primary-02/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon name="check-circle-fill" className="!size-10 fill-primary-02" />
                    </div>
                    <h2 className="text-h3 font-bold text-t-primary mb-3">{t.requestReceived}</h2>
                    <p className="text-body-1 text-t-secondary max-w-md mx-auto">
                        {t.requestReceivedDesc}
                        <br />
                        <span dangerouslySetInnerHTML={{ __html: t.statusPending }} />
                    </p>
                </div>
            );
        }

        switch (step) {
            case 'AXI_QUESTION':
                return (
                    <div className="space-y-6">
                        <h2 className="text-h4 font-bold text-t-primary text-center">{t.haveAxiAccount}</h2>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => setStep('PUPRIME_QUESTION')} isStroke className="min-w-[120px] justify-center">{t.yes}</Button>
                            <Button onClick={() => setStep('AXI_FORM')} isBlack className="min-w-[120px] justify-center">{t.no}</Button>
                        </div>
                    </div>
                );

            case 'AXI_FORM':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-h4 font-bold text-t-primary mb-2">{t.createAxiAccount}</h2>
                            <p className="text-body-2 text-t-secondary max-w-lg mx-auto" dangerouslySetInnerHTML={{ __html: t.axiOfferDesc }} />
                        </div>

                        <div className="bg-primary-04/5 border border-primary-04/10 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                    <span className="font-bold text-primary-04">AXI</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-t-primary">{t.exclusiveAxiOffer}</h3>
                                    <p className="text-caption text-t-secondary">{t.freeSignalsLifetime}</p>
                                </div>
                                <Button href={AXI_URL} as="a" target="_blank" isBlack className="ml-auto">
                                    {t.openAccount}
                                </Button>
                            </div>
                            
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                    <Icon name="check" className="!size-4 fill-primary-02" />
                                    {t.minDeposit300}
                                </li>
                                <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                    <Icon name="check" className="!size-4 fill-primary-02" />
                                    {t.immediateVipAccess}
                                </li>
                            </ul>

                            <div className="pt-6 border-t border-s-border space-y-4">
                                <h4 className="font-bold text-t-primary">{t.validateRegistration}</h4>
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
                                <Button 
                                    onClick={() => handleConnect('Axi')} 
                                    disabled={!brokerId || !depositConfirmed || connecting}
                                    className="w-full justify-center"
                                >
                                    {connecting ? t.verifying : t.validateAccount}
                                </Button>
                            </div>
                        </div>
                        <button onClick={() => setStep('AXI_QUESTION')} className="block mx-auto text-caption text-t-secondary hover:underline">{t.back}</button>
                    </div>
                );

            case 'PUPRIME_QUESTION':
                return (
                    <div className="space-y-6">
                        <h2 className="text-h4 font-bold text-t-primary text-center">{t.havePuPrimeAccount}</h2>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => setStep('COUPON')} isStroke className="min-w-[120px] justify-center">{t.yes}</Button>
                            <Button onClick={() => setStep('PUPRIME_FORM')} isBlack className="min-w-[120px] justify-center">{t.no}</Button>
                        </div>
                        <button onClick={() => setStep('AXI_QUESTION')} className="block mx-auto text-caption text-t-secondary hover:underline">{t.back}</button>
                    </div>
                );

            case 'PUPRIME_FORM':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-h4 font-bold text-t-primary mb-2">{t.createPuPrimeAccount}</h2>
                            <p className="text-body-2 text-t-secondary max-w-lg mx-auto">
                                {t.puPrimeOfferDesc}
                            </p>
                        </div>

                        <div className="bg-primary-01/5 border border-primary-01/10 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                    <Icon name="building" className="!size-6 fill-primary-01" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-t-primary">{t.puPrimeOffer}</h3>
                                    <p className="text-caption text-t-secondary">{t.reducedSpreads}</p>
                                </div>
                                <Button href={PUPRIME_URL} as="a" target="_blank" isBlack className="ml-auto">
                                    {t.openAccount}
                                </Button>
                            </div>
                            
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                    <Icon name="check" className="!size-4 fill-primary-02" />
                                    {t.minDeposit300}
                                </li>
                                <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                    <Icon name="check" className="!size-4 fill-primary-02" />
                                    {t.dedicatedSupport}
                                </li>
                            </ul>

                            <div className="pt-6 border-t border-s-border space-y-4">
                                <h4 className="font-bold text-t-primary">{t.validateRegistration}</h4>
                                <Field
                                    label={t.puPrimeAccountId}
                                    placeholder={t.brokerIdPlaceholder}
                                    value={brokerId}
                                    onChange={(e) => setBrokerId(e.target.value)}
                                />
                                <Checkbox 
                                    label={t.deposit300Confirmed}
                                    checked={depositConfirmed}
                                    onChange={setDepositConfirmed}
                                />
                                <Button 
                                    onClick={() => handleConnect('PuPrime')} 
                                    disabled={!brokerId || !depositConfirmed || connecting}
                                    className="w-full justify-center"
                                >
                                    {connecting ? t.verifying : t.validateAccount}
                                </Button>
                            </div>
                        </div>
                        <button onClick={() => setStep('PUPRIME_QUESTION')} className="block mx-auto text-caption text-t-secondary hover:underline">{t.back}</button>
                    </div>
                );

            case 'COUPON':
                return (
                    <div className="space-y-6 text-center">
                        <div className="w-20 h-20 bg-primary-05/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon name="info-circle" className="!size-10 fill-primary-05" />
                        </div>
                        <h2 className="text-h4 font-bold text-t-primary">{t.importantInfo}</h2>
                        <p className="text-body-1 text-t-secondary max-w-lg mx-auto mb-6">
                            {t.notEligibleDesc}
                            <br /><br />
                            <span dangerouslySetInnerHTML={{ __html: t.academyAccessDesc }} />
                        </p>
                        
                        <div className="bg-b-surface2 border border-dashed border-primary-04 rounded-xl p-6 max-w-sm mx-auto">
                            <p className="text-caption text-t-secondary mb-2">{t.exclusiveCoupon}</p>
                            <div className="text-h4 font-mono font-bold text-primary-04 tracking-wider mb-2">WELCOME10</div>
                            <p className="text-caption font-medium text-primary-02">{t.discountSubscription}</p>
                        </div>

                        <Button href="/upgrade-to-pro" isBlack className="mx-auto mt-6">
                            {t.viewSubscriptions}
                        </Button>
                        <button onClick={() => setStep('PUPRIME_QUESTION')} className="block mx-auto mt-4 text-caption text-t-secondary hover:underline">{t.back}</button>
                    </div>
                );
        }
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Interaction */}
                    <div className="lg:col-span-2">
                        <Card className="w-full !p-8 shadow-xl min-h-[500px] flex flex-col justify-center" title="">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step + (submitted ? '_submitted' : '')}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full"
                                >
                                    {renderContent()}
                                </motion.div>
                            </AnimatePresence>
                        </Card>
                    </div>

                    {/* Right Column - Explanations */}
                    <div className="space-y-6">
                        <Card title={t.transparencyTitle} className="!p-6 bg-primary-01/5 border border-primary-01/10">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary-01/10 flex items-center justify-center shrink-0">
                                    <Icon name="info-circle" className="!size-5 fill-primary-01" />
                                </div>
                                <p className="text-body-2 text-t-secondary leading-relaxed">
                                    {t.transparencyDesc}
                                </p>
                            </div>
                        </Card>

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
