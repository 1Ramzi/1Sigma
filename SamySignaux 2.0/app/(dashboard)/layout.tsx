import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import "../globals.css";

const interDisplay = localFont({
    src: [
        {
            path: "../../public/fonts/InterDisplay-Light.woff2",
            weight: "300",
        },
        {
            path: "../../public/fonts/InterDisplay-Regular.woff2",
            weight: "400",
        },
        {
            path: "../../public/fonts/InterDisplay-Medium.woff2",
            weight: "500",
        },
        {
            path: "../../public/fonts/InterDisplay-SemiBold.woff2",
            weight: "600",
        },
        {
            path: "../../public/fonts/InterDisplay-Bold.woff2",
            weight: "700",
        },
    ],
    variable: "--font-inter-display",
});

export const metadata: Metadata = {
    title: "SamySignaux 2.0",
    description: "SamySignaux 2.0",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`${interDisplay.variable} bg-b-surface1 font-inter text-body-1 text-t-primary antialiased`}
        >
            <Providers>{children}</Providers>
        </div>
    );
}
