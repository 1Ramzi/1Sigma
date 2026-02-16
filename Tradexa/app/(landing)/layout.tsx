import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Tradexa 2.0 | Landing",
    description:
        "Tradexa 2.0 - signaux trading, mentorat et exÃ©cution guidÃ©e pour traders ambitieux.",
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

