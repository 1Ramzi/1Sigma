import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";

const VideoWidget = () => {
    const { language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card !p-0 overflow-hidden relative aspect-video group cursor-pointer"
        >
            {/* Video Thumbnail / Placeholder */}
            <div className="absolute inset-0 bg-shade-01 flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Platform Presentation" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary-04/90 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl shadow-primary-04/30">
                    <Icon name="play-circle" className="w-8 h-8 fill-shade-10 ml-1" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-shade-10 bg-linear-to-t from-shade-01 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-primary-04 text-[10px] font-bold uppercase tracking-wider">
                        {language === 'fr' ? 'Tutoriel' : 'Tutorial'}
                    </span>
                </div>
                <h3 className="text-h5 font-bold mb-1">
                    {language === 'fr' ? 'Découvrir la plateforme SamySignaux' : 'Discover SamySignaux Platform'}
                </h3>
                <p className="text-shade-10/80 text-body-2 line-clamp-1">
                    {language === 'fr' 
                        ? 'Comment utiliser les signaux, connecter votre broker et maximiser vos gains.' 
                        : 'How to use signals, connect your broker and maximize your profits.'}
                </p>
            </div>
        </motion.div>
    );
};

export default VideoWidget;
