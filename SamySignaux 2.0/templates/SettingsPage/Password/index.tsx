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
            alert(language === 'fr' ? "Les mots de passe ne correspondent pas" : "Passwords do not match");
            return;
        }
        
        setLoading(true);
        const success = await updatePassword(newPassword);
        setLoading(false);
        
        if (success) {
            alert(language === 'fr' ? "Mot de passe mis à jour" : "Password updated");
            setPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        }
    };

    return (
        <Card title={language === 'fr' ? "Sécurité" : "Security"}>
            <div className="flex flex-col gap-8 p-5 pt-0 max-lg:px-3 max-md:gap-4">
                <Field
                    innerLabel={language === 'fr' ? "Mot de passe actuel" : "Current password"}
                    placeholder={language === 'fr' ? "Entrez votre mot de passe" : "Enter password"}
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
                    required
                    handleForgotPassword={() => {}}
                />
                <div className="flex gap-4 max-md:flex-col">
                    <Field
                        className="flex-1"
                        innerLabel={language === 'fr' ? "Nouveau mot de passe" : "New password"}
                        placeholder={language === 'fr' ? "Entrez le nouveau mot de passe" : "Enter new password"}
                        type="password"
                        value={newPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewPassword(e.target.value)}
                        required
                    />
                    <Field
                        className="flex-1"
                        innerLabel={language === 'fr' ? "Confirmer le mot de passe" : "Confirm new password"}
                        placeholder={language === 'fr' ? "Confirmez le nouveau mot de passe" : "Confirm new password"}
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
                        ? (language === 'fr' ? "Mise à jour..." : "Updating...") 
                        : (language === 'fr' ? "Mettre à jour le mot de passe" : "Update password")
                    }
                </Button>
            </div>
        </Card>
    );
};

export default Password;
