"use client";

import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";

const MessagesPage = () => {
    const { t } = useLanguage();

    const channels = [
        { name: "Signaux VIP", desc: "Échangez en direct avec nos traders certifiés sur les signaux en cours", icon: "trending-up", color: "fill-primary-02" },
        { name: "Analyse Premium", desc: "Accédez aux analyses approfondies et posez vos questions aux experts", icon: "chart", color: "fill-primary-04" },
        { name: "Communauté", desc: "Rejoignez la communauté Tradexa et partagez vos stratégies", icon: "users", color: "fill-primary-01" },
    ];

    return (
        <Layout title={t.messages}>
            <div className="max-w-2xl mx-auto py-12 text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary-01/10 flex items-center justify-center mx-auto mb-6">
                    <Icon name="chat" className="!size-10 fill-primary-01" />
                </div>
                <h2 className="text-h3 font-bold text-t-primary mb-3">Messagerie</h2>
                <p className="text-body-1 text-t-secondary mb-2">Bientôt disponible</p>
                <p className="text-body-2 text-t-tertiary mb-10 max-w-md mx-auto">
                    Communiquez directement avec nos traders professionnels dans des canaux dédiés par niveau d&apos;abonnement. Posez vos questions, recevez des conseils personnalisés et échangez en temps réel.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {channels.map((ch) => (
                        <div key={ch.name} className="card p-5 text-left">
                            <div className="w-10 h-10 rounded-xl bg-b-surface2 flex items-center justify-center mb-3">
                                <Icon name={ch.icon} className={`!size-5 ${ch.color}`} />
                            </div>
                            <h3 className="text-sub-title-1 font-semibold text-t-primary mb-1">{ch.name}</h3>
                            <p className="text-caption text-t-tertiary">{ch.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="card p-6 max-w-md mx-auto mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 rounded-full bg-primary-04 animate-pulse" />
                        <span className="text-body-2 font-semibold text-t-primary">En cours de développement</span>
                    </div>
                    <p className="text-caption text-t-tertiary mb-4">Les canaux VIP et Premium seront accessibles selon votre abonnement. Chaque trader aura son propre canal de discussion.</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] px-3 py-1.5 rounded-full bg-primary-02/10 text-primary-02 font-medium">Chat en direct</span>
                        <span className="text-[10px] px-3 py-1.5 rounded-full bg-primary-04/10 text-primary-04 font-medium">Canaux VIP</span>
                        <span className="text-[10px] px-3 py-1.5 rounded-full bg-primary-01/10 text-primary-01 font-medium">Notifications</span>
                    </div>
                </div>

                <Button isBlack as="link" href="/subscription">
                    Voir les abonnements
                </Button>
            </div>
        </Layout>
    );
};

export default MessagesPage;
