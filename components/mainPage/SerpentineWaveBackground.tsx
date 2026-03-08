"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";

interface CursorStar {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Exact same path generation as original
const generateStaticPath = (
  baseY: number,
  amplitude: number,
  frequency: number,
  phase: number
): string => {
  let path = `M-200,${baseY} `;
  for (let x = -200; x <= 3080; x += 20) {
    const y = baseY + amplitude * Math.sin(frequency * x + phase);
    path += `L${x},${y.toFixed(6)} `;
  }
  return path;
};

// Pre-computed outside component — no SSR mismatch, no window dependency
const STAR_COUNT = 90;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  size: 1 + seededRandom(i * 1000) * 2.5,
  left: seededRandom(i * 100) * 100,
  top: 3 + seededRandom(i * 200) * 94,         // full height, no dead zone at top
  opacity: 0.15 + seededRandom(i * 300) * 0.35,
  xRange: (seededRandom(i * 400) - 0.5) * 40,
  yRange: -10 - seededRandom(i * 500) * 40,
  duration: 7 + seededRandom(i * 600) * 8,
  delay: seededRandom(i * 700) * 5,
  color:
    seededRandom(i * 800) > 0.7
      ? "#C084FC"
      : seededRandom(i * 800) > 0.4
      ? "#60A5FA"
      : "#A855F7",
}));

export default function SerpentineWaveWithStars() {
  const [mounted, setMounted] = useState(false);
  const [cursorStars, setCursorStars] = useState<CursorStar[]>([]);
  const lastMoveRef = useRef(0);
  const counterRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cursor trail — stars pinned at spawn position, no jitter
  useEffect(() => {
    if (!mounted) return;

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveRef.current < 50) return;
      lastMoveRef.current = now;

      const id = now + counterRef.current++;
      const star: CursorStar = {
        id,
        x: e.clientX,
        y: e.clientY,
        opacity: 0.8,
        size: 2 + Math.random() * 2,
        color: Math.random() > 0.5 ? "#C084FC" : "#A855F7",
      };

      setCursorStars((prev) => [...prev, star]);
      setTimeout(() => {
        setCursorStars((prev) => prev.filter((s) => s.id !== id));
      }, 2000);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mounted]);

  // ── EXACT ORIGINAL WAVE PATHS ──
  // Blue group: baseY 500 + i*4, amplitude 40-i*0.5, frequency 0.003, phase i*0.2
  const blueWavePaths = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      path: generateStaticPath(500 + i * 4, 40 - i * 0.5, 0.003, i * 0.2),
      strokeOpacity: 0.85 - i * 0.02,
      dur: `${10 + i * 0.3}s`,
    })), []);

  // Purple group: baseY 550 + i*4, amplitude 40-i*0.5, frequency 0.0015, phase i*0.2+PI
  const purpleWavePaths = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      path: generateStaticPath(550 + i * 4, 40 - i * 0.5, 0.0015, i * 0.2 + Math.PI),
      strokeOpacity: 0.85 - i * 0.02,
      dur: `${12 + i * 0.3}s`,
    })), []);

  // Lower group: baseY 600 + i*4, amplitude 40-i*0.5, frequency 0.00125, phase i*0.15+PI*0.5
  const lowerWavePaths = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      path: generateStaticPath(600 + i * 4, 40 - i * 0.5, 0.00125, i * 0.15 + Math.PI * 0.5),
      strokeOpacity: 0.85 - i * 0.02,
      dur: `${14 + i * 0.4}s`,
    })), []);

  const StarShape = ({ color, size }: { color: string; size: number }) => (
    <svg width={size * 3} height={size * 3} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={color}
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050329]">
      {/* Original gradient overlay */}
      <div
        className="absolute inset-0 opacity-90"
        style={{ background: "linear-gradient(to bottom, #0f0e17, #0B0636)" }}
      />

      {/* ── WAVES — EXACT original position: top-[65%] h-[35%] ── */}
      <motion.div
        className="absolute left-0 right-0 top-[65%] h-[35%] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg
          className="absolute h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 2880 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Exact original blue gradients */}
            {Array.from({ length: 15 }, (_, i) => (
              <linearGradient key={`blueGrad${i}`} id={`blueGrad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={`rgb(${40 + i * 2},${10 + i * 0.5},${220 - i * 2})`} />
                <stop offset="100%" stopColor={`rgb(${170 - i},${30 + i * 0.8},${210 - i})`} />
              </linearGradient>
            ))}
            {/* Exact original purple gradients */}
            {Array.from({ length: 15 }, (_, i) => (
              <linearGradient key={`purpleGrad${i}`} id={`purpleGrad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={`rgb(${140 + i * 1.5},${40 + i * 0.8},${200 - i})`} />
                <stop offset="100%" stopColor={`rgb(${20 + i},${150 + i * 1.5},${210 - i * 0.5})`} />
              </linearGradient>
            ))}
            {/* Exact original lower gradients */}
            {Array.from({ length: 15 }, (_, i) => (
              <linearGradient key={`lowerGrad${i}`} id={`lowerGrad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={`rgb(${20 + i},${140 + i * 1.5},${180 - i})`} />
                <stop offset="100%" stopColor={`rgb(${10 + i * 0.5},${50 + i},${160 - i * 0.8})`} />
              </linearGradient>
            ))}
          </defs>

          {/* Blue waves */}
          {blueWavePaths.map((wp, i) => (
            <motion.path
              key={`blue-${i}`}
              d={wp.path}
              fill="none"
              stroke={`url(#blueGrad${i})`}
              strokeWidth="0.7"
              strokeOpacity={wp.strokeOpacity}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.03 }}
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 80,0; 0,0"
                dur={wp.dur}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              />
            </motion.path>
          ))}

          {/* Purple waves */}
          {purpleWavePaths.map((wp, i) => (
            <motion.path
              key={`purple-${i}`}
              d={wp.path}
              fill="none"
              stroke={`url(#purpleGrad${i})`}
              strokeWidth="0.7"
              strokeOpacity={wp.strokeOpacity}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.03 }}
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; -80,0; 0,0"
                dur={wp.dur}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              />
            </motion.path>
          ))}

          {/* Lower waves */}
          {lowerWavePaths.map((wp, i) => (
            <motion.path
              key={`lower-${i}`}
              d={wp.path}
              fill="none"
              stroke={`url(#lowerGrad${i})`}
              strokeWidth="0.7"
              strokeOpacity={wp.strokeOpacity}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 + i * 0.03 }}
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 60,0; 0,0"
                dur={wp.dur}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              />
            </motion.path>
          ))}
        </svg>
      </motion.div>

      {/* ── BACKGROUND STARS — full height coverage ── */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted &&
          STARS.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              className="absolute"
              style={{
                width: star.size * 3,
                height: star.size * 3,
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                x: [0, star.xRange, 0],
                y: [0, star.yRange, 0],
                opacity: [star.opacity, star.opacity + 0.2, star.opacity],
                scale: [1, 1.1, 1],
              }}
              transition={{
                x: { duration: star.duration * 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: star.delay },
                y: { duration: star.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: star.delay * 0.7 },
                opacity: { duration: star.duration * 0.9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: star.delay * 0.5 },
                scale: { duration: star.duration * 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: star.delay * 0.3 },
              }}
            >
              <StarShape color={star.color} size={star.size} />
            </motion.div>
          ))}
      </div>

      {/* ── CURSOR TRAIL — pinned at spawn, floats up and fades ── */}
      <div className="absolute inset-0 pointer-events-none">
        {cursorStars.map((star) => (
          <motion.div
            key={`cursor-${star.id}`}
            className="absolute"
            style={{
              left: star.x,
              top: star.y,
              width: star.size * 4,
              height: star.size * 4,
              marginLeft: -(star.size * 2),
              marginTop: -(star.size * 2),
            }}
            initial={{ opacity: star.opacity, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.2, y: -20 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <StarShape color={star.color} size={star.size} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}