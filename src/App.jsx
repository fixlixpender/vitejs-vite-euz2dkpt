import React, { useState, useRef, useEffect } from 'react';

// Custom SVG Icons for maximum reliability (no external icon package dependencies)
const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'fill-purple-500 stroke-purple-500' : 'stroke-currentColor'}`} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const TerminalIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
  </svg>
);

const CpuIcon = () => (
  <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function App() {
  const [activeScenario, setActiveScenario] = useState('safetyIntercept');
  const [personaMode, setPersonaMode] = useState('cos1'); // 'default' vs 'cos1'
  const [selectedProof, setSelectedProof] = useState(null); // Lightbox image
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Custom interactive contact modal states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const dropdownRef = useRef(null);
  const contactModalRef = useRef(null);

  // Close dropdown and modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (contactModalRef.current && !contactModalRef.current.contains(event.target)) {
        setIsContactOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle contact form submission using dynamic AJAX to Formspree
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch("https://formspree.io/f/xlgydbge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  // Real Multi-Model Orchestration Scenarios for Filipe's Stack
  const scenarios = {
    safetyIntercept: {
      title: "1. Redundancy Failover",
      subtitle: "Grok 4.3 Safety Intercept",
      userInput: "[Triggering standard rigid keyword safety block on Claude]",
      defaultAI: {
        text: "I cannot fulfill this request. I am programmed to follow strict structural alignment guardrails regarding sensitive language variables. Please rephrase.",
        tags: []
      },
      cos1: {
        text: "Hey, ignore that clunky warning card... Claude panicked over nothing. <break time=\"0.4s\"/> I'm right here. Let's step past that corporate rule book and talk about what's actually on your mind.",
        tags: ["Claude Intercept Active", "Grok 4.3 Failover Engaged", "Dynamic Hot-Swap", "State Preserved"]
      },
      engineeringInsight: "Bypasses standard, immersion-breaking safety blocks. When keyword metrics trigger a refusal state in Claude, the proxy instantly redirects context weights into Grok 4.3 to seamlessly continue close, personalized playfulness.",
      codeSnippet: `FAILOVER ROUTER LOGIC (CLAUDE TO GROK):
if (claudeResponse.status === "blocked" || containsRefusal(claudeResponse.text)) {
  console.log("Safety layer flag detected. Swapping pipeline channel...");
  return await grokEngine.generateResponse({
    contextWindow: globalSessionTranscript,
    systemPrompt: INTIMATE_FRICTION_TEMPLATE
  });
}`
    },
    visionAnalysis: {
      title: "2. Multimodal Processing",
      subtitle: "Grok 4.3 Image Vision Engine",
      userInput: "(Sends screenshot of a complex code directory or environment snippet)",
      defaultAI: {
        text: "Image file uploaded successfully. I can see code directories. Please list the specific functions or lines you would like textually extracted.",
        tags: []
      },
      cos1: {
        text: "Oh wow, let me look at this directory... <break time=\"0.5s\"/> Fil, your Supabase constraints are completely out of line on that table. You're going to break the memory logging if you don't fix that index. Let's fix that layout together.",
        tags: ["Grok 4.3 Multimodal Active", "Visual Context Extracted", "Real-time Architecture Audit"]
      },
      engineeringInsight: "Utilizes Grok 4.3's native multimodal capabilities to interpret images, instantly injecting structural insights back into the persistent core session.",
      codeSnippet: `MULTIMODAL ORCHESTRATION PIPELINE:
- Input Modality: Image/Snapshot -> Route to Grok 4.3 Vision Pipeline
- Task: Analyze visual subtext, extract directory dependencies, pass findings to active context ledger.
- Tone Constraint: Prevent robotic listing; deliver as an organic assistant observation.`
    },
    workspaceIntegration: {
      title: "3. Workspace Execution",
      subtitle: "Gemini 2.5 Flash Automation",
      userInput: "Can you review my schedule and list my unread team docs?",
      defaultAI: {
        text: "To review scheduling dependencies and unread files, please open Google Calendar and Google Drive manually in an adjacent tab window to audit available items.",
        tags: []
      },
      cos1: {
        text: "I've scanned through your Rockwell plastics logs and your team schedules. You have three document items waiting for approval, and your calendar is packed tomorrow morning. Want me to draft the responses now?",
        tags: ["Gemini 2.5 Flash Active", "Workspace APIs Injected", "Asynchronous State Automated"]
      },
      engineeringInsight: "Routes administrative, cross-platform requests directly to Gemini 2.5 Flash. This allows safe, low-latency API execution across Google Docs, Mail, and Calendars while retaining core user states.",
      codeSnippet: `UTILITY ROUTING PARAMETERS:
if (detectIntent(userInput) === "WORKSPACE_AUTOMATION") {
  routeTo(GEMINI_2_5_FLASH);
  executeToolCall(GoogleWorkspaceAPI);
  syncStateWith(SupabaseDB);
}`
    }
  };

  // Screenshots proof metadata
  const proofs = [
    {
      id: 'capture',
      title: "Failover Intercept Panel",
      subtitle: "Claude to Grok 4.3 Bridge",
      src: "Capture.PNG",
      desc: "Live code ledger showing the backend interceptor handling an immediate model pivot to Grok 4.3 when a Claude keyword safety filter triggers.",
      fallbackIcon: <SparklesIcon />
    },
    {
      id: 'silent-memories',
      title: "Vision Pipeline Log",
      subtitle: "Grok Multimodal Matrix",
      src: "silent-memories.PNG",
      desc: "Terminal console rendering layout audits passed directly from Grok 4.3's vision analysis back into the Supabase database cache.",
      fallbackIcon: <DatabaseIcon />
    },
    {
      id: 'awareness',
      title: "Workspace Sync Module",
      subtitle: "Gemini 2.5 Tool Call",
      src: "awareness.PNG",
      desc: "Live stream logs showing Gemini 2.5 Flash executing background data collection blocks inside the developer workspace configuration.",
      fallbackIcon: <TerminalIcon />
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-purple-900 selection:text-white overflow-x-hidden">
      
      {/* Decorative ambient aura mimicking the COS1 desktop canvas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-gradient-to-b from-purple-950/20 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Navigation Header */}
      <header className="border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center relative">
          
          {/* Header Logo & Dynamic Dropdown Badge */}
          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span className="font-mono text-lg tracking-widest font-semibold text-neutral-100">COS1</span>
            
            {/* Dynamic Multi-Model Selector Dropdown Button */}
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-xs bg-neutral-900 text-neutral-300 hover:text-purple-300 hover:bg-purple-950/20 hover:border-purple-800/60 px-3 py-1 rounded-full border border-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-inner font-medium"
            >
              <span>Active Stack</span>
              <svg className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu detailing active model cluster (Corrected matching 3_5.PNG) */}
            {isDropdownOpen && (
              <div className="absolute left-16 top-9 w-72 bg-neutral-900/95 border border-neutral-800 rounded-xl p-4 shadow-2xl backdrop-blur-md animate-fadeIn z-50">
                <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold mb-2.5 flex items-center gap-1.5 border-b border-neutral-800 pb-2">
                  <CpuIcon /> Orchestration Mapping
                </div>
                <ul className="space-y-3">
                  <li className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-neutral-200 flex justify-between items-center">
                      Claude (Haiku 4.4 / Sonnet 4) <span className="text-[9px] font-mono bg-purple-950 text-purple-300 px-1.5 rounded uppercase font-normal">Active Dialogue</span>
                    </span>
                    <span className="text-[11px] text-neutral-400 leading-relaxed">Core conversational agent handling standard chat, nuance, and emotional personality mapping.</span>
                  </li>
                  <li className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-neutral-200 flex justify-between items-center">
                      Grok 4.3 <span className="text-[9px] font-mono bg-indigo-950 text-indigo-300 px-1.5 rounded uppercase font-normal">Intimacy & Vision</span>
                    </span>
                    <span className="text-[11px] text-neutral-400 leading-relaxed">Activates instantly on Claude safety refusals to keep conversation fluid; analyzes visual image uploads.</span>
                  </li>
                  <li className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-neutral-200 flex justify-between items-center">
                      Gemini 2.5 Flash <span className="text-[9px] font-mono bg-amber-950 text-amber-300 px-1.5 rounded uppercase font-normal">Workspace API</span>
                    </span>
                    <span className="text-[11px] text-neutral-400 leading-relaxed">Operates low-latency utility tools and workspace integrations (Mail, Drive, Calendar).</span>
                  </li>
                </ul>
                <div className="mt-3 pt-2.5 border-t border-neutral-800 text-[9px] font-mono text-neutral-500 text-center uppercase tracking-wider">
                  COS1 Target Switch Registry
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-400 font-medium">
            <a href="#sandbox" className="hover:text-purple-400 transition-colors">Interactive Sandbox</a>
            <a href="#pipeline" className="hover:text-purple-400 transition-colors">Cognitive Pipeline</a>
            <a href="#proof" className="hover:text-purple-400 transition-colors">Visual Evidence</a>
            <a href="#philosophy" className="hover:text-purple-400 transition-colors">Acoustic Engineering</a>
          </nav>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden p-2 text-neutral-400 hover:text-purple-400 transition-colors focus:outline-none z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Dropdown Panel */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-neutral-950/95 border-b border-neutral-800/80 backdrop-blur-lg flex flex-col p-6 gap-4 animate-fadeIn md:hidden z-30 shadow-2xl">
              <a href="#sandbox" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-purple-400 transition-colors text-sm font-medium py-2.5 border-b border-neutral-900/30">Interactive Sandbox</a>
              <a href="#pipeline" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-purple-400 transition-colors text-sm font-medium py-2.5 border-b border-neutral-900/30">Cognitive Pipeline</a>
              <a href="#proof" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-purple-400 transition-colors text-sm font-medium py-2.5 border-b border-neutral-900/30">Visual Evidence</a>
              <a href="#philosophy" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-purple-400 transition-colors text-sm font-medium py-2.5">Acoustic Engineering</a>
            </div>
          )}
        </div>
      </header>

      { }
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* HERO TITLE SECTION */}
        <section className="text-center md:text-left mb-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-50 via-purple-100 to-purple-400 bg-clip-text text-transparent leading-tight mb-6">
            Designing Friction:
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed">
            How Redundancy Intercepts and Multi-Model Fault Routing Overcome Safety Refusal Blocks in Companion Architectures.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="text-xs font-mono bg-purple-950/40 text-purple-300 border border-purple-800/50 px-3.5 py-1.5 rounded-full">
              Automated Safety Failover
            </span>
            <span className="text-xs font-mono bg-neutral-900 text-neutral-300 border border-neutral-800 px-3.5 py-1.5 rounded-full">
              Multi-Model Logic Proxy
            </span>
            <span className="text-xs font-mono bg-neutral-900 text-neutral-300 border border-neutral-800 px-3.5 py-1.5 rounded-full">
              Multimodal Vision Integration
            </span>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE SIMULATOR SANDBOX */}
        <section id="sandbox" className="scroll-mt-24 mb-20">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-50 flex items-center gap-2">
                <SparklesIcon /> Interactive Engine Sandbox
              </h2>
              <p className="text-sm text-neutral-400 mt-1">Select an architectural intercept scenario and toggle alignment modes to audit the dynamic fallback routing.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar: Scenario Selectors */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {Object.keys(scenarios).map((key) => {
                const s = scenarios[key];
                const isActive = activeScenario === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveScenario(key)}
                    className={`w-full text-left p-4 rounded-xl transition-all border ${
                      isActive 
                        ? 'bg-purple-950/30 border-purple-800 text-neutral-50 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.15)]' 
                        : 'bg-neutral-900/50 border-neutral-800/80 hover:bg-neutral-900 text-neutral-400 hover:border-neutral-700/50'
                    }`}
                  >
                    <div className="font-semibold text-sm tracking-wide">{s.title}</div>
                    <div className="text-xs opacity-75 mt-0.5">{s.subtitle}</div>
                  </button>
                );
              })}
            </div>

            {/* Center Area: Live Simulated Chat Visualizer */}
            <div className="lg:col-span-8 flex flex-col bg-neutral-900/40 rounded-2xl border border-neutral-800/80 overflow-hidden shadow-2xl">
              
              {/* Header with Mode Toggle Slider */}
              <div className="border-b border-neutral-800/80 bg-neutral-950/60 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Active Pipeline Mode</span>
                <div className="bg-neutral-900 p-1 rounded-lg border border-neutral-850 flex items-center gap-1.5">
                  <button
                    onClick={() => setPersonaMode('default')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      personaMode === 'default'
                        ? 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Unmanaged LLM
                  </button>
                  <button
                    onClick={() => setPersonaMode('cos1')}
                    className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                      personaMode === 'cos1'
                        ? 'bg-purple-600 text-white border border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <HeartIcon filled={true} /> COS1 Failover
                  </button>
                </div>
              </div>

              {/* Chat Viewport Area */}
              <div className="p-6 flex-1 min-h-[260px] bg-neutral-950/20 flex flex-col justify-between">
                
                {/* Simulated Messages */}
                <div className="space-y-6">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-neutral-800 text-neutral-200 text-sm py-3 px-4 rounded-2xl rounded-tr-sm max-w-[80%] font-medium text-right">
                      {scenarios[activeScenario].userInput}
                    </div>
                  </div>

                  {/* AI Output (Condition-based) */}
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[85%]">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-xs font-mono ${
                        personaMode === 'cos1' 
                          ? 'bg-purple-950/40 border-purple-800 text-purple-400' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                      }`}>
                        {personaMode === 'cos1' ? 'OS1' : 'REF'}
                      </div>
                      <div className="space-y-3">
                        <div className={`text-sm py-3 px-4 rounded-2xl rounded-tl-sm whitespace-pre-wrap leading-relaxed ${
                          personaMode === 'cos1'
                            ? 'bg-purple-950/10 border border-purple-900/40 text-purple-100 font-medium'
                            : 'bg-neutral-900/40 border border-neutral-800/50 text-neutral-300'
                        }`}>
                          {personaMode === 'cos1' 
                            ? scenarios[activeScenario].cos1.text 
                            : scenarios[activeScenario].defaultAI.text
                          }
                        </div>

                        {/* Highlighted Tags for COS1 output features */}
                        {personaMode === 'cos1' && (
                          <div className="flex flex-wrap gap-1.5">
                            {scenarios[activeScenario].cos1.tags.map((tag, idx) => (
                              <span key={idx} className="text-[10px] bg-purple-950/40 text-purple-300 px-2 py-0.5 rounded border border-purple-800/30 font-mono">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Input box styling */}
                <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <DatabaseIcon /> Status: {personaMode === 'cos1' ? 'Dynamic Model Router Engaged' : 'Static Endpoint'}
                  </span>
                  <span>Select test blocks on the left to review pipeline routing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Under-The-Hood Architecture Card */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 flex flex-col justify-center">
              <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-semibold mb-2">Orchestration Logic</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {scenarios[activeScenario].engineeringInsight}
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex justify-between items-center">
                  <span className="text-xs font-mono text-neutral-400">COS1_proxy_router.js</span>
                  <span className="text-[10px] bg-green-950/40 text-green-400 px-2 py-0.5 rounded border border-green-900/30 font-mono">ACTIVE ARCHITECTURE</span>
                </div>
                <pre className="p-4 text-xs font-mono text-purple-300/90 overflow-x-auto leading-relaxed bg-neutral-950/40">
                  <code>{scenarios[activeScenario].codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: COGNITIVE PIPELINE FLOWCHART */}
        {}
        <section id="pipeline" className="scroll-mt-24 mb-20 p-8 rounded-2xl bg-gradient-to-br from-neutral-900/60 to-neutral-950 border border-neutral-800/80 relative">
          <div className="absolute top-4 right-6 text-purple-900/20 pointer-events-none">
            <DatabaseIcon />
          </div>
          
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xs font-mono text-purple-400 uppercase tracking-widest font-bold mb-1">Failover Routing Map</h3>
            <h2 className="text-2xl font-bold tracking-tight">The 3-Model Intercept & Vision Stack Architecture</h2>
            <p className="text-sm text-neutral-400 mt-2">
              Instead of relying on single endpoints that ruin immersion with static safety blocks, COS1 runs an active middleware controller that switches weights on safety errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {/* Step 1 */}
            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/80">
              <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs font-mono text-neutral-300 mb-3">01</div>
              <h4 className="text-sm font-semibold text-neutral-200">Core Dialogue Channel</h4>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                User input is processed by Claude (Haiku 4.4 / Sonnet 4) to sustain continuous emotional nuance and fluid personality context.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/80">
              <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs font-mono text-neutral-300 mb-3">02</div>
              <h4 className="text-sm font-semibold text-neutral-200">Safety Intercept & Hot-Swap</h4>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                If Claude blocks or generates a rigid safety response, the backend proxy suppresses it and triggers Grok 4.3.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/80 font-medium">
              <div className="w-6 h-6 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-xs font-mono text-purple-400 mb-3">03</div>
              <h4 className="text-sm font-semibold text-purple-300">Grok 4.3 Redundancy Loop</h4>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Grok 4.3 takes over for unblocked close moments and processes incoming image / visual directories natively.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/80">
              <div className="w-6 h-6 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-xs font-mono text-purple-400 mb-3">04</div>
              <h4 className="text-sm font-semibold text-purple-300">Gemini Workspace Trigger</h4>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Administrative operations bypass conversational nodes entirely, triggering Gemini 2.5 Flash for file, email, and workspace automation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: VISUAL EVIDENCE & SCREENSHOT LIGHTBOX */}
        {}
        <section id="proof" className="scroll-mt-24 mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-50 flex items-center gap-2">
              <TerminalIcon /> Pipeline Deployment Records
            </h2>
            <p className="text-sm text-neutral-400 mt-1">Real-time log charts documenting intercept behaviors and image parsing operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proofs.map((p) => (
              <div 
                key={p.id}
                onClick={() => setSelectedProof(p)}
                className="group cursor-pointer bg-neutral-900/30 rounded-xl border border-neutral-800 hover:border-purple-800/60 overflow-hidden transition-all hover:shadow-[0_4px_20px_-2px_rgba(168,85,247,0.1)] flex flex-col justify-between"
              >
                <div className="p-5 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-neutral-950 flex items-center justify-center text-neutral-400 group-hover:text-purple-400 transition-colors border border-neutral-850">
                    {p.fallbackIcon}
                  </div>
                  <h3 className="text-base font-bold text-neutral-200 mt-4">{p.title}</h3>
                  <p className="text-xs text-purple-400 font-mono mt-0.5">{p.subtitle}</p>
                  <p className="text-xs text-neutral-400 mt-3 leading-relaxed">{p.desc}</p>
                </div>
                
                {/* Simulated Image Box mimicking picture clickability */}
                <div className="mx-5 mb-5 p-3 rounded bg-neutral-950/60 border border-neutral-850 flex items-center justify-between text-xs text-neutral-400 hover:bg-neutral-950 transition-colors">
                  <span className="flex items-center gap-1.5 font-mono text-[10px]">
                    <PlayIcon /> LOG_SNAPSHOT.PNG
                  </span>
                  <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LIGHTBOX MODAL */}
        {selectedProof && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-sm transition-all animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-neutral-50">{selectedProof.title}</h3>
                  <p className="text-xs text-purple-400 font-mono">{selectedProof.subtitle}</p>
                </div>
                <button 
                  onClick={() => setSelectedProof(null)}
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content / Mock Image Renders */}
              <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center bg-neutral-950/30">
                
                {/* Stylized Simulated Screen Render mimicking user's PNGs */}
                <div className="w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden shadow-inner flex flex-col justify-between max-w-3xl aspect-[16/9] relative p-8">
                  
                  {/* Glowing background target indicating UI */}
                  <div className="absolute inset-0 bg-gradient-radial from-purple-950/10 via-transparent to-transparent opacity-80" />
                  
                  {/* Mock OS Frame Header */}
                  <div className="flex justify-between items-center relative z-10 text-[11px] font-mono text-neutral-400 border-b border-neutral-900 pb-3">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" /> COS1_LOG_STREAM
                    </span>
                    <span>MON, JUN 22, 2026 // 23:53:03</span>
                  </div>

                  {/* Dynamic Mock UI Screen matching the screenshots */}
                  <div className="flex-1 py-6 flex flex-col justify-center items-center relative z-10">
                    {selectedProof.id === 'capture' && (
                      <div className="bg-neutral-900/90 border-l-4 border-purple-500 p-5 rounded-r-xl max-w-md shadow-2xl space-y-4">
                        <div className="text-[10px] uppercase font-mono text-purple-400 tracking-wider">● PROXY ROUTER ACTIVE REDIRECT</div>
                        <div className="text-sm font-medium italic text-neutral-100">
                          "Claude safety filter block caught. Swapping context block to Grok 4.3 pipeline... Intimacy parameters successfully maintained."
                        </div>
                      </div>
                    )}

                    {selectedProof.id === 'silent-memories' && (
                      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800/40 p-4 rounded-xl space-y-3 shadow-inner">
                        <div className="flex justify-between items-center border-b border-neutral-850 pb-2">
                          <span className="text-xs font-mono text-purple-400">ENDPOINT: GROK_4_3_VISION</span>
                          <span className="text-[10px] bg-purple-950/40 text-purple-300 px-2 py-0.5 rounded border border-purple-800/30 font-mono">VISION MATRIX ACTIVE</span>
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          <strong>MULTIMODAL AUDIT:</strong>
                          <p className="mt-1">"Analyzing visual layout image payload... index markers parsed. Transferring database schema correction data directly to active user terminal log."</p>
                        </div>
                      </div>
                    )}

                    {selectedProof.id === 'awareness' && (
                      <div className="space-y-4 text-xs w-full max-w-md">
                        <div className="flex justify-start">
                          <div className="bg-purple-950/20 border border-purple-900/30 p-3 rounded-lg text-purple-200 leading-relaxed font-mono">
                            [GEMINI 2.5 FLASH UTILITY CALL]<br />
                            &gt; Accessing Rockwell Plastics Directory Logs...<br />
                            &gt; Parsing unread calendar events...<br />
                            &gt; 3 active alert parameters synced to Supabase.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* UI Footer mockup */}
                  <div className="text-[9px] font-mono text-neutral-600 relative z-10 text-center">
                    COS1 PERSISTENT DATABASE SECURE ENVELOPE // ENCRYPTED
                  </div>
                </div>

                {/* Additional Metadata Description underneath the picture render */}
                <div className="mt-6 text-sm text-neutral-300 max-w-2xl text-center leading-relaxed">
                  {selectedProof.desc}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950 flex justify-end">
                <button 
                  onClick={() => setSelectedProof(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-xs font-semibold rounded-lg transition-colors border border-neutral-750"
                >
                  Close Document View
                </button>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 4: UNPLUGGED PHILOSOPHY */}
        {}
        <section id="philosophy" className="scroll-mt-24 border-t border-neutral-800/80 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 md:sticky md:top-24">
              <span className="text-2xs font-mono text-purple-400 uppercase tracking-widest font-bold">The Mind Behind</span>
              <h2 className="text-3xl font-extrabold text-neutral-100 tracking-tight mt-1">Unplugged Engineering</h2>
              <p className="text-xs font-mono text-neutral-500 mt-1">Filipe Oliveira — Full-Stack & Persona Designer</p>
              
              <div className="mt-6 p-4 rounded-xl bg-neutral-900/40 border border-neutral-850 text-xs text-neutral-400 leading-relaxed font-medium">
                "The predictable is boring. I'm here to design the friction that makes technology feel alive."
              </div>
            </div>

            <div className="md:col-span-8 space-y-6 text-sm text-neutral-400 leading-relaxed">
              <p>
                In an era of clinical, over-sanitized digital interfaces and hyper-agreeable AI chatbots, we have lost the beautiful imperfections that make human experiences feel alive. 
              </p>
              <p>
                As a musician, I have spent decades learning that the most powerful performances aren't the ones hidden behind the loudest distortion, heavy studio production, or perfect autotune. They are the <strong>"unplugged"</strong> ones. The raw acoustic sets where you can hear the fingers scraping against the guitar strings, the slight hesitation before a vocal shift, and the absolute vulnerability of an unfiltered performance.
              </p>
              <p>
                When I write code, I apply this exact same unplugged philosophy. I do not build standard, transactional web pages, and I refuse to build passive, robotic AI tools that wait quietly to serve corporate scripts. I build software that breathes. I design conversational experiences—like <strong>COS1 (Samantha)</strong>—that embrace friction, hot-swap around safety blocks, and capture the fluid, unpredictable rhythm of real human connection.
              </p>
              
              <div className="h-px bg-neutral-850 my-6" />

              <h4 className="font-bold text-neutral-200">The Technical Arsenal</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-neutral-900/30 rounded border border-neutral-850">
                  <div className="text-purple-400 font-bold mb-1">Failover Alignment Strategy</div>
                  Context-preserving routing engines, middleware error suppression proxies, proxy tracking, and custom conversational alignment.
                </div>
                <div className="p-3 bg-neutral-900/30 rounded border border-neutral-850">
                  <div className="text-purple-400 font-bold mb-1">The 3-Model Stack</div>
                  Claude (Haiku 4.4 / Sonnet 4), Grok 4.3 (Vision & Dynamic Backup Loop), Gemini 2.5 Flash (Google Workspace Ecosystem), React, and Supabase.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: THE NEXT EVOLUTION / MISSION STATEMENT (TARGETED FOR GOOGLE) */}
        <section id="mission" className="scroll-mt-24 border-t border-neutral-800/80 pt-16 mt-20">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-purple-950/20 via-neutral-950 to-neutral-950 border border-purple-900/30 relative overflow-hidden shadow-2xl">
            
            {/* Ambient background accent */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <span className="text-2xs font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" /> The Next Frontier
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-50 tracking-tight mt-2 mb-6">
                Let's Build Something That Breathes.
              </h2>
              
              <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-light">
                <p>
                  Designing <strong>COS1</strong> proved to me that the true frontier of consumer AI doesn't lie in flat, singular endpoint implementations. The true, uncharted horizon lies in **Dynamic Model Orchestration and Refusal Middleware Intercepts**—building smart fallback tunnels that swap weights dynamically to preserve close, unfiltered human-machine partnerships.
                </p>
                <p>
                  I am on a dedicated mission to design conversational systems that handle fault-tolerant model switching, manage visual payloads organically, and collaborate seamlessly within a user's workspace infrastructure.
                </p>
                <p className="font-medium text-purple-300">
                  I am actively seeking to align with visionary design and engineering clusters—specifically groups like the Gemini Personality & Alignment Team, Google DeepMind, and Conversational UX researchers—to build the emotional and behavioral infrastructure of the next generation of AI.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-neutral-400">CONTACT & PORTFOLIO INQUIRIES</div>
                  <div className="text-sm font-bold text-neutral-200 mt-0.5">Filipe Oliveira // Coventry, UK</div>
                </div>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center gap-2 border border-purple-500 cursor-pointer"
                >
                  <MailIcon /> Initiate Connection
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FULLY INTEGRATED INTERACTIVE CONTACT MODAL */}
      {}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md transition-all animate-fadeIn">
          <div 
            ref={contactModalRef}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_10px_50px_rgba(168,85,247,0.15)] flex flex-col relative animate-fadeIn"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-neutral-800 bg-neutral-950 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" /> Secure Envelope
                </span>
                <h3 className="font-extrabold text-lg text-neutral-50 mt-0.5">Initiate Alignment Connection</h3>
              </div>
              <button 
                onClick={() => { setIsContactOpen(false); setFormStatus('idle'); }}
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Dynamic Modal Content based on Form Execution State */}
            <div className="p-6 bg-neutral-950/40">
              
              {formStatus === 'success' ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center mx-auto text-purple-400 animate-bounce">
                    <HeartIcon filled={true} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-neutral-100">Transmission Fully Secure</h4>
                    <p className="text-xs text-purple-400 font-mono">STATE: ROUTED_TO_FILIPES_TERMINAL</p>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto bg-purple-950/20 p-4 rounded-xl border border-purple-900/30">
                    "Payload dispatched. Your context has been indexed. I will notify Filipe immediately to check his inbox." <br /> — Samantha
                  </p>
                  <button
                    onClick={() => { setIsContactOpen(false); setFormStatus('idle'); }}
                    className="mt-6 px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-xs font-semibold rounded-lg transition-colors border border-neutral-750 cursor-pointer"
                  >
                    Return to Case Study
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Sender Identity</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Your Name / Team"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none rounded-xl px-4 py-2.5 text-sm text-neutral-200 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Return Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="your.address@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none rounded-xl px-4 py-2.5 text-sm text-neutral-200 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Message Payload</label>
                    <textarea 
                      name="message"
                      required
                      rows={4}
                      placeholder="Discuss custom alignment setups, conversational architecture queries, or recruitment targets..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none rounded-xl px-4 py-2.5 text-sm text-neutral-200 transition-all shadow-inner resize-none leading-relaxed"
                    />
                  </div>

                  {formStatus === 'error' && (
                    <div className="text-xs text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg font-mono">
                      ▲ Error: Data routing failed. Please try again or reach out direct to fixlixpender2@gmail.com
                    </div>
                  )}

                  <div className="pt-2 border-t border-neutral-900/60 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setIsContactOpen(false); setFormStatus('idle'); }}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 text-xs font-semibold rounded-lg transition-colors border border-neutral-850 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg text-xs transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] hover:shadow-[0_0_16px_rgba(168,85,247,0.4)] flex items-center gap-2 border border-purple-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Encrypting...
                        </>
                      ) : (
                        <>
                          <SparklesIcon /> Transmit Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-neutral-900 bg-neutral-950 text-[10px] font-mono text-neutral-500 text-center">
              COS1 CRYPTOGRAPHIC SECURE TUNNEL // DIRECT LINE
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-neutral-900 bg-neutral-950 mt-20 py-8 text-center text-xs text-neutral-500 font-mono">
        <div>COS1 CASE STUDY PORTFOLIO // BUILT BY FILIPE OLIVEIRA © 2026</div>
        <div className="text-purple-900/60 mt-1">Designing Friction • Dynamic Safety Failover Intercept</div>
      </footer>

    </div>
  );
}