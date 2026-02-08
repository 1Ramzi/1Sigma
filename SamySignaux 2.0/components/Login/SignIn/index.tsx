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
    const { language } = useLanguage();

    const handleSubmit = async () => {
        if (!email || !password) return;
        setLoading(true);
        const success = await login(email, password);
        if (success) {
            router.push('/dashboard');
        } else {
            setLoading(false);
            alert(language === 'fr' ? "Échec de la connexion" : "Login failed");
        }
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
            <Field
                className="mt-6"
                innerLabel={language === 'fr' ? "Mot de passe" : "Password"}
                placeholder={language === 'fr' ? "Entrez votre mot de passe" : "Enter password"}
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
                required
                handleForgotPassword={handleForgotPassword}
            />
            <Button 
                className="mt-6 w-full" 
                isBlack 
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading 
                    ? (language === 'fr' ? "Connexion..." : "Signing in...") 
                    : (language === 'fr' ? "Se connecter" : "Sign in")
                }
            </Button>
            <div className="mt-4 text-center text-body-2 text-t-secondary">
                {language === 'fr' ? "Pas de compte ?" : "Need an account?"}&nbsp;
                <button
                    className="text-t-primary font-bold transition-colors hover:text-primary-01"
                    onClick={handleSignUp}
                >
                    {language === 'fr' ? "S'inscrire" : "Sign up"}
                </button>
            </div>
        </>
    );
};

export default SignIn;
