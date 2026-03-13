"use client";

import { motion } from "framer-motion";
import { Teko } from "next/font/google";
import Link from "next/link";
import AppFrame from "@/components/AppFrame";
import SkillsCarousel from "@/components/SkillsCarousel";

const displayFont = Teko({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
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
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar pb-4 flex items-center justify-center">
        {/* ─── HERO SECTION ─── */}
        <section className="relative w-full">
          <motion.div
            className="relative z-10 w-full px-4 sm:px-8 md:px-12 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 md:mb-6 font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-500 uppercase"
            >
              Full-Stack Developer // Product Designer
            </motion.div>

            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`${displayFont.className} text-5xl min-[400px]:text-6xl sm:text-7xl md:text-8xl lg:text-[min(10rem,9.5vw)] font-bold leading-[0.85] tracking-tight text-zinc-900 dark:text-zinc-50 flex flex-col items-center`}
              style={{ perspective: "1000px" }}
            >
              <span className="flex">
                {firstName.map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="flex text-red-600 dark:text-red-500 mt-1 md:mt-0">
                {lastName.map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <SkillsCarousel />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed"
            >
              CS Undergrad with hands-on experience in{" "}
              <span className="font-medium text-red-600 dark:text-red-500">
                full-stack development
              </span>{", "}
              <span className="font-medium text-red-600 dark:text-red-500">
                industrial IoT systems
              </span>{", and "}
              <span className="font-medium text-red-600 dark:text-red-500">
                AI-powered applications
              </span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-8 md:mt-10 flex items-center justify-center"
            >
              <Link
                href="/resume"
                className="group relative inline-flex justify-center items-center px-10 py-4 md:px-12 md:py-4.5 overflow-hidden rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-red-500/50 md:border-white/25 dark:md:border-zinc-700/40 text-white md:text-zinc-900 dark:text-white font-semibold text-sm md:text-base tracking-wide shadow-[0_8px_40px_rgba(220,38,38,0.15)] md:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:md:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_8px_40px_rgba(220,38,38,0.15)]"
              >
                <span className="absolute inset-0 bg-linear-to-r from-red-600 to-red-500 translate-x-0 md:-translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out" />
                <span className="relative z-10 md:group-hover:text-white transition-colors duration-300">Resume</span>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </AppFrame>
  );
}