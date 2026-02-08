"use client";

import Layout from "@/components/Layout";
import Statistics from "./Statistics";
import PayoutHistory from "./PayoutHistory";

const PayoutsPage = () => {
    return (
        <Layout title="Payouts">
            <div className="max-w-[1200px] mx-auto space-y-6">
                <Statistics />
                <PayoutHistory />
            </div>
        </Layout>
    );
};

export default PayoutsPage;
