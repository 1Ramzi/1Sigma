type BadgeProps = {
    className?: string;
    children: React.ReactNode;
    color?: "green" | "red" | "yellow" | "gray" | "blue";
};

const Badge = ({ className, children, color = "gray" }: BadgeProps) => {
    const colorClass = {
        green: "label-green",
        red: "label-red",
        yellow: "label-yellow",
        gray: "label-gray",
        blue: "border border-primary-01/15 bg-primary-01/5 text-primary-01", // Custom for blue if not in globals
    }[color];

    return (
        <div className={`label ${colorClass} ${className || ""}`}>
            {children}
        </div>
    );
};

export default Badge;
