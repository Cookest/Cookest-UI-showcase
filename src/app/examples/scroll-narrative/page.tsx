"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Badge, Progress } from "@cookest/ui";

const steps = [
  {
    id: "broth",
    title: "The Broth",
    subtitle: "18 hours of patience",
    body: "Pork trotters, chicken backs, and kombu cold-start in 4L of water. Bring to a rolling boil, skim aggressively for the first twenty minutes, then reduce to a vigorous simmer. Twelve hours in, the collagen breaks down into gelatin — the broth turns milky white, opaque, and rich beyond measure.",
    ingredients: ["Pork trotters", "Chicken backs", "Kombu", "Ginger", "Spring onion"],
    color: "#92400e",
    glowColor: "#d97706",
  },
  {
    id: "tare",
    title: "The Tare",
    subtitle: "The soul of the bowl",
    body: "Tare is the concentrated seasoning that defines the ramen's character. Shoyu tare: tamari, mirin, sake, and kombu reduced by half. A single tablespoon seasons an entire bowl. Every shop guards theirs obsessively — some have been refining the same tare for 40 years.",
    ingredients: ["Tamari", "Mirin", "Sake", "Kombu", "Dried shiitake"],
    color: "#1e3a5f",
    glowColor: "#3b82f6",
  },
  {
    id: "noodles",
    title: "The Noodles",
    subtitle: "Kansui is everything",
    body: "High-gluten wheat flour, water, and kansui — an alkaline mineral water that gives ramen noodles their characteristic yellow tint and springy chew. Kneaded hard, rested, rolled to 1.5mm. Drop into furiously boiling water for 90 seconds. Never longer.",
    ingredients: ["High-gluten flour", "Kansui", "Salt", "Water"],
    color: "#14532d",
    glowColor: "#22c55e",
  },
  {
    id: "chashu",
    title: "The Chashu",
    subtitle: "Braised pork belly",
    body: "Pork belly rolled tight around itself, seared on all sides until deeply caramelised, then braised in soy, mirin, sake, and sugar for three hours at a bare simmer. Rest overnight in the braising liquid. Slice to 8mm. Torch briefly before serving.",
    ingredients: ["Pork belly", "Soy sauce", "Mirin", "Sake", "Brown sugar"],
    color: "#4c1d95",
    glowColor: "#a855f7",
  },
  {
    id: "egg",
    title: "The Ajitsuke Tamago",
    subtitle: "The soft-boiled ritual",
    body: "Bring water to a full boil. Lower eggs gently. Six minutes thirty seconds — not a second more. Ice bath immediately. Peel with care. Marinate overnight in spent chashu braising liquid. The yolk should be custard: dark orange, jammy, yielding.",
    ingredients: ["Eggs", "Chashu braising liquid", "Mirin", "Soy sauce"],
    color: "#7c2d12",
    glowColor: "#f97316",
  },
  {
    id: "assembly",
    title: "The Assembly",
    subtitle: "Order matters",
    body: "Tare first — into the warmed bowl. Ladle broth over with force to combine. Noodles lifted, shaken dry, placed in a tight mound. Chashu to the left. Egg halved, placed cut-side up. Nori against the bowl wall. Bamboo shoot, green onion, mayu (black garlic oil). Serve immediately.",
    ingredients: ["Tare", "Broth", "Noodles", "Chashu", "Ajitsuke tamago", "Nori", "Bamboo", "Mayu"],
    color: "#0f172a",
    glowColor: "#94a3b8",
  },
];

function StepIndicator({ activeStep }: { activeStep: number }) {
  return (
    <div style={{ position: "fixed", right: "1.5rem", top: "50%", transform: "translateY(-50%)", zIndex: 40, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      {steps.map((step, i) => (
        <motion.div
          key={step.id}
          animate={{
            height: i === activeStep ? "2rem" : "0.35rem",
            background: i === activeStep ? step.glowColor : "rgba(255,255,255,0.2)",
            width: i === activeStep ? "3px" : "2px",
          }}
          transition={{ duration: 0.3 }}
          style={{ borderRadius: "999px" }}
          title={step.title}
        />
      ))}
    </div>
  );
}

function NarrativeStep({
  step,
  progress,
}: {
  step: typeof steps[0];
  progress: number;
}) {
  const isActive = progress >= 0.15 && progress <= 0.85;

  return (
    <div
      style={{
        padding: "clamp(2rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem)",
        maxWidth: "560px",
      }}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="default"
              style={{ borderColor: `${step.glowColor}50`, color: step.glowColor, background: `${step.glowColor}10`, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}
            >
              {step.subtitle}
            </Badge>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.9)",
                margin: "0 0 1.25rem 0",
                lineHeight: 1.15,
              }}
            >
              {step.title}
            </h2>

            <p
              style={{
                fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
                marginBottom: "1.75rem",
                fontStyle: "italic",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {step.body}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {step.ingredients.map((ing) => (
                <motion.div
                  key={ing}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: Math.random() * 0.3 }}
                >
                  <Badge
                    variant="default"
                    style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.04)", fontSize: "0.7rem" }}
                  >
                    {ing}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BowlIllustration({ stepIndex }: { stepIndex: number }) {
  const filled = stepIndex + 1;
  const totalSteps = steps.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "2rem" }}>
      {/* Bowl SVG */}
      <div style={{ position: "relative", width: "280px", height: "280px" }}>
        {/* Bowl outline */}
        <svg viewBox="0 0 280 280" style={{ position: "absolute", inset: 0 }}>
          {/* Bowl shadow */}
          <ellipse cx="140" cy="262" rx="90" ry="10" fill="rgba(0,0,0,0.4)" />
          {/* Bowl body */}
          <path d="M40 120 Q40 240 140 248 Q240 240 240 120 Z" fill="#1a1008" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          {/* Bowl rim */}
          <ellipse cx="140" cy="120" rx="100" ry="22" fill="#2a1a0a" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* Broth fill */}
          {filled >= 1 && (
            <motion.ellipse
              cx="140" cy="125" rx="92" ry="18"
              fill="#92400e"
              opacity={0.7}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Noodle swirls */}
          {filled >= 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <path d="M90 155 Q120 140 150 155 Q180 170 140 180 Q100 190 90 175 Q80 160 110 150" fill="none" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" />
              <path d="M110 160 Q140 145 165 160 Q185 172 155 182" fill="none" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
          )}

          {/* Chashu slice */}
          {filled >= 4 && (
            <motion.g initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
              <ellipse cx="105" cy="168" rx="22" ry="14" fill="#7c2d12" />
              <ellipse cx="105" cy="168" rx="16" ry="9" fill="#991b1b" />
              <ellipse cx="105" cy="168" rx="9" ry="5" fill="#fde68a" opacity={0.6} />
            </motion.g>
          )}

          {/* Egg half */}
          {filled >= 5 && (
            <motion.g initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
              <path d="M168 158 Q168 178 185 178 Q202 178 202 158 Z" fill="#fffbeb" />
              <circle cx="185" cy="170" r="7" fill="#f59e0b" />
            </motion.g>
          )}

          {/* Nori strip */}
          {filled >= 6 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <rect x="130" y="138" width="6" height="28" rx="1" fill="#1a2e1a" transform="rotate(-10 133 152)" />
            </motion.g>
          )}

          {/* Tare drop */}
          {filled >= 2 && (
            <motion.circle
              cx="140" cy="148"
              r="4"
              fill="#1e3a5f"
              opacity={0.8}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 }}
            />
          )}
        </svg>
      </div>

      {/* Progress */}
      <div style={{ width: "240px", marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Bowl progress</span>
          <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-geist-mono, monospace)", color: "rgba(255,255,255,0.4)" }}>
            {Math.round((filled / totalSteps) * 100)}%
          </span>
        </div>
        <Progress value={(filled / totalSteps) * 100} size="sm" />
      </div>

      <p style={{ marginTop: "1rem", fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
        {steps[stepIndex]?.id ?? "complete"}
      </p>
    </div>
  );
}

export default function ScrollNarrativePage() {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: outerRef });

  // Map scroll progress to step index
  const stepFraction = 1 / steps.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>

      {/* Back link */}
      <Link
        href="/examples"
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "1.5rem",
          zIndex: 50,
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        ← Examples
      </Link>

      <div
        ref={outerRef}
        style={{ height: "100vh", overflowY: "scroll", background: "#080c10", position: "relative" }}
      >
        {/* Title panel */}
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "1.5rem" }}
          >
            A study in craft
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.9)",
              margin: "0 0 1rem 0",
              lineHeight: 1,
            }}
          >
            How Ramen is Made
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", fontStyle: "italic", fontFamily: "'Playfair Display', serif", marginBottom: "3rem" }}
          >
            Scroll to build the bowl
          </motion.p>
          <div style={{ width: "4rem", height: "1px", background: "rgba(255,255,255,0.1)", margin: "0 auto" }} />
        </div>

        {/* Steps */}
        {steps.map((step, i) => {
          const start = (i + 1) * stepFraction;
          const mid = start + stepFraction * 0.5;
          const end = start + stepFraction;

          return (
            <div
              key={step.id}
              style={{ height: "100vh", position: "relative", display: "flex", alignItems: "stretch" }}
            >
              {/* Sticky left: bowl illustration */}
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  width: "50%",
                  height: "100vh",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `radial-gradient(ellipse at center, ${step.color}40 0%, #080c10 70%)`,
                }}
              >
                <BowlIllustration stepIndex={i} />
              </div>

              {/* Right: narrative */}
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 clamp(1.5rem, 4vw, 4rem)",
                  borderLeft: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <NarrativeStep step={step} progress={0.5} />
              </div>
            </div>
          );
        })}

        {/* Completion panel */}
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem", background: "radial-gradient(ellipse at center, #1a0f00 0%, #080c10 70%)" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "1rem" }}>
              The bowl is complete
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.85)",
                margin: "0 0 1rem 0",
              }}
            >
              Tonkotsu Ramen
            </h2>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", fontStyle: "italic", fontFamily: "'Playfair Display', serif", marginBottom: "2.5rem", maxWidth: "400px" }}>
              Eat immediately. The noodles wait for no one.
            </p>
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
              {["18h broth", "Shoyu tare", "Fresh noodles", "Chashu", "Soft egg", "Mayu"].map((tag) => (
                <Badge key={tag} variant="default" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)", background: "transparent" }}>
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <StepIndicator activeStep={0} />
    </>
  );
}
