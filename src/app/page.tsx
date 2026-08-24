"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Cpu,
  Send,
  CheckCircle2,
  Briefcase,
  Terminal,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Helper for conditional classNames
const cn = (...inputs: any[]) => twMerge(clsx(inputs));

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
};

const cardHover = {
  hover: {
    y: -8,
    scale: 1.02,
    borderColor: "rgba(56, 189, 248, 0.5)",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    transition: { duration: 0.3, ease: "easeInOut" as any },
  },
};

const PROJECTS = [
  {
    title: "AI-Powered Local SEO Platform",
    description: "A full-stack Micro-SaaS local SEO platform engineered with automated review response workflows, Supabase database triggers, and Stripe subscription billing.",
    tags: ["Next.js 15", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/jatoikashif706-ops",
    liveUrl: "https://github.com/jatoikashif706-ops",
    featured: true,
  },
  {
    title: "Smart Lifestyle & Health Tracker",
    description: "Cross-platform mobile application featuring AI vision meal scanning, real-time macro tracking, and usage pattern control built with React Native and Firebase.",
    tags: ["React Native", "Expo Router", "Zustand", "Firebase", "Gemini AI"],
    githubUrl: "https://github.com/jatoikashif706-ops",
    liveUrl: "https://github.com/jatoikashif706-ops",
    featured: true,
  },
  {
    title: "E-Commerce Platform (Libas-e-Khas)",
    description: "Custom e-commerce storefront tailored for cultural clothing, built with spec-driven development, custom measurement input forms, and localized workflows.",
    tags: ["Next.js", "Tailwind CSS", "Shadcn UI", "State Management"],
    githubUrl: "https://github.com/jatoikashif706-ops",
    liveUrl: "https://github.com/jatoikashif706-ops",
    featured: false,
  },
  {
    title: "CUDA Parallel Matrix Computation",
    description: "Parallel computing implementations in CUDA C++ optimizing GPU memory allocation, thread hierarchy, and high-performance array operations.",
    tags: ["CUDA C++", "GPU Parallelism", "C++", "High Performance"],
    githubUrl: "https://github.com/jatoikashif706-ops",
    liveUrl: "https://github.com/jatoikashif706-ops",
    featured: false,
  },
];

const EXPERIENCES = [
  {
    company: "Sync",
    role: "Software Engineering Intern",
    period: "2026",
    description: [
      "Developed responsive frontend components and integrated RESTful backend APIs for core web modules.",
      "Collaborated with engineering teams to optimize client-side state management and component rendering speed.",
      "Participated in daily code reviews, agile sprints, and test-driven development workflows.",
    ],
    skills: ["React", "TypeScript", "REST APIs", "Tailwind CSS", "Git"],
  },
];

const SKILL_CATEGORIES = [
  {
    title: "Frontend & Mobile",
    icon: <Code2 className="w-5 h-5 text-sky-400" />,
    skills: ["Next.js 15", "React Native", "Expo Router", "TypeScript", "Tailwind CSS", "Shadcn UI", "Zustand", "AngularJS"],
  },
  {
    title: "Backend & Databases",
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    skills: ["Node.js", "C#", "Supabase", "PostgreSQL", "Firebase Auth / Firestore", "MySQL", "REST APIs"],
  },
  {
    title: "AI, Tools & Workflows",
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    skills: ["CUDA C++", "Gemini Flash API", "Stripe Integration", "n8n Automation", "Vercel", "Git / GitHub", "Kiro IDE"],
  },
];

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      {/* Navigation */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-lg tracking-tight hover:text-sky-400 transition-colors flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-400" />
            <span>Kashif<span className="text-sky-400">.Dev</span></span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-slate-100 transition-colors relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>
        </div>
      </motion.header>

      <main className="relative max-w-6xl mx-auto px-6 py-12 space-y-32">
        {/* HERO / ABOUT SECTION */}
        <motion.section
          id="about"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="pt-16 md:pt-24 grid grid-cols-1 md:grid-cols-3 gap-12 items-center"
        >
          <div className="md:col-span-2 space-y-8">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              Software Engineering Student & Full-Stack Developer
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-100 leading-[0.95]"
            >
              Hi, I&apos;m <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent animate-text-gradient">Kashif Qurban</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              Full-Stack & Mobile Developer experienced in building production web applications, cross-platform apps, and AI-driven solutions using Next.js, React Native, TypeScript, and cloud infrastructure.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2 group">
                Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              {[
                { href: "https://github.com/jatoikashif706-ops", icon: GitHubIcon, label: "GitHub" },
                { href: "https://www.linkedin.com/in/kashif-qurban-92594228a/", icon: LinkedInIcon, label: "LinkedIn" },
                { href: "https://www.upwork.com/freelancers/kashifq18", icon: UpworkIcon, label: "Upwork" }
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 text-sm font-medium transition-colors flex items-center gap-2.5">
                  <link.icon className="w-5 h-5" /> {link.label}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1.5 bg-gradient-to-b from-sky-500 via-teal-500 to-slate-800 shadow-2xl shadow-sky-500/15">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-slate-950">
                <Image src="/profile.jpg" alt="Kashif Qurban Profile Picture" fill sizes="(max-width: 768px) 256px, 320px" className="object-cover object-center" priority />
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* WORK EXPERIENCE SECTION */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100 flex items-center gap-3.5">
              <Briefcase className="w-7 h-7 text-sky-400" /> Work Experience
            </h2>
          </div>
          <div className="space-y-8">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={cardHover.hover}
                className="p-8 rounded-2xl border border-slate-800/80 bg-slate-900/50 space-y-6 hover:border-slate-700/80 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-100">{exp.role}</h3>
                    <p className="text-sky-400 font-semibold text-base">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono px-4 py-1.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50 w-fit">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3 text-base text-slate-300 list-disc list-inside leading-relaxed">
                  {exp.description.map((item, dIdx) => <li key={dIdx}>{item}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-800/50">
                  {exp.skills.map((s, sIdx) => (
                    <span key={sIdx} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FEATURED PROJECTS SECTION */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100 flex items-center gap-3.5">
              <Sparkles className="w-7 h-7 text-sky-400" /> Featured Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={cardHover.hover}
                className="group relative flex flex-col justify-between p-7 rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/90 hover:border-slate-700/80 transition-all duration-300"
              >
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-extrabold text-slate-100 group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-base text-slate-400 leading-relaxed">{project.description}</p>
                </div>
                <div className="pt-8 space-y-6">
                  <div className="flex flex-wrap gap-2.5">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-5 pt-3 border-t border-slate-800/50 opacity-80 group-hover:opacity-100 transition-opacity">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-400 hover:text-slate-100 flex items-center gap-2 transition-colors">
                      <Github className="w-5 h-5" /> Code
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-sky-400 hover:text-sky-300 flex items-center gap-2 transition-colors">
                      <ExternalLink className="w-5 h-5" /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TECHNICAL SKILLS MATRIX */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Technical Domain & Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((category, idx) => (
              <motion.div key={idx} variants={fadeIn} className="p-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-800/50">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-xs font-medium px-3.5 py-2 rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/40 hover:border-sky-500/30 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="space-y-12 pt-16 border-t border-slate-800/80"
        >
          <div className="max-w-xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Send Me a Message</h2>
            <p className="text-base text-slate-400">Interested in hiring me or collaborating on a project? Drop a message below.</p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your message here..."
              className="w-full px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-sky-500/25 disabled:opacity-50"
            >
              {status === "loading" ? (
                "Sending..."
              ) : status === "success" ? (
                <>Message Sent! <CheckCircle2 className="w-5 h-5 text-slate-950" /></>
              ) : (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
            </button>
            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-rose-400 text-center"
                >
                  Failed to send message. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-10 mt-24 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} Kashif Qurban. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="https://github.com/jatoikashif706-ops" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-1.5"><GitHubIcon className="w-4 h-4" /> GitHub</a>
            <a href="https://www.linkedin.com/in/kashif-qurban-92594228a/" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-1.5"><LinkedInIcon className="w-4 h-4 text-sky-400" /> LinkedIn</a>
            <a href="https://www.upwork.com/freelancers/kashifq18" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-1.5"><UpworkIcon className="w-4 h-4 text-emerald-400" /> Upwork</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Styled Social Icons
const GitHubIcon = ({ className }: { className?: string }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;

const LinkedInIcon = ({ className }: { className?: string }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;

const UpworkIcon = ({ className }: { className?: string }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M18.561 3.282c-2.477 0-4.493 2.016-4.493 4.493a4.46 4.46 0 0 0 .193 1.293L11.1 11.23V7.775c0-2.477-2.016-4.493-4.493-4.493S2.114 5.298 2.114 7.775V11.23H.236v2.361h1.878V20.718h2.361V13.59h3.766c2.477 0 4.493-2.016 4.493-4.493V7.775c0-1.173.955-2.128 2.128-2.128s2.128.955 2.128 2.128c0 1.173-.955 2.128-2.128 2.128-.31 0-.61-.06-.883-.17l-1.396 2.083c.71.3 1.48.463 2.279.463 2.477 0 4.493-2.016 4.493-4.493s-2.016-4.493-4.493-4.493zM11.1 13.59l2.766 4.128 2.766-4.128-2.766-4.128-2.766 4.128z"/></svg>;
