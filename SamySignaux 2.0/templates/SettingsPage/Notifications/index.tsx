"use client";

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
            title: "Nouveaux signaux de trading",
            tooltip: "Recevez une alerte pour chaque nouveau signal",
            checked: signals,
            onChange: setSignals,
        },
        {
            id: 2,
            title: "Analyses de marché",
            tooltip: "Mises à jour quotidiennes sur le marché",
            checked: marketUpdates,
            onChange: setMarketUpdates,
        },
        {
            id: 3,
            title: "Activité communautaire",
            tooltip: "Réponses à vos commentaires et mentions",
            checked: community,
            onChange: setCommunity,
        },
        {
            id: 4,
            title: "Mises à jour de la plateforme",
            tooltip: "Nouvelles fonctionnalités et maintenances",
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
