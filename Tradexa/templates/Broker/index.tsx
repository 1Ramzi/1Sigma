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

type Step = 'ask-axi' | 'axi-form' | 'ask-puprime' | 'puprime-form' | 'not-eligible' | 'pending' | 'validated';

const BrokerPage = () => {
    const { t } = useLanguage();
    const { user } = useUserStore();
    const [step, setStep] = useState<Step>('ask-axi');
    const [brokerId, setBrokerId] = useState('');
    const [depositConfirmed, setDepositConfirmed] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [activeBroker, setActiveBroker] = useState<'axi' | 'puprime'>('axi');

    const handleValidate = async () => {
        if (!brokerId || !depositConfirmed) return;
        setConnecting(true);
        await new Promise(r => setTimeout(r, 1500));
        setConnecting(false);
        setStep('pending');
    };

    const getStatusBadge = () => {
        const role = user?.role || 'member';
        let color: "gray" | "green" | "blue" | "yellow" | "red" = "gray";
        let label = t.statusFree;

        if (role === 'vip' || role === 'trader' || role === 'admin') {
             color = "green";
             label = t.statusPartner;
        }
        if (step === 'pending') { color = "yellow"; label = t.pendingVerification; }
        if (step === 'validated') { color = "green"; label = t.statusLinked; }

        return <Badge color={color}>{label}</Badge>;
    };

    const resetForm = () => {
        setBrokerId('');
        setDepositConfirmed(false);
    };

    const renderStep = () => {
        switch (step) {
            case 'ask-axi':
                return (
                    <motion.div key="ask-axi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-shade-02 flex items-center justify-center shadow-sm border border-s-border">
                                <span className="font-bold text-h6 text-primary-04">AXI</span>
                            </div>
                            <div>
                                <h3 className="text-h5 font-bold text-t-primary">{t.haveAxiAccount}</h3>
                                <p className="text-caption text-t-secondary">{t.exclusiveAxiOffer} — {t.freeSignalsLifetime}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-primary-02/5 border border-primary-02/20 rounded-xl">
                            <Icon name="wallet" className="!size-5 fill-primary-02 shrink-0 mt-0.5" />
                            <p className="text-caption text-t-secondary leading-relaxed">{t.brokerSavingsExplanation}</p>
                        </div>
                        <div className="flex gap-4">
                            <Button onClick={() => { setActiveBroker('axi'); setStep('axi-form'); }} isBlack className="flex-1">
                                {t.yes}
                            </Button>
                            <Button onClick={() => setStep('ask-puprime')} isStroke className="flex-1">
                                {t.no}
                            </Button>
                        </div>
                    </motion.div>
                );
            case 'axi-form':
                return (
                    <motion.div key="axi-form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-shade-02 flex items-center justify-center border border-s-border">
                                <span className="font-bold text-button text-primary-04">AXI</span>
                            </div>
                            <h4 className="text-h5 font-bold text-t-primary">{t.validateRegistration}</h4>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-caption text-t-secondary">
                                <Icon name="check" className="!size-4 fill-primary-02" /> {t.freeSignalsLifetime}
                            </li>
                            <li className="flex items-center gap-3 text-caption text-t-secondary">
                                <Icon name="check" className="!size-4 fill-primary-02" /> {t.immediateVipAccess}
                            </li>
                            <li className="flex items-center gap-3 text-caption text-t-secondary">
                                <Icon name="check" className="!size-4 fill-primary-02" /> {t.minDeposit300}
                            </li>
                        </ul>
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
                        <div className="flex items-center gap-4 pt-2">
                            <Button onClick={handleValidate} disabled={!brokerId || !depositConfirmed || connecting} isBlack>
                                {connecting ? t.verifying : t.validateAccount}
                            </Button>
                            <button onClick={() => { resetForm(); setStep('ask-axi'); }} className="text-caption text-t-secondary hover:underline">{t.back}</button>
                        </div>
                        <p className="text-[11px] text-t-tertiary">{t.depositDisclaimer}</p>
                    </motion.div>
                );
            case 'ask-puprime':
                return (
                    <motion.div key="ask-puprime" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-01/10 flex items-center justify-center border border-s-border">
                                <span className="font-bold text-caption text-primary-01">PuPrime</span>
                            </div>
                            <div>
                                <h3 className="text-h5 font-bold text-t-primary">{t.havePuPrimeAccount}</h3>
                                <p className="text-caption text-t-secondary">{t.puPrimeOfferDesc}</p>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-caption text-t-secondary">
                                <Icon name="check" className="!size-4 fill-primary-01" /> {t.reducedSpreads}
                            </li>
                            <li className="flex items-center gap-3 text-caption text-t-secondary">
                                <Icon name="check" className="!size-4 fill-primary-01" /> {t.dedicatedSupport}
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <Button onClick={() => { setActiveBroker('puprime'); setStep('puprime-form'); }} isBlack className="flex-1">
                                {t.yes}
                            </Button>
                            <Button onClick={() => setStep('not-eligible')} isStroke className="flex-1">
                                {t.no}
                            </Button>
                        </div>
                        <button onClick={() => setStep('ask-axi')} className="text-caption text-t-secondary hover:underline">{t.back}</button>
                    </motion.div>
                );
            case 'puprime-form':
                return (
                    <motion.div key="puprime-form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-01/10 flex items-center justify-center border border-s-border">
                                <span className="font-bold text-[11px] text-primary-01">PuPrime</span>
                            </div>
                            <h4 className="text-h5 font-bold text-t-primary">{t.validateRegistration}</h4>
                        </div>
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
                        <div className="flex items-center gap-4 pt-2">
                            <Button onClick={handleValidate} disabled={!brokerId || !depositConfirmed || connecting} isBlack>
                                {connecting ? t.verifying : t.validateAccount}
                            </Button>
                            <button onClick={() => { resetForm(); setStep('ask-puprime'); }} className="text-caption text-t-secondary hover:underline">{t.back}</button>
                        </div>
                        <p className="text-[11px] text-t-tertiary">{t.depositDisclaimer}</p>
                    </motion.div>
                );
            case 'not-eligible':
                return (
                    <motion.div key="not-eligible" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-03/10 flex items-center justify-center">
                                <Icon name="info-circle" className="!size-6 fill-primary-03" />
                            </div>
                            <h3 className="text-h5 font-bold text-t-primary">{t.importantInfo}</h3>
                        </div>
                        <p className="text-body-2 text-t-secondary leading-relaxed">{t.notEligibleDesc}</p>
                        <p className="text-body-2 text-t-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: t.academyAccessDesc }} />
                        <div className="flex items-center gap-3 p-4 bg-primary-04/5 border border-primary-04/20 rounded-xl">
                            <Icon name="star-fill" className="!size-5 fill-primary-04" />
                            <div>
                                <p className="text-caption text-t-secondary">{t.exclusiveCoupon}</p>
                                <p className="text-h6 font-bold text-primary-04 font-mono mt-1">TRADEXA10</p>
                                <p className="text-[11px] text-t-tertiary">{t.discountSubscription}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button href="/subscription" as="link" isBlack>{t.subscription}</Button>
                            <button onClick={() => setStep('ask-axi')} className="text-caption text-t-secondary hover:underline">{t.back}</button>
                        </div>
                    </motion.div>
                );
            case 'pending':
                return (
                    <motion.div key="pending" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-center py-8 space-y-4">
                        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto">
                            <Icon name="clock" className="!size-8 fill-yellow-500" />
                        </div>
                        <h2 className="text-h4 font-bold text-t-primary">{t.pendingVerification}</h2>
                        <p className="text-body-2 text-t-secondary max-w-md mx-auto">{t.pendingVerificationDesc}</p>
                        <div className="inline-flex items-center gap-3 px-5 py-3 bg-b-surface2 rounded-xl mt-2">
                            <span className="text-caption text-t-secondary">{activeBroker === 'axi' ? t.axiAccountId : t.puPrimeAccountId}:</span>
                            <span className="text-body-2 font-bold text-t-primary font-mono">{brokerId}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <Badge color="yellow">{t.pendingVerification}</Badge>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <Layout title={t.broker}>
            <div className="max-w-[1200px] mx-auto space-y-8">
                {/* Header + Status */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-h3 font-bold text-t-primary">{t.brokerHeroTitle}</h1>
                        <p className="text-body-1 text-t-secondary mt-2 max-w-2xl">{t.brokerHeroDesc}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-b-surface1 p-3 rounded-2xl border border-s-border shrink-0">
                        <span className="text-body-2 font-medium text-t-secondary">{t.accountStatus}:</span>
                        {getStatusBadge()}
                    </div>
                </div>

                {/* Dynamic Form — always visible at top */}
                <Card className="w-full !p-8" title="">
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>
                </Card>

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

                {/* FAQ Section */}
                <Faq />
            </div>
        </Layout>
    );
};

export default BrokerPage;
