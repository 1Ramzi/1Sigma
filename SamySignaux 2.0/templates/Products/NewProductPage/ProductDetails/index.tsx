"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Field from "@/components/Field";
import Editor from "@/components/Editor";

const ProductDetails = () => {
    const { t } = useLanguage();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <Card title={t.productDetails}>
            <div className="flex flex-col gap-8 px-5 pb-5 max-lg:px-3 max-lg:pb-3">
                <Field
                    label={t.productTitle}
                    placeholder={t.productTitlePlaceholder}
                    tooltip={t.filterTooltip}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Editor
                    label={t.description}
                    tooltip={t.filterTooltip}
                    content={content}
                    onChange={setContent}
                />
            </div>
        </Card>
    );
};

export default ProductDetails;
