"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Badge from "@/components/Badge";
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import { useLanguage } from "@/context/LanguageContext";

const BROKER_URL = 'https://www.puprime.com/';

const BrokerPage = () => {
    const { language } = useLanguage();
    // Helper to get translation or fallback
    const t = (key: string, fallback: string) => {
        // In a real app, use the translation object. 
        // For now we do inline simulation based on LanguageContext or port the full translation object logic.
        // We ported i18n.ts, let's use it if we can access it properly or just switch inside component for now to be safe.
        return fallback; 
    };
    
    // We can also import { translations } from "@/lib/i18n" but we need to select based on language.
    // Let's use simple switching in the render for now as we did in other components for speed and safety.

    const [step, setStep] = useState(1);
    const [brokerId, setBrokerId] = useState('');
    const [depositConfirmed, setDepositConfirmed] = useState(false);
    const [connecting, setConnecting] = useState(false);

    const handleConnect = async () => {
        if (!brokerId) {
            alert(language === 'fr' ? 'ID requis' : 'ID required');
            return;
        }
        if (!depositConfirmed) {
            alert(language === 'fr' ? 'Dépôt requis' : 'Deposit required');
            return;
        }
        setConnecting(true);
        await new Promise(r => setTimeout(r, 1500));
        setConnecting(false);
        setStep(3);
        alert(language === 'fr' ? 'Compte connecté !' : 'Account connected!');
    };

    const steps = [
        { num: 1, title: language === 'fr' ? 'Étape 1 : Créez un compte' : 'Step 1: Create an account', desc: language === 'fr' ? "Si vous n'avez pas encore de compte" : "If you don't have an account yet" },
        { num: 2, title: language === 'fr' ? 'Étape 2 : Effectuez un dépôt' : 'Step 2: Make a deposit', desc: language === 'fr' ? 'Déposez des fonds pour trader' : 'Deposit funds to start trading' },
        { num: 3, title: language === 'fr' ? 'Étape 3 : Connectez votre compte' : 'Step 3: Connect your account', desc: language === 'fr' ? 'Liez votre ID broker' : 'Link your broker ID' },
    ];

    return (
        <Layout title="Broker">
            <div className="max-w-[1200px] mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-h3 font-bold text-t-primary">Broker</h1>
                        <p className="text-body-1 text-t-secondary mt-1">
                            {language === 'fr' 
                                ? 'Pour commencer à trader avec nos signaux, vous devez connecter votre compte broker'
                                : 'To start trading with our signals, you need to connect your broker account'}
                        </p>
                    </div>
                    <Badge color="blue" className="self-start sm:self-auto px-3 py-1.5 h-auto">
                        <Icon name="building" className="!size-4 mr-1.5 fill-primary-01" /> 
                        PuPrime
                    </Badge>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {steps.map((s, i) => (
                        <div key={s.num} className="flex items-center flex-shrink-0">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                                step >= s.num ? 'bg-primary-04 text-shade-10' : 'bg-b-surface2 text-t-secondary'
                            }`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-caption font-bold ${
                                    step > s.num ? 'bg-primary-02 text-shade-10' : step === s.num ? 'bg-white/20' : 'bg-shade-07 text-shade-01'
                                }`}>
                                    {step > s.num ? <Icon name="check" className="!size-3.5 fill-shade-10" /> : s.num}
                                </div>
                                <span className="text-body-2 font-medium">{s.title}</span>
                            </div>
                            {i < steps.length - 1 && <Icon name="chevron" className="!size-5 fill-t-secondary mx-2 -rotate-90" />}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Steps */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Step 1: Create Account */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Card className={`!p-6 ${step === 1 ? 'ring-2 ring-primary-04' : ''}`} title="">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-04/10 flex items-center justify-center flex-shrink-0">
                                        <Icon name="external-link" className="!size-6 fill-primary-04" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-h6 font-semibold text-t-primary">
                                                {language === 'fr' ? 'Étape 1 : Créez un compte' : 'Step 1: Create an account'}
                                            </h3>
                                            {step > 1 && <Icon name="check-circle-fill" className="!size-5 fill-primary-02" />}
                                        </div>
                                        <p className="text-t-secondary text-body-2 mb-4">
                                            {language === 'fr' 
                                                ? "Si vous n'avez pas encore de compte, créez-en un en cliquant sur le lien ci-dessous"
                                                : "If you don't have an account yet, create one by clicking the link below"}
                                        </p>
                                        <div className="flex flex-wrap gap-3 items-center">
                                            <Button 
                                                href={BROKER_URL} 
                                                as="a" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                isBlack
                                                className="!h-10"
                                            >
                                                {language === 'fr' ? 'Créer un compte broker' : 'Create broker account'}
                                                <Icon name="external-link" className="!size-4 ml-2 fill-inherit" />
                                            </Button>
                                            <button
                                                onClick={() => setStep(2)}
                                                className="text-body-2 text-primary-04 font-medium hover:underline"
                                            >
                                                {language === 'fr' ? "J'ai déjà un compte →" : "I already have an account →"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Step 2: Deposit */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <Card className={`!p-6 ${step === 2 ? 'ring-2 ring-primary-04' : ''}`} title="">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-02/10 flex items-center justify-center flex-shrink-0">
                                        <Icon name="wallet" className="!size-6 fill-primary-02" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-h6 font-semibold text-t-primary">
                                                {language === 'fr' ? 'Étape 2 : Effectuez un dépôt' : 'Step 2: Make a deposit'}
                                            </h3>
                                            {step > 2 && <Icon name="check-circle-fill" className="!size-5 fill-primary-02" />}
                                        </div>
                                        <p className="text-t-secondary text-body-2 mb-4">
                                            {language === 'fr' 
                                                ? 'Déposez des fonds sur votre compte broker pour commencer à trader'
                                                : 'Deposit funds into your broker account to start trading'}
                                        </p>
                                        
                                        <div className="bg-primary-05/5 border border-primary-05/20 rounded-lg p-4 mb-4">
                                            <div className="flex items-start gap-2">
                                                <Icon name="alert-circle" className="!size-5 fill-primary-05 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-body-2 font-medium text-primary-05">
                                                        {language === 'fr' ? 'Dépôt minimum recommandé : 500 USDT' : 'Minimum recommended deposit: 500 USDT'}
                                                    </p>
                                                    <p className="text-caption text-primary-05/80 mt-1">
                                                        {language === 'fr' 
                                                            ? "Ce montant vous permet de suivre tous nos signaux avec une marge de sécurité."
                                                            : "This amount allows you to follow all our signals with a safety margin."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <Checkbox 
                                            label={language === 'fr' ? "J'ai bien effectué mon dépôt" : "I have made my deposit"}
                                            checked={depositConfirmed}
                                            onChange={setDepositConfirmed}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Step 3: Connect Account */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <Card className={`!p-6 ${step === 3 ? 'ring-2 ring-primary-04' : ''}`} title="">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-04/10 flex items-center justify-center flex-shrink-0">
                                        <Icon name="link" className="!size-6 fill-primary-04" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-h6 font-semibold text-t-primary">
                                                {language === 'fr' ? 'Étape 3 : Connectez votre compte' : 'Step 3: Connect your account'}
                                            </h3>
                                            {step === 3 && connecting && <Icon name="spinner" className="!size-5 animate-spin fill-primary-04" />}
                                        </div>
                                        <p className="text-t-secondary text-body-2 mb-4">
                                            {language === 'fr' 
                                                ? 'Entrez votre ID de compte broker pour le connecter à notre plateforme'
                                                : 'Enter your broker account ID to connect it to our platform'}
                                        </p>
                                        
                                        <div className="space-y-4">
                                            <Field
                                                label={language === 'fr' ? 'ID du compte broker' : 'Broker Account ID'}
                                                placeholder={language === 'fr' ? 'Ex: 12345678' : 'Ex: 12345678'}
                                                value={brokerId}
                                                onChange={(e) => setBrokerId(e.target.value)}
                                            />
                                            <Button 
                                                onClick={handleConnect} 
                                                disabled={connecting || !depositConfirmed || !brokerId}
                                                isBlack
                                                className="w-full sm:w-auto"
                                            >
                                                {connecting ? (language === 'fr' ? 'Connexion...' : 'Connecting...') : (language === 'fr' ? 'Connecter le compte' : 'Connect account')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Info Sidebar */}
                    <div className="space-y-4">
                        <Card title="" className="!p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-primary-04/10 flex items-center justify-center">
                                    <Icon name="building" className="!size-5 fill-primary-04" />
                                </div>
                                <h3 className="text-body-1 font-semibold text-t-primary">
                                    {language === 'fr' ? 'Pourquoi un broker ?' : 'Why a broker?'}
                                </h3>
                            </div>
                            <p className="text-body-2 text-t-secondary">
                                {language === 'fr' 
                                    ? "Un broker vous permet d'exécuter les signaux de trading automatiquement. Nous recommandons PuPrime pour sa fiabilité et ses faibles frais."
                                    : "A broker allows you to execute trading signals automatically. We recommend PuPrime for its reliability and low fees."}
                            </p>
                        </Card>

                        <Card title="" className="!p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-primary-02/10 flex items-center justify-center">
                                    <Icon name="shield" className="!size-5 fill-primary-02" />
                                </div>
                                <h3 className="text-body-1 font-semibold text-t-primary">
                                    {language === 'fr' ? 'Sécurité' : 'Security'}
                                </h3>
                            </div>
                            <p className="text-body-2 text-t-secondary">
                                {language === 'fr' 
                                    ? "Vos fonds restent sur votre compte broker. Nous n'avons jamais accès à votre argent."
                                    : "Your funds remain on your broker account. We never have access to your money."}
                            </p>
                        </Card>

                        <div className="bg-shade-01 text-shade-10 rounded-4xl p-5">
                            <h4 className="font-semibold mb-2">{language === 'fr' ? 'Besoin d\'aide ?' : 'Need help?'}</h4>
                            <p className="text-body-2 text-shade-10/70 mb-3">
                                {language === 'fr' 
                                    ? "Notre équipe est disponible 24/7 pour vous aider avec la configuration de votre compte."
                                    : "Our team is available 24/7 to help you set up your account."}
                            </p>
                            <button className="text-button text-primary-04 font-medium hover:text-primary-04/80 flex items-center gap-1">
                                {language === 'fr' ? 'Contacter le support' : 'Contact support'}
                                <Icon name="arrow" className="!size-3 -rotate-90 fill-primary-04" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BrokerPage;
