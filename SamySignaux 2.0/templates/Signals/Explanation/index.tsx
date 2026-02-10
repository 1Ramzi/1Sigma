import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Icon from "@/components/Icon";

const Explanation = () => {
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Video / Explanation Module */}
            <Card title={t.themeExplanationTitle} className="flex flex-col justify-between">
                <div className="space-y-4">
                    <p className="text-t-secondary">{t.themeExplanationDesc}</p>
                    
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black/10 group cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
                                <Icon name="play" className="w-6 h-6 fill-white ml-1" />
                            </div>
                        </div>
                        {/* Placeholder for video thumbnail - using a colored div or existing image if available */}
                        <div className="w-full h-full bg-linear-to-br from-primary-01/20 to-secondary-01/20" />
                    </div>

                    <button className="flex items-center gap-2 text-primary-01 font-bold hover:underline">
                        <Icon name="play-circle" className="w-5 h-5 fill-current" />
                        {t.watchVideo}
                    </button>
                </div>
            </Card>

            {/* Themes Presentation */}
            <Card title={t.themePresentation}>
                <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="col-span-2 md:col-span-1 bg-b-surface2 rounded-xl p-4 flex flex-col items-center text-center hover:bg-b-surface1 transition-colors cursor-pointer border border-transparent hover:border-primary-01/50">
                        <div className="w-16 h-16 mb-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                            <Icon name="chart" className="w-8 h-8 fill-t-primary" />
                        </div>
                        <h4 className="font-bold text-t-primary mb-1">Technical Analysis</h4>
                        <p className="text-xs text-t-secondary">Master the charts</p>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1 bg-b-surface2 rounded-xl p-4 flex flex-col items-center text-center hover:bg-b-surface1 transition-colors cursor-pointer border border-transparent hover:border-primary-01/50">
                         <div className="w-16 h-16 mb-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                            <Icon name="wallet" className="w-8 h-8 fill-t-primary" />
                        </div>
                        <h4 className="font-bold text-t-primary mb-1">Risk Management</h4>
                        <p className="text-xs text-t-secondary">Protect your capital</p>
                    </div>

                    <div className="col-span-2 bg-gradient-to-r from-primary-01/10 to-secondary-01/10 rounded-xl p-4 flex items-center justify-between border border-primary-01/20">
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-primary-01 flex items-center justify-center text-white font-bold">
                                3
                             </div>
                             <div>
                                <h4 className="font-bold text-t-primary">Next Theme: Psychology</h4>
                                <p className="text-xs text-t-secondary">Unlock at Level 3</p>
                             </div>
                        </div>
                        <Icon name="lock" className="w-5 h-5 fill-t-secondary" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Explanation;
