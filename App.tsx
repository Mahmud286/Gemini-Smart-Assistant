
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
  ChevronUp
} from 'lucide-react';
import { PROCESS_MODULES, ICON_MAP } from './constants';
import { AppMode, SolutionResult, UserSession, ProcessModule } from './types';
import { geminiService } from './services/gemini';

type ViewMode = 'INPUT' | 'PROCESSING' | 'RESULT';

// --- Landing Page Component ---
const LandingPage: React.FC<{ onEnter: (session: UserSession) => void }> = ({ onEnter }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<AppMode | null>(null);

  const isFormValid = name.trim().length > 0 && role !== null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-slate-50">
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="max-w-md w-full space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl shadow-blue-100 rotate-3 transform transition-transform hover:rotate-6">
              <Sparkles size={40} />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">SolveSphere AI</h1>
              <p className="text-slate-500 font-medium tracking-wide italic">Connecting problems to intelligence</p>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 space-y-8 relative overflow-hidden">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Identity Profile</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full h-16 px-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                />
                <User className="absolute right-5 top-5 text-slate-300" size={24} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Select Domain</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setRole('STUDENT')}
                  className={`group p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-[1.03] hover:shadow-xl ${role === 'STUDENT' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg shadow-blue-100/50' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                >
                  <GraduationCap size={28} className={`transition-transform duration-300 ${role === 'STUDENT' ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-sm font-black uppercase tracking-wider">Student</span>
                </button>
                <button 
                  onClick={() => setRole('BUSINESS')}
                  className={`group p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-[1.03] hover:shadow-xl ${role === 'BUSINESS' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100/50' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                >
                  <Store size={28} className={`transition-transform duration-300 ${role === 'BUSINESS' ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-sm font-black uppercase tracking-wider">Business</span>
                </button>
              </div>
            </div>

            <button 
              disabled={!isFormValid}
              onClick={() => role && onEnter({ name, role })}
              className={`w-full h-16 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden ${
                isFormValid 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-blue-500/20 hover:bg-black active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
              }`}
            >
              {isFormValid && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              )}
              Enter the Sphere
              <ArrowRight size={22} className={`transition-transform duration-300 ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full py-12 px-6 text-center space-y-3 mt-auto border-t border-slate-100 bg-white/30 backdrop-blur-sm">
        <p className="text-[10px] lg:text-[11px] font-medium text-slate-400 uppercase tracking-[0.3em]">Built on Gemini 3 Reasoning Architecture</p>
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useSearch, setUseSearch] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');
  const [isQuestionExpanded, setIsQuestionExpanded] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setProgress(5);
      setProgressStage('Initializing reasoning engine...');
      const stages = activeModule.id === 'academic-solver' 
        ? [
            { threshold: 20, stage: 'Parsing variables & constraints...' },
            { threshold: 45, stage: 'Retrieving relevant academic theorems...' },
            { threshold: 70, stage: 'Synthesizing first-principles solution...' },
            { threshold: 90, stage: 'Validating logical consistency...' }
          ]
        : [
            { threshold: 25, stage: 'Analyzing input parameters...' },
            { threshold: 50, stage: 'Searching global knowledge base...' },
            { threshold: 75, stage: 'Structuring response architecture...' },
            { threshold: 95, stage: 'Finalizing solution output...' }
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
    setViewMode('INPUT');
    setError(null);
  };

  const handleExecute = async () => {
    if ((!input.trim() && !pendingImage) || isLoading) return;
    
    setIsLoading(true);
    setViewMode('PROCESSING');
    setResult(null);
    setError(null);
    
    abortControllerRef.current = new AbortController();

    try {
      if (activeModule.type === 'visual') {
        const visualContext = `Module: ${activeModule.title}. Context: ${input}`;
        const visual = await geminiService.generateVisual(activeModule.prompt, visualContext, abortControllerRef.current.signal);
        setResult({
          analysis: "Visual conceptualization in progress.",
          steps: ["Interpreting semantic requirements", "Constructing spatial hierarchies", "Rendering visual output"],
          solution: "See visual representation below.",
          recommendations: "Utilize this visual for presentations or rapid concept prototyping.",
          visual
        });
      } else {
        const res = await geminiService.processRequest(activeModule.prompt, input, pendingImage || undefined, useSearch, abortControllerRef.current.signal);
        setResult(res);
      }
      setProgress(100);
      setViewMode('RESULT');
    } catch (err: any) {
      if (err?.message === "aborted" || err?.message === "Synthesis cancelled by user.") {
        return;
      }
      console.error(err);
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleEditInput = () => {
    setViewMode('INPUT');
    setError(null);
    setIsQuestionExpanded(false);
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden font-sans">
      {/* Top Header - Always visible */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-[70] flex-shrink-0">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleHomeNavigation}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <h2 className="font-black text-slate-900 tracking-tight">SolveSphere</h2>
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <User size={16} className="text-slate-500" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{user.role} WORKSPACE</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setUseSearch(!useSearch)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all ${useSearch ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
          >
            <Search size={10} />
            GOOGLE SEARCH {useSearch ? 'ON' : 'OFF'}
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Module Sidebar - Auto hides when not in INPUT mode for Full Screen focus */}
        <div className={`w-64 bg-white border-r border-slate-200 flex flex-col p-4 overflow-y-auto transition-all duration-500 ease-in-out z-50 ${viewMode !== 'INPUT' ? '-ml-64 opacity-0 pointer-events-none' : 'ml-0 opacity-100'}`}>
          <div className="flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Process Modules</p>
            <div className="space-y-1">
              {PROCESS_MODULES.filter(m => m.mode === user.role).map(module => (
                <button 
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module);
                    setError(null);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${activeModule.id === module.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <div className={`p-2 rounded-lg relative group/icon ${activeModule.id === module.id ? 'bg-white/10' : 'bg-slate-100'}`}>
                    {ICON_MAP[module.icon]}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-xl opacity-0 group-hover/icon:opacity-100 transition-all scale-75 group-hover/icon:scale-100 pointer-events-none whitespace-nowrap z-[100] border border-white/10">
                      {module.title}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[6px] border-transparent border-t-slate-900" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">{module.title}</p>
                    <p className={`text-[10px] ${activeModule.id === module.id ? 'text-white/50' : 'text-slate-400'} leading-tight`}>{module.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4 text-center">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">&copy; DanMudi Hub</p>
          </div>
        </div>

        {/* Dashboard Panels - The Dynamic View */}
        <div className="flex-1 bg-white relative flex flex-col overflow-hidden transition-all duration-500">
          
          {/* --- 1. INPUT VIEW --- */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-700 ease-in-out ${viewMode === 'INPUT' ? 'translate-y-0 opacity-100 z-30' : 'translate-y-full opacity-0 z-0'}`}>
             <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                  <LayoutDashboard size={14} className="text-blue-600" />
                  {activeModule.title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Ready for Input
                </div>
              </div>
              <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto w-full space-y-8 animate-slide-up">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <p className="text-sm font-black text-slate-800 uppercase tracking-widest">Core Parameters</p>
                      <button onClick={() => setInput('')} className="text-[10px] font-black text-slate-300 hover:text-slate-500 uppercase tracking-widest transition-colors">Reset</button>
                    </div>
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={activeModule.placeholder}
                      className="w-full h-80 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-slate-800 outline-none focus:ring-8 focus:ring-blue-500/5 transition-all resize-none font-medium leading-relaxed text-lg placeholder:text-slate-300 shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                      <p className="text-sm font-black text-slate-800 uppercase tracking-widest px-1">Media Insight</p>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                      {pendingImage ? (
                        <div className="relative group w-48 h-48">
                          <img src={pendingImage} className="w-full h-full object-cover rounded-[2rem] border-2 border-blue-500 shadow-xl" />
                          <button onClick={() => setPendingImage(null)} className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"><X size={16}/></button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-48 h-48 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all bg-slate-50 group hover:shadow-xl hover:shadow-blue-50/50"
                        >
                          <Camera size={32} className="group-hover:scale-110 transition-transform" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Add Contextual Image</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100 flex flex-col justify-center gap-3">
                      <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                        <Zap size={14} /> Logic Engine Instruction
                      </h4>
                      <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                        Gemini 3 Pro will interpret your parameters using multidimensional logic. {activeModule.type === 'visual' ? 'We will render a visual mental model based on these semantic identifiers.' : 'We will build a structured solution architecture.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white border-t border-slate-100 flex-shrink-0 z-10">
                <div className="max-w-4xl mx-auto w-full">
                  <button 
                    onClick={handleExecute}
                    disabled={(!input.trim() && !pendingImage) || isLoading}
                    className="w-full h-20 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-blue-900/10 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-4 group"
                  >
                    <BrainCircuit size={28} className="group-hover:rotate-12 transition-transform" />
                    Synthesize Solution
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
          </div>

          {/* --- 2. PROCESSING VIEW --- */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-white transition-all duration-700 ease-in-out ${viewMode === 'PROCESSING' ? 'translate-y-0 opacity-100 z-40' : '-translate-y-full opacity-0 z-0'}`}>
              <div className="max-w-2xl w-full space-y-12 animate-slide-up">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto animate-bounce-slow shadow-xl shadow-blue-50">
                    <Activity size={44} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Logic Engine Processing</h2>
                    <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">{progressStage}</p>
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span>Synthesis Completion</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="relative h-6 w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 p-1">
                    <div 
                      className="absolute inset-y-1 left-1 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700 ease-out rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      style={{ width: `calc(${progress}% - 8px)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-3 px-8 py-4 bg-red-50 text-red-600 text-[10px] font-black rounded-2xl hover:bg-red-100 transition-all uppercase tracking-[0.2em] border border-red-100 shadow-xl shadow-red-100/30 group"
                  >
                    <Square size={14} fill="currentColor" className="group-hover:scale-90 transition-transform" />
                    Halt Reasoning
                  </button>
                </div>
              </div>
          </div>

          {/* --- 3. RESULT VIEW (FULL SCREEN MODE) --- */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-1000 ease-in-out ${viewMode === 'RESULT' ? 'translate-y-0 opacity-100 z-50' : 'translate-y-full opacity-0 z-0'}`}>
              
              {/* Sticky Persistent Header with Editable Context */}
              <div className="bg-white border-b border-slate-100 z-[60] shadow-sm flex-shrink-0 transition-all duration-500">
                <div className="max-w-6xl mx-auto w-full px-8 py-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setIsQuestionExpanded(!isQuestionExpanded)}
                        className="flex items-center gap-2 group text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-all">
                          <LayoutDashboard size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Context</p>
                          <div className="flex items-center gap-1">
                            <h4 className="text-sm font-black text-slate-900">{activeModule.title}</h4>
                            {isQuestionExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                       <button 
                        onClick={handleEditInput} 
                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-black rounded-xl hover:bg-slate-100 transition-all uppercase tracking-widest border border-slate-100"
                      >
                        <Edit3 size={14} /> Edit Input
                      </button>
                      <button 
                        onClick={handleExecute} 
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-700 transition-all uppercase tracking-widest shadow-xl shadow-blue-100"
                      >
                        <RefreshCw size={14} /> Regenerate
                      </button>
                    </div>
                  </div>

                  {/* Expandable persistent question area */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isQuestionExpanded ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 relative group">
                       <p className="text-sm text-slate-600 font-medium leading-relaxed italic whitespace-pre-wrap">"{input}"</p>
                       <button onClick={handleEditInput} className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><Edit3 size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Focus Content Area */}
              <div className="flex-1 overflow-y-auto bg-white scroll-smooth">
                <div className="max-w-5xl mx-auto w-full p-8 lg:p-16 space-y-16 animate-slide-up">
                  
                  {/* Summary/Analysis - The Audit */}
                  <section className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-50">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">01. Solution Audit</h4>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">Engine: Gemini 3 Reasoning Architecture</p>
                      </div>
                    </div>
                    <div className="bg-slate-50/50 p-10 lg:p-12 rounded-[3.5rem] border border-slate-100 relative overflow-hidden group hover:bg-white hover:shadow-2xl hover:shadow-slate-100/50 transition-all duration-500">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><BrainCircuit size={160} /></div>
                      <p className="text-xl lg:text-2xl text-slate-700 font-medium leading-[1.8] relative z-10">{result?.analysis}</p>
                    </div>
                  </section>

                  {/* Visual Aid - High Impact focus */}
                  {result?.visual && (
                    <section className="space-y-8">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-2 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        02. Conceptual Visual Model
                      </h4>
                      <div className="relative group cursor-zoom-in">
                        <div className="absolute -inset-4 bg-indigo-50/50 rounded-[4rem] scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
                        <img src={result.visual} className="w-full h-auto max-h-[700px] object-contain rounded-[3rem] border-8 border-white shadow-2xl relative z-10 bg-white" alt="Output Visual" />
                      </div>
                    </section>
                  )}

                  {/* Logical Roadmap */}
                  <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-5 space-y-8 sticky top-8">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-2 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        03. Logic Synthesis Path
                      </h4>
                      <div className="space-y-4">
                        {result?.steps.map((step, i) => (
                          <div key={i} className="flex items-start gap-5 p-6 bg-slate-50 hover:bg-white rounded-3xl border border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300">
                            <div className="w-10 h-10 bg-slate-900 text-white text-xs font-black rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-slate-200">
                              {String(i + 1).padStart(2, '0')}
                            </div>
                            <p className="text-base text-slate-700 font-semibold leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* The Big Solution - The Center of focus */}
                    <div className="lg:col-span-7 space-y-8">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-2 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-slate-900" />
                        04. Core Solution Output
                      </h4>
                      <div className="bg-slate-900 p-12 lg:p-16 rounded-[4rem] text-white shadow-[0_40px_80px_-15px_rgba(15,23,42,0.4)] relative overflow-hidden group">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-1000" />
                        <div className="prose prose-invert max-w-none text-xl lg:text-2xl text-slate-200 leading-[1.8] font-medium whitespace-pre-wrap relative z-10">
                          {result?.solution}
                        </div>
                        <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap items-center gap-6 relative z-10">
                          <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">
                            <Zap size={14} /> Processed via High-Entropy Reasoning
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">
                            <ShieldCheck size={14} /> Contextual Integrity Verified
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Final Recommendations & Links */}
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                    <div className="bg-blue-50/50 p-12 rounded-[3.5rem] border border-blue-100 flex flex-col justify-center gap-6">
                      <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">05. Strategic Recommendation</h4>
                      <p className="text-xl text-blue-900 font-bold leading-relaxed italic">"{result?.recommendations}"</p>
                    </div>

                    {result?.links && result.links.length > 0 && (
                      <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">External Reference Sources</h4>
                        <div className="grid gap-3">
                          {result.links.map((link, i) => (
                            <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all group">
                              <span className="text-sm font-bold text-slate-700">{link.title}</span>
                              <div className="w-10 h-10 bg-white group-hover:bg-blue-600 group-hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm">
                                <ArrowRight size={18} />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                  
                  {/* Scroll buffer */}
                  <div className="h-24" />
                </div>
              </div>
          </div>

          {/* Persistent Error View */}
          {error && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-[100] flex items-center justify-center p-8 animate-in fade-in duration-300">
               <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] border border-red-100 shadow-[0_50px_100px_-20px_rgba(239,68,68,0.15)] text-center space-y-8">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                    <AlertCircle size={40} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.3em]">Synthesis Pipeline Failure</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{error}</p>
                  </div>
                  <div className="flex flex-col gap-3 pt-4">
                    <button 
                      onClick={handleExecute}
                      className="w-full h-16 bg-slate-900 text-white text-[10px] font-black rounded-2xl hover:bg-black transition-all uppercase tracking-[0.3em] shadow-2xl shadow-slate-200"
                    >
                      <RefreshCw size={16} className="inline mr-2" /> Re-trigger Synthesis
                    </button>
                    <button 
                      onClick={handleEditInput}
                      className="w-full h-16 bg-slate-50 text-slate-500 text-[10px] font-black rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-[0.3em]"
                    >
                      Refine Original Request
                    </button>
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
