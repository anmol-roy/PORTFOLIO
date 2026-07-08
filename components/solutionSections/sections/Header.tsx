'use client'

import { useEffect, useState, useRef } from 'react'
import { Code2, Menu, X, MessageCircle, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'

interface HeaderProps {
  onScroll: (sectionId: string) => void
}

const links: { label: string; id?: string; href?: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Process', id: 'process' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
]

export function Header({ onScroll }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (id: string) => {
    setActiveLink(id)
    onScroll(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: isScrolled ? '64px' : '72px', transition: 'height 0.4s cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isScrolled
              ? 'rgba(10, 15, 22, 0.82)'
              : 'transparent',
            backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
            borderBottom: isScrolled
              ? '1px solid rgba(6, 182, 212, 0.12)'
              : '1px solid transparent',
            boxShadow: isScrolled
              ? '0 1px 40px rgba(6, 182, 212, 0.06), 0 0 0 0.5px rgba(6, 105, 212, 0.08)'
              : 'none',
          }}
        />

        {/* Subtle shimmer line at top when scrolled */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            opacity: isScrolled ? 1 : 0,
            background: 'linear-gradient(to right, transparent 0%, rgba(6, 105, 212, 0.105) 30%, rgba(16,185,129,0.5) 70%, transparent 100%)',
          }}
        />

        <div
          className="relative h-full mx-auto px-6 lg:px-10 flex items-center justify-between"
          style={{ maxWidth: '1400px' }}
        >
          {/* ── Logo ── */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 group focus:outline-none cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Icon mark */}
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                  style={{
                    background: 'linear-gradient(135deg, #526686 0%, #4d5c71 100%)',
                  }}
                >
                  <Code2 className="w-4 h-4" style={{ color: '#0a1612' }} />
                </div>
                {/* Glow dot */}
                <div
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2"
                  style={{
                    background: '#10b981',
                    borderColor: '#0a1612',
                    boxShadow: '0 0 8px rgba(16,185,129,0.8)',
                  }}
                />
              </div>

              {/* Wordmark */}
              <span
                className="text-lg font-bold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #e8f5f1 0%, #6ee7b7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                Anmol
              </span>
            </motion.div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav ref={navRef} className="hidden lg:flex items-center">
            {/* Pill container */}
            <div
              className="flex items-center gap-1 px-2 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {links.map((link) => {
                if (link.href) {
                  const isHovered = hoveredLink === link.label
                  return (
                    <Link key={link.label} href={link.href}>
                      <div
                        onMouseEnter={() => setHoveredLink(link.label)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
                        style={{
                          color: isHovered ? '#e8f5f1' : 'rgba(232,245,241,0.55)',
                        }}
                      >
                        {isHovered && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.06)',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{link.label}</span>
                      </div>
                    </Link>
                  )
                }

                const isActive = activeLink === link.id
                const isHovered = hoveredLink === link.id

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id!)}
                    onMouseEnter={() => setHoveredLink(link.id!)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none"
                    style={{
                      color: isActive
                        ? '#0669d4'
                        : isHovered
                        ? '#e8f5f1'
                        : 'rgba(232,245,241,0.55)',
                    }}
                  >
                    {/* Active/hover bg pill */}
                    {(isActive || isHovered) && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: isActive
                            ? 'rgba(6,182,212,0.1)'
                            : 'rgba(255,255,255,0.05)',
                          border: isActive
                            ? '1px solid rgba(6,182,212,0.2)'
                            : '1px solid rgba(255,255,255,0.06)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>

                    {/* Active dot */}
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: '#06b6d4', boxShadow: '0 0 6px #06b6d4' }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* ── CTA Button ── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Availability badge */}
            <div
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#6ee7b7',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#1072b9', boxShadow: '0 0 6px #105cb9', animation: 'pulse 2s infinite' }}
              />
              Available for projects
            </div>

            <motion.a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold overflow-hidden group focus:outline-none"
              style={{
                background: 'linear-gradient(135deg, #058396 0%, #2473b9 100%)',
                color: '#0a1612',
                boxShadow: '0 0 0 1px rgba(16,185,129,0.3), 0 4px 20px rgba(16,185,129,0.25)',
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 0 1px rgba(16,185,129,0.5), 0 8px 30px rgba(16,185,129,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shine sweep */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                  transform: 'translateX(-100%)',
                  animation: 'none',
                }}
              />
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </motion.a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" style={{ color: '#e8f5f1' }} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" style={{ color: '#e8f5f1' }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-x-0 z-40 lg:hidden"
            style={{ top: isScrolled ? '64px' : '72px' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="mx-4 mt-2 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(10,22,18,0.96)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(6,182,212,0.15)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(6,182,212,0.1)',
              }}
            >
              {/* Nav links */}
              <nav className="p-3">
                {links.map((link, i) => {
                  if (link.href) {
                    return (
                      <Link key={link.label} href={link.href}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.2 }}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors duration-150 group cursor-pointer"
                          style={{ color: 'rgba(232,245,241,0.7)' }}
                          whileHover={{
                            backgroundColor: 'rgba(6,182,212,0.07)',
                            color: '#e8f5f1',
                          }}
                        >
                          <span>{link.label}</span>
                          <ChevronRight
                            className="w-4 h-4 opacity-30 group-hover:opacity-60 transition-opacity"
                            style={{ color: '#06b6d4' }}
                          />
                        </motion.div>
                      </Link>
                    )
                  }
                  return (
                    <motion.button
                      key={link.id}
                      onClick={() => handleNavClick(link.id!)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors duration-150 group focus:outline-none"
                      style={{ color: activeLink === link.id ? '#06b6d4' : 'rgba(232,245,241,0.7)' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      whileHover={{
                        backgroundColor: 'rgba(6,182,212,0.07)',
                        color: '#e8f5f1',
                      }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight
                        className="w-4 h-4 opacity-30 group-hover:opacity-60 transition-opacity"
                        style={{ color: '#06b6d4' }}
                      />
                    </motion.button>
                  )
                })}
              </nav>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 12px' }} />

              {/* CTA */}
              <div className="p-3">
                {/* Availability */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-2 text-xs font-medium"
                  style={{
                    background: 'rgba(16,185,129,0.07)',
                    border: '1px solid rgba(16,185,129,0.15)',
                    color: '#6ee7b7',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }}
                  />
                  Currently available for new projects
                </div>

                <motion.a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    color: '#0a1612',
                    boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  )
}