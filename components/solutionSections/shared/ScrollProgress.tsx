'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  // Percentage for the reading label
  const percent = useTransform(scrollYProgress, [0, 1], [0, 100])
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const unsubPct = percent.on('change', (v) => setPct(Math.round(v)))
    const unsubScroll = scrollYProgress.on('change', (v) => setIsVisible(v > 0.01))
    return () => {
      unsubPct()
      unsubScroll()
    }
  }, [percent, scrollYProgress])

  // Glow opacity tied to scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.6])

  return (
    <>
      {/* ── Progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
        {/* Track (very subtle) */}
        <div
          className="absolute inset-0 h-[2px]"
          style={{ background: 'rgba(6,182,212,0.06)' }}
        />

        {/* Filled bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{
            scaleX,
            background: 'linear-gradient(to right, #06b6d4 0%, #10b981 60%, #6ee7b7 100%)',
          }}
        />

        {/* Glow bloom at the leading edge */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left pointer-events-none"
          style={{
            scaleX,
            opacity: glowOpacity,
            background: 'linear-gradient(to right, transparent 80%, #10b981 100%)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* ── Floating percentage pill ── */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 pointer-events-none"
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 8, scale: 0.9 }
        }
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative flex items-center gap-2.5 px-3 py-2 rounded-full"
          style={{
            background: 'rgba(10,22,18,0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(6,182,212,0.18)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(6,182,212,0.1)',
          }}
        >
          {/* Mini circular progress */}
          <div className="relative w-5 h-5 shrink-0">
            <svg viewBox="0 0 20 20" className="w-full h-full -rotate-90">
              {/* Track */}
              <circle
                cx="10" cy="10" r="7"
                fill="none"
                stroke="rgba(6,182,212,0.15)"
                strokeWidth="2"
              />
              {/* Progress arc */}
              <motion.circle
                cx="10" cy="10" r="7"
                fill="none"
                stroke="url(#ring-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                  strokeDasharray: '1',
                  strokeDashoffset: '0',
                }}
              />
              <defs>
                <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center dot */}
            <div
              className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full"
              style={{
                background: pct === 100 ? '#10b981' : '#06b6d4',
                boxShadow: `0 0 6px ${pct === 100 ? '#10b981' : '#06b6d4'}`,
              }}
            />
          </div>

          {/* Percentage text */}
          <span
            className="text-[11px] font-mono font-semibold tabular-nums w-6 text-right leading-none"
            style={{ color: pct === 100 ? '#6ee7b7' : 'rgba(232,245,241,0.7)' }}
          >
            {pct}%
          </span>

          {/* Done state */}
          {pct === 100 && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              className="text-[10px] font-semibold overflow-hidden whitespace-nowrap"
              style={{ color: '#6ee7b7', letterSpacing: '0.06em' }}
            >
              END
            </motion.span>
          )}
        </div>
      </motion.div>
    </>
  )
}