"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import { SelectOption } from "@/types/select";

const items = [
    {
        id: 1,
        icon: "twitter",
    },
    {
        id: 2,
        icon: "threads",
    },
    {
        id: 3,
        icon: "facebook",
    },
    {
        id: 4,
        icon: "instagram",
    },
    {
        id: 5,
        icon: "mailchimp",
    },
    {
        id: 6,
        icon: "mastodon",
    },
];

const projects: SelectOption[] = [
    { id: 1, name: "Tradexa" },
    { id: 2, name: "Bento Cards" },
    { id: 3, name: "Bento Forms" },
];

const CreateLink = ({}) => {
    const { t } = useLanguage();
    const [project, setProject] = useState<SelectOption>(projects[0]);
    const [link, setLink] = useState("https://tradexa.com/join");
    const [activeIds, setActiveIds] = useState<number[]>([]);

    const handleClick = (id: number) => {
        setActiveIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <Card classHead="!pl-3" title={t.createReferralLink}>
            <div className="p-3 pb-6">
                <div className="flex flex-col gap-4 mb-6">
                    <Select
                        label={t.getLink}
                        tooltip="Maximum 100 caractÃ¨res. Pas de HTML ou d'emoji autorisÃ©"
                        value={project}
                        onChange={setProject}
                        options={projects}
                    />
                    <Field
                        classInput="truncate"
                        placeholder={t.enterLink}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        validated
                    />
                    <Button className="w-full" isBlack>
                        {t.linkCopied}
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="">
                        <div className="flex items-center mb-4">
                            <div className="text-button">{t.orPostOn}</div>
                            <Tooltip
                                className="ml-1.5"
                                content="Maximum 100 caractÃ¨res. Pas de HTML ou d'emoji autorisÃ©"
                            />
                        </div>
                        <div className="flex flex-wrap -mt-3 -mx-1.5">
                            {items.map((item) => (
                                <div
                                    className={`flex justify-center items-center w-[calc(16.666%-0.75rem)] h-12 mt-3 mx-1.5 gap-2 border rounded-full px-2.5 transition-all cursor-pointer hover:border-s-highlight max-3xl:w-[calc(33.333%-0.75rem)] ${
                                        activeIds.includes(item.id)
                                            ? "!border-s-focus"
                                            : "border-s-stroke2"
                                    }`}
                                    onClick={() => handleClick(item.id)}
                                    key={item.id}
                                >
                                    <Icon
                                        className="fill-t-primary"
                                        name={item.icon}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button className="w-full" isBlack>
                        {t.createPost}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default CreateLink;

