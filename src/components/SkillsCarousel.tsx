"use client";

import { motion } from "framer-motion";
import { FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaAws, FaGitAlt, FaGithub, FaFigma, FaCubes, FaMicrochip, FaNetworkWired, FaDatabase, FaChartBar, FaLaptopCode, FaProjectDiagram, FaFileExcel } from "react-icons/fa";
import { SiR, SiTypescript, SiNextdotjs, SiExpress, SiDjango, SiVercel, SiMongodb, SiMysql, SiPostgresql, SiSupabase, SiPandas, SiNumpy, SiArduino, SiRaspberrypi, SiEspressif, SiAutodesk } from "react-icons/si";
import { TbApi, TbBinaryTree } from "react-icons/tb";
import { BsInfinity } from "react-icons/bs";

const allSkills = [
  { name: "Java", icon: FaJava },
  { name: "Python", icon: FaPython },
  { name: "R", icon: SiR },
  { name: "JavaScript", icon: FaJs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React.js", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express", icon: SiExpress },
  { name: "Django", icon: SiDjango },
  { name: "REST APIs", icon: TbApi },
  { name: "AWS", icon: FaAws },
  { name: "Git", icon: FaGitAlt },
  { name: "GitHub", icon: FaGithub },
  { name: "CI/CD", icon: BsInfinity },
  { name: "Vercel", icon: SiVercel },
  { name: "MongoDB", icon: SiMongodb },
  { name: "MySQL", icon: SiMysql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Supabase", icon: SiSupabase },
  { name: "Power BI", icon: FaChartBar },
  { name: "Pandas", icon: SiPandas },
  { name: "NumPy", icon: SiNumpy },
  { name: "Matplotlib", icon: FaChartBar },
  { name: "Excel", icon: FaFileExcel },
  { name: "Arduino", icon: SiArduino },
  { name: "Raspberry Pi", icon: SiRaspberrypi },
  { name: "ESP32", icon: SiEspressif },
  { name: "PCB Design", icon: FaMicrochip },
  { name: "IoT Arch.", icon: FaNetworkWired },
  { name: "DSA", icon: TbBinaryTree },
  { name: "OOPs", icon: FaProjectDiagram },
  { name: "DBMS", icon: FaDatabase },
  { name: "OS", icon: FaLaptopCode },
  { name: "Figma", icon: FaFigma },
  { name: "Fusion 360", icon: SiAutodesk },
  { name: "3D CAD", icon: FaCubes }
];

const carouselSkills = [...allSkills, ...allSkills];

export default function SkillsCarousel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto overflow-hidden py-4 md:py-6 mt-4 md:mt-8 relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
      >
        {carouselSkills.map((skill, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center justify-center mx-2.5 md:mx-4 w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-[#0a0a0a] shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl transition-all duration-300 hover:scale-110 hover:border-red-500/50 hover:shadow-red-500/10 hover:z-50 cursor-pointer"
          >
            <skill.icon className="w-6 h-6 md:w-8 md:h-8 text-zinc-600 dark:text-zinc-400 group-hover:text-red-500 transition-colors duration-300" />
            
            {/* Tooltip on hover */}
            <span className="absolute -top-10 md:-top-11 scale-0 group-hover:scale-100 transition-all duration-200 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] md:text-xs font-semibold px-2 md:px-2.5 py-1 md:py-1.5 rounded-lg whitespace-nowrap shadow-xl select-none pointer-events-none flex items-center justify-center origin-bottom">
              {skill.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-zinc-900 dark:bg-white rotate-45"></span>
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}