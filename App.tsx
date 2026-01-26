
import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Store, 
  Send, 
  Sparkles, 
  RefreshCw, 
  Search, 
  BrainCircuit, 
  Info, 
  Camera, 
  X, 
  ChevronRight, 
  Zap, 
  LayoutDashboard, 
  ShieldCheck, 
  User, 
  ArrowRight,
  LogOut,
  AlertCircle,
  Activity,
  ArrowLeft,
  Edit3,
  Square,
  ChevronDown,
  ChevronUp,
  History,
  Trash2,
  Copy,
  CheckCircle2,
  Layers,
  Clock,
  ExternalLink,
  ChevronLeft,
  Image as ImageIcon,
  Share2,
  Twitter,
  Linkedin,
  Link2,
  FileSearch,
  Cpu,
  Trello,
  Loader2,
  Download,
  Crosshair,
  Maximize2,
  Calendar,
  ChevronRight as ChevronRightIcon,
  SearchCode,
  ZapOff,
  Dna,
  Eye,
  Lock
} from 'lucide-react';
import { PROCESS_MODULES, ICON_MAP } from './constants';
import { AppMode, SolutionResult, UserSession, ProcessModule, HistoryItem } from './types';
import { geminiService } from './services/gemini';

// --- External AI Studio Key Utils ---
// Fix: Use the globally defined AIStudio type and match modifiers for window.aistudio
declare global {
  interface Window {
    readonly aistudio: AIStudio;
  }
}

type ViewMode = 'INPUT' | 'PROCESSING' | 'RESULT' | 'HISTORY' | 'KEY_SELECTION';
type ResultTab = 'AUDIT' | 'SOLUTION' | 'DIAGRAM' | 'SIMULATION';

// --- Landing Page Component ---
const LandingPage: React.FC<{ onEnter: (session: UserSession) => void }> = ({ onEnter }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<AppMode | null>(null);

  const isFormValid = name.trim().length > 0 && role !== null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full"></div>

      <main className="flex-1 flex flex-col items-center justify-center py-16 px-6 sm:px-12 z-10">
        <div className="max-w-md w-full space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[1.8rem] sm:rounded-[2.2rem] mx-auto flex items-center justify-center text-white shadow-xl rotate-3 transform transition-transform hover:rotate-6">
              <Sparkles size={40} className="sm:w-12 sm:h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">SolveSphere</h1>
              <p className="text-slate-500 font-medium text-base sm:text-lg tracking-wide italic">Connecting problems to intelligence</p>
            </div>
          </div>

          <div className="glass-panel p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl space-y-8 sm:space-y-10 relative overflow-hidden bg-white/40">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Your Identity</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should we call you?"
                  className="w-full h-14 sm:h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400 text-sm sm:text-base"
                />
                <User className="absolute right-6 top-4 sm:top-5 text-slate-400" size={20} />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Select Domain</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setRole('STUDENT')}
                  className={`group p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-[1.03] ${role === 'STUDENT' ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                >
                  <GraduationCap size={28} className={`sm:w-8 sm:h-8 transition-transform duration-300 ${role === 'STUDENT' ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Student</span>
                </button>
                <button 
                  onClick={() => setRole('BUSINESS')}
                  className={`group p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-[1.03] ${role === 'BUSINESS' ? 'border-indigo-500 bg-indigo-50 text-indigo-600 shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                >
                  <Store size={28} className={`sm:w-8 sm:h-8 transition-transform duration-300 ${role === 'BUSINESS' ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Business</span>
                </button>
              </div>
            </div>

            <button 
              disabled={!isFormValid}
              onClick={() => role && onEnter({ name, role })}
              className={`w-full h-14 sm:h-16 rounded-2xl font-black text-base sm:text-lg transition-all duration-500 flex items-center justify-center gap-3 group relative overflow-hidden ${
                isFormValid 
                  ? 'bg-slate-900 text-white shadow-xl hover:bg-slate-800 active:scale-[0.98]' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Enter the Sphere
              <ArrowRight size={20} className={`transition-transform duration-300 ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
            </button>
          </div>
        </div>
      </main>
      <footer className="w-full py-8 sm:py-12 px-6 text-center space-y-3 mt-auto border-t border-slate-100 bg-white/50 backdrop-blur-md flex-shrink-0">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.4em]">Engineered on Gemini 3 Reasoning Architecture</p>
        <p className="text-[9px] font-normal text-slate-300 uppercase tracking-[0.15em]">&copy; {new Date().getFullYear()} DanMudi Digital Hub</p>
      </footer>
    </div>
  );
};

// --- Main Dashboard Component ---
const Dashboard: React.FC<{ user: UserSession; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState<ProcessModule>(PROCESS_MODULES.find(m => m.mode === user.role)!);
  const [input, setInput] = useState('');
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [result, setResult] = useState<SolutionResult | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('INPUT');
  const [activeResultTab, setActiveResultTab] = useState<ResultTab>('AUDIT');
  const [isLoading, setIsLoading] = useState(false);
  const [isDiagramLoading, setIsDiagramLoading] = useState(false);
  const [isSimulationLoading, setIsSimulationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useSearch, setUseSearch] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');
  const [isQuestionExpanded, setIsQuestionExpanded] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Initial Key Check ---
  useEffect(() => {
    const checkKey = async () => {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
      if (!selected) setViewMode('KEY_SELECTION');
    };
    checkKey();
  }, []);

  const handleOpenKeyDialog = async () => {
    await window.aistudio.openSelectKey();
    setHasKey(true);
    setViewMode('INPUT');
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem(`solvesphere_history_${user.name}`);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) { console.error("History parse fail", e); }
    }
  }, [user.name]);

  useEffect(() => {
    localStorage.setItem(`solvesphere_history_${user.name}`, JSON.stringify(history));
  }, [history, user.name]);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setProgress(5);
      setProgressStage('Initializing...');
      const stages = activeModule.id === 'academic-solver' 
        ? [
            { threshold: 20, stage: 'Deconstructing parameters...' },
            { threshold: 45, stage: 'Querying high-entropy datasets...' },
            { threshold: 70, stage: 'Synthesizing logic flow...' },
            { threshold: 90, stage: 'Verifying solution integrity...' }
          ]
        : [
            { threshold: 25, stage: 'Scanning input variables...' },
            { threshold: 50, stage: 'Accessing global archives...' },
            { threshold: 75, stage: 'Constructing strategic model...' },
            { threshold: 95, stage: 'Validating output...' }
          ];

      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 98) return 98;
          const increment = Math.random() * (prev > 80 ? 1 : 4);
          const nextProgress = prev + increment;
          const currentStage = stages.find(s => nextProgress < s.threshold);
          if (currentStage) setProgressStage(currentStage.stage);
          else if (nextProgress >= 90) setProgressStage('Polishing output...');
          return nextProgress;
        });
      }, 400);
    } else {
      setProgress(0);
      setProgressStage('');
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLoading, activeModule.id]);

  const handleHomeNavigation = () => {
    handleCancel();
    setInput('');
    setPendingImage(null);
    setResult(null);
    setError(null);
    setViewMode('INPUT');
    setActiveModule(PROCESS_MODULES.find(m => m.mode === user.role)!);
    setSelectedNode(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPendingImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsDiagramLoading(false);
    setIsSimulationLoading(false);
    setViewMode('INPUT');
    setError(null);
  };

  const saveToHistory = (res: SolutionResult) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      moduleId: activeModule.id,
      moduleTitle: activeModule.title,
      input: input,
      result: res
    };
    setHistory(prev => [newItem, ...prev.slice(0, 49)]);
  };

  const handleExecute = async (moduleOverride?: ProcessModule) => {
    const targetModule = moduleOverride || activeModule;
    if ((!input.trim() && !pendingImage) || isLoading) return;
    
    setIsLoading(true);
    setViewMode('PROCESSING');
    setResult(null);
    setError(null);
    setIsQuestionExpanded(false);
    setActiveResultTab('AUDIT');
    setSelectedNode(null);
    
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      let finalResult: SolutionResult;
      finalResult = await geminiService.processRequest(targetModule.prompt, input, pendingImage || undefined, useSearch, abortControllerRef.current.signal);
      
      if (targetModule.type === 'visual') {
        const visual = await geminiService.generateVisual(finalResult.diagramDescription, input, false, abortControllerRef.current.signal);
        finalResult.visual = visual;
        setActiveResultTab('DIAGRAM');
      }
      
      setResult(finalResult);
      saveToHistory(finalResult);
      setProgress(100);
      setViewMode('RESULT');
    } catch (err: any) {
      const msg = String(err?.message || "").toLowerCase();
      if (msg.includes("cancelled") || msg.includes("aborted")) {
        setViewMode('INPUT');
        return;
      };
      setError(err?.message || "Synthesis failure. Check your internet connection.");
      setViewMode('RESULT');
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const triggerDiagramSynthesis = async () => {
    if (!result || isDiagramLoading || result.visual) return;
    setIsDiagramLoading(true);
    setError(null);
    try {
      const visual = await geminiService.generateVisual(result.diagramDescription, input, false);
      const updatedResult = { ...result, visual };
      setResult(updatedResult);
      updateHistoryItem(updatedResult);
    } catch (err: any) {
      setError(err?.message || "Visual schematic engine failure.");
    } finally {
      setIsDiagramLoading(false);
    }
  };

  const triggerSimulationSynthesis = async () => {
    if (!result || isSimulationLoading || result.realisticVisual) return;
    setIsSimulationLoading(true);
    setError(null);
    try {
      const realisticVisual = await geminiService.generateVisual(result.realisticDiagramDescription, input, true);
      const updatedResult = { ...result, realisticVisual };
      setResult(updatedResult);
      updateHistoryItem(updatedResult);
    } catch (err: any) {
      setError(err?.message || "Photorealistic simulation engine failure.");
    } finally {
      setIsSimulationLoading(false);
    }
  };

  const updateHistoryItem = (updatedResult: SolutionResult) => {
    setHistory(prev => prev.map(item => 
      item.input === input && item.moduleId === activeModule.id 
      ? { ...item, result: updatedResult } 
      : item
    ));
  };

  const handleTabSwitch = (tab: ResultTab) => {
    setActiveResultTab(tab);
    if (tab === 'DIAGRAM' && result && !result.visual && !isDiagramLoading) {
      triggerDiagramSynthesis();
    } else if (tab === 'SIMULATION' && result && !result.realisticVisual && !isSimulationLoading) {
      triggerSimulationSynthesis();
    }
  };

  const handleEditInput = () => {
    setViewMode('INPUT');
    setError(null);
    setIsQuestionExpanded(false);
  };

  const handleRestoreHistory = (item: HistoryItem) => {
    const mod = PROCESS_MODULES.find(m => m.id === item.moduleId);
    if (mod) setActiveModule(mod);
    setInput(item.input);
    setResult(item.result);
    setViewMode('RESULT');
    setActiveResultTab(item.result.visual ? 'DIAGRAM' : 'AUDIT');
    setSelectedNode(null);
  };

  const clearHistory = () => {
    if (window.confirm("Clear logic history permanently?")) setHistory([]);
  };

  const deleteHistoryItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(i => i.id !== id));
  };

  const copySolution = () => {
    if (result?.solution) {
      navigator.clipboard.writeText(result.solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const shareTitle = `SolveSphere Synthesis: ${activeModule.title}`;
    const shareText = `Check out this AI-powered logic synthesis for: "${input}"\n\nANALYSIS:\n${result?.analysis}\n\nCORE SOLUTION:\n${result?.solution}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Native share failed:", err);
        setIsShareModalOpen(true);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const shareToX = () => {
    const text = encodeURIComponent(`SolveSphere AI Analysis: ${input.slice(0, 50)}...`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const downloadDiagram = (isRealistic: boolean = false) => {
    const uri = isRealistic ? result?.realisticVisual : result?.visual;
    if (!uri) return;
    const link = document.createElement('a');
    link.href = uri;
    link.download = `solvesphere-${isRealistic ? 'simulation' : 'diagram'}-${Date.now()}.png`;
    link.click();
  };

  const selectedNodeData = result?.diagramNodes?.find(n => n.label === selectedNode);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans text-slate-900 text-left">
      {/* Persistent Header */}
      <header className="h-16 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between z-[70] flex-shrink-0 backdrop-blur-2xl">
        <div className="flex items-center gap-4 sm:gap-6 text-left">
          <button onClick={handleHomeNavigation} className="flex items-center gap-2 hover:opacity-70 transition-opacity text-left">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-md">
              <Sparkles size={16} />
            </div>
            <h2 className="font-black text-slate-900 tracking-tight hidden xs:block text-sm sm:text-base">SolveSphere</h2>
          </button>
          <div className="h-6 w-px bg-slate-100 hidden md:block" />
          <div className="hidden md:flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
              <User size={16} className="text-slate-400" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-900 leading-none">{user.name}</p>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button 
            onClick={() => setViewMode(viewMode === 'HISTORY' ? 'INPUT' : 'HISTORY')}
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all ${viewMode === 'HISTORY' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-500 border-slate-100 hover:text-slate-900'}`}
          >
            <History size={12} />
            <span className="hidden sm:inline">HISTORY</span>
          </button>
          <button 
            onClick={() => setUseSearch(!useSearch)}
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all ${useSearch ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm' : 'bg-slate-50 text-slate-500 border-slate-100'}`}
          >
            <Search size={10} />
            <span className="hidden sm:inline">SEARCH</span>
          </button>
          <div className="w-px h-6 bg-slate-100 mx-1" />
          <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <div className={`hidden lg:flex w-72 bg-slate-50 border-r border-slate-100 flex-col p-5 overflow-y-auto transition-all duration-500 z-50 ${viewMode === 'RESULT' ? '-ml-72 opacity-0' : 'ml-0 opacity-100'}`}>
          <div className="flex-1 space-y-10">
            <section>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-5 px-1">Logic Modules</p>
              <div className="space-y-1.5">
                {PROCESS_MODULES.filter(m => m.mode === user.role).map(module => (
                  <button 
                    key={module.id}
                    onClick={() => {
                      setActiveModule(module);
                      setError(null);
                      if (viewMode === 'HISTORY') setViewMode('INPUT');
                    }}
                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left transition-all ${activeModule.id === module.id && viewMode !== 'HISTORY' ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-500 hover:bg-slate-100/50'}`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 ${activeModule.id === module.id && viewMode !== 'HISTORY' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100 text-slate-400'}`}>
                      {ICON_MAP[module.icon]}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold leading-tight">{module.title}</p>
                      <p className={`text-[9px] font-medium mt-0.5 ${activeModule.id === module.id && viewMode !== 'HISTORY' ? 'text-slate-500' : 'text-slate-400'} leading-tight line-clamp-1`}>{module.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {history.length > 0 && (
              <section className="animate-in fade-in duration-700 text-left">
                <div className="flex items-center justify-between px-1 mb-5">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Recent Activity</p>
                  <button onClick={clearHistory} className="text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="space-y-2.5">
                  {history.slice(0, 4).map(item => (
                    <button 
                      key={item.id}
                      onClick={() => handleRestoreHistory(item)}
                      className="w-full p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-300 text-left transition-all group shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{item.moduleTitle}</span>
                        <span className="text-[8px] text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed italic">"{item.input}"</p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="pt-6 border-t border-slate-100 mt-6 text-center">
             <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">DanMudi Lab &bull; v2.6</p>
          </div>
        </div>

        {/* Content Pane */}
        <div className="flex-1 bg-white relative flex flex-col overflow-hidden">
          
          {/* KEY SELECTION VIEW */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-white transition-all duration-700 ease-in-out ${viewMode === 'KEY_SELECTION' ? 'translate-y-0 opacity-100 z-[100]' : '-translate-y-full opacity-0 z-0'}`}>
              <div className="max-w-md w-full glass-panel p-12 rounded-[3.5rem] text-center space-y-10 shadow-2xl bg-white border border-slate-100">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto border border-blue-100">
                    <Lock size={40} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">High-Reasoning Locked</h2>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm">
                      Advanced synthesis requires a paid API key from your personal GCP project. Please connect your key to continue.
                    </p>
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Billing Documentation &rarr;</a>
                  </div>
                  <button 
                    onClick={handleOpenKeyDialog}
                    className="w-full h-16 bg-slate-900 text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.3em] shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                  >
                    Select API Key <ChevronRight size={16} />
                  </button>
                </div>
          </div>

          {/* INPUT VIEW */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-500 ease-out ${viewMode === 'INPUT' ? 'translate-y-0 opacity-100 z-30' : 'translate-y-full opacity-0 z-0'}`}>
              <div className="p-6 border-b border-slate-50 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-lg" />
                  <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.3em]">Neural Flow Ready</h3>
                </div>
              </div>
              <div className="flex-1 p-6 sm:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto w-full space-y-10 animate-slide-up text-left">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Synthesis Parameters</p>
                    </div>
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={activeModule.placeholder}
                      className="w-full h-72 sm:h-96 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-slate-900 outline-none focus:ring-8 focus:ring-slate-100 focus:border-slate-300 transition-all resize-none font-medium leading-[1.8] text-base sm:text-lg placeholder:text-slate-300 shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pb-12 text-left">
                    <div className="space-y-4">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Visual Anchors</p>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                      {pendingImage ? (
                        <div className="relative group w-48 h-48">
                          <img src={pendingImage} className="w-full h-full object-cover rounded-3xl border border-slate-200 shadow-xl" />
                          <button onClick={() => setPendingImage(null)} className="absolute -top-3 -right-3 p-2 bg-slate-900 text-white rounded-full shadow-lg hover:scale-110 transition-transform"><X size={16}/></button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full xs:w-48 h-48 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-blue-200 hover:text-blue-500 transition-all bg-slate-50 group"
                        >
                          <Camera size={32} className="group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Attach Media</span>
                        </button>
                      )}
                    </div>
                    <div className="glass-panel p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center gap-4 text-left">
                      <div className="flex items-center gap-3 text-blue-600">
                        <Zap size={18} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Thinking Budget</h4>
                      </div>
                      <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                        Gemini 3 Pro will allocate 16,000 thinking tokens to deconstruct your request using multi-layered reasoning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-10 bg-white border-t border-slate-100 backdrop-blur-xl z-10">
                <div className="max-w-4xl mx-auto w-full">
                  <button 
                    onClick={() => handleExecute()}
                    disabled={(!input.trim() && !pendingImage) || isLoading}
                    className="w-full h-16 sm:h-20 bg-slate-900 text-white rounded-[2rem] sm:rounded-[2.5rem] font-black text-lg sm:text-xl shadow-2xl hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-4 group"
                  >
                    <BrainCircuit size={28} className="group-hover:rotate-12 transition-transform" />
                    Begin Synthesis
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
          </div>

          {/* PROCESSING VIEW */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-white transition-all duration-700 ease-in-out ${viewMode === 'PROCESSING' ? 'translate-y-0 opacity-100 z-40' : '-translate-y-full opacity-0 z-0'}`}>
              <div className="max-w-xl w-full space-y-12 animate-slide-up text-center">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-slate-50 border border-slate-100 text-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto animate-pulse shadow-xl">
                    <Activity size={44} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Synthesizing Logic</h2>
                    <p className="text-blue-600 font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">{progressStage}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-slate-900 transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                   <div className="flex items-center justify-center text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    Neural Status: {Math.round(progress)}%
                  </div>
                </div>
                <div className="flex justify-center pt-8">
                  <button onClick={handleCancel} className="flex items-center gap-3 px-8 py-3.5 bg-red-50 text-red-600 text-[10px] font-black rounded-2xl hover:bg-red-100 transition-all uppercase tracking-widest border border-red-100">
                    <Square size={12} fill="currentColor" /> Terminate
                  </button>
                </div>
              </div>
          </div>

          {/* RESULT VIEW */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-1000 ease-in-out ${viewMode === 'RESULT' ? 'translate-y-0 opacity-100 z-50' : 'translate-y-full opacity-0 z-0'}`}>
              
              <div className="bg-white/90 backdrop-blur-3xl border-b border-slate-100 z-[60] shadow-sm flex-shrink-0">
                <div className="max-w-5xl mx-auto w-full px-6 py-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-left">
                    <button 
                      onClick={() => setIsQuestionExpanded(!isQuestionExpanded)}
                      className="flex items-center gap-4 group text-slate-400 hover:text-slate-900 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm group-hover:bg-white transition-all">
                        <LayoutDashboard size={18} />
                      </div>
                      <div className="overflow-hidden text-left">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Active Synthesis</p>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-black text-slate-900 truncate">{activeModule.title}</h4>
                          <ChevronDown size={14} className={`transition-transform duration-300 ${isQuestionExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </button>

                    <div className="flex-1 max-w-sm mx-auto hidden sm:flex items-center justify-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                      <button 
                        onClick={() => handleTabSwitch('AUDIT')}
                        className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeResultTab === 'AUDIT' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Insights
                      </button>
                      <button 
                        onClick={() => handleTabSwitch('SOLUTION')}
                        className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeResultTab === 'SOLUTION' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Solution
                      </button>
                      <button 
                        onClick={() => handleTabSwitch('DIAGRAM')}
                        className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeResultTab === 'DIAGRAM' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Diagram
                      </button>
                      <button 
                        onClick={() => handleTabSwitch('SIMULATION')}
                        className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeResultTab === 'SIMULATION' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Simulation
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                       <button onClick={handleEditInput} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-slate-600 text-[10px] font-black rounded-xl hover:bg-slate-50 transition-all border border-slate-100">
                        <Edit3 size={14} /> Update
                      </button>
                      <button onClick={() => handleExecute()} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-slate-800 transition-all shadow-md">
                        <RefreshCw size={14} /> <span className="hidden xs:inline">Reset</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto bg-white scroll-smooth custom-scrollbar text-left">
                <div className="max-w-5xl mx-auto w-full px-6 sm:px-12 py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 text-left">
                  
                  {activeResultTab === 'AUDIT' && (
                    <div className="space-y-20 animate-in fade-in duration-500 text-left">
                      <div className="space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 flex items-center justify-center">
                            <FileSearch size={20} />
                          </div>
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Section 01 / Problem Audit</h4>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-6 top-0 bottom-0 w-1 bg-slate-100 hidden sm:block" />
                          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-900 font-semibold leading-[1.6] tracking-tight">
                            {result?.analysis}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-10 max-w-3xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 flex items-center justify-center">
                            <BrainCircuit size={20} />
                          </div>
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Reasoning Path</h4>
                        </div>
                        <div className="space-y-6">
                          {result?.steps.map((step, i) => (
                            <div key={i} className="flex gap-6 group">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                  {i + 1}
                                </div>
                                {i < (result?.steps.length || 0) - 1 && <div className="w-0.5 flex-1 bg-slate-100 mt-3" />}
                              </div>
                              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed pt-1.5">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeResultTab === 'SOLUTION' && (
                    <div className="space-y-20 animate-in fade-in duration-500 text-left">
                      <div className="space-y-8">
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 flex items-center justify-center">
                              <Cpu size={20} />
                            </div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Synthesis core</h4>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={handleShare} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all"><Share2 size={14} /> Share</button>
                            <button onClick={copySolution} className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${copied ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-900'}`}>{copied ? <><CheckCircle2 size={14} /> Copied</> : <><Copy size={14} /> Copy</>}</button>
                          </div>
                        </div>
                        <div className="bg-slate-50 p-10 sm:p-14 rounded-[3rem] text-slate-900 shadow-2xl relative overflow-hidden group border border-slate-100">
                          <div className="absolute top-0 left-0 w-2 h-full bg-slate-900" />
                          <div className="prose prose-slate max-w-none text-base sm:text-lg lg:text-xl text-slate-900 leading-[1.7] font-medium whitespace-pre-wrap">
                            {result?.solution}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-center gap-6 group hover:border-slate-300 transition-all duration-500">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Strategic Path</h4>
                          <p className="text-lg sm:text-xl text-slate-900 font-bold leading-relaxed italic">"{result?.recommendations}"</p>
                        </div>
                        {result?.links && result.links.length > 0 && (
                          <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-2">Knowledge Sources</h4>
                            <div className="grid gap-3">
                              {result.links.map((link, i) => (
                                <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all group shadow-sm">
                                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 truncate pr-4">{link.title}</span>
                                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all border border-slate-100 flex-shrink-0"><ExternalLink size={14} /></div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeResultTab === 'DIAGRAM' && (
                    <div className="space-y-16 animate-in fade-in duration-500">
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 flex items-center justify-center">
                          <Trello size={24} />
                        </div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Section 03 / Schematic Blueprint</h4>
                      </div>

                      {isDiagramLoading ? (
                        <div className="py-32 flex flex-col items-center justify-center gap-6 animate-pulse text-center">
                          <Loader2 size={48} className="text-slate-900 animate-spin" />
                          <div className="space-y-2">
                             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Architecting Schematic Diagram...</p>
                          </div>
                        </div>
                      ) : result?.visual ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                          <div className="lg:col-span-2 space-y-8">
                            <div className="relative group overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-50 via-white to-blue-50/30 shadow-2xl border border-slate-100 p-4 sm:p-8">
                              <img src={result.visual} className="w-full h-auto max-h-[700px] object-contain transition-all duration-1000 group-hover:scale-[1.02] rounded-[1.5rem] mx-auto mix-blend-multiply" alt="Schematic Diagram" />
                              <div className="absolute top-8 right-8 flex gap-2">
                                <button onClick={() => downloadDiagram(false)} className="p-4 bg-white/80 backdrop-blur-md text-slate-900 rounded-2xl border border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-xl"><Download size={20} /></button>
                              </div>
                              {/* Hover Tooltip Overlay (Central) */}
                              {hoveredNode && !selectedNode && (
                                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center p-8 animate-in fade-in zoom-in duration-300 pointer-events-none">
                                  <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-xs text-center space-y-2">
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{result.diagramNodes?.find(n => n.label === hoveredNode)?.label}</p>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{result.diagramNodes?.find(n => n.label === hoveredNode)?.description}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Persistent Logic Inspector */}
                            <div className={`transition-all duration-500 transform ${selectedNode ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
                              <div className="p-8 sm:p-10 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl space-y-4 relative overflow-hidden group">
                                <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg">
                                      <SearchCode size={18} />
                                    </div>
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Component Analysis</h5>
                                  </div>
                                  <button onClick={() => setSelectedNode(null)} className="p-2 text-slate-400 hover:text-white transition-colors">
                                    <X size={20} />
                                  </button>
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">{selectedNodeData?.label}</h3>
                                <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                                  {selectedNodeData?.description}
                                </p>
                              </div>
                            </div>

                            {!selectedNode && (
                              <div className="flex items-center gap-3 px-2 text-slate-400 animate-pulse">
                                <Crosshair size={14} />
                                <p className="text-[10px] font-bold uppercase tracking-widest">Select a component for deep analysis</p>
                              </div>
                            )}
                          </div>

                          <div className="space-y-8">
                            <div className="flex items-center gap-3 px-2">
                               <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Blueprint Guide</h5>
                            </div>
                            <div className="space-y-3">
                              {result.diagramNodes?.map((node, i) => (
                                <button 
                                  key={i}
                                  onMouseEnter={() => setHoveredNode(node.label)}
                                  onMouseLeave={() => setHoveredNode(null)}
                                  onClick={() => setSelectedNode(selectedNode === node.label ? null : node.label)}
                                  className={`w-full p-5 rounded-2xl border transition-all text-left group ${selectedNode === node.label ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]' : hoveredNode === node.label ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-900 hover:border-slate-300'}`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedNode === node.label ? 'text-blue-100' : 'text-inherit opacity-70 group-hover:opacity-100'}`}>{node.label}</span>
                                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${selectedNode === node.label ? 'bg-white animate-ping' : hoveredNode === node.label ? 'bg-blue-400' : 'bg-slate-100 group-hover:bg-slate-200'}`} />
                                  </div>
                                  <p className={`text-xs leading-relaxed font-medium transition-colors ${selectedNode === node.label ? 'text-blue-100/90' : hoveredNode === node.label ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {node.description.slice(0, 60)}...
                                  </p>
                                </button>
                              ))}
                            </div>
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                               <div className="flex items-center gap-2 text-slate-400">
                                 <Dna size={14} />
                                 <p className="text-[10px] font-black uppercase tracking-widest">Guide Logic</p>
                               </div>
                               <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                 Click on components in this guide to lock them in the <b>Logic Inspector</b> for persistent reference.
                               </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-20 sm:py-32 flex flex-col items-center justify-center gap-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[4rem] text-center">
                           <ImageIcon size={48} className="text-slate-300" />
                           <div className="space-y-3">
                             <h5 className="text-xl font-bold text-slate-600">Render Logic Map</h5>
                             <p className="text-sm text-slate-400 max-w-sm mx-auto">Generate a schematic vector-style diagram with interactive tooltips and component inspector.</p>
                           </div>
                           <button onClick={triggerDiagramSynthesis} className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">Trigger Schematic Render</button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeResultTab === 'SIMULATION' && (
                    <div className="space-y-16 animate-in fade-in duration-500">
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 flex items-center justify-center">
                          <Eye size={24} />
                        </div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Section 04 / Realistic Simulation</h4>
                      </div>

                      {isSimulationLoading ? (
                        <div className="py-32 flex flex-col items-center justify-center gap-6 animate-pulse text-center">
                          <Loader2 size={48} className="text-slate-900 animate-spin" />
                          <div className="space-y-2">
                             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Generating High-Fidelity Simulation...</p>
                          </div>
                        </div>
                      ) : result?.realisticVisual ? (
                        <div className="space-y-12">
                          <div className="relative group overflow-hidden rounded-[3rem] bg-slate-900 shadow-2xl border border-slate-800 aspect-video flex items-center justify-center">
                            <img src={result.realisticVisual} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-[1.05]" alt="Realistic Simulation" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-8 right-8 flex gap-2">
                              <button onClick={() => downloadDiagram(true)} className="p-4 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20 hover:bg-white hover:text-slate-900 transition-all shadow-xl"><Download size={20} /></button>
                            </div>
                            <div className="absolute bottom-8 left-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                               <p className="text-sm font-medium leading-relaxed max-w-2xl bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                 {result.realisticDiagramDescription}
                               </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 border border-slate-100"><Sparkles size={20}/></div>
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visual Context</h5>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">This simulation visualizes the theoretical solution in a high-fidelity real-world context for better spatial and environmental understanding.</p>
                             </div>
                             <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 border border-slate-100"><Cpu size={20}/></div>
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rendering Engine</h5>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">Synthesized using Gemini 2.5 Flash Image architecture with neural photorealism prompts derived from core analysis.</p>
                             </div>
                             <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 border border-slate-100"><Eye size={20}/></div>
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Perspective Mode</h5>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">Switch between <b>Schematic</b> for logic and <b>Simulation</b> for practical real-world manifestation.</p>
                             </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-20 sm:py-32 flex flex-col items-center justify-center gap-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[4rem] text-center">
                           <Eye size={48} className="text-slate-300" />
                           <div className="space-y-3">
                             <h5 className="text-xl font-bold text-slate-600">Synthesize Simulation</h5>
                             <p className="text-sm text-slate-400 max-w-sm mx-auto">Generate a photorealistic simulation showing how this solution operates in the real world.</p>
                           </div>
                           <button onClick={triggerSimulationSynthesis} className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">Start Rendering</button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="h-24" />
                </div>
              </div>
          </div>

          {/* Share Modal */}
          {isShareModalOpen && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xl z-[150] flex items-center justify-center p-8 animate-in fade-in duration-300">
               <div className="max-w-sm w-full glass-panel p-10 rounded-[3rem] text-center space-y-8 shadow-2xl relative bg-white border border-slate-100">
                  <button onClick={() => setIsShareModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"><X size={20}/></button>
                  <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mx-auto border border-slate-100"><Share2 size={32} /></div>
                  <div className="space-y-2 text-center"><h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.4em]">Broadcast Synthesis</h4></div>
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <button onClick={shareToX} className="w-full h-14 bg-slate-50 border border-slate-100 text-slate-900 rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 text-sm font-bold"><Twitter size={18} /> Share on X</button>
                    <button onClick={shareToLinkedIn} className="w-full h-14 bg-slate-50 border border-slate-100 text-slate-900 rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 text-sm font-bold"><Linkedin size={18} /> LinkedIn</button>
                    <button onClick={() => { copySolution(); setIsShareModalOpen(false); }} className="w-full h-14 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 text-sm font-bold shadow-lg"><Link2 size={18} /> Copy Solution</button>
                  </div>
                </div>
            </div>
          )}

          {/* History Page */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-700 ease-in-out ${viewMode === 'HISTORY' ? 'translate-y-0 opacity-100 z-50' : 'translate-y-full opacity-0 z-0'}`}>
              <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white/80 backdrop-blur-3xl z-[100]">
                <div className="flex items-center gap-4 text-left">
                  <button onClick={() => setViewMode('INPUT')} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-left"><ChevronLeft size={20} /></button>
                  <div className="text-left">
                    <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.3em]">Logic Repository</h3>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">{history.length} archived syntheses</p>
                  </div>
                </div>
                {history.length > 0 && <button onClick={clearHistory} className="px-4 py-2 text-[10px] font-black text-red-500 hover:bg-red-50 rounded-xl uppercase tracking-widest flex items-center gap-2 transition-all"><Trash2 size={12} /> Clear Memory</button>}
              </div>
              <div className="flex-1 p-6 sm:p-12 overflow-y-auto bg-slate-50/50">
                <div className="max-w-5xl mx-auto w-full">
                  {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-40 text-center space-y-8 animate-in fade-in zoom-in duration-700">
                      <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-slate-200 border border-slate-100 shadow-sm">
                        <History size={48} strokeWidth={1.5} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-bold text-slate-400">Neural Repository Empty</p>
                        <p className="text-sm text-slate-400 max-w-xs mx-auto">Start a new synthesis to begin building your logic history.</p>
                      </div>
                      <button onClick={() => setViewMode('INPUT')} className="px-12 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all">Generate Solution</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
                      {history.map((item, idx) => (
                        <div 
                          key={item.id} 
                          onClick={() => handleRestoreHistory(item)} 
                          className="group relative p-8 bg-white border border-slate-100 hover:border-blue-200 rounded-[2.5rem] transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col gap-6"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all">
                                {PROCESS_MODULES.find(m => m.id === item.moduleId) ? ICON_MAP[PROCESS_MODULES.find(m => m.id === item.moduleId)!.icon] : <Layers size={18} />}
                              </div>
                              <div className="text-left">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{item.moduleTitle}</p>
                                <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-1">
                                  <Calendar size={10} /> {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                  <span className="opacity-20 px-1">•</span>
                                  <Clock size={10} /> {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => deleteHistoryItem(e, item.id)} 
                              className="p-2.5 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors" />
                              <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Input Query</h5>
                            </div>
                            <p className="text-sm text-slate-600 font-medium leading-[1.7] line-clamp-3 italic opacity-80 group-hover:opacity-100 transition-opacity">
                              "{item.input}"
                            </p>
                          </div>

                          <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${item.result.visual ? 'bg-indigo-400' : 'bg-slate-200'}`} title={item.result.visual ? 'Visual Schematic Included' : 'Textual Solution Only'} />
                              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                                {item.result.visual ? 'Blueprint + Logic' : 'Standard Logic'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                              View Results <ChevronRightIcon size={12} strokeWidth={3} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
          </div>

          {error && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl z-[150] flex items-center justify-center p-8">
               <div className="max-w-md w-full glass-panel p-12 rounded-[3.5rem] text-center space-y-10 shadow-2xl bg-white border border-slate-100">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto border border-red-100"><AlertCircle size={40} /></div>
                  <div className="space-y-2"><h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.4em]">Engine Overload</h4><p className="text-slate-500 font-medium leading-relaxed">{error}</p></div>
                  <div className="flex flex-col gap-3 pt-6">
                    <button onClick={() => { handleExecute(); setError(null); }} className="w-full h-16 bg-slate-900 text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.3em] shadow-lg">Retry Synthesis</button>
                    <button onClick={handleEditInput} className="w-full h-16 bg-white text-slate-400 text-[10px] font-black rounded-2xl uppercase tracking-[0.3em] border border-slate-100">Refine Input</button>
                  </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);

  if (!session) {
    return <LandingPage onEnter={setSession} />;
  }

  return <Dashboard user={session} onLogout={() => setSession(null)} />;
}
