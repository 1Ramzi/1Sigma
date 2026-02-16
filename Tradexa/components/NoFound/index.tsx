import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/Button";

type NoFoundProps = {
    title: string;
};

const NoFound = ({ title }: NoFoundProps) => {
    const { t } = useLanguage();

    const result = [
        t.uiKit,
        t.illustrations,
        t.fonts,
        t.presentation,
        t.assets3d,
    ];

    return (
        <div className="pt-26 pb-32 text-center max-md:py-16">
            <div className="inline-block mb-2 text-h4">{title}</div>
            <div className="text-sub-title-1 text-t-tertiary">
                {t.tryRelatedKeywords}
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-107 mt-8 mx-auto">
                {result.map((item) => (
                    <Button
                        className="gap-2 !h-11 !px-3.5 !text-body-2 !font-normal"
                        icon="search"
                        key={item}
                        isStroke
                    >
                        {item}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default NoFound;
