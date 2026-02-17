import { create } from 'zustand';
import { TraderSignalView, TraderDashboardStats, AnonymousFeedback, TraderEarnings, TraderProfile, SignalStatus, SignalResult, Market } from '@/types/trader';
import { mockTraderSignals } from '@/mocks/traderSignals';
import { mockTraderStats } from '@/mocks/traderStats';
import { mockFeedback } from '@/mocks/anonymousFeedback';
import { mockTraderEarnings } from '@/mocks/traderEarnings';

interface TraderFilters {
  status: 'all' | SignalStatus;
  result: 'all' | SignalResult;
  market: 'all' | Market;
  period: 'week' | 'month' | 'all';
}

interface TraderState {
  signals: TraderSignalView[];
  stats: TraderDashboardStats;
  feedback: AnonymousFeedback[];
  earnings: TraderEarnings;
  profile: TraderProfile;
  filters: TraderFilters;

  setFilter: (key: keyof TraderFilters, value: string) => void;
  filteredSignals: () => TraderSignalView[];
  getSignalById: (id: string) => TraderSignalView | undefined;
  addSignal: (signal: TraderSignalView) => void;
  updateSignal: (id: string, data: Partial<TraderSignalView>) => void;
  closeSignal: (id: string, exitPrice: number, result: SignalResult, note?: string) => void;
}

export const useTraderStore = create<TraderState>((set, get) => ({
  signals: mockTraderSignals,
  stats: mockTraderStats,
  feedback: mockFeedback,
  earnings: mockTraderEarnings,
  profile: {
    displayName: 'TraderPro',
    bio: 'Trader Forex & Crypto depuis 5 ans. Spécialisé en swing trading.',
    avatar: '/images/avatar.png',
    socialLinks: {
      twitter: 'https://twitter.com/traderpro',
      telegram: 'https://t.me/traderpro',
    },
    tradingStyle: 'Swing Trading',
    preferredMarkets: ['forex', 'crypto'],
  },
  filters: {
    status: 'all',
    result: 'all',
    market: 'all',
    period: 'all',
  },

  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),

  filteredSignals: () => {
    const { signals, filters } = get();
    return signals.filter((s) => {
      if (filters.status !== 'all' && s.status !== filters.status) return false;
      if (filters.result !== 'all' && s.result !== filters.result) return false;
      if (filters.market !== 'all' && s.market !== filters.market) return false;
      if (filters.period !== 'all') {
        const now = new Date();
        const created = new Date(s.createdAt);
        const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
        if (filters.period === 'week' && diffDays > 7) return false;
        if (filters.period === 'month' && diffDays > 30) return false;
      }
      return true;
    });
  },

  getSignalById: (id) => get().signals.find((s) => s.id === id),

  addSignal: (signal) =>
    set((s) => ({
      signals: [signal, ...s.signals],
      stats: {
        ...s.stats,
        totalSignals: s.stats.totalSignals + 1,
        activeSignals: s.stats.activeSignals + 1,
      },
    })),

  updateSignal: (id, data) =>
    set((s) => ({
      signals: s.signals.map((sig) =>
        sig.id === id ? { ...sig, ...data } : sig
      ),
    })),

  closeSignal: (id, exitPrice, result, note) =>
    set((s) => ({
      signals: s.signals.map((sig) =>
        sig.id === id
          ? {
              ...sig,
              status: 'closed' as const,
              result,
              currentPrice: exitPrice,
              closedAt: new Date(),
              updates: [
                ...sig.updates,
                {
                  id: `u_${Date.now()}`,
                  timestamp: new Date(),
                  type: 'closed' as const,
                  message: note || `Trade clôturé: ${result}`,
                },
              ],
            }
          : sig
      ),
      stats: {
        ...s.stats,
        activeSignals: Math.max(0, s.stats.activeSignals - 1),
      },
    })),
}));
