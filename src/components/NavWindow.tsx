"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { Home, User, Wrench, PenTool, FileText, FolderGit2, Award } from "lucide-react";

// Tighter coordinates for the Desktop Map
const nodes = [
  { id: "home", label: "Portfolio", icon: Home, x: 150, y: 350 },
  { id: "about", label: "About", icon: User, x: 400, y: 200 },
  { id: "skills", label: "Skills", icon: Wrench, x: 400, y: 500 },
  { id: "blog", label: "Blog", icon: PenTool, x: 650, y: 120 },
  { id: "resume", label: "Resume", icon: FileText, x: 650, y: 280 },
  { id: "projects", label: "Projects", icon: FolderGit2, x: 650, y: 420 },
  { id: "certifications", label: "Certifications", icon: Award, x: 650, y: 580 },
];

const edges = [
  { source: "home", target: "about" },
  { source: "home", target: "skills" },
  { source: "about", target: "blog" },
  { source: "about", target: "resume" },
  { source: "skills", target: "projects" },
  { source: "skills", target: "certifications" },
];

const generateOrthogonalPath = (x1: number, y1: number, x2: number, y2: number) => {
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
};

export default function NavWindow({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeNode, setActiveNode] = useState("home");
  const [visitedNodes, setVisitedNodes] = useState<string[]>(["home"]);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowDragControls = useDragControls();

  if (!isOpen) return null;

  const handleNodeClick = (id: string) => {
    setActiveNode(id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes((prev) => [...prev, id]);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const el = containerRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); 
      setZoom((prev) => Math.min(Math.max(prev - e.deltaY * 0.002, 0.4), 2.5));
    };
    if (el) el.addEventListener("wheel", handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener("wheel", handleWheel); };
  }, [isOpen]);

  const progress = Math.round((visitedNodes.length / nodes.length) * 100);

  // --- Helper Component for the Mobile Directory Tree ---
  const MobileNode = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => {
    const isVisited = visitedNodes.includes(id);
    const isActive = activeNode === id;
    return (
      <div onClick={() => handleNodeClick(id)} className="relative flex items-center gap-4 cursor-pointer group">
        {/* The horizontal branch line connecting the trunk to the node */}
        {id !== "home" && <div className="absolute left-[-24px] w-[24px] h-[1.5px] bg-zinc-800 -z-10 transition-colors duration-500" style={{ backgroundColor: isVisited ? '#71717a' : '#27272a' }} />}
        
        <div className={`w-10 h-10 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 bg-[#0a0a0a] ${isActive ? "border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : isVisited ? "border-zinc-400 text-zinc-300" : "border-zinc-800 text-zinc-600 border-dashed"}`}>
          <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isActive ? "text-white" : isVisited ? "text-zinc-300" : "text-zinc-600"}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      drag dragControls={windowDragControls} dragListener={false} dragMomentum={false}
      initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      style={{ resize: "both" }}
      // STRICT DARK MODE CLASSES
      className="fixed top-[10vh] left-[5vw] md:top-[12vh] md:left-[10vw] z-[100] w-[90vw] md:w-[80vw] max-w-5xl h-[80vh] md:h-[75vh] max-h-[800px] min-w-[320px] min-h-[400px] bg-[#0a0a0a] border border-zinc-800 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-white"
    >
      {/* MAC TITLE BAR */}
      <div onPointerDown={(e) => windowDragControls.start(e)} className="flex items-center justify-between px-5 py-3.5 bg-[#121212] border-b border-zinc-800 cursor-grab active:cursor-grabbing shrink-0 z-50">
        <div className="flex items-center gap-4 md:gap-5">
          <div className="flex gap-2">
            {/* The Red button is now the ONLY close button */}
            <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:brightness-125 transition-all flex items-center justify-center group">
              <span className="opacity-0 group-hover:opacity-100 text-[#8b1a10] text-[9px] leading-none font-bold">×</span>
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-300 uppercase tracking-widest">SITE.MAP</span>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">PORTFOLIO.EXPLORER • {progress}% DISCOVERED</span>
          </div>
        </div>
        {/* REMOVED THE EXTRA 'X' BUTTON FROM HERE */}
      </div>

      {/* DESKTOP CANVAS */}
      <div className="hidden md:flex flex-1 relative overflow-hidden bg-[#0a0a0a]" ref={containerRef}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px", backgroundPosition: "center" }} />
        <div className="absolute bottom-5 right-5 z-50 flex gap-1 bg-[#121212]/90 backdrop-blur-md border border-zinc-800 p-1 rounded-lg shadow-xl">
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.4))} className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors">-</button>
          <div className="w-12 flex items-center justify-center text-xs font-mono text-zinc-400">{Math.round(zoom * 100)}%</div>
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))} className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors">+</button>
        </div>

        <motion.div drag className="absolute origin-center w-[1000px] h-[700px] cursor-grab active:cursor-grabbing left-0 top-0" style={{ scale: zoom }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {edges.map((edge) => {
              const source = nodes.find((n) => n.id === edge.source);
              const target = nodes.find((n) => n.id === edge.target);
              if (!source || !target) return null;
              const isVisited = visitedNodes.includes(edge.target);

              return (
                <path
                  key={`${edge.source}-${edge.target}`}
                  d={generateOrthogonalPath(source.x, source.y, target.x, target.y)}
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
                {/* STRICT BACKGROUND MASKING TO HIDE THE LINE BEHIND TEXT */}
                <div className="absolute left-[45px] bg-[#0a0a0a] px-2 py-0.5 rounded border border-[#0a0a0a]">
                  <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isActive ? "text-white" : isVisited ? "text-zinc-300" : "text-zinc-500"}`}>
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* =========================================
          MOBILE VIEW (Perfectly Nested Folder Tree)
          ========================================= */}
      <div className="flex md:hidden flex-1 flex-col p-6 overflow-y-auto bg-[#0a0a0a]">
        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto mt-4">
          
          <MobileNode id="home" label="Portfolio" icon={Home} />
          
          {/* First Level Children (About, Skills) */}
          <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-800 border-dashed">
            
            <MobileNode id="about" label="About" icon={User} />
            {/* Second Level Children (Blog, Resume) */}
            <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-800 border-dashed">
               <MobileNode id="blog" label="Blog" icon={PenTool} />
               <MobileNode id="resume" label="Resume" icon={FileText} />
            </div>

            <MobileNode id="skills" label="Skills" icon={Wrench} />
            {/* Second Level Children (Projects, Certifications) */}
            <div className="flex flex-col gap-6 pl-6 ml-5 border-l-[1.5px] border-zinc-800 border-dashed">
               <MobileNode id="projects" label="Projects" icon={FolderGit2} />
               <MobileNode id="certifications" label="Certifications" icon={Award} />
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}