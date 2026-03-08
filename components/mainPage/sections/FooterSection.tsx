"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from "lucide-react";

const LINKS = {
  nav: [
    { label: "Overview",     href: "#overview" },
    { label: "Projects",     href: "#projects" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Tech Stack",   href: "#tech-stack" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact",      href: "#contact" },
  ],
  social: [
    { icon: Github,   label: "GitHub",   href: "https://github.com/anmol-roy",               color: "#a3a3a3" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/anmol-kumar-roy",     color: "#60a5fa" },
    { icon: Twitter,  label: "Twitter",  href: "https://twitter.com/anmolroy_dev",            color: "#67e8f9" },
    { icon: Mail,     label: "Email",    href: "mailto:anmol@example.com",                   color: "#c4b5fd" },
  ],
};

// Animated big name that shifts parallax on scroll
function BigName() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["15%", "-4%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1]);

  return (
    <div ref={ref} className="mb-0 verflow-hidden pointer-events-none">
  <motion.h2
    className="select-none whitespace-nowrap font-bold tracking-tighter leading-none"
    style={{
      fontSize: "clamp(52px, 12vw, 140px)",
      color: "transparent",
      WebkitTextStroke: "1px #87CEEB", // blue border
      x,
      opacity,
    }}
  >
    Anmol Roy
  </motion.h2>
</div>
  );
}

// Floating availability orb
function AvailabilityOrb() {
  return (
    <motion.div
      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.01 }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="text-[11px] text-emerald-400/80 tracking-wide">Open to opportunities</span>
    </motion.div>
  );
}

// Back to top button
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/40 hover:text-white/80 hover:border-white/[0.15] transition-colors duration-200 backdrop-blur-sm"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Animated letter reveal for the tagline
function AnimatedTagline() {
  const words = ["AI Engineer.", "Mobile Dev.", "Web Builder.", "Problem Solver."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 h-5 overflow-hidden">
      <span className="text-sm text-white/30">I&apos;m an</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-m font-medium"
          style={{
            background: "linear-gradient(120deg,#93c5fd,#c4b5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative px-6 sm:px-10 lg:px-16 pt-16 pb-8 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Top divider */}
      <div
        className="mb-12 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
        }}
      />

      <div className="container mx-auto max-w-6xl">

        {/* Big parallax name */}
        <div className="mb-8 -mx-6 sm:-mx-10 lg:-mx-16">
          <BigName />
        </div>

        {/* Main footer row */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-10 sm:gap-16 mb-12">

          {/* Left — identity */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <AvailabilityOrb />
            <AnimatedTagline />
            <p className="text-s text-white/25 leading-relaxed max-w-xs">
              Building intelligent systems and crafting the interfaces people
              use to interact with them. Based in India, working worldwide.
            </p>
          </motion.div>

          {/* Center — nav links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <p className="mb-4 text-[16px] tracking-[0.25em] text-white uppercase">Navigate</p>
            <ul className="flex flex-col gap-2.5">
              {LINKS.nav.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                >
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-xs text-white/60 hover:text-white/90 transition-colors duration-200"
                  >
                    <motion.span
                      className="h-px bg-white/20 group-hover:bg-white/60 transition-all duration-200"
                      initial={{ width: 0 }}
                      whileHover={{ width: 12 }}
                      style={{ width: 0 }}
                    />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — socials */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            <p className="mb-4 text-[16px] tracking-[0.25em] text-white/80 uppercase">Connect</p>
            <ul className="flex flex-col gap-2.5">
              {LINKS.social.map(({ icon: Icon, label, href, color }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-xs text-white/0 transition-colors duration-200"
                    whileHover={{ x: 3, color }}
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    <Icon
                      className="h-4.5 w-4.5 shrink-0 transition-colors duration-200"
                    />
                    {label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/[0.05]"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[16px] text-[#bfd0ff56] flex items-center gap-1.5"
            style={{
              WebkitTextStroke: "0.5px rgba(255,255,255,0.1)",
              textShadow: "0 0 2px rgba(255,255,0,0.05)"
            }}
          >
            © {year} Anmol Roy &nbsp;·&nbsp; Made with
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Heart className="h-3 w-3 text-rose-400/50 fill-rose-400/50" />
            </motion.span>
            in India
          </motion.p>

          <div className="flex items-center gap-3">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-[15px] text-white/65"
            >
              Built with Next.js &amp; Tailwind CSS
            </motion.p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}