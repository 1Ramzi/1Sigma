"use client";

import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import PopularProducts from "@/components/PopularProducts";
import RefundRequests from "@/components/RefundRequests";
import Overview from "./Overview";
import ProductView from "./ProductView";
import OverviewSlider from "./OverviewSlider";
import GetMoreCustomers from "./GetMoreCustomers";
import Comments from "./Comments";

import { popularProducts } from "@/mocks/products";

const HomePage = () => {
    const { t } = useLanguage();

    return (
        <Layout title={t.dashboard}>
            <div className="max-w-[1200px] mx-auto flex max-lg:block">
                <div className="col-left">
                    <Overview />
                    <ProductView />
                    <OverviewSlider />
                    <GetMoreCustomers />
                </div>
                <div className="col-right">
                    <PopularProducts
                        title={t.popularProducts}
                        items={popularProducts}
                    />
                    <Comments />
                    <RefundRequests />
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
