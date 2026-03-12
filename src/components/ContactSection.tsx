"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, ArrowUpRight, Send } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "revanthm051@gmail.com",
    href: "mailto:revanthm051@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "revanthm1902",
    href: "https://github.com/revanthm1902",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Modalavalasa Revanth",
    href: "https://www.linkedin.com/in/modalavalasa-revanth/",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
    href: null,
  },
];

export default function ContactSection() {
  return (
    <div className="max-w-4xl mx-auto w-full px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-red-600 uppercase mb-3">
          {"// sys.Contact"}
        </p>
        <h2 className="font-(family-name:--font-ndot) text-4xl md:text-6xl lg:text-7xl text-zinc-900 dark:text-zinc-50 leading-tight mb-4">
          GET IN TOUCH
        </h2>
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-lg mb-12 font-light leading-relaxed">
          Have a project in mind or just want to say hello? I&apos;m always open
          to discussing new opportunities and ideas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {contactLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 p-5 md:p-6 border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-red-600/50 transition-all"
                >
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 group-hover:border-red-600/50 transition-colors">
                    <Icon size={18} className="text-zinc-500 group-hover:text-red-600 transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm md:text-base text-zinc-900 dark:text-zinc-100 font-medium truncate">
                      {item.value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-zinc-300 dark:text-zinc-700 group-hover:text-red-600 transition-colors"
                  />
                </a>
              ) : (
                <div className="flex items-center gap-4 p-5 md:p-6 border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                    <Icon size={18} className="text-zinc-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm md:text-base text-zinc-900 dark:text-zinc-100 font-medium truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 md:mt-14"
      >
        <a
          href="mailto:revanthm051@gmail.com"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-red-600 text-white font-mono text-xs uppercase tracking-[0.15em] hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
        >
          <Send size={14} />
          Send me an email
        </a>
      </motion.div>
    </div>
  );
}
