"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { HeadphonesIcon, Clock, CheckCircle, AlertTriangle, MessageSquare, Send, ArrowLeft, Tag, UserCog, X } from "lucide-react";

type TicketMsg = { id: string; from: "user" | "admin"; text: string; date: string };
type Ticket = {
    id: string; user: string; subject: string; category: "bug" | "payment" | "account" | "signal" | "other";
    priority: "low" | "medium" | "high"; status: "open" | "in_progress" | "resolved" | "closed";
    assignedTo?: string; createdAt: string; messages: TicketMsg[];
};

const mockTickets: Ticket[] = [
    { id: "tk_001", user: "user_ahmed92", subject: "Impossible de suivre un signal", category: "signal", priority: "high", status: "open", createdAt: "17/02/2026 15:30", messages: [
        { id: "m1", from: "user", text: "Quand je clique sur suivre, rien ne se passe. J'ai essayé sur Chrome et Firefox, même problème.", date: "17/02/2026 15:30" },
    ]},
    { id: "tk_002", user: "crypto_sarah", subject: "Double prélèvement sur mon compte", category: "payment", priority: "high", status: "in_progress", assignedTo: "Admin Karim", createdAt: "17/02/2026 10:00", messages: [
        { id: "m2", from: "user", text: "J'ai été débité 2 fois pour le même mois. Montant: 29.99€ x2. Voici mon relevé bancaire en PJ.", date: "17/02/2026 10:00" },
        { id: "m3", from: "admin", text: "Bonjour Sarah, nous avons bien reçu votre demande. Nous vérifions avec Stripe.", date: "17/02/2026 11:15" },
        { id: "m4", from: "user", text: "Merci, j'attends votre retour.", date: "17/02/2026 11:30" },
        { id: "m5", from: "admin", text: "Le double prélèvement est confirmé. Le remboursement de 29.99€ sera effectué sous 3-5 jours ouvrés.", date: "17/02/2026 14:20" },
    ]},
    { id: "tk_003", user: "fx_trader_01", subject: "Comment changer mon email ?", category: "account", priority: "low", status: "open", createdAt: "16/02/2026 22:15", messages: [
        { id: "m6", from: "user", text: "Je voudrais mettre à jour mon adresse email de contact.", date: "16/02/2026 22:15" },
    ]},
    { id: "tk_004", user: "invest_marc", subject: "Bug affichage sur mobile", category: "bug", priority: "medium", status: "in_progress", assignedTo: "Admin Tech", createdAt: "16/02/2026 14:00", messages: [
        { id: "m7", from: "user", text: "Le graphique ne s'affiche pas correctement sur iPhone 15. Safari dernière version.", date: "16/02/2026 14:00" },
        { id: "m8", from: "admin", text: "Merci pour le signalement. Pouvez-vous nous envoyer une capture d'écran ?", date: "16/02/2026 15:00" },
        { id: "m9", from: "user", text: "Voici la capture. Le graphique déborde sur la droite.", date: "16/02/2026 15:30" },
    ]},
    { id: "tk_005", user: "gold_mike", subject: "Demande de remboursement", category: "payment", priority: "medium", status: "open", createdAt: "15/02/2026 09:30", messages: [
        { id: "m10", from: "user", text: "Je souhaite me faire rembourser mon dernier mois. Je n'ai pas utilisé le service.", date: "15/02/2026 09:30" },
        { id: "m11", from: "user", text: "Toujours pas de réponse ?", date: "16/02/2026 18:00" },
    ]},
    { id: "tk_006", user: "btc_anna", subject: "Notification ne fonctionne pas", category: "bug", priority: "low", status: "resolved", assignedTo: "Admin Tech", createdAt: "14/02/2026 11:00", messages: [
        { id: "m12", from: "user", text: "Je ne reçois plus les notifications push depuis 3 jours.", date: "14/02/2026 11:00" },
        { id: "m13", from: "admin", text: "Le problème a été identifié et corrigé. Veuillez vérifier vos paramètres de notification.", date: "14/02/2026 16:00" },
        { id: "m14", from: "user", text: "C'est résolu, merci !", date: "14/02/2026 17:00" },
    ]},
    { id: "tk_007", user: "trading_julie", subject: "Pourquoi mon compte est suspendu ?", category: "account", priority: "high", status: "closed", createdAt: "13/02/2026 16:45", messages: [
        { id: "m15", from: "user", text: "Mon compte a été suspendu sans raison. Je ne comprends pas pourquoi.", date: "13/02/2026 16:45" },
        { id: "m16", from: "admin", text: "Votre compte a été signalé pour activité suspecte. Après vérification, nous le réactivons.", date: "13/02/2026 18:00" },
        { id: "m17", from: "user", text: "Merci, je peux me reconnecter maintenant.", date: "13/02/2026 18:30" },
    ]},
];

const statusConfig = {
    open: { label: "Ouvert", color: "bg-blue-500/10 text-blue-500", icon: Clock },
    in_progress: { label: "En cours", color: "bg-amber-500/10 text-amber-500", icon: AlertTriangle },
    resolved: { label: "Résolu", color: "bg-emerald-500/10 text-emerald-500", icon: CheckCircle },
    closed: { label: "Fermé", color: "bg-b-surface1 text-t-tertiary", icon: CheckCircle },
};
const priorityConfig = { low: { label: "Faible", color: "text-t-tertiary" }, medium: { label: "Moyen", color: "text-amber-500" }, high: { label: "Urgent", color: "text-red-500" } };
const categories = ["bug", "payment", "account", "signal", "other"] as const;
const statuses = ["open", "in_progress", "resolved", "closed"] as const;
const priorities = ["low", "medium", "high"] as const;

export default function AdminTicketsPage() {
    const [tickets, setTickets] = useState(mockTickets);
    const [filter, setFilter] = useState<"all" | "open" | "in_progress" | "resolved">("all");
    const [openTicketId, setOpenTicketId] = useState<string | null>(null);
    const [reply, setReply] = useState("");
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);

    const filtered = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);
    const openTicket = openTicketId ? tickets.find((t) => t.id === openTicketId) : null;

    const sendReply = () => {
        if (!reply.trim() || !openTicketId) return;
        setTickets((prev) => prev.map((t) => t.id === openTicketId ? {
            ...t, messages: [...t.messages, { id: `m_${Date.now()}`, from: "admin" as const, text: reply, date: new Date().toLocaleString("fr-FR") }],
            ...(t.status === "open" ? { status: "in_progress" as const } : {}),
        } : t));
        setReply("");
    };

    const changeStatus = (status: Ticket["status"]) => {
        if (!openTicketId) return;
        setTickets((prev) => prev.map((t) => t.id === openTicketId ? { ...t, status } : t));
        setShowStatusMenu(false);
    };

    const changeCategory = (category: Ticket["category"]) => {
        if (!openTicketId) return;
        setTickets((prev) => prev.map((t) => t.id === openTicketId ? { ...t, category } : t));
        setShowCatMenu(false);
    };

    const changePriority = (priority: Ticket["priority"]) => {
        if (!openTicketId) return;
        setTickets((prev) => prev.map((t) => t.id === openTicketId ? { ...t, priority } : t));
        setShowPriorityMenu(false);
    };

    if (openTicket) {
        const sc = statusConfig[openTicket.status];
        const pc = priorityConfig[openTicket.priority];
        return (
            <AdminLayout title="Ticket">
                <button onClick={() => setOpenTicketId(null)} className="flex items-center gap-2 text-button text-t-secondary hover:text-t-primary mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Retour aux tickets
                </button>
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                    <div className="xl:col-span-3 space-y-4">
                        <div className="card !p-5">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h2 className="text-h6 font-bold">{openTicket.subject}</h2>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${sc.color}`}>{sc.label}</span>
                                <span className={`text-[10px] font-semibold ${pc.color}`}>● {pc.label}</span>
                            </div>
                            <p className="text-caption text-t-tertiary">{openTicket.user} • {openTicket.category} • Créé le {openTicket.createdAt} • {openTicket.messages.length} messages</p>
                        </div>

                        <div className="card !p-5 space-y-4 max-h-[500px] overflow-y-auto">
                            {openTicket.messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.from === "admin" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] p-3 rounded-xl ${msg.from === "admin" ? "bg-red-500/10 border border-red-500/15" : "bg-b-surface1 border border-s-border"}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-semibold ${msg.from === "admin" ? "text-red-500" : "text-blue-500"}`}>{msg.from === "admin" ? "Admin" : openTicket.user}</span>
                                            <span className="text-[10px] text-t-tertiary">{msg.date}</span>
                                        </div>
                                        <p className="text-body-2 text-t-primary">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {openTicket.status !== "closed" && (
                            <div className="card !p-4">
                                <div className="flex gap-3">
                                    <textarea value={reply} onChange={(e) => setReply(e.target.value)}
                                        className="flex-1 h-20 px-4 py-3 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none resize-none"
                                        placeholder="Écrire une réponse..." onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) sendReply(); }} />
                                    <button onClick={sendReply} disabled={!reply.trim()}
                                        className="self-end h-10 px-5 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0">
                                        <Send className="w-4 h-4" /> Envoyer
                                    </button>
                                </div>
                                <p className="text-[10px] text-t-tertiary mt-1">Ctrl+Entrée pour envoyer</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div className="card !p-4 space-y-3">
                            <h4 className="text-caption font-semibold text-t-tertiary uppercase tracking-wide">Statut</h4>
                            <div className="relative">
                                <button onClick={() => setShowStatusMenu(!showStatusMenu)} className={`w-full h-9 px-3 rounded-lg text-caption border flex items-center justify-between ${sc.color} border-current/20`}>
                                    <span>{sc.label}</span>
                                    <Tag className="w-3 h-3" />
                                </button>
                                {showStatusMenu && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-b-surface2 border border-s-border rounded-xl p-1 z-10 shadow-lg">
                                        {statuses.map((st) => (
                                            <button key={st} onClick={() => changeStatus(st)}
                                                className={`w-full h-8 px-3 rounded-lg text-caption text-left transition-colors ${openTicket.status === st ? "bg-b-surface1 font-semibold" : "hover:bg-b-surface1"}`}>
                                                {statusConfig[st].label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="card !p-4 space-y-3">
                            <h4 className="text-caption font-semibold text-t-tertiary uppercase tracking-wide">Priorité</h4>
                            <div className="relative">
                                <button onClick={() => setShowPriorityMenu(!showPriorityMenu)} className={`w-full h-9 px-3 rounded-lg text-caption border border-s-border flex items-center justify-between ${pc.color}`}>
                                    <span>● {pc.label}</span>
                                    <Tag className="w-3 h-3" />
                                </button>
                                {showPriorityMenu && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-b-surface2 border border-s-border rounded-xl p-1 z-10 shadow-lg">
                                        {priorities.map((pr) => (
                                            <button key={pr} onClick={() => changePriority(pr)}
                                                className={`w-full h-8 px-3 rounded-lg text-caption text-left transition-colors ${openTicket.priority === pr ? "bg-b-surface1 font-semibold" : "hover:bg-b-surface1"} ${priorityConfig[pr].color}`}>
                                                ● {priorityConfig[pr].label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="card !p-4 space-y-3">
                            <h4 className="text-caption font-semibold text-t-tertiary uppercase tracking-wide">Catégorie</h4>
                            <div className="relative">
                                <button onClick={() => setShowCatMenu(!showCatMenu)} className="w-full h-9 px-3 rounded-lg text-caption border border-s-border flex items-center justify-between text-t-secondary">
                                    <span>{openTicket.category}</span>
                                    <Tag className="w-3 h-3" />
                                </button>
                                {showCatMenu && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-b-surface2 border border-s-border rounded-xl p-1 z-10 shadow-lg">
                                        {categories.map((cat) => (
                                            <button key={cat} onClick={() => changeCategory(cat)}
                                                className={`w-full h-8 px-3 rounded-lg text-caption text-left transition-colors ${openTicket.category === cat ? "bg-b-surface1 font-semibold" : "hover:bg-b-surface1"}`}>
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="card !p-4 space-y-3">
                            <h4 className="text-caption font-semibold text-t-tertiary uppercase tracking-wide">Assigné à</h4>
                            <p className="text-body-2 text-t-primary flex items-center gap-2"><UserCog className="w-4 h-4 text-t-tertiary" /> {openTicket.assignedTo || "Non assigné"}</p>
                        </div>
                        <div className="card !p-4">
                            <h4 className="text-caption font-semibold text-t-tertiary uppercase tracking-wide mb-2">Actions rapides</h4>
                            <div className="space-y-1.5">
                                {openTicket.status !== "resolved" && <button onClick={() => changeStatus("resolved")} className="w-full h-9 px-3 rounded-lg text-caption bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5" /> Marquer résolu</button>}
                                {openTicket.status !== "closed" && <button onClick={() => changeStatus("closed")} className="w-full h-9 px-3 rounded-lg text-caption bg-b-surface1 text-t-secondary hover:text-t-primary transition-colors flex items-center gap-2"><X className="w-3.5 h-3.5" /> Fermer le ticket</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Tickets Support">
            <div className="flex flex-wrap items-center gap-2 mb-6">
                {(["all", "open", "in_progress", "resolved"] as const).map((f) => {
                    const count = f === "all" ? tickets.length : tickets.filter((t) => t.status === f).length;
                    return (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`h-9 px-4 rounded-lg text-button border transition-colors ${filter === f ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                            {f === "all" ? "Tous" : f === "open" ? "Ouverts" : f === "in_progress" ? "En cours" : "Résolus"} ({count})
                        </button>
                    );
                })}
            </div>

            <div className="space-y-2">
                {filtered.map((t) => {
                    const sc = statusConfig[t.status];
                    const pc = priorityConfig[t.priority];
                    const lastMsg = t.messages[t.messages.length - 1];
                    return (
                        <div key={t.id} className="card !p-4 hover:bg-b-surface1/30 transition-colors cursor-pointer" onClick={() => setOpenTicketId(t.id)}>
                            <div className="flex flex-col sm:flex-row items-start gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sc.color}`}>
                                    <sc.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <p className="text-body-2 font-semibold text-t-primary">{t.subject}</p>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${sc.color}`}>{sc.label}</span>
                                        <span className={`text-[10px] font-semibold ${pc.color}`}>● {pc.label}</span>
                                    </div>
                                    <p className="text-body-2 text-t-secondary truncate">{lastMsg.text}</p>
                                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                        <span className="text-caption text-t-tertiary">{t.user}</span>
                                        <span className="text-caption text-t-tertiary">•</span>
                                        <span className="text-caption text-t-tertiary">{t.category}</span>
                                        <span className="text-caption text-t-tertiary">•</span>
                                        <span className="text-caption text-t-tertiary">{t.createdAt}</span>
                                        <span className="text-caption text-t-tertiary flex items-center gap-1">
                                            <MessageSquare className="w-3 h-3" /> {t.messages.length}
                                        </span>
                                        {t.assignedTo && <span className="text-caption text-t-tertiary flex items-center gap-1"><UserCog className="w-3 h-3" /> {t.assignedTo}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <HeadphonesIcon className="w-12 h-12 text-t-tertiary/30 mx-auto mb-3" />
                    <p className="text-body-1 text-t-tertiary">Aucun ticket dans cette catégorie</p>
                </div>
            )}
        </AdminLayout>
    );
}
