"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Item from "./Item";

const Highlights = () => {
    const { t } = useLanguage();
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [value4, setValue4] = useState("");
    const [value5, setValue5] = useState("");

    return (
        <Card classHead="!pl-3" title={t.highlights}>
            <div className="flex flex-wrap gap-3 p-3">
                <Item
                    placeholder={t.highlightPlaceholder1}
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                />
                <Item
                    placeholder={t.highlightPlaceholder2}
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                />
                <Item
                    placeholder={t.highlightPlaceholder3}
                    value={value3}
                    onChange={(e) => setValue3(e.target.value)}
                />
                <Item
                    placeholder={t.highlightPlaceholder4}
                    value={value4}
                    onChange={(e) => setValue4(e.target.value)}
                />
                <Item
                    placeholder={t.highlightPlaceholder5}
                    value={value5}
                    onChange={(e) => setValue5(e.target.value)}
                />
            </div>
        </Card>
    );
};

export default Highlights;
