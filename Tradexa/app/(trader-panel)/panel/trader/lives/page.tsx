"use client";

import TraderLayout from "@/components/TraderPanel/TraderLayout";
import { Video, Calendar, Settings, Users, Clock, Lock } from "lucide-react";

export default function LivesPage() {
    return (
        <TraderLayout title="Configuration des Lives">
            <div className="max-w-3xl mx-auto">
                <div className="relative rounded-2xl border border-s-border bg-b-surface2 p-8 md:p-12 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                            <Video className="w-10 h-10 text-emerald-500/50" />
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-caption font-semibold mb-4">
                            <Lock className="w-3.5 h-3.5" /> Bientôt disponible
                        </div>
                        <h2 className="text-h4 font-bold text-t-primary mb-3">Lives Trading en direct</h2>
                        <p className="text-body-1 text-t-secondary max-w-lg mx-auto mb-8">
                            Configurez et diffusez des sessions de trading en direct à vos followers.
                            Planifiez vos lives, gérez vos paramètres de streaming et interagissez avec votre communauté en temps réel.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {[
                                { icon: Calendar, title: "Planifier", desc: "Programmez vos sessions à l'avance" },
                                { icon: Settings, title: "Configurer", desc: "Paramètres audio/vidéo et overlay" },
                                { icon: Users, title: "Interagir", desc: "Chat en direct avec vos followers" },
                                { icon: Clock, title: "Historique", desc: "Replay des sessions passées" },
                            ].map((f, i) => (
                                <div key={i} className="p-4 rounded-xl bg-b-surface1/50 border border-s-border/50">
                                    <f.icon className="w-6 h-6 text-t-tertiary/40 mb-2" />
                                    <p className="text-body-2 font-semibold text-t-tertiary/60">{f.title}</p>
                                    <p className="text-caption text-t-tertiary/40 mt-0.5">{f.desc}</p>
                                </div>
                            ))}
                        </div>

                        <button disabled className="h-12 px-8 rounded-xl bg-emerald-500/20 text-emerald-500/50 text-button font-semibold cursor-not-allowed">
                            Disponible prochainement
                        </button>
                    </div>
                </div>
            </div>
        </TraderLayout>
    );
}
