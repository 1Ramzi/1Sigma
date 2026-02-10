"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { useUserStore } from "@/stores/userStore";
import { useLanguage } from "@/context/LanguageContext";

const Password = ({}) => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { updatePassword } = useUserStore();
    const { language } = useLanguage();

    const handleUpdate = async () => {
        if (!password || !newPassword || !confirmNewPassword) return;
        if (newPassword !== confirmNewPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }
        
        setLoading(true);
        const success = await updatePassword(newPassword);
        setLoading(false);
        
        if (success) {
            alert("Mot de passe mis à jour");
            setPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        }
    };

    return (
        <Card title="Sécurité">
            <div className="flex flex-col gap-8 p-5 pt-0 max-lg:px-3 max-md:gap-4">
                <Field
                    innerLabel="Mot de passe actuel"
                    placeholder="Entrez votre mot de passe"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
                    required
                    handleForgotPassword={() => {}}
                />
                <div className="flex gap-4 max-md:flex-col">
                    <Field
                        className="flex-1"
                        innerLabel="Nouveau mot de passe"
                        placeholder="Entrez le nouveau mot de passe"
                        type="password"
                        value={newPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewPassword(e.target.value)}
                        required
                    />
                    <Field
                        className="flex-1"
                        innerLabel="Confirmer le mot de passe"
                        placeholder="Confirmez le nouveau mot de passe"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                <Button 
                    className="self-start" 
                    isBlack
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    {loading 
                        ? "Mise à jour..." 
                        : "Mettre à jour le mot de passe"
                    }
                </Button>
            </div>
        </Card>
    );
};

export default Password;
