"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);
  const [displayText, setDisplayText] = useState("");
  const fullText = "<rev.dev/>";

  useEffect(() => {
    // Skip the very first render (initial page load — Preloader handles that)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathname.current = pathname;
      return;
    }

    // Only trigger transition when pathname actually changes
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setIsTransitioning(true);
      setDisplayText("");

      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(interval);
          // Wait a bit after typing is done before dismissing
          setTimeout(() => setIsTransitioning(false), 200);
        }
      }, 35); // Fast typing (~350ms total)

      return () => clearInterval(interval);
    }
  }, [pathname]);

  return (
    <>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="route-transition"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          >
            <span className="font-mono text-2xl md:text-3xl text-white tracking-wide flex items-center">
              {displayText}
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-3 h-7 md:h-8 bg-white ml-2"
              />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
