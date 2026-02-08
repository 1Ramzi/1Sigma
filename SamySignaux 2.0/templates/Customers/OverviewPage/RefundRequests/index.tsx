import Link from "next/link";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";

const RefundRequests = ({}) => {
    return (
        <Card classHead="!pl-3" title="Demandes de remboursement">
            <div className="p-3 pt-0">
                <div className="flex items-center mb-8">
                    <div className="flex justify-center items-center shrink-0 size-16 rounded-full bg-b-surface1">
                        <Icon className="fill-t-primary" name="bag" />
                    </div>
                    <div className="grow pl-5 text-body-2 font-medium text-t-secondary [&_a]:text-[0.9375rem] [&_a]:leading-[1.5rem] [&_a]:font-semibold [&_a]:text-t-primary [&_a]:transition-colors [&_a]:hover:text-shade-05 max-2xl:pl-3 max-lg:pl-5 dark:[&_a]:hover:text-shade-08/90">
                        Vous avez{" "}
                        <Link href="/income/refunds">
                            52 demandes de remboursement ouvertes
                        </Link>{" "}
                        à traiter. Cela inclut{" "}
                        <Link href="/income/refunds">8 nouvelles demandes.</Link> 👀
                    </div>
                </div>
                <Button className="w-full" href="/" as="link" isStroke>
                    Examiner les demandes de remboursement
                </Button>
            </div>
        </Card>
    );
};

export default RefundRequests;
