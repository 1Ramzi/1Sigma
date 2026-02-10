"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { useUserStore } from "@/stores/userStore";
import { useLanguage } from "@/context/LanguageContext";

type SignInProps = {
    handleSignUp: () => void;
    handleForgotPassword: () => void;
};

const SignIn = ({ handleSignUp, handleForgotPassword }: SignInProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useUserStore();
    const router = useRouter();
    const { t } = useLanguage();

    const handleSubmit = async () => {
        if (!email || !password) return;
        setLoading(true);
        const success = await login(email, password);
        if (success) {
            router.push('/dashboard');
        } else {
            setLoading(false);
            alert(t.loginFailed);
        }
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
            <Field
                className="mt-6"
                innerLabel={t.password}
                placeholder={t.passwordPlaceholder}
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
                required
                handleForgotPassword={handleForgotPassword}
                forgotPasswordLabel={t.forgotPasswordLabel}
            />
            <Button 
                className="mt-6 w-full" 
                isBlack 
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? t.signingIn : t.signIn}
            </Button>
            <div className="mt-4 text-center text-body-2 text-t-secondary">
                {t.noAccount}&nbsp;
                <button
                    className="text-t-primary font-bold transition-colors hover:text-primary-01"
                    onClick={handleSignUp}
                >
                    {t.signUp}
                </button>
            </div>
        </>
    );
};

export default SignIn;
