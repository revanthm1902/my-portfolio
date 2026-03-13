"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hello",
  "నమస్కారం",
  "नमस्ते",    
];

export default function Preloader({ onComplete, isSecondary = false }: { onComplete: () => void, isSecondary?: boolean }) {
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const targetText = "<rev.dev/>";

  useEffect(() => {
    if (isSecondary) {
      if (typedText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setTypedText(targetText.slice(0, typedText.length + 1));
        }, 100); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          onComplete();
        }, 600); // Wait before fading out
        return () => clearTimeout(timeout);
      }
    } else {
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
    }
  }, [index, typedText, isSecondary, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-999 flex items-center justify-center bg-black text-white"
      initial={{ y: 0 }}
      exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <AnimatePresence mode="wait">
        {isSecondary ? (
          <motion.h1
            key="typewriter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-mono tracking-wide"
          >
            {typedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-4 h-8 md:w-6 md:h-12 bg-white ml-2 align-middle"
            />
          </motion.h1>
        ) : (
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
        )}
      </AnimatePresence>
    </motion.div>
  );
}