"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Field from "@/components/Field";
import Image from "@/components/Image";
import Button from "@/components/Button";
import { useUserStore } from "@/stores/userStore";
import { useLanguage } from "@/context/LanguageContext";

const Payment = ({}) => {
    const { user } = useUserStore();
    const { t } = useLanguage();
    const [paypalEmail, setPaypalEmail] = useState(user?.email || "");

    useEffect(() => {
        if (user?.email) {
            setPaypalEmail(user.email);
        }
    }, [user]);

    return (
        <Card title={t.payment}>
            <div className="p-5 pt-0 max-lg:px-3">
                <Field
                    classInput="pl-14"
                    label={t.paypalEmail}
                    placeholder={t.enterPaypalEmail}
                    value={paypalEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPaypalEmail(e.target.value)}
                    required
                    validated
                >
                    <Image
                        className="size-7 absolute top-1/2 left-5 -translate-y-1/2 pointer-events-none opacity-100"
                        src="/images/logos/paypal.svg"
                        width={28}
                        height={28}
                        alt="Paypal"
                    />
                </Field>
                <Button className="gap-2 mt-6" isBlack>
                    <Image
                        className="size-7"
                        src="/images/logos/stripe.svg"
                        width={28}
                        height={28}
                        alt="Stripe"
                    />
                    {t.connectStripe}
                </Button>
            </div>
        </Card>
    );
};

export default Payment;
