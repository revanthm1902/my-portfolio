"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Wifi, BatteryFull, Search, ExternalLink, Github, Maximize2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// --- EXPANDED PROJECT DATA ---
const projectsData = [
  {
    id: 1,
    iconName: "Second Brain",
    name: "Second Brain",
    shortDesc: "AI Knowledge Management",
    fullDesc: "A full-stack knowledge management platform engineered with real-time synchronization. It acts as a digital neural network, integrating the Gemini API for Al-driven summarization, vector-based semantic tagging, and instantaneous knowledge discovery.",
    features: [
      "Gemini API integration for auto-summarization & tagging",
      "Real-time data synchronization and persistence via Supabase",
      "Markdown support with rich-text rendering",
      "Secure JWT-based user authentication and role management"
    ],
    tech: ["Next.js", "React", "Supabase", "Tailwind CSS", "Gemini API"],
    liveUrl: "http://second-brain-notes-ai.vercel.app/",
    githubUrl: "https://github.com/revanthm1902/second-brain",
  },
  {
    id: 2,
    iconName: "SafeFit",
    name: "SafeFit Wearable",
    shortDesc: "IoT Health Monitor",
    fullDesc: "A screenless health wearable designed for elderly and patient care. It continuously monitors SpO2 and heart rate, utilizing an onboard accelerometer for fall detection. The system bypasses smartphones, connecting directly to GSM networks for emergency alerts.",
    features: [
      "Real-time SpO2 and continuous heart rate monitoring",
      "Algorithmic fall detection using MPU6050 sensor data",
      "<5s emergency alert latency (Direct SMS/Call via GSM)",
      "Custom PCB architecture interfacing with NodeMCU"
    ],
    tech: ["IoT", "React Native", "NodeMCU", "C++", "Custom PCB"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902/safe-fit",
  },
  {
    id: 3,
    iconName: "ERP System",
    name: "School ERP System",
    shortDesc: "St. G.D. School Portal",
    fullDesc: "The official digital infrastructure for St. G.D. Convent School. This secure MERN stack solution digitized decades of paper records, providing distinct portals for students, teachers, and administrators to streamline daily operations.",
    features: [
      "Strict Role-Based Access Control (RBAC) architecture",
      "Digitized and encrypted records for 1,000+ students & staff",
      "Automated attendance logging and fee tracking modules",
      "Dynamic report and analytics dashboard"
    ],
    tech: ["React.js", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://stgdconventschool.com/",
    githubUrl: "https://github.com/revanthm1902/StgdSchool",
  },
  {
    id: 4,
    iconName: "Leap Pulse",
    name: "Leap Pulse",
    shortDesc: "Brand Perception Tool",
    fullDesc: "An AI-powered analytics dashboard built to monitor brand health. It ingests unstructured social sentiment data and processes it through machine learning models to generate real-time market positioning insights.",
    features: [
      "Real-time social sentiment analysis engine",
      "Automated competitor positioning matrix generation",
      "Interactive data visualization dashboard (Charts/Graphs)",
      "Automated PDF reporting generation for stakeholders"
    ],
    tech: ["Next.js", "AI/ML", "Data Analytics", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902/leap-pulse",
  },
  {
    id: 5,
    iconName: "PlayNow",
    name: "PlayNow Web App",
    shortDesc: "Party Game Platform",
    fullDesc: "A responsive multiplayer party game web application. Designed for sub-second latency, it utilizes real-time state management to synchronize gameplay events across multiple client devices in active game lobbies.",
    features: [
      "Real-time multiplayer game state synchronization",
      "Interactive, mobile-first responsive UI/UX",
      "Dynamic lobby creation and session management",
      "Seamless deployment and edge-caching via Vercel"
    ],
    tech: ["Next.js", "React", "Vercel", "WebSockets"],
    liveUrl: "https://play-now-or-never.vercel.app/",
    githubUrl: "https://github.com/revanthm1902/PlayNow",
  },
  {
    id: 6,
    iconName: "Spreadsheet",
    name: "Spreadsheet Lite",
    shortDesc: "Web-based Data Grid",
    fullDesc: "A lightweight, highly optimized browser-based spreadsheet. It mimics core Excel functionalities by implementing a custom formula parser and a dependency graph to efficiently update cell values based on dynamic references.",
    features: [
      "Custom DAG (Directed Acyclic Graph) for formula evaluation",
      "Responsive CSS Grid architecture for massive tables",
      "Client-side data state persistence and local storage",
      "Dynamic cell formatting and reference highlighting"
    ],
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Data Structures"],
    liveUrl: "https://spread-sheet-lite.vercel.app/",
    githubUrl: "https://github.com/revanthm1902/spreadsheet-lite",
  },
  {
    id: 7,
    iconName: "PushUp",
    name: "Streak Tracker",
    shortDesc: "A Chrome extension",
    fullDesc: "A gamified fitness application focused entirely on tracking push-up repetitions. It utilizes local storage and interactive charts to help users maintain daily streaks and visualize their physical progression over time.",
    features: [
      "Leetcode, Codeforces, HackerRank, CodeChef Problem tracker",
      "Gamified streak system with daily/weekly goals",
      "Interactive progress visualization with charts and stats",
      "Browser notifications for streak reminders and milestones"
    ],
    tech: ["React Native", "JavaScript", "Firebase"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902/PushUp",
  },
  {
    id: 8,
    iconName: "Real-Estate",
    name: "Real Estate CMS",
    shortDesc: "Property Management",
    fullDesc: "A comprehensive Content Management System tailored for real estate agencies. It streamlines operations by providing robust property listing management, advanced search filtering, and a secure tenant database.",
    features: [
      "Dynamic property listing with advanced search & filter",
      "Cloud-based image gallery hosting for properties",
      "Secure admin dashboard for portfolio and agent oversight",
      "RESTful API architecture for rapid data retrieval"
    ],
    tech: ["MERN Stack", "Tailwind CSS", "JWT Auth", "Cloudinary"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902/Real-Estate-Management-System",
  },
  {
    id: 9,
    iconName: "Laundry MS",
    name: "Laundry Management",
    shortDesc: "Service Operations",
    fullDesc: "An end-to-end operational software solution for laundromat businesses. It tracks the complete lifecycle of a service order from intake to delivery, whilst managing customer billing and histories.",
    features: [
      "Live order status tracking pipeline (Intake to Delivery)",
      "Customer history tracking and database management",
      "Role-specific UI routing for staff vs. administrators"
    ],
    tech: ["React.js", "Node.js", "Express", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902/laundry-management-system",
  },
  {
    id: 10,
    iconName: "Ethereum Validator",
    name: "Ethereum Validator",
    shortDesc: "Blockchain Infrastructure",
    fullDesc: "A robust technical implementation focused on Ethereum network consensus. Involved configuring and maintaining a secure validator node to participate in block validation and smart contract interactions on the testnet.",
    features: [
      "Validator node deployment and synchronization",
      "Consensus layer participation and uptime monitoring",
      "validator performance analytics and reporting dashboard",
      "Beaconcha.in integration for real-time validator status tracking",
      "Alchemy API integration for smart contract interaction and on-chain data retrieval"

    ],
    tech: ["Alchemy", "Beaconcha.in", "Web3.js", "Ethereum", "Node.js", "Express.js"],
    liveUrl: "https://ethereum-validator-dashboard.vercel.app/",
    githubUrl: "https://github.com/revanthm1902/ethereum-validator",
  },
  {
    id: 11,
    iconName: "Ydhya",
    name: "Ydhya App",
    shortDesc: "Custom Web Platform",
    fullDesc: "Mecication reminder and health tracking web application built with React.js. It features a custom responsive UI, server-side rendering for optimized performance, and a modular component architecture for maintainability.",
    features: [
      "Custom responsive UI design with mobile-first approach",
      "Server-side rendering (SSR) for improved performance and SEO",
      "Modular React component architecture for scalability",
      "Integration with third-party APIs for health data tracking"
    ],
    tech: ["Next.js", "React", "CSS Modules", "Vercel"],
    liveUrl: "#",
    githubUrl: "https://github.com/revanthm1902/Ydhya",
  }
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
type ProjectType = typeof projectsData[0];

const AppIcon = ({ proj, onClick }: { proj: ProjectType, onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center justify-start w-24 h-28 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300 group shrink-0"
    >
      <div className="relative w-16 h-12 md:w-20 md:h-14 items-end justify-center drop-shadow-xl mb-2 flex mx-auto transition-all duration-300">
        <div className="absolute top-0 left-0 w-1/3 h-3 md:h-4 bg-[#7abcf5] rounded-t-md" />
        <div className="absolute bottom-0 w-full h-10 md:h-12 bg-[#57a6eb] rounded-b-md rounded-tr-md" />
        <div className="absolute bottom-2 left-[10%] w-[80%] h-8 md:h-10 bg-white/90 rounded-sm" />
        <div className="absolute bottom-0 w-full h-9 md:h-11 bg-[#479ee8]/90 backdrop-blur-md rounded-md border-t border-white/30 shadow-inner group-hover:brightness-110 transition-all duration-300" />
      </div>
      <div className="h-8 flex items-start justify-center w-full mt-1">
        <span className="text-white text-[10px] md:text-[11px] font-medium text-center shadow-black drop-shadow-md bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded leading-tight line-clamp-2 w-full transition-colors duration-300">
          {proj.iconName}
        </span>
      </div>
    </motion.div>
  );
};

// --- IN-OS TERMINAL COMPONENT ---
const OSTerminal = ({ onFocus, openProject }: { onFocus: () => void, openProject: (id: number) => void }) => {
  const [history, setHistory] = useState<{ type: string, text: string }[]>([
    { type: "info", text: "Portfolio OS v1.0.0 (Revanth Modalavalasa)" },
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
      projectsData.forEach(p => newHistory.push({ type: "text", text: `  [${p.id.toString().padStart(2, '0')}] ${p.name}` }));
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
      className="absolute inset-0 z-50 flex flex-col overflow-hidden cursor-auto select-none bg-[#2a0505]"
    >
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/wallpaper.jpg')" }} />
      <div className="absolute inset-0 z-0 bg-[#5b0b0b]/35" />

      {/* TOP MENU BAR */}
      <div className="h-7 w-full bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-3 md:px-4 text-white text-[10px] md:text-[11px] font-medium tracking-wide z-50">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="font-bold cursor-pointer hover:opacity-80"> Revanth&apos;s OS </span>
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
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-[repeat(auto-fill,minmax(96px,1fr))] md:grid-rows-[repeat(auto-fill,minmax(112px,1fr))] md:grid-flow-col gap-2 md:gap-4 items-start justify-start content-start h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden md:overflow-hidden md:overflow-x-auto no-scrollbar w-full pb-20">

          {projectsData.map((proj) => (
            <AppIcon key={proj.id} proj={proj} onClick={() => openWindow(proj.id, "project")} />
          ))}

          {/* Terminal App Icon */}
          <motion.div
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => openWindow("terminal", "terminal")}
            className="flex flex-col items-center justify-start w-24 h-28 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300 group shrink-0"
          >
            <div className="flex items-center justify-center w-14 h-12 md:w-16 md:h-14 rounded-xl bg-[#141414] border border-zinc-700 shadow-xl mb-2 mx-auto transition-all duration-300 group-hover:border-zinc-500">
              <Terminal size={24} className="text-[#e67e5a] transition-all duration-300" />
            </div>
            <div className="h-8 flex items-start justify-center w-full mt-1">
              <span className="text-white text-[10px] md:text-[11px] font-medium text-center shadow-black drop-shadow-md bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded w-full transition-colors duration-300">
                Terminal
              </span>
            </div>
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
                top: `max(6%, ${8 + (index * 3)}%)`,
                marginLeft: `${index * 24}px`,
                zIndex: 100 + index
              }}
              // DECREASED WINDOW SIZE (md:w-[820px] and md:h-[500px])
              className={`absolute left-1/2 -translate-x-1/2 w-[94vw] md:w-205 ${isTerminal ? 'h-[60vh] md:h-112.5' : 'h-[82vh] md:h-130 max-h-[85vh]'} flex flex-col bg-[#1c1c1e]/90 backdrop-blur-3xl rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/20 overflow-hidden`}
            >
              {/* Window Title Bar */} 
              <div className="h-10 md:h-12 w-full bg-[#2d2d30] border-b border-black/40 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing shrink-0">
                <div className="flex gap-2.5">
                  <button onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }} className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#FF5F56] flex items-center justify-center group cursor-pointer">
                    <span className="opacity-0 group-hover:opacity-100 text-[#8b1a10] text-[10px] md:text-xs font-bold leading-none mb-px md:mb-0.5">×</span>
                  </button>
                  <button className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#FFBD2E] flex items-center justify-center group cursor-pointer">
                    <span className="opacity-0 group-hover:opacity-100 text-[#9d7215] text-[10px] md:text-xs font-bold leading-none mb-px md:mb-0.5">-</span>
                  </button>
                  <button className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#27C93F] flex items-center justify-center group cursor-pointer">
                    <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-[#115b1a]" />
                  </button>
                </div>
                <span className="text-zinc-300 text-[11px] md:text-xs font-semibold font-mono tracking-wide flex items-center gap-2 truncate px-2">
                  {isTerminal && <Terminal size={14} className="text-[#e67e5a]" />}
                  {windowTitle}
                </span>
                <div className="w-12 hidden md:block" />
              </div>

              {/* Window Content */}
              {isTerminal ? (
                <OSTerminal onFocus={() => bringToFront("terminal")} openProject={(id) => openWindow(id, "project")} />
              ) : (
                <div className="flex-1 flex flex-col md:flex-row cursor-auto overflow-y-auto no-scrollbar">

                  {/* LEFT COLUMN: Title, Stack, Buttons */}
                  <div className="w-full md:w-[38%] p-6 md:p-8 bg-black/20 md:border-r border-white/5 flex flex-col gap-5 shrink-0">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">{projData?.name}</h2>
                      <p className="text-zinc-400 text-xs md:text-sm font-mono">{projData?.shortDesc}</p>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {projData?.tech.map((t, i) => (
                          <span key={i} className="px-2.5 py-1 bg-white/10 border border-white/10 rounded-md text-[10px] md:text-[11px] font-mono text-zinc-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-auto pt-6">
                      <a 
                        href={projData?.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-4 py-2.5 rounded-xl text-[11px] md:text-xs font-bold tracking-widest transition-all cursor-pointer hover:scale-[1.02]"
                        onClick={(e) => {
                          if (!projData?.liveUrl || projData.liveUrl === "#") {
                            e.preventDefault();
                            toast.info("Live URL updating soon...");
                          }
                        }}
                      >
                        <ExternalLink size={16} /> VIEW LIVE
                      </a>
                      <a 
                        href={projData?.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 px-4 py-2.5 rounded-xl text-[11px] md:text-xs font-bold tracking-widest transition-all cursor-pointer hover:scale-[1.02]"
                        onClick={(e) => {
                          if (!projData?.githubUrl || projData.githubUrl === "#") {
                            e.preventDefault();
                            toast.info("Source repository updating soon...");
                          }
                        }}
                      >
                        <Github size={16} /> SOURCE CODE
                      </a>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Desc & Key Features */}
                  <div className="w-full md:w-[62%] p-6 md:p-8 flex flex-col gap-6 bg-[#1c1c1e]/50 overflow-y-auto no-scrollbar">

                    <div>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block mb-2.5">Overview</span>
                      <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">{projData?.fullDesc}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block mb-3">Key Features</span>
                      <ul className="flex flex-col gap-2.5">
                        {projData?.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-300">
                            <CheckCircle2 size={16} className="text-[#57a6eb] shrink-0 mt-1px" />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* FLAWLESS EXIT OS BUTTON (<>) */}
        <motion.button
          onClick={handleExit}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 h-12 bg-[#1E1E1E]/90 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-center px-4 shadow-2xl z-50 group hover:bg-red-600 hover:border-red-500 cursor-pointer transition-colors duration-300"
        >
          <div className="flex items-center text-white font-mono font-bold text-lg">
            <span className="text-zinc-400 group-hover:text-white transition-colors">&lt;</span>
            <div className="w-0 overflow-hidden group-hover:w-19 transition-all duration-300 ease-out flex items-center justify-center">
              <span className="text-sm tracking-widest opacity-0 group-hover:opacity-100 whitespace-nowrap px-2 transition-opacity duration-300 delay-100">
                EXIT OS
              </span>
            </div>
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

      await addLine("info", "[ OK ] Mounting root filesystem /dev/nvme0n1p2...", 260);
      await addLine("warn", "[WARN] Unrecognized user signature detected.", 220);
      await addLine("info", "[AUTH] Human verification protocol required.", 180);

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

      // Dynamically load ALL modules based on project count
      for (let i = 1; i <= projectsData.length; i++) {
        await new Promise(res => setTimeout(res, 25)); // Sped up the loop so 11 projects load quickly
        setBootLines(prev => [...prev, { type: "info", text: `Unpacking project_module_0${i}.pkg... OK` }]);
      }

      await new Promise(res => setTimeout(res, 150));
      setBootLines(prev => [...prev, { type: "info", text: "Starting GUI Interface..." }]);
      await new Promise(res => setTimeout(res, 250));
      setPhase("desktop");
    } else {
      setBootLines(prev => [...prev, { type: "error", text: "Incorrect checksum. Access denied." }]);
      setAuthStep("prompt");
    }
  };

  return (
    <main className="fixed inset-0 z-50 w-full h-dvh bg-[#141414] overflow-hidden cursor-default">
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

              <div className="border border-[#e67e5a] text-[#e67e5a] px-4 py-2 w-fit rounded-md mb-6 shadow-[0_0_15px_rgba(230,126,90,0.15)] bg-[#e67e5a]/5 text-xs md:text-sm">
                * Welcome to the Revanth OS research preview!
              </div>

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