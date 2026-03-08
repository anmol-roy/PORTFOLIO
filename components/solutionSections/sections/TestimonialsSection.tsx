'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { SectionLabel } from '@/components/solutionSections/shared/SectionLabel'
import { Testimonials } from '@/lib/types/entities'
import { getTestimonials } from '@/lib/data/testimonials'

// Accent per card slot
const accents = ['#06b6d4', '#10b981', '#06b6d4', '#6ee7b7', '#10b981', '#06b6d4']

function StarRating({ rating, accent }: { rating: number; accent: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          style={{
            color: i < rating ? '#f59e0b' : 'rgba(255,255,255,0.1)',
            fill: i < rating ? '#f59e0b' : 'transparent',
          }}
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonials
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const accent = accents[index % accents.length]
  const initials = testimonial.clientName
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? '?'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.3s',
      }}
      whileHover={{
        borderColor: accent + '30',
      }}
    >
      {/* Top accent glow on hover */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to right, transparent, ${accent}65, transparent)` }}
      />

      {/* Quote mark */}
      <div
        className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: accent + '30' }}
      >
        <Quote className="w-8 h-8 fill-current" />
      </div>

      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Rating */}
        <div className="flex items-center justify-between mb-5">
          <StarRating rating={testimonial.rating ?? 5} accent={accent} />
          <span
            className="text-[10px] font-mono font-semibold"
            style={{ color: `${accent}70` }}
          >
            {(testimonial.rating ?? 5).toFixed(1)} / 5.0
          </span>
        </div>

        {/* Quote text */}
        <p
          className="text-[14px] leading-relaxed flex-1 mb-6"
          style={{ color: 'rgba(232,245,241,0.6)' }}
        >
          &ldquo;{testimonial.feedbackText}&rdquo;
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />

        {/* Client */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}30`,
              color: accent,
            }}
          >
            {initials}
          </div>
          <div>
            <p className="text-[13px] font-semibold" style={{ color: '#e8f5f1' }}>
              {testimonial.clientName}
            </p>
            <p className="text-[11px]" style={{ color: 'rgba(232,245,241,0.4)' }}>
              {testimonial.businessName}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonials[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  useEffect(() => {
    getTestimonials()
      .then((d) => setTestimonials(d.items))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  // Aggregate stats
  const totalReviews = testimonials.length
  const avgRating =
    totalReviews > 0
      ? (testimonials.reduce((s, t) => s + (t.rating ?? 5), 0) / totalReviews).toFixed(1)
      : '5.0'

  return (
    <section id="testimonials" className="relative py-32 px-6 lg:px-16 xl:px-24 overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '5%', right: '-5%', width: '40%', height: '55%',
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Two-column layout: sticky left + scrollable right ── */}
        <div className="lg:grid lg:grid-cols-[360px_1fr] lg:gap-16 xl:gap-24 items-start">

          {/* ── LEFT: sticky header ── */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 lg:mb-0 lg:sticky lg:top-32"
          >
            <SectionLabel text="Testimonials" />

            <h2
              className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1] mt-5 mb-5"
              style={{ color: '#e8f5f1' }}
            >
              Client
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                success
              </span>
              <br />
              stories.
            </h2>

            <p className="text-[14px] leading-relaxed mb-10 max-w-xs" style={{ color: 'rgba(232,245,241,0.45)' }}>
              Don't just take my word for it — here's what clients say about working together.
            </p>

            {/* Aggregate rating card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-end gap-3 mb-3">
                <span
                  className="text-5xl font-black leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #10b981)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {avgRating}
                </span>
                <div className="mb-1">
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#f59e0b' }} />
                    ))}
                  </div>
                  <p className="text-[11px]" style={{ color: 'rgba(232,245,241,0.4)' }}>
                    avg. rating
                  </p>
                </div>
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: `${totalReviews}+`, label: 'Reviews' },
                  { value: '100%', label: 'Satisfaction' },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-xl font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4, #10b981)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {s.value}
                    </p>
                    <p className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(232,245,241,0.35)' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Avatar strip */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '14px 0' }} />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['#06b6d4', '#10b981', '#6ee7b7', '#0891b2'].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                      style={{ background: `${c}25`, borderColor: '#0a1612', color: c }}
                    >
                      {['A', 'M', 'S', 'R'][i]}
                    </div>
                  ))}
                </div>
                <p className="text-[12px]" style={{ color: 'rgba(232,245,241,0.4)' }}>
                  Trusted by <span style={{ color: '#e8f5f1', fontWeight: 600 }}>100+ clients</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: masonry-style grid ── */}
          <div>
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-56 rounded-2xl animate-pulse"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                  />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((t, i) => (
                  <TestimonialCard key={t._id} testimonial={t} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}