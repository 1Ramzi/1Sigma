import Image from "@/common/component/element/Image";
import React from "react";
import { WiDayCloudy } from "react-icons/wi";
import { FaCode } from "react-icons/fa";
import ComponentTransition from "@/common/component/element/ComponentTransition";

const Card = () => {
  return (
    <div className="py-10 flex gap-10 justify-center flex-row flex-wrap relative">
      <div className="absolute  z-[-9] glowbg w-[100%] md:w-[500px] h-[400px]  left-0 "></div>
      <ComponentTransition className="w-full overflow-hidden px-10 py-5 md:basis-[30%] h-[300px] bg-neutral-100 dark:bg-neutral-950/50 backdrop-blur-sm border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl">
        <WiDayCloudy size={50} />
        <h1 className="text-2xl font-bold py-2 text-neutral-800 dark:text-neutral-100">
          Signaux Intelligents
        </h1>
        <h2 className="text-sm text-neutral-800 dark:text-neutral-300">
          Boostez vos trades avec Tradexa !
        </h2>
        <p className="text-base text-neutral-700 dark:text-neutral-400 mt-5 md:line-clamp-2 lg:line-clamp-4 line-clamp-3">
          Des signaux de trading en temps réel propulsés par notre IA,
          avec un taux de réussite vérifié de 78%+.
        </p>
      </ComponentTransition>
      <ComponentTransition
        delay={0.2}
        className="w-full h-auto md:h-[300px] md:basis-[65%] overflow-hidden bg-neutral-100 border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <Image
          src="/img1.png"
          alt="Header Image"
          width={400}
          height={400}
          loading="lazy"
          className="w-full object-cover scale-110"
        />
      </ComponentTransition>
      <ComponentTransition
        delay={0.1}
        className="w-full h-auto object-cover md:basis-[30%] overflow-hidden  border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <Image
          src="/img.png"
          alt="Header Image"
          width={400}
          height={400}
          loading="lazy"
          className="w-auto h-auto object-cover scale-110"
        />
      </ComponentTransition>
      <ComponentTransition
        delay={0.1}
        className="w-full h-[250px]  px-10 py-5 md:basis-[30%] overflow-hidden  border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <FaCode size={40} />
        <h1 className="text-xl font-bold py-2 text-neutral-800 dark:text-neutral-100">
          Analyse IA
        </h1>
        <h2 className="text-sm text-neutral-700 dark:text-neutral-300">
          Votre passerelle vers le trading intelligent
        </h2>
        <p className="text-sm text-neutral-700 line-clamp-2 dark:text-neutral-400 mt-3">
          Notre IA analyse des millions de données pour générer des signaux précis sur tous les marchés financiers.
        </p>
      </ComponentTransition>

      <ComponentTransition
        delay={0.1}
        className="w-full h-[250px]  px-10 py-5 md:basis-[30%] relative overflow-hidden  border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <div className="absolute  glowbg inset-0  left-0 "></div>
        <FaCode size={40} />
        <h1 className="text-xl font-bold py-2 text-neutral-800 dark:text-neutral-100">
          Gestion des Risques
        </h1>
        <h2 className="text-sm text-neutral-700 dark:text-neutral-300">
          Tradexa - Redéfinir la performance
        </h2>
        <p className="text-sm text-neutral-700 line-clamp-2 dark:text-neutral-400 mt-3">
          Stop loss et take profits intégrés dans chaque signal pour protéger votre capital.
        </p>
      </ComponentTransition>

      <ComponentTransition
        delay={0.1}
        className="w-full h-[250px]  px-10 py-5 md:basis-[30%] overflow-hidden dark:bg-[#0a0a0a] border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <FaCode size={40} />
        <h1 className="text-xl font-bold py-2 text-neutral-800 dark:text-neutral-100">
          Simplifier, Optimiser, Réussir
        </h1>
        <h2 className="text-sm text-neutral-700 dark:text-neutral-300">
          Votre accès direct au succès
        </h2>
        <p className="text-sm text-neutral-700 line-clamp-2 dark:text-neutral-400 mt-3">
          Simplifiez votre expérience de trading avec Tradexa, où performance et simplicité se rencontrent.
        </p>
      </ComponentTransition>
      <ComponentTransition
        delay={0.1}
        className="w-full h-[250px]  px-10 py-5 md:basis-[30%] overflow-hidden dark:bg-[#0a0a0a] border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <FaCode size={40} />
        <h1 className="text-xl font-bold py-2 text-neutral-800 dark:text-neutral-100">
        Communauté Active
        </h1>
        <h2 className="text-sm text-neutral-700 dark:text-neutral-300">
        Tradexa - Votre partenaire stratégique
        </h2>
        <p className="text-sm text-neutral-700 line-clamp-2 dark:text-neutral-400 mt-3">
        Tradexa est bien plus qu&rsquo;une plateforme : c&rsquo;est votre partenaire pour atteindre l&rsquo;excellence en trading.
        </p>
      </ComponentTransition>
      <ComponentTransition
        delay={0.1}
        className="w-full h-[250px]  px-10 py-5 md:basis-[30%] overflow-hidden dark:bg-[#0a0a0a] border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <FaCode size={40} />
        <h1 className="text-xl font-bold py-2 text-neutral-800 dark:text-neutral-100">
        Académie de Trading
        </h1>
        <h2 className="text-sm text-neutral-700 dark:text-neutral-300">
        Formez-vous avec les meilleurs !
        </h2>
        <p className="text-sm text-neutral-700 line-clamp-2 dark:text-neutral-400 mt-3">
        Des modules structurés pour passer de débutant à trader confirmé avec suivi de progression.
        </p>
      </ComponentTransition>
      <ComponentTransition
        delay={0.1}
        className="w-full h-[250px]  px-10 py-5 md:basis-[30%] overflow-hidden dark:bg-[#0a0a0a] border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <FaCode size={40} />
        <h1 className="text-xl font-bold py-2 text-neutral-800 dark:text-neutral-100">
        Broker Partenaire
        </h1>
        <h2 className="text-sm text-neutral-700 dark:text-neutral-300">
        Signaux gratuits à vie !
        </h2>
        <p className="text-sm text-neutral-700 line-clamp-2 dark:text-neutral-400 mt-3">
        Ouvrez un compte via notre broker partenaire et accédez à tous les signaux gratuitement, sans limite de temps.
        </p>
      </ComponentTransition>

      <ComponentTransition
        delay={0.1}
        className="w-full h-[250px]  md:basis-[30%] overflow-hidden  border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <Image
          src="/img.png"
          alt="Header Image"
          width={400}
          height={400}
          loading="lazy"
          className="w-full h-auto object-cover scale-110"
        />
      </ComponentTransition>

      <ComponentTransition
        delay={0.1}
        className="w-full h-[250px]  px-10 py-5 md:basis-[30%] overflow-hidden dark:bg-[#0a0a0a] border-[1px] border-neutral-300 dark:border-neutral-700 rounded-3xl"
      >
        <FaCode size={40} />
        <h1 className="text-xl font-bold py-2 text-neutral-800 dark:text-neutral-100">
        Accélérez votre Succès
        </h1>
        <h2 className="text-sm text-neutral-700 dark:text-neutral-300">
         Tradexa accélère votre parcours !
        </h2>
        <p className="text-sm text-neutral-700 line-clamp-2 dark:text-neutral-400 mt-3">
        Tradexa est votre voie express vers le succès. Des signaux précis et des outils performants pour maximiser vos gains.
        </p>
      </ComponentTransition>
    </div>
  );
};

export default Card;
