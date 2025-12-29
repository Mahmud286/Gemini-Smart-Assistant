
export type AppMode = 'STUDENT' | 'BUSINESS';

export interface MessagePart {
  text?: string;
  image?: string; // base64 data URL
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string; // fallback/primary text
  parts?: MessagePart[]; 
  timestamp: number;
  thinking?: string;
  groundingLinks?: Array<{ uri: string; title: string }>;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  prompt: string;
  mode: AppMode;
  type?: 'text' | 'image';
}

export interface ChartData {
  name: string;
  value: number;
}
