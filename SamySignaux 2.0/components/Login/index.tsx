"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Image from "@/components/Image";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";
import ResetPassword from "./ResetPassword";
import { useLanguage } from "@/context/LanguageContext";

const Login = ({ initialView = "signIn" }: { initialView?: "signIn" | "signUp" }) => {
    const [isSignIn, setIsSignIn] = useState(initialView === "signIn");
    const [isResetPassword, setIsResetPassword] = useState(false);
    const { language } = useLanguage();

    return (
        <div className="">
            <div className="mb-10 text-h4 text-center max-md:mb-6 max-md:text-h5">
                {isResetPassword
                    ? (language === 'fr' ? "Réinitialiser le mot de passe" : "Reset password")
                    : isSignIn
                    ? (language === 'fr' ? "Connexion à SamySignaux" : "Sign in to SamySignaux")
                    : (language === 'fr' ? "Créer un compte" : "Create an account")}
            </div>
            {isResetPassword ? (
                <ResetPassword
                    handleSignIn={() => {
                        setIsSignIn(true);
                        setIsResetPassword(false);
                    }}
                />
            ) : (
                <>
                    <Button className="w-full gap-2" isGray>
                        <Image
                            className="size-6 opacity-100"
                            src="/images/google.svg"
                            width={24}
                            height={24}
                            alt="Google"
                        />
                        {language === 'fr' 
                            ? (isSignIn ? "Se connecter avec Google" : "S'inscrire avec Google")
                            : (isSignIn ? "Sign in with Google" : "Sign up with Google")
                        }
                    </Button>
                    <div className="mt-6 text-center text-caption text-t-tertiary">
                        {isSignIn
                            ? (language === 'fr' ? "Ou se connecter avec un email" : "Or sign in with email")
                            : (language === 'fr' ? "Ou utiliser votre email" : "Or use your email")}
                    </div>
                    {isSignIn ? (
                        <SignIn
                            handleSignUp={() => setIsSignIn(false)}
                            handleForgotPassword={() =>
                                setIsResetPassword(true)
                            }
                        />
                    ) : (
                        <CreateAccount handleSignIn={() => setIsSignIn(true)} />
                    )}
                </>
            )}
        </div>
    );
};

export default Login;
