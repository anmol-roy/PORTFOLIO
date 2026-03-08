'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, ArrowUpRight, Globe } from 'lucide-react'
import { SectionLabel } from '@/components/solutionSections/shared/SectionLabel'
import { Projects } from '@/lib/types/entities'
import { getProjects } from '@/lib/data/projects'

export function PortfolioSection() {
  const [projects, setProjects] = useState<Projects[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data.items))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section id="portfolio" className="relative py-32 px-6 lg:px-16 xl:px-24 overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%', left: '-5%', width: '40%', height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <SectionLabel text="Portfolio" />
          <h2
            className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1] mt-5 mb-4"
            style={{ color: '#e8f5f1' }}
          >
            Featured{' '}
            <span style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              work
            </span>
          </h2>
          <p className="text-[15px] max-w-lg" style={{ color: 'rgba(232,245,241,0.45)' }}>
            A curated selection of projects — each built with precision, purpose, and performance in mind.
          </p>
        </motion.div>

        {/* Loading skeletons */}
        {isLoading ? (
          <div className="space-y-24">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-pulse">
                <div className="h-72 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)' }} />
                <div className="space-y-4">
                  <div className="h-4 w-1/3 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
                  <div className="h-8 w-2/3 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
                  <div className="h-4 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
                  <div className="h-4 w-4/5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-28">
            {projects.map((project, index) => (
              <ProjectRow key={project._id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectRow({ project, index }: { project: Projects; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0
  const techTags = project.techStack?.split(',').map((t) => t.trim()) ?? []

  // Alternate accent per project
  const accent = index % 2 === 0 ? '#06b6d4' : '#10b981'
  const accentAlt = index % 2 === 0 ? '#10b981' : '#06b6d4'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center ${
        !isEven ? 'lg:[&>*:first-child]:order-last' : ''
      }`}
    >
      {/* ── Image panel ── */}
      <div className="group relative">
        {/* Ghost number */}
        <span
          className="absolute -top-8 font-black pointer-events-none select-none leading-none"
          style={{
            fontSize: 'clamp(80px,12vw,120px)',
            color: `${accent}08`,
            left: isEven ? '-0.1em' : 'auto',
            right: isEven ? 'auto' : '-0.1em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Image card */}
        <div
          className="relative rounded-2xl overflow-hidden h-[340px] xl:h-[380px]"
          style={{
            background: `linear-gradient(135deg, ${accent}18 0%, ${accentAlt}10 100%)`,
            border: `1px solid ${accent}20`,
          }}
        >
          {/* Shimmer on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${accent}08 50%, transparent 60%)`,
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(${accent}50 1px, transparent 1px), linear-gradient(90deg, ${accent}50 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Placeholder content — swap for real <Image /> */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
            >
              <Globe className="w-8 h-8" style={{ color: accent }} />
            </div>
            <span
              className="text-[11px] font-mono uppercase tracking-widest"
              style={{ color: `${accent}70` }}
            >
              {project.projectTitle}
            </span>
          </div>

          {/* Corner badge */}
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'rgba(10,22,18,0.85)',
                border: `1px solid ${accent}35`,
                color: accent,
                backdropFilter: 'blur(8px)',
              }}
            >
              <span>Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {/* Bottom glow */}
          <div
            className="absolute bottom-0 inset-x-0 h-24 opacity-60"
            style={{
              background: `linear-gradient(to top, ${accent}18, transparent)`,
            }}
          />
        </div>
      </div>

      {/* ── Content panel ── */}
      <div className="flex flex-col">
        {/* Index + category row */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-[11px] font-mono font-bold"
            style={{ color: accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div style={{ width: 24, height: 1, background: `${accent}50` }} />
          <span
            className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              color: accent,
              background: `${accent}10`,
              border: `1px solid ${accent}25`,
            }}
          >
            Project
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-4"
          style={{ color: '#e8f5f1' }}
        >
          {project.projectTitle}
        </h3>

        {/* Description */}
        <p
          className="text-[14px] leading-relaxed mb-7 pl-4"
          style={{
            color: 'rgba(232,245,241,0.5)',
            borderLeft: `2px solid ${accent}35`,
          }}
        >
          {project.shortDescription}
        </p>

        {/* Tech tags */}
        {techTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {techTags.map((tag, i) => (
              <span
                key={i}
                className="text-[12px] font-medium px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(232,245,241,0.55)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {project.liveDemoLink && (
          <motion.a
            href={project.liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2.5 w-fit focus:outline-none"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <span
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: accent }}
            >
              View Live Project
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover/link:scale-110"
              style={{
                background: `${accent}15`,
                border: `1px solid ${accent}30`,
              }}
            >
              <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
            </div>
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}