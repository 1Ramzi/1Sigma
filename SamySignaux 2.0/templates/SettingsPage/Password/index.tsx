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
    const { t } = useLanguage();

    const handleUpdate = async () => {
        if (!password || !newPassword || !confirmNewPassword) return;
        if (newPassword !== confirmNewPassword) {
            alert(t.passwordMismatch);
            return;
        }
        
        setLoading(true);
        const success = await updatePassword(newPassword);
        setLoading(false);
        
        if (success) {
            alert(t.passwordUpdated);
            setPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        }
    };

    return (
        <Card title={t.security}>
            <div className="flex flex-col gap-8 p-5 pt-0 max-lg:px-3 max-md:gap-4">
                <Field
                    innerLabel={t.currentPassword}
                    placeholder={t.passwordPlaceholder}
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
                    required
                    handleForgotPassword={() => {}}
                />
                <div className="flex gap-4 max-md:flex-col">
                    <Field
                        className="flex-1"
                        innerLabel={t.newPassword}
                        placeholder={t.enterNewPassword}
                        type="password"
                        value={newPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewPassword(e.target.value)}
                        required
                    />
                    <Field
                        className="flex-1"
                        innerLabel={t.confirmPassword}
                        placeholder={t.confirmNewPasswordPlaceholder}
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
                        ? t.updating 
                        : t.updatePassword
                    }
                </Button>
            </div>
        </Card>
    );
};

export default Password;
