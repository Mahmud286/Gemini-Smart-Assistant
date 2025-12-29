
import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Store, 
  Send, 
  Sparkles, 
  ArrowRight,
  RefreshCw,
  Search,
  BrainCircuit,
  PanelLeftClose,
  PanelLeftOpen,
  Info,
  TrendingUp,
  Image as ImageIcon,
  Camera,
  X,
  Maximize2,
  CheckCircle2,
  ChevronRight,
  Zap
} from 'lucide-react';
import { TOOLS, ICON_MAP } from './constants';
import { AppMode, Message, Tool } from './types';
import { geminiService } from './services/gemini';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Sidebar: React.FC<{
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  selectedTool: Tool | null;
  onSelectTool: (tool: Tool) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}> = ({ mode, onModeChange, selectedTool, onSelectTool, isOpen, setIsOpen }) => {
  const filteredTools = TOOLS.filter(t => t.mode === mode);

  return (
    <aside className={`fixed lg:relative z-40 h-full bg-white border-r border-slate-200 transition-all duration-300 ${isOpen ? 'w-80' : 'w-0 lg:w-20'} overflow-hidden`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          {isOpen && <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SolveSphere</h1>}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            {isOpen ? <PanelLeftClose size={20} className="text-slate-400" /> : <PanelLeftOpen size={20} className="text-slate-400" />}
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2 overflow-y-auto flex-1">
          <div className="mb-6 flex p-1 bg-slate-100 rounded-xl">
            <button 
              onClick={() => onModeChange('STUDENT')}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${mode === 'STUDENT' ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <GraduationCap size={16} />
              {isOpen && <span className="text-sm">Student</span>}
            </button>
            <button 
              onClick={() => onModeChange('BUSINESS')}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${mode === 'BUSINESS' ? 'bg-white shadow-sm text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Store size={16} />
              {isOpen && <span className="text-sm">Business</span>}
            </button>
          </div>

          <p className="text-[10px] font-black text-slate-400 uppercase px-2 mb-2 tracking-widest">{isOpen ? 'Specialized Reasoning' : ''}</p>
          {filteredTools.map(tool => (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedTool?.id === tool.id ? (mode === 'STUDENT' ? 'bg-blue-50 text-blue-700' : 'bg-indigo-50 text-indigo-700') : 'hover:bg-slate-50 text-slate-600'}`}
            >
              <div className={`${selectedTool?.id === tool.id ? (mode === 'STUDENT' ? 'bg-blue-100' : 'bg-indigo-100') : 'bg-slate-100'} p-2 rounded-lg transition-colors`}>
                {ICON_MAP[tool.icon] || <ImageIcon size={18} />}
              </div>
              {isOpen && (
                <div className="text-left overflow-hidden">
                  <p className="font-bold text-sm truncate">{tool.title}</p>
                  <p className="text-[10px] opacity-60 truncate">{tool.description}</p>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
           {isOpen ? (
              <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Engine</p>
                </div>
                <p className="text-sm font-bold mb-1">Gemini 3 Pro</p>
                <p className="text-[10px] text-slate-400 leading-tight mb-3">Multimodal reasoning enabled with extended thinking budget.</p>
                <div className="flex items-center gap-2 text-[10px] bg-white/10 p-2 rounded-lg text-blue-300">
                  <Zap size={12} />
                  <span>First-Principles Solving</span>
                </div>
              </div>
           ) : (
              <div className="flex justify-center">
                 <div className="p-2 bg-slate-900 rounded-xl text-blue-400">
                   <Zap size={20} />
                 </div>
              </div>
           )}
        </div>
      </div>
    </aside>
  );
};

const ReasoningIndicator: React.FC = () => {
  const steps = ["Initializing Analysis", "Parsing Visual Data", "Logical Breakdown", "Synthesizing Solution", "Finalizing Steps"];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(s => (s + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm max-w-md w-full animate-in fade-in zoom-in duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <BrainCircuit className="text-white animate-spin-slow" size={20} />
        </div>
        <div>
          <h4 className="font-black text-slate-900 text-sm tracking-tight">Gemini 3 Reasoning Path</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Logic Phase: {currentStep + 1}/5</p>
        </div>
      </div>
      
      <div className="space-y-2 mt-2">
        {steps.map((step, i) => (
          <div key={step} className={`flex items-center gap-3 transition-all duration-500 ${i === currentStep ? 'opacity-100 translate-x-1' : i < currentStep ? 'opacity-50' : 'opacity-20'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${i <= currentStep ? 'bg-blue-600' : 'bg-slate-300'}`} />
            <span className={`text-xs font-bold ${i === currentStep ? 'text-blue-600' : 'text-slate-600'}`}>{step}</span>
            {i < currentStep && <CheckCircle2 size={12} className="text-emerald-500" />}
          </div>
        ))}
      </div>
      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
      </div>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState<AppMode>('STUDENT');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(TOOLS[0]);
  const [input, setInput] = useState('');
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [useSearch, setUseSearch] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPendingImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!input.trim() && !pendingImage) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      parts: [
        { text: input },
        ...(pendingImage ? [{ image: pendingImage }] : [])
      ]
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    const currentImage = pendingImage;
    setInput('');
    setPendingImage(null);
    setIsLoading(true);

    try {
      const toolPrompt = selectedTool?.prompt || "Analyze and solve.";
      let assistantResponse;

      if (selectedTool?.type === 'image') {
        const imageUrl = await geminiService.generateVisual(toolPrompt, currentInput);
        assistantResponse = { content: "I've generated a visual representation to aid your understanding:", parts: [{ text: "Analysis Complete." }, { image: imageUrl }] };
      } else {
        const res = await geminiService.solveProblem(toolPrompt, currentInput, currentImage || undefined, useSearch);
        assistantResponse = { content: res.content || '', groundingLinks: res.groundingLinks };
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse.content,
        timestamp: Date.now(),
        groundingLinks: assistantResponse.groundingLinks,
        parts: assistantResponse.parts as any
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "### System Error\nI encountered a logical disconnect while processing. This may be due to complex input or connectivity issues. Please try again or simplify your request.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        mode={mode} 
        onModeChange={(m) => { setMode(m); setSelectedTool(TOOLS.find(t => t.mode === m) || null); }}
        selectedTool={selectedTool}
        onSelectTool={setSelectedTool}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className="flex-1 flex flex-col relative h-full min-w-0">
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 glass-panel sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${mode === 'STUDENT' ? 'bg-blue-600 shadow-blue-100' : 'bg-indigo-600 shadow-indigo-100'} text-white shadow-lg`}>
              {selectedTool ? ICON_MAP[selectedTool.icon] : (mode === 'STUDENT' ? <GraduationCap size={18} /> : <Store size={18} />)}
            </div>
            <div>
              <h2 className="font-black text-slate-800 text-sm tracking-tight">
                {selectedTool?.title || "Problem Workspace"}
              </h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1">
                <ChevronRight size={10} /> Mode: {mode}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setUseSearch(!useSearch)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black transition-all border ${useSearch ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'}`}
            >
              <Search size={12} />
              REAL-TIME WEB {useSearch ? 'ACTIVE' : 'IDLE'}
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-8 scroll-smooth">
          {messages.length === 0 && (
            <div className="max-w-2xl mx-auto py-24 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] mx-auto mb-8 flex items-center justify-center text-white shadow-2xl rotate-6 animate-bounce-slow">
                 <Sparkles size={40} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">SolveSphere AI</h3>
              <p className="text-base text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                Experience advanced step-by-step problem solving for academic and commercial challenges.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 border border-blue-100 rounded-2xl text-blue-600 text-sm font-bold">
                <Zap size={16} />
                Ready for Multi-Modal Input
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-6 duration-500`}>
              <div className={`max-w-[90%] lg:max-w-[80%] rounded-3xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white p-5 lg:p-6 shadow-xl shadow-blue-100' 
                  : 'bg-white border border-slate-200 p-6 lg:p-8 shadow-sm text-slate-800'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-6 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                    <BrainCircuit size={14} className="animate-pulse" />
                    Logical Breakdown Sequence
                  </div>
                )}

                <div className="space-y-4">
                  {msg.parts?.map((part, idx) => (
                    <div key={idx} className="space-y-4">
                      {part.image && (
                        <div className="relative group">
                          <img src={part.image} alt="Visual" className="rounded-2xl max-h-[500px] w-full object-cover border-4 border-white shadow-lg" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg text-slate-900"><Maximize2 size={20}/></button>
                          </div>
                        </div>
                      )}
                      {part.text && (
                        <div className={`markdown-content prose prose-slate max-w-none ${msg.role === 'user' ? 'text-white' : 'text-slate-800'}`}>
                          {part.text.split('\n').map((line, i) => (
                            <p key={i} className="mb-2 last:mb-0 leading-relaxed">{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {(!msg.parts || msg.parts.length === 0) && (
                    <div className="markdown-content prose prose-slate max-w-none">
                      {msg.content.split('\n').map((line, i) => (
                         <p key={i} className="mb-2 last:mb-0 leading-relaxed">{line}</p>
                      ))}
                    </div>
                  )}
                </div>

                {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                      <Search size={12} /> External Grounding Sources
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {msg.groundingLinks.map((link, i) => (
                        <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-slate-50 text-blue-600 text-[10px] font-bold rounded-lg border border-slate-200 flex items-center gap-2 hover:bg-white hover:border-blue-200 transition-all">
                          <ArrowRight size={10} /> {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
               <ReasoningIndicator />
            </div>
          )}
        </div>

        <div className="p-4 lg:p-8 bg-white border-t border-slate-200 glass-panel">
          <div className="max-w-4xl mx-auto">
            {pendingImage && (
              <div className="mb-4 flex items-center gap-4 animate-in slide-in-from-bottom-2">
                <div className="relative group">
                  <img src={pendingImage} className="w-24 h-24 object-cover rounded-2xl border-4 border-blue-500 shadow-xl" alt="Preview" />
                  <button onClick={() => setPendingImage(null)} className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors">
                    <X size={14} />
                  </button>
                  <div className="absolute inset-0 bg-blue-600/10 rounded-2xl pointer-events-none" />
                </div>
                <div>
                   <p className="text-sm font-black text-blue-600 uppercase tracking-tighter italic">Multi-Modal Uploaded</p>
                   <p className="text-[10px] text-slate-400 font-bold">Waiting for reasoning prompt...</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-3xl p-3 transition-all focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-400 focus-within:bg-white shadow-inner">
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()} 
                className="p-4 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                title="Upload problem image"
              >
                <Camera size={22} />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
                placeholder={selectedTool?.type === 'image' ? "Describe the educational or brand visual you need..." : "Input problem statement or paste documentation..."}
                className="flex-1 min-h-[56px] max-h-48 py-3 px-2 text-sm lg:text-base bg-transparent border-none focus:ring-0 resize-none font-medium placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={(!input.trim() && !pendingImage) || isLoading}
                className={`p-4 rounded-2xl transition-all shadow-xl ${
                  (!input.trim() && !pendingImage) || isLoading 
                    ? 'bg-slate-200 text-slate-400 shadow-none' 
                    : (mode === 'STUDENT' ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-indigo-600 text-white shadow-indigo-200')
                }`}
              >
                {isLoading ? <RefreshCw className="animate-spin" size={22} /> : <Send size={22} />}
              </button>
            </form>
            <div className="flex items-center justify-between mt-4 px-3">
               <div className="flex items-center gap-4">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Logic Engine: Gemini 3 Pro</p>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Reasoning Budget: Max</p>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Zap size={10} className="text-amber-400" /> Secure Processing
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
