"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Teko } from "next/font/google";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import AppFrame from "@/components/AppFrame";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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
  const scrollY = useMotionValue(0);

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 700], ["0%", "-15%"]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 0.92]);

  // Grid portal transition transforms
  const gridOpacity = useTransform(scrollY, [300, 600, 900, 1100], [0, 1, 1, 0]);
  const gridScale = useTransform(scrollY, [300, 700, 1100], [0.5, 1.2, 3]);
  const gridRotateX = useTransform(scrollY, [300, 700, 1100], [60, 20, -10]);
  const gridZ = useTransform(scrollY, [300, 700, 1100], [-400, 0, 600]);

  return (
    <AppFrame>
      <div
        onScroll={(e) => scrollY.set(e.currentTarget.scrollTop)}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar"
      >
        {/* ─── HERO SECTION ─── */}
        <section className="relative min-h-dvh flex items-center">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            className="relative z-10 w-full px-6 sm:px-10 md:px-16 pt-24 md:pt-0"
          >
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 md:mb-6 font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-500 uppercase"
              >
                Full-Stack Developer // Product Designer
              </motion.div>
            </div>

            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`${displayFont.className} max-w-[95vw] mx-auto text-5xl min-[400px]:text-6xl sm:text-7xl md:text-8xl lg:text-[min(10rem,10vw)] font-bold leading-[0.85] tracking-tight text-zinc-900 dark:text-zinc-50 flex flex-col`}
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

            <div className="max-w-5xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl font-light leading-relaxed"
              >
              Crafting{" "}
              <span className="font-medium text-red-600 dark:text-red-500">
                digital experiences
              </span>{" "}
              that bridge the gap between complex backend logic and seamless user
              interfaces.
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
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/resume"
                className="flex justify-center px-6 py-3 md:px-8 md:py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all w-full sm:w-auto"
              >
                Resume
              </Link>
            </motion.div>
            </div>
          </motion.div>

          {/* Scroll-down indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          >
            <span className="font-mono text-[8px] tracking-[0.3em] text-zinc-400 uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown size={16} className="text-zinc-400" />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── GRID PORTAL TRANSITION ─── */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
          <motion.div
            style={{
              opacity: gridOpacity,
              scale: gridScale,
              rotateX: gridRotateX,
              z: gridZ,
            }}
            className="absolute inset-0 grid grid-cols-6 md:grid-cols-8 grid-rows-6 md:grid-rows-8 gap-px"
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-red-600/20 dark:border-red-500/15 bg-red-600/2 dark:bg-red-500/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.03 + Math.floor(i / 8) * 0.05 }}
              />
            ))}
          </motion.div>
          {/* Center portal accent */}
          <motion.div
            style={{ opacity: gridOpacity }}
            className="relative z-10 text-center pointer-events-none"
          >
            <p className="font-(family-name:--font-ndot) text-4xl md:text-6xl text-red-600/30 dark:text-red-500/20 tracking-wider">
              /
            </p>
          </motion.div>
        </section>

        {/* ─── CONTACT SECTION ─── */}
        <section className="relative py-16 md:py-24">
          <ContactSection />
        </section>

        {/* ─── FOOTER ─── */}
        <Footer />
      </div>
    </AppFrame>
  );
}