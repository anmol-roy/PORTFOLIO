'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Rocket, Layout, Database, Globe, ArrowUpRight, Code2, Star } from 'lucide-react'
import { SectionLabel } from '@/components/solutionSections/shared/SectionLabel'

const features = [
  {
    icon: Rocket,
    label: 'Performance First',
    description: 'Every site ships with 98+ Lighthouse scores—speed is non-negotiable.',
    accent: '#06b6d4',
  },
  {
    icon: Layout,
    label: 'Modern UX/UI',
    description: 'Interfaces built on clarity, hierarchy, and delightful micro-interactions.',
    accent: '#10b981',
  },
  {
    icon: Database,
    label: 'Scalable Tech',
    description: 'Next.js, TypeScript, and battle-tested architecture that grows with you.',
    accent: '#06b6d4',
  },
  {
    icon: Globe,
    label: 'SEO Optimized',
    description: 'Structured data, Core Web Vitals, and metadata that rank and convert.',
    accent: '#10b981',
  },
]

const techStack = ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'PostgreSQL', 'Vercel']

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-5 rounded-2xl overflow-hidden cursor-default transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      whileHover={{
        background: 'rgba(255,255,255,0.035)',
        borderColor: feature.accent + '30',
      }}
    >
      {/* Top glow line on hover */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to right, transparent, ${feature.accent}60, transparent)` }}
      />

      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${feature.accent}12`, border: `1px solid ${feature.accent}25` }}
      >
        <Icon className="w-4 h-4" style={{ color: feature.accent }} />
      </div>

      <h3 className="text-sm font-semibold mb-1.5" style={{ color: '#e8f5f1' }}>{feature.label}</h3>
      <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(232,245,241,0.45)' }}>{feature.description}</p>
    </motion.div>
  )
}

export function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 lg:px-16 xl:px-24 overflow-hidden">

      {/* Subtle ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%', left: '-5%', width: '40%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionLabel text="About Me" />
        </motion.div>

        {/* ══ Main grid ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 xl:gap-24 items-start">

          {/* ── LEFT: Identity card column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Profile card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(15, 43, 35, 0.001)',
                border: '1px solid rgba(6,182,212,0.12)',
              }}
            >
              {/* Cover gradient */}
              <div
                className="h-28 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(16,185,129,0.2) 100%)',
                }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(6,182,212,0.1) 50%, transparent 60%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                />
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>

              {/* Avatar area */}
              <div className="px-6 pb-6">
                <div className="flex items-end justify-between -mt-8 mb-4">
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(16,185,129,0.2) 100%)',
                      borderColor: '#0a1612',
                      boxShadow: '0 0 0 1px rgba(6,182,212,0.2)',
                    }}
                  >
                    👨‍💻
                  </div>

                  {/* Open to work badge */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: 'rgba(16,185,129,0.1)',
                      border: '1px solid rgba(16,185,129,0.2)',
                      color: '#6ee7b7',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#10b981', boxShadow: '0 0 6px #10b981', animation: 'pulse 2s infinite' }}
                    />
                    Available
                  </div>
                </div>

                <h3 className="text-base font-bold mb-0.5" style={{ color: '#e8f5f1' }}>Anmol</h3>
                <p className="text-[13px] mb-4" style={{ color: 'rgba(232,245,241,0.45)' }}>Full Stack Developer · Designer</p>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: '5+', label: 'Years' },
                    { value: '100+', label: 'Clients' },
                    { value: '500+', label: 'Projects' },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold" style={{
                        background: 'linear-gradient(135deg, #06b6d4, #10b981)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      }}>{s.value}</div>
                      <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(232,245,241,0.35)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech stack card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-4 h-4" style={{ color: '#06b6d4' }} />
                <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(232,245,241,0.4)' }}>
                  Stack
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
                    className="text-[12px] font-medium px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(6,182,212,0.08)',
                      border: '1px solid rgba(6,182,212,0.18)',
                      color: 'rgba(232,245,241,0.7)',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Social proof */}
            <div
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex -space-x-2 shrink-0">
                {['#06b6d4','#10b981','#6ee7b7','#0891b2'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{ background: `${c}30`, borderColor: '#0a1612', color: c }}
                  >
                    {['J','M','S','K'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#f59e0b' }} />
                  ))}
                </div>
                <p className="text-[12px]" style={{ color: 'rgba(232,245,241,0.5)' }}>
                  Trusted by <span style={{ color: '#e8f5f1', fontWeight: 600 }}>100+ clients</span> worldwide
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Copy + feature cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Heading */}
            <h2
              className="text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight mb-6"
              style={{ color: '#e8f5f1' }}
            >
              Crafting digital
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #2270ee 0%, #1086b9 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                solutions
              </span>{' '}
              with
              <br />
              precision.
            </h2>

            {/* Body copy */}
            <div
              className="mb-10 pl-5 space-y-4"
              style={{ borderLeft: '2px solid rgba(6,182,212,0.3)' }}
            >
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(232,245,241,0.55)' }}>
                With over <span style={{ color: '#e8f5f1', fontWeight: 500 }}>5 years</span> in web development, I specialize in high-performance applications that look exceptional and deliver real business value—not just aesthetic fluff.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(232,245,241,0.55)' }}>
                I work closely with clients to understand their goals, then translate those into scalable, maintainable products. Technical depth meets creative clarity in every project I ship.
              </p>
            </div>

            {/* Feature cards 2×2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((f, i) => (
                <FeatureCard key={f.label} feature={f} index={i} />
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <motion.button
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold focus:outline-none"
                style={{
                  background: 'linear-gradient(135deg, #0666d4 0%, #1081b9 100%)',
                  color: '#0a1612',
                  boxShadow: '0 0 0 1px rgba(6,182,212,0.3), 0 8px 24px rgba(6,182,212,0.18)',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 0 1px rgba(6,182,212,0.5), 0 12px 32px rgba(6,182,212,0.28)' }}
                whileTap={{ scale: 0.97 }}
              >
                See My Work
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              <motion.button
                className="text-sm font-medium transition-colors duration-200 focus:outline-none"
                style={{ color: 'rgba(232,245,241,0.45)' }}
                whileHover={{ color: '#e8f5f1' }}
              >
                Download CV →
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}