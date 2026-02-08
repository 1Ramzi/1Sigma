import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Card from "@/components/Card";

const QuickActions = () => {
    const { language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
        >
            <Card title="Accès Rapide">
                <div className="flex flex-col gap-3">
                    <Link href="/signals" className="flex items-center justify-between p-3 rounded-xl bg-b-surface1 hover:bg-primary-04/10 group transition-colors border border-transparent dark:border-s-border">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary-04/10 text-primary-04 flex items-center justify-center group-hover:bg-primary-04/20 transition-colors">
                                <Icon name="activity" className="fill-primary-04 !size-4" />
                            </div>
                            <span className="text-body-2 font-medium text-t-primary group-hover:text-primary-04">
                                Voir les signaux
                            </span>
                        </div>
                        <Icon name="arrow" className="fill-t-tertiary group-hover:fill-primary-04 !size-4" />
                    </Link>

                    <Link href="/broker" className="flex items-center justify-between p-3 rounded-xl bg-b-surface1 hover:bg-primary-05/10 group transition-colors border border-transparent dark:border-s-border">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary-05/10 text-primary-05 flex items-center justify-center group-hover:bg-primary-05/20 transition-colors">
                                <Icon name="bar-chart-3" className="fill-primary-05 !size-4" />
                            </div>
                            <span className="text-body-2 font-medium text-t-primary group-hover:text-primary-05">
                                Mes positions
                            </span>
                        </div>
                        <Icon name="arrow" className="fill-t-tertiary group-hover:fill-primary-05 !size-4" />
                    </Link>
                </div>
            </Card>
        </motion.div>
    );
};

export default QuickActions;
