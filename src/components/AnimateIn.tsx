"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

/* ─── Shared spring/ease presets ─────────────────────────────── */
const SPRING_SMOOTH = { type: "spring", stiffness: 280, damping: 28, mass: 0.8 } as const;
const SPRING_BOUNCY = { type: "spring", stiffness: 380, damping: 22, mass: 0.7 } as const;
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  variant?: "fade" | "blur" | "scale" | "slide" | "reveal";
  duration?: number;
  className?: string;
}

const directionMap = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/** Multi-variant entrance animation triggered by scroll viewport entry */
export function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  variant = "blur",
  duration = 0.65,
  className,
}: AnimateInProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = directionMap[direction];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    variant === "blur"
      ? { opacity: 0, filter: "blur(8px)", ...offset }
      : variant === "scale"
      ? { opacity: 0, scale: 0.93, ...offset }
      : variant === "reveal"
      ? { opacity: 0, clipPath: "inset(0 0 100% 0)", ...offset }
      : { opacity: 0, ...offset };

  const animate =
    variant === "blur"
      ? { opacity: 1, filter: "blur(0px)", x: 0, y: 0 }
      : variant === "scale"
      ? { opacity: 1, scale: 1, x: 0, y: 0 }
      : variant === "reveal"
      ? { opacity: 1, clipPath: "inset(0 0 0% 0)", x: 0, y: 0 }
      : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial as any}
      whileInView={animate as any}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration, delay, ease: EASE_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — children animate in sequence */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.07,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Individual item inside a StaggerContainer */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { ...SPRING_SMOOTH },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Floating / breathing element (subtle vertical oscillation) */
export function FloatingElement({
  children,
  className,
  amplitude = 7,
  duration = 4.5,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Hover scale + lift — wrap interactive cards with this */
export function HoverCard({
  children,
  className,
  scale = 1.025,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale, y: -3, transition: SPRING_BOUNCY }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Parallax scroll element — moves at a different rate than normal scroll */
export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  /** 0 = pinned, 1 = normal, >1 = faster. Default 0.3 = slower than scroll */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-50 * speed}px`, `${50 * speed}px`]);

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Shimmer pulse — for loading or highlighting states */
export function ShimmerText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      animate={{ backgroundPosition: ["200% center", "-200% center"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--ck-text) 40%, var(--ck-primary) 50%, var(--ck-text) 60%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline-block",
      }}
    >
      {children}
    </motion.span>
  );
}

