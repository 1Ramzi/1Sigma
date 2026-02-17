import { create } from 'zustand';
import { mockUsers, type User } from '../data/mockData';

export type AccountType = 'free' | 'premium' | 'partner';
export type UserRole = 'user' | 'trader' | 'admin';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  accountType: AccountType;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completeOnboarding: () => void;
  setAccountType: (type: AccountType) => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  accountType: 'free',
  role: 'user',
  setRole: (role) => set({ role }),
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
  logout: () => set({ user: null, isAuthenticated: false, hasCompletedOnboarding: false, accountType: 'free', role: 'user' }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  setAccountType: (type) => set({ accountType: type }),
  updateProfile: async (data) => {
    await new Promise(r => setTimeout(r, 600));
    set((state) => ({ user: state.user ? { ...state.user, ...data } : null }));
    return true;
  },
  updatePassword: async () => {
    await new Promise(r => setTimeout(r, 600));
    return true;
  },
}));
