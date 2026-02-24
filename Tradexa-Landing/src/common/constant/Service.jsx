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
    desc: "Oui ! En créant simplement un compte chez notre broker partenaire, vous accédez gratuitement à tous nos signaux de trading sans limite de durée. 0 €, aucun engagement, aucun frais caché.",
  },
  {
    icon: (
      <MdAnimation
        size={size}
        className="group-hover:rotate-90 transition-all duration-300"
      />
    ),
    title: "Puis-je changer de plan plus tard ?",
    desc: "Absolument. Vous pouvez passer du plan Gratuit au Premium à tout moment. Le changement est immédiat et vous ne perdez aucun signal en cours.",
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
    title: 'Signaux Professionnels en Temps Réel',
    desc: 'Recevez des signaux de trading précis émis par des traders confirmés qui analysent les marchés financiers avec des outils à la pointe de la technologie.',

    icon : <FaPager className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: 'Gestion des Risques Intégrée',
    desc: 'Chaque signal inclut un stop loss et des take profits calculés pour protéger votre capital et maximiser vos gains.',
    icon : <ImProfile className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: 'Taux de Réussite Vérifié',
    desc: 'Nos traders expérimentés affichent un historique transparent et vérifiable. Consultez leurs performances réelles sur Crypto, Forex et Indices.',

    icon : <IoDiamondOutline className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: 'Communauté de Traders Vérifiés',
    desc: 'Rejoignez une communauté encadrée par de vrais professionnels. Échangez, apprenez et progressez aux côtés de traders certifiés.',

    icon : <CiShop className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: 'Académie de Formation',
    desc: 'Accédez à des modules de formation complets : analyse technique, psychologie du trader, stratégies avancées.',
    icon : <IoIosSchool className="h-12 w-12 mb-4 dark:text-white text-black " />
  },
  {
    title: '0 € via Broker Partenaire',
    desc: 'Créez un compte chez notre broker partenaire et accédez à tous nos signaux gratuitement, sans aucun frais. Conditions de trading optimales incluses.',

    icon : <FaPiedPiper className="h-12 w-12 mb-4 dark:text-white text-black " />
  },

];

