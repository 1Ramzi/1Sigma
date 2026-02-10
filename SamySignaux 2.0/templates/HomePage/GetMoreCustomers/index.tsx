import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";
import Button from "@/components/Button";

const socials = [
    {
        icon: "twitter",
        href: "https://x.com/samysignaux",
    },
    {
        icon: "facebook",
        href: "https://www.facebook.com/samysignaux/",
    },
    {
        icon: "instagram",
        href: "https://www.instagram.com/samysignaux/",
    },
    {
        icon: "threads",
        href: "https://www.threads.net/@samysignaux",
    },
];

const GetMoreCustomers = ({}) => {
    const { t } = useLanguage();

    return (
        <Card title={t.getMoreCustomers}>
            <div className="mb-6 px-5 text-body-2 text-t-secondary max-lg:px-3" dangerouslySetInnerHTML={{ __html: t.getMoreCustomersDesc }}>
            </div>
            <div className="flex gap-3">
                {socials.map((social, index) => (
                    <Button
                        className="flex-1 !px-0"
                        icon={social.icon}
                        key={index}
                        isStroke
                        as="a"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    />
                ))}
            </div>
        </Card>
    );
};

export default GetMoreCustomers;
