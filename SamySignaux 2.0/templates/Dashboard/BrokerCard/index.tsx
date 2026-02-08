import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { stats } from "@/mocks/stats";

const BrokerCard = () => {
    const { language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card !p-6 !bg-shade-01 text-shade-10 shadow-xl relative overflow-hidden border border-transparent dark:border-s-border"
        >
            <div className="absolute top-0 right-0 p-32 bg-primary-04/20 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-shade-10/10 flex items-center justify-center backdrop-blur-sm">
                            <Icon name="shield" className="fill-secondary-04" />
                        </div>
                        <div>
                            <p className="text-shade-10/60 text-caption font-medium uppercase tracking-wider">
                                {language === 'fr' ? 'Broker Connecté' : 'Connected Broker'}
                            </p>
                            <p className="font-bold text-h6">PuPrime</p>
                        </div>
                    </div>
                    <div className="px-2 py-1 rounded bg-primary-02/20 text-primary-02 text-caption font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-02 animate-pulse" />
                        Connected
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <p className="text-shade-10/60 text-body-2 mb-1">
                            {language === 'fr' ? 'Signaux Reçus' : 'Signals Received'}
                        </p>
                        <p className="text-h3 font-bold font-mono">{stats.totalSignals}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-shade-10/10">
                        <div>
                            <p className="text-shade-10/60 text-caption">PnL (Today)</p>
                            <p className="text-secondary-04 font-mono font-medium text-body-2">+$450.20</p>
                        </div>
                        <div>
                            <p className="text-shade-10/60 text-caption">Open Trades</p>
                            <p className="text-shade-10 font-mono font-medium text-body-2">3 Active</p>
                        </div>
                    </div>
                </div>

                <Link 
                    href="/broker"
                    className="w-full py-3 bg-shade-10 text-shade-01 rounded-xl font-semibold text-body-2 flex items-center justify-center gap-2 hover:bg-shade-09 transition-colors"
                >
                    {language === 'fr' ? 'Gérer mon compte' : 'Manage Account'}
                    <Icon name="arrow" className="fill-shade-01 !size-4" />
                </Link>
            </div>
        </motion.div>
    );
};

export default BrokerCard;
