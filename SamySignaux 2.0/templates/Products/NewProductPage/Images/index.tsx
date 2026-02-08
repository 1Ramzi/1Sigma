import { useState } from "react";
import Card from "@/components/Card";
import FieldImage from "@/components/FieldImage";

const Images = () => {
    const [images, setImages] = useState<File[]>([]);

    const handleChangePreviews = (file: File) => {
        setImages([...images, file]);
    };

    const handleChangeFullPreviews = (file: File) => {
        setImages([...images, file]);
    };

    return (
        <Card title="Images">
            <div className="flex flex-col gap-8 px-5 pb-5 max-lg:px-3 max-lg:pb-3">
                <FieldImage
                    label="Aperçus"
                    tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                    onChange={handleChangePreviews}
                />
                <FieldImage
                    label="Aperçus complets"
                    tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                    onChange={handleChangeFullPreviews}
                />
            </div>
        </Card>
    );
};

export default Images;
