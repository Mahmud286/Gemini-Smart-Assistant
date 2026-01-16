
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
  Download
} from 'lucide-react';
import { PROCESS_MODULES, ICON_MAP } from './constants';
import { AppMode, SolutionResult, UserSession, ProcessModule, HistoryItem } from './types';
import { geminiService } from './services/gemini';

type ViewMode = 'INPUT' | 'PROCESSING' | 'RESULT' | 'HISTORY';
type ResultTab = 'AUDIT' | 'SOLUTION' | 'DIAGRAM';

// --- Landing Page Component ---
const LandingPage: React.FC<{ onEnter: (session: UserSession) => void }> = ({ onEnter }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<AppMode | null>(null);

  const isFormValid = name.trim().length > 0 && role !== null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full"></div>

      <main className="flex-1 flex flex-col items-center justify-center py-16 px-6 sm:px-12 z-10">
        <div className="max-w-md w-full space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[1.8rem] sm:rounded-[2.2rem] mx-auto flex items-center justify-center text-white shadow-[0_0_50px_rgba(37,99,235,0.3)] rotate-3 transform transition-transform hover:rotate-6">
              <Sparkles size={40} className="sm:w-12 sm:h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter">SolveSphere</h1>
              <p className="text-slate-400 font-medium text-base sm:text-lg tracking-wide italic">Connecting problems to intelligence</p>
            </div>
          </div>

          <div className="glass-panel p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl space-y-8 sm:space-y-10 relative overflow-hidden">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Your Identity</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should we call you?"
                  className="w-full h-14 sm:h-16 px-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-semibold text-white placeholder:text-slate-600 text-sm sm:text-base"
                />
                <User className="absolute right-6 top-4 sm:top-5 text-slate-600" size={20} />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Select Domain</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setRole('STUDENT')}
                  className={`group p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-[1.03] ${role === 'STUDENT' ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-700'}`}
                >
                  <GraduationCap size={28} className={`sm:w-8 sm:h-8 transition-transform duration-300 ${role === 'STUDENT' ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Student</span>
                </button>
                <button 
                  onClick={() => setRole('BUSINESS')}
                  className={`group p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-[1.03] ${role === 'BUSINESS' ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-700'}`}
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
                  ? 'bg-white text-slate-950 shadow-[0_10px_40px_rgba(255,255,255,0.15)] hover:bg-slate-100 active:scale-[0.98]' 
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              Enter the Sphere
              <ArrowRight size={20} className={`transition-transform duration-300 ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
            </button>
          </div>
        </div>
      </main>
      <footer className="w-full py-8 sm:py-12 px-6 text-center space-y-3 mt-auto border-t border-slate-900 bg-slate-950/50 backdrop-blur-md flex-shrink-0">
        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.4em]">Engineered on Gemini 3 Reasoning Architecture</p>
        <p className="text-[9px] font-normal text-slate-600 uppercase tracking-[0.15em]">&copy; {new Date().getFullYear()} DanMudi Digital Hub</p>
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
  const [error, setError] = useState<string | null>(null);
  const [useSearch, setUseSearch] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');
  const [isQuestionExpanded, setIsQuestionExpanded] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    abortControllerRef.current = new AbortController();

    try {
      let finalResult: SolutionResult;
      finalResult = await geminiService.processRequest(targetModule.prompt, input, pendingImage || undefined, useSearch, abortControllerRef.current.signal);
      
      // If the module is explicitly visual, pre-generate the diagram
      if (targetModule.type === 'visual') {
        const visual = await geminiService.generateVisual(finalResult.diagramDescription, input, abortControllerRef.current.signal);
        finalResult.visual = visual;
        setActiveResultTab('DIAGRAM');
      }
      
      setResult(finalResult);
      saveToHistory(finalResult);
      setProgress(100);
      setViewMode('RESULT');
    } catch (err: any) {
      if (err?.message === "aborted" || err?.message === "Synthesis cancelled by user.") return;
      setError(err?.message || "Synthesis failure. Please try again.");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const triggerDiagramSynthesis = async () => {
    if (!result || isDiagramLoading || result.visual) return;
    
    setIsDiagramLoading(true);
    try {
      const visual = await geminiService.generateVisual(result.diagramDescription, input);
      setResult({ ...result, visual });
      // Update history with the visual
      setHistory(prev => prev.map(item => 
        item.input === input && item.moduleId === activeModule.id 
        ? { ...item, result: { ...item.result, visual } } 
        : item
      ));
    } catch (err) {
      console.error("Diagram synthesis failed", err);
    } finally {
      setIsDiagramLoading(false);
    }
  };

  const handleTabSwitch = (tab: ResultTab) => {
    setActiveResultTab(tab);
    if (tab === 'DIAGRAM' && result && !result.visual && !isDiagramLoading) {
      triggerDiagramSynthesis();
    }
  };

  const handleSwitchModule = (newModule: ProcessModule) => {
    if (newModule.id === activeModule.id) return;
    setActiveModule(newModule);
    handleExecute(newModule);
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

  const downloadDiagram = () => {
    if (!result?.visual) return;
    const link = document.createElement('a');
    link.href = result.visual;
    link.download = `solvesphere-diagram-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden font-sans text-slate-200 text-left">
      {/* Dynamic persistent header */}
      <header className="h-16 bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-[70] flex-shrink-0 backdrop-blur-2xl">
        <div className="flex items-center gap-4 sm:gap-6 text-left">
          <button onClick={handleHomeNavigation} className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
              <Sparkles size={16} />
            </div>
            <h2 className="font-black text-white tracking-tight hidden xs:block text-sm sm:text-base">SolveSphere</h2>
          </button>
          <div className="h-6 w-px bg-slate-800 hidden md:block" />
          <div className="hidden md:flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <User size={16} className="text-slate-400" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-white leading-none">{user.name}</p>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-0.5">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button 
            onClick={() => setViewMode(viewMode === 'HISTORY' ? 'INPUT' : 'HISTORY')}
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all ${viewMode === 'HISTORY' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:text-white'}`}
          >
            <History size={12} />
            <span className="hidden sm:inline">HISTORY</span>
          </button>
          <button 
            onClick={() => setUseSearch(!useSearch)}
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all ${useSearch ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}
          >
            <Search size={10} />
            <span className="hidden sm:inline">SEARCH</span>
          </button>
          <div className="w-px h-6 bg-slate-800 mx-1" />
          <button onClick={onLogout} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <div className={`hidden lg:flex w-72 bg-slate-900 border-r border-slate-800 flex-col p-5 overflow-y-auto transition-all duration-500 z-50 ${viewMode === 'RESULT' ? '-ml-72 opacity-0' : 'ml-0 opacity-100'}`}>
          <div className="flex-1 space-y-10">
            <section>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-5 px-1">Logic Modules</p>
              <div className="space-y-1.5">
                {PROCESS_MODULES.filter(m => m.mode === user.role).map(module => (
                  <button 
                    key={module.id}
                    onClick={() => {
                      setActiveModule(module);
                      setError(null);
                      if (viewMode === 'HISTORY') setViewMode('INPUT');
                    }}
                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left transition-all ${activeModule.id === module.id && viewMode !== 'HISTORY' ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-400 hover:bg-slate-800/60'}`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 ${activeModule.id === module.id && viewMode !== 'HISTORY' ? 'bg-slate-900 text-white' : 'bg-slate-800'}`}>
                      {ICON_MAP[module.icon]}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold leading-tight">{module.title}</p>
                      <p className={`text-[9px] font-medium mt-0.5 ${activeModule.id === module.id && viewMode !== 'HISTORY' ? 'text-slate-600' : 'text-slate-500'} leading-tight line-clamp-1`}>{module.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {history.length > 0 && (
              <section className="animate-in fade-in duration-700 text-left">
                <div className="flex items-center justify-between px-1 mb-5">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Recent Activity</p>
                  <button onClick={clearHistory} className="text-slate-600 hover:text-red-400 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="space-y-2.5">
                  {history.slice(0, 4).map(item => (
                    <button 
                      key={item.id}
                      onClick={() => handleRestoreHistory(item)}
                      className="w-full p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60 hover:border-blue-500/30 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">{item.moduleTitle}</span>
                        <span className="text-[8px] text-slate-700">{new Date(item.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 group-hover:text-slate-200 leading-relaxed italic">"{item.input}"</p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="pt-6 border-t border-slate-800/60 mt-6 text-center">
             <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">DanMudi Lab &bull; v2.6</p>
          </div>
        </div>

        {/* Main Content Pane */}
        <div className="flex-1 bg-slate-950 relative flex flex-col overflow-hidden">
          
          {/* 1. INPUT VIEW */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-500 ease-out ${viewMode === 'INPUT' ? 'translate-y-0 opacity-100 z-30' : 'translate-y-full opacity-0 z-0'}`}>
              <div className="p-6 border-b border-slate-900/50 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.3em]">Ready for Neural Flow</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-600 hidden sm:block">Session Context: {activeModule.title}</span>
              </div>
              <div className="flex-1 p-6 sm:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto w-full space-y-10 animate-slide-up">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Core Synthesis parameters</p>
                      <button onClick={() => setInput('')} className="text-[10px] font-bold text-slate-700 hover:text-slate-500 uppercase tracking-widest">Reset</button>
                    </div>
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={activeModule.placeholder}
                      className="w-full h-72 sm:h-96 p-8 bg-slate-900/30 rounded-[2.5rem] border border-slate-800/80 text-white outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all resize-none font-medium leading-[1.8] text-base sm:text-lg placeholder:text-slate-800 shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pb-12">
                    <div className="space-y-4">
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Visual Anchors</p>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                      {pendingImage ? (
                        <div className="relative group w-48 h-48">
                          <img src={pendingImage} className="w-full h-full object-cover rounded-3xl border border-blue-500/30 shadow-2xl" />
                          <button onClick={() => setPendingImage(null)} className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"><X size={16}/></button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full xs:w-48 h-48 border-2 border-dashed border-slate-800/80 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-600 hover:border-blue-500/40 hover:text-blue-500 transition-all bg-slate-900/10 group"
                        >
                          <Camera size={32} className="group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Attach Media</span>
                        </button>
                      )}
                    </div>
                    <div className="glass-panel p-8 rounded-[2.5rem] border border-slate-800/50 flex flex-col justify-center gap-4">
                      <div className="flex items-center gap-3 text-blue-400">
                        <Zap size={18} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Thinking Budget</h4>
                      </div>
                      <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                        Gemini 3 Pro will allocate 16,000 thinking tokens to deconstruct your request using multi-layered reasoning. Schematic diagramming is enabled for all conceptual mappings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-10 bg-slate-950/80 border-t border-slate-900/50 backdrop-blur-xl z-10">
                <div className="max-w-4xl mx-auto w-full">
                  <button 
                    onClick={() => handleExecute()}
                    disabled={(!input.trim() && !pendingImage) || isLoading}
                    className="w-full h-16 sm:h-20 bg-white text-slate-950 rounded-[2rem] sm:rounded-[2.5rem] font-black text-lg sm:text-xl shadow-2xl hover:bg-slate-100 transition-all active:scale-[0.98] disabled:opacity-10 flex items-center justify-center gap-4 group"
                  >
                    <BrainCircuit size={28} className="group-hover:rotate-12 transition-transform" />
                    Begin Synthesis
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
          </div>

          {/* 2. PROCESSING VIEW */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-950 transition-all duration-700 ease-in-out ${viewMode === 'PROCESSING' ? 'translate-y-0 opacity-100 z-40' : '-translate-y-full opacity-0 z-0'}`}>
              <div className="max-w-xl w-full space-y-12 animate-slide-up text-center">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-blue-500/5 border border-blue-500/10 text-blue-400 rounded-[2.5rem] flex items-center justify-center mx-auto animate-pulse shadow-2xl">
                    <Activity size={44} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Synthesizing Logic</h2>
                    <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">{progressStage}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/50">
                    <div 
                      className="absolute inset-y-0 left-0 bg-blue-600 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                   <div className="flex items-center justify-center text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
                    Neural Integration Status: {Math.round(progress)}%
                  </div>
                </div>
                <div className="flex justify-center pt-8">
                  <button onClick={handleCancel} className="flex items-center gap-3 px-8 py-3.5 bg-red-500/10 text-red-500 text-[10px] font-black rounded-2xl hover:bg-red-500/20 transition-all uppercase tracking-widest border border-red-500/20">
                    <Square size={12} fill="currentColor" />
                    Terminate Synthesis
                  </button>
                </div>
              </div>
          </div>

          {/* 3. RESULT VIEW */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-1000 ease-in-out ${viewMode === 'RESULT' ? 'translate-y-0 opacity-100 z-50' : 'translate-y-full opacity-0 z-0'}`}>
              
              <div className="bg-slate-900/95 backdrop-blur-3xl border-b border-slate-800 z-[60] shadow-2xl flex-shrink-0">
                <div className="max-w-5xl mx-auto w-full px-6 py-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-left">
                    <button 
                      onClick={() => setIsQuestionExpanded(!isQuestionExpanded)}
                      className="flex items-center gap-4 group text-slate-500 hover:text-white transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                        <LayoutDashboard size={18} />
                      </div>
                      <div className="overflow-hidden text-left">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Active Feed</p>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-black text-white truncate max-w-[120px] sm:max-w-none">{activeModule.title}</h4>
                          <ChevronDown size={14} className={`transition-transform duration-300 ${isQuestionExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </button>

                    <div className="flex-1 max-w-sm mx-auto hidden sm:flex items-center justify-center bg-slate-950/50 p-1 rounded-2xl border border-slate-800/50">
                      <button 
                        onClick={() => handleTabSwitch('AUDIT')}
                        className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeResultTab === 'AUDIT' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        Insights
                      </button>
                      <button 
                        onClick={() => handleTabSwitch('SOLUTION')}
                        className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeResultTab === 'SOLUTION' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        Solution
                      </button>
                      <button 
                        onClick={() => handleTabSwitch('DIAGRAM')}
                        className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeResultTab === 'DIAGRAM' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        Diagram
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                       <button onClick={handleEditInput} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 text-[10px] font-black rounded-xl hover:bg-slate-700 transition-all border border-slate-700">
                        <Edit3 size={14} /> Update
                      </button>
                      <button onClick={() => handleExecute()} className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-950 text-[10px] font-black rounded-xl hover:bg-slate-200 transition-all shadow-xl">
                        <RefreshCw size={14} /> <span className="hidden xs:inline">Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile Tabs */}
                  <div className="flex sm:hidden items-center justify-center bg-slate-950/50 p-1 rounded-2xl border border-slate-800/50">
                    <button onClick={() => handleTabSwitch('AUDIT')} className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl ${activeResultTab === 'AUDIT' ? 'bg-white text-slate-950' : 'text-slate-500'}`}>Insights</button>
                    <button onClick={() => handleTabSwitch('SOLUTION')} className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl ${activeResultTab === 'SOLUTION' ? 'bg-white text-slate-950' : 'text-slate-500'}`}>Solution</button>
                    <button onClick={() => handleTabSwitch('DIAGRAM')} className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl ${activeResultTab === 'DIAGRAM' ? 'bg-white text-slate-950' : 'text-slate-500'}`}>Diagram</button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto bg-slate-950 scroll-smooth custom-scrollbar">
                <div className="max-w-5xl mx-auto w-full px-6 sm:px-12 py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  
                  {activeResultTab === 'AUDIT' && (
                    <div className="space-y-20 animate-in fade-in duration-500 text-left">
                      <div className="space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-400 flex items-center justify-center">
                            <FileSearch size={20} />
                          </div>
                          <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Section 01 / Problem Audit</h4>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-transparent hidden sm:block" />
                          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-200 font-medium leading-[1.6] tracking-tight">
                            {result?.analysis}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-10 max-w-3xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 flex items-center justify-center">
                            <BrainCircuit size={20} />
                          </div>
                          <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Reasoning Path</h4>
                        </div>
                        <div className="space-y-6">
                          {result?.steps.map((step, i) => (
                            <div key={i} className="flex gap-6 group">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[11px] font-black text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                                  {i + 1}
                                </div>
                                {i < (result?.steps.length || 0) - 1 && <div className="w-0.5 flex-1 bg-slate-800 mt-3" />}
                              </div>
                              <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed pt-1.5 group-hover:text-slate-200 transition-colors">
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
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 flex items-center justify-center">
                              <Cpu size={20} />
                            </div>
                            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Synthesis core</h4>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={handleShare} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-400 transition-all"><Share2 size={14} /> Share</button>
                            <button onClick={copySolution} className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${copied ? 'text-emerald-400' : 'text-slate-600 hover:text-white'}`}>{copied ? <><CheckCircle2 size={14} /> Copied</> : <><Copy size={14} /> Copy</>}</button>
                          </div>
                        </div>
                        <div className="bg-white p-10 sm:p-14 rounded-[3rem] text-slate-950 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
                          <div className="prose prose-slate max-w-none text-base sm:text-lg lg:text-xl text-slate-900 leading-[1.7] font-medium whitespace-pre-wrap">
                            {result?.solution}
                          </div>
                          <div className="mt-16 pt-10 border-t border-slate-100 flex flex-wrap items-center gap-8">
                            <div className="flex items-center gap-2.5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]"><Activity size={12} className="text-blue-600" /> Logic-Locked</div>
                            <div className="flex items-center gap-2.5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]"><ShieldCheck size={12} className="text-emerald-600" /> Verified</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-slate-800/60 flex flex-col justify-center gap-6 group hover:border-blue-500/20 transition-all duration-500">
                          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Strategic Path</h4>
                          <p className="text-lg sm:text-xl text-white font-bold leading-relaxed italic opacity-90 group-hover:opacity-100 transition-opacity">"{result?.recommendations}"</p>
                        </div>
                        {result?.links && result.links.length > 0 && (
                          <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] px-2">Knowledge Sources</h4>
                            <div className="grid gap-3">
                              {result.links.map((link, i) => (
                                <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl hover:bg-slate-900 hover:border-slate-700 transition-all group">
                                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 truncate pr-4">{link.title}</span>
                                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-all border border-slate-700 flex-shrink-0"><ExternalLink size={14} /></div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeResultTab === 'DIAGRAM' && (
                    <div className="space-y-12 animate-in fade-in duration-500 text-center">
                      <div className="flex flex-col items-center gap-4 mb-10 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                          <Trello size={24} />
                        </div>
                        <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Section 03 / Schematic Blueprint</h4>
                      </div>

                      {isDiagramLoading ? (
                        <div className="py-32 flex flex-col items-center justify-center gap-6 animate-pulse text-center">
                          <Loader2 size={48} className="text-indigo-500 animate-spin" />
                          <div className="space-y-2">
                             <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Architecting Schematic Diagram...</p>
                          </div>
                        </div>
                      ) : result?.visual ? (
                        <div className="relative group overflow-hidden rounded-[4rem] bg-slate-900 shadow-2xl border border-slate-800/50 p-4 sm:p-12 text-center">
                          <img src={result.visual} className="w-full h-auto max-h-[700px] object-contain transition-all duration-1000 group-hover:scale-[1.02] rounded-[2rem] mx-auto" alt="Schematic Diagram" />
                          <div className="absolute top-10 right-10 flex gap-2">
                             <button onClick={downloadDiagram} className="p-4 bg-slate-950/80 backdrop-blur-md text-white rounded-2xl border border-white/10 hover:bg-white hover:text-slate-950 transition-all shadow-xl"><Download size={20} /></button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-20 sm:py-32 flex flex-col items-center justify-center gap-8 bg-slate-900/20 border-2 border-dashed border-slate-800/50 rounded-[4rem] text-center">
                           <ImageIcon size={48} className="text-slate-700" />
                           <div className="space-y-3">
                             <h5 className="text-xl font-bold text-slate-400">Render Logic Map</h5>
                             <p className="text-sm text-slate-600 max-w-sm mx-auto">Generate a schematic vector-style diagram to visualize the conceptual logic of this solution.</p>
                           </div>
                           <button onClick={triggerDiagramSynthesis} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/20">Trigger Schematic Render</button>
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
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl z-[150] flex items-center justify-center p-8 animate-in fade-in duration-300">
               <div className="max-w-sm w-full glass-panel p-10 rounded-[3rem] text-center space-y-8 shadow-2xl relative">
                  <button onClick={() => setIsShareModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"><X size={20}/></button>
                  <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/20"><Share2 size={32} /></div>
                  <div className="space-y-2 text-center"><h4 className="font-black text-white uppercase text-xs tracking-[0.4em]">Broadcast Synthesis</h4></div>
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <button onClick={shareToX} className="w-full h-14 bg-slate-900 border border-slate-800 text-white rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 text-sm font-bold"><Twitter size={18} /> Share on X</button>
                    <button onClick={shareToLinkedIn} className="w-full h-14 bg-slate-900 border border-slate-800 text-white rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 text-sm font-bold"><Linkedin size={18} /> LinkedIn</button>
                    <button onClick={() => { copySolution(); setIsShareModalOpen(false); }} className="w-full h-14 bg-white text-slate-950 rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 text-sm font-bold shadow-lg"><Link2 size={18} /> Copy Solution</button>
                  </div>
                </div>
            </div>
          )}

          {/* History Page */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-700 ease-in-out ${viewMode === 'HISTORY' ? 'translate-y-0 opacity-100 z-50' : 'translate-y-full opacity-0 z-0'}`}>
              <div className="p-6 border-b border-slate-900/50 flex items-center justify-between flex-shrink-0 bg-slate-950/80 backdrop-blur-3xl">
                <div className="flex items-center gap-4 text-left">
                  <button onClick={() => setViewMode('INPUT')} className="p-2 hover:bg-slate-900 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                  <h3 className="font-black text-white uppercase text-xs tracking-[0.3em]">Neural History</h3>
                </div>
                {history.length > 0 && <button onClick={clearHistory} className="text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-widest flex items-center gap-2"><Trash2 size={12} /> Clear Memory</button>}
              </div>
              <div className="flex-1 p-6 sm:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto w-full space-y-6">
                  {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 animate-in fade-in duration-700">
                      <History size={48} className="text-slate-800" />
                      <div className="space-y-2"><p className="text-xl font-bold text-slate-400">Neural Memory Clear</p></div>
                      <button onClick={() => setViewMode('INPUT')} className="px-10 py-4 bg-white text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Synthesize Logic</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {history.map(item => (
                        <div key={item.id} onClick={() => handleRestoreHistory(item)} className="group relative p-6 bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 rounded-[2.5rem] transition-all cursor-pointer hover:bg-slate-900">
                          <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-800 rounded-xl text-blue-500 shadow-md">{PROCESS_MODULES.find(m => m.id === item.moduleId) ? ICON_MAP[PROCESS_MODULES.find(m => m.id === item.moduleId)!.icon] : <Layers size={14} />}</div>
                              <div className="text-left"><p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">{item.moduleTitle}</p><div className="flex items-center gap-1.5 text-slate-700 text-[8px] uppercase tracking-widest mt-1"><Clock size={8} /> {new Date(item.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div></div>
                            </div>
                            <button onClick={(e) => deleteHistoryItem(e, item.id)} className="p-2 text-slate-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                          </div>
                          <p className="text-sm text-slate-300 font-medium leading-relaxed line-clamp-3 italic opacity-80 group-hover:opacity-100 transition-opacity">"{item.input}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
          </div>

          {error && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-8">
               <div className="max-w-md w-full glass-panel p-12 rounded-[3.5rem] text-center space-y-10 shadow-2xl">
                  <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto border border-red-500/20"><AlertCircle size={40} /></div>
                  <div className="space-y-2"><h4 className="font-black text-white uppercase text-xs tracking-[0.4em]">Engine Overload</h4><p className="text-slate-500 font-medium leading-relaxed">{error}</p></div>
                  <div className="flex flex-col gap-3 pt-6">
                    <button onClick={() => handleExecute()} className="w-full h-16 bg-white text-slate-950 text-[10px] font-black rounded-2xl uppercase tracking-[0.3em] shadow-lg">Retry Synthesis</button>
                    <button onClick={handleEditInput} className="w-full h-16 bg-slate-800 text-slate-400 text-[10px] font-black rounded-2xl uppercase tracking-[0.3em]">Refine Input</button>
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
