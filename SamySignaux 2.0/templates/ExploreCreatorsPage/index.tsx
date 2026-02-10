"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Tabs from "@/components/Tabs";
import Select from "@/components/Select";
import Spinner from "@/components/Spinner";
import Filters from "./Filters";
import Creator from "./Creator";
import { TabsOption } from "@/types/tabs";
import { SelectOption } from "@/types/select";

import { creators } from "@/mocks/creators";

const types: TabsOption[] = [
    { id: 1, name: "Tous" },
    { id: 2, name: "Design produit" },
    { id: 3, name: "UI design" },
    { id: 4, name: "Illustration" },
    { id: 5, name: "Branding" },
    { id: 6, name: "Animation" },
];

const sortOptions: SelectOption[] = [
    { id: 1, name: "Populaire" },
    { id: 2, name: "Plus récent" },
    { id: 3, name: "Plus ancien" },
];

const ShopPage = () => {
    const [type, setType] = useState<TabsOption>(types[0]);
    const [sort, setSort] = useState<SelectOption>(sortOptions[0]);

    return (
        <Layout hideSidebar>
            <div className="relative z-2 max-w-[1200px] mx-auto pt-25 pb-15 max-xl:pt-13 max-xl:pb-8 max-md:pt-5 max-md:pb-0">
                <div className="max-w-226 mx-auto mb-30 text-center max-xl:mb-18 max-lg:mb-13 max-md:mb-8">
                    <div className="mb-4 text-h1 max-3xl:text-h2 max-lg:text-h3 max-md:mb-2 max-md:text-h4">
                        8,356 Créateurs en ligne
                    </div>
                    <div className="text-h5 text-t-secondary max-xl:max-w-180 max-xl:mx-auto max-lg:max-w-130 max-lg:text-sub-title-1 max-md:font-normal">
                        Explorez des milliers de kits UI premium, d'illustrations et de
                        ressources numériques conçus par les meilleurs designers du
                        monde.
                    </div>
                </div>
                <div className="flex gap-3 mb-10 max-lg:block max-lg:mb-6">
                    <Tabs
                        className="mr-auto max-lg:mr-0 max-md:gap-0 max-md:-mx-3 max-md:overflow-x-auto max-md:scrollbar-none max-md:before:shrink-0 max-md:before:w-3 max-md:after:shrink-0 max-md:after:w-3"
                        classButton="px-7.5 max-lg:grow max-lg:px-6 max-md:grow-0 max-md:shrink-0 max-md:px-7.5"
                        items={types}
                        value={type}
                        setValue={setType}
                    />
                    <Select
                        className="min-w-45 max-xl:hidden"
                        classButton="border-transparent bg-b-surface2"
                        value={sort}
                        onChange={setSort}
                        options={sortOptions}
                    />
                    <Filters />
                </div>
                <div className="flex flex-col gap-6 max-md:gap-3">
                    {creators.map((creator) => (
                        <Creator value={creator} key={creator.id} />
                    ))}
                </div>
                <Spinner className="mt-10 max-xl:mt-6" />
            </div>
        </Layout>
    );
};

export default ShopPage;
