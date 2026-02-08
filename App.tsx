
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
  Lock,
  Loader
} from 'lucide-react';
import { PROCESS_MODULES, ICON_MAP } from './constants';
import { AppMode, SolutionResult, UserSession, ProcessModule, HistoryItem } from './types';
import { geminiService } from './services/gemini';

// Define AIStudio interface to match the environment's implementation
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    // Removed readonly to avoid modifier mismatch with existing global declarations
    aistudio: AIStudio;
  }
}

type ViewMode = 'INPUT' | 'PROCESSING' | 'RESULT' | 'HISTORY' | 'KEY_SELECTION';
type ResultTab = 'AUDIT' | 'SOLUTION' | 'DIAGRAM' | 'SIMULATION';

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
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="What should we call you?" className="w-full h-14 sm:h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400 text-sm sm:text-base" />
                <User className="absolute right-6 top-4 sm:top-5 text-slate-400" size={20} />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Select Domain</label>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setRole('STUDENT')} className={`group p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-[1.03] ${role === 'STUDENT' ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                  <GraduationCap size={28} className={`sm:w-8 sm:h-8 transition-transform duration-300 ${role === 'STUDENT' ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Student</span>
                </button>
                <button onClick={() => setRole('BUSINESS')} className={`group p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-[1.03] ${role === 'BUSINESS' ? 'border-indigo-500 bg-indigo-50 text-indigo-600 shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                  <Store size={28} className={`sm:w-8 sm:h-8 transition-transform duration-300 ${role === 'BUSINESS' ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Business</span>
                </button>
              </div>
            </div>
            <button disabled={!isFormValid} onClick={() => role && onEnter({ name, role })} className={`w-full h-14 sm:h-16 rounded-2xl font-black text-base sm:text-lg transition-all duration-500 flex items-center justify-center gap-3 group relative overflow-hidden ${isFormValid ? 'bg-slate-900 text-white shadow-xl hover:bg-slate-800 active:scale-[0.98]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
              Enter the Sphere <ArrowRight size={20} className={`transition-transform duration-300 ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

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
      try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
    }
  }, [user.name]);

  useEffect(() => {
    localStorage.setItem(`solvesphere_history_${user.name}`, JSON.stringify(history));
  }, [history, user.name]);

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsDiagramLoading(false);
    setIsSimulationLoading(false);
    setError(null);
  };

  // Fixed missing handleImageUpload function to process file inputs
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPendingImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
      const finalResult = await geminiService.processRequest(targetModule.prompt, input, pendingImage || undefined, useSearch, abortControllerRef.current.signal);
      setResult(finalResult);
      saveToHistory(finalResult);
      setViewMode('RESULT');
      
      // If module is visual, pre-trigger diagram but don't block the view
      if (targetModule.type === 'visual') {
        triggerDiagramSynthesis(finalResult);
      }
    } catch (err: any) {
      if (err?.message?.includes("cancelled")) {
        setViewMode('INPUT');
        return;
      }
      setError(err?.message || "Synthesis engine failed.");
      setViewMode('RESULT');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerDiagramSynthesis = async (currentResult?: SolutionResult) => {
    const activeResult = currentResult || result;
    if (!activeResult || isDiagramLoading || activeResult.visual) return;
    setIsDiagramLoading(true);
    try {
      const visual = await geminiService.generateVisual(activeResult.diagramDescription, input, false);
      const updated = { ...activeResult, visual };
      setResult(updated);
      updateHistoryItem(updated);
    } catch (err: any) {
      console.error("Diagram fail:", err);
    } finally {
      setIsDiagramLoading(false);
    }
  };

  const triggerSimulationSynthesis = async () => {
    if (!result || isSimulationLoading || result.realisticVisual) return;
    setIsSimulationLoading(true);
    try {
      const realisticVisual = await geminiService.generateVisual(result.realisticDiagramDescription, input, true);
      const updated = { ...result, realisticVisual };
      setResult(updated);
      updateHistoryItem(updated);
    } catch (err: any) {
      console.error("Simulation fail:", err);
    } finally {
      setIsSimulationLoading(false);
    }
  };

  const updateHistoryItem = (updatedResult: SolutionResult) => {
    setHistory(prev => prev.map(item => 
      item.input === input && item.moduleId === activeModule.id ? { ...item, result: updatedResult } : item
    ));
  };

  const handleTabSwitch = (tab: ResultTab) => {
    setActiveResultTab(tab);
    if (tab === 'DIAGRAM') triggerDiagramSynthesis();
    if (tab === 'SIMULATION') triggerSimulationSynthesis();
  };

  const handleRestoreHistory = (item: HistoryItem) => {
    const mod = PROCESS_MODULES.find(m => m.id === item.moduleId);
    if (mod) setActiveModule(mod);
    setInput(item.input);
    setResult(item.result);
    setViewMode('RESULT');
    setActiveResultTab('AUDIT');
    setSelectedNode(null);
  };

  const copySolution = () => {
    if (result?.solution) {
      navigator.clipboard.writeText(result.solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const selectedNodeData = result?.diagramNodes?.find(n => n.label === selectedNode);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans text-slate-900 text-left">
      <header className="h-16 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between z-[70] flex-shrink-0 backdrop-blur-2xl">
        <div className="flex items-center gap-4 sm:gap-6 text-left">
          <button onClick={() => setViewMode('INPUT')} className="flex items-center gap-2 hover:opacity-70 transition-opacity text-left">
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
          <button onClick={() => setViewMode(viewMode === 'HISTORY' ? 'INPUT' : 'HISTORY')} className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all ${viewMode === 'HISTORY' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-500 border-slate-100 hover:text-slate-900'}`}>
            <History size={12} /> <span className="hidden sm:inline">HISTORY</span>
          </button>
          <button onClick={() => setUseSearch(!useSearch)} className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all ${useSearch ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
            <Search size={10} /> <span className="hidden sm:inline">SEARCH</span>
          </button>
          <div className="w-px h-6 bg-slate-100 mx-1" />
          <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`hidden lg:flex w-72 bg-slate-50 border-r border-slate-100 flex-col p-5 overflow-y-auto transition-all duration-500 z-50 ${viewMode === 'RESULT' ? '-ml-72 opacity-0' : 'ml-0 opacity-100'}`}>
          <div className="flex-1 space-y-10">
            <section>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-5 px-1">Logic Modules</p>
              <div className="space-y-1.5">
                {PROCESS_MODULES.filter(m => m.mode === user.role).map(module => (
                  <button key={module.id} onClick={() => { setActiveModule(module); setError(null); if (viewMode === 'HISTORY') setViewMode('INPUT'); }} className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left transition-all ${activeModule.id === module.id && viewMode !== 'HISTORY' ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-500 hover:bg-slate-100/50'}`}>
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
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 px-1">Recent Activity</p>
                <div className="space-y-2.5">
                  {history.slice(0, 4).map(item => (
                    <button key={item.id} onClick={() => handleRestoreHistory(item)} className="w-full p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-300 text-left transition-all group shadow-sm">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{item.moduleTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed italic">"{item.input}"</p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white relative flex flex-col overflow-hidden">
          {viewMode === 'KEY_SELECTION' && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-8">
              <div className="max-w-md w-full glass-panel p-12 rounded-[3.5rem] text-center space-y-10 shadow-2xl bg-white border border-slate-100">
                <Lock size={40} className="mx-auto text-blue-600" />
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-slate-900 uppercase">Connect Neural Engine</h2>
                  <p className="text-slate-500 text-sm">SolveSphere requires a paid Gemini API key for advanced reasoning. Connect yours to begin.</p>
                </div>
                <button onClick={handleOpenKeyDialog} className="w-full h-16 bg-slate-900 text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.3em] shadow-lg">Select API Key</button>
              </div>
            </div>
          )}

          {viewMode === 'INPUT' && (
            <div className="flex-1 flex flex-col animate-in fade-in duration-500 overflow-hidden">
              <div className="flex-1 p-6 sm:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto w-full space-y-10">
                  <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={activeModule.placeholder} className="w-full h-72 sm:h-96 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-slate-900 outline-none focus:ring-8 focus:ring-slate-100 transition-all resize-none font-medium leading-[1.8] text-base sm:text-lg" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pb-12">
                    <div className="space-y-4">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Image Support (Optional)</p>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                      {pendingImage ? (
                        <div className="relative w-48 h-48 group">
                          <img src={pendingImage} className="w-full h-full object-cover rounded-3xl border border-slate-200" />
                          <button onClick={() => setPendingImage(null)} className="absolute -top-3 -right-3 p-2 bg-slate-900 text-white rounded-full"><X size={16}/></button>
                        </div>
                      ) : (
                        <button onClick={() => fileInputRef.current?.click()} className="w-48 h-48 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-blue-200 hover:text-blue-500 transition-all bg-slate-50">
                          <Camera size={32} /> <span className="text-[10px] font-black uppercase">Attach Media</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-10 bg-white border-t border-slate-100">
                <button onClick={() => handleExecute()} disabled={!input.trim() || isLoading} className="max-w-4xl mx-auto w-full h-20 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-[0.98] disabled:opacity-30">
                  <BrainCircuit size={28} /> Begin Synthesis
                </button>
              </div>
            </div>
          )}

          {viewMode === 'PROCESSING' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white animate-in zoom-in duration-500">
              <div className="max-w-xl w-full text-center space-y-12">
                <Activity size={48} className="mx-auto text-slate-900 animate-pulse" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">Synthesizing Solution</h2>
                  <p className="text-blue-600 font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">Consulting Knowledge Graph...</p>
                </div>
                <button onClick={handleCancel} className="px-8 py-3 bg-red-50 text-red-600 text-[10px] font-black rounded-2xl uppercase tracking-widest">Terminate</button>
              </div>
            </div>
          )}

          {viewMode === 'RESULT' && result && (
            <div className="flex-1 flex flex-col animate-in slide-in-from-bottom-6 duration-700 overflow-hidden">
              <div className="bg-white/90 backdrop-blur-3xl border-b border-slate-100 flex-shrink-0">
                <div className="max-w-5xl mx-auto w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex-1 max-w-sm flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                    {['AUDIT', 'SOLUTION', 'DIAGRAM', 'SIMULATION'].map((tab) => (
                      <button key={tab} onClick={() => handleTabSwitch(tab as ResultTab)} className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] rounded-xl transition-all ${activeResultTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>
                        {tab}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setViewMode('INPUT')} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-xl shadow-md">
                    <RefreshCw size={14} /> New Query
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-12 sm:py-20 scroll-smooth">
                <div className="max-w-5xl mx-auto w-full">
                  {activeResultTab === 'AUDIT' && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Section 01 / Problem Audit</h4>
                        <p className="text-xl sm:text-2xl text-slate-900 font-semibold leading-relaxed">{result.analysis}</p>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Reasoning Path</h4>
                        <div className="space-y-4">
                          {result.steps.map((step, i) => (
                            <div key={i} className="flex gap-4">
                              <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</span>
                              <p className="text-slate-600 font-medium pt-1">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeResultTab === 'SOLUTION' && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Section 02 / Core Solution</h4>
                        <button onClick={copySolution} className="text-[9px] font-black uppercase text-blue-600 hover:underline">{copied ? "Copied!" : "Copy All"}</button>
                      </div>
                      <div className="bg-slate-50 p-10 sm:p-14 rounded-[3rem] border border-slate-100 shadow-xl whitespace-pre-wrap leading-relaxed text-lg text-slate-800">
                        {result.solution}
                      </div>
                      <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100 italic font-medium text-blue-900">
                        "Strategic Recommendation: {result.recommendations}"
                      </div>
                    </div>
                  )}

                  {activeResultTab === 'DIAGRAM' && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Section 03 / Schematic Map</h4>
                      {isDiagramLoading ? (
                        <div className="py-40 flex flex-col items-center justify-center space-y-4">
                          <Loader size={32} className="text-slate-900 animate-spin" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rendering Logic Blueprint...</p>
                        </div>
                      ) : result.visual ? (
                        <div className="space-y-8">
                          <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl p-4 sm:p-8">
                            <img src={result.visual} className="w-full h-auto rounded-[1.5rem]" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {result.diagramNodes?.map((node, idx) => (
                              <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <h6 className="text-[10px] font-black uppercase text-blue-600 mb-2">{node.label}</h6>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">{node.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="py-40 border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-4">
                          <Trello size={48} className="text-slate-200" />
                          <button onClick={() => triggerDiagramSynthesis()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Render Logic Blueprint</button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeResultTab === 'SIMULATION' && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Section 04 / Practical Simulation</h4>
                      {isSimulationLoading ? (
                        <div className="py-40 flex flex-col items-center justify-center space-y-4">
                          <Loader size={32} className="text-slate-900 animate-spin" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synthesizing Realistic Simulation...</p>
                        </div>
                      ) : result.realisticVisual ? (
                        <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative aspect-video">
                          <img src={result.realisticVisual} className="w-full h-full object-cover" />
                          <div className="absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur-md p-8 text-white border-t border-white/10">
                            <p className="text-sm font-medium leading-relaxed">{result.realisticDiagramDescription}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-40 border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-4">
                          <Eye size={48} className="text-slate-200" />
                          <button onClick={() => triggerSimulationSynthesis()} className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Synthesize Realistic Scene</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl z-[150] flex items-center justify-center p-8">
              <div className="max-w-md w-full glass-panel p-10 rounded-[3rem] text-center space-y-8 bg-white border border-slate-100">
                <AlertCircle size={40} className="mx-auto text-red-500" />
                <div className="space-y-2">
                  <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.4em]">Engine Overload</h4>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">{error}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => { setError(null); handleExecute(); }} className="w-full h-14 bg-slate-900 text-white text-[10px] font-black rounded-2xl uppercase tracking-widest shadow-lg">Retry Synthesis</button>
                  <button onClick={() => { setError(null); setViewMode('INPUT'); }} className="w-full h-14 bg-white text-slate-400 text-[10px] font-black rounded-2xl uppercase tracking-widest border border-slate-100">Refine Input</button>
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
  if (!session) return <LandingPage onEnter={setSession} />;
  return <Dashboard user={session} onLogout={() => setSession(null)} />;
}
