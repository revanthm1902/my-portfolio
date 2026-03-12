"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

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
];

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setError("");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
      );
      setSent(true);
      formRef.current.reset();
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-red-600 uppercase mb-3">
          {"// sys.Contact"}
        </p>
        <h2 className="font-(family-name:--font-ndot) text-5xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-zinc-50 leading-tight mb-4">
          LET&apos;S CREATE TOGETHER.
        </h2>
        <div className="flex items-center gap-3 mb-12">
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-lg font-light leading-relaxed">
            Have a project in mind or just want to say hello? I&apos;m always open
            to discussing new opportunities and ideas.
          </p>
          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-500 text-[10px] md:text-xs font-mono tracking-wide">
            <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span></span>
            &lt;24hr response
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
        {/* ─── Contact Cards ─── */}
        <div className="flex flex-col gap-3 md:gap-4 self-start">
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
                    className="group flex items-center gap-4 p-5 md:p-6 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-2xl border border-red-600/50 md:border-white/40 dark:md:border-zinc-700/50 rounded-2xl shadow-[0_8px_32px_rgba(220,38,38,0.08)] md:shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:md:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-red-600/50 hover:shadow-[0_8px_32px_rgba(220,38,38,0.08)] transition-all duration-300"
                  >
                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-red-600/40 md:border-white/50 dark:md:border-zinc-700/50 group-hover:border-red-600/40 transition-all duration-300">
                      <Icon size={18} className="text-red-600 md:text-zinc-500 group-hover:text-red-600 transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm md:text-base text-zinc-900 dark:text-zinc-100 font-medium truncate">
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-red-600 md:text-zinc-400 dark:md:text-zinc-600 group-hover:text-red-600 transition-colors"
                    />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-5 md:p-6 bg-white/99 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/40 dark:border-zinc-700/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-white/50 dark:border-zinc-700/50">
                      <Icon size={18} className="text-zinc-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase mb-1">
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

        {/* ─── Message Form ─── */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="from_name"
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/40 dark:border-zinc-700/50 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 font-mono focus:outline-none focus:border-red-600/50 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300"
            />
            <input
              type="email"
              name="from_email"
              required
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/40 dark:border-zinc-700/50 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 font-mono focus:outline-none focus:border-red-600/50 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300"
            />
          </div>
          <input
            type="text"
            name="subject"
            required
            placeholder="Subject"
            className="w-full px-4 py-3 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/40 dark:border-zinc-700/50 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 font-mono focus:outline-none focus:border-red-600/50 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your Message"
            className="w-full px-4 py-3 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/40 dark:border-zinc-700/50 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 font-mono focus:outline-none focus:border-red-600/50 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 resize-none"
          />

          {error && (
            <p className="text-xs font-mono text-red-500">{error}</p>
          )}

          {sent ? (
            <div className="px-7 py-3.5 bg-emerald-600/10 border border-emerald-600/30 rounded-xl text-emerald-600 font-mono text-xs uppercase tracking-[0.15em] text-center">
              Message sent successfully!
            </div>
          ) : (
            <button
              type="submit"
              disabled={sending}
              className="group/btn relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 overflow-hidden rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-2xl border border-red-500/50 md:border-red-500/30 text-white md:text-red-600 font-mono text-xs uppercase tracking-[0.15em] shadow-[0_8px_32px_rgba(220,38,38,0.25)] md:shadow-[0_8px_32px_rgba(220,38,38,0.1)] hover:shadow-[0_8px_32px_rgba(220,38,38,0.25)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-linear-to-r from-red-600 to-red-500 translate-x-0 md:-translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 inline-flex items-center gap-2.5 md:group-hover/btn:text-white transition-colors duration-300">
                {sending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                {sending ? "Sending..." : "Send Message"}
              </span>
            </button>
          )}
        </motion.form>
      </div>
    </div>
  );
}
