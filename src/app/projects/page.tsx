"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Folder, Wifi, BatteryFull, Search, ExternalLink, Github, Maximize2 } from "lucide-react";
import { useRouter } from "next/navigation";

// --- PROJECT DATA ---
const projectsData = [
  {
    id: 1,
    iconName: "Proj 1",
    name: "Second Brain",
    shortDesc: "AI Knowledge Management",
    fullDesc: "A full-stack knowledge management platform engineered with real-time synchronization and secure authentication. It integrates the Gemini API for Al-driven summarization and semantic tagging to enhance knowledge discovery, wrapped in a highly responsive dashboard for dynamic categorization.",
    tech: ["React.js", "Next.js", "Supabase", "Tailwind CSS", "Gemini API"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902"
  },
  {
    id: 2,
    iconName: "Proj 2",
    name: "SafeFit Wearable",
    shortDesc: "IoT Health Monitor",
    fullDesc: "A screenless health wearable featuring SpO2, heart rate monitoring, fitness tracking, and fall detection. Integrated GSM+GPS auto-calling and SMS alerting using NodeMCU and custom PCB architecture, achieving <5s emergency alert latency.",
    tech: ["IoT", "React Native", "NodeMCU", "C++", "Custom PCB"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902"
  },
  {
    id: 3,
    iconName: "Proj 3",
    name: "ERP System",
    shortDesc: "School Management",
    fullDesc: "Designed the official digital platform for St. G.D. Convent School, deploying a secure MERN stack solution to digitize records for 1,000+ users. Implemented an admin portal with Role-Based Access Control (RBAC), reducing administrative data entry workload by 50%.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "RBAC"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902"
  },
  {
    id: 4,
    iconName: "Proj 4",
    name: "Safety Helmet",
    shortDesc: "Industrial IoT",
    fullDesc: "Intelligent Safety Helmet (CS1) using Raspberry Pi-based IoT architecture. Integrates 360° cameras and multi-sensor data fusion with a real-time telemetry pipeline, successfully reducing incident response latency by 90%.",
    tech: ["Raspberry Pi", "Python", "Sensor Fusion", "Telemetry"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902"
  },
  {
    id: 5,
    iconName: "Proj 5",
    name: "Leap Pulse",
    shortDesc: "Brand Perception Tool",
    fullDesc: "An AI-powered brand perception monitoring tool built during a hackathon to analyze real-time sentiment and market positioning.",
    tech: ["Next.js", "AI/ML", "Data Analytics"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902"
  },
];

// --- MAC OS DESKTOP COMPONENT ---
const MacOSDesktop = () => {
  const router = useRouter();
  const [time, setTime] = useState(new Date());

  // Array state to handle MULTIPLE open windows
  const [openWindows, setOpenWindows] = useState<typeof projectsData>([]);

  // Live Clock Update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = `${time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} ${time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

  // Window Management Functions
  const openProject = (proj: typeof projectsData[0]) => {
    if (!openWindows.find(w => w.id === proj.id)) {
      setOpenWindows(prev => [...prev, proj]); // Add new window
    } else {
      bringToFront(proj.id); // Bring existing window to front
    }
  };

  const closeProject = (id: number) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const bringToFront = (id: number) => {
    setOpenWindows(prev => {
      const win = prev.find(w => w.id === id);
      const rest = prev.filter(w => w.id !== id);
      return win ? [...rest, win] : prev;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      // Fixed Cursor Override: Forces system cursors everywhere inside the OS
      className="absolute inset-0 z-50 flex flex-col overflow-hidden cursor-auto select-none"
    >
      {/* WALLPAPER BACKGROUND */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/wallpaper.jpg')" }}
      />

      {/* Fallback gradient overlay to ensure readability if wallpaper is too bright */}
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* MAC OS TOP MENU BAR */}
      <div className="h-7 w-full bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-white text-[11px] font-medium tracking-wide z-[60]">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="font-bold ml-2 cursor-pointer hover:opacity-80">Revanth's OS</span>
          <span className="hidden md:inline hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer">File</span>
          <span className="hidden md:inline hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer">Edit</span>
          <span className="hidden md:inline hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer">View</span>
          <span className="hidden md:inline hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer">Go</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <Wifi size={12} />
          <BatteryFull size={14} />
          <Search size={12} cursor="pointer" />
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* DESKTOP WORKSPACE & FOLDERS */}
      <div className="flex-1 p-6 flex flex-col items-end relative w-full h-full z-10">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-30 mix-blend-overlay">
          <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter drop-shadow-2xl">Hello World!</h1>
        </div>

        {/* FOLDER GRID (Moved to Right Side like real macOS) */}
        <div className="flex flex-col gap-6 items-center mt-4">
          {projectsData.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openProject(proj)}
              className="flex flex-col items-center justify-center w-24 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition-colors group"
            >
              <div className="relative">
                <Folder size={56} className="text-[#6CB4EE] drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] mb-1" fill="#6CB4EE" fillOpacity={0.8} />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }} />
              </div>
              <span className="text-white text-[11px] font-medium text-center shadow-black drop-shadow-md bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md line-clamp-2">
                {proj.iconName}
              </span>
            </motion.div>
          ))}
        </div>

        {/* MULTIPLE MAC OS APP WINDOWS */}
        {openWindows.map((activeProject, index) => (
          <motion.div
            key={activeProject.id}
            drag
            dragMomentum={false}
            onPointerDown={() => bringToFront(activeProject.id)}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            // Stagger initial positions slightly so they don't spawn perfectly on top of each other
            style={{
              top: `${10 + (index * 2)}%`,
              left: `${5 + (index * 2)}%`,
              zIndex: 100 + index // Last opened/clicked window has highest z-index
            }}
            // Larger Window Size & Premium Styling
            className="absolute w-[calc(100vw-2rem)] md:w-[750px] min-h-[450px] flex flex-col bg-[#1c1c1e]/85 backdrop-blur-3xl rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/20 overflow-hidden"
          >
            {/* Window Title Bar */}
            <div className="h-14 w-full bg-white/5 border-b border-white/10 flex items-center justify-between px-5 cursor-grab active:cursor-grabbing shrink-0">
              <div className="flex gap-2.5">
                <button
                  onClick={(e) => { e.stopPropagation(); closeProject(activeProject.id); }}
                  className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:brightness-125 border border-black/20 flex items-center justify-center group !cursor-pointer"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-[#8b1a10] text-[9px] font-bold leading-none mb-[1px]">×</span>
                </button>
                <button className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:brightness-125 border border-black/20 flex items-center justify-center group !cursor-pointer">
                  <span className="opacity-0 group-hover:opacity-100 text-[#9d7215] text-[10px] leading-none mb-[1px]">-</span>
                </button>
                <button className="w-3.5 h-3.5 rounded-full bg-[#27C93F] hover:brightness-125 border border-black/20 flex items-center justify-center group !cursor-pointer">
                  <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-[#115b1a]" />
                </button>
              </div>
              <span className="text-zinc-300 text-xs font-semibold font-mono tracking-wide">{activeProject.iconName} — {activeProject.name}</span>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Window Content (2-Column Layout on Desktop) */}
            <div className="flex-1 flex flex-col md:flex-row cursor-auto">

              {/* Left Column: Title & Tech */}
              <div className="w-full md:w-2/5 p-6 md:p-8 bg-black/20 border-r border-white/5 flex flex-col gap-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white mb-2">{activeProject.name}</h2>
                  <p className="text-zinc-400 text-sm font-mono">{activeProject.shortDesc}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/10 border border-white/10 rounded text-[11px] font-mono text-zinc-300 shadow-inner">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Description & Actions */}
              <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between gap-8">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {activeProject.fullDesc}
                </p>

                {/* Fixed Cursor Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    // OVERRIDE CUSTOM CURSORS HERE WITH !cursor-pointer
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-4 py-3 rounded-lg text-xs font-bold tracking-widest transition-all shadow-lg !cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink size={14} />
                    VIEW LIVE
                  </a>
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 px-4 py-3 rounded-lg text-xs font-bold tracking-widest transition-all !cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Github size={14} />
                    SOURCE CODE
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        ))}

        {/* EXPANDABLE EXIT BUTTON (Bottom Center) */}
        <motion.button
          onClick={() => router.push("/")}
          initial={{ width: 48 }}
          whileHover={{ width: 110 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 h-12 bg-black/60 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-start px-3.5 shadow-2xl z-[200] overflow-hidden group hover:bg-red-600 hover:border-red-500 !cursor-pointer"
        >
          <div className="flex items-center gap-3 whitespace-nowrap text-white font-mono font-bold">
            <span className="w-5 text-center text-lg leading-none shrink-0 group-hover:text-white text-zinc-400 transition-colors">{"</"}</span>
            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-widest">EXIT</span>
          </div>
        </motion.button>

      </div>
    </motion.div>
  );
};


// --- MAIN PAGE (HANDLES TERMINAL LOGIC) ---
export default function ProjectsPage() {
  const [phase, setPhase] = useState<"terminal" | "desktop">("terminal");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [authStep, setAuthStep] = useState<"checking" | "prompt" | "verifying" | "loading">("checking");

  const [mathA, setMathA] = useState(0);
  const [mathB, setMathB] = useState(0);
  const [userInput, setUserInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLines]);

  useEffect(() => {
    if (phase !== "terminal") return;

    const bootSequence = async () => {
      const addLine = (line: string, delay: number) => new Promise(res => setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
        res(true);
      }, delay));

      await addLine("> INITIALIZING SECURE PROTOCOL...", 800);
      await addLine("> CHECKING AUTHORIZATION LEVELS...", 1000);
      await addLine("> WARNING: UNRECOGNIZED USER DETECTED.", 800);
      await addLine("> INITIATING HUMAN VERIFICATION CAPTCHA...", 1200);

      setMathA(Math.floor(Math.random() * 90) + 10);
      setMathB(Math.floor(Math.random() * 90) + 10);

      setAuthStep("prompt");
    };

    bootSequence();
  }, [phase]);

  useEffect(() => {
    if (authStep === "prompt" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [authStep]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput) return;

    const answer = parseInt(userInput);
    setTerminalLines(prev => [...prev, `> USER INPUT: ${userInput}`]);
    setUserInput("");
    setAuthStep("verifying");

    if (answer === mathA + mathB) {
      setTerminalLines(prev => [...prev, "> VERIFICATION SUCCESSFUL. ACCESS GRANTED."]);
      setAuthStep("loading");

      for (let i = 1; i <= 5; i++) {
        await new Promise(res => setTimeout(res, 200));
        setTerminalLines(prev => [...prev, `> Loading project_module_0${i}.pkg... OK`]);
      }

      await new Promise(res => setTimeout(res, 500));
      setTerminalLines(prev => [...prev, "> BOOTING GUI INTERFACE..."]);

      await new Promise(res => setTimeout(res, 800));
      setPhase("desktop");
    } else {
      setTerminalLines(prev => [...prev, "> VERIFICATION FAILED. INCORRECT SUM."]);
      setTerminalLines(prev => [...prev, "> PLEASE TRY AGAIN."]);
      setAuthStep("prompt");
    }
  };

  return (
    <main className="fixed inset-0 z-[9999] w-full h-[100dvh] bg-[#050505] overflow-hidden">
      <AnimatePresence mode="wait">

        {/* --- TERMINAL VIEW --- */}
        {phase === "terminal" && (
          <motion.div
            key="terminal"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex flex-col p-6 md:p-16 pt-20 font-mono text-xs md:text-sm text-green-500 overflow-hidden cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center gap-3 text-zinc-500 mb-8 border-b border-zinc-800 pb-4">
              <Terminal size={16} />
              <span>root@modalavalasa:~//projects_auth</span>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar pb-10">
              {terminalLines.map((line, idx) => (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={idx}>
                  {line}
                </motion.div>
              ))}

              {authStep === "prompt" && (
                <form onSubmit={handleAuthSubmit} className="flex items-center gap-2 mt-4">
                  <span className="text-red-500">{">"} SOLVE TO CONTINUE: {mathA} + {mathB} = </span>
                  <input
                    ref={inputRef}
                    type="number"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="bg-transparent outline-none border-none text-white w-20 shadow-none focus:ring-0"
                    autoComplete="off"
                  />
                  <span className="animate-pulse bg-green-500 w-2 h-4 inline-block -ml-1" />
                </form>
              )}
              <div ref={endOfTerminalRef} />
            </div>
          </motion.div>
        )}

        {/* --- MAC OS VIEW --- */}
        {phase === "desktop" && <MacOSDesktop key="desktop" />}

      </AnimatePresence>
    </main>
  );
}