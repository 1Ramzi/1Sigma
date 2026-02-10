import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import FieldFiles from "@/components/FieldFiles";

const UploadProductFiles = () => {
    const { t } = useLanguage();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (file: File | null) => {
        setFile(file);
    };

    return (
        <Card classHead="!pl-3" title={t.uploadProductFiles}>
            <div className="p-3 pt-0">
                <FieldFiles onChange={handleFileChange} />
            </div>
        </Card>
    );
};

export default UploadProductFiles;
