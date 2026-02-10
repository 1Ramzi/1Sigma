"use client";

import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import PopularProducts from "@/components/PopularProducts";
import ProductView from "@/components/ProductView";
import Insights from "./Insights";
import Performance from "./Performance";
import CampaignEarning from "./CampaignEarning";
import CreateLink from "./CreateLink";

import { popularProducts } from "@/mocks/products";

const AffiliateCenterPage = () => {
    const { t } = useLanguage();

    return (
        <Layout title={t.affiliateCenter}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                <Insights />
                <div className="flex max-lg:block">
                    <div className="col-left">
                        <Performance />
                        <CampaignEarning />
                    </div>
                    <div className="col-right">
                        <CreateLink />
                        <PopularProducts
                            title={t.popularProducts}
                            items={popularProducts}
                        />
                        <ProductView />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AffiliateCenterPage;
