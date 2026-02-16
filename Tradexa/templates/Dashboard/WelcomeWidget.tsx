import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const welcomeMessages = [
    { text: "Les marchés n'attendent que toi", emoji: "🔥" },
    { text: "C'est le moment de briller", emoji: "✨" },
    { text: "Prêt à casser la baraque ?", emoji: "💪" },
    { text: "Les graphiques t'appellent", emoji: "📊" },
    { text: "Nouvelle journée, nouveaux gains", emoji: "💰" },
    { text: "Le marché est ton terrain de jeu", emoji: "🎯" },
    { text: "Ton portefeuille va kiffer", emoji: "🚀" },
    { text: "Aujourd'hui c'est ton jour", emoji: "⭐" },
    { text: "Focus, discipline, profit", emoji: "🧠" },
    { text: "Les signaux sont chauds", emoji: "🔔" },
    { text: "Tu gères comme un chef", emoji: "👨‍🍳" },
    { text: "Mode trader activé", emoji: "😎" },
    { text: "Prêt pour une session de folie ?", emoji: "🎢" },
    { text: "Les opportunités sont là", emoji: "💎" },
    { text: "C'est parti pour du lourd", emoji: "⚡" },
    { text: "Ta stratégie est en place, go", emoji: "🏆" },
    { text: "Le succès commence ici", emoji: "🌟" },
    { text: "Chaque trade compte", emoji: "📈" },
    { text: "Reste focus, le marché récompense les patients", emoji: "🧘" },
    { text: "Tu es sur la bonne voie", emoji: "🛤️" },
    { text: "Les TPs n'attendent que toi", emoji: "🎯" },
    { text: "Money management = tranquillité", emoji: "🛡️" },
    { text: "Le marché parle, écoute-le", emoji: "👂" },
    { text: "Ton niveau de trading monte", emoji: "📶" },
    { text: "Les meilleurs traders sont disciplinés", emoji: "🎖️" },
    { text: "Bon trading à toi", emoji: "🤝" },
    { text: "N'oublie pas ton stop loss", emoji: "⛔" },
    { text: "Profit en vue, on lâche rien", emoji: "🔭" },
    { text: "Les bougies vertes arrivent", emoji: "🕯️" },
    { text: "Tu es prêt pour le bullrun ?", emoji: "🐂" },
    { text: "La patience paie toujours", emoji: "⏳" },
    { text: "Un bon trader sait attendre", emoji: "🕰️" },
    { text: "Tes gains t'attendent", emoji: "🏦" },
    { text: "Le plan est clair, exécute", emoji: "📋" },
    { text: "Bonne vibes et bons trades", emoji: "🌈" },
    { text: "Le trading c'est un marathon", emoji: "🏃" },
    { text: "Regarde les volumes, pas les émotions", emoji: "📉" },
    { text: "Ton journal de trading est à jour ?", emoji: "📝" },
    { text: "Analyse, entre, sécurise", emoji: "🔐" },
    { text: "Les meilleurs moments sont devant toi", emoji: "🌅" },
    { text: "Le risque est maîtrisé, c'est parti", emoji: "🎲" },
    { text: "Café et chandeliers japonais", emoji: "☕" },
    { text: "Suis le plan, pas les émotions", emoji: "🗺️" },
    { text: "Confiance et constance", emoji: "💯" },
    { text: "Tu trades mieux que hier", emoji: "📊" },
    { text: "Let's go faire des pips", emoji: "💸" },
    { text: "La communauté compte sur toi", emoji: "🤜🤛" },
    { text: "Un trade à la fois", emoji: "☝️" },
    { text: "Tu fais partie des meilleurs", emoji: "👑" },
    { text: "Rappel : le marché a toujours raison", emoji: "🧐" },
];

const WelcomeWidget = () => {
    const { user } = useUserStore();
    const { t } = useLanguage();

    const [message, setMessage] = useState(welcomeMessages[0]);

    useEffect(() => {
        const idx = Math.floor(Math.random() * welcomeMessages.length);
        setMessage(welcomeMessages[idx]);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <h1 className="text-h3 font-bold text-t-primary">
                {t.hello}, {user?.username || 'Trader'} {message.emoji}
            </h1>
            <p className="text-h5 font-bold text-t-secondary mt-3 italic">
                &laquo;&nbsp;{message.text}&nbsp;&raquo;
            </p>
        </motion.div>
    );
};

export default WelcomeWidget;
