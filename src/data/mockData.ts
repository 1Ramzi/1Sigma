export type SignalDirection = 'BUY' | 'SELL';
export type SignalStatus = 'active' | 'closed' | 'won' | 'lost';
export type UserRole = 'member' | 'vip' | 'moderator' | 'trader' | 'admin';

export interface Signal {
  id: string; pair: string; market: string; direction: SignalDirection;
  entryPrice: number; stopLoss: number; takeProfit: number; currentPrice: number;
  tp1: number; tp2: number; tp3: number;
  confidence: number; status: SignalStatus; result?: number;
  createdAt: Date; closedAt?: Date; followers: number;
  votes: { up: number; down: number }; performance?: number;
}

export interface User {
  id: string; username: string; avatar: string; role: UserRole; isOnline: boolean;
}

export interface ChatChannel { id: string; name: string; icon: string; unread: number; }
export interface ChatMessage {
  id: string; channelId: string; userId: string; content: string;
  createdAt: Date; reactions: { emoji: string; count: number }[];
}

const av = (s: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`;
const ago = (h: number) => new Date(Date.now() - h * 3600000);

export const mockUsers: User[] = [
  { id: 'u1', username: 'SamyTrader', avatar: av('samy'), role: 'admin', isOnline: true },
  { id: 'u2', username: 'MarieVIP', avatar: av('marie'), role: 'vip', isOnline: true },
  { id: 'u3', username: 'LucTrading', avatar: av('luc'), role: 'trader', isOnline: true },
  { id: 'u4', username: 'SophieFX', avatar: av('sophie'), role: 'moderator', isOnline: true },
  { id: 'u5', username: 'ThomasCrypto', avatar: av('thomas'), role: 'member', isOnline: true },
  { id: 'u6', username: 'JulienPro', avatar: av('julien'), role: 'vip', isOnline: false },
  { id: 'u7', username: 'EmmaFX', avatar: av('emma'), role: 'member', isOnline: true },
  { id: 'u8', username: 'PierreModo', avatar: av('pierre'), role: 'moderator', isOnline: false },
];

export const mockSignals: Signal[] = [
  { id:'s1', pair:'BTC/USD', market:'Crypto', direction:'BUY', entryPrice:25536.67, stopLoss:24800, takeProfit:27000, currentPrice:26200, tp1:1.56, tp2:1.78, tp3:1.96, confidence:87, status:'active', createdAt:ago(2), followers:342, votes:{up:156,down:12}, performance: 2.6 },
  { id:'s2', pair:'ETH/USD', market:'Crypto', direction:'BUY', entryPrice:3124.50, stopLoss:2980, takeProfit:3400, currentPrice:3250, tp1:2.1, tp2:3.4, tp3:4.2, confidence:82, status:'active', createdAt:ago(5), followers:289, votes:{up:201,down:34}, performance: 4.0 },
  { id:'s3', pair:'EUR/USD', market:'Forex', direction:'SELL', entryPrice:1.0845, stopLoss:1.0920, takeProfit:1.0720, currentPrice:1.0790, tp1:0.8, tp2:1.2, tp3:1.5, confidence:91, status:'won', result:55, createdAt:ago(24), closedAt:ago(6), followers:467, votes:{up:312,down:15}, performance: 1.2 },
  { id:'s4', pair:'SOL/USD', market:'Crypto', direction:'BUY', entryPrice:98.50, stopLoss:92.00, takeProfit:115.00, currentPrice:108.30, tp1:3.2, tp2:5.1, tp3:7.8, confidence:78, status:'won', result:98, createdAt:ago(48), closedAt:ago(12), followers:523, votes:{up:278,down:22}, performance: 9.9 },
  { id:'s5', pair:'GOLD', market:'Commodities', direction:'BUY', entryPrice:2030, stopLoss:2010, takeProfit:2080, currentPrice:2055, tp1:0.5, tp2:1.0, tp3:1.8, confidence:85, status:'active', createdAt:ago(3), followers:411, votes:{up:245,down:18}, performance: 1.2 },
  { id:'s6', pair:'GBP/JPY', market:'Forex', direction:'SELL', entryPrice:188.50, stopLoss:189.80, takeProfit:186.00, currentPrice:189.10, tp1:-0.3, tp2:-0.1, tp3:0.5, confidence:65, status:'lost', result:-70, createdAt:ago(72), closedAt:ago(24), followers:198, votes:{up:89,down:45}, performance: -0.3 },
  { id:'s7', pair:'ADA/USD', market:'Crypto', direction:'BUY', entryPrice:0.45, stopLoss:0.42, takeProfit:0.52, currentPrice:0.48, tp1:2.5, tp2:4.3, tp3:6.7, confidence:74, status:'active', createdAt:ago(7), followers:356, votes:{up:167,down:28}, performance: 6.7 },
  { id:'s8', pair:'NAS100', market:'Indices', direction:'BUY', entryPrice:17850, stopLoss:17700, takeProfit:18100, currentPrice:17960, tp1:0.4, tp2:0.8, tp3:1.2, confidence:80, status:'active', createdAt:ago(1), followers:234, votes:{up:156,down:11}, performance: 0.6 },
];

export const portfolioAssets = [
  { symbol: 'ETH', name: 'Ethereum', amount: 32, value: 32430, change: 4.5, icon: '⟠' },
  { symbol: 'LTC', name: 'Litecoin', amount: 19, value: 1352, change: -3.6, icon: 'Ł' },
  { symbol: 'ADA', name: 'Cardano', amount: 14, value: 4213, change: -2.5, icon: '₳' },
  { symbol: 'BTC', name: 'Bitcoin', amount: 26, value: 23142, change: -6.7, icon: '₿' },
];

export const portfolioItems = [
  { name: 'PuPrime-Coin', status: 'In trade', color: '#F59E0B' },
  { name: 'Solana-SOL', status: 'In trade', color: '#06B6D4' },
  { name: 'Thether-USDT', status: 'In trade', color: '#10B981' },
];

export const chatChannels: ChatChannel[] = [
  { id:'ch1', name:'général', icon:'💬', unread:3 },
  { id:'ch2', name:'signaux-live', icon:'📊', unread:7 },
  { id:'ch3', name:'crypto', icon:'₿', unread:0 },
  { id:'ch4', name:'forex', icon:'💱', unread:2 },
  { id:'ch5', name:'aide', icon:'❓', unread:1 },
];

export const chatMessages: ChatMessage[] = [
  { id:'m1', channelId:'ch1', userId:'u1', content:'Bienvenue à tous ! Belle journée 🔥', createdAt:ago(2), reactions:[{emoji:'🔥',count:12}] },
  { id:'m2', channelId:'ch1', userId:'u3', content:'Le signal BTC est en bonne voie, +2.6% déjà', createdAt:ago(1.5), reactions:[{emoji:'💰',count:5}] },
  { id:'m3', channelId:'ch1', userId:'u2', content:'Quelqu\'un a vu le mouvement sur ETH ?', createdAt:ago(1), reactions:[] },
  { id:'m4', channelId:'ch1', userId:'u5', content:'Oui, belle progression ! Le TP1 est touché', createdAt:ago(0.8), reactions:[{emoji:'✅',count:3}] },
  { id:'m5', channelId:'ch1', userId:'u7', content:'Je viens de rejoindre, cette plateforme est top 🙌', createdAt:ago(0.5), reactions:[{emoji:'❤️',count:6}] },
  { id:'m6', channelId:'ch1', userId:'u4', content:'N\'oubliez pas le money management !', createdAt:ago(0.3), reactions:[{emoji:'👍',count:9}] },
];

export const weeklyChartData = [
  { day: 'Mon', value: 18200 }, { day: 'Tue', value: 19500 }, { day: 'Wed', value: 17800 },
  { day: 'Thu', value: 20100 }, { day: 'Fri', value: 19300 }, { day: 'Sat', value: 21500 },
  { day: 'Sun', value: 23546 },
];

export const monthlyPerf = [
  { month:'Jan', winRate:76.5, profit:890 }, { month:'Feb', winRate:79.2, profit:1150 },
  { month:'Mar', winRate:81.3, profit:1340 }, { month:'Apr', winRate:77.8, profit:980 },
  { month:'May', winRate:80.1, profit:1420 }, { month:'Jun', winRate:82.5, profit:1580 },
  { month:'Jul', winRate:78.9, profit:1520 }, { month:'Aug', winRate:75.4, profit:1180 },
  { month:'Sep', winRate:80.2, profit:1650 }, { month:'Oct', winRate:79.8, profit:1720 },
  { month:'Nov', winRate:81.5, profit:1840 }, { month:'Dec', winRate:77.3, profit:1217 },
];

export const portfolioMonthly = [
  { month:'Jan', value:15200 }, { month:'Feb', value:16800 }, { month:'Mar', value:18400 },
  { month:'Apr', value:17200 }, { month:'May', value:19500 }, { month:'Jun', value:21300 },
  { month:'Jul', value:20100 }, { month:'Aug', value:19800 }, { month:'Sep', value:22100 },
  { month:'Oct', value:21500 }, { month:'Nov', value:23546 },
];

export const tickerData = [
  { pair:'BTC/USD', price:43324.03, change:6.35 },
  { pair:'ETH/USD', price:3124.50, change:-1.71 },
];

export const stats = { totalSignals:1247, winRate:78.5, members:3421, avgProfit:32 };
