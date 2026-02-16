import SignalsPage from "@/templates/Signals";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <SignalsPage />
        </Suspense>
    );
}
