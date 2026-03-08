'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Code, Layers, Palette, ArrowUpRight, Sparkles } from 'lucide-react'
import { SectionLabel } from '@/components/solutionSections/shared/SectionLabel'
import { Services } from '@/lib/types/entities'
import { getServices } from '@/lib/data/services'

interface ServicesSectionProps {
  onScroll: (sectionId: string) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Palette,
  Layers,
}

// Accent colors cycling per card
const accents = [
  { primary: '#064bd4', secondary: '#106db9' },
  { primary: '#107eb9', secondary: '#6eb9e7' },
  { primary: '#6eb3e7', secondary: '#066dd4' },
]

function ServiceCard({
  service,
  index,
  onScroll,
}: {
  service: Services
  index: number
  onScroll: (id: string) => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  const IconComponent = service.serviceIcon ? iconMap[service.serviceIcon] ?? Code : Code
  const features = service.featuresList?.split('\n').filter(Boolean) ?? []
  const accent = accents[index % accents.length]
  const isFeatured = index === 1 // middle card featured

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: isFeatured
          ? `linear-gradient(160deg, rgba(6,182,212,0.1) 0%, rgba(16,185,129,0.06) 100%)`
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? accent.primary + '35' : isFeatured ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered
          ? `0 0 40px ${accent.primary}12, 0 20px 60px rgba(0,0,0,0.3)`
          : isFeatured
          ? '0 0 40px rgba(6,182,212,0.06)'
          : 'none',
      }}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider z-10"
          style={{
            background: 'rgba(6,182,212,0.12)',
            border: '1px solid rgba(6,182,212,0.25)',
            color: '#06b6d4',
          }}
        >
          <Sparkles className="w-3 h-3" />
          Popular
        </div>
      )}

      {/* Top glow line */}
      <div
        className="absolute top-0 inset-x-0 h-px transition-opacity duration-500"
        style={{
          opacity: hovered || isFeatured ? 1 : 0,
          background: `linear-gradient(to right, transparent, ${accent.primary}70, transparent)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full p-7">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
          style={{
            background: `${accent.primary}12`,
            border: `1px solid ${accent.primary}25`,
            boxShadow: hovered ? `0 0 20px ${accent.primary}20` : 'none',
          }}
        >
          <IconComponent className="w-5 h-5" style={{ color: accent.primary }} />
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold mb-3 leading-snug transition-colors duration-200"
          style={{ color: hovered ? '#e8f5f1' : 'rgba(232,245,241,0.9)' }}
        >
          {service.serviceName}
        </h3>

        {/* Description */}
        <p
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: 'rgba(232,245,241,0.45)' }}
        >
          {service.shortDescription}
        </p>

        {/* Feature list */}
        {features.length > 0 && (
          <ul className="space-y-2.5 mb-8 flex-1">
            {features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${accent.secondary}15`, border: `1px solid ${accent.secondary}30` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent.secondary }} />
                </div>
                <span className="text-[13px]" style={{ color: 'rgba(232,245,241,0.5)' }}>
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />

        {/* CTA */}
        <motion.button
          onClick={() => onScroll('contact')}
          className="group/btn flex items-center justify-between w-full px-5 py-3 rounded-xl text-sm font-semibold focus:outline-none transition-all duration-200"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${accent.primary} 0%, ${accent.secondary} 100%)`
              : 'rgba(255,255,255,0.04)',
            color: hovered ? '#0a1612' : 'rgba(232,245,241,0.6)',
            border: `1px solid ${hovered ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: hovered ? `0 4px 20px ${accent.primary}30` : 'none',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{service.ctaButtonText || 'Get Started'}</span>
          <ArrowUpRight
            className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </motion.button>
      </div>
    </motion.div>
  )
}

export function ServicesSection({ onScroll }: ServicesSectionProps) {
  const [services, setServices] = useState<Services[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  useEffect(() => {
    getServices()
      .then((data) => setServices(data.items))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section id="services" className="relative py-32 px-6 lg:px-16 xl:px-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '0%', right: '-5%', width: '45%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-2xl"
        >
          <SectionLabel text="Services" />

          <h2
            className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1] mt-5 mb-5"
            style={{ color: '#e8f5f1' }}
          >
            Tailored solutions
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #228bee 0%, #105cb9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              for your needs
            </span>
          </h2>

          <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(232,245,241,0.45)' }}>
            Comprehensive web development services designed to help your business succeed online — from concept to launch to growth.
          </p>
        </motion.div>

        {/* Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl animate-pulse"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {services.map((service, index) => (
              <ServiceCard
                key={service._id}
                service={service}
                index={index}
                onScroll={onScroll}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: '#e8f5f1' }}>
              Not sure which service fits?
            </p>
            <p className="text-[13px]" style={{ color: 'rgba(232,245,241,0.4)' }}>
              Let's talk — I'll help you find the right solution.
            </p>
          </div>

          <motion.button
            onClick={() => onScroll('contact')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold shrink-0 focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
              color: '#0a1612',
              boxShadow: '0 0 0 1px rgba(6,182,212,0.3), 0 4px 20px rgba(6,182,212,0.18)',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 0 1px rgba(6,182,212,0.5), 0 8px 28px rgba(6,182,212,0.28)' }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Free Call
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}