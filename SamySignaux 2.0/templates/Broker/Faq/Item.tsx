import AnimateHeight from "react-animate-height";

type ItemProps = {
    value: {
        id: number;
        title: string;
        content: string;
    };
    isActive: boolean;
    onClick: () => void;
};

const Item = ({ value, isActive, onClick }: ItemProps) => {
    return (
        <div className="py-3 border-b border-s-subtle last:border-0">
            <div
                className="flex items-center gap-6 py-4 text-h6 cursor-pointer hover:text-primary-01 transition-colors"
                onClick={onClick}
            >
                <div className="grow">{value.title}</div>
                <div className="relative shrink-0 w-6 h-6 ml-auto">
                    <div className="absolute top-1/2 left-1/2 -translate-1/2 w-3 h-0.5 rounded-full bg-t-secondary"></div>
                    <div
                        className={`absolute top-1/2 left-1/2 -translate-1/2 w-0.5 h-3 rounded-full bg-t-secondary transition-transform duration-300 ${
                            isActive ? "rotate-90" : ""
                        }`}
                    ></div>
                </div>
            </div>
            <AnimateHeight duration={300} height={isActive ? "auto" : 0}>
                <div className="pb-4 text-body-2 text-t-secondary">{value.content}</div>
            </AnimateHeight>
        </div>
    );
};

export default Item;
