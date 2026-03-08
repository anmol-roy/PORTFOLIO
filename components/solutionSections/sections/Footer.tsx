'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Github, Linkedin, Mail, Twitter, ArrowUpRight, MessageCircle } from 'lucide-react'

interface FooterProps {
  onScroll: (sectionId: string) => void
}

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Process', id: 'process' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
]

const socialLinks = [
  { id: 'github', icon: Github, href: 'https://github.com', label: 'GitHub' },
  { id: 'linkedin', icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { id: 'twitter', icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { id: 'email', icon: Mail, href: 'mailto:hello@anmol.dev', label: 'Email' },
]

export function Footer({ onScroll }: FooterProps) {
  const year = new Date().getFullYear()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer
      className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(6,182,212,0.12)' }}
    >
      {/* Top ambient glow */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.4), rgba(16,185,129,0.3), transparent)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.04) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden px-8 py-10 my-16"
          style={{
            background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(16,185,129,0.06) 100%)',
            border: '1px solid rgba(6,182,212,0.15)',
          }}
        >
          {/* Inner shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p
                className="text-xl font-bold mb-1"
                style={{ color: '#e8f5f1' }}
              >
                Ready to start your project?
              </p>
              <p className="text-[14px]" style={{ color: 'rgba(232,245,241,0.45)' }}>
                Let's build something extraordinary together.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                onClick={() => onScroll('contact')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold focus:outline-none"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
                  color: '#0a1612',
                  boxShadow: '0 0 0 1px rgba(6,182,212,0.3), 0 4px 20px rgba(6,182,212,0.2)',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 0 1px rgba(6,182,212,0.5), 0 8px 28px rgba(6,182,212,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold focus:outline-none"
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  color: '#6ee7b7',
                }}
                whileHover={{ background: 'rgba(16,185,129,0.15)', scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ── Main footer columns ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 pb-12"
        >
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <button
              onClick={() => onScroll('hero')}
              className="flex items-center gap-2.5 w-fit group focus:outline-none"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-shadow duration-300 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.4)]"
                style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)' }}
              >
                <Code2 className="w-4 h-4" style={{ color: '#0a1612' }} />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #e8f5f1 0%, #6ee7b7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Anmol
              </span>
            </button>

            <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: 'rgba(232,245,241,0.4)' }}>
              Full-stack developer crafting high-performance websites that convert visitors into customers. Based in Mumbai, working globally.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map(({ id, icon: Icon, href, label }) => (
                <motion.a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center focus:outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  whileHover={{
                    background: 'rgba(6,182,212,0.1)',
                    borderColor: 'rgba(6,182,212,0.3)',
                    scale: 1.08,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" style={{ color: 'rgba(232,245,241,0.5)' }} />
                </motion.a>
              ))}
            </div>

            {/* Availability dot */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit text-[11px] font-medium"
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.18)',
                color: '#6ee7b7',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#10b981', boxShadow: '0 0 6px #10b981', animation: 'pulse 2s infinite' }}
              />
              Available for new projects
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-5"
              style={{ color: 'rgba(232,245,241,0.3)' }}
            >
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <motion.button
                    onClick={() => onScroll(link.id)}
                    className="text-[13px] font-medium focus:outline-none transition-colors duration-200"
                    style={{ color: 'rgba(232,245,241,0.45)' }}
                    whileHover={{ color: '#e8f5f1', x: 3 }}
                    transition={{ duration: 0.15 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-5"
              style={{ color: 'rgba(232,245,241,0.3)' }}
            >
              Contact
            </p>
            <ul className="space-y-4">
              {[
                { label: 'Email', value: 'hello@anmol.dev', href: 'mailto:hello@anmol.dev' },
                { label: 'WhatsApp', value: '+1 (234) 567-890', href: 'https://wa.me/1234567890' },
                { label: 'Location', value: 'Mumbai, India', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'rgba(232,245,241,0.25)' }}>
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium transition-colors duration-200"
                    style={{ color: 'rgba(232,245,241,0.55)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#06b6d4')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,245,241,0.55)')}
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-[12px]" style={{ color: 'rgba(232,245,241,0.25)' }}>
            © {year} Anmol. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5">
            <span className="text-[12px]" style={{ color: 'rgba(232,245,241,0.2)' }}>Built with</span>
            {['Next.js', 'Tailwind', 'Framer'].map((tech, i) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(232,245,241,0.4)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </footer>
  )
}