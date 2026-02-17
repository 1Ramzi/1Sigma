import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
    title: "Tradexa - Panel Trader",
    description: "Panel de gestion des signaux de trading Tradexa",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className="bg-b-surface1 text-t-primary antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
