"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { useLanguage } from "@/context/LanguageContext";

type ResetPasswordProps = {
    handleSignIn: () => void;
};

const ResetPassword = ({ handleSignIn }: ResetPasswordProps) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage();

    const handleSubmit = async () => {
        if (!email) return;
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        alert(language === 'fr' 
            ? "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation." 
            : "If an account exists with this email, you will receive a reset link."
        );
        handleSignIn();
    };

    return (
        <>
            <Field
                className="mt-6"
                innerLabel={language === 'fr' ? "Email" : "Email"}
                placeholder={language === 'fr' ? "Entrez votre email" : "Enter email"}
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)}
                required
            />
            <Button 
                className="mt-6 w-full" 
                isBlack
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading 
                    ? (language === 'fr' ? "Envoi..." : "Sending...") 
                    : (language === 'fr' ? "Vérifiez votre boîte de réception" : "Check your inbox")
                }
            </Button>
            <div className="mt-4 text-center text-body-2 text-t-secondary">
                {language === 'fr' ? "Vous avez votre mot de passe ?" : "Have your password?"}&nbsp;
                <button
                    className="text-t-primary font-bold transition-colors hover:text-primary-01"
                    onClick={handleSignIn}
                >
                    {language === 'fr' ? "Se connecter" : "Login"}
                </button>
            </div>
        </>
    );
};

export default ResetPassword;
