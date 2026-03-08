"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hello",
  "నమస్కారం", // Telugu
  "नमस्ते",     // Hindi
  "Bonjour"   // French
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // If we've reached the last greeting, wait a second and trigger the completion
    if (index === greetings.length - 1) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }

    // Cycle to the next greeting every 800ms
    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-999 flex items-center justify-center bg-black text-white"
      // This slides the entire black screen up out of the way when it unmounts
      initial={{ y: 0 }}
      exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          // The aesthetic text animation: slight slide up and fade in/out
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          // Tailwind classes handling perfect responsiveness for the text
          className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-wide"
        >
          {greetings[index]}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
}