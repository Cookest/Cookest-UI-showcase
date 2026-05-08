"use client";

import { motion } from "framer-motion";

interface BezierDividerProps {
  /** Flip vertically so the wave curves the other direction */
  flip?: boolean;
  /** Overall opacity of the waves. Defaults to 1 */
  opacity?: number;
  /** Extra Tailwind classes on the wrapper */
  className?: string;
  /** Height of the divider in px. Defaults to 72 */
  height?: number;
  /** Speed multiplier — lower = faster. Defaults to 1 */
  speed?: number;
}

/**
 * Animated SVG bezier-curve wave separator.
 * Uses two overlapping waves of the brand primary colour at low opacity.
 * Paths are 2× the viewBox width so we can loop via translateX.
 */
export function BezierDivider({
  flip = false,
  opacity = 1,
  className = "",
  height = 72,
  speed = 1,
}: BezierDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <svg
          viewBox={`0 0 2880 ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
        >
          {/* Back fill wave — slower, lighter */}
          <motion.g
            animate={{ x: [0, -1440] }}
            transition={{ duration: 14 * speed, repeat: Infinity, ease: "linear" }}
          >
            <path
              d={backWave(height)}
              fill="var(--ck-primary)"
              fillOpacity={0.07 * opacity}
            />
          </motion.g>

          {/* Front fill wave — faster, slightly more opaque */}
          <motion.g
            animate={{ x: [-1440, 0] }}
            transition={{ duration: 10 * speed, repeat: Infinity, ease: "linear" }}
          >
            <path
              d={frontWave(height)}
              fill="var(--ck-primary)"
              fillOpacity={0.1 * opacity}
            />
          </motion.g>

          {/* Accent stroke line — follows front wave */}
          <motion.g
            animate={{ x: [0, -1440] }}
            transition={{ duration: 10 * speed, repeat: Infinity, ease: "linear" }}
          >
            <path
              d={accentLine(height)}
              fill="none"
              stroke="var(--ck-primary)"
              strokeWidth={1}
              strokeOpacity={0.25 * opacity}
            />
          </motion.g>

          {/* Extra bezier arc accent — decorative loops at different phase */}
          <motion.g
            animate={{ x: [-720, 720] }}
            transition={{ duration: 18 * speed, repeat: Infinity, ease: "linear" }}
          >
            <path
              d={loopArc(height)}
              fill="none"
              stroke="var(--ck-primary)"
              strokeWidth={0.75}
              strokeOpacity={0.15 * opacity}
              strokeDasharray="6 8"
            />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

/* ─── Path helpers ─────────────────────────────────────── */

/** 2× wide wave that fills down to the bottom of the viewBox */
function backWave(h: number) {
  const mid = h * 0.5;
  const high = h * 0.12;
  const low = h * 0.88;
  return [
    `M0,${mid}`,
    `C360,${high} 720,${low} 1080,${mid}`,
    `C1440,${high} 1800,${low} 2160,${mid}`,
    `C2520,${high} 2880,${low} 2880,${mid}`,
    `L2880,${h} L0,${h} Z`,
  ].join(" ");
}

function frontWave(h: number) {
  const mid = h * 0.55;
  const high = h * 0.22;
  const low = h * 0.82;
  return [
    `M0,${mid}`,
    `C240,${high} 600,${low} 960,${mid}`,
    `C1320,${high} 1680,${low} 2040,${mid}`,
    `C2400,${high} 2880,${low} 2880,${mid}`,
    `L2880,${h} L0,${h} Z`,
  ].join(" ");
}

function accentLine(h: number) {
  const mid = h * 0.45;
  const high = h * 0.15;
  const low = h * 0.75;
  return [
    `M0,${mid}`,
    `C240,${high} 600,${low} 960,${mid}`,
    `C1320,${high} 1680,${low} 2040,${mid}`,
    `C2400,${high} 2880,${low} 2880,${mid}`,
  ].join(" ");
}

/** A wider, lower-frequency arc for a more organic feel */
function loopArc(h: number) {
  const mid = h * 0.35;
  const high = h * 0.05;
  const low = h * 0.65;
  return [
    `M0,${mid}`,
    `C480,${high} 960,${low} 1440,${mid}`,
    `C1920,${high} 2400,${low} 2880,${mid}`,
  ].join(" ");
}
