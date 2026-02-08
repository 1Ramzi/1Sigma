"use client";

import { Element } from "react-scroll";
import Layout from "@/components/Layout";
import Menu from "./Menu";
import ProfileInformation from "./ProfileInformation";
import Password from "./Password";
import Notifications from "./Notifications";
import Payment from "./Payment";

const ElementWithOffset = ({
    className,
    name,
    children,
}: {
    className?: string;
    name: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="relative">
            <Element
                className={`absolute -top-21 left-0 right-0 ${className || ""}`}
                name={name}
            ></Element>
            {children}
        </div>
    );
};

const SettingsPage = () => {
    const navigation = [
        {
            title: "Profil",
            icon: "profile",
            description: "Gérer vos informations personnelles",
            to: "profile-information",
        },
        {
            title: "Sécurité",
            icon: "lock",
            description: "Modifier votre mot de passe",
            to: "security",
        },
        {
            title: "Notifications",
            icon: "bell",
            description: "Gérer vos préférences de notifications",
            to: "notifications",
        },
        {
            title: "Paiement",
            icon: "wallet",
            description: "Gérer vos méthodes de paiement",
            to: "payment",
        },
    ];

    return (
        <Layout title="Paramètres">
            <div className="max-w-[1200px] mx-auto flex items-start max-lg:block">
                <Menu
                    profileInformationTo="profile-information"
                    items={navigation}
                />
                <div className="flex flex-col gap-3 w-[calc(100%-30rem)] pl-3 max-3xl:w-[calc(100%-25rem)] max-2xl:w-[calc(100%-18.5rem)] max-lg:w-full max-lg:pl-0">
                    <ElementWithOffset
                        className="-top-22"
                        name="profile-information"
                    >
                        <ProfileInformation />
                    </ElementWithOffset>
                    <ElementWithOffset name="security">
                        <Password />
                    </ElementWithOffset>
                    <ElementWithOffset name="notifications">
                        <Notifications />
                    </ElementWithOffset>
                    <ElementWithOffset name="payment">
                        <Payment />
                    </ElementWithOffset>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
