"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import { useLanguage } from "@/context/LanguageContext";
import AnimateHeight from "react-animate-height";

const TermsPage = () => {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState<number | null>(null);

    const sections = [
        {
            id: 1,
            title: "Conditions d'utilisation",
            content: "En utilisant la plateforme Tradexa, vous acceptez les présentes conditions. Le service fournit des signaux de trading à titre informatif. Toute décision d'investissement est prise sous votre propre responsabilité.",
        },
        {
            id: 2,
            title: "Politique de confidentialité",
            content: "Nous collectons uniquement les données nécessaires au fonctionnement du service (email, identifiant broker). Vos données ne sont jamais partagées avec des tiers sans votre consentement explicite.",
        },
        {
            id: 3,
            title: "Avertissement sur les risques",
            content: "Le trading comporte des risques significatifs. Les performances passées ne garantissent pas les résultats futurs. Nos signaux sont des conseils et non des garanties de profit. N'investissez que ce que vous pouvez vous permettre de perdre.",
        },
        {
            id: 4,
            title: "Politique de remboursement",
            content: "Les abonnements peuvent être annulés à tout moment. Les remboursements sont traités au cas par cas. Contactez le support pour toute demande de remboursement dans les 14 jours suivant l'achat.",
        },
        {
            id: 5,
            title: "Propriété intellectuelle",
            content: "Tout le contenu de la plateforme (signaux, formations, analyses) est protégé par le droit d'auteur. Toute reproduction ou distribution non autorisée est strictement interdite.",
        },
    ];

    return (
        <Layout title="Terms">
            <div className="max-w-[800px] mx-auto space-y-6">
                <div>
                    <h1 className="text-h3 font-bold text-t-primary">Mentions légales</h1>
                    <p className="text-body-1 text-t-secondary mt-1">Informations juridiques et conditions d&apos;utilisation de la plateforme.</p>
                </div>

                <Card title="Documents légaux" className="!p-0 overflow-hidden">
                    <div className="p-6">
                        {sections.map((section) => (
                            <div key={section.id} className="py-3 border-b border-s-subtle last:border-0">
                                <div
                                    className="flex items-center gap-6 py-4 text-h6 cursor-pointer hover:text-primary-01 transition-colors"
                                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                                >
                                    <div className="grow">{section.title}</div>
                                    <div className="relative shrink-0 w-6 h-6 ml-auto">
                                        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-3 h-0.5 rounded-full bg-t-secondary"></div>
                                        <div
                                            className={`absolute top-1/2 left-1/2 -translate-1/2 w-0.5 h-3 rounded-full bg-t-secondary transition-transform duration-300 ${
                                                activeSection === section.id ? "rotate-90" : ""
                                            }`}
                                        ></div>
                                    </div>
                                </div>
                                <AnimateHeight duration={300} height={activeSection === section.id ? "auto" : 0}>
                                    <div className="pb-4 text-body-2 text-t-secondary">{section.content}</div>
                                </AnimateHeight>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default TermsPage;

