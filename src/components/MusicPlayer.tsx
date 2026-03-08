"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Disc } from "lucide-react";

// Just drop your single chill track into public/audio/
const track = { 
  title: "Hello World!", 
  artist: "Welcome to my Portfolio", 
  src: "/audio/song1.mp3" 
};

export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Attempt Autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Chill volume level
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser blocks autoplay, visually start muted
          setIsPlaying(false);
          setIsMuted(true);
        });
    }
  }, []);

  // Handle Mute/Unmute Toggle
  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If it was blocked initially, clicking acts as the interaction to play
      if (!isPlaying && !newMutedState) {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  return (
    <>
      {/* Notice the `loop` attribute added here */}
      <audio ref={audioRef} src={track.src} preload="auto" autoPlay loop />

      <motion.div
        layout
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={toggleMute} // Entire pill is clickable for better UX
        className="fixed bottom-6 right-6 z-50 flex items-center rounded-full bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/50 dark:border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
        style={{ padding: "6px" }}
      >
        {/* The Icon Container */}
        <motion.div
          layout
          className="relative flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-zinc-100 dark:bg-black/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        >
          {isMuted ? (
            <VolumeX size={18} className="text-zinc-500" />
          ) : (
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <Disc size={18} className="text-zinc-900 dark:text-zinc-100" />
            </motion.div>
          )}

          {/* Pulse ring when playing */}
          {!isMuted && !isExpanded && (
            <span className="absolute inset-0 rounded-full border border-zinc-400/30 animate-ping duration-1000" />
          )}
        </motion.div>

        {/* The Expanding Song Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: "auto", opacity: 1, marginLeft: 12 }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center pr-4 overflow-hidden whitespace-nowrap"
            >
              <div className="flex flex-col mr-4">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                  {track.title}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {track.artist}
                </span>
              </div>

              <div className="flex items-center border-l border-zinc-300 dark:border-zinc-700 pl-3">
                <div className="text-zinc-400">
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-emerald-500" />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}