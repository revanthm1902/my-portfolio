"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GridTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress specifically within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Triggers as it enters and leaves the viewport
  });

  // Calculate grid layout
  const columns = 6;
  const rows = 4;
  const totalBlocks = columns * rows;

  return (
    // This container is tall to give the user room to scroll and scrub the animation
    <div ref={containerRef} className="relative h-[150vh] w-full bg-zinc-50 dark:bg-zinc-950">
      
      {/* Sticky container keeps the grid locked in the viewport while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* The Grid */}
        <div className="grid grid-cols-6 gap-2 w-[110vw] h-[110vh] p-4">
          {Array.from({ length: totalBlocks }).map((_, i) => {
            // Calculate a staggered delay based on the index
            // Blocks closer to the center animate slightly differently
            const column = i % columns;
            const row = Math.floor(i / columns);
            const isCenter = column === 2 && row === 1; // Mimicking the red block from your screenshot

            // Tie the scale of each block to the scroll progress, with a slight stagger
            const startScroll = (i * 0.015);
            const endScroll = startScroll + 0.3;
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(
              scrollYProgress,
              [startScroll, endScroll],
              [1, 0] // Shrinks from 1 to 0 as you scroll
            );

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [startScroll, endScroll],
              [1, 0]
            );

            return (
              <motion.div
                key={i}
                style={{ scale, opacity }}
                className={`w-full h-full rounded-[2rem] ${
                  isCenter 
                    ? "bg-zinc-900 dark:bg-zinc-100 border-4 border-red-600 dark:border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.5)]" 
                    : "bg-zinc-200 dark:bg-zinc-800/80"
                } transform origin-center`}
              />
            );
          })}
        </div>
        
        {/* The Text that reveals underneath the grid */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -z-10"
        >
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white">
            SYSTEM <span className="text-red-600">ONLINE.</span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}