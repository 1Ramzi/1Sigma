import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "@/styles/landing/slick.css";
import "react-modal-video/css/modal-video.min.css";
import "@/styles/landing/main.css";
import "@/styles/landing/app.min.css";

export const metadata: Metadata = {
    title: "SamySignaux - Accueil",
    description: "SamySignaux",
};

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="light">
            <link
                href="https://fonts.googleapis.com/css2?family=Cabin:wght@600;700&family=Inter:wght@400;500;600;700&family=Public+Sans:wght@600;700;800&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@600;700;800&display=swap"
                rel="stylesheet"
            />
            {children}
        </div>
    );
}
