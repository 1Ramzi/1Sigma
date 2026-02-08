import { useState } from "react";
import Card from "@/components/Card";
import Switch from "@/components/Switch";
import Tooltip from "@/components/Tooltip";
import { useLanguage } from "@/context/LanguageContext";

const Notifications = ({}) => {
    const { language } = useLanguage();
    const [signals, setSignals] = useState(true);
    const [marketUpdates, setMarketUpdates] = useState(true);
    const [community, setCommunity] = useState(true);
    const [platform, setPlatform] = useState(false);

    const notifications = [
        {
            id: 1,
            title: language === 'fr' ? "Nouveaux signaux de trading" : "New trading signals",
            tooltip: language === 'fr' ? "Recevez une alerte pour chaque nouveau signal" : "Get alerted for every new signal",
            checked: signals,
            onChange: setSignals,
        },
        {
            id: 2,
            title: language === 'fr' ? "Analyses de marché" : "Market analysis",
            tooltip: language === 'fr' ? "Mises à jour quotidiennes sur le marché" : "Daily market updates",
            checked: marketUpdates,
            onChange: setMarketUpdates,
        },
        {
            id: 3,
            title: language === 'fr' ? "Activité communautaire" : "Community activity",
            tooltip: language === 'fr' ? "Réponses à vos commentaires et mentions" : "Replies to your comments and mentions",
            checked: community,
            onChange: setCommunity,
        },
        {
            id: 4,
            title: language === 'fr' ? "Mises à jour de la plateforme" : "Platform updates",
            tooltip: language === 'fr' ? "Nouvelles fonctionnalités et maintenances" : "New features and maintenance",
            checked: platform,
            onChange: setPlatform,
        },
    ];

    return (
        <Card title="Notifications">
            <div className="px-5 max-lg:px-3">
                {notifications.map((notification) => (
                    <div
                        className="flex justify-between items-center gap-6 py-6 border-b border-s-subtle last:border-b-0"
                        key={notification.id}
                    >
                        <div className="flex items-center">
                            <div className="text-button">
                                {notification.title}
                            </div>
                            <Tooltip
                                className="ml-1.5"
                                content={notification.tooltip}
                            />
                        </div>
                        <Switch
                            className="shrink-0"
                            checked={notification.checked}
                            onChange={() =>
                                notification.onChange(!notification.checked)
                            }
                        />
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Notifications;
