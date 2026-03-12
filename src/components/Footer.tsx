"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/revanthm1902", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/modalavalasa-revanth/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:revanthm051@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <span className="font-(family-name:--font-ndot) text-2xl text-red-600 tracking-tight">
              MR
            </span>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono leading-relaxed max-w-55">
              Product Developer &amp; Full-Stack Engineer based in
              Hyderabad, India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors font-mono"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 uppercase mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-red-600 hover:border-red-600/50 dark:hover:text-red-500 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Revanth Modalavalasa
          </p>
          <p className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
            Made with <Heart size={10} className="text-red-600 fill-red-600" />{" "}
            love
          </p>
        </div>
      </div>
    </footer>
  );
}
