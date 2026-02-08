import { useState } from "react";
import Card from "@/components/Card";
import Select from "@/components/Select";
import { SelectOption } from "@/types/select";

const ctaButtons: SelectOption[] = [
    { id: 1, name: "Acheter maintenant" },
    { id: 2, name: "Acheter pour obtenir 50% de réduction" },
    { id: 3, name: "Acheter pour obtenir 25% de réduction" },
];

const Cta = () => {
    const [ctaButton, setCtaButton] = useState<SelectOption>(ctaButtons[0]);

    return (
        <Card classHead="!pl-3" title="Bouton CTA">
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
