"use client";

import { motion } from "framer-motion";
import { ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import AppFrame from "@/components/AppFrame";

const FILE_ID = "1AzZ8LE9B6So3RJFd4YtSxmZcxtjTfiPp";
const EMBED_URL = `https://drive.google.com/file/d/${FILE_ID}/preview`;
const DRIVE_VIEW_URL = `https://drive.google.com/file/d/${FILE_ID}/view?usp=sharing`;
const DRIVE_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

export default function ResumePage() {
  return (
    <AppFrame>
      <div className="absolute inset-0 flex flex-col items-center">
        
        {/* 1. DYNAMIC TOP SPACER: Prevents collision with MR Logo and SYSTEM.MAP button */}
        <div className="shrink-0 h-28 md:h-32" />

        {/* 2. THE MACBOOK-STYLE RESUME WINDOW */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          // MOBILE FIX: Restricted width to calc(100vw - 4rem) to stay inside sniper borders
          className="flex-1 w-[calc(100%-2rem)] md:w-[85%] max-w-5xl mb-20 md:mb-12 flex flex-col bg-[#0a0a0a] rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
        >
          {/* MACBOOK TITLE BAR */}
          <div className="flex items-center justify-between px-3 md:px-5 py-3 bg-[#121212] border-b border-zinc-800 shrink-0">
            <div className="flex items-center gap-3 md:gap-6 min-w-0">
              {/* Traffic Lights */}
              <div className="flex gap-1.5 md:gap-2 shrink-0">
                <Link href="/" className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FF5F56] hover:brightness-125 flex items-center justify-center group">
                  <span className="opacity-0 group-hover:opacity-100 text-[#8b1a10] text-[8px] font-bold">×</span>
                </Link>
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#27C93F]" />
              </div>
              
              {/* Tab Title: Strict truncation to prevent button collision on small screens */}
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] md:text-xs font-medium text-zinc-300 uppercase tracking-widest truncate">
                  resume_v1.sh
                </span>
                <span className="hidden md:block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5 truncate">
                  REVANTH_MODALAVALASA.pdf
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
               <a
                href={DRIVE_VIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="group/drive relative hidden sm:flex items-center gap-2 px-3 py-1.5 overflow-hidden font-mono text-[9px] uppercase tracking-widest bg-white/5 backdrop-blur-xl border border-zinc-700/50 text-zinc-400 rounded-lg shadow-lg transition-all duration-300 hover:border-zinc-500/50"
              >
                <ExternalLink size={12} />
                Drive
              </a>
              <a
                href={DRIVE_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="group/dl relative flex items-center gap-1.5 md:gap-2 px-3 py-1.5 overflow-hidden font-mono text-[9px] uppercase tracking-widest bg-red-600 border border-red-500 text-white rounded-lg shadow-[0_4px_20px_rgba(220,38,38,0.2)] transition-all duration-300 hover:bg-red-700 hover:shadow-[0_4px_25px_rgba(220,38,38,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
              {/* The icon and text now stand out against the solid red */}
              <Download size={12} className="shrink-0" />
              <span className="xs:inline font-bold">Download</span>
              
              {/* Subtle shine effect to maintain the high-tech terminal feel */}
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/dl:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            </a>
            </div>
          </div>

          {/* INTERNAL CONTENT: The Resume Iframe */}
          <div className="flex-1 bg-white relative">
            <iframe
              src={EMBED_URL}
              className="w-full h-full border-0"
              allow="autoplay"
              title="Revanth Modalavalasa — Professional Resume"
            />
          </div>

          {/* WINDOW STATUS BAR: Centered and elevated to clear Hyderabad text */}
          <div className="px-5 py-2.5 bg-[#121212] border-t border-zinc-800 flex justify-center md:justify-between items-center">
            <p className="text-[8px] md:text-[9px] font-mono text-zinc-400 uppercase tracking-[0.2em]">
              {">"} root_access: granted
            </p>
            <p className="hidden md:block text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
              Verified_Source: Google_Drive
            </p>
          </div>
        </motion.div>

      </div>
    </AppFrame>
  );
}