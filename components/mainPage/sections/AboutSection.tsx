"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  MapPin, Dumbbell, Zap, BookOpen, Heart, Sparkles
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const cardBase =
  "relative overflow-hidden rounded-2xl backdrop-blur-sm transition-shadow duration-300";

const techStack = [
  { name: "Python",     color: "#3b82f6" },
  { name: "TypeScript", color: "#8b5cf6" },
  { name: "React",      color: "#06b6d4" },
  { name: "Next.js",    color: "#a3a3a3" },
  { name: "PyTorch",    color: "#ef4444" },
  { name: "TensorFlow", color: "#f97316" },
  { name: "Flutter",    color: "#60a5fa" },
  { name: "Node.js",    color: "#22c55e" },
  { name: "FastAPI",    color: "#10b981" },
  { name: "PostgreSQL", color: "#818cf8" },
  { name: "Docker",     color: "#38bdf8" },
  { name: "Git",        color: "#fb923c" },
];

const cardGradients = [
  "linear-gradient(135deg, rgba(147,197,253,0.45), rgba(167,139,250,0.3), transparent 70%)",
  "linear-gradient(120deg, rgba(96,165,250,0.4), rgba(52,211,153,0.25), transparent 70%)",
  "linear-gradient(160deg, rgba(52,211,153,0.4), rgba(147,197,253,0.2), transparent 65%)",
  "linear-gradient(110deg, rgba(167,139,250,0.4), rgba(96,165,250,0.25), transparent 70%)",
  "linear-gradient(145deg, rgba(251,191,36,0.3), rgba(248,113,113,0.2), transparent 70%)",
  "linear-gradient(90deg, rgba(147,197,253,0.35), rgba(167,139,250,0.2), transparent 60%)",
];

function GlowCard({ children, className, gradientIndex, style }: {
  children: React.ReactNode; className?: string; gradientIndex: number; style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const gradient = cardGradients[gradientIndex % cardGradients.length];
  return (
    <div
      className={`${cardBase} ${className ?? ""}`}
      style={{
        ...style,
        background: "var(--card-surface, rgba(255,255,255,0.7))",
        border: "1px solid var(--card-border, rgba(99,102,241,0.12))",
        boxShadow: hovered
          ? `0 0 0 1px rgba(129,140,248,0.2), 0 8px 32px -8px var(--shadow-color, rgba(0,0,0,0.1))`
          : `0 0 0 1px transparent, 0 2px 8px -4px var(--shadow-color, rgba(0,0,0,0.06))`,
        transition: "box-shadow 0.35s ease, background 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: "inherit", padding: "1px",
        background: gradient,
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
        opacity: hovered ? 1 : 0, transition: "opacity 0.35s ease",
        pointerEvents: "none", zIndex: 10,
      }} />
      <span aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: "inherit",
        background: gradient.replace(/0\.\d+\)/g, (m) => `${parseFloat(m) * 0.12})`),
        opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease",
        pointerEvents: "none", zIndex: 0,
      }} />
      {children}
    </div>
  );
}

// Single ticker pill. Hovering it pauses the whole track (handled by the
// parent) and makes just this chip pop: bigger, sharp, above its neighbours.
function TickerChip({ tech }: { tech: { name: string; color: string } }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-transform duration-300 ease-out hover:z-30 hover:scale-125 sm:px-3.5 sm:text-sm"
      style={{
        borderColor: `${tech.color}25`,
        background: `${tech.color}0d`,
        color: `${tech.color}cc`,
      }}
    >
      <span className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: tech.color, boxShadow: `0 0 6px ${tech.color}80` }} />
      {tech.name}
    </span>
  );
}

// Infinite marquee of tech chips (the array is duplicated and the track
// animates exactly -50%, so the loop point is invisible — it never
// visibly "restarts"). Hovering pauses the whole strip so chips are easy
// to read, and real backdrop-blur panels sit at each edge so whatever
// chip happens to be scrolling underneath blurs live as it enters/exits —
// no duplicate blurred track, no mask-alignment bugs.
function StackTicker() {
  const [paused, setPaused] = useState(false);
  const doubled = [...techStack, ...techStack];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex gap-2.5 whitespace-nowrap sm:gap-3"
        style={{
          animation: "ticker 36s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((tech, i) => (
          <TickerChip key={i} tech={tech} />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-20"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          background: "linear-gradient(to right, var(--ticker-fade), transparent)",
          maskImage: "linear-gradient(to right, black, transparent)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-20"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          background: "linear-gradient(to left, var(--ticker-fade), transparent)",
          maskImage: "linear-gradient(to left, black, transparent)",
          WebkitMaskImage: "linear-gradient(to left, black, transparent)",
        }}
      />
    </div>
  );
}

function SkillBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-wide" style={{ color: `${color}cc` }}>{label}</span>
        <span className="font-mono text-[11px]" style={{ color: `${color}70` }}>{pct}%</span>
      </div>
      <div className="h-px w-full rounded-full" style={{ background: `${color}18` }}>
        <motion.div className="h-px rounded-full" style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }} />
      </div>
    </div>
  );
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[13px] tracking-[0.28em] uppercase sm:text-[14px]" style={{ color: "var(--section-label)" }}>{children}</span>
);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="about"
      className="relative px-4 py-16 sm:px-8 sm:py-24 lg:px-16 lg:py-32"
      style={{ background: "transparent" }}>
      <style jsx global>{`
        .font-syne { font-family: var(--font-heading), sans-serif; }
        .font-dm   { font-family: var(--font-dm), sans-serif; }
        .font-mono { font-family: var(--font-mono-jb), monospace; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation: ticker"] { animation: none !important; }
        }
      `}</style>

      <div className="container mx-auto max-w-6xl">

        {/* Section label */}
        <motion.div {...fadeUp(0)} className="mb-8 flex items-center gap-4 sm:mb-12">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--section-num)" }}>02 —</span>
          <span className="font-syne text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--section-label)" }}>About</span>
          <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--divider)" }} />
        </motion.div>

        {/* ── BENTO ──
            True masonry via CSS columns: each card only takes its own
            height and the next one flows immediately below it in the
            same column, so uneven card heights (Bio vs. FunFact, say)
            never leave dead space — the browser balances column height
            for us instead of us guessing row spans. */}
        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">

          {/* Bio */}
          <motion.div {...fadeUp(0.05)} className="mb-3 break-inside-avoid">
            <GlowCard gradientIndex={0} className="flex h-full flex-col justify-between p-6 sm:p-7 min-h-[280px] sm:min-h-[320px]">
              <div>
                <div className="mb-4 sm:mb-5"><SectionLabel>Who I am</SectionLabel></div>
                <h2 className="font-syne mb-4 text-2xl font-bold leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl">
                  <span style={{ color: "var(--text-primary)" }}>I build things</span><br />
                  <span className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(110deg, #60a5fa, #c084fc)" }}>
                    that think.
                  </span>
                </h2>
                <p className="font-dm mb-4 text-sm leading-[1.9] sm:text-base" style={{ color: "var(--text-secondary)" }}>
                  I&apos;m a web developer focused on building modern websites and web applications — from creating user interfaces to developing complete, functional products.
                </p>
                <p className="font-dm text-sm leading-[1.9]" style={{ color: "var(--text-muted)" }}>
                  I work across the full stack, building clean, responsive interfaces and reliable applications.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--text-muted)" }} />
                <span className="font-mono text-[13px] sm:text-[15px]" style={{ color: "var(--text-muted)" }}>
                  India &nbsp;·&nbsp; Available remote
                </span>
              </div>
              <div className="absolute inset-0 -z-10 opacity-[0.025]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }} />
            </GlowCard>
          </motion.div>
          {/* Skills */}
          <motion.div {...fadeUp(0.2)} className="mb-3 break-inside-avoid">
            <GlowCard gradientIndex={3} className="h-full p-5 sm:p-6">
              <div className="mb-4 sm:mb-5"><SectionLabel>Core skills</SectionLabel></div>
              <div className="flex flex-col gap-3.5">
                <SkillBar label="DSA" pct={68} color="#93c5fd" delay={0.3} />
                <SkillBar label="React / Next.js"  pct={82} color="#c4b5fd" delay={0.4} />
                <SkillBar label="Machine Learning" pct={75} color="#67e8f9" delay={0.5} />
                <SkillBar label="Backend / APIs"   pct={79} color="#86efac" delay={0.6} />
                <SkillBar label="UI / UX Design"   pct={70} color="#fca5a5" delay={0.7} />
              </div>
            </GlowCard>
          </motion.div>
          {/* Fun fact */}
          <motion.div {...fadeUp(0.45)} className="mb-3 break-inside-avoid">
            <GlowCard gradientIndex={5} className="flex flex-col justify-between p-5 sm:p-6">
              <div>
                <div className="mb-4"><SectionLabel>Fun fact</SectionLabel></div>
                <p className="font-dm text-sm leading-[1.85] sm:text-base" style={{ color: "var(--text-tertiary)" }}>
                  I&apos;ve started more projects than I&apos;ve completed 😅.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <Dumbbell className="h-4 w-4 shrink-0" style={{ color: "rgba(251,146,60,0.55)" }} />
                <span className="font-dm text-[11px]" style={{ color: "rgba(251,146,60,0.4)" }}>
                  Fuelled by coffee &amp; curiosity
                </span>
              </div>
            </GlowCard>
          </motion.div>
          

          {/* Quote */}
          <motion.div {...fadeUp(0.35)} className="mb-3 break-inside-avoid">
            <GlowCard gradientIndex={4} className="flex h-full flex-col justify-between p-6 sm:p-7">
              <Sparkles className="mb-4 h-5 w-5" style={{ color: "rgba(251,191,36,0.35)" }} />
              <blockquote>
                <p className="font-dm text-base font-light italic leading-[1.65] sm:text-lg"
                  style={{ color: "var(--text-secondary)" }}>
                  &ldquo;Good software is invisible — it just works, and people
                  don&apos;t have to think about it.&rdquo;
                </p>
              </blockquote>
              <div className="mt-5 flex items-center gap-2">
                <Heart className="h-3 w-3 shrink-0" style={{ color: "rgba(244,114,182,0.55)" }} />
                <span className="font-mono text-[10px] tracking-wide" style={{ color: "rgba(244,114,182,0.4)" }}>
                  Design philosophy
                </span>
              </div>
            </GlowCard>
          </motion.div>
          {/* Status */}
          <motion.div {...fadeUp(0.15)} className="mb-3 break-inside-avoid">
            <GlowCard gradientIndex={2} className="flex h-full flex-col justify-between p-5 sm:p-6">
              <div>
                <div className="mb-7"><SectionLabel>Current status</SectionLabel></div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-dm text-xs" style={{ color: "rgba(52,211,153,0.8)" }}>Open to work</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Zap className="h-3.5 w-3.5 shrink-0" style={{ color: "rgba(251,191,36,0.7)" }} />
                    <span className="font-dm text-xs" style={{ color: "rgba(251,191,36,0.55)" }}>Building side projects</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="h-3.5 w-3.5 shrink-0" style={{ color: "rgba(96,165,250,0.7)" }} />
                    <span className="font-dm text-xs" style={{ color: "rgba(147,197,253,0.55)" }}>Learning LLM fine-tuning</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-lg px-3 py-2.5 text-center"
                style={{ background: "rgba(147,197,253,0.08)", border: "1px solid rgba(147,197,253,0.18)" }}>
                <span className="font-mono text-[10px]" style={{ color: "rgba(147,197,253,0.7)" }}>GMT +5:30 · IST</span>
              </div>
            </GlowCard>
          </motion.div>



        </div>

        {/* Tech ticker — full width, outside the masonry columns on purpose;
            a marquee inside a column would get clipped to that column's width. */}
        <motion.div {...fadeUp(0.1)} className="mt-3">
          <GlowCard gradientIndex={2} className="px-4 py-4 sm:px-6 sm:py-5">
            <StackTicker />
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}