import AppFrame from "@/components/AppFrame";
import Footer from "@/components/Footer";
import { Briefcase, Building2, CalendarDays, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Intern",
    organization: "Purple Techno Solutions",
    location: "Remote / Hybrid",
    duration: "Jan 2025 – Apr 2025",
    summary:
      "Engineered scalable MERN stack web applications and built Python-based predictive analytics modules (Pandas, Scikit-learn) to generate actionable client insights. Streamlined deployment with AWS CI/CD workflows.",
  },
  {
    role: "R&D Intern",
    organization: "TechtoGreen Drone & Robotics",
    location: "Amaravati, India",
    duration: "Aug 2024 – Aug 2025",
    summary:
      "Designed an Intelligent Safety Helmet using Raspberry Pi and IoT architecture, integrating 360° cameras and multi-sensor data fusion. Reduced incident response latency by 90%. Optimized GPS navigation for Autonomous Multi-Spraying Drones.",
  },
];

export default function ExperiencePage() {
  return (
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

          <div className="flex flex-col gap-6 md:gap-8 mb-24">
            {experiences.map((item, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:border-red-500/30"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-red-600/10 flex items-center justify-center border border-red-600/20">
                    <Briefcase className="w-4 h-4 text-red-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {item.role}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-4">
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-zinc-500" />
                    {item.organization}
                  </span>
                  <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-zinc-500" />
                    {item.location}
                  </span>
                  <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-zinc-500" />
                    {item.duration}
                  </span>
                </div>

                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </AppFrame>
  );
}
