"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { NumericFormat } from "react-number-format";
import Card from "@/components/Card";
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import { TabsOption } from "@/types/tabs";

import { interactions } from "@/mocks/promote";

type InteractionItemProps = {
    id: number;
    icon: string;
    name: string;
    followers: number;
    nonFollowers: number;
    percentage: number;
};

const InteractionItem = ({
    icon,
    name,
    followers,
    nonFollowers,
    percentage,
}: InteractionItemProps) => {
    const totalCount = followers + nonFollowers;
    const followersPercentage = useMemo(
        () => (followers / totalCount) * 100,
        [followers, totalCount]
    );

    return (
        <div className="flex items-center">
            <div className="flex items-center justify-center shrink-0 w-10 h-10 bg-b-surface1 rounded-full dark:bg-b-pop">
                <Icon className="!size-5 fill-t-primary" name={icon} />
            </div>
            <div className="grow pl-4">
                <div className="flex justify-between mb-2 text-sub-title-1">
                    <div>
                        {name}{" "}
                        <span className="text-t-secondary">
                            (
                            <NumericFormat
                                value={totalCount}
                                thousandSeparator=","
                                decimalScale={0}
                                fixedDecimalScale
                                displayType="text"
                            />
                            )
                        </span>
                    </div>
                    <div>{percentage}%</div>
                </div>
                <div className="relative h-3 rounded-[2px] bg-shade-09 dark:bg-shade-04">
                    <div
                        className="absolute top-0 left-0 bottom-0"
                        style={{ width: `${percentage}%` }}
                    >
                        <div
                            className="absolute top-0 left-0 bottom-0 rounded-[2px] bg-linear-to-r from-[#E1E1E1] to-shade-07 opacity-30"
                            style={{ width: `${followersPercentage}%` }}
                        />
                        <div
                            className="absolute top-0 bottom-0 right-0 rounded-[2px] bg-linear-to-r from-[#E1E1E1] to-shade-07 opacity-30"
                            style={{
                                left: `${followersPercentage}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Interactions = () => {
    const { t } = useLanguage();

    const sortOptions: TabsOption[] = [
        { id: 1, name: t.all },
        { id: 2, name: t.followers },
        { id: 3, name: t.nonFollowers },
    ];

    const [sort, setSort] = useState<TabsOption>(sortOptions[0]);

    return (
        <Card classHead="!pl-3" title={t.interactions}>
            <div className="px-3 pb-3 max-2xl:pt-3 max-md:pt-1">
                <Tabs
                    className="mb-6 max-3xl:!gap-0 max-2xl:hidden"
                    items={sortOptions}
                    value={sort}
                    setValue={setSort}
                />
                <div className="flex flex-col gap-5">
                    {interactions.map((item) => (
                        <InteractionItem key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default Interactions;
