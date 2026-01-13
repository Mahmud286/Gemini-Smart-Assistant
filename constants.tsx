
import React from 'react';
import { 
  Calculator, 
  PenTool, 
  TrendingUp, 
  Users, 
  Lightbulb,
  Target,
  Image as ImageIcon,
  BookOpen,
  Briefcase,
  Search,
  FileText,
  Layers
} from 'lucide-react';
import { ProcessModule } from './types';

export const PROCESS_MODULES: ProcessModule[] = [
  // Student Modules
  {
    id: 'academic-solver',
    title: 'Core Solution Engine',
    description: 'First-principles logic for STEM and complex humanities.',
    icon: 'Calculator',
    prompt: 'Solve the following academic challenge using rigorous first-principles logic.',
    placeholder: 'Paste your math problem, physics equation, or complex scientific question here. Mention any specific theorems you want included...',
    mode: 'STUDENT'
  },
  {
    id: 'structural-planner',
    title: 'Structural Planner',
    description: 'Detailed hierarchies for papers and research projects.',
    icon: 'Layers',
    prompt: 'Architect a high-level structure for this project, defining all key hierarchies and arguments.',
    placeholder: 'What is your research topic or essay prompt? Specify the required length and target audience for a more precise outline...',
    mode: 'STUDENT'
  },
  {
    id: 'concept-visualizer',
    title: 'Concept Visualizer',
    description: 'Generates mental models and visual study aids.',
    icon: 'ImageIcon',
    prompt: 'Create a high-fidelity visual mental model for this concept.',
    placeholder: 'Describe the complex concept you need to see to understand. (e.g., "The mechanism of CRISPR gene editing" or "Keynesian economic flow")...',
    mode: 'STUDENT',
    type: 'visual'
  },
  // Business Modules
  {
    id: 'market-strategist',
    title: 'Market Strategist',
    description: 'Operational growth and competitive positioning.',
    icon: 'Target',
    prompt: 'Formulate a robust market entry and growth strategy based on these variables.',
    placeholder: 'Describe your business model, current market share, and growth objectives. Mention your main competitors for a tactical analysis...',
    mode: 'BUSINESS'
  },
  {
    id: 'audit-engine',
    title: 'Risk & SWOT Audit',
    description: 'Systematic identification of internal and external factors.',
    icon: 'TrendingUp',
    prompt: 'Perform a comprehensive risk assessment and SWOT audit.',
    placeholder: 'List your core business strengths and any known external threats. Alternatively, describe a recent project to audit its risk profile...',
    mode: 'BUSINESS'
  },
  {
    id: 'brand-architect',
    title: 'Brand Architect',
    description: 'Visual identity and brand positioning assets.',
    icon: 'ImageIcon',
    prompt: 'Design a visual brand concept including core identity elements.',
    placeholder: 'Describe your brand personality and target customer. What feelings should your visual identity evoke? (e.g., "Minimalist luxury" or "Friendly tech")...',
    mode: 'BUSINESS',
    type: 'visual'
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Calculator: <Calculator size={18} />,
  PenTool: <PenTool size={18} />,
  Lightbulb: <Lightbulb size={18} />,
  Target: <Target size={18} />,
  TrendingUp: <TrendingUp size={18} />,
  Users: <Users size={18} />,
  Briefcase: <Briefcase size={18} />,
  BookOpen: <BookOpen size={18} />,
  Search: <Search size={18} />,
  FileText: <FileText size={18} />,
  ImageIcon: <ImageIcon size={18} />,
  Layers: <Layers size={18} />
};
