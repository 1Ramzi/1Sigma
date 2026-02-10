"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Select from "@/components/Select";
import Switch from "@/components/Switch";
import { SelectOption } from "@/types/select";

const promos: SelectOption[] = [
    { id: 1, name: "50% (max)" },
    { id: 2, name: "25% (max)" },
    { id: 3, name: "10% (max)" },
];

const Price = () => {
    const { t } = useLanguage();
    const [price, setPrice] = useState("");
    const [promo, setPromo] = useState<SelectOption>(promos[0]);
    const [promoToggle, setPromoToggle] = useState(true);

    return (
        <Card classHead="!pl-3" title={t.price}>
            <div className="p-3">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Field
                            classInput="pl-12.5"
                            label={t.priceUSD}
                            placeholder="98"
                            tooltip={t.filterTooltip}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        >
                            <div className="absolute top-1/2 -translate-y-1/2 left-1 w-10 h-10 flex items-center justify-center bg-secondary-04 rounded-full pointer-events-none">
                                <Icon
                                    className="fill-black"
                                    name="usd-circle"
                                />
                            </div>
                        </Field>
                    </div>
                    <div className="relative flex-1">
                        <Switch
                            className="absolute -top-1 right-0"
                            checked={promoToggle}
                            onChange={() => setPromoToggle(!promoToggle)}
                        />
                        <Select
                            label={t.promo}
                            tooltip={t.filterTooltip}
                            placeholder={t.selectCategory}
                            value={promo}
                            onChange={setPromo}
                            options={promos}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Price;
