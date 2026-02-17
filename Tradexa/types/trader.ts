export type Market = 'forex' | 'crypto' | 'commodities' | 'indices' | 'stocks';
export type Direction = 'buy' | 'sell';
export type SignalStatus = 'active' | 'closed';
export type SignalResult = 'win' | 'loss' | 'breakeven';
export type Confidence = 'low' | 'medium' | 'high';
export type Timeframe = '15m' | '1h' | '4h' | 'daily' | 'weekly';
export type FeedbackType = 'upvote' | 'downvote' | 'comment';

export interface TraderDashboardStats {
  totalSignals: number;
  activeSignals: number;
  winRate: number;
  totalFollowers: number;
  avgFollowersPerSignal: number;
  monthlyEarnings: number;
  performanceLast30Days: { date: string; winRate: number }[];
  followersGrowth: { date: string; count: number }[];
}

export interface SignalCreateForm {
  pair: string;
  market: Market;
  direction: Direction;
  entryPrice: number;
  currentPrice?: number;
  stopLoss: number;
  riskRewardRatio?: number;
  takeProfit1: number;
  takeProfit2?: number;
  takeProfit3?: number;
  takeProfit4?: number;
  takeProfit5?: number;
  confidence: Confidence;
  timeframe: Timeframe;
  analysis?: string;
  chartImage?: File;
  notifyFollowers: boolean;
  expiresAt?: Date;
  tags?: string[];
}

export interface TraderSignalView {
  id: string;
  pair: string;
  market: Market;
  direction: Direction;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2?: number;
  takeProfit3?: number;
  takeProfit4?: number;
  takeProfit5?: number;
  status: SignalStatus;
  result?: SignalResult;
  confidence: Confidence;
  timeframe: Timeframe;
  analysis?: string;
  createdAt: Date;
  closedAt?: Date;
  followersCount: number;
  upvotes: number;
  downvotes: number;
  currentPL: number;
  tpsHit: number[];
  updates: SignalUpdate[];
}

export interface SignalUpdate {
  id: string;
  timestamp: Date;
  type: 'tp_hit' | 'sl_adjusted' | 'note' | 'closed';
  message: string;
}

export interface SignalUpdateForm {
  currentPrice?: number;
  newStopLoss?: number;
  moveToBreakEven?: boolean;
  tpHit?: 1 | 2 | 3 | 4 | 5;
  adjustTp?: { level: 1 | 2 | 3 | 4 | 5; newPrice: number };
  updateNote?: string;
}

export interface SignalCloseForm {
  exitPrice: number;
  result: SignalResult;
  closingNote?: string;
  finalPL?: number;
  duration?: string;
}

export interface AnonymousFeedback {
  id: string;
  signalId: string;
  signalPair: string;
  odUserId: string;
  type: FeedbackType;
  comment?: string;
  createdAt: Date;
}

export interface TraderEarnings {
  totalEarnings: number;
  monthlyEarnings: number;
  pendingPayout: number;
  lastPayout: { amount: number; date: Date };
  earningsHistory: {
    month: string;
    amount: number;
    signalsCount: number;
    avgPerSignal: number;
  }[];
}

export interface TraderProfile {
  displayName: string;
  bio: string;
  avatar: string;
  socialLinks: {
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
  tradingStyle: string;
  preferredMarkets: Market[];
}
