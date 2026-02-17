"use client";

import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <AdminLayout title="Paramètres">
            <div className="max-w-2xl space-y-4">
                <div className="card !p-6">
                    <h3 className="text-h6 font-semibold mb-4">Paramètres Généraux</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Nom de la plateforme</label>
                            <input type="text" defaultValue="Tradexa" className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none" />
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Commission traders (%)</label>
                            <input type="number" defaultValue="30" className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none" />
                        </div>
                        <div>
                            <label className="text-caption text-t-secondary mb-1.5 block">Max signaux actifs par trader</label>
                            <input type="number" defaultValue="10" className="w-full h-11 px-4 rounded-xl bg-b-surface1 border border-s-border text-body-2 text-t-primary outline-none" />
                        </div>
                    </div>
                </div>
                <button className="w-full h-12 rounded-xl bg-red-500 text-white text-button font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> Enregistrer
                </button>
            </div>
        </AdminLayout>
    );
}
