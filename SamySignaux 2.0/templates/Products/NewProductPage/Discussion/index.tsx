import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Editor from "@/components/Editor";

const Discussion = () => {
    const { t } = useLanguage();
    const [content, setContent] = useState("");

    return (
        <Card title={t.discussion}>
            <div className="flex flex-col gap-8 px-5 pb-5 max-lg:px-3 max-lg:pb-3">
                <Editor
                    label={t.messageToReviewer}
                    tooltip={t.filterTooltip}
                    content={content}
                    onChange={setContent}
                />
            </div>
        </Card>
    );
};

export default Discussion;
