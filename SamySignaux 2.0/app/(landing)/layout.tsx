import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "SamySignaux 2.0 | Landing",
    description:
        "SamySignaux 2.0 - signaux trading, mentorat et exécution guidée pour traders ambitieux.",
};

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${plusJakartaSans.className} bg-b-surface1 text-t-primary`}>
            {children}
        </div>
    );
}
