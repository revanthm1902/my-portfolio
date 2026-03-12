import AppFrame from "@/components/AppFrame";
import Footer from "@/components/Footer";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "ERP Management System",
    tech: ["React.js", "Node.js", "Supabase", "MERN Stack"],
    description: "Engineered the official digital platform for St. G.D. Convent School to digitize records for 1,000+ users. Designed an admin portal with Role-Based Access Control (RBAC), significantly reducing administrative data entry workload by 50%.",
    link: "#",
    github: "#"
  },
  {
    title: "Second Brain",
    tech: ["Next.js", "React", "Supabase", "Tailwind CSS", "Gemini API"],
    description: "A full-stack knowledge management platform with real-time sync and secure authentication. Integrated the Gemini API for AI-driven summarization and semantic tagging. Features a responsive dashboard for dynamic categorization and optimal information retrieval.",
    link: "#",
    github: "#"
  },
  {
    title: "SafeFit – Smart Safety Bracelet",
    tech: ["IoT", "React Native", "Custom PCB", "NodeMCU", "C++"],
    description: "Designed a screenless health wearable featuring SpO2, heart rate monitoring, fitness tracking, and fall detection with automated SOS triggers. Integrated GSM+GPS auto-calling and SMS alerting under 5s latency. Built a companion React Native app to visualize real-time vitals and configure emergency contacts.",
    link: "#",
    github: "#"
  }
];

export default function ProjectsPage() {
  return (
    <AppFrame>
      <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-4 pt-24 md:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="mb-16">
            <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-red-600 uppercase mb-4">
              {"// sys.Projects"}
            </div>
            <h1 className="font-(family-name:--font-ndot) text-5xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-zinc-50 tracking-tight">
              PROJECTS
            </h1>
            <p className="mt-6 text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
              A collection of full-stack applications, intelligent IoT platforms, and hardware prototypes I&apos;ve built to solve real-world problems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-24">
            {projects.map((project, i) => (
              <div 
                key={i}
                className="group relative flex flex-col justify-between p-6 md:p-8 bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_8px_32px_rgba(220,38,38,0.1)]"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-[10px] md:text-xs font-mono tracking-wider uppercase text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 rounded-md border border-zinc-200 dark:border-zinc-700/50">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={project.link} className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-red-600 hover:text-red-500 transition-colors">
                      <ExternalLink size={16} />
                      <span>Live Site</span>
                    </a>
                    <a href={project.github} className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <Github size={16} />
                      <span>Source Code</span>
                    </a>
                  </div>
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
