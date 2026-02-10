import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Card from "@/components/Card";

const QuickActions = () => {
    const { t } = useLanguage();

    const actions = [
        { href: '/signals', label: t.viewSignals, icon: 'trending-up', color: 'primary-04' },
        { href: '/academy', label: t.academy, icon: 'desktop', color: 'primary-01' },
        { href: '/broker', label: t.broker, icon: 'wallet', color: 'primary-02' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            data-onboarding="quickaccess"
        >
            <Card title={t.quickAccess}>
                <div className="flex flex-col gap-3">
                    {actions.map((a) => (
                        <Link key={a.href} href={a.href} className={`flex items-center justify-between p-3 rounded-xl bg-b-surface1 hover:bg-${a.color}/10 group transition-colors border border-transparent dark:border-s-border`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg bg-${a.color}/10 flex items-center justify-center group-hover:bg-${a.color}/20 transition-colors`}>
                                    <Icon name={a.icon} className={`fill-${a.color} !size-4`} />
                                </div>
                                <span className={`text-body-2 font-medium text-t-primary group-hover:text-${a.color}`}>
                                    {a.label}
                                </span>
                            </div>
                            <Icon name="arrow" className={`fill-t-tertiary group-hover:fill-${a.color} !size-4`} />
                        </Link>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
};

export default QuickActions;
