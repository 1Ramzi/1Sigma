import { useState } from "react";
import Card from "@/components/Card";
import Field from "@/components/Field";

const Demos = () => {
    const [liveDemo, setLiveDemo] = useState("");
    const [embedVideo, setEmbedVideo] = useState("");

    return (
        <Card classHead="!pl-3" title="Démos">
            <div className="flex flex-col gap-3 p-3">
                <Field
                    label="Démo en direct"
                    placeholder="ex. Bento Cards : Interface Utilisateur"
                    tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                    value={liveDemo}
                    onChange={(e) => setLiveDemo(e.target.value)}
                    required
                />
                <Field
                    label="Vidéo intégrée"
                    placeholder="ex. Bento Cards : Interface Utilisateur"
                    tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                    value={embedVideo}
                    onChange={(e) => setEmbedVideo(e.target.value)}
                    required
                />
            </div>
        </Card>
    );
};

export default Demos;
