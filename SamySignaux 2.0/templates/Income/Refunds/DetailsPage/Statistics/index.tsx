import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Tooltip from "@/components/Tooltip";

type ParamenterProps = {
    label: string;
    tooltip?: string;
    content: React.ReactNode;
};

const Paramenter = ({ label, tooltip, content }: ParamenterProps) => {
    return (
        <div className="flex justify-between items-center gap-8 px-8 py-5 border-t border-s-subtle max-2xl:px-5 max-lg:w-1/2 max-lg:even:border-l max-lg:even:border-s-subtle max-md:w-full max-md:min-h-13 max-md:p-3 max-md:even:border-l-0">
            <div className="flex items-center gap-2 text-body-2 text-t-secondary">
                {label}
                {tooltip && (
                    <Tooltip className="opacity-100" content={tooltip}>
                        <Icon className="!size-5 fill-[#6F767E]" name="info" />
                    </Tooltip>
                )}
            </div>
            <div className="text-button">{content}</div>
        </div>
    );
};

const Statistics = ({}) => {
    return (
        <div className="shrink-0 w-150 border-1 border-s-stroke2 rounded-4xl overflow-hidden max-4xl:w-132 max-3xl:w-120 max-2xl:w-100 max-lg:w-full">
            <div className="flex items-center gap-8 p-8 max-2xl:gap-4 max-2xl:p-5 max-md:p-3">
                <div className="shrink-0">
                    <Image
                        className="size-22 rounded-xl opacity-100 object-cover max-md:size-18"
                        src="/images/products/2.png"
                        width={88}
                        height={88}
                        alt=""
                    />
                </div>
                <div className="grow">
                    <div className="mb-2 label label-yellow">En cours</div>
                    <div className="text-h5 max-2xl:text-h6">
                        Dynamic UI Design Kit
                    </div>
                </div>
            </div>
            <div className="bg-shade-09/30 max-lg:flex max-lg:flex-wrap max-md:block dark:bg-shade-02">
                <Paramenter label="Demande envoyée" content="20 Août, 2025" />
                <Paramenter label="Raison" content="Lien de téléchargement cassé" />
                <Paramenter
                    label="Produit téléchargé"
                    content={<div className="label label-green">Oui</div>}
                />
                <Paramenter label="Date d'achat" content="01 Juil, 2025" />
                <Paramenter
                    label="Code d'achat"
                    content="6373ads-hd73h-8373DS"
                />
                <Paramenter label="ID Demande" content="8975ads-hd73h-8974DS" />
                <Paramenter
                    label="Frais de marché"
                    content="$7.28"
                    tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                />
                <Paramenter
                    label="Prix"
                    content="$72.88"
                    tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                />
            </div>
        </div>
    );
};

export default Statistics;
