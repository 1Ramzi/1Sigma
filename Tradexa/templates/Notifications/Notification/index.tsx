import Link from "next/link";
import Icon from "@/components/Icon";

type NotificationProps = {
    value: {
        id: number;
        type: string;
        login: string;
        action: string;
        product: string;
        content: string;
        avatar: string;
        time: string;
        new: boolean;
    };
    onDismiss?: (id: number) => void;
};

const typeConfig: Record<string, { icon: string; iconClass: string; bg: string }> = {
    signal: { icon: 'trending-up', iconClass: 'fill-primary-02', bg: 'bg-primary-02/10' },
    alert: { icon: 'check-circle-fill', iconClass: 'fill-primary-04', bg: 'bg-primary-04/10' },
    info: { icon: 'info-circle', iconClass: 'fill-primary-01', bg: 'bg-primary-01/10' },
    sl: { icon: 'alert-triangle', iconClass: 'fill-primary-03', bg: 'bg-primary-03/10' },
};

const Notification = ({ value, onDismiss }: NotificationProps) => {
    const config = typeConfig[value.type] || typeConfig.info;

    return (
        <div className="relative group flex items-center p-5 rounded-xl hover:bg-b-surface2/60 transition-colors">
            <Link href="/signals?view=active" className="flex items-center flex-1 min-w-0">
                <div className={`shrink-0 w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center mr-4`}>
                    <Icon name={config.icon} className={`!size-5 ${config.iconClass}`} />
                </div>
                <div className="grow min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-body-2 font-semibold text-t-primary truncate">
                            @{value.login}
                        </span>
                        <span className="text-body-2 text-t-secondary">{value.action}</span>
                        <span className="text-body-2 font-semibold text-primary-01 truncate">
                            {value.product}
                        </span>
                    </div>
                    <p className="text-caption text-t-secondary line-clamp-1">{value.content}</p>
                </div>
            </Link>
            <div className="flex items-center shrink-0 ml-4 gap-2">
                <span className="text-caption text-t-tertiary whitespace-nowrap">{value.time}</span>
                {value.new && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-02 shrink-0 group-hover:hidden" />
                )}
                {onDismiss && (
                    <button
                        onClick={() => onDismiss(value.id)}
                        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-b-surface2 transition-all"
                    >
                        <Icon name="close" className="!size-3.5 fill-t-tertiary" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Notification;
