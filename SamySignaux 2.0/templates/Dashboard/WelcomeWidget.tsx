import { useUserStore } from "@/stores/userStore";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const WelcomeWidget = () => {
    const { user } = useUserStore();
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <h1 className="text-h3 font-bold text-t-primary">
                {t.hello}, {user?.username || 'Trader'} 👋
            </h1>
            <p className="text-body-1 text-t-secondary mt-2">
                {t.readyForTrading}
            </p>
        </motion.div>
    );
};

export default WelcomeWidget;
