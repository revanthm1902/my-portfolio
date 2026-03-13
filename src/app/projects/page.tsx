"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Folder, Wifi, BatteryFull, Search, ExternalLink, Github, Maximize2, Code } from "lucide-react";
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
    githubUrl: "https://github.com/revanthm1902",
    color: "from-blue-400 to-indigo-600"
  },
  {
    id: 2,
    iconName: "Proj 2",
    name: "SafeFit Wearable",
    shortDesc: "IoT Health Monitor",
    fullDesc: "A screenless health wearable featuring SpO2, heart rate monitoring, fitness tracking, and fall detection. Integrated GSM+GPS auto-calling and SMS alerting using NodeMCU and custom PCB architecture, achieving <5s emergency alert latency.",
    tech: ["IoT", "React Native", "NodeMCU", "C++", "Custom PCB"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902",
    color: "from-emerald-400 to-teal-600"
  },
  {
    id: 3,
    iconName: "Proj 3",
    name: "ERP System",
    shortDesc: "School Management",
    fullDesc: "Designed the official digital platform for St. G.D. Convent School, deploying a secure MERN stack solution to digitize records for 1,000+ users. Implemented an admin portal with Role-Based Access Control (RBAC), reducing administrative data entry workload by 50%.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "RBAC"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902",
    color: "from-orange-400 to-red-600"
  },
  {
    id: 4,
    iconName: "Proj 4",
    name: "Safety Helmet",
    shortDesc: "Industrial IoT",
    fullDesc: "Intelligent Safety Helmet (CS1) using Raspberry Pi-based IoT architecture. Integrates 360° cameras and multi-sensor data fusion with a real-time telemetry pipeline, successfully reducing incident response latency by 90%.",
    tech: ["Raspberry Pi", "Python", "Sensor Fusion", "Telemetry"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902",
    color: "from-purple-400 to-fuchsia-600"
  },
  {
    id: 5,
    iconName: "Proj 5",
    name: "Leap Pulse",
    shortDesc: "Brand Perception Tool",
    fullDesc: "An AI-powered brand perception monitoring tool built during a hackathon to analyze real-time sentiment and market positioning.",
    tech: ["Next.js", "AI/ML", "Data Analytics"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902",
    color: "from-cyan-400 to-blue-500"
  },
];

// --- FULLSCREEN UTILS ---
const requestFullScreen = () => {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen().catch(() => { });
};

const exitFullScreen = () => {
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => { });
  }
};

// --- APP ICON COMPONENT ---
const AppIcon = ({ proj, onClick }: { proj: any, onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex flex-col items-center justify-start w-20 md:w-24 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition-colors group"
  >
    {/* DESKTOP: Mac Folder */}
    <div className="hidden md:flex relative w-16 h-14 items-end justify-center drop-shadow-xl mb-2">
      <div className="absolute top-0 left-0 w-1/3 h-3 bg-blue-300 rounded-t-md" />
      <div className="absolute bottom-0 w-full h-12 bg-blue-400 rounded-b-md rounded-tr-md" />
      <div className="absolute bottom-2 left-[10%] w-[80%] h-10 bg-white/90 rounded-sm" />
      <div className="absolute bottom-0 w-full h-10 bg-blue-500/80 backdrop-blur-md rounded-md border-t border-white/30 shadow-inner" />
    </div>

    {/* MOBILE: iOS App Squircle */}
    <div className={`md:hidden flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${proj.color} shadow-lg mb-1.5 border border-white/20`}>
      <Code size={24} className="text-white drop-shadow-md" />
    </div>

    <span className="text-white text-[10px] md:text-[11px] font-medium text-center shadow-black drop-shadow-md bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded leading-tight line-clamp-2 w-full">
      {proj.iconName}
    </span>
  </motion.div>
);

// --- IN-OS TERMINAL COMPONENT ---
const OSTerminal = ({ onClose, onFocus, openProject }: { onClose: () => void, onFocus: () => void, openProject: (id: number) => void }) => {
  const [history, setHistory] = useState<{ type: string, text: string }[]>([
    { type: "info", text: "Portfolio OS v1.0.0 (Darwin Kernel)" },
    { type: "info", text: "Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: "cmd", text: `revanth@mac ~$ ${input}` }];

    if (cmd === "help") {
      newHistory.push({ type: "text", text: "Available commands:" });
      newHistory.push({ type: "text", text: "  ls         - List all available projects" });
      newHistory.push({ type: "text", text: "  open <id>  - Open a project (e.g., 'open 1')" });
      newHistory.push({ type: "text", text: "  clear      - Clear terminal output" });
      newHistory.push({ type: "text", text: "  date       - Show current system date" });
    } else if (cmd === "ls") {
      projectsData.forEach(p => newHistory.push({ type: "text", text: `  [${p.id}] ${p.name}` }));
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd === "date") {
      newHistory.push({ type: "text", text: new Date().toString() });
    } else if (cmd.startsWith("open ")) {
      const arg = cmd.split(" ")[1];
      const projId = parseInt(arg);
      const proj = projectsData.find(p => p.id === projId);
      if (proj) {
        newHistory.push({ type: "success", text: `Opening ${proj.name}...` });
        openProject(proj.id);
      } else {
        newHistory.push({ type: "error", text: `Project '${arg}' not found. Type 'ls' to see IDs.` });
      }
    } else {
      newHistory.push({ type: "error", text: `Command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div onPointerDown={onFocus} className="w-full h-full flex flex-col bg-[#1E1E1E] text-zinc-300 font-mono text-xs md:text-sm p-4 cursor-text overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4 space-y-1">
        {history.map((line, i) => (
          <div key={i} className={
            line.type === "error" ? "text-red-400" :
              line.type === "success" ? "text-green-400" :
                line.type === "cmd" ? "text-white font-bold" : "text-zinc-300"
          }>
            {line.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2 shrink-0">
        <span className="text-green-400 font-bold hidden xs:inline">revanth@mac ~$</span>
        <span className="text-green-400 font-bold xs:hidden">~$</span>
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none border-none text-white shadow-none focus:ring-0"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

// --- MAC OS DESKTOP ENVIRONMENT ---
const MacOSDesktop = () => {
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const [activeWindows, setActiveWindows] = useState<{ id: string | number, type: "project" | "terminal" }[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = `${time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} ${time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

  const openWindow = (id: string | number, type: "project" | "terminal") => {
    if (!activeWindows.find(w => w.id === id)) {
      setActiveWindows(prev => [...prev, { id, type }]);
    } else {
      bringToFront(id);
    }
  };

  const closeWindow = (id: string | number) => {
    setActiveWindows(prev => prev.filter(w => w.id !== id));
  };

  const bringToFront = (id: string | number) => {
    setActiveWindows(prev => {
      const win = prev.find(w => w.id === id);
      const rest = prev.filter(w => w.id !== id);
      return win ? [...rest, win] : prev;
    });
  };

  const handleExit = () => {
    exitFullScreen();
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      className="absolute inset-0 z-[9999] flex flex-col overflow-hidden cursor-auto select-none bg-black"
    >
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/wallpaper.jpg')" }} />
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* TOP MENU BAR */}
      <div className="h-7 w-full bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-3 md:px-4 text-white text-[10px] md:text-[11px] font-medium tracking-wide z-[60]">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="font-bold cursor-pointer hover:opacity-80">Revanth's Mac</span>
          <span className="hidden md:inline hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer">File</span>
          <span className="hidden md:inline hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer">Edit</span>
          <span className="hidden md:inline hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer">View</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Wifi size={12} />
          <BatteryFull size={14} />
          <Search size={12} className="cursor-pointer hidden xs:block" />
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* DESKTOP WORKSPACE */}
      <div className="flex-1 p-4 md:p-6 relative w-full h-full z-10 overflow-hidden">

        {/* RESPONSIVE ICON GRID 
            Mobile: Flex Row wrap (iOS App Grid style)
            Desktop: Flex Col wrap (macOS Folder style) */}
        <div className="flex flex-row md:flex-col flex-wrap gap-4 md:gap-6 items-start content-start h-[calc(100vh-120px)] overflow-hidden w-full">

          {projectsData.map((proj) => (
            <AppIcon key={proj.id} proj={proj} onClick={() => openWindow(proj.id, "project")} />
          ))}

          {/* Terminal App Icon */}
          <motion.div
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => openWindow("terminal", "terminal")}
            className="flex flex-col items-center justify-start w-20 md:w-24 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-14 rounded-2xl bg-[#1E1E1E] border-2 border-zinc-700 shadow-xl mb-1.5 md:mb-2">
              <Terminal size={24} className="text-green-400" />
            </div>
            <span className="text-white text-[10px] md:text-[11px] font-medium text-center shadow-black drop-shadow-md bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded w-full">
              Terminal
            </span>
          </motion.div>
        </div>

        {/* WINDOW RENDERING SYSTEM */}
        {activeWindows.map((win, index) => {
          const isTerminal = win.type === "terminal";
          const projData = !isTerminal ? projectsData.find(p => p.id === win.id) : null;
          const windowTitle = isTerminal ? "Terminal — bash" : `${projData?.iconName} — ${projData?.name}`;

          return (
            <motion.div
              key={win.id}
              drag
              dragMomentum={false}
              onPointerDown={() => bringToFront(win.id)}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // Ensure window stays within bounds on mobile
              style={{
                top: `max(5%, ${10 + (index * 2)}%)`,
                left: `max(2%, ${15 + (index * 3)}%)`,
                zIndex: 100 + index
              }}
              className={`absolute w-[96vw] md:w-[750px] ${isTerminal ? 'h-[60vh] md:h-[400px]' : 'h-[80vh] md:h-[450px] max-h-[80vh]'} flex flex-col bg-[#1c1c1e]/90 backdrop-blur-3xl rounded-xl md:rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/20 overflow-hidden`}
            >
              {/* Window Title Bar */}
              <div className="h-10 md:h-12 w-full bg-[#2d2d30] border-b border-black/40 flex items-center justify-between px-3 md:px-4 cursor-grab active:cursor-grabbing shrink-0">
                <div className="flex gap-2.5">
                  <button onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }} className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] flex items-center justify-center group !cursor-pointer">
                    <span className="opacity-0 group-hover:opacity-100 text-[#8b1a10] text-[9px] font-bold leading-none mb-[1px]">×</span>
                  </button>
                  <button className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] flex items-center justify-center group !cursor-pointer">
                    <span className="opacity-0 group-hover:opacity-100 text-[#9d7215] text-[10px] leading-none mb-[1px]">-</span>
                  </button>
                  <button className="w-3.5 h-3.5 rounded-full bg-[#27C93F] flex items-center justify-center group !cursor-pointer">
                    <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-[#115b1a]" />
                  </button>
                </div>
                <span className="text-zinc-300 text-[10px] md:text-xs font-semibold font-mono tracking-wide flex items-center gap-2 truncate px-2">
                  {isTerminal && <Terminal size={12} />}
                  {windowTitle}
                </span>
                <div className="w-12 hidden md:block" />
              </div>

              {/* Window Content */}
              {isTerminal ? (
                <OSTerminal onClose={() => closeWindow("terminal")} onFocus={() => bringToFront("terminal")} openProject={(id) => openWindow(id, "project")} />
              ) : (
                <div className="flex-1 flex flex-col md:flex-row cursor-auto overflow-y-auto no-scrollbar">
                  {/* Left Column */}
                  <div className="w-full md:w-2/5 p-5 md:p-8 bg-black/20 md:border-r border-white/5 flex flex-col gap-4 md:gap-6 shrink-0">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1 md:mb-2">{projData?.name}</h2>
                      <p className="text-zinc-400 text-xs md:text-sm font-mono">{projData?.shortDesc}</p>
                    </div>
                    <div className="flex flex-col gap-2 md:gap-3">
                      <span className="text-[9px] md:text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Stack</span>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {projData?.tech.map((t, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 border border-white/10 rounded text-[10px] md:text-[11px] font-mono text-zinc-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="w-full md:w-3/5 p-5 md:p-8 flex flex-col gap-6 md:justify-between">
                    <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">{projData?.fullDesc}</p>
                    <div className="flex flex-row gap-2 md:gap-3 mt-auto pb-4 md:pb-0">
                      <a href={projData?.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 bg-white text-black hover:bg-zinc-200 px-2 md:px-4 py-2.5 md:py-3 rounded-lg text-[10px] md:text-xs font-bold tracking-widest transition-all !cursor-pointer hover:scale-[1.02]">
                        <ExternalLink size={14} /> <span className="hidden xs:inline">VIEW</span> LIVE
                      </a>
                      <a href={projData?.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 px-2 md:px-4 py-2.5 md:py-3 rounded-lg text-[10px] md:text-xs font-bold tracking-widest transition-all !cursor-pointer hover:scale-[1.02]">
                        <Github size={14} /> <span className="hidden xs:inline">SOURCE</span> CODE
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* EXIT BUTTON */}
        <motion.button
          onClick={handleExit}
          initial={{ width: 56 }}
          whileHover={{ width: 120 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 h-14 bg-[#1E1E1E]/90 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-start px-4 shadow-2xl z-[200] overflow-hidden group hover:bg-red-600 hover:border-red-500 !cursor-pointer"
        >
          <div className="flex items-center gap-3 whitespace-nowrap text-white font-mono font-bold">
            <Code size={20} className="shrink-0 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-widest">EXIT OS</span>
          </div>
        </motion.button>

      </div>
    </motion.div>
  );
};


// --- INITIAL UBUNTU BOOT SEQUENCE ---
export default function ProjectsPage() {
  const [phase, setPhase] = useState<"terminal" | "desktop">("terminal");
  const [bootLines, setBootLines] = useState<{ type: string, text: string }[]>([
    { type: "sys", text: "Ubuntu 24.04 LTS (GNU/Linux 5.15.0-101-generic x86_64)" },
    { type: "sys", text: "Welcome to Revanth_OS. System booting..." }
  ]);
  const [authStep, setAuthStep] = useState<"checking" | "prompt" | "verifying" | "loading">("checking");

  const [mathA, setMathA] = useState(0);
  const [mathB, setMathB] = useState(0);
  const [userInput, setUserInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [bootLines]);

  useEffect(() => {
    if (phase !== "terminal") return;
    const bootSequence = async () => {
      const addLine = (type: string, text: string, delay: number) => new Promise(res => setTimeout(() => {
        setBootLines(prev => [...prev, { type, text }]);
        res(true);
      }, delay));

      await addLine("info", "[ OK ] Started Secure Protocol Initialization.", 600);
      await addLine("info", "[ OK ] Mounting root filesystem /dev/nvme0n1p2...", 400);
      await addLine("warn", "[WARN] Unrecognized user signature detected.", 800);
      await addLine("auth", "[AUTH] Human verification protocol required.", 600);

      setMathA(Math.floor(Math.random() * 50) + 10);
      setMathB(Math.floor(Math.random() * 50) + 10);
      setAuthStep("prompt");
    };
    bootSequence();
  }, [phase]);

  useEffect(() => {
    if (authStep === "prompt") inputRef.current?.focus();
  }, [authStep]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput) return;

    const answer = parseInt(userInput);
    setBootLines(prev => [...prev, { type: "input", text: `revanth@portfolio:~$ authorize --sum ${userInput}` }]);
    setUserInput("");
    setAuthStep("verifying");

    if (answer === mathA + mathB) {
      setBootLines(prev => [...prev, { type: "success", text: "[ OK ] Verification successful. Access granted." }]);
      setAuthStep("loading");

      // TRIGGER FULLSCREEN MODE UPON SUCCESS
      requestFullScreen();

      for (let i = 1; i <= 5; i++) {
        await new Promise(res => setTimeout(res, 150));
        setBootLines(prev => [...prev, { type: "info", text: `[ OK ] Unpacking project_module_0${i}.pkg...` }]);
      }

      await new Promise(res => setTimeout(res, 400));
      setBootLines(prev => [...prev, { type: "sys", text: "Starting GUI Interface. Switching tty..." }]);
      await new Promise(res => setTimeout(res, 600));
      setPhase("desktop");
    } else {
      setBootLines(prev => [...prev, { type: "error", text: "[FAIL] Incorrect checksum. Access denied." }]);
      setAuthStep("prompt");
    }
  };

  return (
    <main className="fixed inset-0 z-[9999] w-full h-[100dvh] bg-[#300A24] overflow-hidden cursor-default">
      <AnimatePresence mode="wait">

        {phase === "terminal" && (
          <motion.div
            key="terminal"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col p-4 md:p-8 pt-10 font-mono text-sm overflow-hidden cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar pb-10">
              {bootLines.map((line, idx) => (
                <div key={idx} className={
                  line.type === "sys" ? "text-zinc-300" :
                    line.type === "info" ? "text-white" :
                      line.type === "warn" ? "text-yellow-400 font-bold" :
                        line.type === "auth" ? "text-cyan-400 font-bold" :
                          line.type === "success" ? "text-green-400 font-bold" :
                            line.type === "error" ? "text-red-500 font-bold" :
                              line.type === "input" ? "text-white font-bold mt-2" : "text-white"
                }>
                  {line.text}
                </div>
              ))}

              {authStep === "prompt" && (
                <form onSubmit={handleAuthSubmit} className="flex items-center gap-2 mt-2">
                  <span className="text-green-400 font-bold">revanth@portfolio:~$</span>
                  <span className="text-white">solve {mathA} + {mathB} = </span>
                  <input
                    ref={inputRef}
                    type="number"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="bg-transparent outline-none border-none text-white w-20 shadow-none focus:ring-0 p-0 m-0"
                    autoComplete="off"
                  />
                  <span className="animate-pulse bg-white w-2 h-4 inline-block -ml-2" />
                </form>
              )}
              <div ref={endRef} />
            </div>
          </motion.div>
        )}

        {phase === "desktop" && <MacOSDesktop key="desktop" />}

      </AnimatePresence>
    </main>
  );
}