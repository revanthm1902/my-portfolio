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
  // Manually track scroll of the inner overflow div — avoids framer-motion
  // "container ref not hydrated" error that occurs inside AppFrame's conditional render.
  const scrollY = useMotionValue(0);

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 700], ["0%", "-15%"]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 0.92]);

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
            className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-0"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 md:mb-6 font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-500 uppercase"
            >
              Full-Stack Developer // Product Designer
            </motion.div>

            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`${displayFont.className} text-5xl min-[400px]:text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tight text-zinc-900 dark:text-zinc-50 flex flex-col`}
              style={{ perspective: "1000px" }}
            >
              <span className="flex overflow-hidden">
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
              <span className="flex overflow-hidden text-red-600 dark:text-red-500 mt-1 md:mt-0">
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

        {/* ─── Decorative divider ─── */}
        <div className="relative py-6 md:py-10 flex items-center justify-center">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-20 md:w-28 h-px bg-red-600 origin-center"
          />
        </div>

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