"use client";

import { motion } from "framer-motion";
import { Teko } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AppFrame from "@/components/AppFrame";

const displayFont = Teko({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring" as const, damping: 12, stiffness: 200 },
  },
};

const firstName = "REVANTH".split("");
const lastName = "MODALAVALASA".split("");

export default function Home() {
  return (
    <AppFrame>
      <div className="relative z-10 w-full h-full max-w-5xl mx-auto px-6 sm:px-10 md:px-16 flex flex-col items-start justify-center pt-24 md:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 md:mb-6 font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-500 uppercase"
        >
          Full-Stack Developer // AI Solutions
        </motion.div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${displayFont.className} text-5xl min-[400px]:text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tight text-zinc-900 dark:text-zinc-50 perspective-[1000px] flex flex-col`}
        >
          <span className="flex overflow-hidden">
            {firstName.map((letter, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {letter}
              </motion.span>
            ))}
          </span>
          <span className="flex overflow-hidden text-red-600 dark:text-red-500 mt-1 md:mt-0">
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
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl font-light leading-relaxed"
        >
          Crafting{" "}
          <span className="font-medium text-red-600 dark:text-red-500">digital experiences</span>{" "}
          that bridge the gap between complex backend logic and seamless user interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6 w-full sm:w-auto"
        >
          <Link
            href="/projects"
            className="group flex justify-center items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-red-600 text-white font-medium rounded-none hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 w-full sm:w-auto"
          >
            View Work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/resume"
            className="flex justify-center px-6 py-3 md:px-8 md:py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all w-full sm:w-auto"
          >
            Resume
          </Link>
        </motion.div>
      </div>
    </AppFrame>
  );
}