"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";

const AXI_URL = 'https://www.axi.com/';
const PUPRIME_URL = 'https://www.puprime.com/';

type BrokerStep = 'AXI_QUESTION' | 'AXI_FORM' | 'PUPRIME_QUESTION' | 'PUPRIME_FORM' | 'COUPON';

const BrokerPage = () => {
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

    const renderContent = () => {
        if (submitted) {
            return (
                <div className="text-center py-10">
                    <div className="w-20 h-20 bg-primary-02/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon name="check-circle-fill" className="!size-10 fill-primary-02" />
                    </div>
                    <h2 className="text-h3 font-bold text-t-primary mb-3">Demande reçue !</h2>
                    <p className="text-body-1 text-t-secondary max-w-md mx-auto">
                        Votre demande de liaison a bien été reçue. Notre équipe va vérifier votre ID et votre dépôt.
                        Statut : <span className="font-bold text-primary-05">En attente (Pending)</span>
                    </p>
                </div>
            );
        }

        switch (step) {
            case 'AXI_QUESTION':
                return (
                    <div className="space-y-6">
                        <h2 className="text-h4 font-bold text-t-primary text-center">Avez-vous déjà un compte Axi ?</h2>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => setStep('PUPRIME_QUESTION')} isStroke className="min-w-[120px] justify-center">Oui</Button>
                            <Button onClick={() => setStep('AXI_FORM')} isBlack className="min-w-[120px] justify-center">Non</Button>
                        </div>
                    </div>
                );

            case 'AXI_FORM':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-h4 font-bold text-t-primary mb-2">Créez votre compte Axi</h2>
                            <p className="text-body-2 text-t-secondary max-w-lg mx-auto">
                                En passant par notre lien affilié, vous bénéficiez de l'accès <strong>GRATUIT</strong> aux signaux (au lieu de 89.99€/mois).
                            </p>
                        </div>

                        <div className="bg-primary-04/5 border border-primary-04/10 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                    {/* Placeholder for Axi Logo if available, using text for now or generic icon */}
                                    <span className="font-bold text-primary-04">AXI</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-t-primary">Offre Exclusive Axi</h3>
                                    <p className="text-caption text-t-secondary">Signaux gratuits à vie</p>
                                </div>
                                <Button href={AXI_URL} as="a" target="_blank" isBlack className="ml-auto">
                                    Ouvrir un compte
                                </Button>
                            </div>
                            
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                    <Icon name="check" className="!size-4 fill-primary-02" />
                                    Dépôt minimum requis : <span className="font-bold text-t-primary">300€</span>
                                </li>
                                <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                    <Icon name="check" className="!size-4 fill-primary-02" />
                                    Accès immédiat au canal VIP
                                </li>
                            </ul>

                            <div className="pt-6 border-t border-s-border space-y-4">
                                <h4 className="font-bold text-t-primary">Validez votre inscription</h4>
                                <Field
                                    label="ID de votre compte Axi"
                                    placeholder="Ex: 8829102"
                                    value={brokerId}
                                    onChange={(e) => setBrokerId(e.target.value)}
                                />
                                <Checkbox 
                                    label="J'ai bien effectué le dépôt minimum de 300€"
                                    checked={depositConfirmed}
                                    onChange={setDepositConfirmed}
                                />
                                <Button 
                                    onClick={() => handleConnect('Axi')} 
                                    disabled={!brokerId || !depositConfirmed || connecting}
                                    className="w-full justify-center"
                                >
                                    {connecting ? 'Vérification...' : 'Valider mon compte'}
                                </Button>
                            </div>
                        </div>
                        <button onClick={() => setStep('AXI_QUESTION')} className="block mx-auto text-caption text-t-secondary hover:underline">Retour</button>
                    </div>
                );

            case 'PUPRIME_QUESTION':
                return (
                    <div className="space-y-6">
                        <h2 className="text-h4 font-bold text-t-primary text-center">Avez-vous un compte PuPrime ?</h2>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => setStep('COUPON')} isStroke className="min-w-[120px] justify-center">Oui</Button>
                            <Button onClick={() => setStep('PUPRIME_FORM')} isBlack className="min-w-[120px] justify-center">Non</Button>
                        </div>
                        <button onClick={() => setStep('AXI_QUESTION')} className="block mx-auto text-caption text-t-secondary hover:underline">Retour</button>
                    </div>
                );

            case 'PUPRIME_FORM':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-h4 font-bold text-t-primary mb-2">Créez votre compte PuPrime</h2>
                            <p className="text-body-2 text-t-secondary max-w-lg mx-auto">
                                Profitez de nos conditions de trading exclusives avec PuPrime.
                            </p>
                        </div>

                        <div className="bg-primary-01/5 border border-primary-01/10 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                    <Icon name="building" className="!size-6 fill-primary-01" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-t-primary">Offre PuPrime</h3>
                                    <p className="text-caption text-t-secondary">Spreads réduits & exécution rapide</p>
                                </div>
                                <Button href={PUPRIME_URL} as="a" target="_blank" isBlack className="ml-auto">
                                    Ouvrir un compte
                                </Button>
                            </div>
                            
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                    <Icon name="check" className="!size-4 fill-primary-02" />
                                    Dépôt minimum requis : <span className="font-bold text-t-primary">300€</span>
                                </li>
                                <li className="flex items-center gap-3 text-body-2 text-t-secondary">
                                    <Icon name="check" className="!size-4 fill-primary-02" />
                                    Support client dédié
                                </li>
                            </ul>

                            <div className="pt-6 border-t border-s-border space-y-4">
                                <h4 className="font-bold text-t-primary">Validez votre inscription</h4>
                                <Field
                                    label="ID de votre compte PuPrime"
                                    placeholder="Ex: 123456"
                                    value={brokerId}
                                    onChange={(e) => setBrokerId(e.target.value)}
                                />
                                <Checkbox 
                                    label="J'ai bien effectué le dépôt minimum de 300€"
                                    checked={depositConfirmed}
                                    onChange={setDepositConfirmed}
                                />
                                <Button 
                                    onClick={() => handleConnect('PuPrime')} 
                                    disabled={!brokerId || !depositConfirmed || connecting}
                                    className="w-full justify-center"
                                >
                                    {connecting ? 'Vérification...' : 'Valider mon compte'}
                                </Button>
                            </div>
                        </div>
                        <button onClick={() => setStep('PUPRIME_QUESTION')} className="block mx-auto text-caption text-t-secondary hover:underline">Retour</button>
                    </div>
                );

            case 'COUPON':
                return (
                    <div className="space-y-6 text-center">
                        <div className="w-20 h-20 bg-primary-05/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon name="info-circle" className="!size-10 fill-primary-05" />
                        </div>
                        <h2 className="text-h4 font-bold text-t-primary">Information Importante</h2>
                        <p className="text-body-1 text-t-secondary max-w-lg mx-auto mb-6">
                            Malheureusement, vous n'êtes pas éligible à l'offre gratuite car les brokers nous rémunèrent pour former de nouveaux traders.
                            <br /><br />
                            Mais ne vous inquiétez pas ! Avec l'abonnement, vous aurez accès à toute l'<strong>Académie</strong> pour vous former.
                        </p>
                        
                        <div className="bg-b-surface2 border border-dashed border-primary-04 rounded-xl p-6 max-w-sm mx-auto">
                            <p className="text-caption text-t-secondary mb-2">Voici un code promo exclusif pour vous :</p>
                            <div className="text-h4 font-mono font-bold text-primary-04 tracking-wider mb-2">WELCOME10</div>
                            <p className="text-caption font-medium text-primary-02">-10% sur votre abonnement</p>
                        </div>

                        <Button href="/upgrade-to-pro" isBlack className="mx-auto mt-6">
                            Voir les abonnements
                        </Button>
                        <button onClick={() => setStep('PUPRIME_QUESTION')} className="block mx-auto mt-4 text-caption text-t-secondary hover:underline">Retour</button>
                    </div>
                );
        }
    };

    return (
        <Layout title="Broker">
            <div className="max-w-[800px] mx-auto min-h-[60vh] flex items-center justify-center">
                <Card className="w-full !p-8 shadow-xl" title="">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step + (submitted ? '_submitted' : '')}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </Card>
            </div>
        </Layout>
    );
};

export default BrokerPage;
