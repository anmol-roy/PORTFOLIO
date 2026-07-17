"use client";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

interface Tech {
  name: string;
  icon: string;
  color: string;
}

const STACK: { category: string; items: Tech[] }[] = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "devicon-python-plain", color: "#3b82f6" },
      { name: "TypeScript", icon: "devicon-typescript-plain", color: "#60a5fa" },
      { name: "Dart", icon: "devicon-dart-plain", color: "#67e8f9" },
      { name: "Go", icon: "devicon-go-plain", color: "#86efac" },
      { name: "C++", icon: "devicon-cplusplus-plain", color: "#c4b5fd" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "devicon-react-original", color: "#67e8f9" },
      { name: "Next.js", icon: "devicon-nextjs-plain", color: "#64748b" },
      { name: "Flutter", icon: "devicon-flutter-plain", color: "#60a5fa" },
      { name: "Tailwind", icon: "devicon-tailwindcss-plain", color: "#38bdf8" },
      { name: "Figma", icon: "devicon-figma-plain", color: "#f472b6" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "PyTorch", icon: "devicon-pytorch-plain", color: "#fb923c" },
      { name: "TensorFlow", icon: "devicon-tensorflow-original", color: "#f97316" },
      { name: "NumPy", icon: "devicon-numpy-plain", color: "#93c5fd" },
      { name: "OpenCV", icon: "devicon-opencv-plain", color: "#86efac" },
      { name: "Jupyter", icon: "devicon-jupyter-plain", color: "#fbbf24" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "FastAPI", icon: "devicon-fastapi-plain", color: "#10b981" },
      { name: "Node.js", icon: "devicon-nodejs-plain", color: "#22c55e" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain", color: "#818cf8" },
      { name: "Redis", icon: "devicon-redis-plain", color: "#f87171" },
      { name: "MongoDB", icon: "devicon-mongodb-plain", color: "#4ade80" },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", icon: "devicon-docker-plain", color: "#38bdf8" },
      { name: "Git", icon: "devicon-git-plain", color: "#fb923c" },
      { name: "Linux", icon: "devicon-linux-plain", color: "#fbbf24" },
      { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark", color: "#fb923c" },
      { name: "GitHub", icon: "devicon-github-original", color: "#64748b" },
    ],
  },
];

function TechPill({ tech, index }: { tech: Tech; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="group relative flex items-center gap-2.5 rounded-full px-3.5 py-2 cursor-default transition-all duration-300"
      style={{
        background: "var(--card-bg, rgba(255,255,255,0.03))",
        border: "1px solid var(--divider, rgba(255,255,255,0.06))",
      }}
    >
      {/* Subtle color dot indicator */}
      <span 
        className="h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
        style={{ background: tech.color }}
      />
      
      <i 
        className={`${tech.icon} text-[15px] transition-all duration-300`}
        style={{ color: "var(--text-muted)" }}
      />
      
      <span 
        className="text-[13px] font-[450] tracking-wide transition-colors duration-300"
        style={{ color: "var(--text-muted)" }}
      >
        {tech.name}
      </span>

      {/* Hover glow */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${tech.color}15 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

export default function TechStackSection() {
  return (
    <section
      id="tech-stack"
      className="relative px-6 sm:px-10 lg:px-16 py-14 sm:py-20"
      style={{ background: "transparent" }}
    >
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

      <div className="container mx-auto max-w-3xl">
        
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-12 flex items-center gap-4">
          <span 
            className="text-[11px] font-medium tracking-[0.3em] uppercase"
            style={{ color: "var(--section-num)" }}
          >
            05 — Tech Stack
          </span>
          <span 
            className="h-px flex-1 max-w-[60px]" 
            style={{ background: "var(--divider)" }} 
          />
        </motion.div>

        {/* Content */}
        <div className="space-y-10">
          {STACK.map((group, gi) => (
            <motion.div
              key={group.category}
              {...fadeUp(0.08 + gi * 0.06)}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
            >
              {/* Category label */}
              <div className="sm:w-28 shrink-0">
                <span 
                  className="text-[11px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: "var(--text-faint)" }}
                >
                  {group.category}
                </span>
              </div>
              
              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((tech, ti) => (
                  <TechPill key={tech.name} tech={tech} index={ti} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle bottom accent */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-16 h-px w-full"
          style={{ 
            background: "linear-gradient(to right, var(--divider), transparent)" 
          }}
        />
      </div>
    </section>
  );
}