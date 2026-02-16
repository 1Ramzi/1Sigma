import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Select from "@/components/Select";
import { SelectOption } from "@/types/select";

const Cta = () => {
    const { t } = useLanguage();

    const ctaButtons: SelectOption[] = [
        { id: 1, name: t.buyNow },
        { id: 2, name: t.buyFor50Off },
        { id: 3, name: t.buyFor25Off },
    ];

    const [ctaButton, setCtaButton] = useState<SelectOption>(ctaButtons[0]);

    return (
        <Card classHead="!pl-3" title={t.ctaButton}>
            <div className="p-3">
                <Select
                    value={ctaButton}
                    onChange={setCtaButton}
                    options={ctaButtons}
                />
            </div>
        </Card>
    );
};

export default Cta;
