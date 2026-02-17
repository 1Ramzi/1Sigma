import { AnonymousFeedback } from '@/types/trader';

const d = (daysAgo: number, hoursAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date;
};

export const mockFeedback: AnonymousFeedback[] = [
  {
    id: 'fb_001',
    signalId: 'sig_001',
    signalPair: 'EUR/USD',
    odUserId: 'User #4521',
    type: 'upvote',
    createdAt: d(0, 2),
  },
  {
    id: 'fb_002',
    signalId: 'sig_002',
    signalPair: 'BTC/USDT',
    odUserId: 'User #7832',
    type: 'comment',
    comment: 'Excellent timing sur ce call !',
    createdAt: d(0, 4),
  },
  {
    id: 'fb_003',
    signalId: 'sig_001',
    signalPair: 'EUR/USD',
    odUserId: 'User #2104',
    type: 'upvote',
    createdAt: d(0, 6),
  },
  {
    id: 'fb_004',
    signalId: 'sig_003',
    signalPair: 'GOLD',
    odUserId: 'User #9451',
    type: 'comment',
    comment: 'TP1 touché, merci pour le signal !',
    createdAt: d(0, 8),
  },
  {
    id: 'fb_005',
    signalId: 'sig_006',
    signalPair: 'NAS100',
    odUserId: 'User #3287',
    type: 'upvote',
    createdAt: d(1, 1),
  },
  {
    id: 'fb_006',
    signalId: 'sig_005',
    signalPair: 'ETH/USDT',
    odUserId: 'User #6190',
    type: 'downvote',
    createdAt: d(1, 3),
  },
  {
    id: 'fb_007',
    signalId: 'sig_002',
    signalPair: 'BTC/USDT',
    odUserId: 'User #1455',
    type: 'comment',
    comment: 'Le BTC monte bien, belle analyse !',
    createdAt: d(1, 5),
  },
  {
    id: 'fb_008',
    signalId: 'sig_008',
    signalPair: 'SOL/USDT',
    odUserId: 'User #8823',
    type: 'upvote',
    createdAt: d(1, 7),
  },
  {
    id: 'fb_009',
    signalId: 'sig_004',
    signalPair: 'GBP/JPY',
    odUserId: 'User #5540',
    type: 'comment',
    comment: 'Super trade, les 2 TPs touchés !',
    createdAt: d(2, 2),
  },
  {
    id: 'fb_010',
    signalId: 'sig_003',
    signalPair: 'GOLD',
    odUserId: 'User #7712',
    type: 'downvote',
    createdAt: d(2, 4),
  },
  {
    id: 'fb_011',
    signalId: 'sig_006',
    signalPair: 'NAS100',
    odUserId: 'User #4102',
    type: 'comment',
    comment: 'Analyse pertinente sur le NAS.',
    createdAt: d(3, 1),
  },
  {
    id: 'fb_012',
    signalId: 'sig_001',
    signalPair: 'EUR/USD',
    odUserId: 'User #9988',
    type: 'upvote',
    createdAt: d(3, 6),
  },
];
