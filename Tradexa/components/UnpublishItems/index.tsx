"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Image from "@/components/Image";
import Button from "@/components/Button";

import { releasedProducts } from "@/mocks/products";

type UnpublishItemsProps = {
    items?: number[];
    image?: string;
    onClick: () => void;
    isLargeButton?: boolean;
};

const UnpublishItems = ({
    items = [],
    image,
    onClick,
    isLargeButton,
}: UnpublishItemsProps) => {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);

    return (
        <>
            {isLargeButton ? (
                <Button className="ml-3" isBlack onClick={() => setOpen(true)}>
                    {t.unpublish}
                </Button>
            ) : (
                <button className="action" onClick={() => setOpen(true)}>
                    <Icon name="trash" />
                    {t.unpublish}
                </button>
            )}
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="flex flex-wrap gap-5 mb-8 max-md:gap-3">
                    {image ? (
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                            <Image
                                className="object-cover opacity-100"
                                src={image}
                                fill
                                alt=""
                            />
                        </div>
                    ) : (
                        releasedProducts
                            .filter((product) => items.includes(product.id))
                            .map((product) => (
                                <div
                                    className="relative w-20 h-20 rounded-2xl overflow-hidden"
                                    key={product.id}
                                >
                                    <Image
                                        className="object-cover"
                                        src={product.image}
                                        fill
                                        alt={product.title}
                                    />
                                </div>
                            ))
                    )}
                </div>
                <div className="mb-4 text-h4 max-md:text-h5">
                    {(t.unpublishTitle || 'Unpublish {{count}} product(s)!').replace('{{count}}', items.length.toString())}
                </div>
                <div className="mb-8 text-body-2 font-medium text-t-tertiary">
                    {(t.unpublishDesc || 'You are unpublishing {{count}} product(s).').replace('{{count}}', items.length.toString())}
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <Button
                        className="flex-1"
                        isStroke
                        onClick={() => setOpen(false)}
                    >
                        {t.cancel}
                    </Button>
                    <Button className="flex-1" isBlack onClick={onClick}>
                        {t.letsDoIt}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default UnpublishItems;
