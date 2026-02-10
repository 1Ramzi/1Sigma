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
    
    const [step, setStep] = useState(1);
    const [brokerId, setBrokerId] = useState('');
    const [depositConfirmed, setDepositConfirmed] = useState(false);
    const [connecting, setConnecting] = useState(false);

    const handleConnect = async () => {
        if (!brokerId) {
            alert('ID requis');
            return;
        }
        if (!depositConfirmed) {
            alert('Dépôt requis');
            return;
        }
        setConnecting(true);
        await new Promise(r => setTimeout(r, 1500));
        setConnecting(false);
        setStep(3);
        alert('Compte connecté !');
    };

    const steps = [
        { num: 1, title: 'Étape 1 : Créez un compte', desc: "Si vous n'avez pas encore de compte" },
        { num: 2, title: 'Étape 2 : Effectuez un dépôt', desc: 'Déposez des fonds pour trader' },
        { num: 3, title: 'Étape 3 : Connectez votre compte', desc: 'Liez votre ID broker' },
    ];

    return (
        <Layout title="Broker">
            <div className="max-w-[1200px] mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-h3 font-bold text-t-primary">Broker</h1>
                        <p className="text-body-1 text-t-secondary mt-1">
                            Pour commencer à trader avec nos signaux, vous devez connecter votre compte broker
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
                                                Étape 1 : Créez un compte
                                            </h3>
                                            {step > 1 && <Icon name="check-circle-fill" className="!size-5 fill-primary-02" />}
                                        </div>
                                        <p className="text-t-secondary text-body-2 mb-4">
                                            Si vous n'avez pas encore de compte, créez-en un en cliquant sur le lien ci-dessous
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
                                                Créer un compte broker
                                                <Icon name="external-link" className="!size-4 ml-2 fill-inherit" />
                                            </Button>
                                            <button
                                                onClick={() => setStep(2)}
                                                className="text-body-2 text-primary-04 font-medium hover:underline"
                                            >
                                                J'ai déjà un compte →
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
                                                Étape 2 : Effectuez un dépôt
                                            </h3>
                                            {step > 2 && <Icon name="check-circle-fill" className="!size-5 fill-primary-02" />}
                                        </div>
                                        <p className="text-t-secondary text-body-2 mb-4">
                                            Déposez des fonds sur votre compte broker pour commencer à trader
                                        </p>
                                        
                                        <div className="bg-primary-05/5 border border-primary-05/20 rounded-lg p-4 mb-4">
                                            <div className="flex items-start gap-2">
                                                <Icon name="alert-circle" className="!size-5 fill-primary-05 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-body-2 font-medium text-primary-05">
                                                        Dépôt minimum recommandé : 500 USDT
                                                    </p>
                                                    <p className="text-caption text-primary-05/80 mt-1">
                                                        Ce montant vous permet de suivre tous nos signaux avec une marge de sécurité.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <Checkbox 
                                            label="J'ai bien effectué mon dépôt"
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
                                                Étape 3 : Connectez votre compte
                                            </h3>
                                            {step === 3 && connecting && <Icon name="spinner" className="!size-5 animate-spin fill-primary-04" />}
                                        </div>
                                        <p className="text-t-secondary text-body-2 mb-4">
                                            Entrez votre ID de compte broker pour le connecter à notre plateforme
                                        </p>
                                        
                                        <div className="space-y-4">
                                            <Field
                                                label="ID du compte broker"
                                                placeholder="Ex: 12345678"
                                                value={brokerId}
                                                onChange={(e) => setBrokerId(e.target.value)}
                                            />
                                            <Button 
                                                onClick={handleConnect} 
                                                disabled={connecting || !depositConfirmed || !brokerId}
                                                isBlack
                                                className="w-full sm:w-auto"
                                            >
                                                {connecting ? 'Connexion...' : 'Connecter le compte'}
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
                                    Pourquoi un broker ?
                                </h3>
                            </div>
                            <p className="text-body-2 text-t-secondary">
                                Un broker vous permet d'exécuter les signaux de trading automatiquement. Nous recommandons PuPrime pour sa fiabilité et ses faibles frais.
                            </p>
                        </Card>

                        <Card title="" className="!p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-primary-02/10 flex items-center justify-center">
                                    <Icon name="shield" className="!size-5 fill-primary-02" />
                                </div>
                                <h3 className="text-body-1 font-semibold text-t-primary">
                                    Sécurité
                                </h3>
                            </div>
                            <p className="text-body-2 text-t-secondary">
                                Vos fonds restent sur votre compte broker. Nous n'avons jamais accès à votre argent.
                            </p>
                        </Card>

                        <div className="bg-shade-01 text-shade-10 rounded-4xl p-5">
                            <h4 className="font-semibold mb-2">Besoin d'aide ?</h4>
                            <p className="text-body-2 text-shade-10/70 mb-3">
                                Notre équipe est disponible 24/7 pour vous aider avec la configuration de votre compte.
                            </p>
                            <button className="text-button text-primary-04 font-medium hover:text-primary-04/80 flex items-center gap-1">
                                Contacter le support
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
