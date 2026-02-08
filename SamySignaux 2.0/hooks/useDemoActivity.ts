import { useEffect } from 'react';
import { useSignalStore } from '@/stores/signalStore';
import { useChatStore } from '@/stores/chatStore';
import { type SignalDirection } from '@/data/mockData';

export function useDemoActivity() {
  const { addSignal } = useSignalStore();
  const { sendMessage } = useChatStore();

  useEffect(() => {
    // Simulate new signal every 15s
    const signalInterval = setInterval(() => {
      const pairs = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'GOLD', 'NAS100', 'GBP/JPY', 'US30'];
      const markets: Record<string, string> = {
        'BTC/USD': 'Crypto', 'ETH/USD': 'Crypto', 'EUR/USD': 'Forex',
        'GOLD': 'Commodities', 'NAS100': 'Indices', 'GBP/JPY': 'Forex', 'US30': 'Indices'
      };
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      const direction: SignalDirection = Math.random() > 0.5 ? 'BUY' : 'SELL';
      const price = Math.random() * 1000 + 1000;
      
      const newSignal = {
        id: `s-${Date.now()}`,
        pair,
        market: markets[pair],
        direction,
        entryPrice: price,
        stopLoss: direction === 'BUY' ? price * 0.98 : price * 1.02,
        takeProfit: direction === 'BUY' ? price * 1.05 : price * 0.95,
        currentPrice: price,
        tp1: 1.5, tp2: 3.0, tp3: 5.0,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        status: 'active' as const,
        createdAt: new Date(),
        followers: 0,
        votes: { up: 0, down: 0 }
      };

      addSignal(newSignal);
    }, 15000);

    // Simulate chat messages every 8s
    const chatInterval = setInterval(() => {
      const messages = [
        "Has anyone taken the last trade?",
        "Thanks for the analysis Samy!",
        "TP1 is almost hit on Gold",
        "What an amazing day 🚀",
        "Just secured my profits",
        "Watch out for the 2:30 PM news",
        "Validated ✅",
      ];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      const randomUserId = `u${Math.floor(Math.random() * 8) + 1}`; // u1 to u8
      
      sendMessage('ch1', randomUserId, msg);
    }, 8000);

    return () => {
      clearInterval(signalInterval);
      clearInterval(chatInterval);
    };
  }, [addSignal, sendMessage]);
}
