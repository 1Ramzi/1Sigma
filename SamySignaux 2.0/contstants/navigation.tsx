export const navigation = [
    {
        title: "dashboard",
        icon: "dashboard",
        href: "/dashboard",
    },
    {
        title: "tradingSignals",
        icon: "chart",
        list: [
            {
                title: "signalsActive",
                href: "/signals?view=active",
                counter: 4,
            },
            {
                title: "signalsHistory",
                href: "/signals?view=history",
            },
        ],
    },
    {
        title: "academy",
        icon: "desktop",
        list: [
            {
                title: "formation",
                href: "/academy",
            },
            {
                title: "live",
                href: "/academy/live",
            },
        ],
    },
    {
        title: "subscription",
        icon: "diamond",
        href: "/subscription",
    },
    {
        title: "broker",
        icon: "wallet",
        href: "/broker",
    },
    {
        title: "support",
        icon: "chat",
        href: "/support",
    },
];

export const navigationUser = [
    {
        title: "settings",
        icon: "edit-profile",
        href: "/settings",
    },
    {
        title: "logout",
        icon: "logout",
        href: "/logout", 
    },
];
