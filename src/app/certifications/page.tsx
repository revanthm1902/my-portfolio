import AppFrame from "@/components/AppFrame";
import Footer from "@/components/Footer";
import { Award, Globe, Code, Trophy } from "lucide-react";

const recognitions = [
  {
    category: "Global Recognition",
    icon: <Globe className="w-5 h-5 text-red-600" />,
    items: [
      { title: "Global Nominee", desc: "NASA Space Apps Challenge 2024" }
    ]
  },
  {
    category: "Competitions & Hackathons",
    icon: <Trophy className="w-5 h-5 text-red-600" />,
    items: [
      { title: "Winner", desc: "HackAP 2024" },
      { title: "Winner", desc: "AppFusion 2024" },
      { title: "Runner-Up", desc: "IEEE Hacksagon 2025 (IIITM Gwalior)" }
    ]
  },
  {
    category: "Certifications",
    icon: <Award className="w-5 h-5 text-red-600" />,
    items: [
      { title: "OCI Foundations Associate", desc: "Oracle Cloud Infrastructure (2025)" },
      { title: "OCI Generative AI Professional", desc: "Oracle Cloud Infrastructure" },
      { title: "Industry Ready Certification", desc: "McKinsey Forward Program Badge" }
    ]
  },
  {
    category: "Community & Coding",
    icon: <Code className="w-5 h-5 text-red-600" />,
    items: [
      { title: "GirlScript Summer of Code", desc: "GSSoC '25 Participant" },
      { title: "Algorithms & Data Structures", desc: "Solved 300+ DSA Problems across platforms" }
    ]
  }
];

export default function CertificationsPage() {
  return (
    <AppFrame>
      <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-4 pt-24 md:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="mb-16">
            <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-red-600 uppercase mb-4">
              {"// sys.Trophies"}
            </div>
            <h1 className="font-(family-name:--font-ndot) text-5xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-zinc-50 tracking-tight">
              CERTIFICATIONS
            </h1>
            <p className="mt-6 text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Official recognitions, competition wins, and technical certifications I&apos;ve earned throughout my engineering journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24">
            {recognitions.map((block, idx) => (
              <div 
                key={idx}
                className="flex flex-col p-6 md:p-8 bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:border-red-500/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  {block.icon}
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    {block.category}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-5">
                  {block.items.map((item, i) => (
                    <div key={i} className="relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
                      <div className="absolute -left-1.25 top-1.5 w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                      <h4 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                        {item.title}
                      </h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </AppFrame>
  );
}
