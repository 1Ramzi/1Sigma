import { create } from 'zustand';
import { mockSignals, type Signal } from '../data/mockData';

interface SignalState {
  signals: Signal[];
  filters: { market: string; status: string; direction: string; search: string };
  setFilter: (key: string, value: string) => void;
  vote: (id: string, type: 'up' | 'down') => void;
  addSignal: (signal: Signal) => void;
  filteredSignals: () => Signal[];
}

export const useSignalStore = create<SignalState>((set, get) => ({
  signals: mockSignals,
  filters: { market: 'all', status: 'all', direction: 'all', search: '' },
  setFilter: (key, value) => set(s => ({ filters: { ...s.filters, [key]: value } })),
  addSignal: (signal) => set(s => ({ signals: [signal, ...s.signals] })),
  vote: (id, type) => set(s => ({
    signals: s.signals.map(sig => sig.id === id ? { ...sig, votes: { ...sig.votes, [type]: sig.votes[type] + 1 } } : sig),
  })),
  filteredSignals: () => {
    const { signals, filters } = get();
    return signals.filter(s => {
      if (filters.market !== 'all' && s.market !== filters.market) return false;
      if (filters.status !== 'all' && s.status !== filters.status) return false;
      if (filters.direction !== 'all' && s.direction !== filters.direction) return false;
      if (filters.search && !s.pair.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  },
}));
