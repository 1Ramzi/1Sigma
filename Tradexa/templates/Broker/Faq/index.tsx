"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Item from "./Item";

const Faq = () => {
    const { t } = useLanguage();
    const [activeItemId, setActiveItemId] = useState<number | null>(null);

    const faqs = [
        {
            id: 1,
            title: t.faqBroker1Q,
            content: t.faqBroker1A,
        },
        {
            id: 2,
            title: t.faqBroker2Q,
            content: t.faqBroker2A,
        },
        {
            id: 3,
            title: t.faqBroker3Q,
            content: t.faqBroker3A,
        },
    ];

    const handleItemClick = (itemId: number) => {
        setActiveItemId(activeItemId === itemId ? null : itemId);
    };

    return (
        <Card title={t.faqBrokerTitle} className="mt-8">
            <div className="p-6">
                {faqs.map((item) => (
                    <Item
                        value={item}
                        isActive={activeItemId === item.id}
                        onClick={() => handleItemClick(item.id)}
                        key={item.id}
                    />
                ))}
            </div>
        </Card>
    );
};

export default Faq;
