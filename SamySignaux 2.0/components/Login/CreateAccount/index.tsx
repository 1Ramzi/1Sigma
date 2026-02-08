"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { useUserStore } from "@/stores/userStore";
import { useLanguage } from "@/context/LanguageContext";

type CreateAccountProps = {
    handleSignIn: () => void;
};

const CreateAccount = ({ handleSignIn }: CreateAccountProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const { register } = useUserStore();
    const router = useRouter();
    const { language } = useLanguage();

    const handleSubmit = async () => {
        if (!email || !password || !username) return;
        setLoading(true);
        const success = await register(username, email, password);
        if (success) {
            router.push('/onboarding');
        } else {
            setLoading(false);
            alert(language === 'fr' ? "Échec de l'inscription" : "Registration failed");
        }
    };

    return (
        <>
            <Field
                className="mt-6"
                innerLabel={language === 'fr' ? "Nom d'utilisateur" : "Username"}
                placeholder={language === 'fr' ? "Votre nom d'utilisateur" : "Your username"}
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(e.target.value)}
                required
            />
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
            />
            <Button 
                className="mt-6 w-full" 
                isBlack
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading 
                    ? (language === 'fr' ? "Création..." : "Creating...") 
                    : (language === 'fr' ? "Créer un compte" : "Create an account")
                }
            </Button>
            <div className="mt-4 text-center text-body-2 text-t-secondary">
                {language === 'fr' ? "Déjà un compte ?" : "Already have an account?"}&nbsp;
                <button
                    className="text-t-primary font-bold transition-colors hover:text-primary-01"
                    onClick={handleSignIn}
                >
                    {language === 'fr' ? "Se connecter" : "Sign in"}
                </button>
            </div>
        </>
    );
};

export default CreateAccount;
