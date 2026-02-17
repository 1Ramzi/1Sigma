import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../../globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";

const interDisplay = localFont({
    src: [
        { path: "../../../../public/fonts/InterDisplay-Light.woff2", weight: "300" },
        { path: "../../../../public/fonts/InterDisplay-Regular.woff2", weight: "400" },
        { path: "../../../../public/fonts/InterDisplay-Medium.woff2", weight: "500" },
        { path: "../../../../public/fonts/InterDisplay-SemiBold.woff2", weight: "600" },
        { path: "../../../../public/fonts/InterDisplay-Bold.woff2", weight: "700" },
    ],
    variable: "--font-inter-display",
});

export const metadata: Metadata = {
    title: "Tradexa - Panel Trader",
    description: "Panel de gestion des signaux Tradexa",
};

export default function TraderPanelLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${interDisplay.variable} bg-b-surface1 font-inter text-body-1 text-t-primary antialiased`}>
            <ThemeProvider disableTransitionOnChange>
                <LanguageProvider>{children}</LanguageProvider>
            </ThemeProvider>
        </div>
    );
}
