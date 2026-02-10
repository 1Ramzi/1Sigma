"use client";

import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import CardChartPie from "@/components/CardChartPie";
import Overview from "./Overview";
import TrafficСhannel from "./TrafficСhannel";
import ActiveTimes from "./ActiveTimes";
import ShareProducts from "./ShareProducts";
import RefundRequests from "./RefundRequests";
import Countries from "./Countries";
import Messages from "./Messages";
import { devicesChartData, devicesGenderData } from "@/mocks/charts";

const OverviewPage = () => {
    const { t } = useLanguage();

    return (
        <Layout title={t.dashboard}>
            <div className="max-w-[1200px] mx-auto space-y-6">
                <div className="flex max-lg:flex-col">
                    <div className="col-left">
                        <Overview />
                        <TrafficСhannel />
                        <ActiveTimes />
                        <ShareProducts />
                    </div>
                    <div className="col-right">
                        <RefundRequests />
                        <CardChartPie title={t.devices} data={devicesChartData} />
                        <Countries />
                        <Messages />
                        <CardChartPie title={t.gender} data={devicesGenderData} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OverviewPage;
