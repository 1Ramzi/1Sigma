"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { Plus, ArrowUp, ArrowDown, Pencil, Trash2, Video, Link2, Upload, ChevronDown, ChevronUp, Save, X, Star, Clock, BookOpen, Award } from "lucide-react";

type VideoItem = {
    id: string; name: string; duration: string; sourceType: "r2" | "link";
    sourceUrl: string; description: string; xpReward: number; order: number;
};

type Module = {
    id: string; title: string; description: string; category: string;
    videoType: "cours" | "tuto" | "live-replay" | "masterclass";
    xpRequired: number; xpTotal: number; videos: VideoItem[]; order: number;
    published: boolean;
};

const mockModules: Module[] = [
    {
        id: "mod_1", title: "Introduction au Trading", description: "Les bases fondamentales du trading pour débutants", category: "Débutant",
        videoType: "cours", xpRequired: 0, xpTotal: 150, order: 1, published: true,
        videos: [
            { id: "v1", name: "Qu'est-ce que le trading ?", duration: "8 min", sourceType: "r2", sourceUrl: "https://r2.tradexa.com/videos/intro-1.mp4", description: "Découverte des marchés financiers et du trading", xpReward: 30, order: 1 },
            { id: "v2", name: "Les marchés financiers", duration: "10 min", sourceType: "r2", sourceUrl: "https://r2.tradexa.com/videos/intro-2.mp4", description: "Forex, Crypto, Indices, Commodities", xpReward: 30, order: 2 },
            { id: "v3", name: "Types d'ordres", duration: "12 min", sourceType: "link", sourceUrl: "https://youtube.com/watch?v=abc123", description: "Market, Limit, Stop — quand les utiliser", xpReward: 30, order: 3 },
            { id: "v4", name: "Votre premier trade", duration: "8 min", sourceType: "r2", sourceUrl: "https://r2.tradexa.com/videos/intro-4.mp4", description: "Passer un ordre pas à pas", xpReward: 30, order: 4 },
            { id: "v5", name: "Gestion du risque basique", duration: "7 min", sourceType: "r2", sourceUrl: "https://r2.tradexa.com/videos/intro-5.mp4", description: "SL, TP, ratio Risk/Reward", xpReward: 30, order: 5 },
        ],
    },
    {
        id: "mod_2", title: "Analyse Technique", description: "Maîtriser les outils de l'analyse technique", category: "Intermédiaire",
        videoType: "cours", xpRequired: 150, xpTotal: 300, order: 2, published: true,
        videos: [
            { id: "v6", name: "Lire un graphique", duration: "12 min", sourceType: "r2", sourceUrl: "https://r2.tradexa.com/videos/at-1.mp4", description: "Chandeliers, timeframes, volumes", xpReward: 25, order: 1 },
            { id: "v7", name: "Supports et résistances", duration: "15 min", sourceType: "r2", sourceUrl: "https://r2.tradexa.com/videos/at-2.mp4", description: "Identifier les niveaux clés", xpReward: 25, order: 2 },
            { id: "v8", name: "RSI et MACD", duration: "14 min", sourceType: "link", sourceUrl: "https://youtube.com/watch?v=def456", description: "Les indicateurs les plus utilisés", xpReward: 25, order: 3 },
        ],
    },
    {
        id: "mod_3", title: "Psychologie du Trader", description: "Maîtriser ses émotions pour mieux trader", category: "Avancé",
        videoType: "masterclass", xpRequired: 400, xpTotal: 200, order: 3, published: false,
        videos: [
            { id: "v9", name: "FOMO et FUD", duration: "10 min", sourceType: "r2", sourceUrl: "https://r2.tradexa.com/videos/psy-1.mp4", description: "Comprendre et combattre ces biais", xpReward: 25, order: 1 },
        ],
    },
];

const categories = ["Débutant", "Intermédiaire", "Avancé", "Expert"];
const videoTypes = [
    { value: "cours", label: "Cours" },
    { value: "tuto", label: "Tutoriel" },
    { value: "live-replay", label: "Replay Live" },
    { value: "masterclass", label: "Masterclass" },
];

export default function AdminFormationsPage() {
    const [modules, setModules] = useState(mockModules);
    const [expandedId, setExpandedId] = useState<string | null>("mod_1");
    const [editingModule, setEditingModule] = useState<Module | null>(null);
    const [editingVideo, setEditingVideo] = useState<{ moduleId: string; video: VideoItem | null } | null>(null);
    const [showNewModule, setShowNewModule] = useState(false);

    const toggle = (id: string) => setExpandedId((p) => (p === id ? null : id));

    const deleteModule = (id: string) => setModules((p) => p.filter((m) => m.id !== id));
    const togglePublish = (id: string) => setModules((p) => p.map((m) => (m.id === id ? { ...m, published: !m.published } : m)));
    const deleteVideo = (moduleId: string, videoId: string) =>
        setModules((p) => p.map((m) => (m.id === moduleId ? { ...m, videos: m.videos.filter((v) => v.id !== videoId) } : m)));

    const moveModule = (id: string, dir: -1 | 1) => {
        setModules((prev) => {
            const sorted = [...prev].sort((a, b) => a.order - b.order);
            const idx = sorted.findIndex((m) => m.id === id);
            if ((dir === -1 && idx === 0) || (dir === 1 && idx === sorted.length - 1)) return prev;
            const swapIdx = idx + dir;
            const newModules = [...sorted];
            const tmpOrder = newModules[idx].order;
            newModules[idx] = { ...newModules[idx], order: newModules[swapIdx].order };
            newModules[swapIdx] = { ...newModules[swapIdx], order: tmpOrder };
            return newModules;
        });
    };

    const moveVideo = (moduleId: string, videoId: string, dir: -1 | 1) => {
        setModules((prev) => prev.map((m) => {
            if (m.id !== moduleId) return m;
            const sorted = [...m.videos].sort((a, b) => a.order - b.order);
            const idx = sorted.findIndex((v) => v.id === videoId);
            if ((dir === -1 && idx === 0) || (dir === 1 && idx === sorted.length - 1)) return m;
            const swapIdx = idx + dir;
            const newVids = [...sorted];
            const tmpOrder = newVids[idx].order;
            newVids[idx] = { ...newVids[idx], order: newVids[swapIdx].order };
            newVids[swapIdx] = { ...newVids[swapIdx], order: tmpOrder };
            return { ...m, videos: newVids };
        }));
    };

    const addModule = () => {
        const newMod: Module = {
            id: `mod_${Date.now()}`, title: "Nouveau module", description: "", category: "Débutant",
            videoType: "cours", xpRequired: 0, xpTotal: 0, order: modules.length + 1, published: false, videos: [],
        };
        setModules((p) => [...p, newMod]);
        setEditingModule(newMod);
        setShowNewModule(false);
    };

    const saveModule = (mod: Module) => {
        setModules((p) => p.map((m) => (m.id === mod.id ? mod : m)));
        setEditingModule(null);
    };

    const saveVideo = (moduleId: string, video: VideoItem) => {
        setModules((p) =>
            p.map((m) => {
                if (m.id !== moduleId) return m;
                const exists = m.videos.find((v) => v.id === video.id);
                if (exists) return { ...m, videos: m.videos.map((v) => (v.id === video.id ? video : v)) };
                return { ...m, videos: [...m.videos, video] };
            })
        );
        setEditingVideo(null);
    };

    const totalVideos = modules.reduce((a, m) => a + m.videos.length, 0);
    const totalXP = modules.reduce((a, m) => a + m.xpTotal, 0);

    return (
        <AdminLayout title="Formations">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                    <p className="text-body-2 text-t-secondary">Gérez les modules de formation, les vidéos, les points XP et l&apos;ordre d&apos;affichage.</p>
                    <p className="text-caption text-t-tertiary mt-1">Recommandation : hébergez vos vidéos sur <strong>Cloudflare R2</strong> pour de meilleures performances.</p>
                </div>
                <button onClick={addModule}
                    className="h-10 px-5 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors flex items-center gap-2 shrink-0">
                    <Plus className="w-4 h-4" /> Nouveau module
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="card !p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-red-500" /></div>
                    <div><p className="text-caption text-t-tertiary">Modules</p><p className="text-h6 font-bold">{modules.length}</p></div>
                </div>
                <div className="card !p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Video className="w-5 h-5 text-blue-500" /></div>
                    <div><p className="text-caption text-t-tertiary">Vidéos</p><p className="text-h6 font-bold">{totalVideos}</p></div>
                </div>
                <div className="card !p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Award className="w-5 h-5 text-amber-500" /></div>
                    <div><p className="text-caption text-t-tertiary">Total XP</p><p className="text-h6 font-bold">{totalXP}</p></div>
                </div>
                <div className="card !p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Star className="w-5 h-5 text-emerald-500" /></div>
                    <div><p className="text-caption text-t-tertiary">Publiés</p><p className="text-h6 font-bold">{modules.filter((m) => m.published).length}/{modules.length}</p></div>
                </div>
            </div>

            <div className="space-y-3">
                {modules.sort((a, b) => a.order - b.order).map((mod) => {
                    const expanded = expandedId === mod.id;
                    return (
                        <div key={mod.id} className="card !p-0 overflow-hidden">
                            <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => toggle(mod.id)}>
                                <div className="flex flex-col gap-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => moveModule(mod.id, -1)} className="w-6 h-5 rounded flex items-center justify-center hover:bg-b-surface1 text-t-tertiary hover:text-t-primary transition-colors" title="Monter"><ArrowUp className="w-3 h-3" /></button>
                                    <button onClick={() => moveModule(mod.id, 1)} className="w-6 h-5 rounded flex items-center justify-center hover:bg-b-surface1 text-t-tertiary hover:text-t-primary transition-colors" title="Descendre"><ArrowDown className="w-3 h-3" /></button>
                                </div>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-caption font-bold ${mod.published ? "bg-red-500/10 text-red-500" : "bg-b-surface1 text-t-tertiary"}`}>
                                    {mod.order}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-body-2 font-semibold text-t-primary">{mod.title}</p>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-b-surface1 text-t-secondary">{mod.category}</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-b-surface1 text-t-tertiary">{videoTypes.find((v) => v.value === mod.videoType)?.label}</span>
                                        {mod.published ? (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">Publié</span>
                                        ) : (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium">Brouillon</span>
                                        )}
                                    </div>
                                    <p className="text-caption text-t-tertiary mt-0.5">{mod.videos.length} vidéos · {mod.xpTotal} XP · Requis: {mod.xpRequired} XP</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => togglePublish(mod.id)} className={`h-8 px-3 rounded-lg text-[10px] font-medium transition-colors ${mod.published ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"}`}>
                                        {mod.published ? "Dépublier" : "Publier"}
                                    </button>
                                    <button onClick={() => setEditingModule(mod)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-b-surface1 text-t-tertiary hover:text-t-primary transition-colors">
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => deleteModule(mod.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 text-t-tertiary hover:text-red-500 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                {expanded ? <ChevronUp className="w-4 h-4 text-t-tertiary" /> : <ChevronDown className="w-4 h-4 text-t-tertiary" />}
                            </div>

                            {expanded && (
                                <div className="border-t border-s-border bg-b-surface1/30 p-4">
                                    {mod.description && <p className="text-body-2 text-t-secondary mb-4">{mod.description}</p>}
                                    <div className="space-y-1.5">
                                        {mod.videos.sort((a, b) => a.order - b.order).map((video) => (
                                            <div key={video.id} className="flex items-center gap-3 p-3 rounded-xl bg-b-surface2/50 hover:bg-b-surface2 transition-colors group">
                                                <div className="flex flex-col gap-0.5 shrink-0">
                                                    <button onClick={() => moveVideo(mod.id, video.id, -1)} className="w-5 h-4 rounded flex items-center justify-center hover:bg-b-surface1 text-t-tertiary hover:text-t-primary transition-colors" title="Monter"><ArrowUp className="w-2.5 h-2.5" /></button>
                                                    <button onClick={() => moveVideo(mod.id, video.id, 1)} className="w-5 h-4 rounded flex items-center justify-center hover:bg-b-surface1 text-t-tertiary hover:text-t-primary transition-colors" title="Descendre"><ArrowDown className="w-2.5 h-2.5" /></button>
                                                </div>
                                                <div className="w-7 h-7 rounded-lg bg-b-surface1 flex items-center justify-center shrink-0">
                                                    {video.sourceType === "r2" ? <Video className="w-3.5 h-3.5 text-blue-500" /> : <Link2 className="w-3.5 h-3.5 text-purple-500" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-caption font-medium text-t-primary truncate">{video.name}</p>
                                                    <p className="text-[10px] text-t-tertiary truncate">{video.description}</p>
                                                </div>
                                                <span className="text-[10px] text-t-tertiary shrink-0 flex items-center gap-1"><Clock className="w-3 h-3" /> {video.duration}</span>
                                                <span className="text-[10px] text-amber-500 font-semibold shrink-0">+{video.xpReward} XP</span>
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${video.sourceType === "r2" ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"}`}>
                                                    {video.sourceType === "r2" ? "R2" : "Lien"}
                                                </span>
                                                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                    <button onClick={() => setEditingVideo({ moduleId: mod.id, video })} className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-b-surface1 text-t-tertiary hover:text-t-primary transition-colors">
                                                        <Pencil className="w-3 h-3" />
                                                    </button>
                                                    <button onClick={() => deleteVideo(mod.id, video.id)} className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-red-500/10 text-t-tertiary hover:text-red-500 transition-colors">
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => setEditingVideo({ moduleId: mod.id, video: null })}
                                        className="mt-3 w-full h-10 rounded-xl border-2 border-dashed border-s-border hover:border-red-500/30 text-caption text-t-tertiary hover:text-red-500 flex items-center justify-center gap-2 transition-colors">
                                        <Plus className="w-3.5 h-3.5" /> Ajouter une vidéo
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {editingModule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setEditingModule(null)}>
                    <div className="card !p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-h6 font-semibold mb-4">Modifier le module</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-caption text-t-secondary mb-1.5 block">Titre</label>
                                <input type="text" value={editingModule.title} onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                                    className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-caption text-t-secondary mb-1.5 block">Description</label>
                                <textarea value={editingModule.description} onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
                                    className="w-full h-20 px-4 py-3 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-caption text-t-secondary mb-1.5 block">Catégorie</label>
                                    <select value={editingModule.category} onChange={(e) => setEditingModule({ ...editingModule, category: e.target.value })}
                                        className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none">
                                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-caption text-t-secondary mb-1.5 block">Type de vidéo</label>
                                    <select value={editingModule.videoType} onChange={(e) => setEditingModule({ ...editingModule, videoType: e.target.value as Module["videoType"] })}
                                        className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none">
                                        {videoTypes.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="text-caption text-t-secondary mb-1.5 block">Ordre</label>
                                    <input type="number" value={editingModule.order} onChange={(e) => setEditingModule({ ...editingModule, order: parseInt(e.target.value) || 1 })}
                                        className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none" />
                                </div>
                                <div>
                                    <label className="text-caption text-t-secondary mb-1.5 block">XP requis</label>
                                    <input type="number" value={editingModule.xpRequired} onChange={(e) => setEditingModule({ ...editingModule, xpRequired: parseInt(e.target.value) || 0 })}
                                        className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none" />
                                </div>
                                <div>
                                    <label className="text-caption text-t-secondary mb-1.5 block">XP total</label>
                                    <input type="number" value={editingModule.xpTotal} onChange={(e) => setEditingModule({ ...editingModule, xpTotal: parseInt(e.target.value) || 0 })}
                                        className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setEditingModule(null)} className="flex-1 h-11 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary transition-colors">Annuler</button>
                            <button onClick={() => saveModule(editingModule)} className="flex-1 h-11 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5">
                                <Save className="w-4 h-4" /> Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingVideo && (
                <EditVideoModal
                    moduleId={editingVideo.moduleId}
                    video={editingVideo.video}
                    onSave={saveVideo}
                    onClose={() => setEditingVideo(null)}
                />
            )}
        </AdminLayout>
    );
}

function EditVideoModal({ moduleId, video, onSave, onClose }: { moduleId: string; video: VideoItem | null; onSave: (mid: string, v: VideoItem) => void; onClose: () => void }) {
    const [form, setForm] = useState<VideoItem>(video || {
        id: `v_${Date.now()}`, name: "", duration: "", sourceType: "r2", sourceUrl: "",
        description: "", xpReward: 25, order: 1,
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
            <div className="card !p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-h6 font-semibold mb-4">{video ? "Modifier la vidéo" : "Ajouter une vidéo"}</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-caption text-t-secondary mb-1.5 block">Nom de la vidéo</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none"
                            placeholder="Ex: Les chandeliers japonais" />
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1.5 block">Description</label>
                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full h-16 px-4 py-2 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none resize-none"
                            placeholder="Brève description du contenu" />
                    </div>
                    <div>
                        <label className="text-caption text-t-secondary mb-1.5 block">Source</label>
                        <div className="flex gap-2 mb-2">
                            <button onClick={() => setForm({ ...form, sourceType: "r2" })}
                                className={`flex-1 h-10 rounded-lg text-caption font-medium border flex items-center justify-center gap-2 transition-colors ${form.sourceType === "r2" ? "bg-blue-500/10 border-blue-500/30 text-blue-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                                <Upload className="w-3.5 h-3.5" /> Cloudflare R2
                            </button>
                            <button onClick={() => setForm({ ...form, sourceType: "link" })}
                                className={`flex-1 h-10 rounded-lg text-caption font-medium border flex items-center justify-center gap-2 transition-colors ${form.sourceType === "link" ? "bg-purple-500/10 border-purple-500/30 text-purple-500" : "bg-b-surface1 border-s-border text-t-secondary"}`}>
                                <Link2 className="w-3.5 h-3.5" /> Lien externe
                            </button>
                        </div>
                        <input type="text" value={form.sourceUrl} onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary focus:border-red-500 outline-none font-mono text-[12px]"
                            placeholder={form.sourceType === "r2" ? "https://r2.tradexa.com/videos/..." : "https://youtube.com/watch?v=..."} />
                        {form.sourceType === "r2" && (
                            <p className="text-[10px] text-blue-500 mt-1">Recommandé : hébergement Cloudflare R2 pour un streaming rapide et pas de limites de bande passante.</p>
                        )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Durée</label>
                            <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none"
                                placeholder="12 min" />
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">XP</label>
                            <input type="number" value={form.xpReward} onChange={(e) => setForm({ ...form, xpReward: parseInt(e.target.value) || 0 })}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none" />
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Ordre</label>
                            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })}
                                className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 h-11 rounded-xl bg-b-surface2 border border-s-border text-button text-t-secondary transition-colors flex items-center justify-center gap-1.5">
                        <X className="w-4 h-4" /> Annuler
                    </button>
                    <button onClick={() => onSave(moduleId, form)} disabled={!form.name || !form.sourceUrl}
                        className="flex-1 h-11 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5">
                        <Save className="w-4 h-4" /> Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
}
