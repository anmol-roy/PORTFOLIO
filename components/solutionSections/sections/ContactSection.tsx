'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Phone, ArrowUpRight, Send, CheckCircle2, MessageCircle } from 'lucide-react'
import { SectionLabel } from '@/components/solutionSections/shared/SectionLabel'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@anmol.dev',
    href: 'mailto:hello@anmol.dev',
    accent: '#06b6d4',
    description: 'Best for project inquiries',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+1 (234) 567-890',
    href: 'https://wa.me/12345678900',
    accent: '#10b981',
    description: 'Quick replies, Mon–Sat',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Mumbai, India',
    href: '#',
    accent: '#6ee7b7',
    description: 'Available globally · Remote',
  },
]

function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  multiline = false,
}: {
  id: string
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  multiline?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0

  const baseStyle: React.CSSProperties = {
    width: '100%',
    background: focused ? 'rgba(6,182,212,0.04)' : 'rgba(255,255,255,0.025)',
    border: `1px solid ${focused ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 14,
    color: '#e8f5f1',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
    boxShadow: focused ? '0 0 0 3px rgba(6,182,212,0.08)' : 'none',
    resize: 'none' as const,
  }

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-[12px] font-semibold uppercase tracking-wider mb-2"
        style={{ color: focused ? '#06b6d4' : 'rgba(232,245,241,0.4)', transition: 'color 0.2s' }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          rows={5}
          style={{ ...baseStyle, padding: '14px 16px', lineHeight: 1.6 }}
          className="placeholder-[rgba(232,245,241,0.2)]"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          style={{ ...baseStyle, padding: '14px 16px', height: 50 }}
          className="placeholder-[rgba(232,245,241,0.2)]"
        />
      )}
    </div>
  )
}

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1200)) // replace with real submission
    setStatus('sent')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-16 xl:px-24 overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '0%', right: '-5%', width: '45%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '-5%', width: '35%', height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <SectionLabel>Get In Touch</SectionLabel>
          <h2
            className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1] mt-5 mb-4"
            style={{ color: '#e8f5f1' }}
          >
            Let&apos;s build something
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              extraordinary
            </span>
          </h2>
          <p className="text-[15px] max-w-md" style={{ color: 'rgba(232,245,241,0.45)' }}>
            Have a project in mind? I'd love to hear about it — let's create something that moves the needle.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 xl:gap-16 items-start">

          {/* ── LEFT: contact cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={i}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  whileHover={{
                    borderColor: info.accent + '35',
                    background: `${info.accent}06`,
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: `${info.accent}12`,
                      border: `1px solid ${info.accent}25`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: info.accent }} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(232,245,241,0.35)' }}>
                      {info.label}
                    </p>
                    <p className="text-[14px] font-medium truncate" style={{ color: '#e8f5f1' }}>
                      {info.value}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'rgba(232,245,241,0.35)' }}>
                      {info.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: info.accent }}
                  />
                </motion.a>
              )
            })}

            {/* Availability note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.45 }}
              className="mt-2 p-4 rounded-2xl"
              style={{
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.15)',
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                  style={{ background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse 2s infinite' }}
                />
                <div>
                  <p className="text-[13px] font-semibold mb-0.5" style={{ color: '#6ee7b7' }}>
                    Currently available
                  </p>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(110,231,183,0.6)' }}>
                    Taking on new projects for Q2 2025. Typical response within 24 hours.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative rounded-2xl overflow-hidden p-7 md:p-8"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Top shimmer */}
              <div
                className="absolute top-0 inset-x-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.4), rgba(16,185,129,0.4), transparent)' }}
              />

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    id="name"
                    label="Your Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(v) => setFormData((p) => ({ ...p, name: v }))}
                    required
                  />
                  <InputField
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(v) => setFormData((p) => ({ ...p, email: v }))}
                    required
                  />
                </div>

                <InputField
                  id="message"
                  label="Message"
                  placeholder="Tell me about your project — goals, timeline, budget..."
                  value={formData.message}
                  onChange={(v) => setFormData((p) => ({ ...p, message: v }))}
                  required
                  multiline
                />

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="relative w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold focus:outline-none overflow-hidden"
                  style={{
                    background: status === 'sent'
                      ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                      : 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
                    color: '#0a1612',
                    boxShadow: '0 0 0 1px rgba(6,182,212,0.3), 0 4px 20px rgba(6,182,212,0.18)',
                    opacity: status === 'sending' ? 0.8 : 1,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'background 0.4s, box-shadow 0.3s',
                  }}
                  whileHover={status === 'idle' ? { scale: 1.01, boxShadow: '0 0 0 1px rgba(6,182,212,0.5), 0 8px 28px rgba(6,182,212,0.28)' } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {status === 'idle' && (
                      <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Send className="w-4 h-4" />
                        Send Message
                      </motion.span>
                    )}
                    {status === 'sending' && (
                      <motion.span key="sending" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </motion.span>
                    )}
                    {status === 'sent' && (
                      <motion.span key="sent" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                        <CheckCircle2 className="w-4 h-4" />
                        Message Sent!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p className="text-center text-[11px]" style={{ color: 'rgba(232,245,241,0.25)' }}>
                  No spam. I'll reply within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        input::placeholder,
        textarea::placeholder {
          color: rgba(232,245,241,0.2);
        }
      `}</style>
    </section>
  )
}