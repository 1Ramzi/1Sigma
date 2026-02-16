"use client";

import { useState } from "react";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";
import ResetPassword from "./ResetPassword";
import { useLanguage } from "@/context/LanguageContext";

const Login = ({ initialView = "signIn" }: { initialView?: "signIn" | "signUp" }) => {
    const [isSignIn, setIsSignIn] = useState(initialView === "signIn");
    const [isResetPassword, setIsResetPassword] = useState(false);
    const { t } = useLanguage();

    return (
        <div className="">
            <div className="mb-10 text-h4 text-center max-md:mb-6 max-md:text-h5">
                {isResetPassword
                    ? t.resetPasswordTitle
                    : isSignIn
                    ? t.signInToTradexa
                    : t.createAccountTitle}
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
                    <button className="flex items-center justify-center gap-3 w-full h-12 px-6 border border-s-stroke2 rounded-full text-body-2 font-semibold text-t-primary bg-b-surface1 hover:bg-b-surface2 transition-colors">
                        <svg className="size-5 shrink-0" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        {isSignIn ? t.signInWithGoogle : t.signUpWithGoogle}
                    </button>
                    <div className="mt-6 text-center text-caption text-t-tertiary">
                        {isSignIn
                            ? t.orSignInWithEmail
                            : t.orUseYourEmail}
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

