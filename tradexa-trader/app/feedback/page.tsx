"use client";

import TraderLayout from "@/components/layout/TraderLayout";
import { useTraderStore } from "@/stores/traderStore";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

export default function FeedbackPage() {
    const { feedback } = useTraderStore();

    const getIcon = (type: string) => {
        if (type === "upvote") return <ThumbsUp className="w-4 h-4 text-emerald-500" />;
        if (type === "downvote") return <ThumbsDown className="w-4 h-4 text-red-500" />;
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
    };

    const getLabel = (type: string) => {
        if (type === "upvote") return "a voté 👍";
        if (type === "downvote") return "a voté 👎";
        return "a commenté";
    };

    return (
        <TraderLayout title="Feedbacks Anonymisés">
            <p className="text-body-2 text-t-secondary mb-6">
                Les retours de vos followers sont anonymisés. Vous ne voyez jamais les noms ou emails.
            </p>
            <div className="space-y-2">
                {feedback.map((fb) => (
                    <div key={fb.id} className="card !p-4 flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            fb.type === "upvote" ? "bg-emerald-500/10" : fb.type === "downvote" ? "bg-red-500/10" : "bg-blue-500/10"
                        }`}>
                            {getIcon(fb.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-body-2 text-t-primary">
                                <span className="font-semibold text-t-secondary">{fb.odUserId}</span>{" "}
                                {getLabel(fb.type)} sur <span className="font-semibold">{fb.signalPair}</span>
                            </p>
                            {fb.comment && (
                                <p className="text-body-2 text-t-secondary mt-1 italic">&quot;{fb.comment}&quot;</p>
                            )}
                            <p className="text-caption text-t-tertiary mt-1">
                                {new Date(fb.createdAt).toLocaleString("fr-FR")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </TraderLayout>
    );
}
