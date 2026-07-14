"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import {
  ExternalLink, Github, ArrowUpRight, ChevronRight,
  Cpu, Globe, Smartphone, Terminal, Database, Layers, GraduationCap, HeartPulse, Box, FileSearch, Activity, Brain
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

type Category = "All" | "AI/ML" | "Web" | "Mobile" | "Tool";

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  category: Category | Category[];
  tags: string[];
  tagColors: string[];
  accent: string;
  accentMuted: string;
  icon: React.ElementType;
  iconColor: string;
  year: string;
  status: "Live" | "WIP" | "Open Source";
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string; color: string }[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Interview Prep",
    tagline: "Personalized AI interview coach powered by your resume",
    description:
      "An AI-powered interview preparation platform that analyzes resumes and job descriptions to generate personalized interview reports, technical and behavioral questions, skill gap analysis, ATS scores, and structured preparation roadmaps within seconds.",
    category: "AI/ML",
    tags: ["React", "Node.js", "Express", "MongoDB", "Gemini AI", "JWT"],
    tagColors: ["#60a5fa", "#34d399", "#c084fc", "#fbbf24", "#fb923c", "#86efac"],
    accent: "#60a5fa",
    accentMuted: "rgba(96,165,250,0.06)",
    icon: Brain,
    iconColor: "#60a5fa",
    year: "2026",
    status: "Live",
    featured: true,
    liveUrl: "https://ai-upskill-engine.vercel.app/onboarding",
    githubUrl: "https://github.com/anmol-roy/Ai-upskilling-engine",
    metrics: [
      { label: "Interview Report", value: "~30s", color: "#60a5fa" },
      { label: "AI Questions", value: "15+", color: "#34d399" },
      { label: "Resume Match", value: "0–100", color: "#c084fc" },
    ],
  },

  {
    id: 2,
    title: "GlucoAI",
    tagline: "AI-powered non-invasive blood glucose prediction",
    description:
      "A machine learning research prototype that predicts blood glucose levels from PPG signals and blood pressure data. Features real-time waveform visualization, an AI prediction pipeline, trend forecasting, and interactive health reports.",
    category: "AI/ML",
    tags: ["JavaScript", "HTML/CSS", "XGBoost", "LSTM", "Chart.js", "Machine Learning"],
    tagColors: ["#fbbf24", "#60a5fa", "#34d399", "#c084fc", "#fb923c", "#86efac"],
    accent: "#34d399",
    accentMuted: "rgba(52,211,153,0.06)",
    icon: Activity,
    iconColor: "#34d399",
    year: "2026",
    status: "Research Prototype",
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    metrics: [
      { label: "ML Models", value: "5", color: "#34d399" },
      { label: "Prediction", value: "<2s", color: "#60a5fa" },
      { label: "Primary Model", value: "XGBoost", color: "#c084fc" },
    ],
  },

  {
    id: 3,
    title: "BP Estimator",
    tagline: "Mobile blood pressure estimation using on-device AI",
    description:
      "A cross-platform Flutter application that estimates systolic and diastolic blood pressure from PPG signals using a TensorFlow Lite model. Demonstrates on-device machine learning inference with real-time predictions and a responsive Material Design interface.",
    category: ["AI/ML", "Mobile"],
    tags: ["Flutter", "Dart", "TensorFlow Lite", "Machine Learning", "PPG", "Material Design"],
    tagColors: ["#60a5fa", "#67e8f9", "#34d399", "#c084fc", "#fb923c", "#fbbf24"],
    accent: "#fb7185",
    accentMuted: "rgba(251,113,133,0.06)",
    icon: HeartPulse,
    iconColor: "#fb7185",
    year: "2026",
    status: "Research Prototype",
    featured: false,
    githubUrl: "https://github.com/anmol-roy/SBP_DBP-prediction-model-with-flutter-application",
    metrics: [
      { label: "Platforms", value: "6", color: "#60a5fa" },
      { label: "Input Size", value: "1024", color: "#34d399" },
      { label: "ML Runtime", value: "TFLite", color: "#c084fc" },
    ],
  },

  {
    id: 4,
    title: "STEMifyX",
    tagline: "Gamified STEM learning platform for modern education",
    description:
      "A full-stack EdTech platform featuring gamified learning, role-based dashboards, Firebase authentication, multilingual support, career guidance, and progress tracking for students, teachers, parents, and administrators.",
    category: "Web",
    tags: ["JavaScript", "Firebase", "Tailwind CSS", "Firestore", "HTML/CSS", "Responsive UI"],
    tagColors: ["#fbbf24", "#34d399", "#60a5fa", "#c084fc", "#fb923c", "#67e8f9"],
    accent: "#a78bfa",
    accentMuted: "rgba(167,139,250,0.06)",
    icon: GraduationCap,
    iconColor: "#a78bfa",
    year: "2026",
    status: "Completed",
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    metrics: [
      { label: "User Roles", value: "4", color: "#a78bfa" },
      { label: "Languages", value: "3", color: "#34d399" },
      { label: "Education", value: "Classes 6–12", color: "#60a5fa" },
    ],
  },

  {
    id: 5,
    title: "3D Apple Website",
    tagline: "Immersive product showcase with real-time 3D interactions",
    description:
      "A pixel-perfect recreation of Apple's product landing page using React Three Fiber, WebGL, and GSAP-powered scroll animations to deliver an immersive, responsive product experience.",
    category: "Web",
    tags: ["React", "Three.js", "React Three Fiber", "GSAP", "Tailwind CSS", "Vite"],
    tagColors: ["#60a5fa", "#34d399", "#67e8f9", "#c084fc", "#fbbf24", "#fb923c"],
    accent: "#67e8f9",
    accentMuted: "rgba(103,232,249,0.06)",
    icon: Box,
    iconColor: "#67e8f9",
    year: "2026",
    status: "Live",
    featured: false,
    liveUrl: "https://3d-apple-website-roan.vercel.app",
    githubUrl: "https://github.com/anmol-roy/-3d-apple-website",
    metrics: [
      { label: "3D Engine", value: "WebGL", color: "#67e8f9" },
      { label: "Animation", value: "GSAP", color: "#c084fc" },
      { label: "Rendering", value: "Real-time", color: "#34d399" },
    ],
  },

  {
    id: 6,
    title: "AI Resume Analyzer",
    tagline: "Intelligent ATS resume analysis in the browser",
    description:
      "A React-based AI resume analyzer that evaluates resumes against job descriptions, generates ATS-style scores, and provides actionable improvement suggestions using client-side PDF parsing and modern UI interactions.",
    category: "AI/ML",
    tags: ["React", "TypeScript", "Tailwind CSS", "Zustand", "PDF.js", "Framer Motion"],
    tagColors: ["#60a5fa", "#c084fc", "#34d399", "#fbbf24", "#fb923c", "#67e8f9"],
    accent: "#fbbf24",
    accentMuted: "rgba(251,191,36,0.06)",
    icon: FileSearch,
    iconColor: "#fbbf24",
    year: "2026",
    status: "Live",
    featured: false,
    liveUrl: "https://analyzer-resume.vercel.app",
    githubUrl: "#",
    metrics: [
      { label: "Processing", value: "Client-side", color: "#60a5fa" },
      { label: "ATS Analysis", value: "Instant", color: "#34d399" },
      { label: "PDF Parsing", value: "In-browser", color: "#c084fc" },
    ],
  },
];

const CATEGORIES: Category[] = ["All", "AI/ML", "Web", "Mobile"];

const statusConfig: Record<string, { color: string; border: string; bg: string }> = {
  Live:                { color: "#34d399", border: "rgba(52,211,153,0.28)",  bg: "rgba(52,211,153,0.09)"  },
  "Open Source":       { color: "#93c5fd", border: "rgba(147,197,253,0.28)", bg: "rgba(147,197,253,0.09)" },
  WIP:                 { color: "#fbbf24", border: "rgba(251,191,36,0.28)",  bg: "rgba(251,191,36,0.09)"  },
  Completed:           { color: "#a78bfa", border: "rgba(167,139,250,0.28)", bg: "rgba(167,139,250,0.09)" },
  "Research Prototype":{ color: "#fb923c", border: "rgba(251,146,60,0.28)",  bg: "rgba(251,146,60,0.09)"  },
};

const DEFAULT_STATUS = { color: "#94a3b8", border: "rgba(148,163,184,0.28)", bg: "rgba(148,163,184,0.09)" };

// ─── Directional glow border ──────────────────────────────────────────────────
function useDirectionalBorder(accent: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [grad, setGrad] = useState("none");
  const [opacity, setOpacity] = useState(0);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const dL = x, dR = 1-x, dT = y, dB = 1-y;
    const min = Math.min(dL, dR, dT, dB);
    let angle = min===dL ? 270 : min===dR ? 90 : min===dT ? 0 : 180;
    const s = 55;
    setGrad(`conic-gradient(from ${angle-s}deg at ${x*100}% ${y*100}%, transparent 0deg, ${accent}cc ${s*.6}deg, ${accent} ${s}deg, ${accent}cc ${s*1.4}deg, transparent ${s*2}deg, transparent 360deg)`);
    setOpacity(1);
  }, [accent]);

  const onMouseLeave = useCallback(() => setOpacity(0), []);
  return { ref, grad, opacity, onMouseMove, onMouseLeave };
}

function GlowBorderCard({ children, accent, className, onMouseEnter, onMouseLeave: ext }: {
  children: React.ReactNode; accent: string; className?: string;
  onMouseEnter?: () => void; onMouseLeave?: () => void;
}) {
  const { ref, grad, opacity, onMouseMove, onMouseLeave } = useDirectionalBorder(accent);
  return (
    <div ref={ref}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-sm ${className ?? ""}`}
      style={{ 
        border: "1px solid var(--card-border)", 
        background: "var(--card-surface, rgba(255,255,255,0.7))",
        boxShadow: "0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))"
      }}
      onMouseMove={onMouseMove} onMouseEnter={onMouseEnter}
      onMouseLeave={() => { onMouseLeave(); ext?.(); }}>
      <span aria-hidden style={{
        position:"absolute", inset:0, borderRadius:"inherit", padding:"1px",
        background: grad,
        WebkitMask:"linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite:"xor", maskComposite:"exclude",
        opacity, transition:"opacity 0.3s ease", pointerEvents:"none", zIndex:20,
      }}/>
      {children}
    </div>
  );
}

function TagPill({ tag, color }: { tag: string; color: string }) {
  return (
    <span className="font-mono rounded-md border px-2.5 py-0.5"
      style={{ fontSize:"11.7px", color:`${color}d9`, background:`${color}0e`, borderColor:`${color}28` }}>
      {tag}
    </span>
  );
}

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: Project }) {
  const Icon = project.icon;
  const [hovered, setHovered] = useState(false);
  const sc = statusConfig[project.status] ?? DEFAULT_STATUS;

  return (
    <motion.div {...fadeUp(0.1)}>
      <GlowBorderCard accent={project.accent} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <motion.div className="absolute inset-0 -z-10" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ background:`radial-gradient(ellipse 60% 50% at 70% 50%, ${project.accentMuted.replace("0.06","0.13")}, transparent)` }}/>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left */}
          <div className="p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background:`${project.iconColor}15`, border:`1px solid ${project.iconColor}30` }}>
                  <Icon className="h-5 w-5" style={{ color: project.iconColor }} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono rounded-md border px-2 py-0.5 font-medium"
                    style={{ fontSize:"11.7px", color:sc.color, borderColor:sc.border, background:sc.bg }}>
                    {project.status}
                  </span>
                  <span className="font-mono" style={{ fontSize:"11.7px", color:"var(--text-faint)" }}>{project.year}</span>
                </div>
                <span className="ml-auto font-mono rounded-md px-2 py-0.5 tracking-widest uppercase"
                  style={{ fontSize:"10.4px", color:`${project.accent}90`, background:`${project.accent}0d`, border:`1px solid ${project.accent}1f` }}>
                  Featured
                </span>
              </div>

              <h3 className="font-syne font-bold tracking-tight mb-1.5"
                style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", color:"var(--text-primary)" }}>{project.title}</h3>

              <p className="font-dm mb-4" style={{ fontSize:"15.6px", color:`${project.accent}b3` }}>{project.tagline}</p>

              <p className="font-dm mb-6 leading-[1.88] max-w-sm"
                style={{ fontSize:"14.3px", color:"var(--text-tertiary)" }}>{project.description}</p>

              <div className="mb-8 flex flex-wrap gap-1.5">
                {project.tags.map((tag,i) => <TagPill key={tag} tag={tag} color={project.tagColors[i%project.tagColors.length]} />)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="font-dm group flex items-center gap-1.5 rounded-lg px-4 py-2 font-medium transition-all duration-300"
                  style={{ fontSize:"14.3px", color:"var(--text-primary)", background:`${project.accent}18`, border:`1px solid ${project.accent}30` }}
                  onMouseEnter={(e)=>(e.currentTarget.style.background=`${project.accent}2e`)}
                  onMouseLeave={(e)=>(e.currentTarget.style.background=`${project.accent}18`)}>
                  <ExternalLink className="h-3.5 w-3.5" style={{ color:project.accent }}/>
                  Live demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="font-dm flex items-center gap-1.5 rounded-lg px-4 py-2 font-medium transition-all duration-300"
                  style={{ fontSize:"14.3px", color:"var(--text-muted)", border:"1px solid var(--card-border)" }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color="var(--text-primary)")}
                  onMouseLeave={(e)=>(e.currentTarget.style.color="var(--text-muted)")}>
                  <Github className="h-3.5 w-3.5"/>
                  Source
                </a>
              )}
            </div>
          </div>

          {/* Right — metrics */}
          <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l p-8 lg:p-10" style={{ borderColor: "var(--divider)" }}>
            <p className="font-mono mb-6 tracking-[0.25em] uppercase"
              style={{ fontSize:"11.7px", color:"var(--text-faint)" }}>Impact metrics</p>
            <div className="flex flex-col gap-6">
              {project.metrics?.map((m,i) => (
                <motion.div key={m.label}
                  initial={{ opacity:0, x:12 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:0.2+i*0.1 }}
                  className="flex flex-col gap-1">
                  <span className="font-syne font-bold tracking-tight" style={{ fontSize:"clamp(1.55rem,2.8vw,1.95rem)", color:m.color }}>
                    {m.value}
                  </span>
                  <span className="font-dm" style={{ fontSize:"14.3px", color:`${m.color}65` }}>{m.label}</span>
                  <div className="mt-1 h-px w-full" style={{ background:`${m.color}1a` }}/>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-0 right-0 h-32 w-32 opacity-[0.04]"
              style={{ backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize:"12px 12px" }}/>
          </div>
        </div>
      </GlowBorderCard>
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const [hovered, setHovered] = useState(false);
  const sc = statusConfig[project.status] ?? DEFAULT_STATUS;

  return (
    <motion.div {...fadeUp(0.05*index)}>
      <GlowBorderCard accent={project.accent} className="p-6 flex flex-col justify-between cursor-default h-full"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

        <motion.div className="absolute inset-0 -z-10" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration:0.35 }}
          style={{ background:`radial-gradient(ellipse 80% 60% at 50% 0%, ${project.accentMuted.replace("0.06","0.10")}, transparent)` }}/>

        <div>
          {/* Icon + links */}
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background:`${project.iconColor}18`, border:`1px solid ${project.iconColor}32` }}>
              <Icon className="h-4 w-4" style={{ color:project.iconColor }}/>
            </div>
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${hovered?"opacity-100":"opacity-0"}`}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] transition-colors"
                  style={{ color:`${project.accent}80` }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color=project.accent)}
                  onMouseLeave={(e)=>(e.currentTarget.style.color=`${project.accent}80`)}
                  onClick={(e)=>e.stopPropagation()}>
                  <ExternalLink className="h-3 w-3"/>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                  style={{ color:`${project.accent}80`, border:"1px solid var(--card-border)", background:"var(--card-surface)" }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color=project.accent)}
                  onMouseLeave={(e)=>(e.currentTarget.style.color=`${project.accent}80`)}
                  onClick={(e)=>e.stopPropagation()}>
                  <Github className="h-3 w-3"/>
                </a>
              )}
            </div>
          </div>

          {/* Title + badge */}
          <div className="mb-1.5 flex items-center gap-2 flex-wrap">
            <h3 className="font-syne font-bold tracking-tight" style={{ fontSize:"17.55px", color:"var(--text-primary)" }}>{project.title}</h3>
            <span className="font-mono rounded border px-1.5 py-px font-medium"
              style={{ fontSize:"10.4px", color:sc.color, borderColor:sc.border, background:sc.bg }}>
              {project.status}
            </span>
          </div>

          <p className="font-dm mb-3" style={{ fontSize:"14.3px", color:`${project.accent}99` }}>{project.tagline}</p>
          <p className="font-dm mb-5 leading-[1.78]" style={{ fontSize:"14.3px", color:"var(--text-tertiary)" }}>{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0,3).map((tag,i) => (
              <TagPill key={tag} tag={tag} color={project.tagColors[i%project.tagColors.length]}/>
            ))}
            {project.tags.length>3 && (
              <span className="font-mono px-2 py-0.5" style={{ fontSize:"11.7px", color:"var(--text-faint)" }}>
                +{project.tags.length-3}
              </span>
            )}
          </div>
        </div>

        {project.metrics && (
          <div className="mt-5 flex gap-4 pt-4" style={{ borderTop:`1px solid ${project.accent}18` }}>
            {project.metrics.slice(0,2).map((m) => (
              <div key={m.label} className="flex flex-col gap-0.5">
                <span className="font-syne font-bold" style={{ fontSize:"17.55px", color:m.color }}>{m.value}</span>
                <span className="font-mono" style={{ fontSize:"11.7px", color:`${m.color}58` }}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        <span className="font-mono absolute bottom-5 right-5" style={{ fontSize:"11.7px", color:"var(--text-faint)" }}>{project.year}</span>
      </GlowBorderCard>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const featured = PROJECTS.find((p) => p.featured)!;

  const hasCategory = (p: Project, cat: Category) => {
    const c = p.category;
    return Array.isArray(c) ? c.includes(cat) : c === cat;
  };

  const filtered = activeCategory === "All"
    ? PROJECTS.filter((p) => !p.featured)
    : PROJECTS.filter((p) => hasCategory(p, activeCategory) && !p.featured);

  return (
    <section id="projects" className="relative px-6 sm:px-10 lg:px-16 py-24 sm:py-32" style={{ background:"transparent" }}>
      <style jsx global>{`
        .font-syne { font-family: var(--font-heading), sans-serif; }
        .font-dm   { font-family: var(--font-dm), sans-serif; }
        .font-mono { font-family: var(--font-mono-jb), monospace; }
        @keyframes shimmer { from { background-position:0% center; } to { background-position:200% center; } }
      `}</style>

      <div className="container mx-auto max-w-6xl">

        {/* Section label */}
        <motion.div {...fadeUp(0)} className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono tracking-[0.3em] uppercase" style={{ fontSize:"13px", color:"var(--section-num)" }}>03 —</span>
            <span className="font-syne tracking-[0.2em] uppercase" style={{ fontSize:"13px", color:"var(--section-label)" }}>Projects</span>
            <span className="h-px w-[60px]" style={{ background:"var(--divider)" }}/>
          </div>
          <a href="#" className="group font-dm flex items-center gap-1.5 transition-colors"
            style={{ fontSize:"14.3px", color:"var(--text-muted)" }}
            onMouseEnter={(e)=>(e.currentTarget.style.color="rgba(147,197,253,0.9)")}
            onMouseLeave={(e)=>(e.currentTarget.style.color="var(--text-muted)")}>
            All work
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"/>
          </a>
        </motion.div>

        {/* Title */}
        <motion.div {...fadeUp(0.05)} className="mb-10">
          <h2 className="font-syne font-bold tracking-tight leading-[1.08]" style={{ fontSize:"clamp(2rem,5vw,4rem)", color:"var(--text-primary)" }}>
            What I've {" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage:"linear-gradient(120deg,#93c5fd 0%,#c4b5fd 45%,#f472b6 100%)", backgroundSize:"200% auto", animation:"shimmer 6s linear infinite" }}>
              Built.
            </span>
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div {...fadeUp(0.1)} className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="font-mono rounded-lg border transition-all duration-250"
              style={{
                fontSize:"13px", padding:"6.5px 18.2px",
                borderColor: activeCategory===cat ? "rgba(147,197,253,0.45)" : "var(--card-border)",
                background:   activeCategory===cat ? "rgba(147,197,253,0.12)" : "var(--card-surface)",
                color:        activeCategory===cat ? "#93c5fd"                : "var(--text-muted)",
              }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured */}
        <AnimatePresence mode="wait">
          {(activeCategory==="All" || hasCategory(featured, activeCategory)) && (
            <motion.div key="featured"
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-10 }} transition={{ duration:0.4 }} className="mb-4">
              <FeaturedCard project={featured}/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((project,i) => <ProjectCard key={project.id} project={project} index={i}/>)}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} className="mt-14 flex flex-col items-center gap-3 text-center">
          <p className="font-dm" style={{ fontSize:"15.6px", color:"var(--text-muted)" }}>More projects on GitHub</p>
          <a href="https://github.com/anmol-roy" target="_blank" rel="noopener noreferrer"
            className="group font-mono inline-flex items-center gap-2 rounded-xl transition-all duration-300"
            style={{ fontSize:"15.6px", padding:"11.7px 26px", border:"1px solid var(--card-border)", background:"var(--card-surface)", color:"var(--text-muted)" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="rgba(147,197,253,0.35)"; e.currentTarget.style.color="#93c5fd"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.borderColor="var(--card-border)"; e.currentTarget.style.color="var(--text-muted)"; }}>
            <Github className="h-4 w-4"/>
            github.com/anmol-roy
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </a>
        </motion.div>
      </div>
    </section>
  );
}