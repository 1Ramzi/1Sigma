import Select from "@/components/Select";
import { SelectOption } from "@/types/select";

type CardProps = {
    className?: string;
    classHead?: string;
    title: string;
    children: React.ReactNode;
    selectOptions?: SelectOption[];
    selectValue?: SelectOption;
    selectOnChange?: (value: SelectOption) => void;
    headContent?: React.ReactNode;
};

const Card = ({
    className,
    classHead,
    title,
    selectOptions,
    selectValue,
    selectOnChange,
    children,
    headContent,
}: CardProps) => (
    <div className={`card ${className || ""}`}>
        <div
            className={`flex items-center h-12 pl-5 max-lg:pl-3 ${
                classHead || ""
            }`}
        >
            <div className="mr-auto text-h6">{title}</div>
            {headContent}
            {selectOptions && selectValue && selectOnChange && (
                <Select
                    className="min-w-40 max-md:min-w-34"
                    value={selectValue}
                    onChange={selectOnChange}
                    options={selectOptions}
                />
            )}
        </div>
        <div className="pt-3">{children}</div>
    </div>
);

export default Card;
