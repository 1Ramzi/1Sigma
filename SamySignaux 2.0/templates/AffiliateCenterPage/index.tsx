"use client";

import Layout from "@/components/Layout";
import PopularProducts from "@/components/PopularProducts";
import ProductView from "@/components/ProductView";
import Insights from "./Insights";
import Performance from "./Performance";
import CampaignEarning from "./CampaignEarning";
import CreateLink from "./CreateLink";

import { popularProducts } from "@/mocks/products";

const AffiliateCenterPage = () => {
    return (
        <Layout title="Centre d'affiliation">
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
                            title="Produits populaires"
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
