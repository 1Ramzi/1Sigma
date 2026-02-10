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
    const { t } = useLanguage();

    const handleSubmit = async () => {
        if (!email || !password || !username) return;
        setLoading(true);
        const success = await register(username, email, password);
        if (success) {
            router.push('/onboarding');
        } else {
            setLoading(false);
            alert(t.registrationFailed);
        }
    };

    return (
        <>
            <Field
                className="mt-6"
                innerLabel={t.username}
                placeholder={t.usernamePlaceholder}
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(e.target.value)}
                required
            />
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
            />
            <Button 
                className="mt-6 w-full" 
                isBlack
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading 
                    ? t.creatingAccount
                    : t.createAccount
                }
            </Button>
            <div className="mt-4 text-center text-body-2 text-t-secondary">
                {t.haveAccount}&nbsp;
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

export default CreateAccount;
