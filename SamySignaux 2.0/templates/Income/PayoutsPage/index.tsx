"use client";

import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import Statistics from "./Statistics";
import PayoutHistory from "./PayoutHistory";

const PayoutsPage = () => {
    const { t } = useLanguage();

    return (
        <Layout title={t.payouts}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                <Statistics />
                <PayoutHistory />
            </div>
        </Layout>
    );
};

export default PayoutsPage;
