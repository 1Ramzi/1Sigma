import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import CountryItem from "@/components/CountryItem";
import { SelectOption } from "@/types/select";

import { countriesEarnings } from "@/mocks/countries";

const Countries = ({}) => {
    const { t } = useLanguage();

    const durations: SelectOption[] = [
        { id: 1, name: t.last7Days },
        { id: 2, name: t.lastMonth },
        { id: 3, name: t.lastYear },
    ];

    const [duration, setDuration] = useState<SelectOption>(durations[2]);

    return (
        <Card
            classHead="!pl-3"
            title={t.countries}
            selectValue={duration}
            selectOnChange={setDuration}
            selectOptions={durations}
        >
            <div className="flex flex-col gap-5 p-3 pb-5">
                {countriesEarnings.map((country) => (
                    <CountryItem key={country.id} value={country} />
                ))}
            </div>
        </Card>
    );
};

export default Countries;
