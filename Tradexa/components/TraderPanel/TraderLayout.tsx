"use client";

import { useState } from "react";
import TraderSidebar from "./TraderSidebar";
import TraderHeader from "./TraderHeader";

type Props = { title?: string; children: React.ReactNode };

export default function TraderLayout({ title, children }: Props) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    return (
        <div className="xl:pl-64">
            <TraderSidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
            <TraderHeader title={title} onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
            <div className="pt-20 pb-5">
                <div className="w-full mx-auto px-5 max-md:px-3">{children}</div>
            </div>
        </div>
    );
}
