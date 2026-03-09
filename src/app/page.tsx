"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Teko } from "next/font/google";
import Preloader from "@/components/Preloader";
import NavWindow from "@/components/NavWindow";
import { ArrowRight, Github, Linkedin, Mail, Network } from "lucide-react";

const displayFont = Teko({ 
  subsets: ["latin"], 
  weight: ["500", "700"] 
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.4 } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
  };

  const firstName = "REVANTH".split("");
  const lastName = "MODALAVALASA".split("");

  return (
    // Changed to 100dvh to prevent layout jumping on mobile when URL bar appears
    <main className={`relative min-h-[100dvh] w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 ${isLoading ? 'h-[100dvh] overflow-hidden' : ''}`}>
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#9ca3af_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#52525b_1.5px,transparent_1.5px)] [background-size:24px_24px]"
            style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
          />

          {/* THE SNIPER FRAME */}
          <div className="absolute inset-4 md:inset-8 border border-zinc-200 dark:border-zinc-800/80 z-20 pointer-events-none">
            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-red-600" />
            <div className="absolute -top-[1px] -right-[1px] w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-red-600" />
            <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-red-600" />
            <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-red-600" />

            {/* Bottom Left Location */}
            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-8">
              <div className="font-mono text-[8px] md:text-[10px] text-zinc-500 tracking-[0.3em] uppercase">
                {">"} Hyderabad, India
              </div>
            </div>

            {/* TOP BAR */}
            <div className="absolute top-4 md:top-6 left-4 right-4 md:left-6 md:right-6 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="font-mono text-xl md:text-2xl font-bold text-red-600 tracking-tighter">MR</div>
                <div className="hidden sm:flex items-center gap-2">
                  {[
                    { icon: <Github size={16} />, href: "https://github.com/revanthm1902" },
                    { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/modalavalasa-revanth/" },
                    { icon: <Mail size={16} />, href: "mailto:revanthm051@gmail.com" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href} target="_blank" rel="noreferrer"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      className="p-2 flex items-center justify-center rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-zinc-500 hover:text-red-600 transition-all"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNavOpen(true)}
                className="group flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 dark:bg-zinc-900/40 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 shadow-xl hover:border-red-600/50 transition-all"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </div>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 group-hover:text-red-500">
                  System.Map
                </span>
                <Network size={14} className="hidden md:block text-zinc-400 group-hover:text-red-500" />
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isNavOpen && <NavWindow isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />}
          </AnimatePresence>

          {/* MAIN CONTENT HERO */}
          <div className="relative z-10 w-full max-w-5xl px-6 sm:px-10 md:px-16 flex flex-col items-start justify-center mt-12 md:mt-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 md:mb-6 font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-500 uppercase"
            >
              Full-Stack Developer // AI Solutions
            </motion.div>

            {/* HIGHLY SCALED TYPOGRAPHY TO FIX MOBILE BLEED */}
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`${displayFont.className} text-5xl min-[400px]:text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tight text-zinc-900 dark:text-zinc-50 [perspective:1000px] flex flex-col`}
            >
              <span className="flex overflow-hidden">
                {firstName.map((letter, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">{letter}</motion.span>
                ))}
              </span>
              <span className="flex overflow-hidden text-red-600 dark:text-red-500 mt-1 md:mt-0">
                {lastName.map((letter, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">{letter}</motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl font-light leading-relaxed"
            >
              Crafting <span className="font-medium text-red-600 dark:text-red-500">digital experiences</span> that bridge the gap between complex backend logic and seamless user interfaces.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6 w-full sm:w-auto"
            >
              <button className="group flex justify-center items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-red-600 text-white font-medium rounded-none hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 w-full sm:w-auto">
                View Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex justify-center px-6 py-3 md:px-8 md:py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all w-full sm:w-auto">
                Resume
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </main>
  );
}