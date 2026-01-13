
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
  LogOut
} from 'lucide-react';
import { PROCESS_MODULES, ICON_MAP } from './constants';
import { AppMode, SolutionResult, UserSession, ProcessModule } from './types';
import { geminiService } from './services/gemini';

// --- Landing Page Component ---
const LandingPage: React.FC<{ onEnter: (session: UserSession) => void }> = ({ onEnter }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<AppMode | null>(null);

  const isFormValid = name.trim().length > 0 && role !== null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-slate-50">
      {/* Main Content Area */}
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

      {/* Footer Area */}
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
  const [isLoading, setIsLoading] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Logo navigation: Reset workspace state to "home" view without losing session
  const handleHomeNavigation = () => {
    setInput('');
    setPendingImage(null);
    setResult(null);
    // Optionally reset to the first module of the user's role
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

  const handleExecute = async () => {
    if ((!input.trim() && !pendingImage) || isLoading) return;
    setIsLoading(true);
    setResult(null);

    try {
      if (activeModule.type === 'visual') {
        const visual = await geminiService.generateVisual(activeModule.prompt, input);
        setResult({
          analysis: "Visual conceptualization in progress.",
          steps: ["Interpreting semantic requirements", "Constructing spatial hierarchies", "Rendering visual output"],
          solution: "See visual representation below.",
          recommendations: "Utilize this visual for presentations or rapid concept prototyping.",
          visual
        });
      } else {
        const res = await geminiService.processRequest(activeModule.prompt, input, pendingImage || undefined, useSearch);
        setResult(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleHomeNavigation}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="Go to Home Dashboard"
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
            <div>
              <p className="text-xs font-bold text-slate-900">{user.name}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.role} WORKSPACE</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setUseSearch(!useSearch)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${useSearch ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
          >
            <Search size={12} />
            GOOGLE SEARCH {useSearch ? 'ACTIVE' : 'OFF'}
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 p-2 px-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Logout / Change User"
          >
            <LogOut size={18} />
            <span className="text-[10px] font-black uppercase">Exit</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Module Sidebar */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col p-4 overflow-y-auto">
          <div className="flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Process Modules</p>
            <div className="space-y-1">
              {PROCESS_MODULES.filter(m => m.mode === user.role).map(module => (
                <button 
                  key={module.id}
                  onClick={() => setActiveModule(module)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${activeModule.id === module.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <div className={`p-2 rounded-lg ${activeModule.id === module.id ? 'bg-white/10' : 'bg-slate-100'}`}>
                    {ICON_MAP[module.icon]}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">{module.title}</p>
                    <p className={`text-[10px] ${activeModule.id === module.id ? 'text-white/50' : 'text-slate-400'} leading-tight`}>{module.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">&copy; DanMudi Digital Hub</p>
          </div>
        </div>

        {/* Console & Result Panels */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-px bg-slate-200 overflow-hidden">
          
          {/* Left: Input Console */}
          <div className="bg-white flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                <LayoutDashboard size={14} className="text-blue-600" />
                Input Console
              </h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-lg">
                <Zap size={12} />
                READY
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-800">Problem Context</p>
                  <button 
                    onClick={() => setInput('')}
                    className="text-[10px] font-black text-slate-300 hover:text-slate-500 uppercase tracking-widest"
                  >
                    Clear Input
                  </button>
                </div>
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Define the parameters of the problem here. Be specific about constraints and expected outcomes..."
                  className="w-full h-64 p-6 bg-slate-50 rounded-3xl border border-slate-100 text-slate-800 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all resize-none font-medium leading-relaxed"
                />
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-800">Visual Evidence (Optional)</p>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                {pendingImage ? (
                  <div className="relative group w-40 h-40">
                    <img src={pendingImage} className="w-full h-full object-cover rounded-2xl border-2 border-blue-500 shadow-xl" />
                    <button onClick={() => setPendingImage(null)} className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg"><X size={14}/></button>
                  </div>
                ) : (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-40 h-40 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all bg-slate-50"
                  >
                    <Camera size={32} />
                    <span className="text-[10px] font-black uppercase">Attach Media</span>
                  </button>
                )}
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <button 
                onClick={handleExecute}
                disabled={(!input.trim() && !pendingImage) || isLoading}
                className="w-full h-16 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-3"
              >
                {isLoading ? <RefreshCw className="animate-spin" size={24} /> : (
                  <>
                    <BrainCircuit size={24} />
                    Synthesize Solution
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Reasoning & Solution Panel */}
          <div className="bg-slate-50 flex flex-col overflow-hidden">
            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                Solution Architecture
              </h3>
              <div className="text-[10px] font-black text-slate-400">ENGINE: GEMINI-3-PRO</div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {!result && !isLoading && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <BrainCircuit size={64} className="text-slate-300" />
                  <p className="text-sm font-bold text-slate-400">Awaiting input processing...</p>
                </div>
              )}

              {isLoading && (
                <div className="space-y-8 animate-pulse">
                  <div className="h-40 bg-white rounded-3xl border border-slate-100" />
                  <div className="space-y-4">
                    <div className="h-4 w-1/2 bg-slate-200 rounded" />
                    <div className="h-4 w-full bg-slate-200 rounded" />
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
                  <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">01. Cognitive Audit</h4>
                    <p className="text-slate-700 font-medium leading-relaxed">{result.analysis}</p>
                  </section>

                  <section className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">02. Reasoning Path</h4>
                    <div className="space-y-3">
                      {result.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                          <div className="w-6 h-6 bg-slate-900 text-white text-[10px] font-bold rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-sm text-slate-600 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {result.visual && (
                    <section className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">03. Visual Conceptualization</h4>
                      <img src={result.visual} className="w-full h-auto rounded-[2rem] border-4 border-white shadow-2xl" />
                    </section>
                  )}

                  <section className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl space-y-4">
                    <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={14} />
                      Solution Core
                    </h4>
                    <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
                      {result.solution}
                    </div>
                  </section>

                  <section className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 space-y-4">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">04. Strategic Recommendations</h4>
                    <p className="text-blue-900/80 font-semibold leading-relaxed">{result.recommendations}</p>
                  </section>

                  {result.links && result.links.length > 0 && (
                    <section className="space-y-3">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Evidence & Sources</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {result.links.map((link, i) => (
                          <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-300 transition-all">
                            <span className="text-sm font-bold text-slate-700">{link.title}</span>
                            <ArrowRight size={16} className="text-blue-500" />
                          </a>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>
          </div>
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
