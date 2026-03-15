"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { Home, User, Wrench, PenTool, FileText, FolderGit2, Award, MessageCircle, Briefcase } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

// --- EXACT BRACKET COORDINATES ---
const nodes = [
  { id: "home", label: "Portfolio", icon: Home, x: 200, y: 350 },
  { id: "about", label: "About", icon: User, x: 500, y: 180 },
  { id: "contact", label: "Contact", icon: MessageCircle, x: 800, y: 350 },
  { id: "skills", label: "Skills", icon: Wrench, x: 500, y: 520 },
  { id: "blog", label: "Blog", icon: PenTool, x: 800, y: 100 },
  { id: "resume", label: "Resume", icon: FileText, x: 800, y: 280 },
  { id: "experience", label: "Experience", icon: Briefcase, x: 500, y: 350 },
  { id: "projects", label: "Projects", icon: FolderGit2, x: 800, y: 460 },
  { id: "certifications", label: "Certifications", icon: Award, x: 800, y: 600 },
];

const edges = [
  { source: "home", target: "about", depth: 1 },
  { source: "about", target: "blog", depth: 2 },
  { source: "about", target: "resume", depth: 2 },
  { source: "home", target: "skills", depth: 1 },
  { source: "skills", target: "projects", depth: 2 },
  { source: "skills", target: "certifications", depth: 2 },
  { source: "home", target: "experience", depth: 1 },
  { source: "experience", target: "contact", depth: 2 },
];

const GRAPH_WIDTH = 1100;
const GRAPH_HEIGHT = 800;

// --- Structured branch lanes for cleaner hierarchy ---
const getLaneX = (sourceId: string, targetId: string, startX: number, endX: number) => {
  if (sourceId === "home") return 350;
  if (sourceId === "about" || sourceId === "skills" || sourceId === "experience") return 650;

  const targetOffset = targetId === "contact" ? 20 : 0;
  return ((startX + endX) / 2) + targetOffset;
};

const generateOrthogonalPath = (
  sourceId: string,
  targetId: string,
  source: { x: number; y: number },
  target: { x: number; y: number }
) => {
  const startX = source.x + 32; // 32px offset to start at the edge of the 64px circle
  const startY = source.y;
  const endX = target.x - 32;   // 32px offset to end at the edge of the target circle
  const endY = target.y;
  const laneX = getLaneX(sourceId, targetId, startX, endX);
  const midX = Math.max(startX + 64, Math.min(laneX, endX - 64));
  
  return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
};

interface MobileNodeProps {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  isVisited: boolean;
  isActive: boolean;
  onNodeClick: (id: string) => void;
}

function MobileNode({ id, label, icon: Icon, isVisited, isActive, onNodeClick }: MobileNodeProps) {
  return (
    <div onClick={() => onNodeClick(id)} className="relative flex items-center gap-4 cursor-pointer group">
      {id !== "home" && (
        <div
          className="absolute -left-6 w-6 h-[1.5px] -z-10 transition-colors duration-500"
          style={{ backgroundColor: isVisited ? "#71717a" : "#27272a" }}
        />
      )}
      <div className={`w-12 h-12 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 bg-[#0a0a0a] ${isActive ? "border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : isVisited ? "border-zinc-400 text-zinc-300" : "border-zinc-800 text-zinc-600 border-dashed"}`}>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      </div>
      <span className={`text-base md:text-lg font-medium tracking-wide transition-colors duration-300 ${isActive ? "text-white" : isVisited ? "text-zinc-300" : "text-zinc-600"}`}>
        {label}
      </span>
    </div>
  );
}

interface NavWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavWindow({ isOpen, onClose }: NavWindowProps) {
  const [zoom, setZoom] = useState(1);
  const [visitedNodes, setVisitedNodes] = useState<string[]>(["home"]);

  const containerRef = useRef<HTMLDivElement>(null);
  const windowDragControls = useDragControls();

  const router = useRouter();
  const pathname = usePathname();

  const activeNode = pathname === "/" ? "home" : pathname.replace(/^\//, "");

  // Hydrate visitedNodes safely on the client
  useEffect(() => {
    // Next.js recommended way to defer state update to avoid synchronous cascading renders during hydration
    const timer = setTimeout(() => {
      const currentPage = window.location.pathname === "/" ? "home" : window.location.pathname.replace(/^\//, "");
      try {
        const stored = sessionStorage.getItem("portfolio-visited-nodes");
        if (stored) {
          const storedNodes: string[] = JSON.parse(stored);
          setVisitedNodes(Array.from(new Set([...storedNodes, currentPage])));
        } else {
          setVisitedNodes(Array.from(new Set(["home", currentPage])));
        }
      } catch {
        setVisitedNodes(Array.from(new Set(["home", currentPage])));
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Update session storage when visitedNodes change
  useEffect(() => {
    if (visitedNodes.length > 1 || (visitedNodes.length === 1 && visitedNodes[0] !== "home")) {
      sessionStorage.setItem("portfolio-visited-nodes", JSON.stringify(visitedNodes));
    }
  }, [visitedNodes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const el = containerRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((prev) => Math.min(Math.max(prev - e.deltaY * 0.002, 0.4), 2.5));
    };
    if (el) el.addEventListener("wheel", handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener("wheel", handleWheel); };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const setFitZoom = () => {
      const el = containerRef.current;
      if (!el || window.innerWidth < 768) return;

      const fitScale = Math.min(
        (el.clientWidth - 48) / GRAPH_WIDTH,
        (el.clientHeight - 48) / GRAPH_HEIGHT
      );

      setZoom(Math.min(Math.max(fitScale, 0.4), 1));
    };

    setFitZoom();
    window.addEventListener("resize", setFitZoom);
    return () => window.removeEventListener("resize", setFitZoom);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNodeClick = (id: string) => {
    if (!visitedNodes.includes(id)) {
      setVisitedNodes((prev) => [...prev, id]);
    }
    const route = id === "home" ? "/" : `/${id}`;
    router.push(route);
    onClose();
  };

  const progress = Math.round((visitedNodes.length / nodes.length) * 100);

  return (
    <motion.div
      drag 
      dragControls={windowDragControls} 
      dragListener={false} 
      dragMomentum={false}
      dragConstraints={{ top: -200, bottom: 200, left: -400, right: 400 }}
      initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      style={{ resize: "both" }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 w-[94vw] md:w-[84vw] max-w-6xl h-[82vh] md:h-[78vh] max-h-225 min-w-[320px] min-h-105 bg-[#0a0a0a] border border-zinc-800 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-white"
    >
      <div onPointerDown={(e) => windowDragControls.start(e)} className="flex items-center justify-between px-5 py-3.5 bg-[#121212] border-b border-zinc-800 cursor-grab active:cursor-grabbing shrink-0 z-50">
        <div className="flex items-center gap-4 md:gap-5">
          <div className="flex gap-2">
            <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:brightness-125 transition-all flex items-center justify-center group">
              <span className="opacity-0 group-hover:opacity-100 text-[#8b1a10] text-[9px] leading-none font-bold">×</span>
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-300 uppercase tracking-widest">SYSTEM.MAP</span>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">PORTFOLIO.EXPLORER • {progress}% DISCOVERED</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 relative overflow-hidden bg-[#0a0a0a]" ref={containerRef}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px", backgroundPosition: "center" }} />
        <div className="absolute bottom-5 right-5 z-50 flex gap-1 bg-[#121212]/90 backdrop-blur-md border border-zinc-800 p-1 rounded-lg shadow-xl">
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.4))} className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors">-</button>
          <div className="w-12 flex items-center justify-center text-xs font-mono text-zinc-300">{Math.round(zoom * 100)}%</div>
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))} className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors">+</button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden cursor-move">
          <motion.div drag dragConstraints={containerRef} className="relative origin-center w-300 h-200 shrink-0 cursor-grab active:cursor-grabbing" style={{ scale: zoom }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <line x1="350" y1="40" x2="350" y2="760" className="stroke-zinc-800/70 stroke-[1px]" strokeDasharray="2 6" />
              <line x1="650" y1="40" x2="650" y2="760" className="stroke-zinc-800/60 stroke-[1px]" strokeDasharray="2 6" />
              <line x1="800" y1="40" x2="800" y2="760" className="stroke-zinc-800/50 stroke-[1px]" strokeDasharray="2 6" />
            {edges.map((edge) => {
              const source = nodes.find((n) => n.id === edge.source);
              const target = nodes.find((n) => n.id === edge.target);
              if (!source || !target) return null;
              const isVisited = visitedNodes.includes(edge.target);
              const strokeWidth = edge.depth === 1 ? 2 : edge.depth === 2 ? 1.7 : 1.5;
              const visitedStroke = edge.depth === 1 ? "#f4f4f5" : edge.depth === 2 ? "#d4d4d8" : "#a1a1aa";
              const unvisitedStroke = edge.depth === 1 ? "#52525b" : edge.depth === 2 ? "#3f3f46" : "#2a2a30";

              return (
                <path
                  key={`${edge.source}-${edge.target}`}
                  d={generateOrthogonalPath(edge.source, edge.target, source, target)}
                  fill="none"
                  className="transition-all duration-700"
                  style={{
                    stroke: isVisited ? visitedStroke : unvisitedStroke,
                    strokeWidth,
                    strokeDasharray: isVisited ? undefined : edge.depth === 3 ? "3 5" : "4 5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  }}
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const isVisited = visitedNodes.includes(node.id);
            const isActive = activeNode === node.id; 
            const Icon = node.icon;

            return (
              <div key={node.id} style={{ left: node.x, top: node.y }} className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center group cursor-pointer" onPointerDown={(e) => e.stopPropagation()} onClick={() => handleNodeClick(node.id)}>
                <div className="relative flex items-center justify-center">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`w-16 h-16 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 relative z-10 bg-[#0a0a0a] ${isActive ? "border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.4)]" : isVisited ? "border-zinc-400 text-zinc-300" : "border-zinc-700 text-zinc-500 border-dashed"}`}>
                    <Icon size={28} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>
                </div>
                <div className="absolute left-20 bg-[#0a0a0a] px-3 py-1 rounded-md border border-[#0a0a0a]">
                  <span className={`text-lg font-medium tracking-wide transition-colors duration-300 ${isActive ? "text-white" : isVisited ? "text-zinc-300" : "text-zinc-500"}`}>
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
        </div>
      </div>

      <div className="flex md:hidden flex-1 flex-col p-6 overflow-y-auto bg-[#0a0a0a]">
        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto mt-4">
          <MobileNode id="home" label="Portfolio" icon={Home} isVisited={visitedNodes.includes("home")} isActive={activeNode === "home"} onNodeClick={handleNodeClick} />
          <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-700/80 border-dashed">
            <MobileNode id="about" label="About" icon={User} isVisited={visitedNodes.includes("about")} isActive={activeNode === "about"} onNodeClick={handleNodeClick} />
            <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-600/80 border-dashed">
               <MobileNode id="blog" label="Blog" icon={PenTool} isVisited={visitedNodes.includes("blog")} isActive={activeNode === "blog"} onNodeClick={handleNodeClick} />
               <MobileNode id="resume" label="Resume" icon={FileText} isVisited={visitedNodes.includes("resume")} isActive={activeNode === "resume"} onNodeClick={handleNodeClick} />
            </div>
            <MobileNode id="skills" label="Skills" icon={Wrench} isVisited={visitedNodes.includes("skills")} isActive={activeNode === "skills"} onNodeClick={handleNodeClick} />
            <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-600/80 border-dashed">
               <MobileNode id="projects" label="Projects" icon={FolderGit2} isVisited={visitedNodes.includes("projects")} isActive={activeNode === "projects"} onNodeClick={handleNodeClick} />
               <MobileNode id="certifications" label="Certifications" icon={Award} isVisited={visitedNodes.includes("certifications")} isActive={activeNode === "certifications"} onNodeClick={handleNodeClick} />
            </div>
            <MobileNode id="experience" label="Experience" icon={Briefcase} isVisited={visitedNodes.includes("experience")} isActive={activeNode === "experience"} onNodeClick={handleNodeClick} />
            <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-600/80 border-dashed">
              <MobileNode id="contact" label="Contact" icon={MessageCircle} isVisited={visitedNodes.includes("contact")} isActive={activeNode === "contact"} onNodeClick={handleNodeClick} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}