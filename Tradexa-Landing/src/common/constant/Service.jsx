import { CiShop } from "react-icons/ci";
import { FaConnectdevelop, FaPager, FaPiedPiper } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoIosSchool } from "react-icons/io";
import { IoDiamondOutline } from "react-icons/io5";
import { MdAnimation } from "react-icons/md";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";

const size = 35

export const Services = [
  {
    icon: (
      <FaConnectdevelop
        size={size}
        className="group-hover:rotate-90 transition-all duration-300"
        
      />
    ),
    title: "Y a-t-il un essai gratuit ?",
    desc: "Oui ! En ouvrant un compte via notre broker partenaire, vous accédez gratuitement à tous nos signaux de trading à vie. Aucun engagement, aucun frais caché.",
  },
  {
    icon: (
      <MdAnimation
        size={size}
        className="group-hover:rotate-90 transition-all duration-300"
      />
    ),
    title: "Puis-je changer de plan plus tard ?",
    desc: "Absolument. Vous pouvez passer d'un plan Starter au Pro à tout moment. Le changement est immédiat et vous ne perdez aucun signal en cours.",
  },
  {
    icon: (
      <MdOutlineAutoAwesomeMotion
        size={size}
        className="group-hover:rotate-90 transition-all duration-300"
      />
    ),
    title: "Comment fonctionnent les signaux ?",
    desc: "Nos signaux incluent la paire, la direction (BUY/SELL), le prix d'entrée, le stop loss et jusqu'à 5 take profits. Vous recevez une notification instantanée et passez l'ordre vous-même.",
  },
];

export const ServiceItem = [
  {
    title: 'Signaux IA en Temps Réel',
    desc: 'Recevez des signaux de trading instantanés basés sur notre analyse algorithmique avancée des marchés financiers.',
    icon : <FaPager className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: 'Gestion des Risques Intégrée',
    desc: 'Chaque signal inclut un stop loss et des take profits calculés pour protéger votre capital et maximiser vos gains.',
    icon : <ImProfile className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: 'Taux de Réussite 78%+',
    desc: 'Notre IA analyse des millions de données en temps réel pour des prédictions précises sur Crypto, Forex et Indices.',
    icon : <IoDiamondOutline className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: 'Communauté de +3000 Traders',
    desc: 'Rejoignez une communauté active de traders. Partagez vos analyses et apprenez des meilleurs.',
    icon : <CiShop className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: 'Académie de Formation',
    desc: 'Accédez à des modules de formation complets : analyse technique, psychologie du trader, stratégies avancées.',
    icon : <IoIosSchool className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: 'Broker Partenaire de Confiance',
    desc: 'Tradez avec notre broker partenaire pour bénéficier de conditions optimales et de signaux gratuits à vie.',
    icon : <FaPiedPiper className="h-12 w-12 mb-4 dark:text-white text-black " />
  },

];

