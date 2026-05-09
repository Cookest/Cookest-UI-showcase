"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Button, Badge, Divider, Skeleton } from "@cookest/ui";

const blobs = [
  { color: "#6d28d9", size: 700, x: -100, y: -80, duration: 18, dx: 120, dy: 80 },
  { color: "#0d9488", size: 600, x: 300, y: 100, duration: 14, dx: -100, dy: 120 },
  { color: "#b45309", size: 500, x: 100, y: 350, duration: 20, dx: 80, dy: -60, opacity: 0.22 },
  { color: "#1d4ed8", size: 550, x: 500, y: -60, duration: 16, dx: -80, dy: 100 },
];

const techniques = [
  "Pat scallops dry. Season with fleur de sel 3 minutes before searing.",
  "Sear in clarified butter 90 seconds each side — resist moving them.",
  "Deglaze with dry vermouth, mount with cold unsalted butter.",
  "Plate purée first, set scallop, finish with caviar and micro herbs.",
];

export default function AuroraKitchenPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.03);
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.03);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>

      <div ref={containerRef} style={{ minHeight: "100vh", background: "#080810", position: "relative", overflow: "hidden" }}>

        {/* Aurora blobs */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {blobs.map((blob, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: blob.size,
                height: blob.size,
                borderRadius: "50%",
                background: blob.color,
                filter: `blur(${blob.size * 0.18}px)`,
                opacity: blob.opacity ?? 0.3,
                left: blob.x,
                top: blob.y,
                x: springX,
                y: springY,
              }}
              animate={{
                x: [0, blob.dx, 0],
                y: [0, blob.dy, 0],
              }}
              transition={{
                duration: blob.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Grain */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

          {/* Top nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2rem clamp(1.5rem, 5vw, 4rem)" }}>
            <Link
              href="/examples"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textDecoration: "none", textTransform: "uppercase" }}
            >
              ← Examples
            </Link>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
              Aurora Kitchen
            </span>
          </div>

          {/* Hero text */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem clamp(1rem, 5vw, 3rem)", textAlign: "center" }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: "0.62rem", letterSpacing: "0.5em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "1.5rem" }}
            >
              The Signature Dish
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "0.01em",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Seared Scallop
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              style={{ marginTop: "1rem", fontSize: "0.8rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}
            >
              Cauliflower Purée · Brown Butter Emulsion · Caviar
            </motion.p>

            {/* Stars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ marginTop: "1.5rem", color: "rgba(201,169,110,0.7)", fontSize: "0.7rem", letterSpacing: "0.3em" }}
            >
              ✦ ✦ ✦ ✦ ✦
            </motion.div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginTop: "0.4rem" }}>
              Chef&apos;s Table Selection
            </p>

            {/* Glass card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                marginTop: "3rem",
                width: "100%",
                maxWidth: "480px",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(28px) saturate(160%)",
                WebkitBackdropFilter: "blur(28px) saturate(160%)",
                border: "1px solid rgba(201,169,110,0.18)",
                borderRadius: "3px",
                padding: "2rem",
              }}
            >
              {/* Stats row */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {[["Serves", "2"], ["Time", "28 min"], ["Difficulty", "Advanced"]].map(([label, value]) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <Badge variant="default" style={{ borderColor: "rgba(201,169,110,0.25)", color: "rgba(201,169,110,0.7)", background: "transparent", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                      {label}: {value}
                    </Badge>
                  </div>
                ))}
              </div>

              <Divider className="opacity-20" />

              {/* Techniques */}
              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {techniques.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
                  >
                    <span style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "0.6rem",
                      color: "rgba(201,169,110,0.45)",
                      paddingTop: "0.15rem",
                      minWidth: "1.2rem",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ borderLeft: "1px solid rgba(201,169,110,0.2)", paddingLeft: "0.85rem" }}>
                      <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0, fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}>
                        {step}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: "2rem" }}>
                <Button
                  variant="ghost"
                  style={{
                    width: "100%",
                    borderColor: "rgba(201,169,110,0.35)",
                    color: "rgba(201,169,110,0.8)",
                    background: "transparent",
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                  }}
                >
                  Reveal Full Technique →
                </Button>
              </div>
            </motion.div>

            {/* Skeleton teaser */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ marginTop: "2rem", width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.5rem", opacity: 0.35 }}
            >
              <Skeleton height={12} className="rounded-sm" />
              <Skeleton height={12} width="70%" className="rounded-sm" />
            </motion.div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.35em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>
              Spring 2026 · Michelin Recognition · Reservation Required
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
