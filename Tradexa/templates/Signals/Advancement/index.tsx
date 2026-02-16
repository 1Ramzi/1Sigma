import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Icon from "@/components/Icon";

const Advancement = () => {
    const { t } = useLanguage();

    const steps = [
        { id: 1, status: "completed" },
        { id: 2, status: "current" },
        { id: 3, status: "locked" },
        { id: 4, status: "locked" },
    ];

    return (
        <Card title={t.advancementTitle} className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="max-w-md">
                    <p className="text-t-secondary mb-4">{t.advancementDesc}</p>
                    <div className="flex items-center gap-2">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                        step.status === "completed"
                                            ? "bg-primary-01 border-primary-01 text-white"
                                            : step.status === "current"
                                            ? "bg-transparent border-primary-01 text-primary-01"
                                            : "bg-b-surface2 border-transparent text-t-tertiary"
                                    }`}
                                >
                                    {step.status === "completed" ? (
                                        <Icon name="check" className="w-5 h-5 fill-current" />
                                    ) : (
                                        <span className="font-bold">{step.id}</span>
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`w-12 h-1 mx-2 rounded-full ${
                                            step.status === "completed" ? "bg-primary-01" : "bg-b-surface2"
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 w-full md:w-auto bg-b-surface2 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-02/10 flex items-center justify-center shrink-0">
                        <Icon name="trophy" className="w-6 h-6 fill-primary-02" />
                    </div>
                    <div>
                        <h4 className="text-h6 font-bold text-t-primary">Level 2</h4>
                        <p className="text-sm text-t-secondary">Intermediate Trader</p>
                    </div>
                    <div className="ml-auto text-h5 font-bold text-primary-01">450 XP</div>
                </div>
            </div>
        </Card>
    );
};

export default Advancement;
