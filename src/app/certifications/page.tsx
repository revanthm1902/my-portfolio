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
      title: "OCI Generative AI Professional",
      issuer: "Oracle",
      date: "2025",
      image: "/certificates/OCI_AI.jpg",
      description: "Earned the Oracle Cloud Infrastructure Generative AI Professional certification, demonstrating deep understanding of foundational and advanced GenAI models within OCI.",
      skills: ["Generative AI", "Cloud Infrastructure", "LLMs", "Oracle Cloud"],
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=72674E2FF8ED27F7B5228B9D24C8F84A9978E3D24496BE990733E523BE1B4C45"
    },
    {
      id: "global-2",
      title: "OCI Foundations Associate",
      issuer: "Oracle",
      date: "2025",
      image: "/certificates/OCI_FA.jpg",
      description: "Certified in Oracle Cloud Infrastructure core concepts, including cloud architecture, computing, storage, networking, and identity management.",
      skills: ["Cloud Computing", "OCI Concepts", "Architecture Design"],
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=E0EBE9E66EF3522343C267D9DC298C20E8C09A2519C946E4893F70880BFC4EA1"
    },
    {
      id: "global-3",
      title: "McKinsey Forward Program",
      issuer: "McKinsey",
      date: "2024",
      image: "/certificates/McKinsey_ForwardProgram.png",
      description: "Completed the McKinsey Forward Program, gaining skills in practical problem solving, leadership, effective communication, and adaptability.",
      skills: ["Problem Solving", "Leadership", "Communication", "Management"],
      link: "https://www.credly.com/badges/7efca65a-3cfc-4a58-a827-63ef667e1219/linked_in_profile"
    },
    {
      id: "global-4",
      title: "Digital Skills: User Experience",
      issuer: "Accenture",
      date: "2024",
      image: "/certificates/Accenture_UI_UX.jpg",
      description: "Completed an extensive program focusing on the fundamental principles of User Experience (UX), interface design, and user-centric problem-solving.",
      skills: ["UI/UX Design", "User Research", "Prototyping"],
      link: "#"
    },
    {
      id: "global-5",
      title: "Certified Essentials Automation Professional",
      issuer: "Automation Anywhere",
      date: "2026",
      image: "/certificates/Automation_anywhere.jpg",
      description: "Acquired the Essentials Automation Professional certification, establishing foundational knowledge in building, understanding, and implementing Robotic Process Automation solutions.",
      skills: ["RPA", "Automation Anywhere", "Process Automation"],
      link: "https://certificates.automationanywhere.com/eb5b2933-cf30-4650-a058-ea4cce212c51#acc.9fm2cxy3"
    },
    {
      id: "global-6",
      title: "Global Nominee - NASA Space Apps Challenge",
      issuer: "NASA",
      date: "2024",
      image: "/certificates/NASA Space Apps Challenge.jpg",
      description: "Selected as a Global Nominee in the prestigious NASA Space Apps Challenge, recognized for building an innovative tech solution addressing complex space and earth challenges.",
      skills: ["SpaceTech", "Innovation", "Problem Solving", "Collaboration"],
      link: "#"
    }
  ],
  general: [
    {
      id: "general-1",
      title: "Postman API Student Expert",
      issuer: "Postman",
      date: "2024",
      image: "/certificates/PostmanAPI.png",
      description: "Recognized as an API Student Expert, proficient in creating, testing, and managing APIs using Postman.",
      skills: ["API Development", "API Testing", "Postman", "REST APIs"],
      link: "https://badges.parchment.com/public/assertions/WtC556s-Q9yikRy-fTGTzw"
    },
    {
      id: "general-2",
      title: "Pep Sales Star",
      issuer: "PepsiCo India",
      date: "2025",
      image: "/certificates/Pep Sales Star Workshop.png",
      description: "Actively participated in the Pep Sales Star Workshop hosted by PepsiCo India, gaining practical insights into the FMCG industry and sales operations.",
      skills: ["Sales", "FMCG Industry", "Operations"],
      link: "https://www.verix.io/credential/7c301240-28a7-43a4-beb7-b37187ecef7d"
    },
    {
      id: "general-3",
      title: "Hacksagon Finalist",
      issuer: "ABV-IIITM Gwalior & IEEE",
      date: "2025",
      image: "/certificates/Hacksagon.jpg",
      description: "Emerged as a Finalist among 600+ registered teams at HACKSAGON 2025, a National Level Software & Hardware Hackathon.",
      skills: ["Hackathon", "Software Engineering", "Hardware", "Prototyping"],
      link: "#"
    },
    {
      id: "general-4",
      title: "Nestle Certificate",
      issuer: "Nestle",
      date: "2024",
      image: "/certificates/Nestle.jpg",
      description: "Successfully completed program/training under Nestle.",
      skills: ["FMCG", "Business Operations", "Management"],
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
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white border border-white/10 text-xs font-mono">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {cert.date}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col grow">
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
            className="fixed inset-0 z-99999 flex items-center justify-center p-0 sm:p-6 backdrop-blur-3xl bg-zinc-50/90 dark:bg-zinc-950/90"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none sm:rounded-3xl w-full max-w-4xl h-dvh sm:h-auto sm:max-h-[90vh] overflow-hidden sm:shadow-2xl flex flex-col relative"
            >
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex items-center gap-2">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(null);
                  }}
                  className="p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-full transition-colors shrink-0 cursor-pointer shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto w-full h-full flex flex-col sm:flex-row">
                {/* Image Section (Left on desktop, Top on mobile) */}
                <div className="w-full sm:w-2/5 h-64 sm:h-full relative bg-zinc-100 dark:bg-zinc-950 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent sm:hidden" />
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

                  {selectedCert.link && selectedCert.link !== "#" && (
                    <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                      <a
                        href={selectedCert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all shadow-lg shadow-red-600/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Verify Certificate
                      </a>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
