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
    const { t } = useLanguage();

    const handleSubmit = async () => {
        if (!email) return;
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        alert(t.resetEmailSent);
        handleSignIn();
    };

    return (
        <>
            <Field
                className="mt-6"
                innerLabel={t.email}
                placeholder={t.emailPlaceholder}
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
                    ? t.emailSent 
                    : t.checkInbox
                }
            </Button>
            <div className="mt-4 text-center text-body-2 text-t-secondary">
                {t.havePassword}&nbsp;
                <button
                    className="text-t-primary font-bold transition-colors hover:text-primary-01"
                    onClick={handleSignIn}
                >
                    {t.signIn}
                </button>
            </div>
        </>
    );
};

export default ResetPassword;
