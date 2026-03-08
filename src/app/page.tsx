"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    // The main wrapper. overflow-hidden prevents scrolling while loading.
    <main className={`min-h-screen bg-zinc-50 dark:bg-zinc-950 ${isLoading ? 'overflow-hidden' : ''}`}>
      
      {/* AnimatePresence allows the preloader to animate out smoothly */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Your actual portfolio content goes here */}
      {!isLoading && (
        <div className="flex flex-col items-center justify-center h-screen animate-in fade-in duration-1000">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
            Welcome to the new build.
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            The Preloader just finished.
          </p>
        </div>
      )}
    </main>
  );
}