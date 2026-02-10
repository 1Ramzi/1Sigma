"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Percentage from "@/components/Percentage";
import Tabs from "@/components/Tabs";
import { SelectOption } from "@/types/select";
import { TabsOption } from "@/types/tabs";

import { productActivity } from "@/mocks/products";

const durations: SelectOption[] = [
    { id: 1, name: "2 dernières semaines" },
    { id: 2, name: "Dernier mois" },
    { id: 3, name: "Dernière année" },
];

const categories: TabsOption[] = [
    { id: 1, name: "Produit" },
    { id: 2, name: "Vues" },
    { id: 3, name: "J'aime" },
];

const ProductActivity = ({}) => {
    const [duration, setDuration] = useState<SelectOption>(durations[0]);
    const [category, setCategory] = useState<TabsOption>(categories[0]);

    return (
        <Card
            className="col-left mb-0 max-lg:mb-3"
            title="Activité du produit"
            selectValue={duration}
            selectOnChange={setDuration}
            selectOptions={durations}
        >
            <Tabs
                className="hidden px-3 max-md:flex"
                classButton="flex-1"
                items={categories}
                value={category}
                setValue={setCategory}
            />
            <div className="p-5 pb-0 max-md:pt-4 max-lg:px-3">
                <div className="flex items-center gap-6 h-14 text-caption text-t-tertiary/80">
                    <div className="flex-1">Semaine</div>
                    <div
                        className={`flex-1 ${
                            category.id === 1 ? "max-md:block" : "max-md:hidden"
                        }`}
                    >
                        Produits
                    </div>
                    <div
                        className={`flex-1 ${
                            category.id === 2 ? "max-md:block" : "max-md:hidden"
                        }`}
                    >
                        Vues
                    </div>
                    <div
                        className={`flex-1 ${
                            category.id === 3 ? "max-md:block" : "max-md:hidden"
                        }`}
                    >
                        J'aime
                    </div>
                    <div className="flex-1 max-2xl:hidden">Commentaires</div>
                </div>
                {productActivity.map((item) => (
                    <div
                        className="flex items-center gap-6 h-17 border-t border-s-subtle text-body-2 last:h-19"
                        key={item.id}
                    >
                        <div className="flex items-center flex-1">
                            {item.week}
                        </div>
                        <div
                            className={`flex items-center gap-2 flex-1 ${
                                category.id === 1
                                    ? "max-md:flex"
                                    : "max-md:hidden"
                            }`}
                        >
                            {item.products.counter}
                            {item.products.percentage && (
                                <Percentage value={item.products.percentage} />
                            )}
                        </div>
                        <div
                            className={`flex items-center gap-2 flex-1 ${
                                category.id === 2
                                    ? "max-md:flex"
                                    : "max-md:hidden"
                            }`}
                        >
                            {item.views.counter}
                            {item.views.percentage && (
                                <Percentage value={item.views.percentage} />
                            )}
                        </div>
                        <div
                            className={`flex items-center gap-2 flex-1 ${
                                category.id === 3
                                    ? "max-md:flex"
                                    : "max-md:hidden"
                            }`}
                        >
                            {item.likes.counter}
                            {item.likes.percentage && (
                                <Percentage value={item.likes.percentage} />
                            )}
                        </div>
                        <div className="flex items-center gap-2 flex-1 max-2xl:hidden">
                            {item.comments.counter}
                            {item.comments.percentage && (
                                <Percentage value={item.comments.percentage} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default ProductActivity;
