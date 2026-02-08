"use client";

import Layout from "@/components/Layout";
import Pricing from "./Pricing";
import Faq from "./Faq";

const SettingsPage = () => {
    return (
        <Layout title="Upgrade to Pro">
            <div className="max-w-[1200px] mx-auto card px-12 py-22 max-lg:p-8 max-lg:px-6">
                <div className="max-w-215 mx-auto">
                    <Pricing />
                    <Faq />
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
