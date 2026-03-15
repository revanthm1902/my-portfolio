"use client";

import { useState, useEffect } from "react";
import AppFrame from "@/components/AppFrame";
import Footer from "@/components/Footer";
import { ExternalLink, X, Linkedin, BookOpen, ImageOff, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const writingsData = [
  {
    id: '1',
    link: 'https://www.linkedin.com/posts/modalavalasa-revanth_hacksagon2025-iiitmgwalior-smartwearables-activity-7346922571046510592-Hq4H?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEwQ-FkByiZoHf0eqwYCgWPQ-T9YBqn5BlY',
    title: 'Journey at HACKSAGON 2025, hosted by (ABV-IIITM), Gwalior',
    summary: 'Our project: 🎯 SafeFit – A Smart Bracelet (Where Fashion Meets Innovation) Your all-in-one companion for Health, Fitness, and Safety.',
    date: '2025-07-04',
    source: 'LinkedIn',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
  },
  {
    id: '2',
    link: 'https://www.linkedin.com/posts/vitap-university_dronehackathon-dronefusion-innovation-ugcPost-7314288570372870144-FN6l?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEwQ-FkByiZoHf0eqwYCgWPQ-T9YBqn5BlY',
    title: 'Success at the Drone Hackathon! ',
    summary: 'First-place team competed under the theme "Search and Rescue"\nThe second-place team worked on the theme "UAV-Assisted Agriculture Monitoring"',
    date: '2025-03-15',
    source: 'LinkedIn',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80',
  },
  {
    id: '3',
    link: 'https://www.linkedin.com/posts/modalavalasa-revanth_llmsecurity-cybersecurity-ai-activity-7303478861369860096-0MtN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEwQ-FkByiZoHf0eqwYCgWPQ-T9YBqn5BlY',
    title: '🔥 Proud to be a part of the LLM Security Bootcamp! 🔥',
    summary: 'wrapped up an incredible two-day journey at the LLM Security Bootcamp (Feb 21-22, 2025) at VIT-AP University! The hands-on training in LLM security, AI, and cybersecurity was truly insightful, covering GenAI, MLOps, LangChain, RAG, and more!',
    date: '2025-02-25',
    source: 'LinkedIn',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  },
  {
    id: '4',
    link: 'https://www.linkedin.com/posts/modalavalasa-revanth_postman-api-fundamentals-student-expert-activity-7302995001486024705-5Kdk?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEwQ-FkByiZoHf0eqwYCgWPQ-T9YBqn5BlY',
    title: 'Completed the Postman API Fundamentals Workshop',
    summary: 'Learning on REST APIs & HTTP Methods, Query & Path Parameters, Authentication & API Keys, Status Codes & Error Handling, Automating Tests in Postman',
    date: '2025-02-15',
    source: 'LinkedIn',
    image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&q=80',
  },
  {
    id: '5',
    link: 'https://www.linkedin.com/posts/modalavalasa-revanth_ai-hackathon2025-innovation-activity-7298930648503767040-sBpf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEwQ-FkByiZoHf0eqwYCgWPQ-T9YBqn5BlY',
    title: 'AI Autonomous Hackathon and Model Expo 2025 at VRSEC Vijayawada',
    summary: 'We showcased our Agri Drone, an innovative solution designed to revolutionize precision farming as part of TechtoGreen’s product portfolio.',
    date: '2025-02-08',
    source: 'LinkedIn',
    image: 'https://images.unsplash.com/photo-1586771107445-d3af21245842?w=800&q=80',
  },
  {
    id: '6',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:987654321/',
    title: 'Proud to announce that my team and I secured 1st place at HackAP - Transport & Logistics',
    summary: 'Our problem statement focused on Developing a Portable Safety Device (Helmet) for MEWP Operators. Our solution aimed to address the growing safety concerns in industries using Mobile Elevated Work Platforms (MEWPs)',
    date: '2024-09-30',
    source: 'LinkedIn',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356fce?w=800&q=80',
  },
  {
    id: '7',
    link: 'https://www.linkedin.com/posts/frankmathewsajan_internationalstartupfestival-innovation-entrepreneurship-ugcPost-7246949639457775617-aPZj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEwQ-FkByiZoHf0eqwYCgWPQ-T9YBqn5BlY',
    title: 'Attended the International Startup Festival 2024 at ESCI',
    summary: 'The event brought together participants from over 15 countries, including the USA, UK, Australia, Japan, Canada, New Zealand, and more. We explored innovations in AI, FinTech, AgriTech, and Health Tech, and had insightful conversations',
    date: '2024-09-29',
    source: 'LinkedIn',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=800&q=80',
  },
];

const PostImage = ({ src, alt, link, source, isModal = false }: { src: string; alt: string; link: string; source: string; isModal?: boolean }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`w-full flex flex-col items-center justify-center bg-zinc-50 border border-zinc-100 hover:border-zinc-300 dark:bg-zinc-900/40 dark:border-zinc-800/80 dark:hover:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all p-6 text-center group/fallback cursor-pointer ${isModal ? 'min-h-62.5 rounded-xl' : 'h-full rounded-xl absolute inset-0'}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!link || link === '#' || link.includes('urn:li:activity:987654321')) {
            e.preventDefault();
            toast.info("Updating soon...");
          }
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center mb-3 shadow-sm group-hover/fallback:scale-110 transition-transform">
          <ImageOff className="w-4 h-4 text-zinc-400" />
        </div>
        <span className="text-sm font-medium px-4 mb-1">Image unavailable</span>
        <span className="text-xs opacity-70 flex items-center gap-1 font-mono">
          View on {source} <ArrowUpRight className="w-3 h-3" />
        </span>
      </a>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)}
      className={`w-full ${isModal ? 'h-auto max-h-[50vh] object-contain rounded-xl shadow-sm' : 'h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity'}`} 
    />
  );
};

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<typeof writingsData[0] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPost) {
        setSelectedPost(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPost]);

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-500" />;
      default:
        return <ExternalLink className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <>
      <AppFrame>
        <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-4">
        <div className="min-h-dvh flex flex-col items-start justify-start max-w-5xl mx-auto px-4 sm:px-8 md:px-12 pt-24 md:pt-32 pb-24">
          <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-500 uppercase mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> Writings // Updates // Thoughts
          </div>
          <h1 className="font-(family-name:--font-ndot) text-5xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-zinc-50 tracking-tight uppercase mb-12">
            BLOG
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
            {writingsData.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedPost(post)}
                className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-3xl cursor-pointer flex flex-col h-full transition-all hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-zinc-900/50 group relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    {getSourceIcon(post.source)}
                    <span className="text-zinc-400 dark:text-zinc-500 text-xs font-mono tracking-wide">{post.date}</span>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 text-[10px] uppercase tracking-widest px-2 py-1 rounded-md font-semibold">
                    {post.source}
                  </div>
                </div>
                
                <h3 className="text-zinc-900 dark:text-zinc-100 font-bold text-lg md:text-xl mb-3 line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base mb-6 line-clamp-3 grow leading-relaxed">
                  {post.summary}
                </p>
                
                <div className="w-full h-52 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 overflow-hidden relative shrink-0 border border-zinc-200/50 dark:border-zinc-800/50">
                  <PostImage src={post.image} alt="Post visual" link={post.link} source={post.source} />
                </div>
                
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-zinc-900/5 dark:group-hover:border-white/5 rounded-3xl pointer-events-none transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </AppFrame>
        
        {/* Full Post Modal Popup */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 backdrop-blur-3xl bg-zinc-50/90 dark:bg-zinc-950/90"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 sm:border border-zinc-200 dark:border-zinc-800 rounded-none sm:rounded-3xl w-full max-w-2xl h-dvh sm:h-auto sm:max-h-[90vh] overflow-hidden sm:shadow-2xl flex flex-col relative"
              >
                <div className="absolute top-0 inset-x-0 h-24 bg-linear-to-b from-white via-white dark:from-zinc-900 dark:via-zinc-900 to-transparent z-10 pointer-events-none" />
                
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex items-center gap-2">
                  <a
                    href={selectedPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
                    onClick={(e) => {
                      if (!selectedPost.link || selectedPost.link === '#' || selectedPost.link.includes('urn:li:activity:987654321')) {
                        e.preventDefault();
                        toast.info("Updating soon...");
                      }
                    }}
                  >
                    {getSourceIcon(selectedPost.source)}
                    <span>View on {selectedPost.source}</span>
                  </a>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(null);
                    }}
                    className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-colors shrink-0 cursor-pointer pointer-events-auto"
                  >
                    <X className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                  </button>
                </div>
                
                <div className="overflow-y-auto no-scrollbar p-5 sm:p-10 pt-24 sm:pt-20 h-full font-sans">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      {getSourceIcon(selectedPost.source)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                        {selectedPost.source} Post
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                        {selectedPost.date}
                      </div>
                    </div>
                  </div>

                  <h2 className="text-zinc-900 dark:text-zinc-100 text-2xl sm:text-3xl font-bold mb-6 leading-tight">
                    {selectedPost.title}
                  </h2>

                  <p className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg mb-10 whitespace-pre-wrap leading-relaxed">
                    {selectedPost.summary}
                  </p>
                  
                  {selectedPost.image && (
                    <div className="w-full rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/50 shadow-inner flex justify-center border border-zinc-100 dark:border-zinc-800">
                      <PostImage src={selectedPost.image} alt="Full post visual" link={selectedPost.link} source={selectedPost.source} isModal />
                    </div>
                  )}
                  
                  <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
                    <a
                      href={selectedPost.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors group"
                      onClick={(e) => {
                        if (!selectedPost.link || selectedPost.link === '#' || selectedPost.link.includes('urn:li:activity:987654321')) {
                          e.preventDefault();
                          toast.info("Updating soon...");
                        }
                      }}
                    >
                      Read full post on {selectedPost.source}
                      <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
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
