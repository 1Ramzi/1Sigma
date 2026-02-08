"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider disableTransitionOnChange>
            <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
    );
};

export default Providers;
