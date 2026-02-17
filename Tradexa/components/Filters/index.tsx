"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Range from "@/components/Range";
import Compatibility from "@/components/Compatibility";
import Tooltip from "@/components/Tooltip";
import Switch from "@/components/Switch";
import { SelectOption } from "@/types/select";

const Filters = ({}) => {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);

    const categories: SelectOption[] = [
        { id: 1, name: t.allCategories },
        { id: 2, name: t.illustrations },
        { id: 3, name: t.icons },
    ];

    const ratings: SelectOption[] = [
        { id: 1, name: t.rating4up },
        { id: 2, name: t.rating3to4 },
        { id: 3, name: t.rating2to3 },
        { id: 4, name: t.rating1to2 },
        { id: 5, name: t.rating1down },
    ];

    const [category, setCategory] = useState<SelectOption>(categories[0]);
    const [rating, setRating] = useState<SelectOption>(ratings[0]);
    const [featuredProducts, setFeaturedProducts] = useState(true);
    const [priceRange, setPriceRange] = useState([32, 88]);

    return (
        <>
            <Button
                className="ml-3 max-md:hidden"
                icon="filters"
                isWhite
                isCircle
                onClick={() => setOpen(true)}
            />
            <Modal
                classWrapper="max-w-150 !p-8 max-md:!px-4 max-md:py-6"
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className="flex flex-col gap-8">
                    <div className="flex gap-6 max-md:gap-3">
                        <div className="flex-1">
                            <Select
                                classButton="bg-b-surface2"
                                label={t.category}
                                tooltip={t.filterTooltip}
                                value={category}
                                onChange={setCategory}
                                options={categories}
                            />
                        </div>
                        <div className="flex-1">
                            <Select
                                classButton="bg-b-surface2"
                                label={t.rating}
                                tooltip={t.filterTooltip}
                                value={rating}
                                onChange={setRating}
                                options={ratings}
                            />
                        </div>
                    </div>
                    <Range
                        label={t.priceRange}
                        tooltip={t.filterTooltip}
                        prefix="$"
                        values={priceRange}
                        setValues={setPriceRange}
                        min={12}
                        max={118}
                        step={1}
                    />
                    <Compatibility classItemName="w-[calc(33.333%-0.75rem)] max-md:w-[calc(50%-0.75rem)]" />
                </div>
                <div className="flex items-center justify-between mt-13 max-md:block max-md:mt-6">
                    <div className="flex items-center gap-4 max-md:w-full max-md:h-12 max-md:mb-3">
                        <div className="flex items-center max-md:mr-auto">
                            <div className="text-button">{t.featuredProducts}</div>
                            <Tooltip
                                className="ml-1.5"
                                content={t.filterTooltip}
                            />
                        </div>
                        <Switch
                            checked={featuredProducts}
                            onChange={() =>
                                setFeaturedProducts(!featuredProducts)
                            }
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button className="max-md:flex-1 max-md:px-2" isStroke>
                            {t.reset}
                        </Button>
                        <Button className="max-md:flex-1 max-md:px-2" isBlack>
                            {(t.showResults || 'Show {{count}} results').replace('{{count}}', '80')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Filters;
