import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import FieldImage from "@/components/FieldImage";

const Images = () => {
    const { t } = useLanguage();
    const [images, setImages] = useState<File[]>([]);

    const handleChangePreviews = (file: File) => {
        setImages([...images, file]);
    };

    const handleChangeFullPreviews = (file: File) => {
        setImages([...images, file]);
    };

    return (
        <Card title={t.images}>
            <div className="flex flex-col gap-8 px-5 pb-5 max-lg:px-3 max-lg:pb-3">
                <FieldImage
                    label={t.previews}
                    tooltip={t.filterTooltip}
                    onChange={handleChangePreviews}
                />
                <FieldImage
                    label={t.fullPreviews}
                    tooltip={t.filterTooltip}
                    onChange={handleChangeFullPreviews}
                />
            </div>
        </Card>
    );
};

export default Images;
