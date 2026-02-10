"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Field from "@/components/Field";

const Demos = () => {
    const { t } = useLanguage();
    const [liveDemo, setLiveDemo] = useState("");
    const [embedVideo, setEmbedVideo] = useState("");

    return (
        <Card classHead="!pl-3" title={t.demos}>
            <div className="flex flex-col gap-3 p-3">
                <Field
                    label={t.liveDemo}
                    placeholder={t.demoPlaceholder}
                    tooltip={t.filterTooltip}
                    value={liveDemo}
                    onChange={(e) => setLiveDemo(e.target.value)}
                    required
                />
                <Field
                    label={t.embedVideo}
                    placeholder={t.demoPlaceholder}
                    tooltip={t.filterTooltip}
                    value={embedVideo}
                    onChange={(e) => setEmbedVideo(e.target.value)}
                    required
                />
            </div>
        </Card>
    );
};

export default Demos;
