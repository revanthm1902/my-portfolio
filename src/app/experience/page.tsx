"use client";

import { useState, useEffect } from "react";
import AppFrame from "@/components/AppFrame";
import Footer from "@/components/Footer";
import { Briefcase, Building2, CalendarDays, MapPin, X, ArrowUpRight, FileText, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Product Manager",
    organization: "AryVerse Pvt. Ltd.",
    location: "Remote",
    duration: "2025 - Present",
    summary: "Managing complete tech and management teams for a 3D animations and gaming-focused learning company. Aligning product vision with development milestones.",
    details: [
      "Leading cross-functional teams combining tech, design, and management for a fast-paced EdTech and Gaming startup.",
      "Spearheading the development of immersive 3D animation and gaming experiences targeted at revolutionizing digital learning.",
      "Facilitating agile sprint planning, feature prioritization, and resource allocation to ensure timely delivery of high-impact product features.",
      "Working closely with technical leads to architect scalable solutions while maintaining a seamless user experience for end-users."
    ],
    offerLetter: "#",
    certificate: "#"
  },
  {
    id: 2,
    role: "Full Stack Intern",
    organization: "Purple Techno Solutions",
    location: "Remote / Hybrid",
    duration: "Jan 2025 – Apr 2025",
    summary:
      "Engineered scalable MERN stack web applications and built Python-based predictive analytics modules (Pandas, Scikit-learn) to generate actionable client insights. Streamlined deployment with AWS CI/CD workflows.",
    details: [
      "Developed end-to-end MERN stack solutions that handled significant user traffic, focusing on optimal database architecture and API response times.",
      "Built predictive models using Python, Pandas, and Scikit-learn to parse raw client data and generate actionable business insights.",
      "Automated CI/CD pipelines via AWS, significantly reducing deployment latency and ensuring high availability for live environments."
    ],
    offerLetter: "#",
    certificate: "#"
  },
  {
    id: 3,
    role: "R&D Intern",
    organization: "TechtoGreen Drone & Robotics",
    location: "Amaravati, India",
    duration: "Aug 2024 – Aug 2025",
    summary:
      "Designed an Intelligent Safety Helmet using Raspberry Pi and IoT architecture, integrating 360° cameras and multi-sensor data fusion. Reduced incident response latency by 90%. Optimized GPS navigation for Autonomous Multi-Spraying Drones.",
    details: [
      "Spearheaded the R&D for an Intelligent Safety Helmet aimed at industrial workers, featuring real-time environmental monitoring.",
      "Integrated Raspberry Pi IoT architecture with multi-sensor data fusion to detect impacts, gas leaks, and temperature spikes.",
      "Incorporated 360° camera systems connected to a real-time telemetry pipeline, cutting emergency response time by 90%.",
      "Contributed to the optimization of GPS navigation and obstacle avoidance for Autonomous Multi-Spraying agricultural drones."
    ],
    offerLetter: "#",
    certificate: "#"
  },
];

export default function ExperiencePage() {
  const [selectedExp, setSelectedExp] = useState<typeof experiences[0] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedExp) {
        setSelectedExp(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedExp]);

  return (
    <>
      <AppFrame>
        <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-4 pt-24 md:pt-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
            <div className="mb-16">
              <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-red-600 uppercase mb-4">
                {"// sys.Career"}
              </div>
              <h1 className="font-(family-name:--font-ndot) text-5xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-zinc-50 tracking-tight">
                EXPERIENCE
              </h1>
              <p className="mt-6 text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
                A timeline of professional, project, and team experiences where I built products at the intersection of software engineering and IoT.
              </p>
            </div>

            <div className="flex flex-col gap-6 md:gap-8 mb-24 cursor-pointer">
              {experiences.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedExp(item)}
                  className="p-6 md:p-8 bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:border-red-500/30 hover:shadow-xl dark:shadow-none dark:hover:shadow-red-900/10 group relative"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-red-600/10 flex items-center justify-center border border-red-600/20">
                      <Briefcase className="w-4 h-4 text-red-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-red-500 transition-colors">
                      {item.role}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-4">
                    <span className="inline-flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-zinc-500" />
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.organization}</span>
                    </span>
                    <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-zinc-500" />
                      {item.location}
                    </span>
                    <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="inline-flex items-center gap-2 font-mono text-xs md:text-sm">
                      <CalendarDays className="w-4 h-4 text-zinc-500" />
                      {item.duration}
                    </span>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm md:text-base line-clamp-2 md:line-clamp-3">
                    {item.summary}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-500 group-hover:text-red-400">
                    <span>Click to know more</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </AppFrame>

      {/* Full Experience Modal Popup */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExp(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-0 sm:p-6 backdrop-blur-3xl bg-zinc-50/90 dark:bg-zinc-950/90"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none sm:rounded-3xl w-full max-w-3xl h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-hidden sm:shadow-2xl flex flex-col relative"
            >
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white via-white dark:from-zinc-900 dark:via-zinc-900 to-transparent z-10 pointer-events-none" />
              
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex items-center gap-2">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedExp(null);
                  }}
                  className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-colors flex-shrink-0 cursor-pointer pointer-events-auto shadow-sm"
                >
                  <X className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                </button>
              </div>
              
              <div className="overflow-y-auto no-scrollbar p-6 sm:p-10 pt-24 sm:pt-20 h-full font-sans">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-7 h-7 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-bold leading-tight">
                      {selectedExp.role}
                    </h2>
                    <div className="text-base font-medium text-zinc-600 dark:text-zinc-400 mt-2 flex items-center gap-2">
                       <Building2 className="w-4 h-4 text-zinc-500" />
                       {selectedExp.organization}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 text-sm font-mono text-zinc-500 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-6">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedExp.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    {selectedExp.duration}
                  </span>
                </div>

                {/* Project Details Section */}
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-5 flex items-center gap-2">
                    <Award className="w-5 h-5 text-red-500" /> Key Responsibilities & Projects
                  </h3>
                  <ul className="space-y-4">
                    {selectedExp.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                        <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
                          {detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Links Section */}
                <div className="mt-10 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-4">
                  <a
                    href={selectedExp.offerLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-semibold transition-all group shadow-sm"
                  >
                    <FileText className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                    View Offer Letter
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  
                  <a
                    href={selectedExp.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-semibold transition-all group shadow-sm"
                  >
                    <Award className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                    View Certificate
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}