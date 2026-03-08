'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Lightbulb,
  Compass,
  Palette,
  Code2,
  Rocket,
  ArrowRight,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    phase: 'Discovery',
    title: 'Define the Problem',
    description:
      'We start by deeply understanding your goals, users, and constraints—turning ambiguity into a clear problem statement.',
    bullets: ['Stakeholder interviews', 'Competitive analysis', 'Success metrics'],
    accent: '#22d3ee',
  },
  {
    number: '02',
    icon: Compass,
    phase: 'Strategy',
    title: 'Plan the Architecture',
    description:
      'Tech stack decisions, information architecture, and a project roadmap that minimises risk and maximises momentum.',
    bullets: ['Tech stack selection', 'Information architecture', 'Sprint planning'],
    accent: '#38bdf8',
  },
  {
    number: '03',
    icon: Palette,
    phase: 'Design',
    title: 'Craft the Experience',
    description:
      'High-fidelity designs that balance aesthetics with usability—every interaction intentional, every pixel considered.',
    bullets: ['Component system', 'Interaction prototyping', 'Accessibility review'],
    accent: '#818cf8',
  },
  {
    number: '04',
    icon: Code2,
    phase: 'Engineering',
    title: 'Build with Precision',
    description:
      'Clean, maintainable code delivered in focused sprints. Continuous feedback loops keep us aligned at every step.',
    bullets: ['Iterative development', 'Code reviews & testing', 'Performance optimization'],
    accent: '#34d399',
  },
  {
    number: '05',
    icon: Rocket,
    phase: 'Launch',
    title: 'Ship & Iterate',
    description:
      'A smooth deployment followed by data-driven iteration. We launch fast, learn faster, and improve continuously.',
    bullets: ['CI/CD deployment', 'Analytics integration', 'Post-launch monitoring'],
    accent: '#fb923c',
  },
]

function StepRow({ step, index, total }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const isLast = index === total - 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex gap-5"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        {/* Node */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-mono font-bold shrink-0 relative z-10 transition-all duration-300"
          style={{
            border: `1px solid ${step.accent}50`,
            color: step.accent,
            background: `radial-gradient(circle at 50% 50%, ${step.accent}18 0%, transparent 70%)`,
            boxShadow: `0 0 0 3px ${step.accent}10, 0 0 20px ${step.accent}10`,
          }}
        >
          {step.number}
        </div>

        {/* Connector */}
        {!isLast && (
          <div
            className="w-px mt-1 flex-1 min-h-[32px]"
            style={{
              background: `linear-gradient(to bottom, ${step.accent}45 0%, ${steps[index + 1].accent}20 100%)`,
            }}
          />
        )}
      </div>

      {/* Card */}
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-5'}`}>
        {/* Phase badge */}
        <div
          className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest border"
          style={{
            color: step.accent,
            borderColor: `${step.accent}30`,
            background: `${step.accent}0c`,
          }}
        >
          <step.icon className="w-3 h-3" />
          {step.phase}
        </div>

        {/* Card body */}
        <div
          className="relative rounded-xl border overflow-hidden transition-all duration-300 group-hover:border-white/10"
          style={{
            borderColor: 'rgba(255,255,255,0.055)',
            background: 'rgba(255,255,255,0.018)',
          }}
        >
          {/* Hover top-glow */}
          <div
            className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to right, transparent, ${step.accent}65, transparent)`,
            }}
          />

          {/* Left accent bar */}
          <div
            className="absolute left-0 top-4 bottom-4 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(to bottom, ${step.accent}80, transparent)` }}
          />

          <div className="p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-[15px] font-semibold text-white leading-snug">{step.title}</h3>
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: `${step.accent}12`,
                  border: `1px solid ${step.accent}25`,
                }}
              >
                <step.icon className="w-4 h-4" style={{ color: step.accent }} />
              </div>
            </div>

            <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{step.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {step.bullets.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] text-gray-500 px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <ArrowRight className="w-2.5 h-2.5 shrink-0" style={{ color: step.accent }} />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProcessSection() {
  return (
    <section id="process" className="relative py-32 px-6 lg:px-16 xl:px-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ── Desktop two-column layout ── */}
        <div className="lg:grid lg:grid-cols-[1fr_1.15fr] lg:gap-20 xl:gap-28 lg:items-start">

          {/* ── LEFT: Sticky header ── */}
          <div className="mb-16 lg:mb-0 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Label */}
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-cyan-400 border border-cyan-500/20 bg-cyan-500/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Methodology
              </div>

              {/* Heading */}
              <h2 className="text-4xl xl:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-5">
                How We
                <br />
                Build{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #34d399 100%)' }}
                >
                  Great
                  <br />
                  Products
                </span>
              </h2>

              <p className="text-[15px] text-gray-500 leading-relaxed mb-10 max-w-xs">
                A five-phase workflow refined across dozens of projects. Structured enough to stay on track, flexible enough to adapt.
              </p>

              {/* Phase index */}
              <div
                className="inline-flex flex-col gap-3 p-4 rounded-xl border"
                style={{
                  borderColor: 'rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                {steps.map((s) => (
                  <div key={s.number} className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: s.accent, boxShadow: `0 0 6px ${s.accent}` }}
                    />
                    <span className="text-[11px] font-mono text-gray-600">{s.number}</span>
                    <span className="text-[12px] text-gray-400">{s.phase}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Timeline steps ── */}
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <StepRow key={step.number} step={step} index={index} total={steps.length} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}