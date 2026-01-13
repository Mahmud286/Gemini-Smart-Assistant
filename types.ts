
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
}
