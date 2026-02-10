"use client";

import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import RefundRequests from "@/components/RefundRequests";
import PopularProducts from "@/components/PopularProducts";
import Balance from "./Balance";
import RecentEarnings from "./RecentEarnings";
import Transactions from "./Transactions";
import Countries from "./Countries";

import { popularProducts } from "@/mocks/products";

const EarningPage = () => {
    const { t } = useLanguage();

    return (
        <Layout title={t.earning}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                <div className="flex max-lg:block">
                    <div className="col-left">
                        <Balance />
                        <RecentEarnings />
                        <Transactions />
                    </div>
                    <div className="col-right">
                        <Countries />
                        <RefundRequests />
                        <PopularProducts
                            title={t.topEarningProducts}
                            items={popularProducts}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EarningPage;
