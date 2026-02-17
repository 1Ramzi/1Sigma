"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { Briefcase, Check, X, ExternalLink, Search, Download, Copy, CheckCircle } from "lucide-react";

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

function CopyCell({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);
    const copy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <span className="group inline-flex items-center gap-1 cursor-pointer" onClick={copy} title="Copier">
            <span>{value}</span>
            {copied ? <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" /> : <Copy className="w-3 h-3 text-t-tertiary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />}
        </span>
    );
}

export default function AdminBrokerPage() {
    const [adhesions, setAdhesions] = useState(mockAdhesions);
    const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
    const [search, setSearch] = useState("");
    const [detailId, setDetailId] = useState<string | null>(null);

    const handleAction = (id: string, action: "approved" | "rejected", note?: string) => {
        setAdhesions((prev) => prev.map((a) => a.id === id ? { ...a, status: action, note } : a));
        setDetailId(null);
    };

    const filtered = adhesions
        .filter((a) => filter === "all" || a.status === filter)
        .filter((a) => !search || a.fullName.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()) || a.accountId.toLowerCase().includes(search.toLowerCase()));

    const detail = detailId ? adhesions.find((a) => a.id === detailId) : null;
    const pendingCount = adhesions.filter((a) => a.status === "pending").length;
    const approvedCount = adhesions.filter((a) => a.status === "approved").length;

    const statusLabel = (s: string) => {
        if (s === "pending") return { text: "En attente", cls: "bg-amber-500/10 text-amber-500" };
        if (s === "approved") return { text: "Confirmé", cls: "bg-emerald-500/10 text-emerald-500" };
        return { text: "Refusé", cls: "bg-red-500/10 text-red-500" };
    };

    const exportCSV = (type: "pending" | "approved") => {
        const items = adhesions.filter((a) => a.status === type);
        const header = "Nom,Email,Téléphone,Broker,ID Compte,Type,Dépôt,Statut,Date,Note";
        const rows = items.map((a) =>
            `"${a.fullName}","${a.email}","${a.phone}","${a.broker}","${a.accountId}","${a.accountType}","${a.depositAmount}","${statusLabel(a.status).text}","${a.submittedAt}","${a.note || ""}"`
        );
        const csv = [header, ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `adhesions_${type}_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <AdminLayout title="Adhésions Broker">
            <p className="text-body-2 text-t-secondary mb-4">
                Vérifiez que les utilisateurs se sont bien inscrits via le lien partenaire et confirmez leurs adhésions.
            </p>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
                <div className="relative flex-1 max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-t-tertiary" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher nom, email, ID..."
                        className="w-full h-10 pl-10 pr-4 rounded-xl bg-b-surface2 border border-s-border text-body-2 text-t-primary outline-none focus:border-red-500" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {(["all", "pending", "approved", "rejected"] as const).map((f) => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`h-9 px-3 rounded-lg text-caption border transition-colors ${filter === f ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                            {f === "all" ? "Tous" : f === "pending" ? `En attente (${pendingCount})` : f === "approved" ? `Confirmés (${approvedCount})` : "Refusés"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                <button onClick={() => exportCSV("pending")}
                    className="h-9 px-4 rounded-lg text-caption border border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> Exporter en attente ({pendingCount})
                </button>
                <button onClick={() => exportCSV("approved")}
                    className="h-9 px-4 rounded-lg text-caption border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> Exporter confirmés ({approvedCount})
                </button>
            </div>

            <div className="card !p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-body-2">
                        <thead>
                            <tr className="text-left text-[11px] text-t-tertiary uppercase tracking-wide border-b border-s-border bg-b-surface1">
                                <th className="p-3 font-semibold">Nom</th>
                                <th className="p-3 font-semibold">Email</th>
                                <th className="p-3 font-semibold">Tél.</th>
                                <th className="p-3 font-semibold">Broker</th>
                                <th className="p-3 font-semibold">ID Compte</th>
                                <th className="p-3 font-semibold">Type</th>
                                <th className="p-3 font-semibold">Dépôt</th>
                                <th className="p-3 font-semibold">Date</th>
                                <th className="p-3 font-semibold">Statut</th>
                                <th className="p-3 font-semibold w-32">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((a) => {
                                const sl = statusLabel(a.status);
                                return (
                                    <tr key={a.id} className="border-b border-s-border/50 last:border-0 hover:bg-b-surface1/30 transition-colors text-caption">
                                        <td className="p-3 font-medium text-t-primary whitespace-nowrap"><CopyCell value={a.fullName} /></td>
                                        <td className="p-3 text-t-secondary font-mono text-[11px]"><CopyCell value={a.email} /></td>
                                        <td className="p-3 text-t-secondary whitespace-nowrap"><CopyCell value={a.phone} /></td>
                                        <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-b-surface1 text-t-secondary text-[11px]">{a.broker}</span></td>
                                        <td className="p-3 font-mono text-t-primary"><CopyCell value={a.accountId} /></td>
                                        <td className="p-3 text-t-secondary">{a.accountType}</td>
                                        <td className="p-3 font-semibold text-emerald-500 whitespace-nowrap"><CopyCell value={a.depositAmount} /></td>
                                        <td className="p-3 text-t-tertiary whitespace-nowrap">{a.submittedAt}</td>
                                        <td className="p-3"><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${sl.cls}`}>{sl.text}</span></td>
                                        <td className="p-3">
                                            <div className="flex gap-1">
                                                {a.status === "pending" ? (
                                                    <>
                                                        <button onClick={() => handleAction(a.id, "approved", "Vérifié OK")} className="h-7 px-2 rounded-md bg-emerald-500 text-white text-[10px] font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-0.5" title="Confirmer">
                                                            <Check className="w-3 h-3" /> OK
                                                        </button>
                                                        <button onClick={() => handleAction(a.id, "rejected", "Non conforme")} className="h-7 px-2 rounded-md bg-red-500/10 text-red-500 text-[10px] font-semibold hover:bg-red-500/20 transition-colors flex items-center gap-0.5" title="Refuser">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => setDetailId(a.id)} className="h-7 px-2 rounded-md bg-b-surface1 border border-s-border text-[10px] text-t-secondary hover:text-t-primary transition-colors">
                                                        Détail
                                                    </button>
                                                )}
                                                <a href={a.proofUrl} target="_blank" rel="noopener noreferrer" className="h-7 w-7 rounded-md bg-b-surface1 border border-s-border flex items-center justify-center text-t-tertiary hover:text-t-primary transition-colors" title="Voir preuve">
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {detail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setDetailId(null)}>
                    <div className="card !p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-4">
                            <Briefcase className="w-6 h-6 text-red-500" />
                            <h3 className="text-h6 font-semibold">Détail adhésion</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {[
                                { label: "Nom", value: detail.fullName },
                                { label: "Email", value: detail.email, mono: true },
                                { label: "Téléphone", value: detail.phone },
                                { label: "Broker", value: detail.broker },
                                { label: "ID Compte", value: detail.accountId, mono: true },
                                { label: "Type", value: detail.accountType },
                                { label: "Dépôt", value: detail.depositAmount, green: true },
                                { label: "Soumis le", value: detail.submittedAt },
                            ].map((f, i) => (
                                <div key={i} className="p-3 rounded-xl bg-b-surface1">
                                    <p className="text-caption text-t-tertiary">{f.label}</p>
                                    <p className={`text-body-2 ${f.mono ? "font-mono text-[12px]" : ""} ${f.green ? "font-semibold text-emerald-500" : "font-medium"}`}>
                                        <CopyCell value={f.value} />
                                    </p>
                                </div>
                            ))}
                        </div>
                        <a href={detail.proofUrl} target="_blank" rel="noopener noreferrer"
                            className="w-full h-10 rounded-xl bg-b-surface1 border border-s-border text-button text-t-secondary hover:text-t-primary transition-colors flex items-center justify-center gap-2 mb-4">
                            <ExternalLink className="w-4 h-4" /> Voir la preuve d&apos;inscription
                        </a>
                        {detail.note && <p className="text-body-2 text-t-secondary mb-4 p-3 rounded-xl bg-b-surface1">Note: {detail.note}</p>}
                        {detail.status === "pending" ? (
                            <div className="flex gap-3">
                                <button onClick={() => handleAction(detail.id, "approved", "Vérifié OK")}
                                    className="flex-1 h-11 rounded-xl bg-emerald-500 text-white text-button font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5">
                                    <Check className="w-4 h-4" /> Confirmer
                                </button>
                                <button onClick={() => handleAction(detail.id, "rejected", "Non conforme")}
                                    className="flex-1 h-11 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5">
                                    <X className="w-4 h-4" /> Refuser
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setDetailId(null)} className="w-full h-11 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary transition-colors">Fermer</button>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
