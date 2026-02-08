"use client";

import Layout from "@/components/Layout";
import Statistics from "./Statistics";
import Transactions from "./Transactions";

const StatementsPage = () => {
    return (
        <Layout title="Payouts">
            <div className="max-w-[1200px] mx-auto space-y-6">
                <Statistics />
                <Transactions />
            </div>
        </Layout>
    );
};

export default StatementsPage;
