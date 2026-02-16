import { create } from 'zustand';
import { chatChannels, chatMessages, type ChatChannel, type ChatMessage } from '@/data/mockData';

interface ChatState {
  channels: ChatChannel[];
  messages: ChatMessage[];
  activeChannel: ChatChannel;
  setActiveChannel: (ch: ChatChannel) => void;
  sendMessage: (channelId: string, userId: string, content: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  channels: chatChannels,
  messages: chatMessages,
  activeChannel: chatChannels[0],
  setActiveChannel: (ch) => set({ activeChannel: ch }),
  sendMessage: (channelId, userId, content) =>
    set((s) => ({
      messages: [...s.messages, { id: `m-${Date.now()}`, channelId, userId, content, createdAt: new Date(), reactions: [] }],
    })),
}));
