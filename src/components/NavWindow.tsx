"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { Home, User, Wrench, PenTool, FileText, FolderGit2, Award } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

// --- EXACT BRACKET COORDINATES ---
const nodes = [
  { id: "home", label: "Portfolio", icon: Home, x: 200, y: 350 },
  { id: "about", label: "About", icon: User, x: 500, y: 200 },
  { id: "skills", label: "Skills", icon: Wrench, x: 500, y: 500 },
  { id: "blog", label: "Blog", icon: PenTool, x: 800, y: 100 },
  { id: "resume", label: "Resume", icon: FileText, x: 800, y: 300 },
  { id: "projects", label: "Projects", icon: FolderGit2, x: 800, y: 400 },
  { id: "certifications", label: "Certifications", icon: Award, x: 800, y: 600 },
];

const edges = [
  { source: "home", target: "about" },
  { source: "home", target: "skills" },
  { source: "about", target: "blog" },
  { source: "about", target: "resume" },
  { source: "skills", target: "projects" },
  { source: "skills", target: "certifications" },
];

// --- Connects Right Edge to Left Edge ---
const generateOrthogonalPath = (source: { x: number; y: number }, target: { x: number; y: number }) => {
  const startX = source.x + 20; // 20px offset to start at the edge of the 40px circle
  const startY = source.y;
  const endX = target.x - 20;   // 20px offset to end at the edge of the target circle
  const endY = target.y;
  const midX = (startX + endX) / 2;
  
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
      <div className={`w-10 h-10 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 bg-[#0a0a0a] ${isActive ? "border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : isVisited ? "border-zinc-400 text-zinc-300" : "border-zinc-800 text-zinc-600 border-dashed"}`}>
        <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
      </div>
      <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isActive ? "text-white" : isVisited ? "text-zinc-300" : "text-zinc-600"}`}>
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
  const [visitedNodes, setVisitedNodes] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["home"];
    const currentPage =
      window.location.pathname === "/" ? "home" : window.location.pathname.replace(/^\//, "");
    try {
      const stored = localStorage.getItem("portfolio-visited-nodes");
      const storedNodes: string[] = stored ? JSON.parse(stored) : ["home"];
      return Array.from(new Set([...storedNodes, currentPage]));
    } catch {
      return Array.from(new Set(["home", currentPage]));
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const windowDragControls = useDragControls();

  const router = useRouter();
  const pathname = usePathname();

  const activeNode = pathname === "/" ? "home" : pathname.replace(/^\//, "");

  useEffect(() => {
    localStorage.setItem("portfolio-visited-nodes", JSON.stringify(visitedNodes));
  }, [visitedNodes]);

  useEffect(() => {
    const el = containerRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((prev) => Math.min(Math.max(prev - e.deltaY * 0.002, 0.4), 2.5));
    };
    if (el) el.addEventListener("wheel", handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener("wheel", handleWheel); };
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
      drag dragControls={windowDragControls} dragListener={false} dragMomentum={false}
      initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      style={{ resize: "both" }}
      className="fixed top-[10vh] left-[5vw] md:top-[12vh] md:left-[10vw] z-100 w-[90vw] md:w-[80vw] max-w-5xl h-[80vh] md:h-[75vh] max-h-200 min-w-80 min-h-100 bg-[#0a0a0a] border border-zinc-800 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-white"
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

        <motion.div drag className="absolute origin-center w-250 h-175 cursor-grab active:cursor-grabbing left-0 top-0" style={{ scale: zoom }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {edges.map((edge) => {
              const source = nodes.find((n) => n.id === edge.source);
              const target = nodes.find((n) => n.id === edge.target);
              if (!source || !target) return null;
              const isVisited = visitedNodes.includes(edge.target);

              return (
                <path
                  key={`${edge.source}-${edge.target}`}
                  // Uses the new Edge-to-Edge math
                  d={generateOrthogonalPath(source, target)}
                  fill="none"
                  className={`transition-all duration-700 ${isVisited ? "stroke-zinc-300 stroke-[1.5px]" : "stroke-zinc-700 stroke-[1.5px] stroke-dasharray-[4,4]"}`}
                  style={!isVisited ? { strokeDasharray: "4 4" } : undefined}
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
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`w-10 h-10 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 relative z-10 bg-[#0a0a0a] ${isActive ? "border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.4)]" : isVisited ? "border-zinc-400 text-zinc-300" : "border-zinc-700 text-zinc-500 border-dashed"}`}>
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>
                </div>
                <div className="absolute left-11.25 bg-[#0a0a0a] px-2 py-0.5 rounded border border-[#0a0a0a]">
                  <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isActive ? "text-white" : isVisited ? "text-zinc-300" : "text-zinc-500"}`}>
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="flex md:hidden flex-1 flex-col p-6 overflow-y-auto bg-[#0a0a0a]">
        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto mt-4">
          <MobileNode id="home" label="Portfolio" icon={Home} isVisited={visitedNodes.includes("home")} isActive={activeNode === "home"} onNodeClick={handleNodeClick} />
          <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-800 border-dashed">
            <MobileNode id="about" label="About" icon={User} isVisited={visitedNodes.includes("about")} isActive={activeNode === "about"} onNodeClick={handleNodeClick} />
            <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-800 border-dashed">
               <MobileNode id="blog" label="Blog" icon={PenTool} isVisited={visitedNodes.includes("blog")} isActive={activeNode === "blog"} onNodeClick={handleNodeClick} />
               <MobileNode id="resume" label="Resume" icon={FileText} isVisited={visitedNodes.includes("resume")} isActive={activeNode === "resume"} onNodeClick={handleNodeClick} />
            </div>
            <MobileNode id="skills" label="Skills" icon={Wrench} isVisited={visitedNodes.includes("skills")} isActive={activeNode === "skills"} onNodeClick={handleNodeClick} />
            <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-800 border-dashed">
               <MobileNode id="projects" label="Projects" icon={FolderGit2} isVisited={visitedNodes.includes("projects")} isActive={activeNode === "projects"} onNodeClick={handleNodeClick} />
               <MobileNode id="certifications" label="Certifications" icon={Award} isVisited={visitedNodes.includes("certifications")} isActive={activeNode === "certifications"} onNodeClick={handleNodeClick} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}