"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Teko } from "next/font/google";
import Preloader from "@/components/Preloader";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

// The "Japanese/Mecha" style display font for the name
const displayFont = Teko({ 
  subsets: ["latin"], 
  weight: ["500", "700"] 
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Mouse tracking for the dot grid eraser
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

  // Framer Motion variants for the letter stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.4 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  const firstName = "REVANTH".split("");
  const lastName = "MODALAVALASA".split("");

  return (
    <main className={`relative min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 ${isLoading ? 'overflow-hidden' : ''}`}>
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
        >
          {/* Background Dot Eraser */}
          <motion.div 
            className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#9ca3af_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#52525b_1.5px,transparent_1.5px)] [background-size:24px_24px]"
            style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
          />

          {/* THE FRAME (Sniper UI Borders) */}
          <div className="absolute inset-4 md:inset-8 border border-zinc-200 dark:border-zinc-800/80 z-20 pointer-events-none">
            {/* 4 Corner Crosshairs (Red Accents) */}
            <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-red-600 dark:border-red-500" />
            <div className="absolute -top-[1px] -right-[1px] w-6 h-6 border-t-2 border-r-2 border-red-600 dark:border-red-500" />
            <div className="absolute -bottom-[1px] -left-[1px] w-6 h-6 border-b-2 border-l-2 border-red-600 dark:border-red-500" />
            <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-red-600 dark:border-red-500" />

            {/* Top Left Initials */}
            <div className="absolute top-6 left-6 font-mono text-2xl font-bold text-red-600 dark:text-red-500 tracking-tighter">
              MR
            </div>

            {/* Top Right Location */}
            <div className="absolute top-8 right-6 font-mono text-xs md:text-sm text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">
              {">"} Hyderabad, India
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-5xl px-8 md:px-16 flex flex-col items-start justify-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase"
            >
              Full-Stack Developer // AI Solutions
            </motion.div>

            {/* The Animated "Japanese Style" Name */}
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`${displayFont.className} text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tight text-zinc-900 dark:text-zinc-50 [perspective:1000px] flex flex-col`}
            >
              <span className="flex overflow-hidden">
                {firstName.map((letter, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="flex overflow-hidden text-red-600 dark:text-red-500 mt-2 md:mt-0">
                {lastName.map((letter, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }} // Delays until name animation finishes
              className="mt-8 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-light leading-relaxed"
            >
              Crafting <span className="font-medium text-red-600 dark:text-red-500">digital experiences</span> that bridge the gap between complex backend logic and seamless user interfaces.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <button className="group flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-medium rounded-none hover:bg-red-700 transition-all shadow-lg shadow-red-500/20">
                View Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">
                Resume
              </button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </main>
  );
}