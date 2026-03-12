import AppFrame from "@/components/AppFrame";
import Footer from "@/components/Footer";

const skillCategories = [
  {
    category: "Languages",
    skills: ["Java", "Python", "R", "JavaScript (ES6+)", "TypeScript"]
  },
  {
    category: "Web & App Development",
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "Django", "React Native", "REST APIs"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS (EC2, S3, Lambda)", "OCI", "Git", "GitHub", "CI/CD", "Vercel"]
  },
  {
    category: "Databases",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Supabase"]
  },
  {
    category: "Data Science",
    skills: ["Power BI", "Pandas", "NumPy", "Matplotlib", "Excel"]
  },
  {
    category: "IoT & Hardware",
    skills: ["Arduino", "Raspberry Pi", "ESP32", "PCB Design (EasyEDA)", "IoT Architecture"]
  },
  {
    category: "Core Fundamentals",
    skills: ["Data Structures & Algorithms", "OOPs", "DBMS", "Operating Systems"]
  },
  {
    category: "Design & Tools",
    skills: ["Figma", "Autodesk Fusion 360", "3D CAD"]
  }
];

export default function SkillsPage() {
  return (
    <AppFrame>
      <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-4 pt-24 md:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="mb-16">
            <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-red-600 uppercase mb-4">
              {"// sys.Abilities"}
            </div>
            <h1 className="font-(family-name:--font-ndot) text-5xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-zinc-50 tracking-tight">
              SKILLS
            </h1>
            <p className="mt-6 text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
              A comprehensive overview of my technical arsenal ranging from low-level hardware design to scalable cloud infrastructure and frontend interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24">
            {skillCategories.map((group, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all hover:border-red-500/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs md:text-sm font-medium text-zinc-600 dark:text-zinc-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-colors hover:border-red-500/50 hover:text-red-500"
                    >
                      {skill}
                    </span>
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
