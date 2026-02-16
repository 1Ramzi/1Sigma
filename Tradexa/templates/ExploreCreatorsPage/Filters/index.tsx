"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Field from "@/components/Field";
import Switch from "@/components/Switch";
import Tooltip from "@/components/Tooltip";
import { SelectOption } from "@/types/select";

const categories: SelectOption[] = [
    { id: 1, name: "Toutes catégories" },
    { id: 2, name: "UI design" },
    { id: 3, name: "Illustration" },
    { id: 4, name: "Branding" },
    { id: 5, name: "Animation" },
];

const ratings: SelectOption[] = [
    { id: 1, name: "4.0 et plus" },
    { id: 2, name: "3.0 à 4.0" },
    { id: 3, name: "2.0 à 3.0" },
    { id: 4, name: "1.0 à 2.0" },
    { id: 5, name: "1.0 et moins" },
];

const sortOptions: SelectOption[] = [
    { id: 1, name: "Date d'inscription" },
    { id: 2, name: "Ventes" },
    { id: 3, name: "Plus récent" },
    { id: 4, name: "Plus ancien" },
];

const Filters = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState<SelectOption>(categories[0]);
    const [rating, setRating] = useState<SelectOption>(ratings[0]);
    const [sort, setSort] = useState<SelectOption>(sortOptions[0]);
    const [location, setLocation] = useState("");
    const [featuredCreator, setFeaturedCreator] = useState(true);

    return (
        <>
            <Button
                className="max-lg:hidden"
                isWhite
                isCircle
                onClick={() => setIsOpen(true)}
            >
                <Icon name="filters" />
            </Button>
            <Modal
                classWrapper="!w-85"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                isSlidePanel
            >
                <div className="flex items-center h-23 pl-5 pr-20 pt-5 pb-6 text-h5">
                    Filtrer
                </div>
                <div className="flex flex-col gap-6 h-[calc(100svh-5.75rem)] px-5 pb-5 overflow-y-auto">
                    <Select
                        classButton="bg-b-surface2"
                        label="Catégorie"
                        tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                        value={category}
                        onChange={setCategory}
                        options={categories}
                    />
                    <Select
                        classButton="bg-b-surface2"
                        label="Note de l'auteur"
                        tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                        value={rating}
                        onChange={setRating}
                        options={ratings}
                    />
                    <Select
                        classButton="bg-b-surface2"
                        label="Trier par"
                        tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                        value={sort}
                        onChange={setSort}
                        options={sortOptions}
                    />
                    <Field
                        classInput="bg-b-surface2"
                        label="Localisation"
                        placeholder="Entrer la localisation"
                        tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <div className="flex items-center h-12 gap-4">
                        <div className="flex items-center mr-auto">
                            <div className="text-button">Créateur en vedette</div>
                            <Tooltip
                                className="ml-1.5"
                                content="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                            />
                        </div>
                        <Switch
                            checked={featuredCreator}
                            onChange={() =>
                                setFeaturedCreator(!featuredCreator)
                            }
                        />
                    </div>
                    <div className="flex gap-3 mt-auto">
                        <Button className="flex-1" isStroke>
                            Réinitialiser
                        </Button>
                        <Button className="flex-1" isBlack>
                            Appliquer le filtre
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Filters;
