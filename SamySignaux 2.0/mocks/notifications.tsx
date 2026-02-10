export type LiveAlertType = 'buy' | 'sell' | 'tp' | 'sl' | 'info';

export interface LiveAlert {
    id: number;
    type: LiveAlertType;
    pair: string;
    message: string;
    detail?: string;
    timestamp: number;
}

// Pool of alerts that will be cycled through for demo
export const liveAlertPool: Omit<LiveAlert, 'id' | 'timestamp'>[] = [
    { type: 'buy', pair: 'BTC/USD', message: 'Nouveau signal BUY', detail: 'Entry: 43,500 — SL: 42,800 — TP1: 44,200' },
    { type: 'sell', pair: 'EUR/USD', message: 'Nouveau signal SELL', detail: 'Entry: 1.0845 — SL: 1.0920 — TP1: 1.0780' },
    { type: 'tp', pair: 'GOLD', message: 'TP1 atteint ✓', detail: '+1.2 % — Sécurisation des profits' },
    { type: 'tp', pair: 'BTC/USD', message: 'TP2 atteint ✓', detail: '+3.8 % — Continuation haussière' },
    { type: 'sl', pair: 'GBP/JPY', message: 'Stop Loss touché', detail: '-0.7 % — Position fermée' },
    { type: 'buy', pair: 'SOL/USD', message: 'Nouveau signal BUY', detail: 'Entry: 98.50 — SL: 92.00 — TP1: 105.00' },
    { type: 'tp', pair: 'ETH/USD', message: 'TP3 atteint ✓', detail: '+5.2 % — Objectif intermédiaire' },
    { type: 'sell', pair: 'NAS100', message: 'Nouveau signal SELL', detail: 'Entry: 18,200 — SL: 18,350 — TP1: 17,950' },
    { type: 'tp', pair: 'SOL/USD', message: 'TP1 atteint ✓', detail: '+6.6 % — Premier objectif validé' },
    { type: 'buy', pair: 'ADA/USD', message: 'Nouveau signal BUY', detail: 'Entry: 0.45 — SL: 0.42 — TP1: 0.48' },
    { type: 'tp', pair: 'GOLD', message: 'TP2 atteint ✓', detail: '+2.1 % — Objectif secondaire' },
    { type: 'sl', pair: 'EUR/USD', message: 'Stop Loss touché', detail: '-0.4 % — Marché retourné' },
    { type: 'tp', pair: 'BTC/USD', message: 'TP4 atteint ✓', detail: '+7.1 % — Excellente performance' },
    { type: 'info', pair: 'MARCHÉ', message: 'Analyse quotidienne disponible', detail: 'Consultez les dernières tendances dans l\'Académie' },
    { type: 'buy', pair: 'ETH/USD', message: 'Nouveau signal BUY', detail: 'Entry: 3,124 — SL: 2,980 — TP1: 3,250' },
    { type: 'tp', pair: 'NAS100', message: 'TP1 atteint ✓', detail: '+1.4 % — Objectif court terme' },
    { type: 'tp', pair: 'ADA/USD', message: 'TP2 atteint ✓', detail: '+8.9 % — Belle continuation' },
    { type: 'sell', pair: 'GBP/JPY', message: 'Nouveau signal SELL', detail: 'Entry: 188.50 — SL: 189.80 — TP1: 187.00' },
    { type: 'tp', pair: 'ETH/USD', message: 'TP5 atteint ✓', detail: '+8.8 % — Tous les objectifs atteints !' },
    { type: 'sl', pair: 'NAS100', message: 'Stop Loss touché', detail: '-0.8 % — Sortie contrôlée' },
];

export const newNotifications = [
    {
        id: 1,
        login: "SamySignaux AI",
        action: "published",
        product: "New Signal: BTC/USD",
        avatar: "/images/logo-mini.png",
        time: "5m ago",
    },
    {
        id: 2,
        login: "System",
        action: "alert",
        product: "TP1 Hit on GOLD",
        avatar: "/images/logo-mini.png",
        time: "1h ago",
    },
    {
        id: 3,
        login: "Support",
        action: "support",
        product: "L'admin vous a répondu",
        avatar: "/images/logo-mini.png",
        time: "2h ago",
    },
    {
        id: 4,
        login: "SamySignaux AI",
        action: "published",
        product: "New Signal: EUR/USD",
        avatar: "/images/logo-mini.png",
        time: "4h ago",
    },
];

export const allNotifications = [
    {
        id: 1,
        type: "signal",
        login: "SamySignaux AI",
        action: "published",
        product: "BTC/USD Buy",
        content: "Entry: 43500 - TP1: 44000 - TP2: 44500 - SL: 43000",
        avatar: "/images/logo-mini.png",
        time: "5m",
        new: true,
    },
    {
        id: 2,
        type: "alert",
        login: "System",
        action: "hit",
        product: "TP1 on GOLD",
        content: "Take Profit 1 hit on GOLD/USD position. Securing profits.",
        avatar: "/images/logo-mini.png",
        time: "1h",
        new: true,
    },
    {
        id: 3,
        type: "support",
        login: "Support",
        action: "replied",
        product: "L'admin vous a répondu",
        content: "Votre ticket #1001 a reçu une réponse. Consultez le centre de support.",
        avatar: "/images/logo-mini.png",
        time: "2h",
        new: true,
    },
    {
        id: 4,
        type: "info",
        login: "SamySignaux Team",
        action: "posted",
        product: "Daily Analysis",
        content: "Check out today's market overview in the Academy section.",
        avatar: "/images/logo-mini.png",
        time: "3h",
        new: false,
    },
];
