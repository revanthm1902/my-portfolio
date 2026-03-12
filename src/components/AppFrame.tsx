"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Github, Linkedin, Mail, Network } from "lucide-react";
import { useRouter } from "next/navigation";
import Preloader from "@/components/Preloader";
import NavWindow from "@/components/NavWindow";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("portfolio-preloader-shown")) {
      setIsLoading(false);
    }
  }, []);
  const router = useRouter();

  // Mouse tracking for background dot eraser
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);
  const smoothX = useSpring(cursorX, { damping: 30, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(cursorY, { damping: 30, stiffness: 200, mass: 0.5 });
  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, transparent 15%, black 60%)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div className="relative h-dvh w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            onComplete={() => {
              sessionStorage.setItem("portfolio-preloader-shown", "1");
              setIsLoading(false);
            }}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* 1. Background Grid */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#9ca3af_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#52525b_1.5px,transparent_1.5px)] bg-size-[24px_24px]"
            style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
          />

          {/* 2. The Fixed Sniper Frame */}
          <div className="absolute inset-4 md:inset-8 border border-zinc-200 dark:border-zinc-800/80 z-30 pointer-events-none">
            <div className="absolute -top-px -left-px w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-red-600" />
            <div className="absolute -top-px -right-px w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-red-600" />
            <div className="absolute -bottom-px -left-px w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-red-600" />
            <div className="absolute -bottom-px -right-px w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-red-600" />
          </div>

          {/* Bottom Left Location — attached to bottom border */}
          <div className="absolute bottom-4 md:bottom-8 left-8 md:left-16 z-30 pointer-events-none -translate-y-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-white/30 dark:border-zinc-700/50 rounded-md shadow-lg">
              <span className="font-mono text-[8px] md:text-[10px] text-zinc-700 dark:text-zinc-400 tracking-[0.3em] uppercase">
                {"> "} Hyderabad, India
              </span>
            </div>
          </div>

          {/* Top Bar (Logo + Map Trigger) */}
          <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 z-40">
            <div className="flex items-center justify-between px-4 md:px-6 pt-4 md:pt-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div onClick={() => router.push("/")} className="font-mono text-xl md:text-2xl font-bold text-red-600 tracking-tighter cursor-pointer">MR</div>
                <div className="hidden sm:flex items-center gap-2">
                  {[
                    { icon: <Github size={16} />, href: "https://github.com/revanthm1902" },
                    { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/modalavalasa-revanth/" },
                    { icon: <Mail size={16} />, href: "mailto:revanthm051@gmail.com" }
                  ].map((social, idx) => (
                    <a key={idx} href={social.href} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-zinc-500 hover:text-red-600 transition-all">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <button onClick={() => setIsNavOpen(true)} className="group flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 dark:bg-zinc-900/40 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 shadow-xl hover:border-red-600/50 transition-all">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </div>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 group-hover:text-red-500">System.Map</span>
                <Network size={14} className="hidden md:block text-zinc-400 group-hover:text-red-500" />
              </button>
            </div>
          </div>

          {/* 3. The Nav Window */}
          <AnimatePresence>
            {isNavOpen && <NavWindow isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />}
          </AnimatePresence>

          {/* 4. THE ACTUAL PAGE CONTENT — clipped inside frame */}
          <motion.div
            key="page-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-4 md:inset-8 z-10 overflow-hidden"
          >
            {children}
          </motion.div>
        </>
      )}
    </div>
  );
}