
import React from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Calculator, 
  PenTool, 
  Search, 
  TrendingUp, 
  Users, 
  FileText,
  Lightbulb,
  Target,
  Image as ImageIcon,
  Layers
} from 'lucide-react';
import { Tool } from './types';

export const TOOLS: Tool[] = [
  // Student Tools
  {
    id: 'math-solver',
    title: 'Math & Science Solver',
    description: 'Step-by-step solutions for equations and scientific concepts.',
    icon: 'Calculator',
    prompt: 'You are an elite tutor. Solve the following problem step-by-step. If an image is provided, analyze it first.',
    mode: 'STUDENT'
  },
  {
    id: 'study-diagram',
    title: 'Diagram Creator',
    description: 'Generate educational diagrams and visual study aids.',
    icon: 'ImageIcon',
    prompt: 'Create a clear, educational diagram or visual representation of the following concept.',
    mode: 'STUDENT',
    type: 'image'
  },
  {
    id: 'essay-outline',
    title: 'Essay Architect',
    description: 'Generate structured outlines and thesis statements.',
    icon: 'PenTool',
    prompt: 'Create a comprehensive essay outline including a strong thesis and key arguments.',
    mode: 'STUDENT'
  },
  // Business Tools
  {
    id: 'brand-visualizer',
    title: 'Brand Visualizer',
    description: 'Generate logos, mockups, and visual brand assets.',
    icon: 'ImageIcon',
    prompt: 'Generate a professional brand asset or mockup based on these business requirements.',
    mode: 'BUSINESS',
    type: 'image'
  },
  {
    id: 'marketing-strategy',
    title: 'Marketing Strategy',
    description: 'Develop multi-channel marketing plans.',
    icon: 'Target',
    prompt: 'Create a 3-month growth plan including digital channels and local engagement.',
    mode: 'BUSINESS'
  },
  {
    id: 'swot-analysis',
    title: 'SWOT Analysis',
    description: 'Identify strengths, weaknesses, opportunities, and threats.',
    icon: 'TrendingUp',
    prompt: 'Perform a detailed SWOT analysis for this business idea.',
    mode: 'BUSINESS'
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="w-5 h-5" />,
  PenTool: <PenTool className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  ImageIcon: <ImageIcon className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />
};
