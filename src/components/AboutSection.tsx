"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Cpu, Database, Award, Code, Globe, Zap } from "lucide-react";

// ==========================================
// 1. THE "NOTHING" DOT-MATRIX FONT SYSTEM
// ==========================================
const dotAlphabet: Record<string, string[]> = {
  M: ["10001", "11011", "10101", "10001", "10001"],
  Y: ["10001", "01010", "00100", "00100", "00100"],
  S: ["01111", "10000", "01110", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100"],
  O: ["01110", "10001", "10001", "10001", "01110"],
  R: ["11110", "10001", "11110", "10100", "10011"],
  " ": ["000", "000", "000", "000", "000"],
};

const DotMatrixWord = ({ text }: { text: string }) => {
  let globalDotIndex = 0; // Used for deterministic staggering

  return (
    <div className="flex gap-2 md:gap-4 mb-8">
      {text.split("").map((char, charIdx) => {
        const grid = dotAlphabet[char];
        if (!grid) return null;

        return (
          <div key={charIdx} className="flex flex-col gap-0.75 md:gap-1">
            {grid.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-0.75 md:gap-1">
                {row.split("").map((bit, colIdx) => {
                  const isDot = bit === "1";
                  globalDotIndex++;

                  // Deterministic "random" starting positions based on index (prevents React hydration errors)
                  const startX = Math.sin(globalDotIndex * 0.5) * 800;
                  const startY = Math.cos(globalDotIndex * 0.5) * 800;

                  return (
                    <div key={colIdx} className="w-1 h-1 md:w-1.5 md:h-1.5">
                      {isDot && (
                        <motion.div
                          initial={{ x: startX, y: startY, opacity: 0, scale: 0 }}
                          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          transition={{
                            duration: 1.5,
                            type: "spring",
                            bounce: 0.3,
                            delay: (globalDotIndex % 30) * 0.03, // Stagger effect
                          }}
                          className="w-full h-full rounded-full bg-red-600 dark:bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};


// ==========================================
// 2. DATA
// ==========================================
const timelineData = [
  {
    id: 1,
    type: "work",
    date: "Jan 2025 - Apr 2025",
    title: "Full Stack Intern",
    organization: "Purple Techno Solutions",
    icon: Database,
    special: "Engineered scalable MERN stack web applications and built Python-based predictive analytics modules (Pandas, Scikit-learn) to generate actionable client insights. Streamlined deployment with AWS CI/CD workflows.",
  },
  {
    id: 2,
    type: "work",
    date: "Aug 2024 - Aug 2025",
    title: "R&D Intern",
    organization: "TechtoGreen Drone & Robotics",
    icon: Cpu,
    special: "Designed an Intelligent Safety Helmet using Raspberry Pi and IoT architecture, integrating 360° cameras and multi-sensor data fusion. Successfully reduced incident response latency by 90%. Optimized GPS navigation for Autonomous Multi-Spraying Drones.",
  },
  {
    id: 3,
    type: "edu",
    date: "2023 - 2027",
    title: "B.Tech Computer Science",
    organization: "Vellore Institute of Technology",
    icon: GraduationCap,
    special: "Core focus on Data Structures, Algorithms, Full-Stack Web Development, and AI/ML integrations.",
  }
];

const funFacts = [
  { icon: Globe, title: "Global Nominee", desc: "NASA Space Apps Challenge 2024 Global Nominee." },
  { icon: Code, title: "Algorithm Grinder", desc: "Solved 300+ DSA problems across all major coding platforms." },
  { icon: Zap, title: "Hardware Hacker", desc: "I design custom PCBs (like my SafeFit wearable) alongside writing cloud backends." },
  { icon: Award, title: "Hackathon Winner", desc: "Secured 1st place at HackAP 2024 & AppFusion 2024." }
];

export default function AboutSection() {
  return (
    // Outer scroll container
    <div className="absolute inset-4 md:inset-8 z-10 overflow-y-auto no-scrollbar pt-28 md:pt-32 pb-20 px-2 sm:px-4 md:px-8">
      
      <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-20">
        
        {/* --- READABILITY WRAPPER --- */}
        {/* This glass container sits OVER the background dots, completely fixing the readability issue */}
        <div className="relative p-6 sm:p-8 md:p-12 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-2xl rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
          
          {/* SECTION 1: MY STORY */}
          <section className="mb-16">
            <h2 className="text-sm font-mono tracking-[0.3em] text-red-600 mb-6 uppercase">
              {"// sys.About_User"}
            </h2>

            {/* THE ANIMATED "NOTHING" DOT TEXT */}
            <DotMatrixWord text="MY STORY" />

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-6 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed"
            >
              <p>
                I am a Computer Science undergraduate at VIT-AP, deeply passionate about bridging the gap between physical hardware and scalable cloud infrastructure. My journey didn't start with just writing code—it started with building systems.
              </p>
              <p>
                Whether it is designing an Intelligent Safety Helmet that processes real-time telemetry, mapping out custom PCBs for health wearables, or engineering robust MERN stack platforms like my "Second Brain" knowledge system, I thrive on solving complex operational challenges.
              </p>
              <p>
                I don't just build software; I build <span className="text-zinc-900 dark:text-zinc-200 font-medium border-b border-red-600/50">ecosystems</span>. From writing low-level C++ for Raspberry Pi to deploying predictive analytics modules using Python and AWS, I love controlling the entire pipeline of a product.
              </p>
            </motion.div>
          </section>

          {/* SECTION 2: TIMELINE */}
          <section className="mb-20">
            <motion.h2 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-sm font-mono tracking-[0.3em] text-red-600 mb-8 uppercase"
            >
              {"// sys.Execution_Log"}
            </motion.h2>

            <div className="relative">
              {/* Trunk Line */}
              <div className="absolute left-5.75 md:left-7.75 top-2 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 z-0" />

              <div className="flex flex-col gap-10 md:gap-14">
                {timelineData.map((node, index) => {
                  const Icon = node.icon;
                  return (
                    <motion.div 
                      key={node.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative flex items-start gap-6 md:gap-8 group"
                    >
                      {/* Node Circle */}
                      <div className="relative z-10 flex flex-col items-center shrink-0">
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 bg-white dark:bg-[#0a0a0a] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] ${
                          node.type === "work" ? "border-red-600 text-red-600" : "border-zinc-400 dark:border-zinc-600 text-zinc-500"
                        }`}>
                          <Icon size={20} className="md:w-6 md:h-6" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1 md:pt-2">
                        <div className="flex flex-col xl:flex-row xl:items-center gap-2 mb-2">
                          <h4 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white font-mono tracking-tight">
                            {node.title}
                          </h4>
                          <span className="inline-block self-start xl:self-auto px-2 py-1 bg-red-600/10 border border-red-600/20 text-red-600 text-[10px] md:text-xs font-mono tracking-widest uppercase rounded">
                            {node.date}
                          </span>
                        </div>
                        <h5 className="text-xs md:text-sm font-medium text-zinc-500 mb-3 uppercase tracking-wider">
                          {node.organization}
                        </h5>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed border-l-[1.5px] border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                          {node.special}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 3: FUN FACTS */}
          <section>
            <motion.h2 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-sm font-mono tracking-[0.3em] text-red-600 mb-8 uppercase"
            >
              {"// sys.Hidden_Variables"}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {funFacts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02 }}
                    className="p-5 md:p-6 bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-red-600/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 group-hover:border-red-600/50 transition-colors">
                      <Icon size={18} className="text-zinc-500 group-hover:text-red-500 transition-colors" />
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white font-mono mb-2">{fact.title}</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{fact.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}