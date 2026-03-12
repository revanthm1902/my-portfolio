"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Cpu,
  Database,
  Award,
  Code,
  Globe,
  Zap,
} from "lucide-react";

// ──────────────────────────────────
// DATA
// ──────────────────────────────────

const timeline = [
  {
    id: 1,
    type: "work",
    date: "Jan 2025 – Apr 2025",
    title: "Full Stack Intern",
    org: "Purple Techno Solutions",
    location: "Remote / Hybrid",
    icon: Database,
    desc: "Engineered scalable MERN stack web applications and built Python-based predictive analytics modules (Pandas, Scikit-learn) to generate actionable client insights. Streamlined deployment with AWS CI/CD workflows.",
  },
  {
    id: 2,
    type: "work",
    date: "Aug 2024 – Aug 2025",
    title: "R&D Intern",
    org: "TechtoGreen Drone & Robotics",
    location: "Amaravati, India",
    icon: Cpu,
    desc: "Designed an Intelligent Safety Helmet using Raspberry Pi and IoT architecture, integrating 360° cameras and multi-sensor data fusion. Reduced incident response latency by 90%. Optimized GPS navigation for Autonomous Multi-Spraying Drones.",
  },
  {
    id: 3,
    type: "edu",
    date: "2023 – 2027",
    title: "B.Tech Computer Science",
    org: "Vellore Institute of Technology",
    location: "Andhra Pradesh, India",
    icon: GraduationCap,
    desc: "Core focus on Data Structures, Algorithms, Full-Stack Web Development, and AI/ML integrations.",
  },
];

const achievements = [
  { icon: Globe, title: "Global Nominee", desc: "NASA Space Apps Challenge 2024 Global Nominee." },
  { icon: Code, title: "300+ DSA Problems", desc: "Solved across LeetCode, CodeForces, and other platforms." },
  { icon: Zap, title: "Hardware Hacker", desc: "Designed custom PCBs (SafeFit wearable) alongside cloud backends." },
  { icon: Award, title: "Hackathon Winner", desc: "1st place at HackAP 2024 & AppFusion 2024, Runner-Up IEEE Hackasagon." },
];

// ──────────────────────────────────
// COMPONENT
// ──────────────────────────────────

export default function AboutSection() {
  return (
    <div className="relative z-10 min-h-dvh pt-20 md:pt-24 pb-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Glass wrapper */}
        <div className="relative p-5 sm:p-8 md:p-12 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">

          {/* ── SECTION 1: MY STORY ── */}
          <section className="mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-red-600 uppercase mb-3">
                {"// sys.About_User"}
              </p>
              <h2 className="font-(family-name:--font-ndot) text-4xl sm:text-5xl md:text-7xl text-zinc-900 dark:text-zinc-50 leading-tight mb-8">
                EXPERIENCE
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed"
            >
              <p>
                I am a Computer Science undergraduate at VIT-AP with hands-on experience in full-stack development, industrial IoT systems, and AI-powered applications. My approach to engineering is rooted in{" "}
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">
                  systems thinking
                </span>
                : building scalable products that integrate real-time data pipelines, cloud infrastructure, and intelligent automation to solve real-world operational challenges.
              </p>
              <p>
                With hands-on internship experience across full-stack
                development and R&amp;D engineering, I&apos;ve shipped MERN
                stack applications with predictive analytics at Purple Techno
                Solutions and built IoT-driven safety systems at TechtoGreen
                Drone &amp; Robotics that cut incident response latency by 90%.
              </p>
              <p>
                I work across the entire stack —{" "}
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">
                  Java, Python, TypeScript, React, Next.js, Node.js, Django,
                  AWS, and embedded C++
                </span>
                . Whether it&apos;s deploying serverless functions, designing
                custom PCBs for health wearables, or fine-tuning ML models, I
                focus on owning the complete pipeline from idea to production.
              </p>
              <p>
                Beyond engineering, I&apos;m an active competitive programmer
                with 300+ problems solved, a NASA Space Apps Challenge global
                nominee, and a multi-time hackathon winner (HackAP 2024,
                AppFusion 2024, IEEE Hacksagon 2025). I thrive under
                pressure, believe the best solutions come from understanding
                problems from{" "}
                <span className="text-zinc-900 dark:text-zinc-200 font-medium border-b border-red-600/50">
                  every angle
                </span>
                , and am always looking for my next challenge.
              </p>
            </motion.div>
          </section>

          {/* ── SECTION 3: TIMELINE ── */}
          <section className="mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-red-600 uppercase mb-3">
                {"// sys.Execution_Log"}
              </p>
              <h2 className="font-(family-name:--font-ndot) text-4xl sm:text-5xl md:text-7xl text-zinc-900 dark:text-zinc-50 leading-tight mb-8">
                EXPERIENCE
              </h2>
            </motion.div>

            <div className="relative">
              {/* Trunk line */}
              <div className="absolute left-4.75 md:left-6.75 top-2 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

              <div className="flex flex-col gap-10 md:gap-14">
                {timeline.map((node, index) => {
                  const Icon = node.icon;
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative flex items-start gap-5 md:gap-7 group"
                    >
                      {/* Node circle */}
                      <div className="relative z-10 shrink-0">
                        <div
                          className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-[1.5px] flex items-center justify-center transition-all bg-white dark:bg-[#0a0a0a] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.25)] ${
                            node.type === "work"
                              ? "border-red-600 text-red-600"
                              : "border-zinc-400 dark:border-zinc-600 text-zinc-500"
                          }`}
                        >
                          <Icon size={18} className="md:w-5 md:h-5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-0.5 md:pt-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-1.5">
                          <h4 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white font-mono tracking-tight">
                            {node.title}
                          </h4>
                          <span className="inline-block self-start px-2 py-0.5 bg-red-600/10 border border-red-600/20 text-red-600 text-[9px] md:text-[10px] font-mono tracking-widest uppercase">
                            {node.date}
                          </span>
                        </div>
                        <p className="text-[10px] md:text-xs font-medium text-zinc-500 mb-3 uppercase tracking-wider">
                          {node.org} — {node.location}
                        </p>
                        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-[1.5px] border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                          {node.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── SECTION 4: ACHIEVEMENTS ── */}
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-red-600 uppercase mb-3">
                {"// sys.Hidden_Variables"}
              </p>
              <h2 className="font-(family-name:--font-ndot) text-4xl sm:text-5xl md:text-7xl text-zinc-900 dark:text-zinc-50 leading-tight mb-8">
                ACHIEVEMENTS
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {achievements.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="group p-5 md:p-6 border border-zinc-200 dark:border-zinc-800 hover:border-red-600/40 transition-colors"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 group-hover:border-red-600/40 transition-colors mb-4">
                      <Icon
                        size={16}
                        className="text-zinc-500 group-hover:text-red-600 transition-colors"
                      />
                    </div>
                    <h4 className="text-sm md:text-base font-bold text-zinc-900 dark:text-white font-mono mb-2">
                      {fact.title}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {fact.desc}
                    </p>
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