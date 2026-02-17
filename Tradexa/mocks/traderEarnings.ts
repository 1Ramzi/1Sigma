import { TraderEarnings } from '@/types/trader';

export const mockTraderEarnings: TraderEarnings = {
  totalEarnings: 18750,
  monthlyEarnings: 3420,
  pendingPayout: 1280,
  lastPayout: { amount: 2140, date: new Date('2026-01-15') },
  earningsHistory: [
    { month: 'Sept 2025', amount: 1850, signalsCount: 14, avgPerSignal: 132 },
    { month: 'Oct 2025', amount: 2200, signalsCount: 18, avgPerSignal: 122 },
    { month: 'Nov 2025', amount: 2680, signalsCount: 20, avgPerSignal: 134 },
    { month: 'Déc 2025', amount: 3100, signalsCount: 22, avgPerSignal: 141 },
    { month: 'Jan 2026', amount: 2500, signalsCount: 16, avgPerSignal: 156 },
    { month: 'Fév 2026', amount: 3420, signalsCount: 19, avgPerSignal: 180 },
  ],
};
