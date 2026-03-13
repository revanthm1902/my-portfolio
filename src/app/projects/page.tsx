"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Wifi, BatteryFull, Search, ExternalLink, Github, Maximize2 } from "lucide-react";
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

// --- APP ICON COMPONENT (Clean Folders Only) ---
const AppIcon = ({ proj, onClick }: { proj: any, onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center justify-start w-20 md:w-24 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition-colors group"
    >
      {/* Unified Pure Mac Folder (No Emojis/Icons) */}
      <div className="relative w-16 h-12 md:w-20 md:h-14 items-end justify-center drop-shadow-xl mb-2 flex mx-auto">
        <div className="absolute top-0 left-0 w-1/3 h-3 md:h-4 bg-[#7abcf5] rounded-t-md" />
        <div className="absolute bottom-0 w-full h-10 md:h-12 bg-[#57a6eb] rounded-b-md rounded-tr-md" />
        <div className="absolute bottom-2 left-[10%] w-[80%] h-8 md:h-10 bg-white/90 rounded-sm" />
        <div className="absolute bottom-0 w-full h-9 md:h-11 bg-[#479ee8]/90 backdrop-blur-md rounded-md border-t border-white/30 shadow-inner" />
      </div>

      <span className="text-white text-[10px] md:text-[11px] font-medium text-center shadow-black drop-shadow-md bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded leading-tight line-clamp-2 w-full">
        {proj.iconName}
      </span>
    </motion.div>
  );
};

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
    <div onPointerDown={onFocus} className="w-full h-full flex flex-col bg-[#141414] text-zinc-300 font-mono text-xs md:text-sm p-4 cursor-text overflow-hidden rounded-b-xl">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4 space-y-1">
        {history.map((line, i) => (
          <div key={i} className={
            line.type === "error" ? "text-red-400" :
              line.type === "success" ? "text-[#e67e5a]" :
                line.type === "cmd" ? "text-white font-bold" : "text-zinc-400"
          }>
            {line.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2 shrink-0">
        <span className="text-[#e67e5a] font-bold hidden xs:inline">revanth@mac ~$</span>
        <span className="text-[#e67e5a] font-bold xs:hidden">~$</span>
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

        {/* RESPONSIVE ICON GRID */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:flex md:flex-col md:flex-wrap gap-2 md:gap-6 items-start content-start h-[calc(100vh-120px)] overflow-hidden w-full">

          {projectsData.map((proj) => (
            <AppIcon key={proj.id} proj={proj} onClick={() => openWindow(proj.id, "project")} />
          ))}

          {/* Terminal App Icon */}
          <motion.div
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => openWindow("terminal", "terminal")}
            className="flex flex-col items-center justify-start w-20 md:w-24 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center justify-center w-14 h-12 md:w-16 md:h-14 rounded-xl bg-[#141414] border border-zinc-700 shadow-xl mb-2 mx-auto">
              <Terminal size={24} className="text-[#e67e5a]" />
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
              style={{
                top: `max(5%, ${10 + (index * 2)}%)`,
                left: `max(2%, ${15 + (index * 3)}%)`,
                zIndex: 100 + index
              }}
              className={`absolute w-[94vw] md:w-[900px] ${isTerminal ? 'h-[60vh] md:h-[500px]' : 'h-[85vh] md:min-h-[550px] max-h-[88vh]'} flex flex-col bg-[#1c1c1e]/90 backdrop-blur-3xl rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/20 overflow-hidden`}
            >
              {/* Window Title Bar */}
              <div className="h-12 md:h-14 w-full bg-[#2d2d30] border-b border-black/40 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing shrink-0">
                <div className="flex gap-2.5">
                  <button onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }} className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#FF5F56] flex items-center justify-center group !cursor-pointer">
                    <span className="opacity-0 group-hover:opacity-100 text-[#8b1a10] text-[10px] md:text-xs font-bold leading-none mb-[1px] md:mb-[2px]">×</span>
                  </button>
                  <button className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#FFBD2E] flex items-center justify-center group !cursor-pointer">
                    <span className="opacity-0 group-hover:opacity-100 text-[#9d7215] text-[10px] md:text-xs font-bold leading-none mb-[1px] md:mb-[2px]">-</span>
                  </button>
                  <button className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#27C93F] flex items-center justify-center group !cursor-pointer">
                    <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-[#115b1a]" />
                  </button>
                </div>
                <span className="text-zinc-300 text-xs md:text-sm font-semibold font-mono tracking-wide flex items-center gap-2 truncate px-2">
                  {isTerminal && <Terminal size={14} className="text-[#e67e5a]" />}
                  {windowTitle}
                </span>
                <div className="w-12 hidden md:block" />
              </div>

              {/* Window Content */}
              {isTerminal ? (
                <OSTerminal onClose={() => closeWindow("terminal")} onFocus={() => bringToFront("terminal")} openProject={(id) => openWindow(id, "project")} />
              ) : (
                <div className="flex-1 flex flex-col md:flex-row cursor-auto overflow-y-auto no-scrollbar">
                  <div className="w-full md:w-[40%] p-6 md:p-10 bg-black/20 md:border-r border-white/5 flex flex-col gap-5 md:gap-8 shrink-0">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">{projData?.name}</h2>
                      <p className="text-zinc-400 text-sm font-mono">{projData?.shortDesc}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className="text-[10px] md:text-xs text-zinc-500 font-mono uppercase tracking-widest">Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {projData?.tech.map((t, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-md text-xs font-mono text-zinc-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-[60%] p-6 md:p-10 flex flex-col gap-6 md:justify-between">
                    <p className="text-sm md:text-base text-zinc-300 leading-relaxed">{projData?.fullDesc}</p>

                    <div className="flex flex-col xs:flex-row gap-3 mt-auto pb-4 md:pb-0">
                      <a href={projData?.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-4 py-3 md:py-4 rounded-xl text-xs font-bold tracking-widest transition-all !cursor-pointer hover:scale-[1.02]">
                        <ExternalLink size={16} /> VIEW LIVE
                      </a>
                      <a href={projData?.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 px-4 py-3 md:py-4 rounded-xl text-xs font-bold tracking-widest transition-all !cursor-pointer hover:scale-[1.02]">
                        <Github size={16} /> SOURCE CODE
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* < EXIT OS > BUTTON (Dynamic Hover) */}
        <motion.button
          onClick={handleExit}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 h-12 bg-[#1E1E1E]/90 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-center px-4 shadow-2xl z-[200] group hover:bg-red-600 hover:border-red-500 !cursor-pointer transition-colors duration-300"
        >
          <div className="flex items-center text-white font-mono font-bold text-lg">
            <span className="text-zinc-400 group-hover:text-white transition-colors">&lt;</span>
            <span className="w-4 group-hover:w-[85px] overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap text-sm flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 tracking-widest">EXIT OS</span>
            </span>
            <span className="text-zinc-400 group-hover:text-white transition-colors">&gt;</span>
          </div>
        </motion.button>

      </div>
    </motion.div>
  );
};


// --- INITIAL CLAUDE-STYLE BOOT SEQUENCE ---
export default function ProjectsPage() {
  const [phase, setPhase] = useState<"terminal" | "desktop">("terminal");
  const [bootLines, setBootLines] = useState<{ type: string, text: string }[]>([]);
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

      await addLine("info", "[ OK ] Mounting root filesystem /dev/nvme0n1p2...", 600);
      await addLine("warn", "[WARN] Unrecognized user signature detected.", 500);
      await addLine("info", "[AUTH] Human verification protocol required.", 400);

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
    setBootLines(prev => [...prev, { type: "input", text: `revanth@os:~$ authorize --sum ${userInput}` }]);
    setUserInput("");
    setAuthStep("verifying");

    if (answer === mathA + mathB) {
      setBootLines(prev => [...prev, { type: "success", text: "Login successful. Access granted." }]);
      setAuthStep("loading");

      requestFullScreen();

      for (let i = 1; i <= 5; i++) {
        await new Promise(res => setTimeout(res, 150));
        setBootLines(prev => [...prev, { type: "info", text: `Unpacking project_module_0${i}.pkg... OK` }]);
      }

      await new Promise(res => setTimeout(res, 400));
      setBootLines(prev => [...prev, { type: "info", text: "Starting GUI Interface..." }]);
      await new Promise(res => setTimeout(res, 600));
      setPhase("desktop");
    } else {
      setBootLines(prev => [...prev, { type: "error", text: "Incorrect checksum. Access denied." }]);
      setAuthStep("prompt");
    }
  };

  return (
    <main className="fixed inset-0 z-[9999] w-full h-[100dvh] bg-[#141414] overflow-hidden cursor-default">
      <AnimatePresence mode="wait">

        {phase === "terminal" && (
          <motion.div
            key="terminal"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col p-4 md:p-8 pt-8 font-mono text-xs md:text-sm overflow-hidden cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex flex-col overflow-y-auto no-scrollbar pb-10">

              {/* CLAUDE CLI HEADER */}
              <div className="border border-[#e67e5a] text-[#e67e5a] px-4 py-2 w-fit rounded-md mb-6 shadow-[0_0_15px_rgba(230,126,90,0.15)] bg-[#e67e5a]/5 text-xs md:text-sm">
                * Welcome to the Revanth OS research preview!
              </div>

              {/* REVANTH BLOCK ASCII */}
              <pre className="text-[#e67e5a] font-bold text-[8px] sm:text-[10px] md:text-xs leading-tight mb-8 drop-shadow-md">
                {`██████╗ ███████╗██╗   ██╗ █████╗ ███╗   ██╗████████╗██╗  ██╗
██╔══██╗██╔════╝██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██║  ██║
██████╔╝█████╗  ██║   ██║███████║██╔██╗ ██║   ██║   ███████║
██╔══██╗██╔══╝  ╚██╗ ██╔╝██╔══██║██║╚██╗██║   ██║   ██╔══██║
██║  ██║███████╗ ╚████╔╝ ██║  ██║██║ ╚████║   ██║   ██║  ██║
╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝`}
              </pre>

              <div className="space-y-1.5">
                {bootLines.map((line, idx) => (
                  <div key={idx} className={
                    line.type === "info" ? "text-zinc-400" :
                      line.type === "warn" ? "text-yellow-500 font-bold" :
                        line.type === "success" ? "text-[#e67e5a] font-bold" :
                          line.type === "error" ? "text-red-500 font-bold" :
                            line.type === "input" ? "text-white font-bold mt-3" : "text-white"
                  }>
                    {line.text}
                  </div>
                ))}

                {authStep === "prompt" && (
                  <form onSubmit={handleAuthSubmit} className="flex items-center gap-2 mt-3">
                    <span className="text-[#e67e5a] font-bold">revanth@os:~$</span>
                    <span className="text-zinc-300 hidden xs:inline">solve {mathA} + {mathB} = </span>
                    <span className="text-zinc-300 xs:hidden">{mathA} + {mathB} = </span>
                    <input
                      ref={inputRef}
                      type="number"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="bg-transparent outline-none border-none text-white w-20 shadow-none focus:ring-0 p-0 m-0"
                      autoComplete="off"
                    />
                    <span className="animate-pulse bg-[#e67e5a] w-2 h-4 inline-block -ml-2" />
                  </form>
                )}
                <div ref={endRef} />
              </div>
            </div>
          </motion.div>
        )}

        {phase === "desktop" && <MacOSDesktop key="desktop" />}

      </AnimatePresence>
    </main>
  );
}