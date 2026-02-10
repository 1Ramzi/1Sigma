"use client";

import Layout from "@/components/Layout";
import WelcomeWidget from "./WelcomeWidget";
import VideoWidget from "./VideoWidget";
import StatsWidget from "./Stats";
import BrokerCard from "./BrokerCard";
import QuickActions from "./QuickActions";
import Onboarding from "@/components/Onboarding";
import { useDemoActivity } from "@/hooks/useDemoActivity";
import { useLanguage } from "@/context/LanguageContext";

const Dashboard = () => {
    useDemoActivity(); // Start demo activity (signals, messages)
    const { t } = useLanguage();

    return (
        <Layout title={t.dashboard}>
            <Onboarding />
            <div className="max-w-[1200px] mx-auto">
                <WelcomeWidget />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <VideoWidget />
                        <StatsWidget />
                    </div>
                    <div className="space-y-6">
                        <BrokerCard />
                        <QuickActions />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
