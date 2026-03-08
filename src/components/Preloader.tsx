"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hello",
  "నమస్కారం",
  "नमस्ते",    
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === greetings.length - 1) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-999 flex items-center justify-center bg-black text-white"
      initial={{ y: 0 }}
      exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-wide"
        >
          {greetings[index]}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
}