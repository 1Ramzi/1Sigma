import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";
import { useSignalStore } from "@/stores/signalStore";

const StatsWidget = () => {
    const { language } = useLanguage();
    const { signals } = useSignalStore();
    
    const activeSignals = signals.filter(s => s.status === 'active');
    const winRate = 78.5;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card bg-linear-to-br from-primary-04 to-accent text-shade-10 !p-4 border-none dark:border-none"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-shade-10/20">
                        <Icon name="trending-up" className="fill-shade-10" />
                    </div>
                    <span className="text-shade-10/80 text-body-2 font-medium">
                        {language === 'fr' ? 'Signaux Actifs' : 'Active Signals'}
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-h3 font-bold">{activeSignals.length}</span>
                    <span className="text-body-2 text-secondary-04 font-medium">+2 today</span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card !bg-b-surface1 border border-transparent dark:border-s-border !p-4"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-secondary-04/20">
                        <Icon name="activity" className="fill-primary-02" />
                    </div>
                    <span className="text-t-secondary text-body-2 font-medium">
                        {language === 'fr' ? 'Taux de réussite' : 'Win Rate'}
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-h3 font-bold text-t-primary">{winRate}%</span>
                    <span className="text-body-2 text-primary-02 font-medium flex items-center gap-0.5">
                        <Icon name="trending-up" className="!size-3 fill-primary-02" /> +1.2%
                    </span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card !bg-b-surface1 border border-transparent dark:border-s-border !p-4"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-secondary-05/20">
                        <Icon name="bar-chart-3" className="fill-primary-05" />
                    </div>
                    <span className="text-t-secondary text-body-2 font-medium">
                        {language === 'fr' ? 'Profit Mensuel' : 'Monthly Profit'}
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-h3 font-bold text-t-primary">+12.4%</span>
                    <span className="text-body-2 text-primary-02 font-medium">Target 15%</span>
                </div>
            </motion.div>
        </div>
    );
};

export default StatsWidget;
