"use client";

import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import Statistics from "./Statistics";
import Transactions from "./Transactions";

const StatementsPage = () => {
    const { t } = useLanguage();

    return (
        <Layout title={t.payouts}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                <Statistics />
                <Transactions />
            </div>
        </Layout>
    );
};

export default StatementsPage;
