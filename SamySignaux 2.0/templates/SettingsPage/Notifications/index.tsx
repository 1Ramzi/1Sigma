"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Switch from "@/components/Switch";
import Tooltip from "@/components/Tooltip";
import { useLanguage } from "@/context/LanguageContext";

const Notifications = ({}) => {
    const { t } = useLanguage();
    const [signals, setSignals] = useState(true);
    const [marketUpdates, setMarketUpdates] = useState(true);
    const [community, setCommunity] = useState(true);
    const [platform, setPlatform] = useState(false);

    const notifications = [
        {
            id: 1,
            title: t.newSignals,
            tooltip: t.newSignalsTooltip,
            checked: signals,
            onChange: setSignals,
        },
        {
            id: 2,
            title: t.marketAnalysis,
            tooltip: t.marketAnalysisTooltip,
            checked: marketUpdates,
            onChange: setMarketUpdates,
        },
        {
            id: 3,
            title: t.communityActivity,
            tooltip: t.communityActivityTooltip,
            checked: community,
            onChange: setCommunity,
        },
        {
            id: 4,
            title: t.platformUpdates,
            tooltip: t.platformUpdatesTooltip,
            checked: platform,
            onChange: setPlatform,
        },
    ];

    return (
        <Card title={t.notifications}>
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
