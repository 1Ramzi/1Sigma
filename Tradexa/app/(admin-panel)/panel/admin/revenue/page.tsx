"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { DollarSign, TrendingUp, Users, Percent, PlusCircle, BarChart3, ArrowUpRight, ArrowDownRight, Download, Trash2, Archive, ChevronDown, ChevronUp } from "lucide-react";

type BrokerContract = {
    id: string; name: string; cpaRate: number; revSharePercent: number;
    totalClients: number; totalRevenue: number; monthlyRevenue: number[];
    pendingPayouts: number; lastPayout: string; archived: boolean;
};
type ExportEntry = { id: string; contractName: string; date: string; rows: number };

const mockContracts: BrokerContract[] = [
    { id: "b1", name: "Axi", cpaRate: 450, revSharePercent: 0, totalClients: 142, totalRevenue: 63900, monthlyRevenue: [4200, 5100, 4800, 6300, 7200, 5400, 6900, 8100, 5850, 4500, 3150, 2400], pendingPayouts: 8100, lastPayout: "01/02/2026", archived: false },
    { id: "b2", name: "PuPrime", cpaRate: 350, revSharePercent: 15, totalClients: 87, totalRevenue: 30450, monthlyRevenue: [1800, 2100, 2400, 2700, 3000, 2850, 3300, 3600, 2700, 2100, 1950, 1950], pendingPayouts: 3600, lastPayout: "28/01/2026", archived: false },
];

export default function AdminRevenuePage() {
    const [contracts, setContracts] = useState(mockContracts);
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ name: "", cpaRate: 0, revSharePercent: 0 });
    const [showArchived, setShowArchived] = useState(false);
    const [exports, setExports] = useState<ExportEntry[]>([
        { id: "ex1", contractName: "Axi", date: "2026-01-15 14:30", rows: 142 },
        { id: "ex2", contractName: "PuPrime", date: "2026-01-15 14:30", rows: 87 },
        { id: "ex3", contractName: "Tous", date: "2026-02-01 09:15", rows: 229 },
    ]);
    const [showExports, setShowExports] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const activeContracts = contracts.filter((c) => !c.archived);
    const archivedContracts = contracts.filter((c) => c.archived);
    const totalRevenue = activeContracts.reduce((a, c) => a + c.totalRevenue, 0);
    const totalClients = activeContracts.reduce((a, c) => a + c.totalClients, 0);
    const totalPending = activeContracts.reduce((a, c) => a + c.pendingPayouts, 0);
    const totalUsersOnPlatform = 1247;
    const brokerClientsPercent = ((totalClients / totalUsersOnPlatform) * 100).toFixed(1);
    const nonBrokerClients = totalUsersOnPlatform - totalClients;
    const avgCPA = activeContracts.length > 0 ? activeContracts.reduce((a, c) => a + c.cpaRate, 0) / activeContracts.length : 0;
    const potentialRevenue = Math.round(nonBrokerClients * avgCPA * 0.3);

    const addContract = () => {
        if (!form.name) return;
        setContracts((p) => [...p, { id: `b_${Date.now()}`, ...form, totalClients: 0, totalRevenue: 0, monthlyRevenue: Array(12).fill(0), pendingPayouts: 0, lastPayout: "-", archived: false }]);
        setForm({ name: "", cpaRate: 0, revSharePercent: 0 });
        setShowAdd(false);
    };

    const archiveContract = (id: string) => setContracts((p) => p.map((c) => c.id === id ? { ...c, archived: !c.archived } : c));
    const deleteContract = (id: string) => { setContracts((p) => p.filter((c) => c.id !== id)); setConfirmDelete(null); };

    const exportContract = (c: BrokerContract) => {
        const now = new Date().toISOString().slice(0, 16).replace("T", " ");
        const header = "Mois,Revenu,Clients,CPA,RevShare";
        const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
        const rows = c.monthlyRevenue.map((v, i) => `"${months[i]}","${v}€","${c.totalClients}","${c.cpaRate}€","${c.revSharePercent}%"`);
        const csv = [header, ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `revenue_${c.name}_${now.slice(0, 10)}.csv`; a.click();
        URL.revokeObjectURL(url);
        setExports((p) => [{ id: `ex_${Date.now()}`, contractName: c.name, date: now, rows: 12 }, ...p]);
    };

    const exportAll = () => {
        const now = new Date().toISOString().slice(0, 16).replace("T", " ");
        const header = "Broker,CPA,RevShare,Clients,Revenu Total,En Attente,Dernier Paiement";
        const rows = activeContracts.map((c) => `"${c.name}","${c.cpaRate}€","${c.revSharePercent}%","${c.totalClients}","${c.totalRevenue}€","${c.pendingPayouts}€","${c.lastPayout}"`);
        const csv = [header, ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = `revenue_all_${now.slice(0, 10)}.csv`; a.click();
        URL.revokeObjectURL(url);
        setExports((p) => [{ id: `ex_${Date.now()}`, contractName: "Tous", date: now, rows: activeContracts.length }, ...p]);
    };

    const ContractCard = ({ c }: { c: BrokerContract }) => {
        const lastMonth = c.monthlyRevenue[c.monthlyRevenue.length - 1];
        const prevMonth = c.monthlyRevenue[c.monthlyRevenue.length - 2];
        const growth = prevMonth > 0 ? ((lastMonth - prevMonth) / prevMonth * 100).toFixed(1) : "0";
        const isUp = lastMonth >= prevMonth;
        return (
            <div className={`card !p-5 ${c.archived ? "opacity-60" : ""}`}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center font-bold text-red-500 text-button">{c.name.slice(0, 2).toUpperCase()}</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-body-2 font-bold text-t-primary">{c.name}</h4>
                                    {c.archived && <span className="text-[10px] px-2 py-0.5 rounded-full bg-t-tertiary/10 text-t-tertiary">Archivé</span>}
                                </div>
                                <p className="text-caption text-t-tertiary">CPA: {c.cpaRate}€ {c.revSharePercent > 0 ? `+ ${c.revSharePercent}% Rev Share` : ""}</p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <button onClick={() => exportContract(c)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-b-surface1 text-t-tertiary hover:text-blue-500 transition-colors" title="Exporter CSV"><Download className="w-3.5 h-3.5" /></button>
                                <button onClick={() => archiveContract(c.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-b-surface1 text-t-tertiary hover:text-amber-500 transition-colors" title={c.archived ? "Désarchiver" : "Archiver"}><Archive className="w-3.5 h-3.5" /></button>
                                <button onClick={() => setConfirmDelete(c.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 text-t-tertiary hover:text-red-500 transition-colors" title="Supprimer"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="p-3 rounded-lg bg-b-surface1"><p className="text-[10px] text-t-tertiary uppercase">Clients</p><p className="text-body-2 font-bold">{c.totalClients}</p></div>
                            <div className="p-3 rounded-lg bg-b-surface1"><p className="text-[10px] text-t-tertiary uppercase">Revenu total</p><p className="text-body-2 font-bold text-emerald-500">{c.totalRevenue.toLocaleString()}€</p></div>
                            <div className="p-3 rounded-lg bg-b-surface1"><p className="text-[10px] text-t-tertiary uppercase">Ce mois</p><div className="flex items-center gap-1"><p className="text-body-2 font-bold">{lastMonth.toLocaleString()}€</p><span className={`text-[10px] flex items-center ${isUp ? "text-emerald-500" : "text-red-500"}`}>{isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{growth}%</span></div></div>
                            <div className="p-3 rounded-lg bg-b-surface1"><p className="text-[10px] text-t-tertiary uppercase">En attente</p><p className="text-body-2 font-bold text-amber-500">{c.pendingPayouts.toLocaleString()}€</p></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center h-8 gap-1">
                            {c.monthlyRevenue.slice(-6).map((v, i) => (
                                <div key={i} className="w-6 bg-red-500/20 rounded-sm flex items-end" style={{ height: "48px" }}>
                                    <div className="w-full bg-red-500 rounded-sm" style={{ height: `${Math.max(4, (v / Math.max(...c.monthlyRevenue)) * 48)}px` }} />
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-t-tertiary">6 derniers mois</p>
                        <p className="text-[10px] text-t-tertiary">Dernier paiement: {c.lastPayout}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout title="Revenus CPA">
            <p className="text-body-2 text-t-secondary mb-6">Suivez vos revenus par contrat CPA broker, analysez les conversions et les projections.</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="card !p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><DollarSign className="w-5 h-5 text-emerald-500" /></div><div><p className="text-caption text-t-tertiary">Revenu total</p><p className="text-h5 font-bold text-emerald-500">{totalRevenue.toLocaleString()}€</p></div></div></div>
                <div className="card !p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Users className="w-5 h-5 text-blue-500" /></div><div><p className="text-caption text-t-tertiary">Clients broker</p><p className="text-h5 font-bold">{totalClients} <span className="text-caption text-t-tertiary font-normal">/ {totalUsersOnPlatform}</span></p></div></div></div>
                <div className="card !p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Percent className="w-5 h-5 text-amber-500" /></div><div><p className="text-caption text-t-tertiary">% via broker</p><p className="text-h5 font-bold text-amber-500">{brokerClientsPercent}%</p></div></div></div>
                <div className="card !p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-red-500" /></div><div><p className="text-caption text-t-tertiary">En attente</p><p className="text-h5 font-bold text-red-500">{totalPending.toLocaleString()}€</p></div></div></div>
            </div>

            <div className="card !p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-h6 font-semibold">Prévisions de revenus</h3>
                    <span className="text-caption text-t-tertiary"><BarChart3 className="w-4 h-4 inline mr-1" />Basé sur le taux de conversion actuel</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-b-surface1 border border-s-border"><p className="text-caption text-t-tertiary mb-1">Utilisateurs sans broker</p><p className="text-h5 font-bold">{nonBrokerClients}</p><p className="text-[11px] text-t-tertiary mt-1">Sur {totalUsersOnPlatform} inscrits au total</p></div>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15"><p className="text-caption text-emerald-500 mb-1 font-medium">Revenu potentiel (30% conversion)</p><p className="text-h5 font-bold text-emerald-500">+{potentialRevenue.toLocaleString()}€</p><p className="text-[11px] text-t-tertiary mt-1">Si 30% des non-broker ouvrent un compte</p></div>
                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/15"><p className="text-caption text-purple-500 mb-1 font-medium">CPA moyen pondéré</p><p className="text-h5 font-bold text-purple-500">{avgCPA.toFixed(0)}€</p><p className="text-[11px] text-t-tertiary mt-1">Par client converti</p></div>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="text-h6 font-semibold">Contrats CPA ({activeContracts.length})</h3>
                <div className="flex gap-2">
                    <button onClick={exportAll} className="h-9 px-4 rounded-lg bg-blue-500/10 text-blue-500 text-caption font-semibold hover:bg-blue-500/20 transition-colors flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Tout exporter</button>
                    <button onClick={() => setShowExports(!showExports)} className="h-9 px-4 rounded-lg bg-b-surface2 border border-s-border text-caption text-t-secondary hover:text-t-primary transition-colors flex items-center gap-1.5">{showExports ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />} Historique ({exports.length})</button>
                    <button onClick={() => setShowAdd(!showAdd)} className="h-9 px-4 rounded-lg bg-red-500 text-white text-caption font-semibold hover:bg-red-600 transition-colors flex items-center gap-1.5"><PlusCircle className="w-3.5 h-3.5" /> Ajouter</button>
                </div>
            </div>

            {showExports && (
                <div className="card !p-4 mb-4">
                    <p className="text-caption font-semibold text-t-secondary mb-3">Historique des exports</p>
                    <div className="space-y-1.5">
                        {exports.map((ex) => (
                            <div key={ex.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-b-surface1 text-caption">
                                <Download className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                <span className="font-medium text-t-primary">{ex.contractName}</span>
                                <span className="text-t-tertiary">{ex.rows} lignes</span>
                                <span className="ml-auto text-t-tertiary text-[11px]">{ex.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showAdd && (
                <div className="card !p-5 mb-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div><label className="text-caption text-t-secondary mb-1 block">Nom du broker</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Vantage" className="w-full h-10 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none focus:border-red-500" /></div>
                        <div><label className="text-caption text-t-secondary mb-1 block">CPA (€/client)</label><input type="number" value={form.cpaRate} onChange={(e) => setForm({ ...form, cpaRate: parseFloat(e.target.value) || 0 })} className="w-full h-10 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none focus:border-red-500" /></div>
                        <div><label className="text-caption text-t-secondary mb-1 block">Rev Share (%)</label><input type="number" value={form.revSharePercent} onChange={(e) => setForm({ ...form, revSharePercent: parseFloat(e.target.value) || 0 })} className="w-full h-10 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none focus:border-red-500" /></div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowAdd(false)} className="h-10 px-5 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary transition-colors">Annuler</button>
                        <button onClick={addContract} disabled={!form.name} className="h-10 px-5 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors disabled:opacity-50">Ajouter</button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {activeContracts.map((c) => <ContractCard key={c.id} c={c} />)}
            </div>

            {archivedContracts.length > 0 && (
                <div className="mt-6">
                    <button onClick={() => setShowArchived(!showArchived)} className="flex items-center gap-2 text-caption text-t-tertiary hover:text-t-secondary transition-colors mb-3">
                        {showArchived ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        Contrats archivés ({archivedContracts.length})
                    </button>
                    {showArchived && <div className="space-y-4">{archivedContracts.map((c) => <ContractCard key={c.id} c={c} />)}</div>}
                </div>
            )}

            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setConfirmDelete(null)}>
                    <div className="card !p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-h6 font-semibold text-red-500 mb-2">Supprimer ce contrat ?</h3>
                        <p className="text-body-2 text-t-secondary mb-4">Cette action est irréversible. Les statistiques seront perdues. Pensez à archiver le contrat plutôt que de le supprimer.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDelete(null)} className="flex-1 h-11 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary transition-colors">Annuler</button>
                            <button onClick={() => deleteContract(confirmDelete)} className="flex-1 h-11 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors">Supprimer</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
