
export type AppMode = 'STUDENT' | 'BUSINESS';

export interface UserSession {
  name: string;
  role: AppMode;
}

export interface SolutionResult {
  analysis: string;
  steps: string[];
  solution: string;
  recommendations: string;
  diagramDescription: string;
  visual?: string;
  links?: Array<{ uri: string; title: string }>;
}

export interface ProcessModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  prompt: string;
  mode: AppMode;
  type?: 'text' | 'visual';
  placeholder?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  moduleId: string;
  moduleTitle: string;
  input: string;
  result: SolutionResult;
}
