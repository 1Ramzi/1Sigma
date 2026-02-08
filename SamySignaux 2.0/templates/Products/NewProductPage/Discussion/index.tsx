import { useState } from "react";
import Card from "@/components/Card";
import Editor from "@/components/Editor";

const Discussion = () => {
    const [content, setContent] = useState("");

    return (
        <Card title="Discussion">
            <div className="flex flex-col gap-8 px-5 pb-5 max-lg:px-3 max-lg:pb-3">
                <Editor
                    label="Message au réviseur"
                    tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                    content={content}
                    onChange={setContent}
                />
            </div>
        </Card>
    );
};

export default Discussion;
