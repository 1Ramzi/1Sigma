import { create } from 'zustand';
import { mockUsers, type User } from '../data/mockData';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  login: async () => {
    await new Promise(r => setTimeout(r, 600));
    set({ user: mockUsers[0], isAuthenticated: true, hasCompletedOnboarding: false });
    return true;
  },
  register: async (username: string) => {
    await new Promise(r => setTimeout(r, 600));
    set({ user: { ...mockUsers[0], username, id: 'new' }, isAuthenticated: true, hasCompletedOnboarding: false });
    return true;
  },
  logout: () => set({ user: null, isAuthenticated: false, hasCompletedOnboarding: false }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
}));
