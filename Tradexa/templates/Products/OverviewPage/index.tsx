"use client";

import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import ProductView from "@/components/ProductView";
import Overview from "./Overview";
import ProductActivity from "./ProductActivity";
import Products from "./Products";

const OverviewPage = () => {
    const { t } = useLanguage();

    return (
        <Layout title={t.productOverview}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                <Overview />
                <div className="flex mb-3 max-lg:flex-col">
                    <ProductActivity />
                    <ProductView className="col-right" />
                </div>
                <Products />
            </div>
        </Layout>
    );
};

export default OverviewPage;
