import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    title: "SamySignaux",
    description: "SamySignaux",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}

export async function generateViewport(): Promise<Viewport> {
    const userAgent = (await headers()).get("user-agent");
    const isiPhone = /iphone/i.test(userAgent ?? "");
    return isiPhone
        ? {
              width: "device-width",
              initialScale: 1,
              maximumScale: 1, // disables auto-zoom on ios safari
          }
        : {};
}
