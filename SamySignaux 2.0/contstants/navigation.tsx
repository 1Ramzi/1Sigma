export const navigation = [
    {
        title: "Tableau de bord",
        icon: "dashboard",
        href: "/dashboard",
    },
    {
        title: "Signaux",
        icon: "chart",
        list: [
            {
                title: "Signaux en cours",
                href: "/signals",
                counter: 4,
            },
            {
                title: "Historique",
                href: "/signals/history",
            },
        ],
    },
    {
        title: "Académie",
        icon: "desktop", // Closest to educational content in available icons
        href: "/academy",
    },
    {
        title: "Broker",
        icon: "wallet",
        href: "/broker",
    },
    {
        title: "Communauté",
        icon: "chat-think",
        href: "/community",
    },
];

export const navigationUser = [
    {
        title: "Paramètres",
        icon: "edit-profile",
        href: "/settings",
    },
    {
        title: "Déconnexion",
        icon: "logout",
        href: "/logout", 
    },
];
