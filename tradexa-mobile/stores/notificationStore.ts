import { create } from 'zustand';

export type Notification = {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    read: boolean;
    createdAt: Date;
};

interface NotificationState {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [
        {
            id: '1',
            title: 'Nouveau follower',
            message: 'AlexM a commencé à suivre vos signaux.',
            type: 'info',
            read: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 5) // 5 mins ago
        },
        {
            id: '2',
            title: 'TP Atteint !',
            message: 'Le TP1 a été touché sur EUR/USD (+32 pips).',
            type: 'success',
            read: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 mins ago
        }
    ],
    addNotification: (notification) => set((state) => ({
        notifications: [
            {
                ...notification,
                id: Math.random().toString(36).substring(7),
                read: false,
                createdAt: new Date(),
            },
            ...state.notifications,
        ],
    })),
    markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
        ),
    })),
    markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
