"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Item from "./Item";

const Highlights = () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [value4, setValue4] = useState("");
    const [value5, setValue5] = useState("");

    return (
        <Card classHead="!pl-3" title="Points forts">
            <div className="flex flex-wrap gap-3 p-3">
                <Item
                    placeholder="ex. 400+ composants"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                />
                <Item
                    placeholder="ex. Polices Google gratuites"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                />
                <Item
                    placeholder="ex. 300+ icônes personnalisées"
                    value={value3}
                    onChange={(e) => setValue3(e.target.value)}
                />
                <Item
                    placeholder="ex. 800 modèles préfabriqués"
                    value={value4}
                    onChange={(e) => setValue4(e.target.value)}
                />
                <Item
                    placeholder="ex. 256+ illustrations"
                    value={value5}
                    onChange={(e) => setValue5(e.target.value)}
                />
            </div>
        </Card>
    );
};

export default Highlights;
