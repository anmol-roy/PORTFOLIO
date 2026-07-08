'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Users, Sparkles, Globe, Code2, BarChart3 } from 'lucide-react'

interface HeroSectionProps {
  onScroll: (sectionId: string) => void
}

// Animated counter hook
function useCounter(target: number, duration = 1.8, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return value
}

function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [started, setStarted] = useState(false)
  const count = useCounter(value, 1.6, started)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => setStarted(true)}
      className="group"
    >
      <div className="flex items-end gap-0.5">
        <span
          className="text-3xl xl:text-4xl font-bold tabular-nums"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {count}
        </span>
        <span className="text-xl font-bold mb-0.5" style={{ color: '#06b6d4' }}>{suffix}</span>
      </div>
      <p className="text-[12px] uppercase tracking-widest mt-1 font-medium" style={{ color: 'rgba(232,245,241,0.4)' }}>
        {label}
      </p>
    </motion.div>
  )
}

// Floating card for the right panel
function FloatingCard({ children, style, animate, transition, className = '' }: any) {
  return (
    <motion.div
      style={{
        background: 'rgba(15,43,35,0.7)',
        border: '1px solid rgba(6,182,212,0.12)',
        backdropFilter: 'blur(12px)',
        borderRadius: 16,
        ...style,
      }}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function HeroSection({ onScroll }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Subtle mouse parallax for right panel
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 80, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 80, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 md:pb-32 lg:pb-40 min-h-screen flex items-center"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* JSON-LD ProfessionalService Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Anmol Roy Digital Solutions",
            "image": "https://anmolroy.dev/images/githubdp.jpg",
            "url": "https://anmolroy.dev/solutions",
            "telephone": "+1-234-567-890",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Mumbai",
              "addressRegion": "MH",
              "addressCountry": "IN"
            },
            "provider": {
              "@type": "Person",
              "name": "Anmol Roy"
            },
            "serviceType": "Web Development Services",
            "areaServed": "Worldwide",
            "description": "Specializing in high-converting, performance-obsessed websites for local businesses including restaurants, gyms, and institutes."
          })
        }}
      />

      {/* ── Background ── */}
      {/* Radial glow top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', left: '-10%', width: '60%', height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Radial glow bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', right: '-5%', width: '50%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(6, 81, 212, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ══ LEFT CONTENT ══ */}
          <div className="flex flex-col">

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 mb-10 w-fit px-4 py-2 rounded-full"
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#10b981' }} />
                <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: '#10b981' }} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6ee7b7' }}>
                Available for Projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.1 }}
            >
              <h1 className="sr-only">Anmol Roy | Freelance Web Developer Solutions</h1>
              <div className="flex flex-col">
                {[
                  { text: 'Anmol.', style: { color: '#e8f5f1' }, delay: 0.1 },
                  { text: 'I build', gradient: true, delay: 0.2 },
                  { text: 'digital', style: { color: '#e8f5f1' }, delay: 0.3 },
                  { text: 'empires.', italic: true, delay: 0.4 },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span
                      className={`block text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight ${line.italic ? 'italic font-light' : ''}`}
                      style={
                        line.gradient
                          ? {
                              background: 'linear-gradient(135deg, #22aaee 0%, #1075b9 50%, #6e7ce7 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }
                          : line.italic
                          ? { color: 'rgba(232,245,241,0.35)', fontWeight: 300 }
                          : line.style
                      }
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg leading-relaxed mb-10 max-w-lg pl-5"
              style={{
                color: 'rgba(232,245,241,0.55)',
                borderLeft: '2px solid rgba(6,182,212,0.4)',
              }}
            >
              Specializing in high-converting, performance-obsessed websites for local businesses. Restaurants, gyms, and institutes — turned into digital powerhouses.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              <motion.button
                onClick={() => onScroll('portfolio')}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden focus:outline-none"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
                  color: '#0a1612',
                  boxShadow: '0 0 0 1px rgba(6,182,212,0.3), 0 8px 32px rgba(6,182,212,0.2)',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 0 1px rgba(6,182,212,0.5), 0 12px 40px rgba(6,182,212,0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                onClick={() => onScroll('contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold focus:outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(232,245,241,0.8)',
                }}
                whileHover={{
                  background: 'rgba(6,182,212,0.08)',
                  borderColor: 'rgba(6,182,212,0.3)',
                  color: '#e8f5f1',
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.97 }}
              >
                Book a Consultation
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex items-center gap-10 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <StatCounter value={500} suffix="+" label="Projects" delay={0.85} />
              <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.07)' }} />
              <StatCounter value={98} suffix="%" label="Perf Score" delay={0.9} />
              <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.07)' }} />
              <StatCounter value={12} suffix="+" label="Years" delay={0.95} />
            </motion.div>
          </div>

          {/* ══ RIGHT: 3D card cluster ══ */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-[420px]"
            >

              {/* ── Main browser card ── */}
              <FloatingCard style={{ overflow: 'hidden' }}>
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-3 px-5 py-3.5"
                  // background
                  style={{ borderBottom: '1px solid rgba(6, 68, 212, 0.1)', background: 'rgba(21, 53, 82, 0.225)' }}
                >
                  <div className="flex gap-1.5">
                    {['#ef4444','#f59e0b','#10b981'].map((c, i) => (
                      <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.8 }} />
                    ))}
                  </div>
                  <div
                    className="flex-1 mx-4 px-3 py-1 rounded-md text-[11px] font-mono"
                    style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(232,245,241,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    anmol.dev
                  </div>
                  <Globe className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
                </div>

                {/* Page content sim */}
                <div className="p-5 space-y-4">
                  {/* Hero bar */}
                  <motion.div
                    className="h-28 rounded-xl overflow-hidden relative"
                    style={{ background: 'linear-gradient(135deg, rgba(6, 81, 212, 0.15) 0%, rgba(16, 168, 185, 0.15) 100%)', border: '1px solid rgba(6,182,212,0.12)' }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(6,182,212,0.08) 50%, transparent 60%)' }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-[11px] font-mono mb-1" style={{ color: 'rgba(110, 175, 231, 0.6)' }}>lighthouse score</div>
                        <div className="text-4xl font-black" style={{ color: '#106ab9' }}>98</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Skeleton lines */}
                  <div className="space-y-2">
                    {[75, 55, 65].map((w, i) => (
                      <motion.div
                        key={i}
                        className="h-2 rounded-full"
                        style={{ width: `${w}%`, background: 'rgba(255,255,255,0.06)' }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      />
                    ))}
                  </div>

                  {/* Mini stat cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Zap, value: '98%', label: 'Performance', color: '#065cd4' },
                      { icon: Users, value: '100+', label: 'Clients', color: '#1086b9' },
                    ].map(({ icon: Icon, value, label, color }, i) => (
                      <motion.div
                        key={i}
                        className="p-3.5 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                        whileHover={{ scale: 1.04, borderColor: color + '40' }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="w-4 h-4 mb-2" style={{ color }} />
                        <div className="text-xl font-bold" style={{ color: '#e8f5f1' }}>{value}</div>
                        <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(232,245,241,0.4)' }}>{label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Code snippet */}
                  <div
                    className="rounded-xl p-4 font-mono text-[11px] leading-relaxed"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(6,182,212,0.1)' }}
                  >
                    <span style={{ color: 'rgba(232,245,241,0.3)' }}>// stack</span>
                    <br />
                    <span style={{ color: '#06b6d4' }}>const</span>
                    <span style={{ color: '#e8f5f1' }}> stack </span>
                    <span style={{ color: 'rgba(232,245,241,0.4)' }}>= [</span>
                    {['Next.js', 'Tailwind', 'Framer'].map((s, i) => (
                      <span key={i}>
                        <br />
                        <span style={{ color: '#10b981' }}>  "{s}"</span>
                        {i < 2 && <span style={{ color: 'rgba(232,245,241,0.3)' }}>,</span>}
                      </span>
                    ))}
                    <br />
                    <span style={{ color: 'rgba(232,245,241,0.4)' }}>]</span>
                  </div>
                </div>
              </FloatingCard>

              {/* ── Floating badge: response time ── */}
              <motion.div
                className="absolute -top-5 -right-8 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                style={{
                  background: 'rgba(10, 20, 22, 0.9)',
                  border: '1px solid rgba(6,182,212,0.2)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
                  <Zap className="w-4 h-4" style={{ color: '#06b6d4' }} />
                </div>
                <div>
                  <div className="text-[11px] font-bold" style={{ color: '#e8f5f1' }}>0.8s load</div>
                  <div className="text-[10px]" style={{ color: 'rgba(232,245,241,0.4)' }}>avg delivery</div>
                </div>
              </motion.div>

              {/* ── Floating badge: clients ── */}
              <motion.div
                className="absolute -bottom-5 -left-8 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                style={{
                  background: 'rgba(10, 16, 22, 0.9)',
                  border: '1px solid rgba(16, 154, 185, 0.2)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <BarChart3 className="w-4 h-4" style={{ color: '#10b981' }} />
                </div>
                <div>
                  <div className="text-[11px] font-bold" style={{ color: '#e8f5f1' }}>+340% avg ROI</div>
                  <div className="text-[10px]" style={{ color: 'rgba(232,245,241,0.4)' }}>for clients</div>
                </div>
              </motion.div>

              {/* ── Background glow ── */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl"
                style={{
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(86, 131, 197, 0.12) 0%, rgba(16,185,129,0.08) 50%, transparent 80%)',
                  filter: 'blur(32px)',
                  transform: 'scale(1.15)',
                }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}