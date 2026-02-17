import { TraderDashboardStats } from '@/types/trader';

const generateLast30Days = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      winRate: Math.round(65 + Math.random() * 25),
    });
  }
  return data;
};

const generateFollowersGrowth = () => {
  const data = [];
  const now = new Date();
  let count = 980;
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    count += Math.floor(Math.random() * 15) - 2;
    data.push({
      date: date.toISOString().split('T')[0],
      count,
    });
  }
  return data;
};

export const mockTraderStats: TraderDashboardStats = {
  totalSignals: 156,
  activeSignals: 8,
  winRate: 78.5,
  totalFollowers: 1247,
  avgFollowersPerSignal: 43,
  monthlyEarnings: 3420,
  performanceLast30Days: generateLast30Days(),
  followersGrowth: generateFollowersGrowth(),
};
