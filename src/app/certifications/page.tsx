"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AppFrame from "@/components/AppFrame";
import Footer from "@/components/Footer";
import { Award, Globe, X, CalendarDays, Building2, ExternalLink, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  skills: string[];
  link: string;
};

const certificatesData: Record<"global" | "general", Certificate[]> = {
  global: [
    {
      id: "global-1",
      title: "Global Nominee - NASA Space Apps Challenge",
      issuer: "NASA",
      date: "2024",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop", // placeholder
      description: "Selected as a Global Nominee in the prestigious NASA Space Apps Challenge, recognized for building an innovative tech solution addressing complex space and earth challenges.",
      skills: ["SpaceTech", "Innovation", "Problem Solving", "Collaboration"],
      link: "#"
    },
    {
      id: "global-2",
      title: "OCI Generative AI Professional",
      issuer: "Oracle",
      date: "2025",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop", // placeholder
      description: "Earned the Oracle Cloud Infrastructure Generative AI Professional certification, demonstrating deep understanding of foundational and advanced GenAI models within OCI.",
      skills: ["Generative AI", "Cloud Infrastructure", "LLMs", "Oracle Cloud"],
      link: "#"
    }
  ],
  general: [
    {
      id: "general-1",
      title: "OCI Foundations Associate",
      issuer: "Oracle",
      date: "2025",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop", // placeholder
      description: "Certified in Oracle Cloud Infrastructure core concepts, including cloud architecture, computing, storage, networking, and identity management.",
      skills: ["Cloud Computing", "OCI Concepts", "Architecture Design"],
      link: "#"
    },
    {
      id: "general-2",
      title: "Industry Ready Certification",
      issuer: "McKinsey Forward Program",
      date: "2024",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop", // placeholder
      description: "Completed the McKinsey Forward Program, gaining skills in practical problem solving, leadership, effective communication, and adaptability.",
      skills: ["Problem Solving", "Leadership", "Communication", "Management"],
      link: "#"
    },
    {
      id: "general-3",
      title: "Algorithms & Data Structures",
      issuer: "Skill Platforms",
      date: "2023 - Present",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop", // placeholder
      description: "Completed comprehensive problem-solving tracks, finishing over 300+ DSA problems across multiple competitive programming platforms.",
      skills: ["Data Structures", "Algorithms", "Logic", "C++/Python"],
      link: "#"
    }
  ]
};

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState<"global" | "general">("global");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCert) {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  const displayedCertificates = certificatesData[activeTab];

  return (
    <>
      <AppFrame>
        <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-4 pt-24 md:pt-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
            <div className="mb-12">
              <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-red-600 uppercase mb-4">
                {"// sys.Trophies & Credentials"}
              </div>
              <h1 className="font-(family-name:--font-ndot) text-5xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-zinc-50 tracking-tight">
                CERTIFICATIONS
              </h1>
              <p className="mt-6 text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
                A timeline of my globally recognized accomplishments, certifications, and technical credentials earned throughout my journey.
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 bg-white/40 dark:bg-zinc-900/40 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-fit backdrop-blur-md">
              <button
                onClick={() => setActiveTab("global")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "global"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Globe className="w-4 h-4" />
                Global Recognitions
              </button>
              <button
                onClick={() => setActiveTab("general")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "general"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                General Certificates
              </button>
            </div>

            {/* Grid Layout for Certificates */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 cursor-pointer"
            >
              <AnimatePresence mode="popLayout">
                {displayedCertificates.map((cert) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="group flex flex-col bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:shadow-xl dark:shadow-none dark:hover:shadow-red-900/10"
                  >
                    {/* Placeholder Image container */}
                    <div className="relative w-full h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={cert.image} 
                        alt={cert.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white border border-white/10 text-xs font-mono">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {cert.date}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3 text-red-600 dark:text-red-500 text-sm font-semibold">
                        <Building2 className="w-4 h-4" />
                        {cert.issuer}
                      </div>
                      
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight group-hover:text-red-500 transition-colors mb-4 line-clamp-2">
                        {cert.title}
                      </h3>
                      
                      <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 transition-colors">
                        Click to view details
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
          <Footer />
        </div>
      </AppFrame>

      {/* Full Modal Popup for Certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-0 sm:p-6 backdrop-blur-3xl bg-zinc-50/90 dark:bg-zinc-950/90"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none sm:rounded-3xl w-full max-w-4xl h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-hidden sm:shadow-2xl flex flex-col relative"
            >
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex items-center gap-2">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(null);
                  }}
                  className="p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-full transition-colors flex-shrink-0 cursor-pointer shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto w-full h-full flex flex-col sm:flex-row">
                {/* Image Section (Left on desktop, Top on mobile) */}
                <div className="w-full sm:w-2/5 h-64 sm:h-full relative bg-zinc-100 dark:bg-zinc-950 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:hidden" />
                </div>

                {/* Content Section (Right on desktop, Bottom on mobile) */}
                <div className="p-6 sm:p-10 flex flex-col justify-center w-full sm:w-3/5 font-sans relative z-10 -mt-6 sm:mt-0 bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-none">
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold mb-6 w-fit">
                    <Award className="w-4 h-4" />
                    {activeTab === "global" ? "Global Recognition" : "Certification"}
                  </div>

                  <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl sm:text-4xl font-bold leading-tight mb-4">
                    {selectedCert.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <span className="flex items-center gap-2">
                       <Building2 className="w-4 h-4 text-zinc-400" />
                       {selectedCert.issuer}
                    </span>
                    <span className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-zinc-400" />
                      {selectedCert.date}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                        Overview
                      </h3>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {selectedCert.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                        Skills & Competencies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCert.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all shadow-lg shadow-red-600/20"
                      onClick={(e) => {
                        if (!selectedCert.link || selectedCert.link === "#") {
                          e.preventDefault();
                          toast.info("Updating soon...");
                        }
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify Certificate
                    </a>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
