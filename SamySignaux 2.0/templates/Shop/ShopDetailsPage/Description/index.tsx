import Icon from "@/components/Icon";
import Image from "@/components/Image";

const highlights = [
    "36 Compositions",
    "Création ultra-rapide",
    "Magnifique mode clair et sombre",
    "Entièrement personnalisable",
    "Designs minimalistes et réfléchis",
];

const Description = ({}) => (
    <div className="flex text-[1.125rem] font-medium leading-[1.75rem] max-lg:block">
        <div className="grow pr-16 max-xl:pr-10 max-lg:pr-0">
            <div className="mb-8 text-h4 max-md:mb-6 max-md:text-h5">
                Aperçu
            </div>
            <div className="[&_p,&_ul]:mb-7 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:underline [&_a]:hover:no-underline [&_p:last-child,&_ul:last-child]:mb-0">
                <p>
                    Découvrez la prochaine évolution de notre premium{" "}
                    <a href="#">
                        <strong>système UI</strong>
                    </a>
                    . Bento Pro Vol.2 s'appuie sur nos principes de design minimaliste tout en{" "}
                    <strong>introduisant des compositions avancées</strong> pour
                    des expériences numériques modernes. Cette collection étendue
                    conserve notre esthétique épurée avec un support fluide des modes clair
                    et sombre, enrichie par de nouveaux composants soigneusement conçus.
                </p>
                <p>
                    Nous avons peaufiné chaque détail, des traitements de dégradés améliorés aux interactions plus sophistiquées. De nouvelles
                    dispositions de tableau de bord, des interfaces de messagerie étendues et des
                    visualisations de données innovantes offrent encore plus d'outils pour
                    créer des expériences utilisateur exceptionnelles 🚀
                </p>
                <p className="!mb-0">
                    <strong>🚀 Parfait pour :</strong>
                </p>
                <ul>
                    <li>Plateformes d'analyse</li>
                    <li>Tableaux de bord Crypto</li>
                    <li>Outils de collaboration d'équipe</li>
                    <li>Portails clients</li>
                    <li>Sites Web marketing</li>
                    <li>Systèmes de gestion de produits</li>
                </ul>
                <p>
                    Transformez votre flux de travail de conception avec notre version la plus complète
                    à ce jour. Que vous créiez des solutions fintech, des
                    plateformes sociales ou des applications d'entreprise, Bento Pro
                    Vol.2 offre une polyvalence inégalée avec une finition
                    professionnelle. 😎
                </p>
            </div>
        </div>
        <div className="shrink-0 w-91 max-lg:flex max-lg:gap-15 max-lg:w-full max-lg:mt-16 max-md:flex-col max-md:gap-8 max-md:mt-8">
            <div className="max-lg:flex-1">
                <div className="mb-8 text-h4 max-lg:mb-3 max-lg:text-h5">
                    Points forts
                </div>
                <ul>
                    {highlights.map((highlight) => (
                        <li
                            className="flex items-center py-5 border-t border-s-stroke2 first:border-t-0"
                            key={highlight}
                        >
                            <Icon
                                className="mr-3 fill-t-primary"
                                name="check-circle-fill"
                            />{" "}
                            {highlight}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-15 max-lg:flex-1 max-lg:mt-0">
                <div className="flex items-center">
                    <div className="shrink-0">
                        <Image
                            className="size-17 object-cover opacity-100 rounded-full"
                            src="/images/avatar.png"
                            width={68}
                            height={68}
                            alt="shop-banner"
                        />
                    </div>
                    <div className="grow pl-6">
                        <div className="text-h4 max-lg:text-h5">@chelsie</div>
                        <div className="text-t-secondary">Chelsie Haylie</div>
                    </div>
                </div>
                <div className="flex mt-8 border-t border-s-stroke2">
                    <div className="flex-1 pt-8 pr-8 border-r border-s-stroke2 max-md:pt-6">
                        <div className="flex items-center gap-2">
                            <div className="text-h4">4.96</div>
                            <Icon
                                className="!size-4 fill-t-primary"
                                name="star-fill"
                            />
                        </div>
                        <div>Notes</div>
                    </div>
                    <div className="flex-1 pt-8 pl-8 max-md:pt-6">
                        <div className="text-h4">8+</div>
                        <div>Années de vente</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Description;
