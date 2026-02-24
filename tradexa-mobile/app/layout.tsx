import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const interDisplay = localFont({
    src: [
        { path: "../public/fonts/InterDisplay-Regular.woff2", weight: "400" },
        { path: "../public/fonts/InterDisplay-Medium.woff2", weight: "500" },
        { path: "../public/fonts/InterDisplay-SemiBold.woff2", weight: "600" },
        { path: "../public/fonts/InterDisplay-Bold.woff2", weight: "700" },
    ],
    variable: "--font-inter-display",
});

export const metadata: Metadata = {
    title: "Tradexa Mobile",
    description: "Tradexa - Interface mobile",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Tradexa",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f1f1f1" },
        { media: "(prefers-color-scheme: dark)", color: "#101010" },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`${interDisplay.variable} bg-b-surface1 font-inter text-body-1 text-t-primary antialiased`}>
                <ThemeProvider attribute="data-theme" defaultTheme="dark" disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
