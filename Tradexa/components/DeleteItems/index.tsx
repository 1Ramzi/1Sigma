"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Image from "@/components/Image";
import Button from "@/components/Button";

type DeleteItemsProps = {
    counter?: number;
    onDelete: () => void;
    isLargeButton?: boolean;
    content?: string;
};

const DeleteItems = ({
    counter = 1,
    onDelete,
    isLargeButton,
    content,
}: DeleteItemsProps) => {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);

    return (
        <>
            {isLargeButton ? (
                <Button isStroke onClick={() => setOpen(true)}>
                    {t.delete}
                </Button>
            ) : (
                <button className="action" onClick={() => setOpen(true)}>
                    <Icon name="trash" />
                    {t.delete}
                </button>
            )}
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="flex justify-center items-center size-16 mb-8 bg-primary-03/15 rounded-full">
                    <Image
                        className="size-6 opacity-100"
                        src="/images/icons/warning.svg"
                        width={24}
                        height={24}
                        alt=""
                    />
                </div>
                <div className="mb-4 text-h4 max-md:text-h5">{t.areYouSure}</div>
                <div className="mb-8 text-body-2 font-medium text-t-tertiary">
                    {content ||
                        (t.deleteConfirmation || 'This will delete {{count}} product(s).').replace('{{count}}', counter.toString())}
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <Button
                        className="flex-1"
                        isStroke
                        onClick={() => setOpen(false)}
                    >
                        {t.cancel}
                    </Button>
                    <Button className="flex-1" isBlack onClick={onDelete}>
                        {t.delete}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default DeleteItems;
