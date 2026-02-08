export const navigation = [
    {
        title: "Dashboard",
        icon: "dashboard",
        href: "/dashboard",
    },
    {
        title: "Signals",
        icon: "chart",
        list: [
            {
                title: "Live Signals",
                href: "/signals",
                counter: 4,
            },
            {
                title: "History",
                href: "/signals/history",
            },
        ],
    },
    {
        title: "Academy",
        icon: "desktop", // Closest to educational content in available icons
        href: "/academy",
    },
    {
        title: "Broker",
        icon: "wallet",
        href: "/broker",
    },
    {
        title: "Community",
        icon: "chat-think",
        href: "/community",
    },
];

export const navigationUser = [
    {
        title: "Settings",
        icon: "edit-profile",
        href: "/settings",
    },
    {
        title: "Logout",
        icon: "logout",
        href: "/logout", 
    },
];
