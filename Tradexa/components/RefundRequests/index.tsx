import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Image from "@/components/Image";
import Button from "@/components/Button";

const RefundRequests = ({}) => {
    const { t } = useLanguage();

    return (
        <Card classHead="!pl-3" title={t.refundRequests}>
            <div className="p-3 pt-0">
                <div className="flex items-center mb-8">
                    <div className="flex justify-center items-center shrink-0 w-16 h-16 rounded-full bg-linear-to-b from-[#FFD5BD] to-[#FFC1B1]">
                        <Image
                            className="size-6 rounded-full opacity-100"
                            src="/images/icons/bag.svg"
                            width={24}
                            height={24}
                            alt=""
                        />
                    </div>
                    <div className="grow pl-5 text-body-2 font-medium text-t-secondary [&_a]:text-[0.9375rem] [&_a]:leading-[1.5rem] [&_a]:font-semibold [&_a]:text-t-primary [&_a]:transition-colors [&_a]:hover:text-shade-05 max-2xl:pl-3 max-lg:pl-5 dark:[&_a]:hover:text-shade-08/90">
                        {t.youHave}{" "}
                        <Link href="/income/refunds">
                            52 {t.openRefundRequests}
                        </Link>{" "}
                        {t.toProcessIncludes}{" "}
                        <Link href="/income/refunds">8 {t.newRequests}</Link> 👀
                    </div>
                </div>
                <Button
                    className="w-full"
                    href="/income/refunds"
                    as="link"
                    isStroke
                >
                    {t.viewAll}
                </Button>
            </div>
        </Card>
    );
};

export default RefundRequests;
