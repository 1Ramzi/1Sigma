"use client";

import { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { Check, X, ExternalLink, Search } from "lucide-react";

type BrokerAdhesion = {
    id: string; fullName: string; email: string; phone: string; broker: string;
    accountId: string; accountType: string; depositAmount: string; proofUrl: string;
    status: "pending" | "approved" | "rejected"; submittedAt: string; note?: string;
};

const mockAdhesions: BrokerAdhesion[] = [
    { id: "ba1", fullName: "Ahmed Benali", email: "ahmed.b@gmail.com", phone: "+33 6 12 34 56 78", broker: "Vantage", accountId: "VT-789456", accountType: "Standard", depositAmount: "500€", proofUrl: "#", status: "pending", submittedAt: "17/02/2026 14:30" },
    { id: "ba2", fullName: "Sarah Dupont", email: "sarah.d@hotmail.com", phone: "+33 7 98 76 54 32", broker: "ICMarkets", accountId: "IC-123456", accountType: "Raw Spread", depositAmount: "1,000€", proofUrl: "#", status: "pending", submittedAt: "17/02/2026 11:00" },
    { id: "ba3", fullName: "Marc Leroy", email: "marc.l@yahoo.com", phone: "+33 6 55 44 33 22", broker: "Vantage", accountId: "VT-654321", accountType: "Pro ECN", depositAmount: "2,500€", proofUrl: "#", status: "pending", submittedAt: "16/02/2026 18:45" },
    { id: "ba4", fullName: "Julie Martin", email: "julie.m@outlook.com", phone: "+33 6 11 22 33 44", broker: "Exness", accountId: "EX-987654", accountType: "Standard", depositAmount: "250€", proofUrl: "#", status: "approved", submittedAt: "15/02/2026 09:20", note: "Vérifié OK" },
    { id: "ba5", fullName: "Mike Tran", email: "mike.t@gmail.com", phone: "+33 7 66 55 44 33", broker: "ICMarkets", accountId: "IC-111222", accountType: "Standard", depositAmount: "300€", proofUrl: "#", status: "rejected", submittedAt: "14/02/2026 16:00", note: "ID compte invalide" },
    { id: "ba6", fullName: "Fatima El Amrani", email: "fatima.ea@gmail.com", phone: "+33 6 77 88 99 00", broker: "Vantage", accountId: "VT-333444", accountType: "Standard", depositAmount: "750€", proofUrl: "#", status: "approved", submittedAt: "13/02/2026 10:00", note: "Vérifié OK" },
    { id: "ba7", fullName: "Lucas Bernard", email: "lucas.b@yahoo.fr", phone: "+33 7 11 22 33 44", broker: "Exness", accountId: "EX-555666", accountType: "Pro", depositAmount: "1,500€", proofUrl: "#", status: "pending", submittedAt: "17/02/2026 08:15" },
];

export default function AdminBrokerPage() {
    const [adhesions, setAdhesions] = useState(mockAdhesions);
    const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
    const [brokerFilter, setBrokerFilter] = useState<string>("all");
    const [search, setSearch] = useState("");
    const [detailId, setDetailId] = useState<string | null>(null);

    const uniqueBrokers = Array.from(new Set(adhesions.map((a) => a.broker)));

    const handleAction = (id: string, action: "approved" | "rejected", note?: string) => {
        setAdhesions((prev) => prev.map((a) => a.id === id ? { ...a, status: action, note } : a));
        setDetailId(null);
    };

    const filtered = adhesions
        .filter((a) => filter === "all" || a.status === filter)
        .filter((a) => brokerFilter === "all" || a.broker === brokerFilter)
        .filter((a) => !search || a.fullName.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()));

    const detail = detailId ? adhesions.find((a) => a.id === detailId) : null;
    const pendingCount = adhesions.filter((a) => a.status === "pending").length;

    const statusLabel = (s: string) => {
        if (s === "pending") return { text: "En attente", cls: "bg-amber-500/10 text-amber-500" };
        if (s === "approved") return { text: "Confirmé", cls: "bg-emerald-500/10 text-emerald-500" };
        return { text: "Refusé", cls: "bg-red-500/10 text-red-500" };
    };

    return (
        <MobileLayout title="Adhésions Broker" mode="admin">
            <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-t-tertiary" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..."
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-red-500" />
            </div>

            {/* Status filter pills */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                {(["all", "pending", "approved", "rejected"] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`h-8 px-3 rounded-lg text-caption border whitespace-nowrap transition-colors ${
                            filter === f ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-b-surface1 border-s-border text-t-secondary"
                        }`}>
                        {f === "all" ? "Tous" : f === "pending" ? `En attente (${pendingCount})` : f === "approved" ? "Confirmés" : "Refusés"}
                    </button>
                ))}
            </div>

            {/* Broker filter */}
            <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] text-t-tertiary font-medium">Broker:</span>
                <select value={brokerFilter} onChange={(e) => setBrokerFilter(e.target.value)}
                    className="h-8 pl-2 pr-6 rounded-lg bg-b-surface1 border border-s-border text-caption text-t-primary outline-none appearance-none">
                    <option value="all">Tous</option>
                    {uniqueBrokers.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <span className="text-[11px] text-t-tertiary ml-auto">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
            </div>

            {/* Adhesions list */}
            <div className="space-y-2">
                {filtered.map((a) => {
                    const sl = statusLabel(a.status);
                    return (
                        <div key={a.id} className="card !p-3" onClick={() => setDetailId(a.id)}>
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-[10px] font-bold shrink-0">
                                    {a.fullName.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <p className="text-body-2 font-semibold text-t-primary truncate">{a.fullName}</p>
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${sl.cls}`}>{sl.text}</span>
                                    </div>
                                    <p className="text-[10px] text-t-tertiary">{a.broker} • {a.accountId} • {a.depositAmount}</p>
                                    <p className="text-[10px] text-t-tertiary">{a.submittedAt}</p>
                                </div>
                                {a.status === "pending" && (
                                    <div className="flex gap-1 shrink-0">
                                        <button onClick={(e) => { e.stopPropagation(); handleAction(a.id, "approved", "Vérifié OK"); }}
                                            className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); handleAction(a.id, "rejected", "Non conforme"); }}
                                            className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Detail modal */}
            {detail && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0" onClick={() => setDetailId(null)}>
                    <div className="card w-full max-w-md rounded-t-3xl rounded-b-none !p-5 max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="w-10 h-1 bg-t-tertiary/30 rounded-full mx-auto mb-4" />
                        <h3 className="text-h6 font-semibold mb-3">Détail adhésion</h3>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {[
                                { label: "Nom", value: detail.fullName },
                                { label: "Email", value: detail.email },
                                { label: "Téléphone", value: detail.phone },
                                { label: "Broker", value: detail.broker },
                                { label: "ID Compte", value: detail.accountId },
                                { label: "Type", value: detail.accountType },
                                { label: "Dépôt", value: detail.depositAmount },
                                { label: "Date", value: detail.submittedAt },
                            ].map((f, i) => (
                                <div key={i} className="p-2.5 rounded-xl bg-b-surface1">
                                    <p className="text-[10px] text-t-tertiary">{f.label}</p>
                                    <p className="text-caption font-medium text-t-primary">{f.value}</p>
                                </div>
                            ))}
                        </div>
                        <a href={detail.proofUrl} target="_blank" rel="noopener noreferrer"
                            className="w-full h-10 rounded-xl bg-b-surface1 border border-s-border text-caption text-t-secondary flex items-center justify-center gap-2 mb-3">
                            <ExternalLink className="w-4 h-4" /> Voir preuve
                        </a>
                        {detail.note && <p className="text-caption text-t-secondary mb-3 p-2.5 rounded-xl bg-b-surface1">Note: {detail.note}</p>}
                        {detail.status === "pending" ? (
                            <div className="flex gap-2">
                                <button onClick={() => handleAction(detail.id, "approved", "Vérifié OK")}
                                    className="flex-1 h-11 rounded-xl bg-emerald-500 text-white text-button font-semibold flex items-center justify-center gap-1.5">
                                    <Check className="w-4 h-4" /> Confirmer
                                </button>
                                <button onClick={() => handleAction(detail.id, "rejected", "Non conforme")}
                                    className="flex-1 h-11 rounded-xl bg-red-500 text-white text-button font-semibold flex items-center justify-center gap-1.5">
                                    <X className="w-4 h-4" /> Refuser
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setDetailId(null)} className="w-full h-11 rounded-xl bg-b-surface1 border border-s-border text-button text-t-secondary">Fermer</button>
                        )}
                    </div>
                </div>
            )}
        </MobileLayout>
    );
}
