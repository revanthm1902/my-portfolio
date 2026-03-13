import AppFrame from "@/components/AppFrame";
import Footer from "@/components/Footer";
import { FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaAws, FaGitAlt, FaGithub, FaFigma, FaCubes, FaMicrochip, FaNetworkWired, FaDatabase, FaChartBar, FaLaptopCode, FaProjectDiagram, FaFileExcel } from "react-icons/fa";
import { SiR, SiTypescript, SiNextdotjs, SiExpress, SiDjango, SiVercel, SiMongodb, SiMysql, SiPostgresql, SiSupabase, SiPandas, SiNumpy, SiArduino, SiRaspberrypi, SiEspressif, SiAutodesk } from "react-icons/si";
import { TbApi, TbBinaryTree } from "react-icons/tb";
import { BsInfinity } from "react-icons/bs";

const skillCategories = [
  {
    category: "Languages",
    skills: [
      { name: "Java", icon: FaJava },
      { name: "Python", icon: FaPython },
      { name: "R", icon: SiR },
      { name: "JavaScript (ES6+)", icon: FaJs },
      { name: "TypeScript", icon: SiTypescript }
    ]
  },
  {
    category: "Web & App Development",
    skills: [
      { name: "React.js", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "Django", icon: SiDjango },
      { name: "React Native", icon: FaReact },
      { name: "REST APIs", icon: TbApi }
    ]
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", icon: FaAws },
      { name: "OCI", icon: FaDatabase },
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "CI/CD", icon: BsInfinity },
      { name: "Vercel", icon: SiVercel }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Supabase", icon: SiSupabase }
    ]
  },
  {
    category: "Data Science",
    skills: [
      { name: "Power BI", icon: FaChartBar },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "Matplotlib", icon: FaChartBar },
      { name: "Excel", icon: FaFileExcel }
    ]
  },
  {
    category: "IoT & Hardware",
    skills: [
      { name: "Arduino", icon: SiArduino },
      { name: "Raspberry Pi", icon: SiRaspberrypi },
      { name: "ESP32", icon: SiEspressif },
      { name: "PCB Design (EasyEDA)", icon: FaMicrochip },
      { name: "IoT Architecture", icon: FaNetworkWired }
    ]
  },
  {
    category: "Core Fundamentals",
    skills: [
      { name: "Data Structures & Algorithms", icon: TbBinaryTree },
      { name: "OOPs", icon: FaProjectDiagram },
      { name: "DBMS", icon: FaDatabase },
      { name: "Operating Systems", icon: FaLaptopCode }
    ]
  },
  {
    category: "Design & Tools",
    skills: [
      { name: "Figma", icon: FaFigma },
      { name: "Autodesk Fusion 360", icon: SiAutodesk },
      { name: "3D CAD", icon: FaCubes }
    ]
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
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {group.skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="group relative flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded-2xl md:rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:scale-110 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 cursor-pointer"
                    >
                      <skill.icon className="w-8 h-8 md:w-10 md:h-10 text-zinc-600 dark:text-zinc-400 group-hover:text-red-500 transition-colors duration-300" />
                      
                      {/* Tooltip on hover */}
                      <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg select-none pointer-events-none z-10 flex items-center justify-center">
                        {skill.name}
                        {/* Little triangle arrow pointing down */}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-white rotate-45"></span>
                      </span>
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
